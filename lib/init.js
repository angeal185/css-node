const fs = require('fs'),
cwd = process.cwd(),
config = require('./config'),
cx = function(x,y){
  console.log('\x1b[92m[\x1b[94mcss-node\x1b[92m:\x1b[94m'+x[0]+'\x1b[92m] \x1b['+y+'m'+ x[1] +' \x1b[0m');
};

module.exports = function(cb){

  fs.writeFile(cwd + '/ncss.json', JSON.stringify(config, 0 , 2), function(err){
    if(err){return cx(['init', 'failed to create config file...'], 91)}
    cx(['init', 'config file created...'], 96)

    fs.mkdir(cwd + '/ncss', function(err){
      if(err){cx(['init', 'failed to create ncss dir'], 91)}
      let arr = ['helpers', 'mixins', 'globals', 'includes'];
      for (let i = 0; i < arr.length; i++) {
        fs.mkdir([cwd, 'ncss', arr[i]].join('/'), function(err){
          if(err){cx(['init', 'failed to create '+ arr[i] +' dir'], 91)}
          fs.writeFile([cwd, 'ncss' , arr[i], 'index.js'].join('/'), 'const '+ arr[i] +' = {}\n\nmodule.exports = '+ arr[i] +';', function(err){
            if(err){return cx(['init', 'failed to create '+ arr[i] +' file...'], 91)}
            cx(['init', arr[i] +' file created...'], 96);
            if(i === 3){
              fs.mkdir(cwd + '/ncss/dist', function(err){
                if(err){cx(['init', 'failed to create css dist dir'], 91)}
                cx(['init', 'css-node init complete.'], 96);
              })
            }
          })
        })
      }
    })
  })

}
