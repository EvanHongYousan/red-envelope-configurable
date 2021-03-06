/**
 * Created by yantianyu on 2016/4/8.
 */
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', ['views', 'sass', 'minifyjs','views2', 'sass2', 'minifyjs2']);

gulp.task('views', function () {
    gulp.src('app/share/views/*.html')
        .pipe(templateCache({
            module: 'templatescache',
            standalone: true
        }))
        .pipe(gulp.dest('app/share/dev-js'));
});

gulp.task('views2', function () {
    gulp.src('app/client/views/*.html')
        .pipe(templateCache({
            module: 'templatescache',
            standalone: true
        }))
        .pipe(gulp.dest('app/client/dev-js'));
});

gulp.task('sass', function (done) {
    gulp.src(['app/share/sass/main.scss'])
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('app/share/css/'))
        .on('end', done);
});

gulp.task('sass2', function (done) {
    gulp.src(['app/client/sass/main.scss'])
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('app/client/css/'))
        .on('end', done);
});

gulp.task('minifyjs', function () {
    return gulp.src([
            'app/bower_components/angular/angular.min.js',
            'app/bower_components/angular-animate/angular-animate.min.js',
            'app/bower_components/angular-route/angular-route.min.js',
            'app/share/dev-js/templates.js',
            'app/share/dev-js/base64.min.js',
            'app/share/dev-js/main.js'])
        .pipe(concat('total.js'))    //合并所有js到
        .pipe(gulp.dest('app/share/js'))    //输出js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('app/share/js'));  //输出
});

gulp.task('minifyjs2', function () {
    return gulp.src([
            'app/bower_components/angular/angular.min.js',
            'app/bower_components/angular-animate/angular-animate.min.js',
            'app/bower_components/angular-route/angular-route.min.js',
            'app/client/dev-js/templates.js',
            'app/client/dev-js/tools.js',
            'app/client/dev-js/main.js'])
        .pipe(concat('total.js'))    //合并所有js到
        .pipe(gulp.dest('app/client/js'))    //输出js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('app/client/js'));  //输出
});

gulp.task('watch', function () {
    gulp.watch('app/share/sass/*.scss', ['sass']);
    gulp.watch('app/share/views/*.html', ['views']);
    gulp.watch('app/share/dev-js/*.js', ['minifyjs']);

    gulp.watch('app/client/sass/*.scss', ['sass2']);
    gulp.watch('app/client/views/*.html', ['views2']);
    gulp.watch('app/client/dev-js/*.js', ['minifyjs2']);
});