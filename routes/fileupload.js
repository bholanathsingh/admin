var express = require('express');
var router = express.Router();
var CompanyDetail = require('../models/companydetail');
var Category=require('../models/category');
var Locality=require('../models/locality');
var Keyword=require('../models/keyword');
var multer = require('multer');
var upload = multer({ dest: 'upload/' });

var async = require('async');
var fs = require('fs');
var request = require('request');



router.route('/csvtojson')
	//creates a new post
.post(upload.any(), function (req, res, next) {

    console.log('I am called');
    if (req.files) {
        req.files.forEach(function (file) {
            var filename = 'public/file/' + (new Date).valueOf() + '-' + file.originalname;
            var jsonFileName = (new Date).valueOf() + '-' + file.originalname.split('.')[0] + '.json';
            var jsonfile = 'public/file/' + jsonFileName;
            fs.rename(file.path, filename, function (err) {
                if (err) throw err;

                console.log('Start');
                var Converter = require("csvtojson").Converter;
                var csvConverter = new Converter({ constructResult: true, toArrayString: true });
                var readStream = fs.createReadStream(filename);
                var writeStream = fs.createWriteStream(jsonfile);
                readStream.pipe(csvConverter).pipe(writeStream);
                return res.json({ "File": jsonFileName });
            });
        })
    }
});

router.route('/unlinkfile/:id')
.get(function (req, res) {
    console.log('Start delete');
    var filename = req.params.id;
    fs.unlinkSync('public/file/' + filename);
    res.json(true);
});



router.route('/ImportExcel')
.post(upload.any(), function (req, res, next){

    async.waterfall([
         function (callback) {
           if (req.files) {
               req.files.forEach(function (file) {
                   var csvfilename=(new Date).valueOf() + '-' + file.originalname;
                   var filename = 'public/file/' + csvfilename;
                   fs.rename(file.path, filename, function (err) {
                       callback(null, csvfilename);
                   });
               });

           }
        },
        function (csvfilename,callback) {

        console.log(csvfilename);

            var jsonFileName = csvfilename.split('.')[0] + '.json';
            csvfilename='public/file/' +csvfilename;
            var jsonfile = 'public/file/' + jsonFileName;

            var Converter = require("csvtojson").Converter;
            var csvConverter = new Converter({ constructResult: true, toArrayString: true });

            csvConverter.on("end_parsed",function(jsonObj){
                fs.unlinkSync(csvfilename);
                callback(null, jsonObj);
            });
            fs.createReadStream(csvfilename).pipe(csvConverter);

        }
        ],

        function (error, result) {
        if (error)
            res.send(error);

        var faielddata=[];
        if(result)
        {
            for (var r in result[0]) {
                try {
                    if(result[0][r].id!='' ) {


                        var old = JSON.stringify(result[0][r]).replace(/�/g, ''); //convert to JSON string
                        var data = JSON.parse(old); //convert back to array

                        if(req.body.DocumentType=='category') {
                            Category.addCategory(data, function (err, category) {
                                if (err) throw err;
                                faielddata.push(data);
                            });
                        }
                        if(req.body.DocumentType=='company') {
                            data.CompanyURL=data.CompanyName.toLocaleLowerCase().replace(/\s+/g, '-').replace('&','and')+'-'+Math.random().toString(36).substr(2, 10);
                            CompanyDetail.addCompanyDetail(data, function (err, company) {
                                if (err) throw err;
                                faielddata.push(data);
                            });
                        }

                        if(req.body.DocumentType=='locality') {
                            Locality.addLocation(data, function (err, location) {
                                if (err) throw err;
                                faielddata.push(data);
                            });
                        }

                        if(req.body.DocumentType=='keyword') {
                            Keyword.addKeyword(data, function (err, keyword) {
                                if (err) throw err;
                                faielddata.push(data);
                            });
                        }
                    }
                }
                catch (e)
                {
                    faielddata.push(result[0][r]);
                }
            }
        }
        res.send(result[0]);
    })
});


function uploadfile(req,callback) {

    console.log('called by bhola upload');
    if (req.files) {
        req.files.forEach(function (file) {
            var filename = 'public/file/' + (new Date).valueOf() + '-' + file.originalname;
            var jsonFileName = (new Date).valueOf() + '-' + file.originalname.split('.')[0] + '.json';
            var jsonfile = 'public/file/' + jsonFileName;
            fs.rename(file.path, filename, function (err) {
                if (err) throw err;

                console.log('Start');
                var Converter = require("csvtojson").Converter;
                var csvConverter = new Converter({ constructResult: true, toArrayString: true });
                var readStream = fs.createReadStream(filename);
                var writeStream = fs.createWriteStream(jsonfile);
                readStream.pipe(csvConverter).pipe(writeStream);

                callback(null, jsonFileName);
            });
        })
    }
}

function insertintodb(jsonFileName,callback) {
    console.log('called by bhola INDB');
    var faielddata=[];
    var jsfile = require('../public/file/' + jsonFileName);
    for (var r in jsfile) {
        Profile.addProfile(r, function (err, profile) {
            if (err)
                faielddata.push(r);
        });
    }
    callback(null, faielddata);
}


/*
router.route('/download')
    .get(function (req, res) {

      console.log('called');

        async.waterfall([
                function (callback) {
                    Profile.getProfileList({ ProfileImage: { $ne: '' } }, function (err, profiles) {
                        console.log('called Profiles');
                        callback(null, profiles);
                    }, { "id": 1 }, 0, 200);
                }],

            function (error, profiles) {

                console.log('called Result');
                if (error)
                    res.send(error);

                if(profiles)
                {
                   try {
                       profiles.forEach( function(profile) {
                            var filename =  profile.ProfileImage.split('/').pop();
                            var extention=filename.split('.').pop();
                            var newfile='public/file/'+profile.ProfileUrl+'.'+extention;
                           console.log('Finished Downloading' + profile.ProfileImage+extention)
                            download(profile.ProfileImage,newfile , function(err){
                                console.log('Finished Downloading' + filename)
                            });
                        });
                       }
                       catch (e)
                       {

                       }
                }
                res.json(true);
            })

    }); */



function download (url, dest, callback){
     request.get(url)
        .on('error', function(err) {console.log(err)} )
        .pipe(fs.createWriteStream(dest))
        .on('close', callback);
};


module.exports = router;