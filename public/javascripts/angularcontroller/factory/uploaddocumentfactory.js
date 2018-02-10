"use strict";

(function () {

    app.factory('fileUploadService', function ($http, $q) {
        var fac = {};
        fac.getjsondocument = function (filename) {
            return $http.get(Config.Api.BaseUrl + 'api/importdock/getjsonvalue/' + filename)
        }
        fac.checkdocument = function (id, type) {
            return $http.get(Config.Api.BaseUrl + 'api/importdock/checkexist/' + id + '/' + type)
        }

        fac.importdocument = function (data) {
            var defer = $q.defer();
            $http({ url: Config.Api.BaseUrl + 'api/importdock/insertdocument', method: 'post', data: data }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                debugger;
                //alert('Error!');
                defer.resolve(false);
                defer.reject(e);
            });
            return defer.promise;
        }
        fac.uploaddocument = function (data) {
            var defer = $q.defer();
            $http({ url: Config.Api.BaseUrl + 'api/fileupload/ImportExcel', method: 'post', data: data, transformRequest: angular.identity, headers: { 'Content-Type': undefined } }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                alert('Error!');
                defer.reject(e);
            });
            return defer.promise;
        }

        fac.unlinkfile = function (filename) {
            return $http.get(Config.Api.BaseUrl + 'api/fileupload/unlinkfile/' + filename)
        }
        return fac;
    });

})();