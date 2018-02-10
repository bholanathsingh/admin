var mongoose = require('mongoose');

var localitySchema = new mongoose.Schema({
    Location: { type: String },
    City: { type: String }
});

var Locality = module.exports = mongoose.model('Locality', localitySchema);

module.exports.getLocalitys = function (callback, limit) {
    Locality.find(callback).limit(limit);
}

module.exports.getLocality = function (query, callback) {
    Locality.findOne(query, callback);
}

module.exports.addLocation = function (locality, callback) {
    Locality.create(locality, callback);
}

module.exports.updateLocality = function (query, updatequery, option, callback) {
    Locality.findByIdAndUpdate(query, updatequery, option, callback);
}

module.exports.removeLocality = function (query, callback) {
    Locality.remove(query, callback);
}