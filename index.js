import fetch from "node-fetch";


const USE_LAST_AVATAR_WEBHOOK = process.env.USE_LAST_AVATAR_WEBHOOK ?? "o";

function loadAccounts() {
  const raw = process.env.ACCOUNTS_JSON;
  if (!raw) {
    throw new Error(
      "ACCOUNTS_JSON 환경변수(Secret)가 설정되지 않았습니다. README를 참고해서 GitHub Secret을 등록해주세요."
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error("ACCOUNTS_JSON 파싱 실패: JSON 형식이 올바른지 확인해주세요. " + e.message);
  }

  // 새 형식: { "SHOW_ALIAS_AS_IS": "o", "ACCOUNTS": [ ... ] }
  if (!Array.isArray(parsed) && parsed && typeof parsed === "object") {
    const accounts = parsed.ACCOUNTS;
    if (!Array.isArray(accounts)) {
      throw new Error('ACCOUNTS_JSON의 "ACCOUNTS" 값이 배열이 아닙니다. 형식을 확인해주세요.');
    }
    const showAliasAsIs = String(parsed.SHOW_ALIAS_AS_IS ?? "o").toLowerCase() === "o";
    return { accounts, showAliasAsIs };
  }

  // 예전 형식: 계정 배열을 바로 최상위에 적은 경우 (하위 호환)
  if (Array.isArray(parsed)) {
    return { accounts: parsed, showAliasAsIs: true };
  }

  throw new Error("ACCOUNTS_JSON 형식을 인식할 수 없습니다.");
}

/**
 * =========================================================================
 * [자동 출석 게임들]
 * =========================================================================
 */

const GAME_DATA = {
  "원신": {
    url: "https://sg-hk4e-api.hoyolab.com/event/sol/sign?act_id=e202102251931481",
    biz: "hk4e_global"
  },
  "붕괴: 스타레일": {
    url: "https://sg-public-api.hoyolab.com/event/luna/os/sign?act_id=e202303301540311",
    biz: "hkrpg_global"
  },
  "붕괴 3rd": {
    url: "https://sg-public-api.hoyolab.com/event/mani/sign?act_id=e202110291205111",
    biz: "bh3_global"
  },
  "젠레스 존 제로": {
    url: "https://sg-public-api.hoyolab.com/event/luna/zzz/os/sign?act_id=e202406031448091&lang=ko-kr",
    biz: "nap_global",
    extraHeaders: { "x-rpc-signgame": "zzz" }
  }
};

const GAME_ALIASES = {
  "원신": [ "겐신","1신","원공노","공월","공월의노래" ],
  "붕괴: 스타레일": [ "붕스","붕스타","별","붕별","스타레일","붕괴스타레일","붕괴 : 스타레일" ],
  "붕괴 3rd": [ "붕3","붕3rd","붕괴3rd","3rd" ],
  "젠레스 존 제로": [ "젠존제","찢","ㅈㅈㅈ","젠레스존제로","zzz","젠레스","존","제로","z" ]
};

// 위 둘을 합쳐서 실제 조회용 GAMES 객체로 자동 변환 (이 아래는 안 건드려도 됨)
const GAMES = { ...GAME_DATA };
for (const [originalName, aliases] of Object.entries(GAME_ALIASES)) {
  for (const alias of aliases) {
    GAMES[alias] = GAME_DATA[originalName];
  }
}

const GAMES_LOWERCASE = {};
for (const [name, data] of Object.entries(GAMES)) {
  GAMES_LOWERCASE[name.toLowerCase()] = data;
}

function findGame(gameName) {
  return GAMES[gameName] || GAMES_LOWERCASE[String(gameName).toLowerCase()];
}

// game 데이터 객체를 보고 GAME_DATA에 있는 "원래 이름"을 거꾸로 찾기 위한 테이블
const ORIGINAL_NAME_BY_GAME = new Map();
for (const [originalName, data] of Object.entries(GAME_DATA)) {
  ORIGINAL_NAME_BY_GAME.set(data, originalName);
}

/**
 * =========================================================================
 * [디스코드 표시 이름 설정]
 * =========================================================================
 * ACCOUNTS_JSON 최상단의 "SHOW_ALIAS_AS_IS" 값으로 정합니다. (o/x, 대소문자 무관)
 */
let SHOW_ALIAS_AS_IS = true;

function getDisplayName(gameName, game) {
  if (SHOW_ALIAS_AS_IS) return gameName;
  return ORIGINAL_NAME_BY_GAME.get(game) || gameName;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * =========================================================================
 * [구글 드라이브 링크 자동 변환]
 * =========================================================================
 * 구글 드라이브 공유 링크를 붙여넣으면 이미지 다이렉트 링크로 자동 변환합니다.
 * 예: https://drive.google.com/file/d/파일ID/view?usp=sharing
 *     https://drive.google.com/open?id=파일ID
 * → https://drive.google.com/uc?export=view&id=파일ID
 * 구글 드라이브 링크가 아니면(Imgur 등) 원본 그대로 사용합니다.
 */
function normalizeAvatarUrl(url) {
  if (!url) return url;

  if (url.includes("drive.google.com/uc")) return url;

  let match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;

  match = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;

  return url;
}

/**
 * =========================================================================
 * [UID 조회] 최초 1회만 실행됨
 * =========================================================================
 */
async function getGameUID(ltuid, ltoken, gameBiz) {
  const url = `https://api-account-os.hoyolab.com/account/binding/api/getUserGameRolesByCookie?game_biz=${gameBiz}`;
  const res = await fetch(url, {
    headers: {
      Cookie: `ltuid_v2=${ltuid}; ltoken_v2=${ltoken};`,
      "User-Agent": "Mozilla/5.0"
    }
  });
  const data = await res.json();
  if (data.data?.list?.length > 0) return data.data.list[0].game_uid;
  return null;
}

/**
 * =========================================================================
 * [출석 체크 실행]
 * =========================================================================
 */
async function checkIn(url, ltuid, ltoken, extraHeaders = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Cookie: `ltuid_v2=${ltuid}; ltoken_v2=${ltoken};`,
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "ko-KR,ko;q=0.9",
      Origin: "https://act.hoyolab.com",
      Referer: "https://act.hoyolab.com/",
      "User-Agent": "Mozilla/5.0",
      ...extraHeaders
    }
  });
  const data = await res.json();
  if (data.retcode === 0) return { success: true, message: "출석 체크 성공! 🎉" };
  if (data.retcode === -5003) return { success: true, message: "이미 오늘 출석 완료 ✅" };
  if (data.retcode === -100) return { success: false, message: "쿠키 만료 ❌" };
  return { success: false, message: `오류 발생 (${data.message}) ⚠️` };
}

