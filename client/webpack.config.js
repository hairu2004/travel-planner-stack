const path = require('path');

module.exports = {
    entry: './src/index.js',  // Adjust the entry point if different
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "querystring": require.resolve("querystring-es3"),
            "net": false,
            "tls": false
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    },
    node: {
        global: true,
        __filename: true,
        __dirname: true
    }
};
