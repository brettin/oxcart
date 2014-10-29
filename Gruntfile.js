module.exports = function(grunt) {

    var files = ['app/app.js',
                 'config.js',
                 'app/services/appUI.js',
                 'app/services/uiTools.js',
                 'app/controllers.js',
                 'app/directives.js']

  // Project config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: { 
            copyindex: {
                src: 'dev.html', 
                dest: 'index.html'
            }
        },        
        useminPrepare: {
            html: 'dev.html',
            options: {
                dest: './'
            }
        },
        usemin: {
            html: ['index.html'],
            options: {
                assetsDirs: ['build']
            }
        },
        watch: {
          files: ['app/css/*', 'app/js/*'],
          tasks: ['uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');  
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('build', ['copy:copyindex',
                                 'useminPrepare',
                                 'concat',
                                 'uglify:generated',                            
                                 'usemin']);

    grunt.registerTask('default', ['ngAnnotate','uglify']);

};