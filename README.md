# css-node
a fast nodejs css pre-processor that lets you use javascript to create css

![cd-img] ![dep-img] ![sz-img]

[![NPM Version][npm-img]][npm-url] ![lic-img]

# Documentation

- [About](#about)
- [Installation](#installation)
- [Setup](#setup)
- [Starters](#starters)
- [Rules](#rules)
- [Config](#config)
- [Imports](#imports)
- [Includes](#includes)
- [Globals](#globals)
- [Mixins](#mixins)
- [Helpers](#helpers)
- [css-node helpers](#css-node-helpers)

# About

css-node is a zero dependency highly extendable object oriented css pre-processor that uses
valid javascript to construct css.

The goal of css-node is to create a nodejs based css pre-processor that is only limited
by the capabilities of the nodejs javascript implementation and not confined to the limitations
of it's own api.

[Index](#documentation)

# Installation

npm

```bash
$ npm install css-node
```

git

```bash
$ git clone https://github.com/angeal185/css-node.git
```

[Index](#documentation)

# Setup

#### nodejs setup API

```js

const { init } = require('css-node')

// build initial project setup ~ should only be called once
init()


```

```js

const { build, watch } = require('css-node')

// watch files listed at config.watch.files
watch(function(file, stats){
  console.log(file); // log change detected file path
  console.log(stats); // log file stats

  // watch files listed at config.watch.files
  build(function(err, css){
    if(err){return console.log(err)}
    console.log(css) // compiled css
  })

})

```

#### command line only
commands valid within css-node dir

init app
```bash
$ npm run init
```

build css
```bash
$ npm run build
```

watch files and build on change
```bash
$ npm run watch
```
[Index](#documentation)

# Starters

css-node starters are css files that have been converted to js for use
in includes.

the starters could also be used as a basic reference for code format

css-node currently has starter include files for the following frameworks:

* [bootstrap v4.5.0](https://github.com/angeal185/css-node-frameworks/bootstrap)
* [skeleton](https://github.com/angeal185/css-node-frameworks/skeleton)
* [spectre](https://github.com/angeal185/css-node-frameworks/spectre)
* [UIkit](https://github.com/angeal185/css-node-frameworks/UIkit)
* [mini](https://github.com/angeal185/css-node-frameworks/mini)
* [bulma](https://github.com/angeal185/css-node-frameworks/bulma)
* [milligram v1.4.1](https://github.com/angeal185/css-node-frameworks/milligram)
* [pure v2.0.3](https://github.com/angeal185/css-node-frameworks/pure)
* [picnic v6.5.0](https://github.com/angeal185/css-node-frameworks/picnic)


[Index](#documentation)

# Rules

* single quotes should only ever be used within double quoted strings

[Index](#documentation)

# Config

* the config file should be named `ncss` and be within your working dir
* the config file can be in the format of either `.js` or `.json`
* config values are constant throughout the execution of css-node

json example:
```js
// ./ncss.json
{
  "dest": "/ncss/dist/app.min.css", //
  "globals": "/ncss/globals", // false || globals require path relative to cwd
  "mixins": "/ncss/mixins", // false || mixins require path relative to cwd
  "helpers": "/ncss/helpers", // false || helpers require path relative to cwd
  "sort_order": false, // sort css entries
  "sort_properties": false, // sort css entries properties
  "write_file": false, // callback css only if false
  "verbose": false, // print result to console
  "imports": [ // imports prepended to css file and in order of output
    "imported.css"
  ],
  "includes": [ // css imports path relative to cwd and in order of output
    "/ncss/includes/index.js"
  ],
  "watch": {
    "delay": 0, // watch delay response in ms
    "interval": 5007, // watch interval
    "files": [ // files to watch
      "/ncss/includes/index.js"
    ]
  }
}
```

js example:
```js
// ./ncss.js
const config = {
  "dest": "/ncss/dist/app.min.css", // build file
  "globals": "/ncss/globals", // false || globals require path relative to cwd
  "mixins": "/ncss/mixins", // false || mixins require path relative to cwd
  "helpers": "/ncss/helpers", // false || helpers require path relative to cwd
  "sort_order": false, // sort css entries
  "sort_properties": false, // sort css entries properties
  "write_file": false, // callback css only if false
  "verbose": false, // print result to console
  "imports": [ // imports prepended to css file and in order of output
    "imported.css"
  ],
  "includes": [ // css imports path relative to cwd and in order of output
    "/ncss/includes/index.js"
  ],
  "watch": {
    "delay": 0, // watch delay response in ms
    "interval": 5007, // watch interval
    "files": [ // files to watch
      "/ncss/includes/index.js"
    ]
  }
}

module.exports = config

```
[Index](#documentation)

# Imports

* imports inclided in your config file at `config.imports` will automatically
  be included in your final build.

```css
/* imports:["example.css","example2.css"] */

@import "example.css";@import "example2.css";

```

[Index](#documentation)

# Includes

within your includes is where your css is constructed.
There is no limitation to what you can or cannot do using javascript to build
your css, so long as the object exported, once executed, can be stringified into valid json.

* includes files have global access to globals, helpers and mixins
* you can require and use external modules from within any includes file

for example

```js
// include ~ "/ncss/includes/index.js"

let css = {
  body: {
    background: function(){
      return "black"
    },
    color: "#fff",
    "line-height": 0
  }
}

let arr = [];
for (let i = 1; i < 13; i++) {
  arr.push(".col-"+ i);
  css[".col-"+ i] = {
    "width": ((i/12) * 100).toString().slice(0,7) + "%"
  }
}

css[arr.toString()] = {
  "-ms-flex": "none",
  flex: "none"
}

module.exports = css;

```

will produce

```css

body {
  background: black;
  color: #fff;
  line-height: 0
}

.col-1 {
  width: 8.33333%
}

.col-2 {
  width: 16.6666%
}

.col-3 {
  width: 25%
}

.col-4 {
  width: 33.3333%
}

.col-5 {
  width: 41.6666%
}

.col-6 {
  width: 50%
}

.col-7 {
  width: 58.3333%
}

.col-8 {
  width: 66.6666%
}

.col-9 {
  width: 75%
}

.col-10 {
  width: 83.3333%
}

.col-11 {
  width: 91.6666%
}

.col-12 {
  width: 100%
}

.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
  -ms-flex: none;
  flex: none
}

```

[Index](#documentation)

# Globals
the globals object is where you keep an object congaing variables that are available
globally throughout css-node

* the g character is reserved for calling globals
* includes files, helpers and mixins have access to globals
* the globals file can be in the format of either `.js` or `.json`
* the globals file path can be edited at `config.globals`
* you can require and use external modules from within your globals file

```js
// /ncss/globals/index.js

module.exports = {
  primary: "#333",
  font_family: "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  extend: require('some/extra/globals')
}
```

```js
// include ~ /ncss/includes/index.js

let css = {
  "body": {
    "color": "#3b4351",
    "background": g.primary,
    "font-family": g.font_family,
  }
}

module.exports = css;
```

will produce

```css

body {
  color: #3b4351;
  background: #333;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif
}
```

[Index](#documentation)

# Mixins

* the m character is reserved for calling mixins
* mixins can be called from within includes files
* mixins can called from within mixins
* mixins have access to helpers and globals (h,g)
* the mixins file path can be edited at `config.mixins`
* set `config.mixins` to false to disable a mixins file
* set `config.mixins` to a require `/file/path` relative to your cwd to enable your mixins
* you can require and use external modules from within your mixins file
* you can require and use other mixin files from within your mixins file

```js
// /ncss/mixins/index.js

module.exports = {
  text_size: function(obj, x){
    return Object.assign(obj, {
      "-webkit-text-size-adjust": x +"%",
      "-ms-text-size-adjust": x +"%"
    })
  }
}
```

```js
// include ~ /ncss/includes/index.js

let css = {
  html: m.text_size({"font-family": "sans-serif"}, 100)
}

module.exports = css;

```

will produce

```css

html {
  font-family:sans-serif;
  -ms-text-size-adjust:100%;
  -webkit-text-size-adjust:100%
}
```

[Index](#documentation)

# Helpers

* the h character is reserved for calling helpers
* css-node has a built in list of helpers that is easily extendable.
* helpers can be called from within includes files and mixins
* helpers have access to globals (g)
* the helpers extend file path can be edited/disabled at `config.helpers`
* set `config.helpers` to false to disable a custom helpers file
* set `config.helpers` to a require `/file/path` relative to your cwd to enable your custom helpers
* you can require and use external modules from within your custom helpers file
* you can require and use extra helper files from within your custom helpers file
* you can replace any existing css-node base helper from within your custom helpers file

extra helpers can be added to the `config.helpers` file like so
```js
// /ncss/helpers/index.js

module.exports = {
  rgb2hex(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let rh = (+rgb[0]).toString(16),
    gh = (+rgb[1]).toString(16),
    bh = (+rgb[2]).toString(16);

    if (rh.length == 1){
      rh = "0" + rh;
    }
    if (gh.length == 1){
      gh = "0" + gh;
    }
    if (bh.length == 1){
      bh = "0" + bh;
    }
    return "#" + rh + gh + bh;
  }
}
```

```js
// include ~ base.js

let css = {
  body: {
    color: h.rgb2hex("rgb(255, 255, 255)"),
    background: h.rgba2hex("rgba(103, 58, 183, 0.91)")
  }
}

module.exports = css;
```

will produce

```css

body: {
  color: #ffffff;
  background: #673ab7e8
}
```

# css-node helpers

#### calc
```js
// calculate
body: {
  "height": h.calc("2 * 6", "px"), // 12px
  "height": h.calc("6 / 2", "px") // 3px
  "height": h.calc("6 - 2", "em") // 4em
  "height": h.calc("6 + 2", "rem") //8rem
}

```

#### add
```js
// plus
body: {
  "height": h.add(2, 4, "px") // 6px
}

```

#### sub
```js
// subtract
body: {
  "height": h.sub(4, 2, "px") // 2px
}

```

#### mul
```js
// multiply
body: {
  "height": h.mul(4, 2, "em") // 8em
}

```

#### div
```js
// divide
body: {
  "height": h.div(4, 2, "em") // 2em
}

```

#### floor
```js
// Math.floor
body: {
  "height": h.floor(1.6, "em") // 1em
}

```

#### ceil
```js
// Math.ceil
body: {
  "height": h.ceil(.95, "em") // 1em
}

```

#### abs
```js
// Math.abs
body: {
  "height": h.abs(-5, "em") // 5em
}

```

#### round
```js
// Math.round
body: {
  "height": h.round(1.6, "em") // 2em
}

```

#### percent
```js
// return percentage
body: {
  "height": h.percent(10,200) // 5%
}

```

#### inRange
```js

h.inRange(3, 2, 4); // true

h.inRange(30, 2, 4); // false

h.inRange(-3, -2, -6); // true

```

#### path.base
```js

h.path.base("path/to/img.png") // 'img.png'

h.path.base("path/to/img.png", ".png") // 'img'

```

#### path.dir
```js

h.path.base("path/to/img.png") // 'path/to'

```

#### path.ext
```js

h.path.ext("path/to/img.png") // .'png'

```

#### path.join
```js

h.path.join("/foo", "bar", "baz/asdf", "quux", ".."); // '/foo/bar/baz/asdf'

```

#### path.norm
```js

h.path.norm("/foo/bar//baz/asdf/quux/.."); // '/foo/bar/baz/asdf'

```

#### quote
```js
h.quote("quote"); // 'quote'
```

#### unquote
```js
h.unquote("'unquote'"); // unquote
```

#### upper
```js

h.upper('zzz'); // ZZZ

```

#### upperFirst
```js

h.upperFirst('zzz'); // Zzz

```

#### lower
```js

h.lower('ZZZ'); // zzz

```

#### lowerFirst
```js

h.lowerFirst('ZZZ'); // zZZ

```

#### pre
```js
// add prefix
h.pre('prefix', '_'); // _prefix

```

#### suf
```js
// add duffix
h.suf('suffix', '_'); // suffix_

```

#### starts
```js
// starts with
h.starts('abc', 'b', 1) //true
h.starts('abc', 'b', 2) //false

```

#### snake
```js

h.snake('snake case'); // snake_case

```

#### unsnake
```js

h.unsnake('un_snake_case'); // un snake case

```

#### camel
```js

h.camel('camel case'); // camelCase

```

#### uncamel
```js

h.uncamel('unCamelCase'); // un camel case

```

#### kebab
```js

h.kebab('kebab case'); // kebab-case

```

#### unkebab
```js

h.unkebab('un-kebab-case'); // un kebab case

```

#### is.string
```js

h.is.string('string'); // true

```

#### is.even
```js

h.is.even(4); // true

h.is.even(3); // false

```

#### is.odd
```js

h.is.odd(3); // true

h.is.odd(4); // false

```

#### is.number
```js

h.is.number(3); // true

h.is.number('string'); // false

```

#### is.lt
```js
// less than
h.is.lt(3, 4); // true

h.is.lt(4,3); // false

```

#### is.lte
```js
// less than or equal
h.is.lte(4, 4); // true

h.is.lte(4,3); // false

```

#### is.eq
```js
// greater than
h.is.eq(3, 4); // false

h.is.eq(4,4); // true

h.is.eq("s3", "s4"); // false

h.is.eq("s4","s4"); // true

```

#### is.gt
```js
// greater than
h.is.gt(3, 4); // false

h.is.gt(4,3); // true

```

#### is.gte
```js
// greater than or equal
h.is.gte(4, 4); // false

h.is.gte(4,3); // true

```

#### enc.base64
```js
// base64 encode utf8 string
h.enc.base64('test') // dGVzdA==

```

#### enc.hex
```js
// hex encode utf8 string
h.enc.hex('test') // 74657374

```

#### enc.URI
```js
// URI encode utf8 string
h.enc.URI('[]<>') // %5B%5D%3C%3E

```

#### enc.URIC
```js
//  encode URI Component utf8 string
h.enc.URIC('https://test.com/') // https%3A%2F%2Ftest.com%2F

```

#### js
```js
//  JSON.stringify

h.js({test: 'ok'}); // '{"test":"ok"}'

h.js({test: 'ok'}, 0, 2);
/*
{
  "test": "ok"
}
*/

```

#### jp
```js
//  JSON.parse
h.jp('{"test": "ok"}'); // {test:'ok'}

```

#### vendor
```js

".example": vendor({
  "height": h.div(4, 2, "em") // 2em
}, "box-shadow", "0 0 4px black", ["webkit"])

/*
.example {
  height: 2em;
  box-shadow: 0 0 4px black;
  -webkit-box-shadow: 0 0 4px black
}

*/
```

#### rgb2hex
```js

"body": {
  "background": h.rgb2hex("rgb(255, 255, 255)") // #ffffff
}

```

#### rgba2hex
```js

"body": {
  "background": h.rgba2hex("rgba(103, 58, 183, 0.91)") // #673ab7e8
}

```

#### hex2rgb
```js

"body": {
  "background": h.hex2rgb("#ffffff") // rgb(255, 255, 255)
}

```

#### hex2rgba
```js

"body": {
  "background": h.hex2rgba("#673ab7e8") // rgba(103, 58, 183, 0.91)
}

```

#### keys

```js

h.keys({
  key1: '',
  key2: '',
  key3: ''
}) // ["key1","key2":"key3"]

```

#### vals

```js

h.vals({
  key1: 'val1',
  key2: 'val2',
  key3: 'val3'
}) // ["val1","val2":"val3"]

```

#### assign

```js
let obj1 = {
  key1: 'val1',
  key2: 'val2',
  key3: 'val3'
},
obj2 = {
  key4: 'val4',
  key5: 'val5',
  key6: 'val6'
}

h.assign(obj1, obj2);

/*
{
  key1: 'val1',
  key2: 'val2',
  key3: 'val3',
  key4: 'val4',
  key5: 'val5',
  key6: 'val6'
}
*/

```

#### entries

```js

h.entries({
  key4: 'val4',
  key5: 'val5',
  key6: 'val6'
});

// [ [ 'key4', 'val4' ], [ 'key5', 'val5' ], [ 'key6', 'val6' ] ]

```
[Index](#documentation)


[cd-img]: https://app.codacy.com/project/badge/Grade/d0ce4b5a5c874755bb65af1e2d6dfa87
[npm-img]: https://badgen.net/npm/v/css-node?style=flat-square
[dep-img]:https://badgen.net/david/dep/angeal185/css-node?style=flat-square
[sz-img]:https://badgen.net/packagephobia/publish/css-node?style=flat-square
[lic-img]: https://badgen.net/github/license/angeal185/css-node?style=flat-square
[npm-url]: https://npmjs.org/package/css-node
