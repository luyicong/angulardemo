'use strict';
angular.module('app').controller('mainCtrl', ['cache','$state','$http', '$scope', function(cache,$state,$http, $scope){
    if(cache.get('name')){
        $scope.isLogin = true;
    }else{
        $scope.isLogin = false;
    }
    $http.get('/jobData/positionList.json').then(function(resp){
        $scope.list = resp.data;
    });
}]);
