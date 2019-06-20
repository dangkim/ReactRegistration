const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/index.jsx',
    mode: 'development',
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
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it uses publicPath in webpackOptions.output
                      //publicPath: '../',
                      //hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                ],
              },
            // {
            //     test:/\.css$/,
            //     use:['style-loader','css-loader']
            // },
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
                    loader: 'file-loader?name=/images/[name].[ext]',
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        configContent: JSON.stringify({
            apiUrl: 'http://ec2-54-169-165-94.ap-southeast-1.compute.amazonaws.com'
        }),
        configOrchardCore: JSON.stringify({
            apiUrl: 'http://ec2-54-169-165-94.ap-southeast-1.compute.amazonaws.com/api'
        })
    }
}
// testing