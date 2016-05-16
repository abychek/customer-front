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
