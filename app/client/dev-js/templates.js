angular.module("templatescache", []).run(["$templateCache", function($templateCache) {$templateCache.put("home.html","<div class=\"home\">\r\n    <div class=\"imgContainer\">\r\n        <img src=\"\" alt=\"\" ng-src=\"{{imgSrc}}\">\r\n    </div>\r\n    <div class=\"bottomContainer\">\r\n        <p class=\"slogan\">分享给好友，赢红包</p>\r\n        <span class=\"shareBtn\" ng-style=\"{\'background-image\': \'url(\'+openBtnBgImg+\')\',\'background-size\':\'100% 100%\'}\" ng-click=\"share()\">{{shareBtnText}}</span>\r\n        <h3>活动规则</h3>\r\n        <p class=\"rules-text\" ng-repeat=\"item in rulesText track by $index\">{{item}}</p>\r\n        <p class=\"footer-text\">WWW.HJLAOSHI.COM</p>\r\n    </div>\r\n</div>");
$templateCache.put("result.html","<div class=\"result\">\r\n    <div class=\"imgContainer\">\r\n        <img src=\"\" alt=\"\" ng-src=\"{{imgSrc}}\">\r\n    </div>\r\n    <div class=\"bottomContainer\">\r\n        <p class=\"slogan\">恭喜你，获得红包</p>\r\n        <div class=\"certificate\">\r\n            <span>&nbsp;&nbsp;&nbsp;{{price}}</span>\r\n        </div>\r\n        <span class=\"downloadBtn\" ng-style=\"{\'background-image\': \'url(\'+downloadBtnImg+\')\',\'background-size\':\'100% 100%\'}\" ng-click=\"download()\">{{downloadBtnText}}</span>\r\n        <p class=\"footerText\">红包已放入手机账户 <span class=\"phoneNumber\">{{phoneNumber}}</span></p>\r\n        <p class=\"footerText\">登入呼叫老师，在个人中心-我的优惠中查看</p>\r\n    </div>\r\n</div>");}]);