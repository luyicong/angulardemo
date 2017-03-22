'use strict';

angular.module('app', ['ui.router','ngCookies','validation']);


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
angular.module('app').config(['$provide',function($provide){
    $provide.decorator('$http',['$delegate','$q',function($delegate,$q){
        var get = $delegate.get;
        $delegate.post = function(url,data,config){
            var def = $q.defer();
            get(url).then(function(resp){
                def.resolve(resp);
            },function(error){
                def.reject(error);
            });
            return {
                success : function(cb){
                    def.promise.then(cb);
                },
                error : function(cb){
                    def.promise.then(cb);
                }
            }
        }
        return $delegate;
    }]);
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
angular.module('app').config(['$validationProvider',function($validationProvider){
    //编写校验表单的值是否符合要求逻辑
    var expression = {
        phone : /^1[34578]\d{9}$/,
        password : function(value){
            var str = value + '';
            return str.length > 6;
        },
        required : function(value){
            return !!value;
        }
    };
    var defaultMsg = {
        phone : {
            success : '',
            error : '必须是11位的手机号！'
        },
        password : {
            success : '',
            error : '长度至少为6位！'
        },
        required : {
            success : '',
            error : '值不能为空'
        }
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
'use strict';
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
    $http.get('data/company.json?id='+$state.params.id).then(function(resp){
        $scope.companyInfo = resp.data;
        $scope.jobcate = resp.data.positionClass;
    });
}]);
'use strict';
angular.module('app').controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){
    $http.get('data/myFavorite.json').then(function(resp){
        $scope.favoriteList = resp.data;
    });
}]);

'use strict';
angular.module('app').controller('jobDetailsCtrl',['$log','$q','$http','$state','$scope','cache',function($log,$q,$http,$state,$scope,cache){
        $scope.isLogin = !!cache.get('name');
        $scope.message = $scope.isLogin?'投个简历':'去登录'
        function getJobInfo(){
            //延迟对象
            var def = $q.defer();
            $http.get('/data/position.json?id='+$state.params.id).then(function(resp){
                $scope.position = resp.data;
                if(resp.data.posted){
                    $scope.message = '已投递';
                }
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
        //投简历事件
        $scope.go = function(){
            if($scope.message !== '已投递'){
                if($scope.isLogin){
                    $http.post('data/position.json',{
                        id : $scope.position.id
                    }).success(function(resp){
                        $log.info(resp);
                        $scope.message = '已投递';
                    });
                }else{
                    //页面跳转
                    $sate.go('login');
                }
            }
        }
}]);
'use strict';
angular.module('app').controller('loginCtrl', ['cache','$http', '$scope','$state', function(cache,$http, $scope,$state){
    $scope.submit = function(){
        $http.post('data/login.json',$scope.user).success(function(resp){
            //写入缓存
            cache.put('id',resp.data.id);
            cache.put('name',resp.data.name);
            cache.put('image',resp.data.image);
            $state.go('main');
        });
    }
}]);

'use strict';
angular.module('app').controller('mainCtrl', ['cache','$state','$http', '$scope', function(cache,$state,$http, $scope){
    if(cache.get('name')){
        $scope.isLogin = true;
    }else{
        $scope.isLogin = false;
    }
    $http.get('/data/positionList.json').then(function(resp){
        $scope.list = resp.data;
    });
}]);

'use strict';
angular.module('app').controller('meCtrl', ['$state','cache','$http', '$scope', function($state,cache,$http, $scope){
    if(cache.get('name')){
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
    }
    //退出登录
    $scope.logout = function(){
        cache.remove('id');
        cache.remove('name');
        cache.remove('image');
        $state.go('main');
    }
}]);

'use strict';
angular.module('app').controller('postCtrl', ['$http', '$scope', function($http, $scope){
    $scope.tabList = [
        {
            id:'all',
            name:'全部'
        },
        {
            id:'pass',
            name:'邀请面试'
        },
        {
            id:'fail',
            name:'不合适'
        }
    ];
    $http.get('data/myPost.json').then(function(resp){
        $scope.myPostList = resp.data;
    });
    $scope.filterObj = {};
    $scope.tClick = function(id,name){
        switch(id){
            case 'all':
                delete $scope.filterObj.state;
            break;
            case 'pass':
                $scope.filterObj.state = '1';
            break;
            case 'fail':
                $scope.filterObj.state = '-1';
            break;
        }
    }
}]);

'use strict';
angular.module('app').controller('registerCtrl', ['$state','$interval','$http', '$scope', function($state,$interval,$http, $scope){
    $scope.onOff = false;
    $scope.regSuccess = true;
    var iNum = 3;
    $scope.submit = function(){
        console.log($scope.user);
        $http.post('data/regist.json',$scope.user).success(function(resp){
            // console.log(resp);
            $scope.onOff = true;
            $scope.regSuccess = true;
            $scope.isSuccess = true;
            iNum = 3;
            $scope.successTtext = '恭喜您，注册成功！3s后跳转到登录页面。'
            var timer0 = $interval(function(){
                if(iNum <= 0){
                        //关闭定时器
                        $interval.cancel(timer0);
                        $scope.successTtext = '';
                        //跳转至登录页面
                        $state.go('login');
                    }else{
                        iNum--;
                        $scope.successTtext = '恭喜您，注册成功!'+iNum+'s后跳转到登录页面。';
                    }
            },1000);
            // $state.go('login');
        },function(error){
            $scope.onOff = false;
            $scope.regSuccess = false;
            $scope.isSuccess = true;
        });
    }
    //获取短信验证码
    var count = 60;
    $scope.senCode = function(){
        $http.get('data/code.json').then(function(resp){
            if(resp.data.state === 1){
                count = 60;
                $scope.time = '60s重新获取';
                //定时器计时，倒计时60s
                var timer = $interval(function(){
                    if(count<=0){
                        //关闭定时器
                        $interval.cancel(timer);
                        $scope.time = '';
                        return;
                    }else{
                        count--;
                        $scope.time = count+'s重新获取';
                    }
                    
                },1000);
            }
        });
    }
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
angular.module('app').directive('appJobList',['$http',function($http){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/hbody.html',
        scope:{
            data:'=',
            filterObj:'=',
            isFavorite:'='
        },
        link : function($scope){
            $scope.select = function(item){
                $http.post('data/myFavorite.json',{
                    id : item.id,
                    select : !item.select
                }).success(function(){
                    item.select = !item.select;
                });
                
            }
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
                $http.post('data/myFavorite.json',{
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
.service('cache',['$cookies',function($cookies){
    this.put = function(key,value){
        $cookies.put(key,value);
    }
    this.get = function(key){
        return $cookies.get(key);
    }
    this.remove = function(key){
        $cookies.remove(key);
    }
}]);

// .factory('cache',['$cookies',function($cookies){
//     return {
//         put : function(key,value){
//             $cookies.put(key,value);
//         },
//         get : function(key){
//             return $cookies.get(key);
//         },
//         remove : function(key){
//             $cookies.remove(key);
//         }
//     }
// }]);