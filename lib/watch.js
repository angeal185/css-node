const fs = require('fs'),
cwd = process.cwd(),
build = require('./');

module.exports = function(cb){
  global.config = require(cwd+ '/ncss');
  
  let files = config.watch.files;

  for (let i = 0; i < files.length; i++) {
    fs.watchFile(cwd + files[i], {interval: config.watch.interval}, function(stat){
      console.log(
        '\x1b[92m[\x1b[94mcss-node\x1b[92m:\x1b[94mwatch\x1b[92m] \x1b[96mchange in file '+files[i]+' detected \x1b[0m'
      );
      setTimeout(function(){
        if(cb){
          cb(files[i], stat)
        } else {
          build()
        }
      },config.watch.delay)
    });
  }
}
