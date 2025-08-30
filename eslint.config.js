const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended");

module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      "react/prop-types": "off",
    },
  },
];