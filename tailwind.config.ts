/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-out": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      animation: {
        fadeIn: "fade-in .3s ease 0s 1",
        fadeOut: "fade-out .3s ease 0s 1",
      },
      objectPosition: {
        "center-bottom": "center bottom",
      },
    },
  },
  plugins: [],
};
