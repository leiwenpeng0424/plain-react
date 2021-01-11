"use strict";

module.exports = {
    root: true,
    extends: "./eslint/rules.js",
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
                // For TS Type-Checking, It's Necessary For Local Dev Enviroment
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ]
        },
        {
            files: ["packages/*/__tests__/**/*.{js,ts}"],
            env: {
                jest: true
            },
            rules: {
                "@typescript-eslint/ban-ts-comment": "off"
            }
        },
        {
            files: ["{eslint,scripts}/**/*.js"],
            env: {
                node: true
            },
            rules: {
                "no-process-env": "off"
            }
        }
    ]
};
