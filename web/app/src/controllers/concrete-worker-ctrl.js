var concreteWorker = angular.module('concrete-worker-ctrl', []);
concreteWorker.controller('ConcreteWorkerCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.worker = {
        id: '',
        name: ''
    };
    $http.get(
        '/api/employer-api/establishments/' + $routeParams.establishmentId + '/workers/' + $routeParams.workerId,
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
    $scope.fire = function () {
        $http.patch(
            '/api/employer-api/establishments/' + $routeParams.establishmentId + '/workers/' + $routeParams.workerId,
            $.param({
                status: 'fired'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function success(response) {
            $location.path('/establishments/' + $routeParams.establishmentId);
        }, function error(error) {
            if(error.status === 403) {
                $location.path('/');
            } else {
                console.log(error);
            }
        });
    };
});
