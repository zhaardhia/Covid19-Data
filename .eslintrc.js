
"use strict";
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended", "google",
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "rules": {
    "semi": ["warn", "always"],
    "quotes": ["warn", "double"],
  },
};
