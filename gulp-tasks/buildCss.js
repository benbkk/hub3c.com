import fs from 'fs'
import gulp from 'gulp'
import rename from 'gulp-rename'
import size from 'gulp-filesize'
import clean from 'gulp-clean'
import sass from 'gulp-ruby-sass'
import sourcemaps from 'gulp-sourcemaps'
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'

let config = JSON.parse(fs.readFileSync('./config.json'))

module.exports = function buildCss () {
    return sass(config.sass.src + 'app.scss', {
        lineNumbers: true,
        loadPath: [
            config.bower.rootDir + config.bower.animate,
            config.bower.rootDir + config.fontawesome.sass,
            config.bower.rootDir + config.bower.hamburgers,
            config.sass.src
        ],
        style: 'expanded',
        sourcemap: true,
        sourcemapPath: config
    })
    // If there is an error, don't stop compiling but use the custom displayError function
    .on('error', function(err){
        displayError(err);
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(config.sass.dist))
    // Minify the CSS file
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCss())
    .pipe(gulp.dest(config.sass.dist))
};
