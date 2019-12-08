const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');




// Static server
function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
      .pipe(sass())
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
};

exports.serve = bs;

function minifyCss() {
  return gulp.src('./*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'));
    
};


 
