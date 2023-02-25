/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {},
      typography: {
        default: {
          css: {
            "--tw-prose-body": "var(--prose-body)",
            "--tw-prose-headings": "var(--prose-headings)",
            "--tw-prose-lead": "var(--prose-lead)",
            "--tw-prose-links": "var(--prose-links)",
            "--tw-prose-bold": "var(--prose-bold)",
            "--tw-prose-counters": "var(--prose-counters)",
            "--tw-prose-bullets": "var(--prose-bullets)",
            "--tw-prose-hr": "var(--prose-hr)",
            "--tw-prose-quotes": "var(--prose-quotes)",
            "--tw-prose-quote-borders": "var(--prose-quoteBorders)",
            "--tw-prose-captions": "var(--prose-captions)",
            "--tw-prose-code": "var(--prose-code)",
            "--tw-prose-pre-code": "var(--prose-preCode)",
            "--tw-prose-pre-bg": "var(--prose-preBg)",
            "--tw-prose-th-borders": "var(--prose-thBorders)",
            "--tw-prose-td-borders": "var(--prose-tdBorders)",
          },
        },
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
