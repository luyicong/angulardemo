'use strict';
angular.module('app').controller('postCtrl', ['$http', '$scope', function($http, $scope){
    $scope.tabList = [
        {
            id:'all',
            name:'全部'
        },
        {
            id:'pass',
            name:'邀请面试'
        },
        {
            id:'fail',
            name:'不合适'
        }
    ];
    $http.get('data/myPost.json').then(function(resp){
        console.log(resp);
        $scope.myPostList = resp.data;
    });
}]);
