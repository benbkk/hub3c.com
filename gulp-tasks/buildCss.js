const gulp            = require('gulp'),
      rename          = require('gulp-rename'),
      size            = require('gulp-filesize'),
      clean           = require('gulp-clean'),
      sass            = require('gulp-ruby-sass'),
      sourcemaps      = require('gulp-sourcemaps'),
      cleanCss        = require('gulp-clean-css'),
      autoprefixer    = require('gulp-autoprefixer'),
      /** Config */
      paths           = require("../package.json").paths;

module.exports = function buildCss () {
    return sass(paths.sass.src + 'app.scss', {
        lineNumbers: true,
        loadPath: [
            paths.bower + paths.animate,
            paths.bower + paths.fontawesome.sass,
            paths.bower + paths.animate,
            paths.bower + paths.bootstrap.sass,
            paths.bower + paths.hamburgers,
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
    .pipe(gulp.dest(paths.sass.dest))
    // Minify the CSS file
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.sass.dest))
};
