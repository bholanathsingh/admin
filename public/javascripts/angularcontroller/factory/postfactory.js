"use strict";

(function () {

    app.factory('postService', function ($http, $q) {
        var fac = {};
        fac.getpost = function () {
            debugger;
            return $http.get(Config.Api.BaseUrl + 'api/post');
        }
        fac.save = function (data) {
            debugger;
            var defer = $q.defer();
            $http({ url: Config.Api.BaseUrl + 'api/post', method: 'post', data: data }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                alert('Error!');
                defer.reject(e);
            });
            return defer.promise;
        }
        return fac;
    });

})();