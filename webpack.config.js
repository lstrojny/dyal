const path = require('path')

module.exports = {
  entry: './src/loader.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src')]
  },
  output: {
    filename: 'loader.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DYAL'
  }
}
