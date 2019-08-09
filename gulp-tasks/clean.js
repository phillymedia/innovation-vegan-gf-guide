const del = require('del');

module.exports = function(gulp) {
        return function cleanTask(cb) {
            del.sync('dist')
            cb();
        };
};
