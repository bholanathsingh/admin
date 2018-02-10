var mongoose = require('mongoose');

var stateSchema = new mongoose.Schema({
        id: { type: Number },
        CountryCode:{type: String },
        StateCode:{type: String },
        StateName:{type: String },
        CreateBy: { type: String },
        CreatedDate: { type: Date, default: Date.now },
        IsActive: { type: Boolean, default: true }
});

var State = module.exports = mongoose.model('State', stateSchema);

module.exports.getStates = function (callback, limit) {
    State.find(callback).limit(limit);
}

module.exports.getStateList = function (query, callback, limit) {
    State.find(query, callback).limit(limit);
}

module.exports.getState = function (query,callback) {
    State.findOne(query, callback);
}

module.exports.addState = function (State, callback) {
    State.create(State, callback);
}

module.exports.updateState = function (id, State, option, callback) {
    var query = { _id: id };
    var update = { name: State.name };
    State.findByIdAndUpdate(query, update, option, callback);
}

module.exports.removeState = function (query, callback) {
    State.remove(query, callback);
}
