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
