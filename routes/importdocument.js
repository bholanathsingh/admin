var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Document = mongoose.model('Document');
var Category = mongoose.model('Category');
var Profile = mongoose.model('Profile');



router.route('/getjsonvalue/:id')
.get(function (req, res) {
    console.log('Called');
    var filename = req.params.id;
    var jsfile = require('../public/file/' + filename);
    res.json(jsfile);
});


router.route('/checkexist/:id/:type')
.get(function (req, res) {
    var _id = req.params.id;
    var type = req.params.type;
    if (type === 'profile') {
        Profile.count({ _id: _id }, function (err, count) {
            if (count > 0)
                res.json(true);
            else
                res.json(false);
        });
    }
    if (type === 'category') {
        Category.count({ _id: _id }, function (err, count) {
            if (count > 0)
                res.json(true);
            else
                res.json(false);
        });
    }
    if (type === 'document') {
        Document.count({ _id: _id }, function (err, count) {
            if (count > 0)
                res.json(true);
            else
                res.json(false);
        });
    }
});


router.route('/insertdocument')
.post(function (req, res) {

    var document = req.body.document;
    var type = req.body.type;
    if (type == 'profile') {
        Profile.create(document, function (err, document) {
            if (err)
                res.json(false);
            else
                res.json(true);
        });
    }
    if (type === 'category') {
        Category.create(document, function (err, document) {
            if (err)
                res.json(false);
            else
                res.json(true);
        });
    }
    if (type == 'document') {
        Document.create(document, function (err, document) {
            if (err)
                res.json(false);
            else
                res.json(true);
        });
    }

});



module.exports = router;
