//let editNotecard = "src/kdlab/notecard/EditNotecardTest.js";
//let viewNotecard = "src/kdlab/notecard/ViewNotecardTest.js";
let test = "/home/kduan/dev/js/src/kdsoft/notecard/notecard.js";
let notecard = "/home/kduan/dev/js/src/kdsoft/notecard/notecard.js";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    //our index file
    entry: {
        //editNotecard: path.resolve(__dirname, editNotecard),
        //viewNotecard: path.resolve(__dirname, viewNotecard),
        //test: path.resolve(__dirname, test),
        notecard: path.resolve(__dirname, notecard),
    },
    //Where we put the production code
    output: {
        //path: path.resolve(__dirname, "dist"),
        path: path.resolve(__dirname, "public/notecard/dist"),
        filename: "[name].js",
        publicPath: "/",
    },
    // This says to webpack that we are in development mode and write the code in webpack file in different way
    
    mode: "production",
    module: {
        rules: [
            //Allows use javascript
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, //don't test node_modules folder
                use: {
                    loader: "babel-loader",
                },
                resolve: {
                    extensions: [".js", ".jsx"],
                },
            },
            //Allows use of CSS
            {
                test: /\.(scss|css)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    'sass-loader'
                ],
            },
            //Allows use of images
            {
                test: /\.(png|jpg|svg)$/i,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        //Allows remove/clean the build folder
        new CleanWebpackPlugin(),
        //Allows update react components in real time
        new HotModuleReplacementPlugin(),
        /*
        //Allows to create an index.html in our build folder
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, templateFile), //we put the file that we created in public folder
        }),
        //This get all our css and put in a unique file
         * 
         */
        new MiniCssExtractPlugin({
            //filename: "styles.[contentHash].css",
            filename: "[name].css",
        }),
    ],
    //Config for webpack-dev-server module
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
        port: 8000,
    },
};
