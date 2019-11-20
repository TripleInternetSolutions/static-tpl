const mix = require('laravel-mix');

require('laravel-mix-copy-watched');

mix
//.setResourceRoot(``)
    .setPublicPath(`dist`)
    .js(`src/js/app.js`, `dist/js`)
    .sass(`src/sass/app.scss`, `dist/css`)
    .copyWatched(`src/images/*`, `src/images`)
;
