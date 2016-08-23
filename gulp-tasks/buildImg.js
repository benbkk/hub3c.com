import fs from 'fs'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'

let config = JSON.parse(fs.readFileSync('./config.json'))

/**
 * Images
 * @todo Determine better way of handling the inline SVG's so they can get optimized as well.
 */

module.exports = function buildImg() {
  return gulp.src([config.img.src + '*', config.img.src + '**/*'])
    .pipe(imagemin({
      progressive: true,
      use: [pngquant({
        quality: '65-75'
      })]
    }))
    .pipe(gulp.dest(config.img.dist));
};
