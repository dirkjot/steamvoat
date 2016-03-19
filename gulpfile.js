// from https://gist.github.com/mikaelbr/8425025

var gulp = require('gulp');
//var browserify = require('gulp-browserify');
//var concat = require('gulp-concat');
//var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
//var minifyCSS = require('gulp-minify-css');
//var embedlr = require('gulp-embedlr');
var watch = require('gulp-watch');


gulp.task('scripts', function() {
    gulp.src(['src/main/resources/static/*.js', 'src/main/resources/static/js/*.js'])
        //.pipe(browserify())
        //.pipe(concat('dest.js'))
        .pipe(gulp.dest('target/classes/static'))
        .pipe(refresh(server))
});

gulp.task('styles', function() {
    gulp.src(['app/css/style.less'])
        //.pipe(less())
        //.pipe(minifyCSS())
        .pipe(gulp.dest('target/classes/static'))
        .pipe(refresh(server))
})

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('html', function() {
    gulp.src("src/main/static/*.html")
        //.pipe(embedlr())
        .pipe(gulp.dest('target/classes/static'))
        .pipe(refresh(server));
});

gulp.task('default', function() {
    gulp.run('lr-server', 'scripts', 'styles', 'html');
    gulp.run('scripts', 'html');

    gulp.watch('src/main/resources/**/*.js', function(event) {
        gulp.run('scripts');
    });

    gulp.watch('src/main/resources/**/*.css', function(event) {
        gulp.run('styles');
    });

    gulp.watch('src/main/resources/**/*.html', function(event) {
        gulp.run('html');
    })
});
