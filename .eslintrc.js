module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  root: true,
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  // TODO: Resolve from project root
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       extensions: ['.css', '.js', '.json', '.scss', '.ts'],
  //       moduleDirectory: ['node_modules', './src'],
  //     },
  //   },
  // },
  plugins: ['@typescript-eslint/eslint-plugin', 'jest', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:jest/recommended',

    // Custom order
    'airbnb-typescript/base',
    'prettier',
    'prettier/@typescript-eslint', // Last
    'plugin:prettier/recommended', // Last
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/extensions': [2, 'ignorePackages', { 'ts': 'never' }],
    'import/order': 0,
    'no-console': 0, // TODO: add a logger
    'no-empty': [2, { 'allowEmptyCatch': true }],
    'no-unused-vars': 0,
    'prettier/prettier': [
      2,
      {
        endOfLine: 'lf',
        printWidth: 100,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
      // avoid .prettierrc as it doesn't apply on eslint (bug)
      { usePrettierrc: false },
    ],

    // Collisions with nestjs
    '@typescript-eslint/no-unused-vars': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'no-empty-function': 0,
    'no-unused-vars': 0,
    'no-useless-constructor': 0,
  },
};
