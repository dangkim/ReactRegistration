const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

// const manifest = new WebpackAssetsManifest({
//     output: 'manifest.json',
//     transform(assets, manifest) { 
//       // You can call the customize hook if you need to.
//       const { key, value } = manifest.hooks.customize.call({
//         key: 'gcm_sender_id',
//         value: '103953800507',
//       });
  
//       assets[ key ] = value;
//     },
// });

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
              test: /\.(sa|sc|c)ss$/,
              use: [
                  {
                      loader: MiniCssExtractPlugin.loader
                  },
                  {
                      loader: "css-loader",
                  },
                  // {
                  //     loader: "postcss-loader"
                  // },
                  // {
                  //     loader: "sass-loader",
                  //     options: {
                  //         implementation: require("sass")
                  //     }
                  // }
                ]
            },              
            {
              // Now we apply rule for images
              test: /\.(png|jpe?g|gif|svg)$/,
              use: [
                      {
                        // Using file-loader for these files
                        loader: "file-loader",
        
                        // In options we can set different things like format
                        // and directory to save
                        options: {
                          outputPath: 'images'
                        }
                      }
                    ]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'fonts'
                        }
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
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new WebpackAssetsManifest({
            output: 'manifest.json',
            transform(assets, manifest) {
              // Attach new properties to `assets` or return something else.
              // Just be sure it can be JSON stringified.
          
            //   const { name, version } = require('./package.json');
          
            //   assets.package = {
            //     name,
            //     version,
            //   };
          
              // You can call the customize hook if you need to.
              const { key, value } = manifest.hooks.customize.call({
                key: 'gcm_sender_id',
                value: '103953800507',
              });
          
              assets[ key ] = value;
            },
          }),
    ],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        configContent: JSON.stringify({
            //apiUrl: 'http://ec2-54-169-165-94.ap-southeast-1.compute.amazonaws.com'
            apiUrl:'https://localhost:44300/'
        }),
        configOrchardCore: JSON.stringify({
            //apiUrl: 'http://ec2-54-169-165-94.ap-southeast-1.compute.amazonaws.com/api'
            apiUrl:'https://localhost:44300/api/'
        })
    }
}
// testing