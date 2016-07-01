var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/index',
    ],
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'app.js',
        publicPath: '/static/',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        }),
    ],
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
        extensions: ['', '.js', '.jsx', '.less'],
    },
    devtool: 'source-map',
};
