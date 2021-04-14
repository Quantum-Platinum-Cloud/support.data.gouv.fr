const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: devMode ? "development" : "production",
    entry: {
        main: "./src/presentation/client/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "public", "dist"),
        filename: devMode ? "[name].js" : "[name]-[contenthash].js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name]-[contenthash].css",
        }),
        new WebpackManifestPlugin({ publicPath: "" }),
    ],
    devtool: devMode ? "eval-source-map" : "source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: ["file-loader"],
            },
        ],
    },
};
