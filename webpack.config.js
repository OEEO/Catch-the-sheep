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
            use: ['style-loader', 'css-loader','postcss-loader' ],
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader' ,'sass-loader'],
          },
          {
            test: /\.js$/,
            use: ['babel-loader'],
          },
        ]
    },
    devtool: 'source-map'
};