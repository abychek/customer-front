var specials = angular.module('specials-ctrl', []);
specials.controller('SpecialsCtrl', function ($scope, $http, $routeParams) {
    $scope.specials = [];
    $http.get(
        '/api/customer-api/establishments/' + $routeParams.id + '/specials',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    ).then(function success(response) {
        $scope.specials = response.data;
    }, function error(error) {
        console.log(error);
    });
});