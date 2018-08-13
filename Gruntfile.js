module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          update: false
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
       }
    },
    watch: {
      scripts: {
        files: ['sass/*.scss'],
        tasks: ['sass']
      }
    },
    concat: {
      target: {
        files: {
          'dist/build.min.js' : ['dist/uglify/control-navbar.js', 'dist/uglify/style-dropdown.js', 'dist/validate-form.js']
        }
      }
    },
    uglify: {
      options: {
        separator: ";"
      },
      target: {
      files: [{
        // expand: true,
        // cwd: 'js',
        src: 'assets/build.min.js',
        dest: 'dist/build.min.js'
      }]
    }
  },
  wrap: {
    modules: {
      src: 'dist/build.min.js',
      dest: 'dist/build.js',
      options: {
        wrapper: ['(function() {\n', '\n}())']
      }
    }
  }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wrap');
  grunt.registerTask('default', 'watch');
};
