const gulp = require("gulp");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const minify = require("gulp-minify");

gulp.task("build", function () {
  return gulp
    .src("./src/histate.js")
    .pipe(plumber())
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("compress", function () {
  return gulp
    .src("./dist/histate.js")
    .pipe(plumber())
    .pipe(
      minify({
        ext: {
          src: ".js",
          min: ".min.js",
        },
      })
    )

    .pipe(gulp.dest("./dist"));
});

gulp.task("es6", function () {
  return gulp
    .src("./src/histate.js")
    .pipe(plumber())
    .pipe(
      minify({
        ext: {
          src: ".esm.js",
          min: ".esm.min.js",
        },
      })
    )

    .pipe(gulp.dest("./dist"));
});
