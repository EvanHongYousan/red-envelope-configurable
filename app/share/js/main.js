/**
 * Created by yantianyu on 2016/5/6 0006.
 */

var app = angular.module('app', ['ngRoute', 'ngAnimate','templatescache']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })

        .otherwise('/home');

});
app.service('configService', function () {
    this.data = [];
});
app.controller('homeController', function ($scope,$http) {
    $http({
        method: 'GET',
        url: '../common/spread.json'
    }).then(function (resp) {
        $scope.imgSrc = resp.data.banner;
        $scope.openBtnText = resp.data.openBtnText;
        $scope.phoneNumber = '';
        $scope.openBtnBgColor = resp.data.openBtnBgColor;
    });
});

app.run(function () {
    JSNativeBridge.init();
});