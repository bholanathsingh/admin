var mongoose = require('mongoose');

var enquirySchema = new mongoose.Schema({
        _id: { type: number },
        Name:{type: String },
        CompanyName:{type: String },
        ContactNumber: { type: String },
        EmailID: { type: String },
        Query:{type:String},
        CreateBy: { type: String },
        CreatedDate: { type: Date, default: Date.now },
        IsActive: { type: Boolean, default: true }
});

var Enquiry = module.exports = mongoose.model('Enquiry', enquirySchema);

module.exports.getEnquirys = function (callback, limit) {
    Enquiry.find(callback).limit(limit);
}

module.exports.getEnquiryList = function (query, callback, limit) {
    Enquiry.find(query, callback).limit(limit);
}

module.exports.getEnquiry = function (query,callback) {
    Enquiry.findOne(query, callback);
}

module.exports.addEnquiry = function (Enquiry, callback) {
    Enquiry.create(Enquiry, callback);
}

module.exports.updateEnquiry = function (id, Enquiry, option, callback) {
    var query = { _id: id };
    var update = { name: Enquiry.name };
    Enquiry.findByIdAndUpdate(query, update, option, callback);
}

module.exports.removeEnquiry = function (query, callback) {
    Enquiry.remove(query, callback);
}
