angular.module('manager', [
    'is-authorized-checker',
    'authorization-service',
    'registration-ctrl',
    'authorization-ctrl',
    'header-ctrl',
    'profile-ctrl',
    'card-ctrl',
    'establishments-list-ctrl',
    'specials-ctrl',
    'concrete-special-ctrl',
    'concrete-establishment-ctrl',
    'register-establishment-ctrl',
    'register-special-ctrl'
]);
var authorizationService = angular.module('authorization-service', []);
authorizationService.service('authorizationService', function (localStorageService, $http) {
    return {
        login: function (id, token, isEmployer) {
            localStorageService.set('auth-token', token);
            localStorageService.set('user-id', id);
            $http.defaults.headers.common.Authorization = 'Basic ' + localStorageService.get('auth-token');
        }
    }
});
var isAuthorizedChecker = angular.module('is-authorized-checker', []);
isAuthorizedChecker.service('isAuthorizedChecker', function ($rootScope, localStorageService) {
   return {
       check: function () {
           var isAuthorised = localStorageService.get('auth-token');
           if (isAuthorised) {
               $rootScope.isAuthorised = true;
           }
           return isAuthorised;
       }
   }
});

var authorization = angular.module('authorization-ctrl', []);
authorization.controller('AuthorizationCtrl', [
    '$scope',
    '$http',
    '$location',
    'authorizationService',
    function ($scope, $http, $location, authorizationService) {
        $scope.user = {
            username: '',
            password: ''
        };

        $scope.login = function () {
            console.log(btoa($scope.user.username + ':' + $scope.user.password));
            $http.get(
                '/api/auth/login',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                        'Authorization': 'Basic ' + btoa($scope.user.username + ':' + $scope.user.password)
                    }
                }
            ).then(function successCallback(response) {
                var authToken = btoa($scope.user.username + ':' + $scope.user.password);
                authorizationService.login(response.data.id, authToken, response.data.is_employer);
                $location.path('/');
            }, function errorCallback(response) {
                console.log(response)
            });
        }
    }]);
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
        '/api/customer-api/users/' + localStorageService.get('user-id') + '/cards/' + $routeParams.id,
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
        '/api/customer-api/specials/' + $routeParams.id,
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
            '/api/customer-api/cards',
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
var header = angular.module('header-ctrl', []);
header.controller('HeaderCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'localStorageService',
    'isAuthorizedChecker',
    function ($scope, $rootScope, $location, localStorageService, isAuthorizedChecker) {
        $scope.redirectToProfile = function () {
            $location.path('/profile');
        }
    }]);
var profile = angular.module('profile-ctrl', []);
profile.controller('ProfileCtrl', function ($scope, $http, localStorageService) {
    var id = -1;
    $scope.user = {
        name: '',
        username: '',
        cards: [],
        establishments: [],
        isEmployer: true
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
            '/api/customer-api/users/' + id + '/cards',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function successCallback(response) {
            $scope.user.cards = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }).then(function getEstablishments() {
        $http.get(
            '/api/employer-api/users/' + id + '/establishments',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function success(response) {
            $scope.user.establishments = response.data;
        }, function error(error) {
            if(error.status === 403) {
                $scope.user.isEmployer = false;
            } else {
                console.log(error);
            }
        })
    });
});
var registerEstablishment = angular.module('register-establishment-ctrl', []);
registerEstablishment.controller('RegisterEstablishmentCtrl', function ($scope, $http, $location) {
    $scope.establishment = {
        title: '',
        description: ''
    };
    $scope.register = function () {
        $http.post(
            '/api/employer-api/establishments',
            $.param({
                title: $scope.establishment.title,
                description: $scope.establishment.description
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
        ).then(function success(response) {
            $location.path('/profile');
        }, function error(error) {
            if(error.status === 403) {
                $location.path('/');
            } else {
                console.log(error);
            }
        });
    }
});
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
var registration = angular.module('registration-ctrl', []);
registration.controller('RegistrationCtrl', [
    '$scope',
    '$http',
    'authorizationService',
    function ($scope, $http, authorizationService) {
        $scope.user = {
            name: '',
            username: '',
            password: ''
        };

        $scope.register = function () {
            $http.post(
                '/api/auth/authorization',
                $.param({
                    name: $scope.user.name,
                    username: $scope.user.username,
                    password: $scope.user.password
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                    }
                }
            ).then(function successCallback(response) {
                var authToken = btoa($scope.user.username + ':' + $scope.user.password);
                authorizationService.login(response.data.id, authToken);
            }, function errorCallback(response) {
                console.log(response)
            });
        }
    }]);
var specials = angular.module('specials-ctrl', []);
specials.controller('SpecialsCtrl', function ($scope, $http, $routeParams, $location) {
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
    $scope.redirect = function (id) {
        $location.path('/specials/' + id);
    };
});