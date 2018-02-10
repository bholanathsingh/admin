"use strict";

(function () {

    app.factory('userService', function ($http, $q) {
        var fac = {};

        fac.signout = function () {
            return $http.get(Config.Api.BaseUrl + 'auth/signout');
        }
        fac.login = function (data) {
            var defer = $q.defer();
            $http({ url: Config.Api.BaseUrl + 'auth/login', method: 'post', data: data }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                alert('Error!');
                defer.reject(e);
            });
            return defer.promise;
        }
        fac.signup = function (data) {
            var defer = $q.defer();
            $http({ url: Config.Api.BaseUrl+ 'auth/signup', method: 'post', data: data }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                alert('Error!');
                defer.reject(e);
            });
            return defer.promise;
        }
        fac.forgotp = function (data) {
            var defer = $q.defer();
            $http({ url: Config.Api.BaseUrl + 'api/useraccount/forgotpassword', method: 'post', data: data }).success(function (d) {
                defer.resolve(d);
            }).error(function (e) {
                alert('Error!');
                defer.reject(e);
            });
            return defer.promise;
        }

        fac.islogin = function () {
            return $http.get(Config.Api.BaseUrl + 'auth/islogin');
        }

        return fac;
    });


})();