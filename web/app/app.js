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
        }).when('/profile', {
            templateUrl: './app/templates/profile.tmpl.html',
            controller: 'ProfileCtrl'
        }).when('/profile/cards/:id', {
            templateUrl: './app/templates/card.tmpl.html',
            controller: 'CardCtrl'
        }).when('/establishments', {
            templateUrl: './app/templates/establishments-list.tmpl.html',
            controller: 'EstablishmentsCtrl'
        }).when('/establishments/:id/specials', {
            templateUrl: './app/templates/specials-list.tmpl.html',
            controller: 'SpecialsCtrl'
        }).when('/specials/:id', {
            templateUrl: './app/templates/concrete-special.tmpl.html',
            controller: 'ConcreteSpecialsCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }])
    .run(['$rootScope', 'isAuthorizedChecker', function ($rootScope, isAuthorizedChecker) {
        $rootScope.$on('$routeChangeSuccess', function () {
            isAuthorizedChecker.check();
        })
    }]);