'use strict';
angular.module('app').config(['$validationProvider',function($validationProvider){
    //编写校验表单的值是否符合要求逻辑
    var expression = {
        phone : /^1[34578]\d{9}$/,
        password : function(value){
            var str = value + '';
            return str.length > 6;
        },
        required : function(value){
            return !!value;
        }
    };
    var defaultMsg = {
        phone : {
            success : '',
            error : '必须是11位的手机号！'
        },
        password : {
            success : '',
            error : '长度至少为6位！'
        },
        required : {
            success : '',
            error : '值不能为空'
        }
    };
    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);