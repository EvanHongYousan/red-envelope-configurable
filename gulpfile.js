/**
 * Created by yantianyu on 2016/4/8.
 */
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var sass = require('gulp-sass');

gulp.task('default', ['views', 'sass']);

gulp.task('views', function () {
    return gulp.src('app/share/views/*.html')
        .pipe(templateCache({
            module: 'templatescache',
            standalone: true
        }))
        .pipe(gulp.dest('app/share/js'));
});

gulp.task('sass', function (done) {
    gulp.src(['app/share/sass/main.scss'])
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('app/share/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch('app/share/sass/*.scss', ['sass']);
    gulp.watch('app/share/views/*.html', ['views']);
});