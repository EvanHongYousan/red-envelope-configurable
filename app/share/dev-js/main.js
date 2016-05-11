/**
 * Created by yantianyu on 2016/5/6 0006.
 */
;
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'templatescache']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .when('/result', {
            templateUrl: 'result.html',
            controller: 'resultController'
        })

        .otherwise('/home');

}]);
app.service('configService', function () {
    this.data = [];
});
app.controller('homeController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    $http({
        method: 'GET',
        url: '../common/spread.json'
    }).then(function (resp) {
        $scope.imgSrc = resp.data.front_pic_2;
        $scope.openBtnText = resp.data.button_share_name_11;
        $scope.phoneNumber = '';
        $scope.openBtnBgImg = resp.data.button_share_pic_10;
        $scope.rulesText = resp.data.share_rule_12;
    });

    $scope.openRedPackage = function () {
        $location.path('result');
    }
}]);

app.controller('resultController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $http({
        method: 'GET',
        url: '../common/spread.json'
    }).then(function (resp) {
        $scope.imgSrc = resp.data.front_pic_2;
        $scope.downloadBtnText = resp.data.button_fetch_text_14;
        $scope.downloadBtnImg = resp.data.button_fetch_pic_13;
    });
}]);

app.run(function () {
    JSNativeBridge.init();
});