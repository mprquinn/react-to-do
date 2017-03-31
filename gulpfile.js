var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
	gulp.watch('src/scss/*', ['sass']);
});

gulp.task('sass', function () {
	return gulp.src('src/scss/styles.scss').pipe(sass({ indentedSyntax: true, errLogToConsole: true})).pipe(sourcemaps.write('.')).pipe(gulp.dest('src/css/'));
})