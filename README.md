# HoYoLab 자동 출석 (GitHub Actions)

GitHub Actions에서 매일 자동으로 돌아가도록 바꾼 버전입니다.

**출석 시간 설정 방법**은 맨 아래 `4. 실행 확인`를 참고 하시면 됩니다.

계정 여러개 등록해서 사용 가능합니다.

---

## **※※주의사항※※**

- **`ltuid_v2`, `ltoken_v2` 등 해당 값들은 유출되면 게임 계정이 위험해질 수 있으니 `GitHub Secret`에만 입력.**

---


## 0. 준비물

1. 깃허브 계정
2. 디스코드 개인 서버 또는 웹후크(선택 사항)
3. 메모장 어플(선택 사항)
4. 자주 안쓰는 브라우저(선택 사항)


## 1. 저장소 복사

해당 페이지 우측 위 `Fork` 버튼 클릭 → 본인 계정으로 복사본 생성


## 2. 쿠키 값 얻기

- 자주 안쓰는 브라우저로 실행하는 것 추천.

1. [hoyolab.com](https://www.hoyolab.com) 로그인
2. `F12` (개발자 도구) 열기
3. 상단 **`Application`** 탭 클릭
4. 왼쪽 **`Cookies`** → `https://www.hoyolab.com` 클릭
5. Name 목록에서 **`ltuid_v2`**, **`ltoken_v2`** 값을 각각 복사

- **목록에서 안보일 시 `F5` (새로고침)**
- 동일 브라우저에서 새로 로그인 할 때 마다 **`ltoken_v2`** 값이 바뀌니 주의


## 3. GitHub Secret 등록하기

1. 복사된 본인 저장소에서 → **`Settings`** → **`Secrets and variables`** → **`Actions`**
2. **`New repository secret`** (초록색) 클릭
3. Name : **`ACCOUNTS_JSON`**
4. `Secret` 값에는 아래 형식대로 계정 정보를 작성해서 붙여 넣은 후 등록 :

```json
[
  { //계정 1
    "LTUID" : "여기에ㅤltuid_v2ㅤ값",  //유저 고유 ID
    "LTOKEN" : "여기에ㅤltoken_v2ㅤ값",  //로그인 쿠키값
    "GAMES" : [ "원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로" ],
    "DISCORD_WEBHOOK" : "디스코드ㅤ웹훅ㅤURL",  //미사용 시 ""으로
    "NAME" : "디스코드ㅤ웹훅ㅤ이름",  //미사용 시 ""으로
    "AVATAR" : "디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL"  //미사용 시 ""으로
  },
  { //계정 2
    "LTUID" : "여기에ㅤltuid_v2ㅤ값",  //유저 고유 ID
    "LTOKEN" : "여기에ㅤltoken_v2ㅤ값",  //로그인 쿠키값
    "GAMES" : [ "붕괴 3rd", "원신", "붕괴: 스타레일" ],
    "DISCORD_WEBHOOK" : "디스코드ㅤ웹훅ㅤURL",  //미사용 시 ""으로
    "NAME" : "디스코드ㅤ웹훅ㅤ이름",  //미사용 시 ""으로
    "AVATAR" : "디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL"  //미사용 시 ""으로
  }
]
```

★★ **`LTUID`**, **`LTOKEN`**, **`GAMES`** = **필수 입력** ★★
- **`LTUID`** = **`ltuid_v2`** (2. 쿠키 값 얻기 참고)
- **`LTOKEN`** = **`ltoken_v2`** (2. 쿠키 값 얻기 참고)
- **`GAMES`** = 출석을 원하는 게임만 입력하여 사용하면 됩니다. **`["원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로"]`**
  
- 디스코드 웹훅 이름, 프로필, URL이 비어 있을 시 가장 마지막에 입력된 값으로 사용 됩니다.


## 4. 실행 확인

- **바로 테스트 : 저장소의 `Actions` 탭 → `HoYoLab 자동 출석` → `Run workflow` 클릭**
- 실행 로그는 `Actions` 탭의 각 실행 기록에서 확인 가능.
- 기본 설정은 **`매일 한국시간(KST) 오전 2시`** `UTC 17:00(전날)`에 자동 실행.
  - **시간 설정** : `.github/workflows/checkin.yml` 파일의 `cron` 값을 수정.
    - `KST 09:30` = `UTC 00:30` = `cron: "30 0 * * *"`
    - **추천 변환기 사이트** : [Datetime360.com](https://datetime360.com/ko/utc-seoul-time/)
  - HoYoLab 출석 가능 시간 : `한국시간(KST) 01:00` = `중국시간(CST) 00:00`

이상 :)
