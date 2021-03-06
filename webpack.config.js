const path    = require("path")
const webpack = require("webpack")
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';


module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    application: ["./app/javascript/application.js"]
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js-[contenthash].map",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  optimization: {
    moduleIds: 'deterministic'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png)$/,
        include: path.resolve(__dirname, "app/javascript/images"),
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "app/javascript"),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults"
              }],
              '@babel/preset-react',
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
