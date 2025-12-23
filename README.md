# 예술가 포트폴리오 웹사이트

Next.js와 Framer Motion을 사용하여 만든 예술적인 포트폴리오 웹사이트입니다.

## 주요 기능

- **가로 스크롤 레이아웃**: 디지털 갤러리 느낌의 유려한 가로 스크롤
- **커스텀 커서**: 마우스 커서를 따라다니는 예술적인 커스텀 커서
- **인터랙티브 이미지 효과**: 이미지 호버 시 확대 및 3D 왜곡 효과
- **부드러운 페이지 전환**: 페이드 인/아웃 애니메이션
- **타이포그래피**: 세리프체 제목과 산세리프체 본문의 조화

## 섹션 구성

1. **Intro**: 전체 화면 슬로건과 배경 그라데이션
2. **Work Gallery**: 비정형 그리드 레이아웃의 작품 갤러리
3. **About**: 텍스트 중심의 소개 페이지

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

## 커스터마이징

### 작품 이미지 추가

1. `public` 폴더에 이미지 파일을 추가하세요
2. `app/components/WorkGallery.tsx`의 `artworks` 배열을 수정하여 이미지 경로를 업데이트하세요
3. Next.js Image 컴포넌트를 사용하려면 주석 처리된 부분을 활성화하세요

### 배경 영상 추가

`app/components/IntroSection.tsx`에서 주석 처리된 비디오 태그를 활성화하고 `public` 폴더에 비디오 파일을 추가하세요.

### 폰트 변경

`app/layout.tsx`에서 Google Fonts를 변경하거나 다른 폰트를 추가할 수 있습니다.

## 기술 스택

- **Next.js 16**: React 프레임워크
- **Framer Motion**: 애니메이션 라이브러리
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크

## 라이선스

MIT
