module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'prettier'],
  rules: {
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/order': [
      'warn',
      {
        groups: [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'internal',
          },
          {
            pattern: 'assets/**',
            group: 'internal',
          },
          {
            pattern: 'components/**',
            group: 'internal',
          },
          {
            pattern: 'types/**',
            group: 'internal',
          },
          {
            pattern: 'utils/**',
            group: 'internal',
          },
          {
            pattern: 'constants/**',
            group: 'internal',
          },
          {
            pattern: 'hooks/**',
            group: 'internal',
          },
          {
            pattern: './**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    quotes: ['warn', 'single'],
    indent: ['warn', 2],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'prettier/prettier': [
      'warn',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'no-unused-vars': 'warn', // Warns on unused variables
    'no-console': 'warn', // Warns on console statements,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
