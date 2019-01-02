var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var fs = require('fs');
var path = require('path');
var url = require('url');
var data = require('./data.json');
gulp.task('scss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
});
gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./newjs'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('scss'));
})
gulp.task('webserver', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 3000,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                var extname = path.extname(pathname);
                if (extname) {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                } else {
                    if (pathname === '/list') {
                        console.log(req.query);
                        res.end();
                    }
                }

            }
        }))
});
gulp.task('default', gulp.series('scss', 'webserver', 'watch'));
gulp.task('build', function() {
    return gulp.src('./src/css/*.css', './src/js/*.js')
        .pipe(gulp.dest('./dist'))
})