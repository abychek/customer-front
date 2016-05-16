var registration = angular.module('registration-ctrl', []);
registration.controller('RegistrationCtrl', [
    '$scope',
    '$http',
    'authorizationService',
    function ($scope, $http, authorizationService) {
        $scope.user = {
            name: '',
            username: '',
            password: ''
        };

        $scope.register = function () {
            $http.post(
                '/api/auth/authorization',
                $.param({
                    name: $scope.user.name,
                    username: $scope.user.username,
                    password: $scope.user.password
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
            ).then(function successCallback(response) {
                var authToken = btoa($scope.user.username + ':' + $scope.user.password);
                authorizationService.login(response.data.id, authToken);
            }, function errorCallback(response) {
                console.log(response)
            });
        }
    }]);