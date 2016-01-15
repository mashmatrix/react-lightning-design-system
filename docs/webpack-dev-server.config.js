const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'src/public');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  // Entry point to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/main.js'),
  ],
  // Webpack config options on how to obtain modules
  resolve: {
    // When requiring, you don't need to add these extensions
    extensions: ['', '.js'],
    alias: {
      'react-lightning-design-system': path.resolve(__dirname, '../src/scripts'),
    },
    // Modules will be searched for in these directories
    modulesDirectories: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ],
  },
  resolveLoader: {
    modulesDirectories: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  // Configuration for dev server
  devServer: {
    contentBase: 'src/public',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
  },
  devtool: 'eval',
  // Output file config
  output: {
    path: buildPath,    // Path of output file
    filename: 'app.js',  // Name of output file
  },
  plugins: [
    // Used to include index.html in build folder
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, '/src/public/index.html'),
    }),
    // Allows for sync with browser while developing (like BorwserSync)
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
  ],
  externals: {
    fs: 'js', // To remove once https://github.com/benjamn/recast/pull/238 is released
  },
  module: {
    // eslint loader
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          path.resolve(__dirname, '../src/scripts/'),
        ],
      },
    ],
    // Allow loading of non-es
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  eslint: {
    configFile: '../.eslintrc',
  },
};

module.exports = config;
