
var app = angular.module('pmapp', ['ngCookies', 'ngRoute','ngResource']);


app.run(function ($rootScope, $http, $route, $window, $location, userService) {


    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.schemadetail=JSON.stringify({"@context":"http://schema.org","@type":"AutoBodyShop","name":"Test Business name","address":{"@type":"PostalAddress","streetAddress":"1222","addressLocality":"Noida","addressRegion":"12","postalCode":"2111212"},"priceRange":"$"});

    userService.islogin().then(function (d) {
        debugger;
        if (d.data != '') {
            $rootScope.authenticated = true;
            $rootScope.current_user = d.data.username;
        }
        else {
            var storageUser = $window.localStorage.getItem('user');
            if (storageUser) {
                var user = JSON.parse(storageUser);
                userService.login(user).then(function (data) {
                    if (data.state == 'success') {
                        $rootScope.authenticated = true;
                        $rootScope.current_user = data.user.username;
                        $location.path('/');
                    }
                });
            }
            // then call login function with password remember
            // $location.path('/');
        }
    });

    $rootScope.signout = function () {
        userService.signout().then(function () {
            $rootScope.authenticated = false;
            $rootScope.current_user = '';
            $window.localStorage.removeItem('user');
            $location.path('/');
        });
    };

    $rootScope.$on('$routeChangeSuccess', function (newVal, oldVal) {
        if (oldVal !== newVal) {
            document.title = $route.current.title;
        }
    });

});

