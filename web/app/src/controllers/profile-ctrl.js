var profile = angular.module('profile-ctrl', []);
profile.controller('ProfileCtrl', function ($scope, $http, localStorageService) {
    var id = -1;
    $scope.user = {
        name: '',
        username: '',
        cards: []
    };
    $http.get(
        '/api/customer-api/users/' + localStorageService.get('user-id'),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    ).then(function successCallback(response) {
        id = response.data.id;
        $scope.user.name = response.data.name;
        $scope.user.username = response.data.username
    
    }, function errorCallback(response) {
        console.log('Get user error.')
    }).then(function getCards() {
        $http.get(
            '/api/customer-api/users/'+ id +'/cards',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function successCallback(response) {
            $scope.user.cards = response.data;
        }, function errorCallback(response) {
            console.log('Get cards error.')
        });
    });
});