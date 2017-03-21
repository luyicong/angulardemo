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