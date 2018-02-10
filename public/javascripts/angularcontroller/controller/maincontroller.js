"use strict";

(function () {

    app.config(function ($routeProvider,$locationProvider) {

        var onlyLoggedIn = function () {
            return {
                load: function ($q, $window, $location) {
                    if ($window.localStorage.getItem('user')) {
                        var deferred = $q.defer();
                        deferred.resolve();
                        return deferred.promise;
                    } else {
                        $location.path('/login');
                        return $q.reject("'/login'");
                    }
                }
            };
        };

        $routeProvider
            .when('/', {
                title: 'Home',
                templateUrl: 'main.html',
                controller: 'mainController'
            })
            .when('/login', {
                title: 'Login Page',
                templateUrl: 'login.html',
                controller: 'authController'
            })
           .when('/register', {
               title: 'Register Page',
               templateUrl: 'register.html',
               controller: 'authController'
            })
            .when('/import', {
                title: 'Import Process',
                templateUrl: 'uploaddocument.html',
                controller: 'importDocumentController'
            })
            .otherwise({   // This is when any route not matched
                title: 'Home',
                templateUrl: 'main.html',
                controller: 'mainController'
            });

        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode(true);
        }

    });

    app.controller('mainController', ['$scope', '$rootScope', '$window', '$location', 'postService', function ($scope, $rootScope, $window, $location, postService) {

        postService.getpost().then(function (res) { $scope.posts = res.data });
        $scope.newPost = { created_by: '', text: '', created_at: '' };
        $rootScope.schemadetail=JSON.stringify({"@context":"http://schema.org","@type":"AutoBodyShop","name":"Test Business name","address":{"@type":"PostalAddress","streetAddress":"1222","addressLocality":"Noida","addressRegion":"12","postalCode":"2111212"},"priceRange":"$"});
        $scope.post = function () {
            debugger;
            $scope.newPost.created_by = $rootScope.current_user;
            $scope.newPost.created_at = Date.now();
            debugger;
            postService.save($scope.newPost).then(function (data) {
                postService.getpost().then(function (res) { $scope.posts = res.data });
                $scope.newPost = { created_by: '', text: '', created_at: '' };
            });
        };

    }]);

    app.controller('authController', ['$scope', '$http', '$rootScope', '$location', '$window', 'userService', function ($scope, $http, $rootScope, $location, $window, userService) {

        $scope.submitText = "Register";
        $scope.submitted = false;
        $scope.message = '';
        $scope.isFormValid = false;
        $scope.mailText = 'Send Password';

        $rootScope.schemadetail=JSON.stringify({
            "@context": "http://schema.org",
            "@type": "TireShop",
            "name": ""

        });

        $scope.$watch('f1.$valid', function (newValue) {
            $scope.isFormValid = newValue;
        });

        $scope.user = { username: '', password: '' };
        $scope.error_message = '';

        $scope.login = function () {
            debugger;
            userService.login($scope.user).then(function (data) {
                if (data.state == 'success') {
                    $rootScope.authenticated = true;
                    $rootScope.current_user = data.user.username;
                    debugger;
                    $window.localStorage.setItem('user', JSON.stringify($scope.user));
                    $location.path('/');
                }
                else {
                    $scope.error_message = data.message;
                }
            });
        };

        $scope.register = function () {

            if ($scope.submitText == 'Register') {
                $scope.submitted = true;
                $scope.error_message = '';
                if ($scope.isFormValid) {
                    debugger;
                    $scope.submitText = 'Please Wait...';
                    userService.signup($scope.user).then(function (data) {
                        if (data.state == 'success') {
                            $rootScope.authenticated = true;
                            $rootScope.current_user = data.user.username;
                            $window.localStorage.setItem('user', JSON.stringify($scope.user));
                            $location.path('/');
                        }
                        else {
                            $scope.error_message = "already exist username/mobile number";
                            $scope.submitText = 'Register';
                        }
                    });
                }
            }
        };

        $scope.ForgotPassword = function () {
            debugger;
            if ($scope.mailText == 'Send Password') {
                $scope.mailText = 'Please Wait ....';
                var userdata = { emailid: $scope.user.emailid };
                userService.forgotp(userdata).then(function (data) {
                    $scope.mailText = 'Send Password';
                });
            }

        };

    }]);

    app.controller('importDocumentController', ['$scope', '$http', 'fileUploadService', function ($scope, $http, fileUploadService) {

        $scope.jsonFile = '';
        $scope.status = 'ready';
        $scope.Document = { DocumentType: 'category' };
        $scope.jsondocumentlist = [];
        $scope.finalresult =[];
        $scope.Message = '';
        $scope.IsFileValid = false;
        $scope.FinalMessage = '';
        $scope.SubmitText = 'Upload File & Move In DB';

        $scope.Process = function () {

            $scope.Message = 'Please wait .....';
            $scope.CheckFile();
            if ($scope.IsFileValid) {
                debugger;
                $scope.SubmitText = 'Please Wait ... !';
                var formData = new FormData;
                for (var key in $scope.Document) {
                    console.log(key, 'key ...');
                    formData.append(key, $scope.Document[key]);
                }
                var file = $('#file')[0].files[0];
                formData.append('DocumentName', file.name);
                formData.append('Size', file.size);
                formData.append('File', file);
                debugger;
               fileUploadService.uploaddocument(formData).then(function (data) {
                   $scope.finalresult=data;
                   $scope.reset();
                });
            }
        }

        $scope.CheckFile = function () {

            $scope.FinalMessage = '';
            var isValid = false;
            var file = $('#file')[0].files[0];
            if (file) {
                if (file.name.split('.')[1].toLowerCase() === 'csv') {
                    isValid = true;
                  //  if (file.size < 125782672)
                    //    isValid = true;
                   // else
                    //    $scope.Message = 'Please select 5,600 KB  file only';
                }
                else
                    $scope.Message = 'Please select .csv file only';
            }
            else
                $scope.Message = 'Please select  file only';

            $scope.IsFileValid = isValid;

        }

        $scope.reset = function () {
            $scope.jsonFile = '';
            $scope.status = 'ready';
            $scope.Document = { DocumentType: 'category' };
            $scope.jsondocumentlist = [];

            $scope.Message = '';
            $scope.IsFileValid = false;
            $scope.SubmitText = 'Upload File & Move In DB';
        }
    }]);

    

})();