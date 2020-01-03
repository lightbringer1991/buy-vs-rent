module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    ignorePatterns: ['node_modules/', 'build/'],
    extends: [
        'eslint:recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {

    },
};
