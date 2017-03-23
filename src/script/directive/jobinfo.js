'use strict';
angular.module('app').directive('appJobInfo',['$http',function($http){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/job_info.html',
        scope : {
            isActive:'=',
            isLogin: '=',
            pos:'='
        },
        link : function($scope){
           $scope.$watch('pos',function(newval){
            if(newval){
                 $scope.pos.select = $scope.pos.select || false;
                 $scope.imgPath = $scope.pos.select?'image/star_i_active.png':'image/star_i.png';
            }
           });
            $scope.favorite = function(){
                $http.post('/jobData/myFavorite.json',{
                    id : $scope.pos.id,
                    select : !$scope.pos.select
                }).success(function(){
                    $scope.pos.select = !$scope.pos.select;
                    $scope.imgPath = $scope.pos.select?'image/star_i_active.png':'image/star_i.png';
                });
            }
        }
    }
}]);