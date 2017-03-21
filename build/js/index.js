'use strict';

angular.module('app', ['ui.router','ngCookies']);


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
  }).state('company',{
    url : '/company/:id',
    templateUrl : 'view/company.html',
    controller : 'companyCtrl'
  }).state('search',{
    url : '/search',
    templateUrl : 'view/search.html',
    controller : 'searchCtrl'
  });
  $urlRouterProvider.otherwise('main');
}]);

'use strict';
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
    $http.get('data/company.json?id='+$state.params.id).then(function(resp){
        $scope.companyInfo = resp.data;
        $scope.jobcate = resp.data.positionClass;
        console.log($scope.jobcate[0]);
    });
}]);
'use strict';
angular.module('app').controller('jobDetailsCtrl',['$q','$http','$state','$scope','cache',function($q,$http,$state,$scope,cache){
        cache.remove('to');
        $scope.isLogin = false;
        function getJobInfo(){
            //延迟对象
            var def = $q.defer();
            $http.get('/data/position.json?id='+$state.params.id).then(function(resp){
                $scope.position = resp.data;
                def.resolve(resp.data);
            },function(error){
                def.reject(error);
            });
            //返回一个promise对象
            return def.promise;
        }
        
        getJobInfo().then(function(obj){
            //def.resolve(resp)的回调
            getCompanyInfo(obj.companyId);
        },function(){
            //def.reject(error);回调
        });
        //获取公司基本信息
        function getCompanyInfo(id){
            $http.get('data/company.json?id='+id).then(function(resp){
                $scope.companyInfo = resp.data;
            });    
        }
}]);
'use strict';
angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope){
    $http.get('/data/positionList.json').then(function(resp){
        $scope.list = resp.data;
    });
}]);

'use strict';
angular.module('app').controller('searchCtrl', ['$scope', function($scope){

}]);

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
'use strict';
//自定义服务的两种方式，service和factory,比如：定义一个处理cookies服务
angular.module('app')
// .service('cache',['$cookies',function($cookies){
//     this.put = function(key,value){
//         $cookies.put(key,value);
//     }
//     this.get = function(key){
//         return $cookies.get(key);
//     }
//     this.remove = function(key){
//         $cookies.remove(key);
//     }
// }]);

.factory('cache',['$cookies',function($cookies){
    return {
        put : function(key,value){
            $cookies.put(key,value);
        },
        get : function(key){
            return $cookies.get(key);
        },
        remove : function(key){
            $cookies.remove(key);
        }
    }
}]);