module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      development: {
        files: {
          'styles/main.css': 'styles/src/main.less'
        }
      }
    },
    watch: {
      styles: {
        files: ['styles/src/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    browserSync: {
      default: {
        bsFiles: {
          src: [
            'index.html',
            'styles/*.css',
            'modules/**/*.js'
          ]
        },
        options: {
          startPath: '/router',
          server: {
            baseDir: ['./'],
            routes: {
                "/router": "./"
            }
          },
          watchTask: true
        }
      }
    },
    copy: {
      default: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/@modnes/router',
            src: ['**'],
            dest: 'modules/modnes/router/'
          },
          {
            expand: true,
            cwd: 'node_modules/semantic-ui-less/themes/default/assets',
            src: ['**'],
            dest: 'themes/default/assets/'
          }
        ]
      }
    }
  })

  grunt.loadNpmTasks('grunt-browser-sync')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['copy', 'less', 'browserSync', 'watch'])
}
