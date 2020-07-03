const fs = require('fs'),
cwd = process.cwd();

module.exports = function(cb){

  global.config = require(cwd+ '/ncss');
  global.h = require('./helpers');

  if(config.globals){
    global.g = require(cwd + config.globals);
  }

  if(config.mixins){
    global.m = require(cwd + config.mixins);
  }

  if(config.helpers){
    global.h = Object.assign(global.h, require(cwd + config.helpers));
  }

  try {
    const config = global.config,
    includes = config.includes;

    let imports = '',
    css = {};

    for (let i = 0; i < config.imports.length; i++) {
      imports += '@import "'+ config.imports[i] +'";'
    }

    for (let i = 0; i < includes.length; i++) {
      css = Object.assign(css, require(cwd + includes[i]))
    }

    for(let i = 0, keys = Object.keys(css); i < keys.length; i++) {
      for(let x = 0, key = Object.keys(css[keys[i]]); x < key.length; x++) {
        let item = css[keys[i]][key[i]];
        if(typeof item === 'function'){
          css[keys[i]][key[x]] = item()
        }
      }
    }

    if(config.sort_order){
      css = Object.fromEntries(Object.entries(css).sort())
    }

    if(config.sort_properties){
      for(let i = 0, keys = Object.keys(css); i < keys.length; i++) {
        css[keys[i]] = Object.fromEntries(Object.entries(css[keys[i]]).sort())
      }
    }


    css = JSON.stringify(css).slice(1,-1)
    .replace(/,"/g, ';')
    .replace(/"/g, '')
    .replace(/},/g, '}')
    .replace(/:{/g, '{')
    .replace(/};/g, '}')
    .replace(/\\\\/g, '\\')
    .trim();

    imports+= css;

    if(global.config.verbose){
      console.log(imports)
    }

    if(global.config.write_file){
      fs.writeFile(cwd+config.dest, imports, function(err){
        if(err){
          if(cb){
            return cb(err)
          }
          console.error(err)
          console.log(
            '\x1b[92m[\x1b[94mcss-node\x1b[92m:\x1b[94mbuild\x1b[92m] \x1b[91mbuild failed \x1b[0m'
          );
          return err
        }
        console.log(
          '\x1b[92m[\x1b[94mcss-node\x1b[92m:\x1b[94mbuild\x1b[92m] \x1b[96mbuild success \x1b[0m'
        );
      })
    }
    if(cb){
      return cb(false, imports)
    }
    return imports
  } catch (err) {
    if(cb){return cb(err)}
    console.error(err)
    return err
  }
}
