const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const concatCss = require("gulp-concat-css");
const htmlbuild = require("gulp-htmlbuild");
const buildDir = "build";

// Compile sass into CSS & auto-inject
gulp.task("sass", function () {
    return gulp.src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
//Move icons styles to src
gulp.task("css", function () {
    return gulp.src([
        "node_modules/font-awesome/css/font-awesome.min.css"])
        .pipe(gulp.dest("src/css/"));
});

//Move icon font to src
gulp.task("fonts", function () {
    return gulp.src([
        "node_modules/font-awesome/fonts/fontawesome-webfont.*"])
        .pipe(gulp.dest("src/fonts/"));
});
// Move the javascript files into src
gulp.task("js", function () {
    return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.js", "node_modules/jquery/dist/jquery.js"])
        .pipe(gulp.dest("src/js"));
});

//build tasks
gulp.task("build-js", function () {
    return gulp.src(["node_modules/jquery/dist/jquery.js", "node_modules/bootstrap/dist/js/bootstrap.js", "src/js/*dropdown*"])
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest(buildDir + "/js"));
});
gulp.task("build-css", ["sass", "css"], function () {
    return gulp.src("src/css/*")
        .pipe(concatCss("all.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildDir + "/css"));
});
gulp.task("build-img", function () {
    return gulp.src([
        "src/img/*"])
        .pipe(gulp.dest(buildDir + "/img"));
});
gulp.task("build-fonts", ["fonts"], function () {
    return gulp.src([
        "src/fonts/*"])
        .pipe(gulp.dest(buildDir + "/fonts/"));
});
gulp.task("build-html", function () {
    return gulp.src(["src/index.html"])
        .pipe(htmlbuild({
            js: htmlbuild.preprocess.js(function (block) {
                block.write("js/all.js");
                block.end();
            }),
            css: htmlbuild.preprocess.css(function (block) {
                block.write("css/all.css");
                block.end();
            })
        }))
        .pipe(gulp.dest(buildDir + "/"));
});
//eof build tasks

//server&sync tasks
gulp.task("serve", ["sass", "fonts", "css","js"], function () {
    browserSync.init({
        server: "./src",
        port: 4545
    });
    gulp.watch(["src/scss/*.scss"], ["sass"]);
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/**/*.js").on("change", browserSync.reload);
});

gulp.task("default", ["serve"]);
gulp.task("build", ["build-js", "build-css", "build-img", "build-fonts", "build-html"]);