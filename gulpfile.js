var gulp = require('gulp'),
  uglify = require('gulp-uglify-es').default,
  sass = require('gulp-sass')(require('sass')),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  plumber = require('gulp-plumber'),
  babel = require("gulp-babel"),
  rename = require("gulp-rename");
const {version} = require('./package.json');
var header = require('gulp-header');

/**
 * Note: Have to run transpile and minify separately to make it work
 */

const license = header(`
/*! MagicMouse.js - v${version}
* A lightweight javascript library to create some amazing effects for the mouse (cursor) on your website
* https://github.com/dshongphuc/magic-mouse-js
* Copyright (c) 2020 Phuc H. <dshongphuc@gmail.com> under MIT license; */
  `)

gulp.task('default', function(done) {
  // Default task code
  console.log("HTTP Server Started");
  gulp.series("minify", "sass", "browser");
  done();
});

gulp.task('minify', function(done) {
  gulp.src('js/*.js')
    .pipe(license)
    .pipe(uglify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist'))

  done();
});

gulp.task('transpile', function(done) {
  gulp.src('js/*.js')
    .pipe(babel({
      presets: [
        [
          "@babel/preset-env",
          {
            "modules": "commonjs"
          }
        ]
      ],
      plugins: ["remove-import-export"]
    }))
    .pipe(license)
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += '.cdn.min';
    }))

    .pipe(gulp.dest('dist'))

  done();
});

gulp.task('sass', function(done) {
  gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(plumber())

  done();
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['minify']);
});

gulp.task('serve', function() {
  var files = [
    '*.html',
    'css/**/*.css',
    'js/**/*.js',
    'scss/**/*.scss'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './'
    }
  });

  gulp.watch('scss/*.scss', gulp.series('sass')); // Watching the changes of sass here
});
