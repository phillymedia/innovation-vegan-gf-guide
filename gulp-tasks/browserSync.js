
module.exports = function (gulp, browserSync) {
    return function browserSyncTask(cb) {
        browserSync.init({
         open: false,
         ghostMode: false,
        server: {
          baseDir: '.tmp'
        },
      })
      cb();
  }
};
