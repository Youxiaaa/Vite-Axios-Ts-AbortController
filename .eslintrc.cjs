module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        "./.eslintrc-auto-import.json"
    ],
    "overrides": [
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": "@typescript-eslint/parser"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "import/no-absolute-path": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "vue/multi-word-component-names": "off"
    }
}
