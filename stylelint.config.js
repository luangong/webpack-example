module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {},
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-standard-scss'],
    },
  ],
};
