'use strict';
angular.module('app').directive('appJobInfo',[function(){
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
            $scope.imgPath = $scope.isActive?'image/star_i_active.png':'image/star_i.png';
        }
    }
}]);