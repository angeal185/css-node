const path = require('path');

const helpers = {
  hex2rgb(hb) {
    let rb = 0, gb = 0, bb = 0;

    if (hb.length == 4) {
      rb = "0x" + hb[1] + hb[1];
      gb = "0x" + hb[2] + hb[2];
      bb = "0x" + hb[3] + hb[3];
    } else if (hb.length == 7) {
      rb = "0x" + hb[1] + hb[2];
      gb = "0x" + hb[3] + hb[4];
      bb = "0x" + hb[5] + hb[6];
    }

    return "rgb("+ rb + "," + gb + "," + bb + ")";
  },
  hex2rgba(hx) {
    let rx = 0, gx = 0, bx = 0, ax = 1;

    if (hx.length === 5) {
      rx = "0x" + hx[1] + hx[1];
      gx = "0x" + hx[2] + hx[2];
      bx = "0x" + hx[3] + hx[3];
      ax = "0x" + hx[4] + hx[4];

    } else if (hx.length === 9) {
      rx = "0x" + hx[1] + hx[2];
      gx = "0x" + hx[3] + hx[4];
      bx = "0x" + hx[5] + hx[6];
      ax = "0x" + hx[7] + hx[8];
    }
    ax = +(ax / 255).toFixed(3);

    return "rgba(" + rx + "," + gx + "," + bx + "," + ax + ")";
  },
  rgb2hex(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let rh = (+rgb[0]).toString(16),
    gh = (+rgb[1]).toString(16),
    bh = (+rgb[2]).toString(16);

    if (rh.length === 1){
      rh = "0" + rh;
    }
    if (gh.length === 1){
      gh = "0" + gh;
    }
    if (bh.length === 1){
      bh = "0" + bh;
    }
    return "#" + rh + gh + bh;
  },
  rgba2hex(rgba) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(5).split(")")[0].split(sep);

    if (rgba.indexOf("/") > -1){
      rgba.splice(3,1);
    }

    for (let x in rgba) {
      let r = rgba[x];
      if (r.indexOf("%") > -1) {
        let p = r.substr(0,r.length - 1) / 100;
        if (x < 3) {
          rgba[x] = Math.round(p * 255);
        } else {
          rgba[x] = p;
        }
      }
    }

    let rx = (+rgba[0]).toString(16),
    gx = (+rgba[1]).toString(16),
    bx = (+rgba[2]).toString(16),
    ax = Math.round(+rgba[3] * 255).toString(16);

    if (rx.length === 1){
      rx = "0" + rx;
    }

    if (gx.length === 1){
      gx = "0" + gx;
    }

    if (bx.length === 1){
      bx = "0" + bx;
    }

    if (ax.length === 1){
      ax = "0" + ax;
    }

    return "#" + rx + gx + bx + ax;
  },
  add(x,y,z){
    let r = (x+y).toString();
    if(z){r+= z}
    return r;
  },
  sub(x,y,z){
    let r = (x-y).toString();
    if(z){r+= z}
    return r;
  },
  mul(x,y,z){
    let r = (x*y).toString();
    if(z){r+= z}
    return r;
  },
  div(x,y,z){
    let r = (x/y).toString();
    if(z){r+= z}
    return r;
  },
  calc(x,z){
    let r = Function('"use strict";return (' + x + ')')();
    if(z){r+= z}
    return r;
  },
  floor(x,z){
    let r = Math.floor(x).toString();
    if(z){r+= z}
    return r;
  },
  round(x,z){
    let r = Math.round(x).toString();
    if(z){r+= z}
    return r;
  },
  ceil(x,z){
    let r = Math.ceil(x).toString()
    if(z){r+= z}
    return r;
  },
  abs(x,z){
    let r = Math.abs(x).toString()
    if(z){r+= z}
    return r;
  },
  percent(i,e){
    return ((i/e) * 100).toString()+ "%"
  },
  inRange(num, init, final){
    if(final === undefined){
      final = init;
      init = 0;
    }
    return (num >= Math.min(init, final) && num < Math.max(init, final));
  },
  is: {
    gt(x,y){
      return x > y;
    },
    gte(x,y){
      return x >= y;
    },
    lt(x,y){
      return x < y;
    },
    lte(x,y){
      return x <= y;
    },
    eq(x,y){
      return x === y;
    },
    string(str){
      if (str && typeof str.valueOf() === "string") {
        return true
      }
      return false
    },
    number(x){
      if (typeof x === "number") {
        return true
      }
      return false
    },
    odd(n) {
       return Math.abs(n % 2) == 1;
    },
    even(n) {
       return n % 2 == 0;
    }
  },
  vendor(obj, key, val, arr){
    obj[key] = val;
    for (let i = 0; i < arr.length; i++) {
      obj["-"+ arr[i] +"-" + key] = val;
    }
  },
  path: {
    base(x,y){
      return helpers.quote(path.basename(x,y));
    },
    ext(x){
      return helpers.quote(path.extname(x));
    },
    dir(x){
      return helpers.quote(path.dirname(x));
    },
    join(){
      return helpers.quote(path.join(...arguments));
    },
    norm(x){
      return helpers.quote(path.normalize(x));
    }
  },
  quote(x){
    return "'" + x + "'";
  },
  unquote(x){
    return x.replace(/'/g, "")
  },
  lower(x){
    return x.toLowerCase()
  },
  upper(x){
    return x.toUpperCase()
  },
  upperFirst(str){
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
  },
  lowerFirst(str){
    return str ? str.charAt(0).toLowerCase() + str.slice(1) : ''
  },
  pre(i, e){
    return e+= i;
  },
  suf(i, e){
    return i+= e;
  },
  starts(str, char, idx){
    return str.startsWith(char, idx)
  },
  snake(str){
    return str.replace(/ /g, '_')
  },
  unsnake(str){
    return str.replace(/_/g, ' ')
  },
  camel(str) {
    return str
    .replace(/\s(.)/g, function(a) {
        return a.toUpperCase();
    })
    .replace(/\s/g, '')
    .replace(/^(.)/, function(b) {
        return b.toLowerCase();
    });
  },
  uncamel(str){
    return str.replace(/^[a-z]|[A-Z]/g, function(v, i) {
      v = v.toLowerCase()
      return i === 0 ? v : " " + v;
    });
  },
  kebab(str){
    return str.replace(/ /g, '-').toLowerCase()
  },
  unkebab(str){
    return str.replace(/-/g, ' ');
  },
  enc: {
    base64(str){
      return Buffer.from(str, 'utf8').toString('base64')
    },
    hex(str){
      return Buffer.from(str, 'utf8').toString('hex')
    },
    URI(str){
      return encodeURI(str);
    },
    URIC(str){
      return encodeURIComponent(str);
    }
  },
  js: JSON.stringify,
  jp: JSON.parse,
  keys: Object.keys,
  vals: Object.values,
  assign: Object.assign,
  entries: Object.entries
}

module.exports = helpers;
