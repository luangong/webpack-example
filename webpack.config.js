const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const FileListPlugin = require('./filelist');
const MyTemplatePlugin = require('./MyTemplatePlugin');
const FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');

module.exports = {
  entry: {
    // index: './index.js',
    a: './src/a/index.js',
    b: './src/b/index.js',
    c: './src/c/index.js',
    // common: './src/common/index.js',
    // popover: './src/popover/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  // target: () => undefined,
  target: compiler => {
    compiler.apply(
      new MyTemplatePlugin(),
      new FunctionModulePlugin(),
      new webpack.LoaderTargetPlugin('web')
    );
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        })
        // use: 'css-loader?modules=true&localIdentName=[name]__[local]--[hash:base64:5]'
      },
      {
        test: /\.marko$/,
        loader: 'marko-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),

    // new ChunkManifestPlugin({
    //   filename: 'manifest.json',
    //   manifestVariable: 'webpackManifest',
    //   inlineManifest: false
    // }),
    // new ManifestPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b', 'c']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'popover',
      chunks: ['a', 'b']
    }),

    // Extract the webpack bootstrap logic into a separate file
    new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),

    new ExtractTextPlugin({
      filename: '[name].css',
      // allChunks: true
    }),

    new FileListPlugin(),
    new CleanWebpackPlugin(['dist'])
  ]
};
