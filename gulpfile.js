/// <binding BeforeBuild='BuildJs, BuildCss' ProjectOpened='Watch' />
"use strict";
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    replace = require('gulp-replace'),
    cmq = require('gulp-combine-media-queries'),
    bulkSass = require('gulp-sass-bulk-import'),
	htmlmin = require('gulp-html-minifier'),
    del = require('del');

/*Helper classes*/
var getStamp = function () {
    var myDate = new Date();

    var myYear = myDate.getFullYear().toString();
    var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
    var myDay = ('0' + myDate.getDate()).slice(-2);
    var mySeconds = myDate.getSeconds().toString();

    var myFullDate = myYear + myMonth + myDay + mySeconds;

    return myFullDate;
};
var currentStamp = getStamp();
var SRC_DIR = "./src";
var DIST_DIR = "./dist";


var AUTOPREFIXER_BROWSERS = [
  'last 3 versions',
  'ie >= 8',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
/* CSS */


gulp.task('_CompileSass', function () {
    //gulp.src('./sass/site.scss')
    //    .pipe(bulkSass())
    //    .pipe(sass().on('error', sass.logError))
    //    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    //    .pipe(cmq())
    //    .pipe(cssnano())
    //    .pipe(rename('site.' + currentStamp + '.css'))
    //    .pipe(gulp.dest(ROOT_DIR+'/css/dist/'));
    //var bowerSass = mainBowerFiles('**/*.scss');
    //var bowerCss = mainBowerFiles('**/*.css');

    //gulp.src(bowerSass)
      //  .pipe(gulp.dest('./sass/lib/'));

    //gulp.src(bowerCss)
      //  .pipe(rename({
        //    extname: ".scss"
        //}))
        //.pipe(gulp.dest(DIST_DIR+'/sass/lib/'));

    gulp.src(SRC_DIR+'/sass/main.scss')
        .pipe(bulkSass())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(cmq())
        .pipe(cssnano())
		.pipe(rename('emir.css'))
        .pipe(gulp.dest(DIST_DIR + '/css/'));
    
});

gulp.task('BuildCss', ['_cleancss', '_CompileSass'], function () {
    //gulp.src('./html/_BaseCss.cshtml')
    //    .pipe(replace("[!VERSION!]", currentStamp))
    //	.pipe(replace("[!ROOT_PATH!]", '../'+ROOT_DIR))
    //    .pipe(inlinesource())        
    //    .pipe(gulp.dest(ROOT_DIR+'/views/partials/base/'));

});

/* JAVASCRIPT */
gulp.task('_CompileJs', function (cb) {

    //return gulp.src(['./js/featuredetect.js', './js/jquery.js', './js/jquery.matchHeight.js', './js/main.js'])
        //.pipe(uglify())
        //.pipe(concat('emc.js'))
        //.pipe(gulp.dest(ROOT_DIR+'/scripts/dist/'));

});

gulp.task('BuildJs', ['_cleanscripts', '_CompileJs'], function () {
    //return gulp.src('./html/_BaseJs.cshtml')
    //    .pipe(replace("[!VERSION!]", currentStamp))
    //	.pipe(replace("[!ROOT_PATH!]", '../'+ROOT_DIR))
    //    .pipe(inlinesource())
    //    .pipe(gulp.dest(ROOT_DIR+'/views/partials/base/'));
});

gulp.task('minify-html', function() {
  gulp.src(SRC_DIR+'/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(DIST_DIR))
});


/* SYSTEM IO */
gulp.task('_cleanscripts', function (cb) {
    //del([ROOT_DIR + '/scripts/dist/*'], { force: true }, cb);
});
gulp.task('_cleancss', function (cb) {
    //del([ROOT_DIR + '/css/dist/*.css'], { force: true }, cb);
});

/* EVENTS */
//gulp.task('BeforeBuild', ['cleanscripts', 'cleancss'], function () {
//    gulp.start('LessCompile', 'BuildJS');
//});

gulp.task('default',['BuildCss', 'BuildJs','minify-html','Watch'], function () {
	
});
gulp.task('Watch', function () {
    gulp.watch(SRC_DIR+'/sass/**/*.scss', ['BuildCss']);
    gulp.watch(SRC_DIR+'/js/**/*.js', ['BuildJs']);
	gulp.watch(SRC_DIR+'/*.html', ['minify-html']);
});

