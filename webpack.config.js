const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

var uglifyJsPlugin = process.env.PROD == 1? [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    output: {
      comments: false
    },
    compressor: {
      warnings: false
    }
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
] : [];

var uglifyCssPlugin = process.env.PROD == 1? [ new OptimizeCssAssetsWebpackPlugin() ] : []

module.exports = [
  {
    name: 'javascript',
    entry: __dirname + '/resources/assets/js/bootstrap.js',
    output: {
      filename: 'app.js',
      path: __dirname + '/public/js'
    },
    module: {
      loaders: [
        {
          test: /\.js/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'env'],
            plugins: ['babel-plugin-transform-object-rest-spread', 'babel-plugin-transform-class-properties']
          }
        },
        {
          test: /\.js/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: uglifyJsPlugin
  },

  {
    name: 'stylesheets',
    entry: __dirname + '/resources/assets/sass/bootstrap.sass',
    output: {
      filename: 'app.css',
      path: __dirname + '/public/css'
    },
    module: {
      loaders: [
        {
          test: /\.sass/,
          loader: ExtractTextWebpackPlugin.extract({
            use: 'css-loader!postcss-loader!sass-loader',
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [
      new ExtractTextWebpackPlugin('app.css'),

    ].concat(uglifyCssPlugin)
  }
];
