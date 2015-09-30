module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'release/background-gallery.min.js': 'src/background-gallery.js'
                }
            }
        },
        jasmine: {
            pivotal: {
                src: 'tests/**/*.js',
                options: {
                    vendor: ['src/background-gallery.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify', 'jasmine']);

};
