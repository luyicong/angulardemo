'use strict';
angular.module('app').controller('loginCtrl', ['cache','$http', '$scope','$state', function(cache,$http, $scope,$state){
    $scope.submit = function(){
        $http.post('data/login.json',$scope.user).success(function(resp){
            //写入缓存
            cache.put('id',resp.data.id);
            cache.put('name',resp.data.name);
            cache.put('image',resp.data.image);
            $state.go('main');
        });
    }
}]);
