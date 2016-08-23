import fs from 'fs'
import gulp from 'gulp'

let config = JSON.parse(fs.readFileSync('./config.json'))

module.exports = function buildFonts(){
  return gulp.src([
  	paths.fonts.src + '**/*.*',
  	paths.bower + paths.bootstrap.fonts + '**/*.*'
  	])
    .pipe(gulp.dest(paths.fonts.dest));
}
