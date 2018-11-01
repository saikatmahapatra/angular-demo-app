// CI App Gruntfile
module.exports = function (grunt) { // jshint ignore:line
  'use strict'

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
	  sass : {        
        files: ['src/assets/sass/*.scss'],
        tasks: ['sass','notify:sass']
      }
    },
    // Notify end of tasks
    notify: {      
	  sass: {
        options: {
          title  : 'My App',
          message: 'Ok. SASS done'
        }
      }
    },
    
	// SASS to CSS
	sass: {
		dist: {
			options: {
				outputStyle: 'expanded',
				sourceMap: false
			},
			files: [{
				expand: true,
				cwd: 'src/assets/sass/',
				src: ['*.scss'],
				dest: 'src/assets/css/',
				ext: '.css'
			}]
		}
	}
});

  // Load all grunt tasks

  
  //SASS Compiler
  grunt.loadNpmTasks('grunt-sass');
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Notify
  grunt.loadNpmTasks('grunt-notify');
  // CSS Task
  grunt.registerTask('css', ['sass']);

  // The default task (running 'grunt' in console) is 'watch'
  grunt.registerTask('default', ['watch']);
}