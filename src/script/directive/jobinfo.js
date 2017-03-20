'use strict';
angular.module('app').directive('appJobInfo',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/job_info.html'
    }
}]);