angular.module('manager', [
    'is-authorized-checker',
    'user-ctrl',
    'registration-ctrl',
    'header-ctrl'
]);
var isAuthorizedChecker = angular.module('is-authorized-checker', []);
isAuthorizedChecker.service('isAuthorizedChecker', function (localStorageService) {
   return {
       check: function () {
           return localStorageService.get('auth-token');
       }
   }
});

var header = angular.module('header-ctrl', []);
header.controller('HeaderCtrl', [
    '$scope',
    '$location',
    'localStorageService',
    'isAuthorizedChecker',
    function ($scope, $location, localStorageService, isAuthorizedChecker) {
        $scope.authorized = isAuthorizedChecker.check();

        $scope.redirectToProfile = function () {
            $location.path('/users/' + localStorageService.get('user-id'));
        }
    }]);
var registration = angular.module('registration-ctrl', []);
registration.controller('RegistrationCtrl', function ($scope, $http, localStorageService) {
    $scope.user = {
        name: '',
        username: '',
        password: ''
    };

    $scope.register = function () {
        $http.post(
            '/api/auth/registration',
            $.param({
                name: $scope.user.name,
                username: $scope.user.username,
                password: $scope.user.password
            }),
            {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function successCallback(response) {
            var authToken = btoa($scope.user.username + ':' + $scope.user.password);
            localStorageService.set('auth-token', authToken);
            localStorageService.set('user-id', response.data.id);
        }, function errorCallback(response) {
            console.log(response)
        });
    }
});
var users = angular.module('user-ctrl', []);

users.controller('UserCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.userId = $routeParams.userId;
    $scope.isCollapsed = false;
}]);