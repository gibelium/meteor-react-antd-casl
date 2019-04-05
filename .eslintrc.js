/** @format */

module.exports = {
  plugins: [
    'babel',
    'meteor',
    'prettier',
    //'react',
    'import',
    'filenames',
    //'const-case',
  ],
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/babel',
    'prettier/react',
    'plugin:react/recommended',
    'plugin:meteor/recommended',
    'plugin:import/react',
    'plugin:import/recommended',
  ],
  env: {
    // Environment definition
    es6: true,
    meteor: true,
    node: true,
    browser: true,
  },
  rules: {

    // EsLint checks
    'no-console': 'off', // If active it claims calls to console output which is problematic in productive code (https://eslint.org/docs/rules/no-console).
    'no-unused-vars': [
      // Claims unused variables and function parameters
      'error',
      {
        args: 'none', // We omit errors regarding unused function parameters, as in framework scenarios this is often not avoidable.
      },
    ],
    'no-empty': 'warn', // Warn about empty code blocks.
    'no-underscore-dangle': 'off', // If enabled no leading or trailing underscores are allowed in variable or function names.

    // Prettier findings severity
    'prettier/prettier': 'error',


    // TODO: CROSSCHECK..!! Could be good to enable this check..!! (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md)
    //'react/forbid-prop-types': 0,

    // React-Imports
    'import/newline-after-import': 'warn', // Enforces having one or more empty lines after the last top-level import statement.
    'import/no-absolute-path': 'error',
    'import/no-unresolved': ['warn', { ignore: ['^meteor/'] }],
    'import/no-named-as-default': 'off',
    'import/extensions': ['error', 'never', { svg: 'always', less: 'always', jsx: 'always' }], // Define which files do need a file extension on JSX imports.

    // Variables
    'no-shadow-restricted-names': ['error'],
    'no-use-before-define': ['error'],

    // String Concatenation
    'prefer-template': ['error'], // Prefer ES6 template style string concatenation.
    'template-curly-spacing': ['error', 'never'], // No inner spaces within curly braces.
    'object-curly-newline': 'off', // Disabled as prettier handles this
    'no-useless-concat': ['warn'], // Create warning for non-necessary string concatenations

    // Error Handling
    'no-throw-literal': ['error'],
    'no-useless-catch': ['error'],
    'handle-callback-err': ['error', '^.*(e|E)rr'],

    // Others
    'no-useless-return': ['error'],
    'no-self-compare': ['error'],
  },
  globals: {
    // Place to define global variables (https://eslint.org/docs/user-guide/configuring#specifying-globals)
    i18n: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  settings: {
    react: {
      version: require('./package.json').dependencies.react, // "detect", // Detects the installed React version // TODO Should work with 'detect' but does not. Using working solution for now.
      createClass: 'createReactClass', // Regex for Component Factory to use, default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: [
      // The names of any functions used to wrap the propTypes object, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' },
    ],
    'import/resolver': {
      meteor: {
        extensions: ['.js', '.jsx'],
        moduleDirectory: ['node_modules', 'packages'],
      },
    },
  },
};
