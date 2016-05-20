var concreteSpecial = angular.module('concrete-special-ctrl', []);
concreteSpecial.controller('ConcreteSpecialsCtrl', function ($scope, $http, $routeParams) {
    $scope.special = {
        id: '',
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        count: ''
    };
    $http.get(
        '/api/specials/' + $routeParams.id,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    ).then(function success(response) {
        $scope.special.id = response.data.id;
        $scope.special.title = response.data.title;
        $scope.special.description = response.data.description;
        $scope.special.start_date = response.data.start_date;
        $scope.special.end_date = response.data.end_date;
        $scope.special.count = response.data.count;
    }, function error(error) {
        console.log(error);
    });
    $scope.getIn = function () {
        console.log($scope.special);
        $http.post(
            '/api/cards',
            $.param({
                id: $scope.special.id
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function success(response) {
            console.log('OK');
        }, function error(error) {
            console.log(error);
        });
    };
});