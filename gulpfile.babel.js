// package imports
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import livereload from 'gulp-livereload';
import notify from 'gulp-notify';


// compile SASS files
gulp.task('styles', () => {

  // define set of browsers for autoprefixer
  const BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10',
  ];

  // compile sass
  return gulp.src('scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', notify.onError('<%= error.message %>')))
      .pipe(autoprefixer(BROWSERS))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.theme + 'css/'))
      .pipe(size({title: 'CSS:'}))
      .pipe(livereload());

});

// watchers
gulp.task('watch', () => {

  // Create LiveReload server
  livereload.listen();

  // watch for SASS files
  gulp.watch('scss/**/*.scss', ['styles']);

  // watch for JS files
  gulp.watch('js/**/*.js', ['scripts']);

});

// default task (executed via `gulp`)

gulp.task('default', ['styles', 'watch']);
