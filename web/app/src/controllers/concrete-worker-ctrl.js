var concreteWorker = angular.module('concrete-worker-ctrl', []);
concreteWorker.controller('ConcreteWorkerCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.worker = {
        id: '',
        name: ''
    };
    $http.get(
        '/api/employer-api/workers/' + $routeParams.id,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
    ).then(function success(response) {
        $scope.worker.id = response.data.id;
        $scope.worker.name = response.data.name;
    }, function error(error) {
        if (error.status === 403) {
            $location.path('/');
        } else {
            console.log(error);
        }
    });
});
