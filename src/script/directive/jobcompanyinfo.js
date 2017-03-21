'use strict';
angular.module('app').directive('appJobCompanyInfo',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/job_company_info.html',
        //单独给指令暴露一个接口
        scope : {
            com:'='
        },
        link : function($scope){
            $scope.back = function(){
                window.history.back();
            }
        }
    }
}]);