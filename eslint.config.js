import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off"
        },
        languageOptions: {
            globals: {
                window: "readonly",
                document: "readonly",
                import: "readonly",
                console: "readonly"
            }
        }
    }
];