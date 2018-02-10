var mongoose = require('mongoose');

var companyDetailSchema = new mongoose.Schema({
        Id: { type: Number },
        CompanyURL:{type: String },
        CompanyName:{type: String },
        Address:{type: String},
        Locality:{type: String},
        Country:{type: String },
        State:{type: String },
        City:{type: String},
        PinCode:{type: Number},
        CountryCode:{type: Number},
        ContactPerson: { type: String },
        Designation: { type: String },
        Mobile1: { type: String },
        Mobile2: { type: String },
        Mobile3: { type: String },
        LandLine1: { type: String },
        RegisteredEmail: { type: String },
        Email2: { type: String },
        Email3: { type: String },
        Website: { type: String },
        Industry: { type: String },
        PageTitle: { type: String },
        PageDescription:{type: String},
        SearchKeywords: { type: [] },
        MetaTag:{type:String},
        CompanyLogo:{type:String},
        ImageGallery: { type: [] },
        AgencyName:{type:String},
        SourcingDate:{type:Date},
        LastUpdateDate:{type:Date},
        VendorName:{type:String},
        CreateBy: { type: String },
        CreatedDate: { type: Date, default: Date.now },
        IsActive: { type: Boolean, default: true }
});

var CompanyDetail = module.exports = mongoose.model('CompanyDetail', companyDetailSchema);

module.exports.getCompanyDetails = function (query,callback, limit) {
    CompanyDetail.find(query,callback).limit(limit);
}

module.exports.getFilteredCompanyDetails = function (query, filter, callback, shortexp) {
    CompanyDetail.find(query, filter, callback).sort(shortexp);
}

module.exports.getCompanyDetail = function (query, callback) {
    CompanyDetail.findOne(query, callback);
}

module.exports.addCompanyDetail = function (companydetail, callback) {
    CompanyDetail.create(companydetail, callback);
}

module.exports.getCompanyDetailList = function (query, callback, shortexp, page, limit) {
    CompanyDetail.find(query, callback).sort(shortexp).skip(page * limit).limit(limit);
}

module.exports.getCompanyDetailCount = function (query, callback) {
    CompanyDetail.count(query, callback);
}

module.exports.updateCompanyDetail = function (id, genre, option, callback) {
    var query = { _id: id };
    var update = { name: genre.name };
    CompanyDetail.findByIdAndUpdate(query, update, option, callback);
}

module.exports.removeCompanyDetail = function (id, callback) {
    var query = { _id: id };
    CompanyDetail.remove(query, callback);
}

module.exports.getCompanyDetailAutocomplete = function (query, fields, callback, shortexp, limit) {
    CompanyDetail.find(query, fields, callback).sort(shortexp).limit(limit);
}