// Include gulp
var gulp = require('gulp');

// Define base folders (with trailing /)
var src = 'src/main/frontend/';
var destprod = 'target/classes/static/';
var destdev = 'target/classes/static/devresources/';

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var print = require('gulp-print');
var bowerfiles = require('main-bower-files');
var addsrc = require('gulp-add-src');
var processhtml = require('gulp-processhtml');
var del = require('del');
var rev = require('gulp-rev');
var revreplace = require('gulp-rev-replace');
var sass = require('gulp-sass');

// show managed bower files
gulp.task('showbowerfiles', function() {
    gulp.src(bowerfiles())
        .pipe(print()) ;
});

// restart with a clean slate
gulp.task("clean", function(done) {
    del(destdev);
    del(destprod);
    done();
});

// copy css files for dev targets
gulp.task('css-copy', function() {
    gulp.src(src + '**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(destprod))
        .pipe(print());
});


gulp.task('html-copy', function() {
    gulp.src(src + '**/*.html')
        .pipe(gulp.dest(destprod))
        .pipe(print());
});

// copy images
gulp.task('images-copy', function() {
    gulp.src(src + 'images/*')
        .pipe(gulp.dest(destprod + 'images/'))
        .pipe(print());
});


// copy all js files for dev targets
gulp.task('js-dev', function() {
    gulp.src(bowerfiles())
        .pipe(addsrc.append(src + '**/*.js'))
        .pipe(gulp.dest(destdev))
        .pipe(print());
});

// concat, uglify, rename to min , and copy
gulp.task('js-prod', function() {

    gulp.src(bowerfiles())
        .pipe(addsrc.append(src + 'steamvote.js'))
        .pipe(concat('steamvote.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destprod))
        .pipe(print());

    gulp.src(bowerfiles())
        .pipe(addsrc.append(src + 'teacher/*.js'))
        .pipe(concat('teacher.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destprod + 'teacher/'))
        .pipe(print());
});


gulp.task('html-combinejs', function (done) {
    gulp.src(src + '**/*html')
        .pipe(print())
        .pipe(processhtml())
        .pipe(gulp.dest(destprod))
        .pipe(print())
        .on('end', done);
});


// Watch for changes in files
gulp.task('watch', ['dev'], function() {
    // Watch .js files
    gulp.watch(src + '**/*.js', ['js-dev']);
    // Watch html files
    gulp.watch(src + '**/*.html', ['html-copy']);
    // Watch css files
    gulp.watch(src + '**/*.scss', ['css-copy']);
    // Watch image files
    gulp.watch(src + 'images/*', ['images-copy']);
});




// Production task
gulp.task('production', ['html-combinejs', 'css-copy', 'js-prod', 'images-copy' ]);

// Dev Task
gulp.task('dev', ['js-dev', 'css-copy', 'images-copy', 'html-copy']);


// Default Task
gulp.task('default', ['dev']);