const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");

const isDev = process.env.NODE_ENV === "dev" ? true : false;

let plugins = [];

if (!isDev) {
    plugins.push(new MinifyPlugin({}, {}));
}

filename = "bundle.min.js";

if (isDev) {
    filename = "bundle.js";
}

module.exports = {
    entry: "./src/index.js",
    output: {
        filename,
        library: 'TwoWay',
        path: path.resolve(__dirname, "lib")
    },
    watch: isDev,
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    }
};
