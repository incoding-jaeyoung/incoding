# View Transitions API 데모 🎨

이 프로젝트는 **View Transitions API**를 사용하여 정적 HTML 페이지 간의 부드러운 전환 애니메이션을 구현한 데모입니다.

## 🌟 주요 특징

- **네이티브 브라우저 API**: JavaScript 라이브러리 없이 순수 CSS로 구현
- **부드러운 페이지 전환**: 슬라이드, 페이드 등 다양한 애니메이션 효과
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **접근성 지원**: `prefers-reduced-motion` 자동 처리
- **SEO 친화적**: 실제 페이지 네비게이션 유지

## 📁 파일 구조

```
view-transitions-demo/
├── index.html      # 홈 페이지
├── about.html      # 소개 페이지
├── gallery.html    # 갤러리 페이지
├── contact.html    # 연락처 페이지
├── style.css       # 전체 스타일 (View Transitions 포함)
└── README.md       # 이 파일
```

## 🚀 사용 방법

### 1. 파일 다운로드
모든 파일을 같은 폴더에 저장하세요.

### 2. 브라우저에서 열기
`index.html` 파일을 지원되는 브라우저에서 열어주세요.

### 3. 테스트하기
- 상단 네비게이션 링크를 클릭해보세요
- 브라우저의 뒤로가기/앞으로가기 버튼을 사용해보세요
- 다양한 페이지 간 전환을 경험해보세요

## 🌐 브라우저 지원

| 브라우저 | 버전 | 지원 상태 |
|---------|------|----------|
| Chrome  | 126+ | ✅ 완전 지원 |
| Safari  | 18.2+ | ✅ 완전 지원 |
| Edge    | 126+ | 🟡 부분 지원 |
| Firefox | -    | ❌ 미지원 |

## 💻 핵심 코드

### CSS에서 View Transitions 활성화
```css
@view-transition {
  navigation: auto;
}
```

### 커스텀 애니메이션 정의
```css
::view-transition-old(root) {
  animation: slide-out-left 0.4s ease-in-out;
}

::view-transition-new(root) {
  animation: slide-in-right 0.4s ease-in-out;
}
```

### 접근성 고려
```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none !important;
  }
}
```

## 🎯 주요 기능

### 1. 자동 페이지 전환
- 모든 링크 클릭 시 자동으로 부드러운 전환 적용
- 브라우저 히스토리 네비게이션 지원

### 2. 커스텀 애니메이션
- 슬라이드 인/아웃 효과
- 페이드 전환
- 하드웨어 가속 지원

### 3. 반응형 디자인
- 모바일, 태블릿, 데스크톱 최적화
- 터치 인터페이스 지원

### 4. 성능 최적화
- GPU 가속 애니메이션
- 최소한의 리소스 사용
- 빠른 로딩 시간

## 🔧 커스터마이징

### 애니메이션 변경
`style.css` 파일에서 다음 부분을 수정하여 다른 애니메이션을 적용할 수 있습니다:

```css
/* 예: 스케일 애니메이션 */
::view-transition-old(root) {
  animation: scale-out 0.3s ease-in;
}

::view-transition-new(root) {
  animation: scale-in 0.3s ease-out;
}

@keyframes scale-out {
  to { transform: scale(0.8); opacity: 0; }
}

@keyframes scale-in {
  from { transform: scale(1.2); opacity: 0; }
}
```

### 색상 테마 변경
CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📚 참고 자료

- [MDN View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Chrome Developers Guide](https://developer.chrome.com/docs/web-platform/view-transitions)
- [Can I Use - View Transitions](https://caniuse.com/view-transitions)

## 🐛 문제 해결

### 애니메이션이 작동하지 않는 경우
1. 브라우저 버전을 확인하세요 (Chrome 126+ 또는 Safari 18.2+ 필요)
2. 개발자 도구에서 콘솔 에러를 확인하세요
3. `prefers-reduced-motion` 설정을 확인하세요

### 성능 문제가 있는 경우
1. 애니메이션 지속 시간을 줄여보세요
2. 복잡한 CSS 효과를 단순화하세요
3. 이미지 크기를 최적화하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자유롭게 사용, 수정, 배포하실 수 있습니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 언제든 환영합니다!

---

**즐거운 개발 되세요! 🚀** 