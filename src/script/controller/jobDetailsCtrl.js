'use strict';
angular.module('app').controller('jobDetailsCtrl',['$log','$q','$http','$state','$scope','cache',function($log,$q,$http,$state,$scope,cache){
        $scope.isLogin = !!cache.get('name');
        $scope.message = $scope.isLogin?'投个简历':'去登录'
        function getJobInfo(){
            //延迟对象
            var def = $q.defer();
            $http.get('/jobData/position.json?id='+$state.params.id).then(function(resp){
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
            $http.get('/jobData/company.json?id='+id).then(function(resp){
                $scope.companyInfo = resp.data;
            });    
        }
        //投简历事件
        $scope.go = function(){
            if($scope.message !== '已投递'){
                if($scope.isLogin){
                    $http.post('/jobData/position.json',{
                        id : $scope.position.id
                    }).success(function(resp){
                        $log.info(resp);
                        $scope.message = '已投递';
                    });
                }else{
                    //页面跳转
                    $state.go('login');
                }
            }
        }
}]);