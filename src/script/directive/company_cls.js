'use strict';
angular.module('app').directive('appCompanyCls',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/company_cls.html',
        scope : {
            jobcate:'='
        },
        link : function($scope){
            $scope.showThisJobList = function(idx){
                $scope.jobList = $scope.jobcate[idx].positionList;
                $scope.isActive = idx;
            }
            //默认选中第一个
            $scope.$watch('jobcate', function(newVal){
                if(newVal) $scope.showThisJobList(0);
            });
        }
    }
}]);