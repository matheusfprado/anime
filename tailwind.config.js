module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { title: "var(--font-title)" },
      colors: {
        "brand-gold": "#f2c14e",
        "panel": "rgba(12,12,16,0.75)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
