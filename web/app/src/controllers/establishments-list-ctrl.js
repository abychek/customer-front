var establishments = angular.module('establishments-list-ctrl', []);
establishments.controller('EstablishmentsCtrl', function ($scope, $http) {
    $scope.establishments = [];
    $http.get(
        '/api/customer-api/establishments', 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    ).then(function successCallback(response) {
        $scope.establishments = response.data;
    }, function errorCallback(response) {
        console.log('Get cards error.')
    });
});