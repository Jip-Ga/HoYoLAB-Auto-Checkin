# HoYoLab 자동 출석 (GitHub Actions)

Pipedream 전용 코드(`defineComponent`)를 걷어내고, GitHub Actions에서 매일 자동으로
돌아가도록 바꾼 버전입니다. 계정 정보(쿠키)는 코드에 넣지 않고 **GitHub Secrets**에
저장해서 사용합니다.

## 1. 레포 만들기 / 파일 올리기

이 폴더(`index.js`, `package.json`, `.github/workflows/checkin.yml`)를 그대로
GitHub 레포에 올려주세요. 계정 정보가 코드에 없기 때문에 public 레포여도
쿠키가 노출되지 않습니다. 그래도 걱정되면 private으로 만드셔도 됩니다.

## 2. 쿠키 값 얻기

1. [hoyolab.com](https://www.hoyolab.com) 로그인
2. F12 (개발자 도구) 열기
3. 상단 **Application(어플리케이션)** 탭 클릭
4. 왼쪽 **Cookies** → `https://www.hoyolab.com` 클릭
5. 이름(Name) 목록에서 `ltuid_v2`, `ltoken_v2` 값을 각각 복사

## 3. GitHub Secret 등록하기

1. 레포 페이지 → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. Name: `ACCOUNTS_JSON`
4. Secret 값에는 아래 형식대로 계정 정보를 JSON으로 작성해서 붙여넣기:

```json
[
  {
    "NAME": "본계정",
    "AVATAR": "디스코드 웹훅 프로필 이미지 접속 링크",
    "LTUID": "여기에 ltuid_v2 값",
    "LTOKEN": "여기에 ltoken_v2 값",
    "GAMES": ["붕괴 3rd", "원신", "붕괴: 스타레일", "젠레스 존 제로"],
    "DISCORD_WEBHOOK": "여기에 디스코드 웹훅 URL"
  },
  {
    "NAME": "부계1",
    "AVATAR": "디스코드 웹훅 프로필 이미지 접속 링크",
    "LTUID": "여기에 ltuid_v2 값",
    "LTOKEN": "여기에 ltoken_v2 값",
    "GAMES": ["붕괴: 스타레일", "붕괴 3rd", "원신"],
    "DISCORD_WEBHOOK": "여기에 디스코드 웹훅 URL"
  }
]
```

- `GAMES`에 넣을 수 있는 값: `"원신"`, `"붕괴: 스타레일"`, `"붕괴 3rd"`, `"젠레스 존 제로"`
- `DISCORD_WEBHOOK`을 비워두고, `USE_LAST_AVATAR_WEBHOOK`이 `"o"`이면 리스트 마지막에
  `AVATAR`가 채워진 계정의 웹훅을 대신 사용합니다 (원본 코드와 동일한 동작).

## 4. 실행 확인

- 기본 설정은 매일 UTC 00:00(한국시간 오전 9시)에 자동 실행됩니다.
  시간을 바꾸려면 `.github/workflows/checkin.yml`의 `cron` 값을 수정하세요.
- 바로 테스트하고 싶다면 레포의 **Actions** 탭 → **HoYoLab 자동 출석** →
  **Run workflow** 버튼으로 수동 실행할 수 있습니다.
- 실행 로그는 Actions 탭의 각 실행 기록에서 확인 가능합니다.

## 주의사항

- GitHub Actions의 무료 스케줄 실행은 저장소가 일정 기간 비활성 상태면 자동으로
  꺼질 수 있습니다(공개 레포 기준 60일 미사용 시 스케줄 중지). 가끔 커밋하거나
  수동 실행을 해주면 유지됩니다.
- 쿠키(`ltoken_v2` 등)는 유출되면 계정이 위험해질 수 있으니 Secrets 외의 곳에는
  절대 붙여넣지 마세요.
