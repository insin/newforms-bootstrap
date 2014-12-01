var browserify = require('browserify')
var del = require('del')
var gulp = require('gulp')
var source = require('vinyl-source-stream')

var header = require('gulp-header')
var jshint = require('gulp-jshint')
var rename = require('gulp-rename')
var plumber = require('gulp-plumber')
var react = require('gulp-react')
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util')

var pkg = require('./package.json')
var dev = gutil.env.production ? '' : ' (dev build at ' + (new Date()).toUTCString() + ')'
var distHeader = '/**\n\
 * newforms-bootstrap <%= pkg.version %><%= dev %> - https://github.com/insin/newforms-bootstrap\n\
 * MIT Licensed\n\
 */\n'

var jsSrcPath = './src/**/*.js*'
var jsLibPath = './lib/**/*.js'
var jsEntryPoint = './lib/index.js'

gulp.task('clean-dist', function(cb) {
  del('./dist/*.js', cb)
})

gulp.task('clean-lib', function(cb) {
  del('./lib/**/*.js', cb)
})

gulp.task('transpile-js', ['clean-lib'], function() {
  return gulp.src(jsSrcPath)
    .pipe(plumber())
    .pipe(react({
      harmony: true
    }))
    .pipe(gulp.dest('./lib'))
})

gulp.task('lint-js', ['transpile-js'], function() {
  return gulp.src(jsLibPath)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
})

gulp.task('bundle-js', ['clean-dist', 'lint-js'], function() {
  var b = browserify(jsEntryPoint, {
    debug: !gutil.env.production
  , standalone: 'BootstrapForm'
  , detectGlobals: false
  })
  b.transform('browserify-shim')

  var stream = b.bundle()
    .pipe(source('newforms-bootstrap.js'))
    .pipe(streamify(header(distHeader, {pkg: pkg, dev: dev})))
    .pipe(gulp.dest('./dist'))

  if (gutil.env.production) {
    stream = stream
      .pipe(rename('newforms-bootstrap.min.js'))
      .pipe(streamify(uglify()))
      .pipe(streamify(header(distHeader, {pkg: pkg, dev: dev})))
      .pipe(gulp.dest('./dist'))
  }

  return stream
})

gulp.task('watch', function() {
  gulp.watch(jsSrcPath, ['bundle-js'])
})

gulp.task('default', ['bundle-js', 'watch'])