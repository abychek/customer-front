var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = '';
const JS_DESTINATION = './web/app/dependencies/js/';
const CSS_DESTINATION = './web/app/dependencies/css/';

function copy(from, dest) {
    gulp.src(from)
        .pipe(gulp.dest(dest));
}

gulp.task('load-dependency', function () {
    // angular
    copy('./bower_components/angular/angular.js', JS_DESTINATION);
    copy('./bower_components/angular/angular-csp.css', CSS_DESTINATION);

    // angular-animate
    copy('./bower_components/angular-animate/angular-animate.js', JS_DESTINATION);

    // angular-bootstrap
    copy('./bower_components/angular-bootstrap/ui-bootstrap.js', JS_DESTINATION);
    copy('./bower_components/angular-bootstrap/ui-bootstrap-tpls.js', JS_DESTINATION);
    copy('./bower_components/angular-bootstrap/ui-bootstrap-csp.css', CSS_DESTINATION);

    // angular-route
    copy('./bower_components/angular-route/angular-route.js', JS_DESTINATION);

    // bootstrap
    copy('./bower_components/bootstrap/dist/css/bootstrap.css', CSS_DESTINATION);

    // jquery
    copy('./bower_components/jquery/dist/jquery.js', JS_DESTINATION);
});

gulp.task('simplify-controllers', function () {
    gulp.src(['./web/app/src/manager.js', './web/app/src/controllers/*'])
        .pipe(concat('controllers.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./web/app/src/'))
});

gulp.task('default', ['load-dependency', 'simplify-controllers']);