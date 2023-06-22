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
          "primary-content": "#ffffff",
          secondary: "#2d2d2d",
          "secondary-content": "#737373",
          "base-100": "#000000",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
