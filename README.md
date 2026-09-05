# NEXUS OPS 구매 페이지

정적(Static) 웹사이트라서 별도 서버 코드 없이 바로 배포할 수 있습니다.

## 1. 반드시 바꿀 것
`config.js` 파일을 열고 아래 2개 주소를 실제 주소로 교체하세요.

- `botInviteUrl`: NEXUS OPS 봇 초대 링크
- `discordSupportUrl`: NEXUS OPS 공식 Discord 서버 또는 구매문의 링크

예시:
```js
window.NEXUS_CONFIG = {
  botInviteUrl: "https://discord.com/oauth2/authorize?...",
  discordSupportUrl: "https://discord.gg/xxxxxx",
  brandName: "NEXUS OPS"
};
```

## 2. 실행 확인
`index.html`을 더블클릭하면 브라우저에서 바로 확인할 수 있습니다.

## 3. 무료 배포 추천
Cloudflare Pages, GitHub Pages, Netlify 같은 정적 사이트 호스팅에 이 폴더 전체를 업로드하면 됩니다.

## 4. 현재 구매 흐름
1. 고객이 30일 / 90일 / 365일 플랜 선택
2. Discord 사용자명 및 서버 정보 입력
3. 페이지가 주문번호와 주문서를 자동 생성
4. 고객이 주문서를 복사
5. `Discord 구매문의 열기` 클릭
6. 운영자가 결제 안내 및 확인
7. NEXUS OPS `/admin`에서 라이선스 발급
8. 고객 서버 관리자가 `/license`로 활성화

## 5. 가격 변경
`index.html`에서 `₩4,900`, `₩12,900`, `₩39,900`과 각 카드의 `data-price` 값을 함께 수정하세요.

## 주의
이 버전은 카드결제/계좌이체를 웹사이트에서 자동 처리하지 않습니다. 실제 결제는 Discord 구매문의에서 안내하는 수동 결제 방식입니다.
