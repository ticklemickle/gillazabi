/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // ✅ app은 src 하위에 존재
    "./src/components/**/*.{js,ts,jsx,tsx}", // ✅ 공통 컴포넌트가 이 경로일 경우
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00E28C", // 사용 중인 색상
        "main-color": "#00E28C",
      },
    },
  },
  plugins: [],
};
