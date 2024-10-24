module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    // Add rules
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',

    // Overide above rules
    'eslint-config-prettier',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['prettier'],
  settings: {
    react: {
      // Tell eslint-plugin-react automatic know React version
      version: 'detect'
    },
    // Eslint resolve import
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json')
      }
    }
  },
  env: {
    node: true
  },
  rules: {
    // Disable require import React rule in the component files
    'react/react-in-jsx-scope': 'off',
    // Waring when a tag <a target='_blank'> do not have rel="noreferrer" attribute
    'react/jsx-no-target-blank': 'warn',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
