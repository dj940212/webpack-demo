var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack")
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry:{
        main: './src/app.js',
        vendor: [
            'jquery'
        ]
    },
	output:{
		path:path.resolve(__dirname,'dist'),
        filename:'js/[name]-[hash].js',
        publicPath:'/'
	},
	module:{
		loaders:[
           {
             test:/\.js$/,
             loader:'babel-loader',
             include:path.resolve(__dirname,'src'),
             exclude:path.resolve(__dirname,'node_modules'),
             query:{
             	//指定cs6版本
             	presets:['latest']
             }
           },
           {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:[
                        {
                            loader: 'css-loader',
                            options:{
                                minimize: true, //css压缩
                                importLoaders: 1
                            },
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'postcss-loader']
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader', 'postcss-loader']
                })
            },
            {
                test:/\.html$/,
                loader:'html-loader',
                exclude:path.resolve(__dirname,'node_modules')
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                exclude:path.resolve(__dirname,'node_modules'),
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit:10000,
                    name:'img/[name].[hash:7].[ext]'
                }
            }
		]
	},
	plugins:[
        new htmlWebpackPlugin({
         	filename:'index.html',
         	template:'index.html',
         	inject: true,
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
           name: 'vendor'
        }),
        new ExtractTextPlugin({
            //生成css文件名
            filename: 'css/[name].css',
            disable: false,
            allChunks: true
        })
	],
    //方便开发使用，浏览器输入：http://localhost:3000访问
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        host:'localhost',
        compress:true,
        port:3000,
        inline:true,
        hot:true
    }
	
}