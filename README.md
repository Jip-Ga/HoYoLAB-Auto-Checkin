# HoYoLab 자동 출석 (GitHub 버전)

**UPDATE** : `2026-07-25`

**검색 : `Ctrl`+`F`**

**PC 화면에서 작업하시는걸 추천 드립니다.**

- AI 활용해서 깃허브에서 시간마다 출석 시도 하도록 바꾼 버전입니다.
- **출석 시간 설정** 방법은 **맨 아래** **`#5. 출석 시간 설정`** 을 참고 하시면 됩니다.
- 계정 여러개 등록해서 사용 가능합니다.



---
## #실행 결과

<details>

<summary> 〔 디스코드 핸드폰 알림 〕 </summary>

- 각각 다른 채널의 웹훅을 사용해야 분리 되서 알림이 옵니다.
    - 아래 사진은 동일 채널에서 웹훅 2개를 사용함.

<img width="500" height="375" alt="20260725_074533" src="https://github.com/user-attachments/assets/a750c7bc-1b03-4e6f-b420-3a641f64c87d" />

</details>


<details>

<summary> 〔 성공 결과 디스코드 전송 〕 </summary>

<img width="200" height="352" alt="image" src="https://github.com/user-attachments/assets/80116e53-0dab-4fcb-882c-85fd79bb4eee" />
<img width="200" height="352" alt="image" src="https://github.com/user-attachments/assets/749ea2d7-28d2-4470-95fb-ae6fc3fc884c" />

</details>


<details>

<summary> 〔 실패 결과 디스코드 전송 〕 </summary>

- 실패 시 실패 이유가(입력 누락/조회 불가 등등) 작성 되어 나옵니다.
    - 아래 사진은 해당 HoYo 계정에 캐릭터 조회가 안되어 실패 처리 = 실제로 저 계정은 스타레일만 있음.

<img width="1000" height="313" alt="image" src="https://github.com/user-attachments/assets/97fad6f5-b96b-43c6-890b-da08d8f0877f" />
<img width="500" height="621" alt="image" src="https://github.com/user-attachments/assets/39503f9e-f303-4a88-a98f-d16cbcd0ede0" />


</details>



---
## 🚨🚨#주의사항#🚨🚨

🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
- **`ltuid_v2`, `ltoken_v2` 등 해당 값들은 타인에게 유출되면 게임 계정이 위험해질 수 있으니 **`#3. GitHub Secret`** 에만 등록하시길 경고해 드립니다.**
    - 편의를 위해 따로 보관하시더라도 유출에 유의해서 보관하시길 바랍니다.

- 지난 2026년 7월 14일에 공표된 PAT 유출 사태와는 무관합니다.
    - PAT : 비밀번호 대신 사용하는 개인용 인증 토큰.
        - 깃허브 저장소와 외부 서비스 연결할때 사용.

🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨

---
## #0. 준비물

