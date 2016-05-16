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