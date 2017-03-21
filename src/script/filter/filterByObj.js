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