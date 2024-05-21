/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: {
        max: "48rem",
      },
      md: {
        min: "48rem",
        max: "60rem",
      },
      mdsm: {
        max: "60rem",
      },
      lgmd: { min: "48rem" },
      lg: {
        min: "60rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
