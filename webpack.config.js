const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");

const isDev = process.env.NODE_ENV === "dev" ? true : false;
const buildForWeb = process.env.BUILD === "web" ? true : false;

let plugins = [];

if (!isDev) {
    plugins.push(new MinifyPlugin({}, {}));
}

filename = "bundle.js";

if (buildForWeb) {
    if (isDev) {
        filename = "bundle.web.min.js";
    } else {
        filename = "bundle.web.js";
    }
}
module.exports = {
    entry: buildForWeb ? "./src/web.js" : "./src/node.js",
    output: {
        filename,
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
