/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat");

var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    css: webroot + "css/**/*.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
    npmSrc: "./node_modules/",
    npmLibs : webroot + "lib/npmlibs/"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("copy-deps:systemjs", function () {
    return gulp.src(paths.npmSrc + '/systemjs/dist/**/*.*', { base: paths.npmSrc + '/systemjs/dist/' })
         .pipe(gulp.dest(paths.npmLibs + '/systemjs/'));
});

gulp.task("copy-deps:angular:common", function () {
    return gulp.src(paths.npmSrc + '/@angular/common/bundles/**/*.js', { base: paths.npmSrc + '/@angular/common/bundles/' })
         .pipe(gulp.dest(paths.npmLibs + '/angular/common/'));
});

gulp.task("copy-deps:angular:core", function () {
    return gulp.src(paths.npmSrc + '/@angular/core/bundles/**/*.js', { base: paths.npmSrc + '/@angular/core/bundles/' })
         .pipe(gulp.dest(paths.npmLibs + '/angular/core/'));
});

gulp.task("copy-deps:angular:platform-browser", function () {
    return gulp.src(paths.npmSrc + '/@angular/platform-browser/bundles/**/*.js', { base: paths.npmSrc + '/@angular/platform-browser/bundles/' })
         .pipe(gulp.dest(paths.npmLibs + '/angular/platform-browser/'));
});

gulp.task("copy-deps:angular:platform-browser-dynamic", function () {
    return gulp.src(paths.npmSrc + '/@angular/platform-browser-dynamic/bundles/**/*.js', { base: paths.npmSrc + '/@angular/platform-browser-dynamic/bundles/' })
         .pipe(gulp.dest(paths.npmLibs + '/angular/platform-browser-dynamic/'));
});

gulp.task("copy-deps:angular:http", function () {
    return gulp.src(paths.npmSrc + '/@angular/http/bundles/**/*.js', { base: paths.npmSrc + '/@angular/http/bundles/' })
         .pipe(gulp.dest(paths.npmLibs + '/angular/http/'));
});

gulp.task("copy-deps:zone", function () {
    return gulp.src(paths.npmSrc + '/zone.js/dist/**/*.js', { base: paths.npmSrc + '/zone.js/dist/' })
         .pipe(gulp.dest(paths.npmLibs + '/zone/dist/'));
});
gulp.task("copy-deps:reflect", function () {
    return gulp.src(paths.npmSrc + '/reflect-metadata/**/*.js', { base: paths.npmSrc + '/reflect-metadata/' })
         .pipe(gulp.dest(paths.npmLibs + '/reflect-metadata/'));
});

gulp.task("copy-deps:angular", ["copy-deps:angular:common", "copy-deps:angular:core", "copy-deps:angular:platform-browser", "copy-deps:angular:platform-browser-dynamic", "copy-deps:angular:http", "copy-deps:zone", "copy-deps:reflect"]);

gulp.task("copy-deps:es6-shim", function () {
    return gulp.src(paths.npmSrc + '/es6-shim/es6-sh*', { base: paths.npmSrc + '/es6-shim/' })
         .pipe(gulp.dest(paths.npmLibs + '/es6-shim/'));
});

gulp.task("copy-deps:rxjs", function () {
    return gulp.src(paths.npmSrc + '/rxjs/bundles/*.*', { base: paths.npmSrc + '/rxjs/bundles/' })
         .pipe(gulp.dest(paths.npmLibs + '/rxjs/'));
});

gulp.task("copy-deps", ["copy-deps:rxjs", 'copy-deps:angular', 'copy-deps:systemjs', 'copy-deps:es6-shim']);