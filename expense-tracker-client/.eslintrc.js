module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "airbnb",
        "plugin:flowtype/recommended",
    ],
    "env": {
      "browser": true,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "flowtype"
    ],
    "rules": {
        "no-confusing-arrow": 0,
        "object-curly-spacing": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-unused-vars": "warn",
        "import/no-unresolved": [2, { "ignore": [
          'components',
          'containers',
          'actions',
          'reducers',
          'router',
          'root',
        ]}],
        "no-useless-computed-key": 0,
        "react/no-did-mount-set-state": 0,
        "import/no-extraneous-dependencies": 0,
        "no-underscore-dangle": 0,
        "react/no-unused-prop-types": 0,
        "import/extensions": 0,
        "react/sort-comp": [1, {
            order: [
                'type-annotations',
                'static-methods',
                'lifecycle',
                'everything-else',
                'render',
            ],
        }],
    },
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": [
                    "node_modules",
                    "src/**",
                ],
            },
        },
        "import/external-module-folders": ["node_modules", "src"],
    },
};
