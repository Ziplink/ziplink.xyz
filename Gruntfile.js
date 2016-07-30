module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    githooks: {
      all: {
        'pre-commit': 'test',
      },
    },
    jscs: {
      src: './',
      options: {
        config: '.jscsrc',
        fix: false, // Autofix code style violations when possible
        reporter: 'text',
        reporterOutput: './jscs.log',
      },
    },
  });

  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.registerTask('test', ['jscs']);

};