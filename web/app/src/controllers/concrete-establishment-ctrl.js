var concreteEstablishmentCtrl = angular.module('concrete-establishment-ctrl', []);
concreteEstablishmentCtrl.controller(
    'ConcreteEstablishmentsCtrl',
    function ($scope, $routeParams, $http, $location, localStorageService) {
        $scope.establishment = {
            id: '',
            title: '',
            description: '',
            specials: [],
            departments: [],
            workers: []
        };
        $http.get(
            '/api/employer-api/establishments/' + $routeParams.id,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function success(response) {
            $scope.establishment.id = response.data.id;
            $scope.establishment.title = response.data.title;
            $scope.establishment.description = response.data.description;
        }, function error(error) {
            if (error.status === 403) {
                $location.path('/');
            } else {
                console.log(error);
            }
        }).then(function getSpecials() {
            $http.get(
                '/api/customer-api/establishments/' + $routeParams.id + '/specials',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
            ).then(function success(response) {
                $scope.establishment.specials = response.data;
            }, function error(error) {
                console.log(error);
            });
        }).then(function getWorkers() {
            $http.get(
                '/api/employer-api/establishments/' + $routeParams.id + '/workers',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
            ).then(function success(response) {
                $scope.establishment.workers = response.data;
            }, function error(error) {
                console.log(error);
            });
        });
        $scope.addSpecialPage = function (id) {
            localStorageService.set('establishment-id', id);
            $location.path('/register/special')
        }
    });