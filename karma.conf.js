module.exports = function(config) {
	config.set({

		// Base path to resolve all patterns
		basePath: '',

		// Framework to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    	frameworks: ['jasmine'],

    	files: [
    		'bower_components/angular/angular.js',
    		'bower_components/angular-mocks/angular-mocks.js',
    		'bower_components/angular-ui-router/release/angular-ui-router.js',
    		'bower_components/lodash/lodash.js',
    		'test/**/*Spec.js',
    		'src/**/*.js'
    	],

    	exclude: [
    		// './source/**/Template*.js'
    	],

    	// Preprocessing
	    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	    preprocessors: {

	    },

	    // test results reporter to use
	    // possible values: 'dots', 'progress'
	    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
	    reporters: ['progress'],

	    // web server port
	    port: 9876,

	    // enable / disable colors in the output (reporters and logs)
	    colors: true,

	    // level of logging
	    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	    logLevel: config.LOG_INFO,

	    // enable / disable watching file and executing tests whenever any file changes
	    autoWatch: false,

	    // start these browsers
	    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	    browsers: ['PhantomJS'],

	    // Continuous Integration mode
	    // if true, Karma captures browsers, runs the tests and exits
	    singleRun: true

	})
}