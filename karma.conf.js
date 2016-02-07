module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'browserify',
      'mocha',
      'chai',
      'sinon',
    ],
    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/*-spec.js',
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*-spec.js': ['browserify'],
    },
    // list of files to exclude
    exclude: [
    ],

    browserify: {
      debug: true,
      extensions: ['.js'],
      paths: ['./node_modules', './src/scripts/'],
      transform: [
        ['babelify', {
          plugins: ['babel-plugin-espower'],
          sourceMap: 'inline',
        }],
        ['browserify-istanbul', {
          instrumenterConfig: {
            embedSource: true,
          },
        }],
      ],
      configure: function (bundle) {
        bundle.exclude('react/lib/ReactContext');
        bundle.exclude('react/lib/ExecutionEnvironment');
        bundle.exclude('jsdom');
      },
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'mocha',
      'coverage',
    ],

    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,

    // TODO: seems like sourcemaps is broken https://github.com/karma-runner/karma-coverage/issues/157
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.' },
      ],
    },
  });
};
