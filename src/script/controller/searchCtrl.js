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
