const mix = require('laravel-mix');
require('mix-html-builder');

let minify = false;

if (!mix.inProduction()) {
    mix.sourceMaps();
    mix.webpackConfig({devtool: 'inline-source-map'});
} else {
    mix.version();
    minify = true;
}

// noinspection RedundantConditionalExpressionJS
mix
    .setResourceRoot('')
    .setPublicPath(`dist`)
    .js(`src/js/app.js`, `dist/js`)
    .extract([
        'bootstrap',
        'jquery',
        'popper.js'
    ])
    .sass(`src/sass/vendor.scss`, `dist/css`)
    .sass(`src/sass/app.scss`, `dist/css`)
    .html({
        htmlRoot: 'src/html/index.html', // Your html root file(s)
        //inject: true,
        output: './', // The html output folder
        //partialRoot: './src/partials',    // default partial path
        //layoutRoot: './src/layouts',    // default partial path
        minify: {
            collapseWhitespace: minify ? true : false,
            conservativeCollapse: minify ? true : false,
            removeComments: true,
        }
    })
;