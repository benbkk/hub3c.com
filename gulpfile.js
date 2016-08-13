/**
 * Main Gulp File
 **/

const gulp          = require('gulp'),
	 	  clean         = require('gulp-clean'),
	  	watch         = require('gulp-watch'),
	  	plugins       = require('gulp-plumber'),
	  	browserSync   = require('browser-sync').create('jekyll'),
	  	requireDir    = require('require-dir'),
	  	runSequence   = require('run-sequence'),
	  	gutil         = require('gulp-util'),
	  	gulpAutoTask  = require('gulp-auto-task'),
	  	paths     	  = require('./package.json').paths;

/** Import Main Tasks */
// Require them so they can be called as functions
const utils = requireDir('gulp-tasks');
// Automagically set up tasks
gulpAutoTask('{*,**/*}.js', {
  base: paths.tasks,
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

// Build Assets
gulp.task('build:assets', ['buildCss', 'buildJs', 'buildImg', 'buildFonts']); 

// Clean
gulp.task('clean:All', () => {
  return gulp.src([
  	paths.build + '**/*.*'
  ])
  .pipe(clean({force: true}));
});

gulp.task('clean:Css', () => {
  return gulp.src([
	paths.sass.dest + '*',
	paths.build + 'css/*',
  ])
  .pipe(clean());
});

gulp.task('clean:Js', () => {
	return gulp.src([
		paths.js.dest + '*',
		paths.build + 'js/*'
	])
	.pipe(clean());
});	

/**
 * BrowserSync
 */
// Init server to build directory
gulp.task('browser', () => {
  browserSync.init({
	server: "./" + paths.build,
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
		paths.bower + paths.compass + '**/*.scss',
		paths.bower + paths.compass + '*.scss',
		paths.bower + paths.animate + '**/*.scss',
		paths.bower + paths.animate + '*.scss',
		paths.bower + paths.bootstrap.sass + '*.scss',
		paths.bower + paths.bootstrap.sass + '**/*.scss',
		paths.bower + paths.fontawesome + '*.scss',
		paths.sass.src + '*.scss',
		paths.sass.src + '**/*.scss'
  ], () => {
		runSequence('clean:Css', 'buildCss', 'build', ['browser:reload']);
  });
  // JS
  watch([
  		paths.js.src + '*.js'
  ], () => {
		runSequence('clean:Js', 'buildJs', 'build', 'browser:reload');
  });
  // Images
  watch([paths.img.src +'*', paths.img.src +'**/*'], () => {
		runSequence('buildImg', 'build', ['browser:reload']);
  });
  // Markup / Posts/ Data
  watch([
		paths.src +'*',
		paths.src +'_data/*',
		paths.src +'_plugins/*',
		paths.src +'**/*.md',
		paths.src +'**/*.html',
		paths.src +'**/*.markdown',
		paths.src +'_includes/**/*.md',
		paths.src +'_includes/**/*.svg',
		paths.src +'_includes/**/*.html',
  ], () => {
		runSequence('build', 'browser:reload');
  });
  gutil.log('Watching for changes.');
});

gulp.task('deploy', () => {
  runSequence('build:prod', ['build:assets']);
});
