var authorization = angular.module('authorization-ctrl', []);
authorization.controller('AuthorizationCtrl', [
    '$scope',
    '$http',
    '$location',
    'authorizationService',
    function ($scope, $http, $location, authorizationService) {
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.login = function () {
            console.log(btoa($scope.user.username + ':' + $scope.user.password));
            $http.get(
                '/api/auth/login',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                        'Authorization': 'Basic ' + btoa($scope.user.username + ':' + $scope.user.password)
                    }
                }
            ).then(function successCallback(response) {
                var authToken = btoa($scope.user.username + ':' + $scope.user.password);
                authorizationService.login(response.data.id, authToken);
                $location.path('/');
            }, function errorCallback(response) {
                console.log(response)
            });
        }
    }]);