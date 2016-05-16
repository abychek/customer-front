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
        $routeProvider.when('/auth/registration', {
            templateUrl: './app/templates/registration.tmpl.html',
            controller: 'RegistrationCtrl'
        }).when('/auth/login', {
            templateUrl: './app/templates/authorization.tmpl.html',
            controller: 'AuthorizationCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }])
    .run(['$rootScope', 'isAuthorizedChecker', function ($rootScope, isAuthorizedChecker) {
        $rootScope.$on('$routeChangeSuccess', function () {
            isAuthorizedChecker.check();
        })
    }]);