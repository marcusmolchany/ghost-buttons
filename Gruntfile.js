module.exports = function(grunt) {

  grunt.initConfig({
    lessDir: 'src/less/',
    cssDir: 'src/css/',
    cssDistDir: 'dist/css/',
    jsDir: 'src/js/',
    jsDistDir: 'dist/js/',
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "<%=cssDir%><%= pkg.name %>.css": "<%=lessDir%>*.less" // destination file and source file
        }
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['src/**/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['src/**/*.css']
      }
    },
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['<%=jsDir%>*.js'],
        dest: '<%=jsDistDir%><%= pkg.name %>.js'
      },
      css: {
        src: ['<%=cssDir%>*.css'],
        dest: '<%=cssDistDir%><%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    watch: {
    files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css', '<%=lessDir%>*.less'],
    tasks: ['less', 'csslint', 'cssmin', 'jshint', 'concat', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'less',
    'csslint',
    'cssmin',
    'jshint',
    'concat',
    'uglify'
  ]);
  grunt.registerTask('watchTask', ['watch']);
  grunt.registerTask('build', [
    'less',
    'csslint',
    'cssmin',
    'jshint',
    'concat',
    'uglify'
  ]);
 
};