var freeUsers = angular.module('free-users-ctrl', []);
freeUsers.controller('FreeUsersCtrl', function ($scope, $http, localStorageService, $location) {
    $scope.users = [];
    var establishmentId = localStorageService.get('establishment-id');
    $http.get(
        '/api/employer-api/users?establishment=' + establishmentId,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    ).then(function success(response) {
        $scope.users = response.data;
    }, function error(error) {
        console.log(error);
    });
    $scope.hire = function (id) {
        $http.post(
            '/api/employer-api/establishments/' + establishmentId + '/workers',
            $.param({
                userId: id
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function success(response) {
            $location.path('/establishments/' + establishmentId)
        }, function error(error) {
            console.log(error)
        })
    };
});