var pjson = require('./package.json'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    sync = require('browser-sync').create();

/* Clean */
gulp.task('clean', function() {
    return gulp.src('dist/*')
        .pipe(plugins.clean());
});

/* Lint */
gulp.task('lint', function() {
    gulp.src(['src/**/*.js'])
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
});
/* Test */

/* Build */
gulp.task('build:js', ['lint'], function() {
    return gulp.src('src/**/*.js')
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.concat('app.js', {
            newLine: '\n'
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.insert.prepend('/*'   + '\n' +
        '*  Copyright Ted Hunter 2015'      + '\n' +
        '*  Generated on ' + new Date()     + '\n' +
        '*  Version ' + pjson.version       + '\n' +
        '*  All rights reserved'            + '\n' +
        '*/\n'))
        .pipe(gulp.dest('dist'))
        .pipe(sync.reload({stream: true}));
});

gulp.task('build:js_deps', function() {
    return gulp.src([
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js'
        ]).pipe(plugins.concat('deps.js', {
            newLine: '\n'
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:css', function() {
    return gulp.src(['assets/**/*.css', 'src/**/*.css'])
        .pipe(plugins.concatCss('app.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:css_deps', function() {
    return gulp.src([
            'bower_components/pure/pure-min.css',
            'bower_components/pure/grids-responsive-min.css'
        ])
        .pipe(plugins.concatCss('deps.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('dist'));
});

gulp.task('build:html', function() {
    return gulp.src('src/**/*.html')
        .pipe(plugins.htmlReplace({
            js: 'app.js',
            libs: 'deps.js',
            css: 'app.css',
            csslibs: 'deps.css'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', [
    'lint',
    'build:js',
    'build:js_deps',
    'build:css',
    'build:css_deps',
    'build:html'
]);

/* Testing */
var Server = require('karma').Server;

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/* Development */
gulp.task('nodemon:dev', ['lint'], function() {
    plugins.nodemon({
        verbose: true,
        script: 'index.js',
        ext: 'js html css',
        ignore: ['dist/*'],
        env: {
          'NODE_ENV': 'development',
          'PORT': 3030
        },
        tasks: ['lint']
    })
});

gulp.task('nodemon:prod', ['build'], function() {
    plugins.nodemon({
        verbose: true,
        script: 'index.js',
        ext: 'js html css',
        ignore: ['dist/*'],
        env: {
          'NODE_ENV': 'production',
          'PORT': 3030
        },
        tasks: ['lint', 'build'],
    });
});

gulp.task('serve:dev', ['nodemon:dev'], function () {
  sync.init({
    proxy: 'localhost:3030'
  });
  gulp.watch('./src/*.html', ['build:html'], sync.reload);
  gulp.watch('./assets/css/**/*.css', sync.reload);
  gulp.watch('./src/**/*.js', ['lint'], sync.reload);
});

gulp.task('serve:prod', ['nodemon:prod'], function () {
  sync.init({
    proxy: 'localhost:3030'
  });
  gulp.watch('./src/**/*.html', ['build:html'], sync.reload);
  gulp.watch('./assets/css/**/*.css', ['build:css'], sync.reload);
  gulp.watch('./src/**/*.js', ['lint', 'build:js']);
});

gulp.task('default', ['serve:dev']);
