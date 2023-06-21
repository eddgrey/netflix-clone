/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        netflix: {
          primary: "#e50914",
          "primary-content": "#000000",
          secondary: "#221f1f",
          accent: "#c149ad",
          neutral: "#ffffff",
          "base-100": "#f5f5f1",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
