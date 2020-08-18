var gulp = require('gulp'),
uglify = require('gulp-uglify-es').default,
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
reload = browserSync.reload,
plumber = require('gulp-plumber');

gulp.task('default', function(done){
   // Default task code
   console.log("HTTP Server Started");
   gulp.series("minify", "sass", "browser");
   done();
});

gulp.task('minify', function (done) {
    gulp.src('js/*.js')
       .pipe(uglify())
       .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
       .pipe(gulp.dest('dist'))

    done();
});

gulp.task('sass', function (done) {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(plumber())

    done();
});

gulp.task('watch', function () {
    gulp.watch('js/*.js', ['minify']);
});

gulp.task('serve', function () {
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
