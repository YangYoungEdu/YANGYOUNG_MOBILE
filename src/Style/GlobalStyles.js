import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* box-sizing 규칙을 명시합니다. */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 폰트 크기의 팽창을 방지합니다. */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

/* 기본 여백을 제거하여 작성된 CSS를 더 잘 제어할 수 있습니다. */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin-block-end: 0;
}

/* list를 role값으로 갖는 ul, ol 요소의 기본 목록 스타일을 제거합니다. */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* 핵심 body의 기본값을 설정합니다. */
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Pretendard";
  line-height: 130%;
  letter-spacing: -2%;
}


/* 해당 태그들을 중앙정렬하고, 기본 css 속성 제거 */
div, input, label, button, h1, h2, h3, h4, textarea{
    all: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
}

button {
  user-select : none;
}

/* 클래스가 없는 기본 a 태그 요소는 기본 스타일을 가져옵니다. */
a:not([class]) {
  text-decoration-skip-ink: auto;
  color: currentColor;
}

/* 이미지 관련 작업을 더 쉽게 합니다. */
img,
picture {
  max-width: 100%;
  display: block;
}

/* input 및 button 항목들이 글꼴을 상속하도록 합니다. */
input,
button,
textarea,
select {
  font: inherit;
}

/* 고정된 모든 항목에는 여분의 스크롤 여백이 있어야 합니다. */
:target {
  scroll-margin-block: 5ex;
}


// 웹폰트 적용 (내장 폰트를 적용할 경우 개발 환경에 따라 적용이 안되는 경우가 있음)
@font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-style: normal;
    /* font-weight: 600; */
}

/* @font-face {
    font-family: "Pretendard-SemiBold";
    font-weight: 600;
    src: url(pre/Pretendard-SemiBold.woff) format('woff');
}

@font-face {
    font-family: "Pretendard-Medium";
    font-weight: 500;
    src: url(pre/Pretendard-Medium.woff) format('woff');
} */

/* @font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Thin.ttf') format("truetype");
  font-display: swap;
} */
/* 
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraLight.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Light.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-ExtraBold.ttf') format("truetype");
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard';
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.eot');
  src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.eot?#iefix') format('embedded-opentype'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.woff2') format('woff2'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.woff') format('woff'),
      url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Black.ttf') format("truetype");
  font-display: swap;
} */
`;

export default GlobalStyles;
