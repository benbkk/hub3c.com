import fs from 'fs'
import gutil from 'gulp-util'

let exec  = require('child_process').exec

module.exports = function buildJekyll(callback, env) {
  let cmd = 'jekyll build --config ';
  cmd += (env === 'prod' ? '_config.build.yml' : '_config.yml');

  return exec(cmd, function(error, stdout, stderror) {
    gutil.log(stdout); // Log the output to the console
    return callback(error !== null ? 'ERROR: Jekyll process exited with code: '+error.code : null);
  });
};