1. 깃허브 계정
[github.com/](https://github.com/)
2. 해당 페이지 우측 위 **`Fork`** 로 저장소 및 파일 복사

<img width="457" height="70" alt="image" src="https://github.com/user-attachments/assets/7655cff5-70f1-45b2-9c2f-8e1f1c2938a4" />

3. 디스코드 개인 서버의 웹훅 또는 타 서버의 웹훅『선택사항』
4. 메모장 어플『선택사항』
5. 자주 사용하지 않는 브라우저『선택사항』


---
## #1. 디스코드 웹훅 만들기 (메모장 작성 추천)

<details>

<summary> 『선택사항』누르면 설명 나옵니다. </summary>

PC 화면에서만 웹후크 생성이 가능합니다.

[Discord 브라우저](https://discord.com/channels/@me)

1. **개인 서버 만드는 방법은 생략**
2. 채널 생성『선택사항』
3. 해당 채널 우클릭 → `채널 편집(⚙️)` → `연동` 탭 → `웹후크` → `웹후크 만들기` → `웹후크 URL 복사`

</details>


---
## #2. 쿠키 값 얻기 (메모장 작성 추천)

- **자주 사용하지 않는 브라우저로 실행하는 것 추천.**

<details>

<summary> 『필수사항』누르면 설명 나옵니다. </summary>

1. [hoyolab.com](https://www.hoyolab.com) 로그인
2. `F12` (개발자 도구) 열기
3. 상단 **`Application`** 탭 클릭
4. 왼쪽 **`Cookies`** → `https://www.hoyolab.com` 클릭
5. Name 목록에서 **`ltuid_v2`**, **`ltoken_v2`** 값을 각각 복사

<img width="597" height="176" alt="image" src="https://github.com/user-attachments/assets/125bc8b8-f172-4d90-9a3b-ad822da6b6cc" />

해당하는 Value(값) 누르면 아래에 개발자 도구창 아래에 자세히 나옵니다.

- **목록에서 안보일 시 `F5` (새로고침)**
- 동일 브라우저에서 새로 로그인 할 때 마다 **`ltoken_v2`** 값이 바뀌니 주의

</details>


---
## #3. GitHub Secret 등록하기

<details>

<summary> 『필수사항』누르면 설명 나옵니다. </summary>

1. 복사된 본인 저장소에서 → `⚙️Settings` 상단 탭 → `*️⃣Secrets and variables` (왼쪽 아래 쯤) → `Actions` 

2. **`New repository secret`** (초록색) 클릭
3. Name : **`ACCOUNTS_JSON`**
4. `Secret` 값에는 아래 형식대로 계정 정보를 작성해서 붙여 넣은 후 등록 :


▶▶ 【 계정 1개 사용 시 코드 】

```json
{
 "SHOW_ALIAS_AS_IS" : "x",
 "ACCOUNTS": [
        {
         "LTUID" : "계정1의ㅤltuid_v2ㅤ값",
         "LTOKEN" : "계정1의ㅤltoken_v2ㅤ값",
         "GAMES" : [ "원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로" ],
         "DISCORD_WEBHOOK" : "계정1의ㅤ디스코드ㅤ웹훅ㅤURL",
         "NAME" : "계정1의ㅤ이름",
         "AVATAR" : "계정1의ㅤ디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL"
        }
    ]
}
```

<details>

<summary> 【 계정 2개 이상 사용 시 코드 】누르면 나옵니다. </summary>

```json
{
 "SHOW_ALIAS_AS_IS" : "x",
 "ACCOUNTS": [
        {
         "LTUID" : "계정1의ㅤltuid_v2ㅤ값",
         "LTOKEN" : "계정1의ㅤltoken_v2ㅤ값",
         "GAMES" : [ "원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로" ],
         "DISCORD_WEBHOOK" : "계정1의ㅤ디스코드ㅤ웹훅ㅤURL",
         "NAME" : "계정1의ㅤ이름",
         "AVATAR" : "계정1의ㅤ디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL"
        }
        ,{
         "LTUID" : "계정2의ㅤltuid_v2ㅤ값",
         "LTOKEN" : "계정2의ㅤltoken_v2ㅤ값",
         "GAMES" : [ "붕괴 3rd", "원신", "붕괴: 스타레일" ],
         "DISCORD_WEBHOOK" : "계정2의ㅤ디스코드ㅤ웹훅ㅤURL",
         "NAME" : "계정2의ㅤ이름",
         "AVATAR" : "계정2의ㅤ디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL"
        }
    ]
}
```

</details>






## #3-1. 코드 설명 -『필수 입력』

- **`"SHOW_ALIAS_AS_IS"`** : 아래 표시 부분에 별칭을 사용할건지 여부 `"o/x"`
    - <img width="200" height="210" alt="image" src="https://github.com/user-attachments/assets/b52479c2-e1fc-40ef-a182-8c2b3f8a2995" />
- **`"GAMES"`** : 출석 원하는 게임 이름/별칭 입력
    - `[ "원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로" ]`

<details>
<summary> 【 사용 가능한 별칭 】누르면 나옵니다. </summary>

- **별칭 수정은 `index.js` 파일의 `const GAME_ALIASES` 코드 참고.**

```json

const GAME_ALIASES = {
  "원신": [ "겐신", "1신", "원공노", "공월", "공월의노래" ],
  "붕괴: 스타레일": [ "붕스", "붕스타", "별", "별붕", "스타레일", "붕괴스타레일", "붕괴 : 스타레일" ],
  "붕괴 3rd": [ "붕3", "붕3rd", "붕괴3rd", "3rd" ],
  "젠레스 존 제로": [ "젠존제", "찢", "ㅈㅈㅈ", "젠레스존제로", "zzz", "젠레스", "존", "제로", "z" ]
};

```

</details>

- **`"LTUID"`** = **`ltuid_v2`** `(유저 고유 ID)` 『 **`#2. 쿠키 값 얻기`** 참고』
- **`"LTOKEN"`** = **`ltoken_v2`** `(로그인 쿠키값)` 『 **`#2. 쿠키 값 얻기`** 참고』


## #3-2. 코드 설명 -『선택사항』

**미사용 시 : `""`**

비어 있을 시 가장 마지막에 입력된 값으로 사용 됩니다.

- **`"NAME"`** = 계정 분류용
    - <img width="200" height="352" alt="image" src="https://github.com/user-attachments/assets/2e422f67-370a-4751-ac85-6c9398e5147e" />


- **`"AVATAR"`** = 웹훅 프로필
- **`"DISCORD_WEBHOOK"`** = 웹훅 URL

</details>


---
## #4. 실행 확인

<details>

<summary> 『필수사항』누르면 설명 나옵니다. </summary>

- **수동 테스트 : 복사된 본인 저장소의 `▶️Actions` 상단 탭 → `HoYoLab 자동 출석 (아무거나)` → `Run workflow ▼` → `Run workflow` 클릭**
    - 해당 **`▶️Actions`** 탭의 각 실행 로그 확인 가능.
    - <img width="300" height="215" alt="image" src="https://github.com/user-attachments/assets/8d87b3d8-8868-4684-9c84-dad67c9d793e" />
    - <img width="300" height="156" alt="image" src="https://github.com/user-attachments/assets/e21543a5-1952-4673-a23e-f9bcfd6cd62b" />

</details>


---
## #5. 출석 시간 설정

HoYoLab 출석 가능 시간 : `한국시간(KST) 01:00` = `중국시간(CST) 00:00` = `UTC 16:00`

<details>
<summary> 『기본 설정』누르면 설명 나옵니다. </summary>

- **`매일 한국시간(KST) 00:00 ~ 23:00`**
    - KST 기준 오늘 하루 출석에 성공한 기록이 있으면, 설정한 시간이 되어도 건너 뛰어 알림이 오지 않습니다.
        - 수동 실행은 작동함.

</details>

<details>
<summary> 『설정 수정 방법』누르면 설명 나옵니다. </summary>

- `.github/workflows` 내부의 **`checkin`** 파일 4개의 `cron` 값을 임의로 수정하여 사용.
    - `KST 09:10` = `UTC 00:10` = **`cron: "10 0 * * *"`**
    - **추천 변환기 사이트** : [datetime360.com](https://datetime360.com/ko/utc-seoul-time/)
- 하루에 파일 내용을 자주 바꿀 시 스케줄러가 작동 안할 수도 있습니다.
    - 이건 GitHub 서버의 고질적 문제라 외부 서비스에서 GitHub API를 호출해서 workflow_dispatch를 트리거 해야합니다.
    - 또는, 스케줄러 작동 안하는 하루만 수동 작동하고, UTC 기준 다음날부터 스케줄러가 작동하는지 지켜보면 됩니다.

</details>

---
끝 :)
