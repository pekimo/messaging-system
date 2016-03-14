'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('build', function() {
  return browserify({entries: ['./src/index.js'], standalone: 'messagingSystem'})
    .transform('babelify', {presets: ['es2015', 'stage-0']})
    .bundle()
    .pipe(source('./index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('compile', ['build']);

function js(path, dest, fileName) {
  return browserify({entries: [path]})
    .transform('babelify', {presets: ['es2015', 'stage-0']})
    .bundle()
    .pipe(source(fileName))
    .pipe(gulp.dest(dest));
}

gulp.task('tests', function() {
  return js('./tests/index.js', './tests/');
});

gulp.task('build:extension', function() {
  js('./test-extension/js/background.js', './test-extension/', 'background.build.js');
  js('./test-extension/js/popup.js', './test-extension/', 'popup.build.js');
});

gulp.task('watch:js', function() {
  return gulp.watch(['./src/**/*.js'], ['js']);
});

gulp.task('watch:tests', function() {
  return gulp.watch(['./tests/**/*-tests.js', '!./tests/tests.build.js'], ['tests']);
});

gulp.task('watch', ['watch:js', 'watch:tests']);
