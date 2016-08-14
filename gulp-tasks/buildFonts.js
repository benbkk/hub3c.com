const gulp           = require('gulp'),
      paths          = require('../package.json').paths;

module.exports = function buildFonts(){
  return gulp.src([
  	paths.fonts.src + '**/*.*',
  	paths.bower + paths.bootstrap.fonts + '**/*.*'
  	])
    .pipe(gulp.dest(paths.fonts.dest));
}