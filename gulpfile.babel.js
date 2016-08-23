/**
 * Main Gulp File
 **/

import fs from 'fs'
import gulp from 'gulp'
import babel from 'gulp-babel'
import del from 'del'
import watch from 'gulp-watch'
import plugins from 'gulp-plumber'
import browserSync from 'browser-sync'
import requireDir from 'require-dir'
import gutil from 'gulp-util'
import gulpAutoTask from 'gulp-auto-task'
import runSequence from 'run-sequence'

let config = JSON.parse(fs.readFileSync('./config.json'));
let tasks = requireDir(config.baseDir + config.tasks, {recursive: true});

/** Import Main Tasks */
// Require them so they can be called as functions
const utils = requireDir('gulp-tasks');
// Automagically set up tasks
gulpAutoTask('{*,**/*}.js', {
  base: config.tasks,
  gulp: gulp
});

// Build Jekyll
gulp.task('build', (callback) => {
  return utils.buildJekyll(callback, 'serve');
});

// Build Production
gulp.task('build:prod', (callback) => {
  return utils.buildJekyll(callback, 'prod');
});

// Build JS
gulp.task('buildJs', ['buildVendorJs', 'buildAppJs']);

// Build Fonts
gulp.task('buildFonts', ['buildFontAwesome']);

// Build Assets
gulp.task('build:assets', ['buildCss', 'buildJs', 'buildImg', 'buildFonts']);


// Clean
gulp.task('clean:All', () => {
  del(config.buildDir + '**/*.*')
});

gulp.task('clean:Css', () => {
  del([
		config.sass.dist + '*',
		config.buildDir + 'css/*',
  ])
});

gulp.task('clean:Js', () => {
	del([
		config.js.dist + '*',
		config.buildDir + 'js/*'
	])
});

/**
 * BrowserSync
 */
// Init server to build directory
gulp.task('browser', () => {
  browserSync.init({
	server: "./" + config.buildDir
  });
});

// Force reload across all devices
gulp.task('browser:reload', () => {
  browserSync.reload();
});

/**
 * Main Builds
 */
gulp.task('serve', () => {
  runSequence('clean:All', 'build:assets', 'build', 'browser');
  // CSS/SCSS
  watch([
		config.bower.rootDir + config.bootstrap.sass + '*.scss',
		config.bower.rootDir + config.bootstrap.sass + '**/*.scss',
		config.bower.rootDir + config.fontawesome.sass + '*.scss', config.sass.src + '*.scss', config.sass.src + '**/*.scss'], () => {
		runSequence('clean:Css', 'buildCss', 'build', ['browser:reload']);
  });
  // JS
  watch([
  		config.js.src + '*.js'
  ], () => {
		runSequence('clean:Js', 'buildJs', 'build', 'browser:reload');
  });
  // Images
  watch([config.img.src +'*', config.img.src +'**/*'], () => {
		runSequence('buildImg', 'build', ['browser:reload']);
  });
  // Markup / Posts/ Data
  watch([
		config.projectDir +'*',
		config.projectDir +'_data/*',
		config.projectDir +'_plugins/*',
		config.projectDir +'**/*.md',
		config.projectDir +'**/*.html',
		config.projectDir +'**/*.markdown',
		config.projectDir +'_includes/**/*.md',
		config.projectDir +'_includes/**/*.svg',
		config.projectDir +'_includes/**/*.html',
  ], () => {
		runSequence('build', 'browser:reload');
  });
  gutil.log('Watching for changes.');
});

gulp.task('deploy', () => {
  runSequence('build:prod', ['build:assets']);
});
