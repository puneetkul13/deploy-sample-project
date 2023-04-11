// module.exports = {entry:'./src/app.js', output:{
//     filename:'./dist/app.bundle.js'
// }}
var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var BUILD_DIR = path.join(__dirname, 'dist')
var APP_DIR = path.join(__dirname, 'src')
const VENDOR_LIBS = ['react', 'react-dom', 'react-router-dom']
var config = {entry: {path:APP_DIR + "/app.js", vendor:VENDOR_LIBS},
output:{
    bundle: BUILD_DIR,
    filename: '[name].[chunkhash].js'
},
module:{
    rules:[
        {test: /\.jsx?/, exclude: /node_modules/, loader:'babel-loader', 
        options:{babelrc:false, presets:["babel-preset-env", "react", "stage-2"], plugins:['syntax-dynamic-import']}},
        
    ]

},
devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port:9000,
    disableHostCheck: false,
    open:true,
    hot:true
},
plugins:[new htmlWebpackPlugin({template:''}), new webpack.optimize.CommonsChunkPlugin({names:['vendor', 'manifest']}), new webpack.optimize.CommonsChunkPlugin({names:['vendor', 'manifest']}), new webpack.HotModuleReplacementPlugin(), new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})]}

module.exports = config;
