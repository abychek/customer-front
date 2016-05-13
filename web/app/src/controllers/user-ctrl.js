var users = angular.module('user-ctrl', []);

users.controller('UserCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.userId = $routeParams.userId;
    $scope.isCollapsed = false;
}]);