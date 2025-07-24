/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["MyCustomFont", "ui-sans-serif", "system-ui"],
      },
      fontWeight: {
        light: "310",
        base: "320",
        normal: "330",
        medium: "340",
        bold: "350",
      },
      colors: {
        "custom-blue": "#014EFE",
        "custom-yellow": "#FFFF02",
        "custom-red": "#FE504F",

        /* main color */
        "main-color": "#1E3A8A",
        "main-dark": "#163387",
        "main-darkest": "#0a1d57",
        "main-lightest": "#7092fa",
        "main-light-shadow": "#f0f4ff",
      },

      animation: {
        "shake-once": "shake-once 0.4s ease-in-out",
      },
      keyframes: {
        "shake-once": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-5px, -5px)" },
          "40%": { transform: "translate(5px, 5px)" },
          "60%": { transform: "translate(-4px, 3px)" },
          "80%": { transform: "translate(4px, -3px)" },
        },
      },
    },
  },
  plugins: [],
};
