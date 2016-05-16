var phonecatApp = angular.module('customers', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'controller-manager'
]);
phonecatApp.config(['$routeProvider', '$locationProvider',
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