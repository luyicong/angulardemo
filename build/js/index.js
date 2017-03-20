'use strict';

angular.module('app', ['ui.router']);


'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
  }).state('job_details',{
    url : '/job_details/:id',
    templateUrl : 'view/job_details.html',
    controller : 'jobDetailsCtrl'
  });
  $urlRouterProvider.otherwise('main');
}]);

'use strict';
angular.module('app').controller('jobDetailsCtrl',['$scope',function($scope){
    
}]);
'use strict';
angular.module('app').controller('mainCtrl',['$scope',function($scope){
    $scope.list = [
        {
            id : 1,
            companyName:'广西网络公司1',
            title:'项目经理1',
            address : '南宁市',
            salary : '8k-15k',
            createTime : '2017-03-19'
        },
        {
             id : 2,
            companyName:'广西网络公司2',
            title:'项目经理2',
            address : '南宁市',
            salary : '8k-15k',
            createTime : '2017-03-19'
        },
        {
            id : 3,
            companyName:'广西网络公司3',
            title:'项目经理3',
            address : '南宁市',
            salary : '8k-15k',
            createTime : '2017-03-19'
        }
    ]
}]);
'use strict';
angular.module('app').directive('appFoot',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    }
}]);
'use strict';
angular.module('app').directive('appJobList',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/hbody.html',
        scope : {
            data:'='
        }
    }
}]);
'use strict';
angular.module('app').directive('appHead',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html'
    }
}]);
'use strict';
angular.module('app').directive('appHeadBar',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/headbar.html',
        scope : {
            text : '@'
        },
        link : function($scope){
            $scope.back = function(){
                window.history.back();
            }
        }
    }
}]);
'use strict';
angular.module('app').directive('appJobInfo',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/job_info.html'
    }
}]);