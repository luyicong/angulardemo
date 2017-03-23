"use strict";angular.module("app",["ui.router","ngCookies","validation","ngAnimate"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e.get("/jobData/city.json").then(function(e){t.city=e.data}),e.get("/jobData/salary.json").then(function(e){t.salary=e.data}),e.get("/jobData/scale.json").then(function(e){t.scale=e.data})}]),angular.module("app").config(["$provide",function(t){t.decorator("$http",["$delegate","$q",function(t,e){var a=t.get;return t.post=function(t,n,o){var i=e.defer();return a(t).then(function(t){i.resolve(t)},function(t){i.reject(t)}),{success:function(t){i.promise.then(t)},error:function(t){i.promise.then(t)}}},t}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("job_details",{url:"/job_details/:id",templateUrl:"view/job_details.html",controller:"jobDetailsCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}),e.otherwise("main")}]),angular.module("app").config(["$validationProvider",function(t){var e={phone:/^1[34578]\d{9}$/,password:function(t){return(t+"").length>6},required:function(t){return!!t}},a={phone:{success:"",error:"必须是11位的手机号！"},password:{success:"",error:"长度至少为6位！"},required:{success:"",error:"值不能为空"}};t.setExpression(e).setDefaultMsg(a)}]),angular.module("app").controller("companyCtrl",["$http","$state","$scope",function(t,e,a){t.get("/jobData/company.json?id="+e.params.id).then(function(t){a.companyInfo=t.data,a.jobcate=t.data.positionClass})}]),angular.module("app").controller("favoriteCtrl",["$http","$scope",function(t,e){t.get("/jobData/myFavorite.json").then(function(t){e.favoriteList=t.data})}]),angular.module("app").controller("jobDetailsCtrl",["$log","$q","$http","$state","$scope","cache",function(t,e,a,n,o,i){function r(t){a.get("/jobData/company.json?id="+t).then(function(t){o.companyInfo=t.data})}o.isLogin=!!i.get("name"),o.message=o.isLogin?"投个简历":"去登录",function(){var t=e.defer();return a.get("/jobData/position.json?id="+n.params.id).then(function(e){o.position=e.data,e.data.posted&&(o.message="已投递"),t.resolve(e.data)},function(e){t.reject(e)}),t.promise}().then(function(t){r(t.companyId)},function(){}),o.go=function(){"已投递"!==o.message&&(o.isLogin?a.post("/jobData/position.json",{id:o.position.id}).success(function(e){t.info(e),o.message="已投递"}):n.go("login"))}}]),angular.module("app").controller("loginCtrl",["cache","$http","$scope","$state",function(t,e,a,n){a.submit=function(){e.post("/jobData/login.json",a.user).success(function(e){t.put("id",e.data.id),t.put("name",e.data.name),t.put("image",e.data.image),n.go("main")})}}]),angular.module("app").controller("mainCtrl",["cache","$state","$http","$scope",function(t,e,a,n){t.get("name")?n.isLogin=!0:n.isLogin=!1,a.get("/jobData/positionList.json").then(function(t){n.list=t.data})}]),angular.module("app").controller("meCtrl",["$state","cache","$http","$scope",function(t,e,a,n){e.get("name")&&(n.name=e.get("name"),n.image=e.get("image")),n.logout=function(){e.remove("id"),e.remove("name"),e.remove("image"),t.go("main")}}]),angular.module("app").controller("postCtrl",["$http","$scope",function(t,e){e.tabList=[{id:"all",name:"全部"},{id:"pass",name:"邀请面试"},{id:"fail",name:"不合适"}],t.get("/jobData/myPost.json").then(function(t){e.myPostList=t.data}),e.filterObj={},e.tClick=function(t,a){switch(t){case"all":delete e.filterObj.state;break;case"pass":e.filterObj.state="1";break;case"fail":e.filterObj.state="-1"}}}]),angular.module("app").controller("registerCtrl",["$state","$interval","$http","$scope",function(t,e,a,n){n.onOff=!1,n.regSuccess=!0;var o=3;n.submit=function(){console.log(n.user),a.post("/jobData/regist.json",n.user).success(function(a){n.onOff=!0,n.regSuccess=!0,n.isSuccess=!0,o=3,n.successTtext="恭喜您，注册成功！3s后跳转到登录页面。";var i=e(function(){o<=0?(e.cancel(i),n.successTtext="",t.go("login")):(o--,n.successTtext="恭喜您，注册成功!"+o+"s后跳转到登录页面。")},1e3)},function(t){n.onOff=!1,n.regSuccess=!1,n.isSuccess=!0})};var i=60;n.senCode=function(){a.get("/jobData/code.json").then(function(t){if(1===t.data.state){i=60,n.time="60s重新获取";var a=e(function(){if(i<=0)return e.cancel(a),void(n.time="");i--,n.time=i+"s重新获取"},1e3)}})}}]),angular.module("app").controller("searchCtrl",["dict","$http","$scope",function(t,e,a){a.name="",a.search=function(){e.get("/jobData/positionList.json?name="+a.name).then(function(t){a.searchLists=t.data})},a.search(),a.sheet=[],a.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪资"},{id:"scale",name:"公司规模"}];var n="";a.filterObj={},a.tClick=function(e,o){n=e,a.sheet.list=t[e],a.sheet.visible=!0},a.sClick=function(t,e){t?(angular.forEach(a.tabList,function(t){t.id===n&&(t.name=e)}),a.filterObj[n+"Id"]=t):(delete a.filterObj[n+"Id"],angular.forEach(a.tabList,function(t){if(t.id===n)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪资";break;case"scale":t.name="公司规模"}}))}}]),angular.module("app").directive("appCompanyCls",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/company_cls.html",scope:{jobcate:"="},link:function(t){t.showThisJobList=function(e){t.jobList=t.jobcate[e].positionList,t.isActive=e},t.$watch("jobcate",function(e){e&&t.showThisJobList(0)})}}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appJobList",["$http",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/hbody.html",scope:{data:"=",filterObj:"=",isFavorite:"="},link:function(e){e.select=function(e){t.post("/jobData/myFavorite.json",{id:e.id,select:!e.select}).success(function(){e.select=!e.select})}}}}]),angular.module("app").directive("appHead",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html"}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headbar.html",scope:{text:"@"},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appJobCompanyInfo",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/job_company_info.html",scope:{com:"="},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appJobInfo",["$http",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/job_info.html",scope:{isActive:"=",isLogin:"=",pos:"="},link:function(e){e.$watch("pos",function(t){t&&(e.pos.select=e.pos.select||!1,e.imgPath=e.pos.select?"image/star_i_active.png":"image/star_i.png")}),e.favorite=function(){t.post("/jobData/myFavorite.json",{id:e.pos.id,select:!e.pos.select}).success(function(){e.pos.select=!e.pos.select,e.imgPath=e.pos.select?"image/star_i_active.png":"image/star_i.png"})}}}}]),angular.module("app").directive("appTab",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/search_tab.html",scope:{list:"=",tabClick:"&"},link:function(t){t.select=function(e){t.selectId=e.id,t.tabClick(e)}}}}]),angular.module("app").directive("appSheet",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/sheet.html",scope:{list:"=",visible:"=",select:"&"}}}]),angular.module("app").filter("filterByObj",[function(){return function(t,e){var a=[];return angular.forEach(t,function(t){var n=!0;for(var o in e)t[o]!==e[o]&&(n=!1);n&&a.push(t)}),a}}]),angular.module("app").service("cache",["$cookies",function(t){this.put=function(e,a){t.put(e,a)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}]);