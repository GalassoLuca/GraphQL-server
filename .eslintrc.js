module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "no-console": 0,
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ]
  }
};