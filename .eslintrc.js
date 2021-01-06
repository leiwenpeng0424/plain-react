"use strict";

module.exports = {
    root: true,
    plugins: [],
    extends: "./eslint/rules",
    env: {
        node: true
    },
    overrides: [
        {
            files: ["**/*.ts"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint"],
            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
            rules: {}
        },
        {
            files: ["packages/*/__tests__/**/*.{js,ts}"],
            env: {
                jest: true
            }
        }
    ]
};
