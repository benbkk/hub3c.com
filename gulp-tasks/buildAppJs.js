import fs from 'fs'
import gulp from 'gulp'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'

let config = JSON.parse(fs.readFileSync('./config.json'))

module.exports = function appJs(){
  // Custom JS - output as app.js & app.min.js
  return gulp.src(config.js.src + 'app.js')
  	.pipe(babel({
  		presets: ['es2015']
  	}))
    .pipe(gulp.dest(config.js.dist))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.js.dist));
}
