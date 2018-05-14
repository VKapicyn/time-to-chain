const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const path = {
    src: {
        html: 'src/index.html',
        css: 'src/css/*.css',
        js: 'src/js/*.js',
        fonts:'src/fonts/roboto/*',
        img: 'src/img/*'
    },
    dist: {
        html: 'dist',
        css: 'dist',
        js: 'dist',
        fonts: 'dist/fonts/roboto',
        img: 'dist/img'
    }
};

gulp.task('html', function(){
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.html))
});

gulp.task('css', function(){
    return gulp.src(path.src.css)
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(concat('index.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.dist.css))
});

gulp.task('js', function(){
    return gulp.src(path.src.js)
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('fonts', function(){
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('img', function(){
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('serve', ['html','css','js','fonts','img'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(path.src.css, ['css']).on('change', browserSync.reload);
    gulp.watch(path.src.js, ['js']).on('change', browserSync.reload);
    gulp.watch(path.src.html, ['html']).on('change', browserSync.reload);
});

gulp.task('default',['serve']);