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