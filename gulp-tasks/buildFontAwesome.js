import fs from 'fs'
import gulp from 'gulp'

let config = JSON.parse(fs.readFileSync('./config.json'))

module.exports = function buildFontAwesome(){
  return gulp.src([
  	config.bower.rootDir + config.fontawesome.fonts + '*.*'
  	])
    .pipe(gulp.dest(config.fontawesome.dist));
}
