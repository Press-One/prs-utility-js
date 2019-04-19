const fs = require('fs');
const browserify = require('browserify');
browserify('./lib/index.js')
  .transform('babelify', { presets: ['@babel/preset-env'] })
  .bundle()
  .pipe(fs.createWriteStream('./dist/bundle.js'));
