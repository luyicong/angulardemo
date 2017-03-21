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
