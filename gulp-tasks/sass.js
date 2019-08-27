var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function(gulp, browserSync) {
        return function sassTask(cb){
            gulp.src(['app/scss/styles.scss']) // Gets all files ending with .scss in app/scss
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(gulp.dest('.tmp/css'))
            .pipe(browserSync.reload({
                stream: true
            }))
            cb();
        }
}
