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

        .otherwise('/home');

}]);
app.service('configService', function () {
    this.data = [];
});
app.controller('homeController', ["$scope", "$http", function ($scope, $http) {
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
}]);

app.run(function () {
    JSNativeBridge.init();
});