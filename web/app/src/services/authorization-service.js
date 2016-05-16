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