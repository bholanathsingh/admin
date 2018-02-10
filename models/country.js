var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
        id: { type: Number },
        CountryCode:{type: String },
        CountryName:{type: String },
        CreateBy: { type: String },
        CreatedDate: { type: Date, default: Date.now },
        IsActive: { type: Boolean, default: true }
});

var Country = module.exports = mongoose.model('Country', countrySchema);

module.exports.getCountrys = function (callback, limit) {
    Country.find(callback).limit(limit);
}

module.exports.getCountryList = function (query, callback, limit) {
    Country.find(query, callback).limit(limit);
}

module.exports.getCountry = function (query,callback) {
    Country.findOne(query, callback);
}

module.exports.addCountry = function (Country, callback) {
    Country.create(Country, callback);
}

module.exports.updateCountry = function (id, Country, option, callback) {
    var query = { _id: id };
    var update = { name: Country.name };
    Country.findByIdAndUpdate(query, update, option, callback);
}

module.exports.removeCountry = function (query, callback) {
    Country.remove(query, callback);
}
