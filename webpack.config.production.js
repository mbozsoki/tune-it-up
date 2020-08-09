const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|woff2?|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 15000 },
                    },
                ],
            },
        ],
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        // allows us to do absolute imports from "src"
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        extensions: ['*', '.js', '.ts', '.tsx'],
    },
    plugins: [
        new MiniCssExtractPlugin('style.css', { allChunks: true }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            favicon: path.join(__dirname, 'src/assets/icons/favicon-16px.png'),
        }),
    ],
};
