var card = angular.module('card-ctrl', []);
card.controller('CardCtrl', function ($scope, $http, $routeParams, localStorageService) {
    $scope.card = {
        id: -1,
        title: '',
        description: '',
        needed_count: 0,
        actual_count: 0,
        qr_code: ''
    };
    $http.get(
        '/api/users/' + localStorageService.get('user-id') + '/cards/' + $routeParams.id,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    ).then(function successCallback(response) {
        $scope.card.id = response.data.id;
        $scope.card.title = response.data.title;
        $scope.card.description = response.data.description;
        $scope.card.needed_count = response.data.needed_count;
        $scope.card.actual_count = response.data.actual_count;
        $scope.card.qr_code = response.data.qr_code;
    }, function errorCallback(response) {
        console.log(response)
    });
});