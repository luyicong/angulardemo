'use strict';
angular.module('app').directive('appJobList',['$http',function($http){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/hbody.html',
        scope:{
            data:'=',
            filterObj:'=',
            isFavorite:'='
        },
        link : function($scope){
            $scope.select = function(item){
                $http.post('/jobData/myFavorite.json',{
                    id : item.id,
                    select : !item.select
                }).success(function(){
                    item.select = !item.select;
                });
                
            }
        }
    }
}]);