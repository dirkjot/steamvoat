// Include gulp
var gulp = require('gulp');

// Define base folders (with trailing /)
var src = 'src/main/frontend/';
var destprod = 'target/classes/static/';
var destdev = 'target/classes/static/devresources/'

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var print = require('gulp-print');
var bowerfiles = require('main-bower-files');
var addsrc = require('gulp-add-src');
var processhtml = require('gulp-processhtml')
var del = require('del');

// show managed bower files
gulp.task('showbowerfiles', function() {
    gulp.src(bowerfiles())
        .pipe(print()) ;
});

// copy all js files for dev targets
gulp.task('js-dev', function() {
    gulp.src(bowerfiles())
        .pipe(addsrc.append(src + '**/*.js'))
        .pipe(print())
        .pipe(gulp.dest(destdev + 'js/'));
});

// minify and package all js files for production targets
gulp.task('js-prod', function() {
    del(destdev);
    gulp.src(bowerfiles())
        .pipe(addsrc.append(src + '**/*.js'))
        .pipe(print())
        .pipe(concat('steamvoat.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(destprod));
});

// copy html files, dev style
// the build tag in our index.html can have an additional target tag, but
// that does not seem to work so we need create two tasks.
gulp.task('html-dev', function() {
    gulp.src(src + '/**/*.html')
        .pipe(print())
        .pipe(gulp.dest(destprod));
});

// copy html files, prod style
gulp.task('html-prod', function() {
    gulp.src(src + '/**/*.html')
        .pipe(print())
        .pipe(processhtml())
        .pipe(gulp.dest(destprod));
});

// copy css files
gulp.task('css', function() {
    gulp.src(src + '/**/*.css')
        .pipe(print())
        .pipe(gulp.dest(destprod));
});

// copy images
gulp.task('images', function() {
    gulp.src(src + '/img/*')
        .pipe(print())
        .pipe(gulp.dest(destprod + 'img/'));
});

// Watch for changes in files
gulp.task('watch', ['dev'], function() {
    // Watch .js files
    gulp.watch(src + '**/*.js', ['js-dev']);
    // Watch html files
    gulp.watch(src + '/**/*.html', ['html-dev']);
    // Watch css files
    gulp.watch(src + '/**/*.css', ['css']);
    // Watch image files
    gulp.watch(src + '/img/*', ['images']);
});


// Production Task
gulp.task('production',
    ['js-prod', 'html-prod', 'css', 'images']);

// Default Task
gulp.task('dev',
    ['js-dev', 'html-dev', 'css', 'images']);


// Default Task
gulp.task('default',
    ['dev']);