var isAuthorizedChecker = angular.module('is-authorized-checker', []);
isAuthorizedChecker.service('isAuthorizedChecker', function (localStorageService) {
   return {
       check: function () {
           return localStorageService.get('auth-token');
       }
   }
});
