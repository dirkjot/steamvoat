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
var rev = require('gulp-rev');
var revreplace = require('gulp-rev-replace');

// show managed bower files
gulp.task('showbowerfiles', function() {
    gulp.src(bowerfiles())
        .pipe(print()) ;
});

// restart with a clean slate
gulp.task("clean", function() {
    del(destdev);
    del(destprod);
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
    gulp.src(bowerfiles())
        .pipe(addsrc.append(src + '**/*.js'))
        .pipe(print())
        .pipe(concat('steamvoat.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(destprod))
        .pipe(rev.manifest())  // only work on the rev manifest from here
        .pipe(gulp.dest(destprod));
});

// copy css files for dev targets
gulp.task('css-dev', function() {
    gulp.src(src + '/**/*.css')
        .pipe(print())
        .pipe(gulp.dest(destprod));
});


// TODO DPJ does not work , see https://github.com/sindresorhus/gulp-rev/issues/83
// copy and package all css files for production targets
gulp.task('css-prod', function() {
    gulp.src(src + '/**/*.css')
        .pipe(print())
        .pipe(concat('steamvoat.css'))
        //.pipe(rev())
        .pipe(gulp.dest(destprod))
        //.pipe(rev.manifest({base: "target/classes/static/",  path: "rev-manifest.json", merge:true }))
        //                    //merge: false })) // only rev manifest from here, add to existing manifest
        .pipe(print())
        .pipe(gulp.dest("target/classes/static/"));
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
gulp.task('html-prod', ['js-prod', 'css-prod'], function() {
    var manifest = gulp.src(destprod + "rev-manifest.json");
    gulp.src(src + '/**/*.html')
        .pipe(print())
        .pipe(processhtml())
        .pipe(revreplace({manifest: manifest}))
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
    gulp.watch(src + '/**/*.css', ['css-dev']);
    // Watch image files
    gulp.watch(src + '/img/*', ['images']);
});


// Production Task
gulp.task('production',
    ['clean', 'js-prod', 'css-prod', 'images', 'html-prod']);

// Default Task
gulp.task('dev',
    ['js-dev', 'css-dev', 'images', 'html-dev']);


// Default Task
gulp.task('default',
    ['dev']);