# HoYoLab 자동 출석 (GitHub 버전)

UPDATE : `2026-07-24` `AM 02:24`

**PC 화면에서 작업하시는걸 추천 드립니다.**

- AI 활용해서 깃허브에서 매일 자동으로 돌아가도록 바꾼 버전입니다.
- **출석 시간 설정** 방법은 **맨 아래** **`#4. 실행 확인`** 을 참고 하시면 됩니다.
- 계정 여러개 등록해서 사용 가능합니다.



---
## #실행 결과

<details>

<summary> 〔 디스코드 핸드폰 알림 〕 </summary>

<img width="500" height="225" alt="KakaoTalk_20260724_130135635" src="https://github.com/user-attachments/assets/d8b5e52e-0e19-424b-ab89-9209ab5bd1f6" />

</details>


<details>

<summary> 〔 성공 결과 디스코드 전송 〕 </summary>

<img width="200" height="352" alt="image" src="https://github.com/user-attachments/assets/80116e53-0dab-4fcb-882c-85fd79bb4eee" />
<img width="200" height="352" alt="image" src="https://github.com/user-attachments/assets/749ea2d7-28d2-4470-95fb-ae6fc3fc884c" />

</details>


<details>

<summary> 〔 실패 결과 디스코드 전송 〕 </summary>

- 실패 시 실패 이유(누락/조회 불가 등등)가 작성 되어 나옵니다.
    - 아래 사진은 캐릭터 조회가 안되어 실패 처리 = 게임 계정이 없다.

<img width="1000" height="313" alt="image" src="https://github.com/user-attachments/assets/97fad6f5-b96b-43c6-890b-da08d8f0877f" />
<img width="500" height="621" alt="image" src="https://github.com/user-attachments/assets/40cdf464-147b-4a3f-8805-6ac0fd6ec767" />

</details>



---
## 🚨🚨#주의사항#🚨🚨

🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
- **`ltuid_v2`, `ltoken_v2` 등 해당 값들은 타인에게 유출되면 게임 계정이 위험해질 수 있으니 **`#3. GitHub Secret`** 에만 등록하시길 경고해 드립니다.**
    - 편의를 위해 따로 보관하시더라도 유출에 유의해서 보관하시길 바랍니다.

🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨

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

<details>

<summary> 〔 계정 1개 사용 시 코드 〕 </summary>

```json
[
  {
    "LTUID" : " 계정1의ㅤltuid_v2ㅤ값 ",
    "LTOKEN" : " 계정1의ㅤltoken_v2ㅤ값 ",
    "GAMES" : [ "원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로" ],
    "DISCORD_WEBHOOK" : " 계정1의ㅤ디스코드ㅤ웹훅ㅤURL ",
    "NAME" : " 계정1의ㅤ디스코드ㅤ웹훅ㅤ이름 ",
    "AVATAR" : " 계정1의ㅤ디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL "
  }
]
```

</details>

<details>

<summary> 〔 계정 2개 이상 사용 시 코드 〕 </summary>

```json
[
  {
    "LTUID" : " 계정1의ㅤltuid_v2ㅤ값 ",
    "LTOKEN" : " 계정1의ㅤltoken_v2ㅤ값 ",
    "GAMES" : [ "원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로" ],
    "DISCORD_WEBHOOK" : " 계정1의ㅤ디스코드ㅤ웹훅ㅤURL ",
    "NAME" : " 계정1의ㅤ디스코드ㅤ웹훅ㅤ이름 ",
    "AVATAR" : " 계정1의ㅤ디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL "
  }
  ,{
    "LTUID" : " 계정2의ㅤltuid_v2ㅤ값 ",
    "LTOKEN" : " 계정2의ㅤltoken_v2ㅤ값 ",
    "GAMES" : [ "붕괴 3rd", "원신", "붕괴: 스타레일" ],
    "DISCORD_WEBHOOK" : " 계정2의ㅤ디스코드ㅤ웹훅ㅤURL ",
    "NAME" : " 계정2의ㅤ디스코드ㅤ웹훅ㅤ이름 ",
    "AVATAR" : " 계정2의ㅤ디스코드ㅤ웹훅ㅤ프로필ㅤ이미지ㅤURL "
  }
]
```

</details>

**`"LTUID"`**, **`"LTOKEN"`**, **`"GAMES"`** = **『필수 입력』**
- **`"LTUID"`** = **`ltuid_v2`** `(유저 고유 ID)` 『 **`#2. 쿠키 값 얻기`** 참고』
- **`"LTOKEN"`** = **`ltoken_v2`** `(로그인 쿠키값)` 『 **`#2. 쿠키 값 얻기`** 참고』
- **`"GAMES"`** = 출석을 원하는 게임만 입력하여 사용하면 됩니다.
   - 출석 가능한 게임 : **`["원신", "붕괴: 스타레일", "붕괴 3rd", "젠레스 존 제로"]`**
- 『선택사항』디스코드 웹훅 이름, 프로필, URL이 비어 있을 시 가장 마지막에 입력된 값으로 사용 됩니다.
   - 미사용 : **`""`**

</details>


---
## #4. 실행 확인

<details>

<summary> 『필수사항』누르면 설명 나옵니다. </summary>

- **테스트 : 복사된 본인 저장소의 `▶️Actions` 상단 탭 → `HoYoLab 자동 출석` → `Run workflow ▼` → `Run workflow` 클릭**
- 실행 로그는 `Actions` 탭의 각 실행 기록에서 확인 가능.
- **기본 설정**은 **`매일 한국시간(KST) 오전 2시`** `(UTC 17:00(-1일))`에 자동 실행.
  - **시간 설정** : `.github/workflows/` 안 쪽의 **`checkin1.yml`, `checkin2.yml`, `checkin3.yml`** 파일의 `cron` 값을 수정.
    - `KST 09:30` = `UTC 00:30` = **`cron: "30 0 * * *"`**
    - **추천 변환기 사이트** : [datetime360.com](https://datetime360.com/ko/utc-seoul-time/)
    - 하루에 너무 자주 바꿀 시 스케줄러가 작동 안할 수도 있습니다.
        - 이건 깃허브 서버의 고질적 문제라 다른 어플 사용해야 할 수 있습니다.
  - HoYoLab 출석 가능 시간 : `한국시간(KST) 01:00` = `중국시간(CST) 00:00`

</details>

---
감사합니다 :)
