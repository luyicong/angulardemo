'use strict';
angular.module('app').directive('appJobList',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/hbody.html',
        scope:{
            data:'=',
            filterObj:'='
        }
    }
}]);