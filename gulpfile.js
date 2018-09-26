var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
// Compile sass into CSS & auto-inject
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
//Move icons styles to src
gulp.task('css', function () {
    return gulp.src([
        'node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(gulp.dest('src/css/'));
});

//Move icon font to src
gulp.task('fonts', function () {
    return gulp.src([
        'node_modules/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest('src/fonts/'));
});
// Move the javascript files into src
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(uglify())
        .pipe(gulp.dest("src/js"));
});

//build tasks
gulp.task('build-js', function () {
    return gulp.src(['src/js/*jquery*','src/js/*'])
       .pipe(concat('all.js'))
        .pipe(uglify())

        .pipe(gulp.dest("public/js"));
});
gulp.task('build-css', function () {
    return gulp.src('src/css/*.css')
        .pipe(concatCss("all.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("public/css"));
});
gulp.task('build-img', function () {
    return gulp.src([
        'src/img/*'])
        .pipe(gulp.dest('public/img'));
});
gulp.task('build-fonts', function () {
    return gulp.src([
        'src/fonts/*'])
        .pipe(gulp.dest('public/fonts/'));
});
//eof build tasks

//server&sync tasks
gulp.task('serve', ['sass', 'fonts', 'css'], function () {
    browserSync.init({
        server: "./src",
        port: 4545
    });
    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['js', 'serve']);
gulp.task('build', ['build-js','build-css','build-img','build-fonts']);