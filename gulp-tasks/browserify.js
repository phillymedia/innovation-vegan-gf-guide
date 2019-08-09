const browserify = require('browserify');
const source = require('vinyl-source-stream');
const stringify = require('stringify');
const buffer = require('vinyl-buffer');
const babelify = require("babelify");


module.exports = function(gulp, browserSync) {
    return function browserifyTask(cb) {
        browserify({
                'entries': ['app/js/main.js']
            })
            .transform(stringify, {
                appliesTo: {
                    includeExtensions: ['.html']
                }
            })
            .transform(babelify, {
                presets: ["env"]
            })
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(gulp.dest('.tmp/js'))
            .pipe(browserSync.reload({
                stream: true
            }))
            cb();
    }
};
