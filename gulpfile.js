var gulp   = require('gulp');
var gutil   = require('gulp-util');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var spawn = require('child_process').spawn;


gulp.task('lint', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs());
});

gulp.task('test', function() {
    var tests = ['test/test.frontend.js'];

    var casperChild = spawn('casperjs', ['test'].concat(tests));

    casperChild.stdout.on('data', function (data) {
        gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });

    casperChild.on('close', function (code) {
        process.exit(code);
    });
});

gulp.task('default', ['lint', 'test']);
gulp.task('travis', ['lint', 'test']);