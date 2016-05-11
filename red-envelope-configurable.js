/**
 * Created by yantianyu on 2016/5/6 0006.
 */

var express = require('express');
var logger = require('morgan');

var app = express();

var port = process.env.PORT || 3010;

app.use(logger('dev'));
app.use(express.static(__dirname + '/app'));

app.all('/*', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname + '/app'
    });
});
app.listen(port, function () {
    console.log('http://localhost:' + port);
    console.log('app is listening at port ' + port);
});