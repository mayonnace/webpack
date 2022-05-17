const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
    assetModuleFilename: "assets/img/[hash][ext][query]"
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ['buffer', 'Buffer'],
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      favicon:"./src/assets/img/logo.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {targets: "defaults", "debug": true, "useBuiltIns": "usage", "corejs": 3}], ["@babel/preset-react", {runtime: "automatic"}]]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset"
      },
    ]
  },
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true, 
    historyApiFallback: {
      disableDotRule: true
    }
  },
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve("url/"),
    },
  },
  proxy: {
    '/api': 'http://localhost:8000',
    changeOrigin: true,
  },
}