/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",

        "base-0": "var(--color-base-0)",
        "base-1": "var(--color-base-1)",
        "base-2": "var(--color-base-2)",

        "fg-0": "var(--color-fg-0)",
        "fg-1": "var(--color-fg-1)",
        "fg-2": "var(--color-fg-2)",

        accent: "var(--color-accent)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tetriary: "var(--color-tetriary)",

        error: "var(--color-error)",
        advanced: "var(--color-advanced)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        uncommon: "var(--color-uncommon)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
