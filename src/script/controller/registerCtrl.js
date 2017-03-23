'use strict';
angular.module('app').controller('registerCtrl', ['$state','$interval','$http', '$scope', function($state,$interval,$http, $scope){
    $scope.onOff = false;
    $scope.regSuccess = true;
    var iNum = 3;
    $scope.submit = function(){
        console.log($scope.user);
        $http.post('/jobData/regist.json',$scope.user).success(function(resp){
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
        $http.get('/jobData/code.json').then(function(resp){
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
