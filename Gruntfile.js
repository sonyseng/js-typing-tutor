module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			amd: {
				options: {
					src: 'js/**/*.js',
					keepRunner: true,
					specs: 'specs/**/*.js',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile: 'js/Main.js'
					}
				}
			}
		},
		    
		bowercopy: {
			options: {
				srcPrefix: 'app/bower_components'
			},

			scripts: {
				options: {
					destPrefix: 'js/vendor'
				},
				files: {
					'requirejs/require.js': 'requirejs/require.js',
					'jquery/jquery.js': 'jquery/dist/jquery.js',
					'esprima/esprima.js': 'esprima/esprima.js',
					'escodegen/escodegen.js': 'escodegen/escodegen.browser.js',
					'foundation': 'bower-foundation/js/*'
				}
			},
			
			styles: {
				options: {
					destPrefix: 'css/vendor'
				},
				files: {
					'foundation': 'bower-foundation/css/*'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jasmine:amd']);
	grunt.registerTask('default', ['bowercopy', 'test']);
};
