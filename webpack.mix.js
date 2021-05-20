const mix = require("laravel-mix");
// require('laravel-mix-alias');

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
    .sourceMaps(false, 'source-map') //? Fine for dev, but throws error for testing
    .sass("resources/sass/app.scss", "public/css")
    .options({
        hmrOptions: {
            host: 'localhost',
            port: 8000
        }
    })
    // .alias({ //? Fixes weird missing sass import mochapack error
    //     "@": 'resources/js', 
    //     "~": "resources/sass" //* Bonus: Easier sass var imports!
    // })
    //? Including HMR (hot module reloading) options allows refreshes to not only update UI but ALSO maintain state 
    .webpackConfig(webpack => {    
        return (process.env.BABEL_ENV === 'test') 
            ? {
                 //? Resolve useful due to weird mochapack test missing module error
                node: { fs: 'empty', module: 'empty'},
                // resolve: { fallback: { 'stream': false, 'fs': false, 'constants':false, 'http':false, 'path': false, 'module':false} },
                plugins: [
                    new webpack.NamedModulesPlugin(),
                    new webpack.HotModuleReplacementPlugin(),
                    new (require("rewiremock/webpack/plugin"))() 
                ]
            } : {}; //? Have to return at least an empty object or get 'merging undefined' error
    })
