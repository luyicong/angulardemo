'use strict';

angular.module('app', ['ui.router']);


'use strict';
angular.module('app').controller('mainCtrl',['$scope',function(){
    
}]);
'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
  });
  $urlRouterProvider.otherwise('main');
}])

'use strict';
angular.module('app').directive('appFoot',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/foot.html'
    }
}]);
'use strict';
angular.module('app').directive('appJobList',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/hbody.html'
    }
}]);
'use strict';
angular.module('app').directive('appHead',[function(){
    return {
        restrict:'A',
        replace:true,
        templateUrl:'view/template/head.html'
    }
}]);