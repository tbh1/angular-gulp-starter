module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
		
		'pkg': grunt.file.readJSON('package.json'),

		'meta': {
			'jsFilesForTesting': [
				'bower_components/angular/angular.js',
	    		'bower_components/angular-mocks/angular-mocks.js',
	    		'bower_components/angular-ui-router/release/angular-ui-router.js',
	    		'bower_components/lodash/lodash.js',
	    		'test/**/*Spec.js'
			]
		},

		'karma': {
			'development': {
				'configFile': 'karma.conf.js',
				'options': {
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'src/**/*.js'
					]
				}
			},
			'dist': {
				'options': {
					'configFile': 'karma.conf.js',
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'dist/<%= pkg.name %>-<%= pkg.version %>.js'
					]
				}
			},
			'minified': {
				'options': {
					'configFile': 'karma.conf.js',
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
					]
				}
			}
		},

		'jshint': {
			'beforeconcat': ['src/**/*.js']
		},

		'concat': {
			'dist': {
				'src': ['src/**/*.js'],
				'dest': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},

		'uglify': {
			'options': {
				'mangle': false
			},
			'dist': {
				'files': {
					'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js']
				}
			}
		},

		'watch': {
			'scripts': {
				'files': ['**/*.js'],
				'task': 'jshint, test',
				'options': {
					'spawn': false
				}
			}
		},

		'connect': {
			'development': {
				'options': {
					'base': 'src',
					'port': 3000,
					'keepalive': true,
					'open': true
				}
			},
			'production': {
				'port': 3000,
				'base': 'dist'
			}
		}

	});

	grunt.registerTask('test', ['karma:development']);
	grunt.registerTask('build', [
		'jshint',
		'karma:development',
		'concat',
		'karma:dist',
		'uglify',
		'karma:minified'
	]);
	grunt.registerTask('serve', ['connect:development']);
	grunt.registerTask('serve-prod', ['connect:production']);
};