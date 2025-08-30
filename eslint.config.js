const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended");

module.exports = [
  {
    ignores: ["src/tilemap-editor-legacy.js"],
  },
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