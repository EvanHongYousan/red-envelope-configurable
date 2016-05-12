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
        url: '../common/spread.json'
    }).then(function (resp) {
        $scope.imgSrc = resp.data.front_pic_2;
        $scope.openBtnText = resp.data.button_share_name_11;
        $scope.phoneNumber = '';
        $scope.openBtnBgImg = resp.data.button_share_pic_10;
        $scope.rulesText = resp.data.share_rule_12;

        $scope.openRedPackage = function () {
            // $location.path('result');
            var user_id = null, domainName = 'http://192.168.0.231';

            function getReqPrm(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                } else {
                    return null;
                }
            }

            try {
                user_id = getReqPrm('parameter') ? JSON.parse(decodeURIComponent(getReqPrm('parameter'))).user_id : null;
            } catch (e) {
                console.log(e);
            }
            if (user_id === null) {
                user_id = '15800031138';
            } else {
                user_id = user_id.split('@')[0];
            }

            if (/test\.|testftp\./.test(location.href)) {
                domainName = 'http://test.hjlaoshi.com';
            } else if (/\.233|\.231/.test(location.href)) {
                domainName = 'http://192.168.0.231';
            } else if (/guanli\.|ftp\./.test(location.href)) {
                domainName = 'http://guanli.hjlaoshi.com';
            }

            console.log('domainName:' + domainName + '\nuser_id:' + user_id);

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
        }
    });
}]);

app.controller('resultController', ['$scope', '$http', '$rootScope', 'storageService', function ($scope, $http, $rootScope, storageService) {
    $http({
        method: 'GET',
        url: '../common/spread.json'
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