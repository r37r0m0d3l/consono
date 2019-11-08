const TAG_ARGUMENTS="[object Arguments]",TAG_ARRAY="[object Array]",TAG_ARRAY_BUFFER="[object ArrayBuffer]",TAG_ASYNC_FUNCTION="[object AsyncFunction]",TAG_BIGINT="[object BigInt]",TAG_BOOL="[object Boolean]",TAG_DATE="[object Date]",TAG_ERROR="[object Error]",TAG_FUNCTION="[object Function]",TAG_GENERATOR="[object Generator]",TAG_GENERATOR_FUNCTION="[object GeneratorFunction]",TAG_GLOBAL="[object global]",TAG_MAP="[object Map]",TAG_NULL="[object Null]",TAG_NUMBER="[object Number]",TAG_OBJECT="[object Object]",TAG_PROMISE="[object Promise]",TAG_REGEXP="[object RegExp]",TAG_SET="[object Set]",TAG_SHARED_ARRAY_BUFFER="[object SharedArrayBuffer]",TAG_STRING="[object String]",TAG_SYMBOL="[object Symbol]",TAG_VOID="[object Undefined]",TAG_WEAK_MAP="[object WeakMap]",TAG_WEAK_SET="[object WeakSet]",TAG_WINDOW="[object Window]";function clearCli(){if("clear"in console)try{console.clear()}catch(t){}else try{process.stdout.write("[2J[0;0H")}catch(t){}}function processExit(){try{process.exit(0)}catch(t){}}function isNumericKey(t){return Number.isInteger(Number.parseInt(t))}function prototypeTag(t){return Object.prototype.toString.call(t)}function clearString(t){return t.length<12?t:(" "+t).slice(1)}function deCycle(t){const e=[],r=[];return function deReCycle(o,n){let s,a,i;if(!("object"!=typeof o||null===o||o instanceof Boolean||o instanceof Date||o instanceof Number||o instanceof RegExp||o instanceof String)){for(s=0;s<e.length;s+=1)if(e[s]===o)return{"&circularReference":r[s]};if(e.push(o),r.push(n),prototypeTag(o)===TAG_ARRAY)for(i=[],s=0;s<o.length;s+=1)i[s]=deReCycle(o[s],`${n}[" + index + "]`);else for(a in i=Object.create(t),o)Object.prototype.hasOwnProperty.call(o,a)&&(i[a]=deReCycle(o[a],`${n}[${JSON.stringify(a)}]`));return i}return o}(t,"&")}function closureNameExtract(t){if(t.name)return t.name;const e=/^function\s+([\w\$]+)\s*\(/.exec(t.toString());return e?e[1]:""}function objSize(t){return Object.keys(t).length}function getClass(t){return t.constructor.name}function getType(t){let e=prototypeTag(t).toLowerCase().split("[object ").pop().split("]").shift();return["global","window"].includes(e)?"object":e.includes("error")?"error":e}class Consono{constructor(t={}){this.setOptions(t)}setOptions(t={}){const e={arrayMaxElements:99,assignSymbol:"→",clear:!1,console:!0,depth:20,exit:!1,indent:"ˑˑ",indentPad:1,objectMaxProps:99,quotesEnd:'"',quotesStart:'"',stringMaxLength:360,...t};this.arrayMaxElements=e.arrayMaxElements,this.arrow=e.assignSymbol,this.clear=e.clear,this.console=e.console,this.currentDepth=0,this.depth=e.depth,this.exit=e.exit,this.indentType=e.indent,this.indent=this.indentType.repeat(e.indentPad),this.objectMaxProps=e.objectMaxProps,this.quotesEnd=e.quotesEnd,this.quotesStart=e.quotesStart,this.stringMaxLength=e.stringMaxLength}toPrintable(t,e="",r=!0,o=""){let n="",s="",a="",i=Number.MAX_SAFE_INTEGER;const c=getType(t);switch(c){case"array":s=`array${o.length?` ${o}`:""} (elements=${t.length}) [\n`,a=`${e}]`,i=this.arrayMaxElements;break;case"object":const n=t;t=deCycle(t),!0===r?(s=`object ${getClass(n)} (props=${objSize(t)}) {\n`,a=`${e}}`):(s="(\n",a=`${e})`),i=this.objectMaxProps;break;case"arguments":s=`arguments (arity=${t.length}) [\n`,a=`${e}]`,i=this.arrayMaxElements;break;case"set":s=`set (size=${t.size}) {\n`,a=`${e}}`,i=this.arrayMaxElements;break;case"map":s=`map (size=${t.size}) {\n`,a=`${e}}`,i=this.objectMaxProps;break;default:return this.formatValue(e,t)}let l=0;switch(c){case"set":const r=Array.from(t);for(const t in r){const o=r[t],s=this.formatValue(e,o);if(n+=this.formatAssign("set",e,t,s),(l+=1)>=i)break}break;case"map":for(const r of t.entries()){const[t,o]=r,s=this.formatValue(e,{key:t,value:o},!1);if(n+=this.formatAssign("map",e,t,s),(l+=1)>=i)break}break;default:for(const r in t){if(!Object.prototype.hasOwnProperty.call(t,r))continue;const o=t[r],s=getType(o),a=this.formatValue(e,o);if(n+=this.formatAssign(s,e,r,a),(l+=1)>=i)break}}return`${s}${n}${a}`}formatValue(t,e,r=!0){let o="",n=getType(e),s="";const a=prototypeTag(e);switch(a){case TAG_VOID:[n,o]=this.formatUndefined();break;case TAG_NULL:[n,o]=this.formatNull();break;case TAG_GLOBAL:case TAG_WINDOW:[n,o]=this.formatGlobal(a,e,t);break;case TAG_BIGINT:[n,o]=this.formatBigInt(e);break;case TAG_NUMBER:[n,o]=this.formatNumber(e);break;case TAG_BOOL:[n,o]=this.formatBoolean(e);break;case TAG_STRING:[n,o]=this.formatString(e);break;case TAG_REGEXP:[n,o]=this.formatRegexp(e);break;case TAG_FUNCTION:case TAG_ASYNC_FUNCTION:case TAG_GENERATOR_FUNCTION:[n,o]=this.formatFunction(a,e);break;case TAG_DATE:[n,o]=this.formatDate(e);break;case TAG_ARGUMENTS:[n,o]=this.formatArguments(e);break;case TAG_SYMBOL:[n,o]=this.formatSymbol(e);break;case TAG_PROMISE:[n,o]=this.formatPromise(e);break;case TAG_GENERATOR:[n,o]=this.formatGenerator(e);break;case TAG_ERROR:[n,o]=this.formatError(e);break;case TAG_WEAK_SET:case TAG_WEAK_MAP:[n,o]=this.formatWeak(a,e);break;case TAG_SET:[n,o]=this.formatSet(e);break;case TAG_MAP:[n,o]=this.formatMap(e);break;case TAG_ARRAY_BUFFER:case TAG_SHARED_ARRAY_BUFFER:[n,o]=this.formatBuffer(a,e);break;default:if(a.includes("Array"))n="array",s=getClass(e).toLowerCase(),e=Array.from(e);else if(a.includes("Iterator]")){const o=a.split(" ")[1];if("Set"===o)return this.toPrintable(new Set(Array.from(e).map(t=>t[1])),t,r);if("Map"===o)return this.toPrintable(new Map(Array.from(e)),t,r);if("String"===o)return this.toPrintable(Array.from(e).map(t=>t[1]).join(""),t,r);if("Array"===o)return this.toPrintable(Array.from(e).map(t=>t[1]),t,r)}}switch(n){case"array":case"object":n="",this.currentDepth===this.depth?o=`${`object ${getClass(e)}`} (props=${objSize(e)})`:(this.currentDepth+=1,o=this.toPrintable(e,`${t}${this.indent}`,r,s),this.currentDepth-=1);break;default:n.length||(n=a.split("[object ").pop().split("]").shift().toLowerCase(),o=e.toString())}return`${n}${n.length?" • ":""}${o}`}formatArguments(t){return["arguments",this.toPrintable(t)]}formatBigInt(t){return["number bigint",t]}formatBoolean(t){return["boolean",`${t}`]}formatBuffer(t,e){return[TAG_ARRAY_BUFFER?"array buffer":"array buffer shared",`bytes: ${e.byteLength}`]}formatDate(t){return["date",t.toISOString()+" • "+t.toString()]}formatError(t){return[`error ${getClass(t)}`,t.message]}formatFunction(t,e){let r="function";switch(t){case TAG_ASYNC_FUNCTION:r=`${r} async`;break;case TAG_GENERATOR_FUNCTION:r=`${r} generator`}const o=closureNameExtract(e);return[r=o.length?`${r} ${this.quotesStart}${o}${this.quotesEnd}`:`${r} anonymous`,`${e}`.replace(/\n+/g,"").split(")").shift()+") {…}"]}formatGenerator(t){return["generator","Generator {…}"]}formatGlobal(t,e,r){return[`global ${t===TAG_WINDOW?"window":"this"}`,this.toPrintable({...e},`${r}${this.indent}`)]}formatMap(t){return["map",this.toPrintable(t)]}formatNull(){return["empty","null"]}formatNumber(t){let e="";return Number.isFinite(t)?e=Number.isInteger(t)?"number integer":"number float":(e="number",Number.isNaN(t)?e+=" nan":t===Number.POSITIVE_INFINITY?e+=" positive infinity":e+=" negative infinity"),[e,`${t}`]}formatPromise(t){return["promise","Promise {…}"]}formatRegexp(t){return[`regexp ${t.flags}`,`${t}`]}formatSet(t){return["set",this.toPrintable(t)]}formatString(t){const e=[...t],r=e.length,o=t.length;let n="";this.stringMaxLength>0&&(n=o!==r?e.slice(0,this.stringMaxLength).join(""):t.slice(0,this.stringMaxLength));let s="";return s=o===r?`${`"${n||t}"`} (length=${o}`:`${`"${n||t}"`} (length=${o}, symbols=${r}`,s=r>this.stringMaxLength?`${s}, shown=${this.stringMaxLength})`:`${s})`,clearString(n),["string",s]}formatSymbol(t){return["symbol",t.toString()]}formatUndefined(){return["empty","undefined"]}formatWeak(t,e){return t===TAG_WEAK_MAP?["map weak",""]:["set weak",""]}formatAssign(t,e,r,o){let n;return"map"===t?`${e}${this.indent}${o},\n`:"set"===t?`${e}${this.indent}${this.arrow} ${o},\n`:(n=isNumericKey(r)||"array"===t&&"string"!=typeof r?`[${r}]`:`${this.quotesStart}${r}${this.quotesEnd}`,`${e}${this.indent}${n} ${this.arrow} ${o},\n`)}log(t){if(!this.console)return this.toPrintable(t);this.clear&&clearCli(),console.log(this.toPrintable(t)),this.exit&&processExit()}}function consono(t,e=!0){const r={console:!0};"boolean"==typeof e?r.console=e:e&&"object"==typeof e&&Object.assign(r,e);const o=new Consono(e);if(!r.console)return o.toPrintable(t);r.clear&&clearCli(),console.log(o.toPrintable(t)),r.exit&&processExit()}Consono.factory=function factory(t=!0){const e={console:!0};"boolean"==typeof t?e.console=t:t&&"object"==typeof t&&Object.assign(e,t);const r=new Consono(t);return function consono(t){if(!e.console)return r.toPrintable(t);e.clear&&clearCli(),console.log(r.toPrintable(t)),e.exit&&processExit()}},module.exports.default=consono,module.exports.consono=consono,module.exports.Consono=Consono;