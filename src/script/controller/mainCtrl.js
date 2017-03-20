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