/**
 * =========================================================================
 * [디스코드 웹훅 연결]
 * =========================================================================
 */
async function sendDiscord(webhook, embed, avatar) {
  if (!webhook) return;
  for (let retry = 0; retry < 10; retry++) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "HoYo 출석 비서", avatar_url: avatar, embeds: [embed] })
    });
    if (res.status === 204) return;
    if (res.status === 429) {
      const data = await res.json();
      await sleep((data.retry_after || 5) * 1000);
      continue;
    }
    break;
  }
}

/**
 * =========================================================================
 * [메인 실행]
 * =========================================================================
 */
async function main() {
  const { accounts: ACCOUNTS, showAliasAsIs } = loadAccounts();
  SHOW_ALIAS_AS_IS = showAliasAsIs;
  const uidStore = {};
  let allSucceeded = true; // 모든 계정, 모든 게임이 성공(또는 이미완료)해야 true 유지

  for (const account of ACCOUNTS) {
    const fields = [];
    let successCount = 0;

    for (const gameName of account.GAMES) {
      const game = findGame(gameName);
      if (!game) continue;

      const uidKey = `${account.LTUID}_${gameName}`;
      let uid = uidStore[uidKey] || null;

      if (!uid) {
        uid = await getGameUID(account.LTUID, account.LTOKEN, game.biz);
        if (uid) uidStore[uidKey] = uid;
        await sleep(300);
      }

      let result = null;
      for (let retry = 0; retry < 3; retry++) {
        try {
          result = await checkIn(game.url, account.LTUID, account.LTOKEN, game.extraHeaders || {});
          if (result) break;
        } catch (e) {
          await sleep(3000);
        }
      }

      const message = result ? result.message : "출석 실패 ❌";
      if (result?.success) {
        successCount++;
      } else {
        allSucceeded = false; // 하나라도 실패하면 전체 실패로 기록
      }

      const displayName = getDisplayName(gameName, game);

      fields.push({
        name: `[${displayName}]`,
        value: `UID : ${uid || "조회 실패"}\n${message}`,
        inline: false
      });

      console.log(`[${account.NAME}] ${displayName}: ${message}`);

      await sleep(500);
    }

    const embed = {
      title: `🗓 ${account.NAME} 호요랩 출석 현황`,
      description: `${successCount}/${account.GAMES.length} 성공`,
      color: successCount === account.GAMES.length ? 5763719 : 15548997,
      fields,
      footer: {
        text: (() => {
          const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
          const ampm = d.getHours() < 12 ? "오전" : "오후";
          const hours = d.getHours() % 12 || 12;
          return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}. ${ampm} ${String(hours).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        })()
      }
    };

    const lastAvatarAccount = [...ACCOUNTS].reverse().find((a) => a.AVATAR);
    const enabled = USE_LAST_AVATAR_WEBHOOK.toLowerCase() === "o";
    const avatarToUse = enabled && !account.AVATAR && lastAvatarAccount ? lastAvatarAccount.AVATAR : account.AVATAR;
    const webhookToUse = enabled && !account.AVATAR && lastAvatarAccount ? lastAvatarAccount.DISCORD_WEBHOOK : account.DISCORD_WEBHOOK;
    await sendDiscord(webhookToUse, embed, normalizeAvatarUrl(avatarToUse));
  }

  if (!allSucceeded) {
    // 하나라도 출석 실패(쿠키 만료, API 오류 등)가 있으면
    // 워크플로우 자체를 실패(exit 1) 처리해서, 다음 백업 스케줄이 다시 시도하고
    // "오늘 성공 기록" 캐시도 저장되지 않게 함
    console.error("일부 계정/게임 출석이 실패했습니다. 워크플로우를 실패로 표시합니다.");
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
