'use strict';

angular.module('app', ['ui.router','ngCookies']);


'use strict';
//定义一个全局变量,run初始化变量
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
    //获取城市选择列表
    $http.get('data/city.json').then(function(resp){
        dict.city = resp.data;
    });
    //获取薪资范围列表
    $http.get('data/salary.json').then(function(resp){
        dict.salary = resp.data;
    });
    //获取企业规模列表
    $http.get('data/scale.json').then(function(resp){
        dict.scale = resp.data;
    });
}]);
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
  }).state('login',{
    url : '/login',
    templateUrl : 'view/login.html',
    controller : 'loginCtrl'
  }).state('register',{
    url : '/register',
    templateUrl : 'view/register.html',
    controller : 'registerCtrl'
  }).state('me',{
    url : '/me',
    templateUrl : 'view/me.html',
    controller : 'meCtrl'
  }).state('post',{
    url : '/post',
    templateUrl : 'view/post.html',
    controller : 'postCtrl'
  }).state('favorite',{
    url : '/favorite',
    templateUrl : 'view/favorite.html',
    controller : 'favoriteCtrl'
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
angular.module('app').controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){

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
angular.module('app').controller('loginCtrl', ['$http', '$scope', function($http, $scope){

}]);

'use strict';
angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope){
    $http.get('/data/positionList.json').then(function(resp){
        $scope.list = resp.data;
    });
}]);

'use strict';
angular.module('app').controller('meCtrl', ['$http', '$scope', function($http, $scope){

}]);

'use strict';
angular.module('app').controller('postCtrl', ['$http', '$scope', function($http, $scope){

}]);

'use strict';
angular.module('app').controller('registerCtrl', ['$http', '$scope', function($http, $scope){

}]);

'use strict';
angular.module('app').controller('searchCtrl', ['dict','$http','$scope', function(dict,$http,$scope){
    $scope.name = '';
    $scope.search = function(){
        $http.get('/data/positionList.json?name='+$scope.name).then(function(resp){
            $scope.searchLists = resp.data;
        });
    }
    $scope.search();
    //定义刷选条件列表数据的数组
    $scope.sheet=[];
    $scope.tabList = [
        {
            id:'city',
            name:'城市'
        },
        {
            id:'salary',
            name:'薪资'
        },
        {
            id:'scale',
            name:'公司规模'
        }
        ];
        var tabid = '';
        //定义过滤条件的数组
        $scope.filterObj = {};
        $scope.tClick = function(id,name){
            tabid = id;
            $scope.sheet.list = dict[id];
            $scope.sheet.visible = true;
        }
        //帅选事件
        $scope.sClick = function(id,name){
            if(id){
                angular.forEach($scope.tabList,function(item){
                    if(item.id === tabid){
                        item.name = name;
                    }
                });
                //定义过滤条件
                $scope.filterObj[tabid + 'Id'] = id;
            }else{
                //没有id时删除过滤条件
                delete $scope.filterObj[tabid + 'Id'];
                angular.forEach($scope.tabList,function(item){
                    if(item.id === tabid){
                        switch(item.id){
                            case 'city':
                                item.name = '城市';
                                break;
                            case 'salary':
                                item.name = '薪资';
                                break;
                            case 'scale':
                                item.name = '公司规模';
                                break;
                                default:
                        }
                    }
                });
            }
        }
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
        scope:{
            data:'=',
            filterObj:'='
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
'use strict';
angular.module('app').directive('appSheet',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/sheet.html',
        scope:{
            list:'=',
            visible:'=',
            select:'&'
        }
    }
}]);
'use strict';
//定义一个过滤器
angular.module('app').filter('filterByObj',[function(){
    return function(list,obj){
        //定义结果数组
        var result = [];
        angular.forEach(list,function(item){
            //假如两值相等
            var isEqual = true;
            for(var e in obj){ 
                if(item[e] !== obj[e]){//遍历，假如不相等
                    isEqual = false;
                }
            }
            if(isEqual){
                result.push(item);
            }
        });
        return result;
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