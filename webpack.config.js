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
                test:/\.css$/,
                loader:'style-loader!css-loader',
                exclude:path.resolve(__dirname,'node_modules')
            },
            {
                test:/\.html$/,
                loader:'html-loader',
                exclude:path.resolve(__dirname,'node_modules')
            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!postcss-loader!less-loader',
                exclude:path.resolve(__dirname,'node_modules')
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
	],
    //方便开发使用，浏览器输入：http://localhost:3000访问
    devServer:{
        contentBase:'./dist',
        host:'localhost',
        compress:true,
        port:3000,
        inline:true,
        hot:true
    }
	
}