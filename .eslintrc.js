module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  plugins: ["mocha"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-restricted-syntax": ["error", "ForOfStatement"],
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "mocha/no-exclusive-tests": "error",
    "no-console": ["off"]
  },
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "import/no-extraneous-dependencies": ["off"],
        "no-alert": ["off"],
        "no-console": ["off"],
        "react/prop-types": ["off"],
        "no-undef": ["off"],
        "no-unused-expressions": ["off"]
      }
    }
  ]
};
