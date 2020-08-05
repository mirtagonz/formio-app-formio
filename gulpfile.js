/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

/**
 *  Launches a browsersync server on por 4000
 */
function browserSyncTask() {
  browserSync.init(['./dist/**/**.**'], {
    server: "./dist",
    port: 4000,
    notify: false,
    open: false,
    ui: {
      port: 4001
    }
  });
  gulp.watch("dist/index.html").on("change", reload);
}


/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Package task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('package', ['clean'], function () {
  gulp.start('build');
});

/**
 *  Default task launches a browsersync server
 */
gulp.task('default', function () {
  browserSyncTask();
});


