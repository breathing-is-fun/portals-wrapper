// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
  commonModule: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  commonPlugin: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new WebpackBar({
      name: '少女祈祷中...  ',
      color: 'cyanBright',
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/assets',
        to: __dirname + '/dist/lib/assets',
      },
      {
        from: __dirname + '/src/mock',
        to: __dirname + '/dist/mock',
      },
      {
        from: __dirname + '/thirdModules',
        to: __dirname + '/dist/thirdModules',
      },
      {
        from: __dirname + '/src/guide',
        to: __dirname + '/dist/guide',
      },
    ]),
  ],
};
