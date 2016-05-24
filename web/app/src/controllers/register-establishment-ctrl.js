var registerEstablishment = angular.module('register-establishment-ctrl', []);
registerEstablishment.controller('RegisterEstablishmentCtrl', function ($scope, $http, $location) {
    $scope.establishment = {
        title: '',
        description: ''
    };
    $scope.register = function () {
        $http.post(
            '/api/employer-api/establishments',
            $.param({
                title: $scope.establishment.title,
                description: $scope.establishment.description
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function success(response) {
            $location.path('/profile');
        }, function error(error) {
            if(error.status === 403) {
                $location.path('/');
            } else {
                console.log(error);
            }
        });
    }
});