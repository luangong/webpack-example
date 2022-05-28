// https://github.com/airbnb/babel-preset-airbnb
// TODO: eslint-config-airbnb requires babel-preset-airbnb
module.exports = {
  presets: [
    // https://babel.dev/docs/en/babel-preset-env
    '@babel/preset-env',

    // https://babel.dev/docs/en/babel-preset-react
    ['@babel/preset-react', { runtime: 'automatic' }],

    // https://babel.dev/docs/en/babel-preset-typescript
    '@babel/preset-typescript',
  ],
};
