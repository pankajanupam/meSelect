'use strict';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HandlebarsPlugin from 'handlebars-webpack-plugin';

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/js/meSelect.js'),
        path.resolve(__dirname, 'src/scss/meSelect.scss')
    ],
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        filename: 'meSelect.js' //'[name].js'
    },
    module: {
        noParse: /\.min\.js/,
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader'
                ]
            },
            // bable loder convert ES6 code to ES5
            {
                test: /\.js$/,
                exclude: /(\/node_modules\/(?!(foundation-sites)\/)|test\.js|\.spec\.js$)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [['@babel/env', { modules: false, useBuiltIns: 'usage', corejs: '3.0.0' }]]
                    }
                }
            },
            // eslint check js for lint error before processed by any other loader
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // emitWarning: true,
                    failOnWarning: true,
                    failOnError: true
                }
            }
        ]
    },


    plugins: [
        /** extract css and convert it to a file */
        new MiniCssExtractPlugin({
            filename: 'meSelect.css',
            // chunkFilename: 'meSelect.css',
        }),
        new HandlebarsPlugin({
            // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
            entry: path.join(process.cwd(), "src/index.html"),
            // output path and filename(s). This should lie within the webpacks output-folder
            // if ommited, the input filepath stripped of its extension will be used
            output: path.join(process.cwd(), "demo/[name].html"),
            // you can als add a [path] variable, which will emit the files with their relative path, like
            // output: path.join(process.cwd(), "build", [path], "[name].html"),

            // data passed to main hbs template: `main-template(data)`
            data: path.join(process.cwd(), "demo/data/selectdata.json"),
            // or add it as filepath to rebuild data on change using webpack-dev-server
            // data: path.join(__dirname, "app/data/project.json"),

            // globbed path to partials, where folder/filename is unique
            partials: [
                path.join(process.cwd(), "src/**/*.hbs")
            ],

            // register custom helpers. May be either a function or a glob-pattern
            helpers: {
                ifEqual: function (arg1, arg2, options) {
                    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                },
                json: obj => JSON.stringify(obj)
                // projectHelpers: path.join(process.cwd(), "helpers", "*.helper.js")
            },

            // hooks
            // getTargetFilepath: function (filepath, outputTemplate) {},
            // getPartialId: function (filePath) {}
            onBeforeSetup: function (Handlebars) { },
            onBeforeAddPartials: function (Handlebars, partialsMap) { },
            onBeforeCompile: function (Handlebars, templateContent) { },
            onBeforeRender: function (Handlebars, data, filename) { },
            onBeforeSave: function (Handlebars, resultHtml, filename) { },
            onDone: function (Handlebars, filename) { }
        })
    ]
};
