import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylisticJs from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['node_modules/*', 'dist/*'],
    },
    // 1. Load Base Configurations (Presets)
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic, // Defines original stylistic rules
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],

    // 2. Global Options
    { languageOptions: { globals: globals.browser } },

    // 3. Custom Overrides (Must come AFTER presets)
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: {
            '@stylistic': stylisticJs,
        },
        rules: {
            // React
            'react/react-in-jsx-scope': 'off',
            // Not needed in Vite/React 18+ usually, but acceptable
            'react/jsx-uses-vars': 'error',

            // Stylistic Overrides
            '@stylistic/indent': ['error', 4],
            '@stylistic/arrow-parens': ['error'],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/quotes': [
                'error',
                'single',
                {
                    allowTemplateLiterals: true,
                },
            ],
            '@stylistic/comma-dangle': [
                'error',
                'always-multiline',
            ],
            '@stylistic/keyword-spacing': ['error'],
            '@stylistic/space-before-blocks': ['error'],
            '@stylistic/space-infix-ops': ['error'],

            // Strict Max Len (User Request)
            '@stylistic/max-len': [
                'error',
                {
                    code: 150,
                    tabWidth: 4,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                },
            ],

            // Enforce Barrier Pattern (Max Depth 2)
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                '**/features/*/*',
                                '**/entities/*/*',
                                '**/widgets/*/*',
                                '**/shared/*/*',
                            ],
                            message: 'Please import from the index file (barrel) instead of deep paths.',
                        },
                    ],
                },
            ],
        },
    },
]
