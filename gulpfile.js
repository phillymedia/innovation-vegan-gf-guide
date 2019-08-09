var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var credentials = require('./credentials.json');
var token = require('./token.json');
var config = require('./config.json');

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, browserSync);
}

const sass = getTask('sass');
const cssnano = getTask('cssnano');
const browserSyncing = getTask('browserSync');
const clean = getTask('clean');
const nunjucks = getTask('nunjucks');
const browserify = getTask('browserify');
const uglify = getTask('uglify');
const minifyHTML = getTask('minifyhtml');
const getArchie = require('./gulp-tasks/getArchie.js')(credentials, token, config);
const getSheets = require('./gulp-tasks/getSheets.js')(credentials, token, config);

function watcher(cb) {
    gulp.watch('app/scss/**/*.scss', sass);
    gulp.watch('app/**/*.html', nunjucks);
    gulp.watch('app/js/**/*.+(js|html)', browserify);
    cb();
}



exports.getJson = gulp.series(getArchie, getSheets);  //pull most recent G Drive data, save it
exports.getArchie = getArchie;
exports.getSheets = getSheets;
exports.default = gulp.series(gulp.parallel(sass, browserify, nunjucks), browserSyncing, watcher);

exports.build = gulp.series(clean, minifyHTML, cssnano, uglify);
