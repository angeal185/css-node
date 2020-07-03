const fs = require('fs');

function regExpEscape(literal_string) {
  return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

module.exports = function(src, dest, cb){

  let data = fs.readFileSync(src, 'utf8'),
  psuedo = [":active",":any-link",":before",":after",":blank ",":checked",":current",":defined",":dir(",":disabled",":drop",":empty",":enabled",":first",":first-child",":first-of-type",":fullscreen", ":future",":focus",":focus-visible",":focus-within",":has(",":host",":host(",":host-context(",":hover",":indeterminate",":in-range",":invalid",":is(",
  ":lang(",":last-child",":last-of-type",":link",":local-link", ":not(",":nth-child(",":nth-col(",":nth-last-child(",":nth-last-col(",":nth-last-of-type(",":nth-of-type(",":only-child",":only-of-type",":optional",":out-of-range",":past",":placeholder-shown", ":read-only",":read-write",":required",":root",":scope",":state(",":target",":target-within",":user-invalid",":valid",":visited",":where(",":marker"
  ]

  for (let i = 0; i < psuedo.length; i++) {
    let x = psuedo[i]
    let dynamicRegExp = new RegExp(`${regExpEscape(x)}`, 'g')
    data = data.replace(dynamicRegExp,   'xccccccccccx' + psuedo[i].slice(1))
  }

  data = data
  .replace(/\\/g, "\\\\")
  .replace(/"/g, "'")
  .replace(/::/g, 'yccccccccccy')
  .replace(/;/g, '","')
  .replace(/:/g, '":"')
  .replace(/}/g, '"},"')
  .replace(/{/g, '":{"')
  .replace(/,""/g, ',')
  .replace(/xccccccccccx/g, ':')
  .replace(/yccccccccccy/g, '::')
  .replace(/"stroke:currentcolor"/g, '"stroke":"currentcolor"')
  .replace(new RegExp(`${regExpEscape('(min-width":"')}`, 'g'), "(min-width:")
  .replace(new RegExp(`${regExpEscape('(min-width ":"')}`, 'g'), "(min-width:")
  .replace(new RegExp(`${regExpEscape('(max-width":"')}`, 'g'), "(max-width:")
  .replace(new RegExp(`${regExpEscape('(max-width ":"')}`, 'g'), "(max-width:")
  .replace(new RegExp(`${regExpEscape('(filter":"')}`, 'g'), "(filter:")
  .replace(new RegExp(`${regExpEscape('(pointer":"')}`, 'g'), "(pointer:")
  .replace(new RegExp(`${regExpEscape('(position":"')}`, 'g'), "(position:")
  .replace(new RegExp(`${regExpEscape('(-ms-ime-align":"')}`, 'g'), "(-ms-ime-align:")
  .replace(new RegExp(`${regExpEscape('":"-ms-input-placeholder')}`, 'g'), ":-ms-input-placeholder")
  .replace(new RegExp(`${regExpEscape('":"-moz-placeholder')}`, 'g'), ":-moz-placeholder")
  .replace(new RegExp(`${regExpEscape('":"-moz-focusring')}`, 'g'), ":-moz-focusring")
  .replace(new RegExp(`${regExpEscape('":"-o-prefocus')}`, 'g'), ":-o-prefocus")
  .replace(new RegExp(`${regExpEscape('(-webkit-background-clip":"')}`, 'g'), "(-webkit-background-clip:")
  .replace(new RegExp(`${regExpEscape('(-ms-high-contrast":"')}`, 'g'), "(-ms-high-contrast:")
  .replace(new RegExp(`${regExpEscape('(prefers-reduced-motion":"')}`, 'g'), "(prefers-reduced-motion:")
  .replace(/"fill:currentcolor"/g, '"fill":"currentcolor"')
  .replace(/"background-color:currentColor"/g, '"background-color":"currentColor"')
  .replace(/"color:currentColor"/g, '"color":"currentColor"')
  .replace(new RegExp(`${regExpEscape('":":left')}`, 'g'), "::left")
  .replace(new RegExp(`${regExpEscape('":":right')}`, 'g'), "::right")
  .replace(new RegExp(`${regExpEscape('":":after')}`, 'g'), "::after")
  .replace(new RegExp(`${regExpEscape('":":before')}`, 'g'), "::before")
  data = '{"'+ data.slice(0,-3) + '}'

  if(dest){
    fs.writeFile(dest, data, function(err){
      if(err){return cb(err)}
      cb(false, data)
    })
  } else {
    return data
  }

}
