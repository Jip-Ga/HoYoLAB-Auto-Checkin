import fetch from "node-fetch";

/**
 * =========================================================================
 * [계정 설정 가져오기]
 * =========================================================================
 */

const USE_LAST_AVATAR_WEBHOOK = process.env.USE_LAST_AVATAR_WEBHOOK ?? "o";

function loadAccounts() {
  const raw = process.env.ACCOUNTS_JSON;
  if (!raw) {
    throw new Error(
      "ACCOUNTS_JSON 환경변수(Secret)가 설정되지 않았습니다. README를 참고해서 GitHub Secret을 등록해주세요."
    );
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error("ACCOUNTS_JSON 파싱 실패: JSON 형식이 올바른지 확인해주세요. " + e.message);
  }
}

/**
 * =========================================================================
 * [자동 출석 게임들]
 * =========================================================================
 */
const GAMES = {
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const ACCOUNTS = loadAccounts();
  const uidStore = {};
  let allSucceeded = true; // 모든 계정, 모든 게임이 성공(또는 이미완료)해야 true 유지

  for (const account of ACCOUNTS) {
    const fields = [];
    let successCount = 0;

    for (const gameName of account.GAMES) {
      const game = GAMES[gameName];
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

      fields.push({
        name: `[${gameName}]`,
        value: `UID : ${uid || "조회 실패"}\n${message}`,
        inline: false
      });

      console.log(`[${account.NAME}] ${gameName}: ${message}`);

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
    await sendDiscord(webhookToUse, embed, avatarToUse);
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
