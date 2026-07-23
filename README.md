# HoYoLab 자동 출석 (GitHub Actions)

GitHub Actions에서 매일 자동으로 돌아가도록 바꾼 버전입니다.


## **※※주의사항※※**

- **`ltuid_v2`, `ltoken_v2` 등 해당 값들은 유출되면 게임 계정이 위험해질 수 있으니 `GitHub Secret` 외의 곳에는
  절대 붙여넣지 마세요.**


## 0. 준비물

1. 깃허브 계정
2. 메모장 어플(선택 사항)
3. 자주 안쓰는 브라우저(선택 사항)


## 1. 레포 만들기 / 파일 올리기

이 폴더(`index.js`, `package.json`, `.github/workflows/checkin.yml`)를 그대로
GitHub 레포에 올려주세요. 계정 정보가 코드에 없기 때문에 public 레포여도
쿠키가 노출되지 않습니다. 그래도 걱정되면 private으로 만드셔도 됩니다.


## 2. 쿠키 값 얻기

1. [hoyolab.com](https://www.hoyolab.com) 로그인
2. F12 (개발자 도구) 열기
3. 상단 **`Application`** 탭 클릭
4. 왼쪽 **`Cookies`** → `https://www.hoyolab.com` 클릭
5. Name 목록에서 **`ltuid_v2`**, **`ltoken_v2`** 값을 각각 복사
- **목록에서 안보일 시 `F5` (새로고침)**
- 동일 브라우저에서 새로 로그인 할 때 마다 **`ltoken_v2`** 값이 바뀌니 주의


## 3. GitHub Secret 등록하기

1. 레포 페이지 → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. Name: `ACCOUNTS_JSON`
4. `Secret` 값에는 아래 형식대로 계정 정보를 JSON으로 작성해서 붙여넣기:

```json
[
  { //계정 1
    "NAME" : "디스코드ㅤ웹훅ㅤ이름",  //미사용 시 ""으로
    "AVATAR" : "디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL",  //미사용 시 ""으로
    "LTUID" : "여기에ㅤltuid_v2ㅤ값",
    "LTOKEN" : "여기에ㅤltoken_v2ㅤ값",
    "GAMES" : ["원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로"],
    "DISCORD_WEBHOOK" : "디스코드ㅤ웹훅ㅤURL"  //미사용 시 ""으로
  },
  { //계정 2
    "NAME" : "디스코드ㅤ웹훅ㅤ이름",  //미사용 시 ""으로
    "AVATAR" : "디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL",  //미사용 시 ""으로
    "LTUID" : "여기에ㅤltuid_v2ㅤ값",
    "LTOKEN" : "여기에ㅤltoken_v2ㅤ값",
    "GAMES" : ["붕괴: 스타레일", "붕괴 3rd", "원신"],
    "DISCORD_WEBHOOK" : "디스코드ㅤ웹훅ㅤURL"  //미사용 시 ""으로
  }
]
```

- ★★ **`LTUID`**, **`LTOKEN`**, **`GAMES`** : **필수 입력** ★★
- **`LTUID`** = **`ltuid_v2`** (2. 쿠키 값 얻기 참고)
- **`LTOKEN`** = **`ltoken_v2`** (2. 쿠키 값 얻기 참고)
- **`GAMES`** 에 출석을 원하는 게임만 입력하여 사용하면 됩니다. **`["원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로"]`**
- 디스코드 웹훅 이름, 프로필, URL이 비어 있을 시 가장 마지막에 입력된 값으로 사용 됩니다.


## 4. 실행 확인

- 바로 테스트 : 레포의 **Actions** 탭 → **HoYoLab 자동 출석** → **Run workflow** 클릭
- 실행 로그는 Actions 탭의 각 실행 기록에서 확인 가능합니다.
- 기본 설정은 **`매일 한국시간(KST) 오전 2시`** `UTC 17:00(전날)`에 자동 실행됩니다.
- 시간을 바꾸려면 `.github/workflows/checkin.yml` 파일의 `cron` 값을 수정하세요. `(오전 9시 = UTC 00:00)`


