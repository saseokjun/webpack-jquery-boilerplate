const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const isDevMode = process.env.NODE_ENV.includes('dev')
const entryPointsArray = ['a', 'b']

const entry = () => {
  const result = {}
  for(const point of entryPointsArray){
    result[point] = `./src/js/${point}.ts`
  }
  return result
}
const htmlWebpackPluginGenerator = (nameArray) => {
  return nameArray.map(name => {
    return new HtmlWebpackPlugin({
      template: `./src/html/${name}.html`,
      hash: true,
      filename: `${name}.html`,
      chunks: [name]
    })
  })
}

const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development'
  }),
  ...htmlWebpackPluginGenerator(entryPointsArray)
]

if(!isDevMode){
  plugins.push(
    new MiniCssExtractPlugin({
      linkType: false,
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[id].[contenthash].css'
    })
  )
}

module.exports = {
  mode: isDevMode ? 'development': 'production',
  target: 'web',
  entry,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'assets/js/[name].[contenthash].js',
    assetModuleFilename: 'assets/img/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: 'babel-loader',
        exclude: ['/node_modules'],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: ['/node_modules'],
      },
      {
        test: /\.css$/i,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
          'css-modules-typescript-loader',
          'css-loader'
        ],
        exclude: ['/node_modules'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js', '.css'],
  },
  plugins,
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  devServer: {
    host: 'localhost',
    port: 5500
  },
}