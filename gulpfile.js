
var gulp = require("gulp"),
	browserSync = require('browser-sync'),
	// babel = require("gulp-babel"),
	uglify = require("gulp-uglify"),
	// jshint = require('gulp-jshint'),
	stripDebug = require('gulp-strip-debug'),
	minify = require('gulp-minify-css'),
	less = require('gulp-less'),
	// concat = require('gulp-concat');
	// plumber = require("gulp-plumber"),
	htmlmini = require('gulp-minify-html'),
	runSequence = require('run-sequence');
// var gulp = require("gulp");
// var $ = require('gulp-load-plugins')();


// gulp-babel
// gulp.task("es6", function () {
//   return gulp.src("src/js/*.js")
//     .pipe($.babel())
//     .pipe(gulp.dest("./dist/babel"));
// });

// gulp.task('minijs', function () {
//     gulp.src('src/js/*.js') // 要压缩的js文件
//     .pipe($.stripDebug()) //去除debug信息
//     .pipe($.uglify())  //使用uglify进行压缩,更多配置请参考：
//     .pipe(gulp.dest('./dist/js')); //压缩后的路径
// });

gulp.task('less', function() {
  	return gulp.src('src/less/*.less')
    	.pipe(less())
    	.pipe(gulp.dest('src/css'));
});

gulp.task('cssmini', function () {
    return gulp.src(['src/css/*.css', '!css/*.min.css'])
        .pipe(minify())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('htmlmini', function () {
    return gulp.src('src/html/*.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('dist/html/'));
})

gulp.task('es6', function() {
    return gulp.src("src/js/*.js")
        // .pipe(plumber())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        .pipe(stripDebug()) //去除debug信息
        .pipe(uglify())
        // .pipe(concat('build.js'))
        .pipe(gulp.dest("dist/js"));
});

//监听文件修改
// gulp.task('watch', ['htmlmini','cssmini','es6'], function() {
// 	gulp.watch(['src/html/*.html'], ['htmlmini']);
// 	gulp.watch(['src/css/*.css'], ['cssmini']);
//     gulp.watch(['src/js/*.js'], ['es6']); 
// });

//browserSync
gulp.task("browserSync",function(){
	browserSync({
        server: {
            //指定服务器启动根目录
            baseDir: "./"
        }
    });
    gulp.watch(['src/html/*.html'], ['htmlmini']);
    gulp.watch(['src/less/*.less'], ['less']);
	gulp.watch(['src/css/*.css'], ['cssmini']);
    gulp.watch(['src/js/*.js'], ['es6']); 
    //监听任何文件变化，实时刷新页面
    gulp.watch("./*.*").on('change', browserSync.reload);
    gulp.watch("./src/**/*.*").on('change', browserSync.reload);
});

// gulp.task('build',function(cb){
//     runSequence('watch','browserSync',cb);
// });