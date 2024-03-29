module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:solid/typescript",
    "plugin:tailwindcss/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
  },
  plugins: ["solid", "@typescript-eslint"],
  ignorePatterns: [".eslintrc.cjs"],
  rules: {
    // Typescript
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
    "@typescript-eslint/prefer-reduce-type-parameter": "off",

    // Tailwind stuff
    "tailwindcss/no-custom-classname": [
      "warn",
      { whitelist: ["prose-default", "line-clamp-2"] },
    ],
    "tailwindcss/classnames-order": "off",
  },
};
