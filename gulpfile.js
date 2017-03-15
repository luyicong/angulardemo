var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');
//定义目录
var app = {
    srcPath:'src/',
    devPath:'build/',
    prdPath:'dist/'
};
//复制bower安装的js库
gulp.task('lib',function(){
    gulp.src('bower_components/**/*.js')
    .pipe(gulp.dest(app.devPath + 'vender'))
    .pipe(gulp.dest(app.prdPath + 'vender'))
    .pipe($.connect.reload());
});

//复制html文件到开发目录和生产目录
gulp.task('html',function(){
    gulp.src(app.srcPath + '**/*.html')
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath))
    .pipe($.connect.reload());
});

//json数据
gulp.task('json',function(){
    gulp.src(app.srcPath + 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'))
    .pipe($.connect.reload());
});
//less文件编译
gulp.task('less',function(){
    gulp.src(app.srcPath + 'style/index.less')
    .pipe($.less())  //编译less
    .pipe(gulp.dest(app.devPath + 'css'))
    .pipe($.cssmin())    //压缩css
    .pipe(gulp.dest(app.prdPath + 'css'))
    .pipe($.connect.reload());
});
//js文件合并压缩
gulp.task('js',function(){
    gulp.src(app.srcPath + 'script/**/*.js')
    .pipe($.concat('index.js'))  //合并所有js文件为index.js
    .pipe(gulp.dest(app.devPath + 'js'))
    .pipe($.uglify())  //压缩js
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload());
});
//图片压缩
gulp.task('image',function(){
    gulp.src(app.srcPath + 'image/**/*')
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())  //图片压缩
    .pipe(gulp.dest(app.prdPath + 'image'))
    .pipe($.connect.reload());
});

//每次执行之前清除原来旧的资源
gulp.task('clean',function(){
    gulp.src([app.devPath,app.prdPath])
    .pipe($.clean());
});

//生产环境执行任务
gulp.task('build',['image','js','less','lib','html','json']);

gulp.task('server',['build'],function(){
    $.connect.server({
        root : [app.devPath],
        livereload : true,
        port : 1234
    });
    open('http://localhost:1234');

    gulp.watch('bower_components/**/*',['lib']);
    gulp.watch(app.srcPath + '**/*.html',['html']);
    gulp.watch(app.srcPath + 'data/**/*.json',['json']);
    gulp.watch(app.srcPath + 'style/**/*.less',['less']);
    gulp.watch(app.srcPath + 'script/**/*.js',['js']);
    gulp.watch(app.srcPath + 'image/**/*',['image']);
});

gulp.task('default',['server']);



