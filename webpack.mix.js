const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts("resources/js/app.ts", "public/js")
    .sourceMaps(false, "source-maps")
    .sass("resources/sass/app.scss", "public/css")
    .options({
        hmrOptions: {
            host: 'localhost',
            port: 8000
        }
    }) //? Including HMR (hot module reloading) options allows refreshes to not only update UI but ALSO maintain state 
    // .webpackConfig({
    //     resolve: {
    //         extensions: [".ts", ".vue", ".js"]
    //     },
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.ts$/,
    //                 loader: "ts-loader",
    //                 options: { appendTsSuffixTo: [/\.vue$/] }
    //             }
    //         ]
    //     }
    // });
    //.copy('node_modules/semantic-ui-css/semantic.min.css', 'public/css/semantic.min.css')
    //.copy('node_modules/semantic-ui-css/semantic.min.js', 'public/js/semantic.min.js')
    // .copy('node_modules/semantic-ui-css/themes/default/assets/fonts/icons.woff', 'public/css/themes/default/assets/fonts/icons.woff')
    // .copy('node_modules/semantic-ui-css/themes/default/assets/fonts/icons.woff2', 'public/css/themes/default/assets/fonts/icons.woff2')
    // .copy('node_modules/semantic-ui-css/themes/default/assets/fonts/icons.ttf', 'public/css/themes/default/assets/fonts/icons.ttf');