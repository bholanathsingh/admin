

var category = require('./category');
var useraccount = require('./useraccount');
var fileupload = require('./fileupload');

module.exports = function (app) {
    app.use('/api/category', category);
    app.use('/api/useraccount', useraccount);
    app.use('/api/fileupload', fileupload);
};
