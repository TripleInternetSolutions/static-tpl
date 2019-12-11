const mix = require('laravel-mix');
require('laravel-mix-imagemin');

if (!mix.inProduction()) {
    mix.sourceMaps();
    mix.webpackConfig({devtool: 'inline-source-map'});

    //require('laravel-mix-bundle-analyzer');
    //mix.bundleAnalyzer();
} else {
    mix.version();
}

mix
//.setResourceRoot(``)
    .setPublicPath(`dist`)
    .js(`src/js/app.js`, `dist/js`)
    .extract([
        'bootstrap',
        'jquery',
        'popper.js'
    ])
    .sass(`src/sass/vendor.scss`, `dist/css`)
    .sass(`src/sass/app.scss`, `dist/css`)
    .imagemin('images/**/*', {context: 'src'})
;
