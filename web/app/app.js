var phonecatApp = angular.module('customers', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'controller-manager'
]);
phonecatApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/users/:userId', {
            templateUrl: './app/templates/user.tmpl.html',
            controller: 'UserCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);