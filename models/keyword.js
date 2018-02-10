var mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
    Keyword:{type: String }
});

var Keyword = module.exports = mongoose.model('Keyword', keywordSchema);

module.exports.getKeywords = function (callback, limit) {
    Keyword.find(callback).limit(limit);
}

module.exports.getKeywordList = function (query, callback, limit) {
    Keyword.find(query, callback).limit(limit);
}

module.exports.getKeyword = function (query,callback) {
    Keyword.findOne(query, callback);
}

module.exports.addKeyword = function (keyword, callback) {
    Keyword.create(keyword, callback);
}

module.exports.updateKeyword = function (id, Keyword, option, callback) {
    var query = { _id: id };
    var update = { name: Keyword.name };
    Keyword.findByIdAndUpdate(query, update, option, callback);
}

module.exports.removeKeyword = function (query, callback) {
    Keyword.remove(query, callback);
}
