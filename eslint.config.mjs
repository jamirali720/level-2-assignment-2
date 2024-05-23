import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {languageOptions: { globals:{ ...globals.node }}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      "no-undef":"error", 
      "no-unused-vars":"error", 
      "no-console" : "warn", 
      "prefer-const": "error"
    }
  }, 
  {
    ignores: ['**/node_modules/', '**/dist/', '**/.env']
  }
];