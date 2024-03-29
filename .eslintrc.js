module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],

  "env": {
    "es6": true,
    "node": true,
    "browser": true,
    "jquery": true,
    "mocha": true
  },

  "globals": {
    "localStorage": true,
    "sinon": true,
    "$": true,
    "window": true,
    "expect": true,
    "location": true,
    "document": true,
    "alert": true
  },

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "root": true,
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "max-len": [1, 80, 2],
    "indent": [1, 2],
    "one-var": 0,
    "one-var-declaration-per-line": 0,
    "new-cap": 0,
    "consistent-return": 0,
    "no-param-reassign": 0,
    "comma-dangle": 0,
    "curly": [1, "multi-line"],
    "arrow-body-style": 0,
    "no-shadow": [1, { "allow": ["req", "res", "err"] }],
    "no-undef": 0,
    "jsx-quotes": 1,
    "class-methods-use-this": 1,
    "react/display-name": [ 1, {"ignoreTranspilerName": false }],
    "react/forbid-prop-types": [1, {"forbid": ["any"]}],
    "react/jsx-boolean-value": 1,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": 0,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/jsx-wrap-multilines": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 0,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/require-extension": 0,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "valid-jsdoc": [1, {
      "requireReturn": false,
      "requireReturnType": false,
      "requireParamDescription": false,
      "requireReturnDescription": false
    }],
    "require-jsdoc": [1, {
      "require": {
      "FunctionDeclaration": true,
      "MethodDefinition": false,
      "ClassDeclaration": false
      }
    }]
  }
}
