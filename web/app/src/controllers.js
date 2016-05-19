angular.module('manager', [
    'is-authorized-checker',
    'authorization-service',
    'registration-ctrl',
    'authorization-ctrl',
    'header-ctrl',
    'profile-ctrl',
    'card-ctrl',
    'establishments-list-ctrl',
    'specials-ctrl'
]);
var authorizationService = angular.module('authorization-service', []);
authorizationService.service('authorizationService', function (localStorageService, $http) {
    return {
        login: function (id, token) {
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
                authorizationService.login(response.data.id, authToken);
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
        console.log($scope.card);
    }, function errorCallback(response) {
        console.log(response)
    });
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