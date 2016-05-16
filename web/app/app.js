var app = angular.module('customers', [
    'ngRoute',
    'ngAnimate',
    'LocalStorageModule',
    'ui.bootstrap',
    'manager'
]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('flexer')
        .setStorageType('sessionStorage')
        .setNotify(true, true)
});

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/users/:userId', {
            templateUrl: './app/templates/user.tmpl.html',
            controller: 'UserCtrl'
        }).when('/auth/registration', {
            templateUrl: './app/templates/registration.tmpl.html',
            controller: 'RegistrationCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }]);