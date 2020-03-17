const path = require("path");

module.exports = {
  entry: {
    app: "./src/js/app.js",
    calculator: "./src/js/calculator/calculator.js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          }
          , 'sass-loader'
        ],
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    filename: '[name].js'
  },
}