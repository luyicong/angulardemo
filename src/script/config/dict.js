'use strict';
//定义一个全局变量,run初始化变量
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
    //获取城市选择列表
    $http.get('/jobData/city.json').then(function(resp){
        dict.city = resp.data;
    });
    //获取薪资范围列表
    $http.get('/jobData/salary.json').then(function(resp){
        dict.salary = resp.data;
    });
    //获取企业规模列表
    $http.get('/jobData/scale.json').then(function(resp){
        dict.scale = resp.data;
    });
}]);