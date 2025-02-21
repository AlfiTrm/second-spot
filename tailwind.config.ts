/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryLight: "#89BC68",
        secondary: "#E7CEC0",
        secondaryLight:"#FFEFE5",
      },
      spacing: {
        29: "115px",
      },
    },
  },
  plugins: [],
};
