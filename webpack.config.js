const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            // 用正则去匹配要用该 loader 转换的 CSS 文件
            test: /\.css$/,
            use: ['style-loader', 'css-loader?sourceMap','postcss-loader?sourceMap' ],
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap' ,'sass-loader?sourceMap'],
          },
          {
            test: /\.js$/,
            use: ['babel-loader'],
          },
          {
              test:/\.(png)|(jpg)$/,
              use: ['url-loader?limit=50000&name=[path][name].[ext]&outputPath=&publicPath=dist/']
          }
        ]
    },
    devtool: 'source-map'
};