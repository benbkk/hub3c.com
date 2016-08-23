import fs from 'fs'
import gulp from 'gulp'
import mainBowerFiles from 'gulp-main-bower-files'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import size from 'gulp-filesize'
import gulpFilter from 'gulp-filter'
import eslint from 'gulp-eslint'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'

let config = JSON.parse(fs.readFileSync('./config.json'))

module.exports = function buildVendorJs()  {
  let filterJS = gulpFilter('**/*.js', '**/**/*.js', '**/dist/js/*.js');
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles())
    .pipe(sourcemaps.init())
    .pipe(filterJS)
  // Concat files
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write(config))
    .pipe(gulp.dest(config.js.dist))
  // Minify combined files and rename
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(size())
    .pipe(gulp.dest(config.js.dist));
};
