var gulp            = require('gulp'),
    /** Utilities */
    plugins         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    size            = require('gulp-filesize'),
    /** CSS */
    sass            = require('gulp-ruby-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    cleanCss        = require('gulp-clean-css'),
    autoprefixer    = require('gulp-autoprefixer'),
    /** Config */
    paths           = require("../package.json").paths;

/**
 * CSS
 * @todo this seems kind of hasty. That may be because it's 1am. Investigate.
 */

module.exports = function buildCss () {
    return sass(paths.css.src + 'app.scss', {
        lineNumbers: true,
        loadPath: [
            paths.bower + paths.hamburgers,
            paths.bower + paths.fontawesome,
            paths.bower + paths.compass,
            paths.bower + paths.bootstrap.sass,
            paths.sass.src
        ],
        style: 'expanded',
        sourcemap: true,
        sourcemapPath: paths
    })
    // If there is an error, don't stop compiling but use the custom displayError function
    .on('error', function(err){
        displayError(err);
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(paths.css.dest))
    // Minify the CSS file
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.css.dest))
};
