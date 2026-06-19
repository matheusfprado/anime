module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Trebuchet MS", "Segoe UI", Arial, sans-serif',
        title: '"Arial Black", "Trebuchet MS", "Segoe UI", sans-serif',
      },
      colors: {
        "brand-gold": "#f2c14e",
        "panel": "rgba(12,12,16,0.75)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
