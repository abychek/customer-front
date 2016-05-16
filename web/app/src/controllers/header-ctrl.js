var header = angular.module('header-ctrl', []);
header.controller('HeaderCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'localStorageService',
    'isAuthorizedChecker',
    function ($scope, $rootScope, $location, localStorageService, isAuthorizedChecker) {
        $scope.redirectToProfile = function () {
            $location.path('/users/' + localStorageService.get('user-id'));
        }
    }]);