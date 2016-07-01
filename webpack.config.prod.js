var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var env = process.env.WEBPACK_ENV;

var plugins = [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.optimize.CommonsChunkPlugin('common.js'),
                new webpack.NoErrorsPlugin()
            ];
//区分生产环境和开发环境
if (env === 'build') {
    var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
    plugins.push(new UglifyJsPlugin({ 
        minimize: true,
        compressor: {
            warnings: false,
        }
    }));
    outputFile = 'app.min.js';
} else {
    outputFile = 'app.js';
}

var publicPath = 'http://localhost:8000';

module.exports = {
    entry: [   
        'webpack/hot/dev-server',     
        'webpack-dev-server/client?http://localhost:8000',
        
        './src/index.js'
    ],
    output: {
        path: './lib', //打包输出的路径 
        filename: 'app.js', //打包后的名字
        publicPath: publicPath
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /.jsx?$/,
            loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react'],
            exclude: /node_modules/
        }, {
            test: /.css$/,
            loaders: ["style", "css"],
            exclude: "/(node_modules|bower_components)/"
        }, {
            test: /.less$/,
            loaders: ["style", "css", "less"],
            exclude: "/(node_modules|bower_components)/"
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: plugins

};
