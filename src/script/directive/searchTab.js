'use strict';
angular.module('app').directive('appTab',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/search_tab.html',
        scope:{
            list:'=',
            tabClick:'&'
        },
        link:function($scope){
            $scope.select = function(tab){
                $scope.selectId = tab.id;
                $scope.tabClick(tab);
            }
            // $scope.select('city');
        }
    }
}]);