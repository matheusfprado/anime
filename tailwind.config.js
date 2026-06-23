module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Orbitron", "Segoe UI", Arial, sans-serif',
        title: '"Orbitron", "Segoe UI", Arial, sans-serif',
      },
      colors: {
        "brand-cyan": "#67e8f9",
        "brand-violet": "#8b5cf6",
        "panel": "rgba(10, 16, 35, 0.78)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
