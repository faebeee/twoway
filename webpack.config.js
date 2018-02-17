const path = require("path");

module.exports = {
    entry: "./test/test.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "lib")
    },
    watch: true,
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
