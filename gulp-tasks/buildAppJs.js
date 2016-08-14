const gulp     = require('gulp'),
			babel    = require('gulp-babel'),
      rename   = require('gulp-rename'),
      uglify   = require('gulp-uglify'),
      paths    = require('../package.json').paths;

module.exports = function appJs(){
  // Custom JS - output as app.js & app.min.js
  return gulp.src(paths.js.src + 'app.js')
  	.pipe(babel({
  		presets: ['es2015']
  	}))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js.dest));
}