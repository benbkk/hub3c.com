const gulp           = require('gulp'),
      /** Utilities */
      mainBowerFiles = require('gulp-main-bower-files'),
      sourcemaps     = require('gulp-sourcemaps'),
      rename         = require('gulp-rename'),
      size           = require('gulp-filesize'),
      gulpFilter     = require('gulp-filter'),
      /** JS Specific */
      eslint         = require('gulp-eslint'),
      concat         = require('gulp-concat'),
      uglify         = require('gulp-uglify'),
      /** Config */
      paths          = require('../package.json').paths;

/**
 * JavaScript
 * @todo Extract this to be more dynamic, helper function, specify path, file name, and what tasks to execute.
 */

module.exports = function buildVendorJs() {
  // Build vendor files - Getting all from bower_components
  //gulp.src(paths.vendor.src + '*.js')
  const filterJS = gulpFilter('**/*.js', '**/**/*.js', '**/dist/js/*.js');
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles())
    .pipe(sourcemaps.init())
    .pipe(filterJS)
  // Concat files
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write(paths))
    .pipe(gulp.dest(paths.js.dest))
  // Minify combined files and rename
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(size())
    .pipe(gulp.dest(paths.js.dest));
};
