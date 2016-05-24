var registerSpecialCtrl = angular.module('register-special-ctrl', []);
registerSpecialCtrl.controller('RegisterSpecialCtrl', function ($scope, $http, $location, localStorageService) {
    $scope.special = {
        title: '',
        description: '',
        start_date: new Date(),
        end_date: new Date(),
        count: ''
    };
    var establishmentId = localStorageService.get('establishment-id');
    $scope.register = function () {
        var start_date = $scope.special.start_date,
            end_date = $scope.special.end_date;
        $http.post(
            '/api/employer-api/establishments/' + establishmentId + '/specials',
            $.param({
                title: $scope.special.title,
                description: $scope.special.description,
                start_date: start_date.getDate() + '.' + start_date.getMonth() + '.' + start_date.getFullYear(),
                end_date: end_date.getDate() + '.' + end_date.getMonth() + '.' + end_date.getFullYear(),
                count: $scope.special.count
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function success(response) {
            localStorageService.remove('establishment-id');
            $location.path('/establishments/' + establishmentId);
        }, function error(error) {
            if (error.status === 403) {
                $location.path('/');
            } else {
                console.log(error);
            }
        })
    };
});