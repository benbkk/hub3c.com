const gulp           = require('gulp'),
      paths          = require('../package.json').paths;

module.exports = function buildFontAwesome(){
  return gulp.src([
  	paths.bower + paths.fontawesome.fonts + '*.*'
  	])
    .pipe(gulp.dest(paths.fontawesome.dest));
}