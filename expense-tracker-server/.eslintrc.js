module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
        "object-curly-spacing": ["error", "never"],
        "no-console": ["error", { allow: ["info", "error"] }],
        "no-underscore-dangle": 0,
        "no-param-reassign": 0,
    },
};
