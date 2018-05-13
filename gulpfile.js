var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var path = {
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

gulp.task('default',['html','css','js','fonts','img']);