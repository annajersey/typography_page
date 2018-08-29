var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

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
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});
gulp.task('serve', ['sass', 'fonts', 'css'], function () {
    browserSync.init({
        server: "./src",
        port: 4545
    });
    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);