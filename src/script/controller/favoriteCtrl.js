'use strict';
angular.module('app').controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){
    $http.get('data/myFavorite.json').then(function(resp){
        $scope.favoriteList = resp.data;
    });
}]);
