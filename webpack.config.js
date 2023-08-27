const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const currentMode = (process.env.NODE_ENV === 'production'
  ? {
    // Production-mode-specific configurations
    name: 'production',
    devtool: 'source-map',
    plugins: [new CleanWebpackPlugin()],
    cssModulesLocalIdentName: '[hash]',
  } : {
    // Development-mode-specific configurations
    name: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
      new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
    cssModulesLocalIdentName: '[path][name]__[local]',
  });

const cssLoaderOptions = {
  modules: {
    localIdentName: currentMode.cssModulesLocalIdentName,
  },
};

module.exports = {
  mode: currentMode.name,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.[contenthash:8].js',
  },
  devtool: currentMode.devtool,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        // https://www.npmjs.com/package/babel-loader
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // https://webpack.js.org/loaders/css-loader/
            loader: 'css-loader',
            options: cssLoaderOptions,
          },
          // https://webpack.js.org/loaders/postcss-loader/
          'postcss-loader',
          {
            // https://webpack.js.org/loaders/sass-loader/
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: cssLoaderOptions,
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {},
          },
        ],
      },
      {
        // https://webpack.js.org/guides/asset-modules
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash:8][ext][query]',
        },
        parser: {
          dataUrlCondition: {
            // Assets smaller than 8 KB will be inlined as data URI
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    ...currentMode.plugins,
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      title: 'webpack Example',
      inject: false,
      appMountId: 'root',
      window: {
        foo: 'bar',
      },
    }),
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: 'css/styles.[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      FOO: JSON.stringify('bar'),
    }),
    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
};
