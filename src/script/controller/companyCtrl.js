'use strict';
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
    $http.get('/jobData/company.json?id='+$state.params.id).then(function(resp){
        $scope.companyInfo = resp.data;
        $scope.jobcate = resp.data.positionClass;
    });
}]);