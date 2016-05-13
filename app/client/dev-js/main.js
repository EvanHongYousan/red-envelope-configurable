/**
 * Created by yantianyu on 2016/5/12 0006.
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
app.service('storageService', function () {
    this.data = [];
});
app.controller('homeController', ['$scope', '$http', '$location', '$rootScope', '$timeout', 'storageService', function ($scope, $http, $location, $rootScope, $timeout, storageService) {
    $http({
        method: 'GET',
        url: '../../common/spread.json'
    }).then(function (resp) {
        $scope.imgSrc = resp.data.front_pic_2;
        $scope.shareBtnText = resp.data.button_name_5;
        $scope.openBtnBgImg = resp.data.button_pic_4;
        $scope.rulesText = resp.data.rule_6;

        $scope.share = function () {
            JSNativeBridge.send('share', {
                "content": resp.data.share_word_8[Math.floor(Math.random() * 3)],
                "title": resp.data.share_title_7[Math.floor(Math.random() * 3)],
                "type": 0,
                "image_url": resp.data.share_pic_9,
                "target_url": resp.data.shareURL,
                "target_url_forQQ": resp.data.shareURL_forQQ
            });
        };
    });
    JSNativeBridge.init(function (id, content) {
        switch(id){
            case 'client_msg_already_share':break;
            default:break;
        }
    });
}]);

app.controller('resultController', ['$scope', '$http', '$rootScope', 'storageService', function ($scope, $http, $rootScope, storageService) {
    $http({
        method: 'GET',
        url: '../../common/spread.json'
    }).then(function (resp) {
        $scope.imgSrc = resp.data.front_pic_2;
        $scope.downloadBtnText = resp.data.button_fetch_text_14;
        $scope.downloadBtnImg = resp.data.button_fetch_pic_13;
    });
    $scope.price = storageService.data.price;
    $scope.phoneNumber = storageService.data.phoneNumber;
    $scope.download = function () {
        window.location = 'http://www.hjlaoshi.com';
    };
}]);

app.run(function () {
});