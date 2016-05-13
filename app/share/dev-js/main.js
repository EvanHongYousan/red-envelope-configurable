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
app.service('storageService', function () {
    this.data = [];
});
app.controller('homeController', ['$scope', '$http', '$location', '$rootScope', '$timeout', 'storageService', function ($scope, $http, $location, $rootScope, $timeout, storageService) {
    $http({
        method: 'GET',
        url: '../../common/spread.json'
    }).then(function (resp) {
        $scope.imgSrc = resp.data.front_pic_2;
        $scope.openBtnText = resp.data.button_share_name_11;
        $scope.phoneNumber = '';
        $scope.openBtnBgImg = resp.data.button_share_pic_10;
        $scope.rulesText = resp.data.share_rule_12;
        $rootScope.pageTitle = resp.data.title_1;

        $scope.openRedPackage = function () {

            console.log('resp.data.jsonPURL :' + resp.data.jsonPURL);

            $http({
                method: 'JSONP',
                url: resp.data.jsonPURL + "?id=" + resp.data.id + "&phone=" + $scope.phoneNumber + '&callback=JSON_CALLBACK'
            }).then(function (data) {
                console.log(data.data);
                if (data.data.status == '7' || data.data.status == '1') {
                    storageService.data = {
                        "price": data.data.price,
                        "phoneNumber": $scope.phoneNumber
                    };
                    $location.path('result');
                } else {
                    $rootScope.alertText = data.data.msg;
                    $rootScope.alertMode = 'hover';
                    $timeout(function () {
                        $rootScope.alertMode = '';
                    }, 5000);
                }
            }, function (error) {
                $rootScope.alertText = "网络断开";
                $rootScope.alertMode = 'hover';
                $timeout(function () {
                    $rootScope.alertMode = '';
                }, 5000);
            });
        };

        $http({
            method: 'JSONP',
            url: resp.data.jsonPURL.split('/app/')[0] + '/nb_static/get_js_sdk_config?url=' + Base64.encode(location.href.split('#')[0]) + '&callback=JSON_CALLBACK'
        }).then(function (data) {
            var configObj = data.data;
            configObj.jsApiList = ['hideOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
            configObj.debug = false;
            wx.config(configObj);
            wx.ready(function () {
                var shareCFObj = {
                    title: resp.data.share_title_7[Math.floor(Math.random() * 3)] || resp.data.share_title_7[0], // 分享标题
                    desc: resp.data.share_word_8[Math.floor(Math.random() * 3)] || resp.data.share_word_8[0], // 分享描述
                    link: resp.data.shareURL, // 分享链接
                    imgUrl: resp.data.share_pic_9, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                };
                // wx.hideOptionMenu();
                wx.onMenuShareTimeline(shareCFObj);
                wx.onMenuShareAppMessage(shareCFObj);
                wx.onMenuShareQQ(shareCFObj);
                wx.onMenuShareWeibo(shareCFObj);
                wx.onMenuShareQZone({
                    title: resp.data.share_title_7[Math.floor(Math.random() * 3)] || resp.data.share_title_7[0], // 分享标题
                    desc: resp.data.share_word_8[Math.floor(Math.random() * 3)] || resp.data.share_word_8[0], // 分享描述
                    link: resp.data.shareURL, // 分享链接
                    imgUrl: resp.data.share_pic_9, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        }, function (error) {
            console.log(error);
        });
    });
}]);

app.controller('resultController', ['$scope', '$http', '$rootScope', 'storageService', '$location', '$timeout', function ($scope, $http, $rootScope, storageService, $location, $timeout) {
    if (storageService.data.length == 0) {
        $location.path('home');
    }
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