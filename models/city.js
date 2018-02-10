var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
        id: { type: Number },
        StateCode:{type: String },
        CityCode:{type: String },
        CityName:{type: String },
        CreateBy: { type: String },
        CreatedDate: { type: Date, default: Date.now  },
        IsActive: { type: Boolean, default: true }
});

var City = module.exports = mongoose.model('City', citySchema);

module.exports.getCitys = function (callback, limit) {
    City.find(callback).limit(limit);
}

module.exports.getCityList = function (query, callback, limit) {
    City.find(query, callback).limit(limit);
}

module.exports.getCity = function (query,callback) {
    City.findOne(query, callback);
}

module.exports.addCity = function (City, callback) {
    City.create(City, callback);
}

module.exports.updateCity = function (id, City, option, callback) {
    var query = { _id: id };
    var update = { name: City.name };
    City.findByIdAndUpdate(query, update, option, callback);
}

module.exports.removeCity = function (query, callback) {
    City.remove(query, callback);
}
