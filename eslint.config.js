import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/**",
      "__fixtures__/**",
      "coverage/**"], // Исключаемые папки
    languageOptions: {
      globals: {
        ...globals.browser, // Существующие глобальные переменные браузера
        ...globals.node,    // Добавляем глобальные переменные Node.js
      },
    },
  },
  pluginJs.configs.recommended,
];
