const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.jsx',
    mode: 'production',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, 
                use: [
                'file-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    // options: {
                    //   name: '[name].[hash:8].[ext]',
                    //   outputPath: 'assets/'
                    // }
                  }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://localhost:44300'
        }),
        configOrchardCore: JSON.stringify({
            apiUrl: 'https://localhost:44300/api'
        })
    }
}