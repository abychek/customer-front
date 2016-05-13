var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = '';
var js_destination = './web/app/dependencies/js/';
var css_destination = './web/app/dependencies/css/';

gulp.task('load-dependency', function () {
    // angular
    source = './bower_components/angular/';
    gulp.src(source + 'angular.js')
        .pipe(gulp.dest(js_destination));
    gulp.src(source + 'angular-csp.css')
        .pipe(gulp.dest(css_destination));

    // angular-animate
    source = './bower_components/angular-animate/';
    gulp.src(source + 'angular-animate.js')
        .pipe(gulp.dest(js_destination));

    // angular-bootstrap
    source = './bower_components/angular-bootstrap/';
    gulp.src(source + 'ui-bootstrap.js')
        .pipe(gulp.dest(js_destination));
    gulp.src(source + 'ui-bootstrap-tpls.js')
        .pipe(gulp.dest(js_destination));
    gulp.src(source + 'ui-bootstrap-csp.css')
        .pipe(gulp.dest(css_destination));

    // angular-route
    source = './bower_components/angular-route/';
    gulp.src(source + 'angular-route.js')
        .pipe(gulp.dest(js_destination));

    // bootstrap
    source = './bower_components/bootstrap/dist/css/';
    gulp.src(source + 'bootstrap.css')
        .pipe(gulp.dest(css_destination));

});

gulp.task('simplify-controllers', function () {
    gulp.src(['./web/app/src/manager.js', './web/app/src/controllers/*'])
        .pipe(concat('controllers.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./web/app/src/'))
});

gulp.task('default', ['load-dependency', 'simplify-controllers']);