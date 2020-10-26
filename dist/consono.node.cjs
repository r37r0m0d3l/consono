"use strict";function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var e=_interopDefaultLegacy(require("chalk"));function _classPrivateFieldGet(e,t){var i=t.get(e);if(!i)throw new TypeError("attempted to get private field on non-instance");return i.get?i.get.call(e):i.value}function _classPrivateFieldSet(e,t,i){var s=t.get(e);if(!s)throw new TypeError("attempted to set private field on non-instance");if(s.set)s.set.call(e,i);else{if(!s.writable)throw new TypeError("attempted to set read only private field");s.value=i}return i}const t={arrayMaxElements:99,assignSymbol:"→",clear:!1,colorize:!0,console:!0,depth:20,exit:!1,immediate:!1,indent:"ˑˑ",indentPad:1,mapMaxEntries:99,objectMaxProps:99,quotesEnd:'"',quotesStart:'"',returns:!0,setMaxValues:99,stdout:!1,stringMaxLength:360},i=["arrayMaxElements","assignSymbol","clear","colorize","console","depth","exit","indent","mapMaxEntries","objectMaxProps","quotesEnd","quotesStart","returns","setMaxValues","stdout","stringMaxLength"];var s="[object Arguments]",a="[object Array]",r="[object ArrayBuffer]",l="[object AsyncFunction]",n="[object BigInt]",o="[object Boolean]",c="[object Date]",h="[object Error]",d="[object Function]",v="[object Generator]",P="[object GeneratorFunction]",u="[object global]",p="[object Map]",m="[object Null]",F="[object Number]",_="[object Promise]",G="[object RegExp]",b="[object Set]",$="[object SharedArrayBuffer]",f="[object String]",g="[object Symbol]",y="[object Undefined]",w="[object WeakMap]",k="[object WeakSet]",j="[object Window]";const S={argument:[253,151,31],boolean:[174,129,255],comment:[117,113,94],keyword:[249,38,114],name:[230,219,116],number:[174,129,255],plain:[128,128,128],property:[102,217,239],string:[166,226,46]},x={argument:[245,135,31],boolean:[66,113,174],comment:[117,113,94],keyword:[200,40,41],name:[201,159,0],number:[101,67,133],plain:[128,128,128],property:[32,123,129],string:[113,140,0]};class Theme{constructor(t=3,i="light"){let s;switch(this.cli=new e.default.Instance({level:Math.min(t,e.default.supportsColor.level)}),!0){case"dark"===i:s=S;break;case"light"===i:s=x;break;case"[object Object]"===Object.prototype.toString.call(i):s={...x,...i};break;default:s=x}this.argument=this.compose(...s.argument),this.boolean=this.compose(...s.boolean),this.comment=this.compose(...s.comment),this.keyword=this.compose(...s.keyword),this.name=this.compose(...s.name),this.number=this.compose(...s.number),this.plain=this.compose(...s.plain),this.property=this.compose(...s.property),this.string=this.compose(...s.string)}static toRGB(e){return e=Number.parseInt(e.toString(),10),Number.isInteger(e)?Math.min(255,Math.max(0,e)):255}compose(e=255,t=255,i=255){return e=Theme.toRGB(e),t=Theme.toRGB(t),i=Theme.toRGB(i),s=>this.cli.rgb(e,t,i)(s.toString())}}function cliExit(){if("clear"in console)try{console.clear()}catch(e){}else try{process.stdout.write("[2J[0;0H")}catch(e){}}function cliPrint(e,t=!1){t?process.stdout.write(e):console.log(e)}function isInteger(e){return Number.isInteger(Number.parseInt(e))}function objectClass(e){return e.constructor.name}function prototypeName(e){return Object.prototype.toString.call(e)}function objectSize(e){return Object.keys(e).length}function objectType(e){const t=prototypeName(e).toLowerCase().split("[object ").pop().split("]").shift();return["global","window"].includes(t)?"object":t.includes("error")?"error":t}function processExit(e=0){if(!1===e)return;!0===e&&(e=0);const t=Number.parseInt(e.toString());if(Number.isInteger(t)&&!(t<0))try{process.exit(t)}catch(e){}}var M=new WeakMap,E=new WeakMap,N=new WeakMap,C=new WeakMap,I=new WeakMap,O=new WeakMap,T=new WeakMap,W=new WeakMap,A=new WeakMap,R=new WeakMap,z=new WeakMap,B=new WeakMap,L=new WeakMap,V=new WeakMap,D=new WeakMap,q=new WeakMap,H=new WeakMap,U=new WeakMap,J=new WeakMap,K=new WeakMap;class Consono{constructor(e={},t="light"){M.set(this,{writable:!0,value:void 0}),E.set(this,{writable:!0,value:void 0}),N.set(this,{writable:!0,value:void 0}),C.set(this,{writable:!0,value:void 0}),I.set(this,{writable:!0,value:void 0}),O.set(this,{writable:!0,value:void 0}),T.set(this,{writable:!0,value:void 0}),W.set(this,{writable:!0,value:void 0}),A.set(this,{writable:!0,value:void 0}),R.set(this,{writable:!0,value:void 0}),z.set(this,{writable:!0,value:void 0}),B.set(this,{writable:!0,value:void 0}),L.set(this,{writable:!0,value:void 0}),V.set(this,{writable:!0,value:void 0}),D.set(this,{writable:!0,value:void 0}),q.set(this,{writable:!0,value:void 0}),H.set(this,{writable:!0,value:void 0}),U.set(this,{writable:!0,value:void 0}),J.set(this,{writable:!0,value:void 0}),K.set(this,{writable:!0,value:void 0}),this.setOptions(e),this.setTheme(t)}setTheme(e){_classPrivateFieldSet(this,K,new Theme(_classPrivateFieldGet(this,C)?3:0,e))}setOptions(e={}){e=e||{};const i={...t,...e};_classPrivateFieldSet(this,M,Number.parseInt(i.arrayMaxElements)),_classPrivateFieldSet(this,E,""+i.assignSymbol),_classPrivateFieldSet(this,N,!!i.clear),_classPrivateFieldSet(this,C,!!i.colorize),_classPrivateFieldSet(this,I,!!i.console),_classPrivateFieldSet(this,U,!!i.stdout),_classPrivateFieldSet(this,O,0),_classPrivateFieldSet(this,T,Number.parseInt(i.depth)),!1===i.exit?_classPrivateFieldSet(this,W,!1):!0===i.exit?_classPrivateFieldSet(this,W,0):isInteger(i.exit)?_classPrivateFieldSet(this,W,i.exit):_classPrivateFieldSet(this,W,!1),_classPrivateFieldSet(this,R,""+i.indent),_classPrivateFieldSet(this,z,_classPrivateFieldGet(this,R).repeat(i.indentPad)),_classPrivateFieldSet(this,B,Number.parseInt(i.mapMaxEntries)),_classPrivateFieldSet(this,L,Number.parseInt(i.objectMaxProps)),_classPrivateFieldSet(this,V,""+i.quotesEnd),_classPrivateFieldSet(this,D,""+i.quotesStart),_classPrivateFieldSet(this,q,!!i.returns),_classPrivateFieldSet(this,A,!!i.immediate),_classPrivateFieldSet(this,H,Number.parseInt(i.setMaxValues)),_classPrivateFieldSet(this,J,Number.parseInt(i.stringMaxLength))}toPrintable(e,t="",i=!0,s=""){let r,l="",n="",o="";const c=objectType(e);switch(c){case"array":{const i=e.length;n=i>_classPrivateFieldGet(this,M)?`${_classPrivateFieldGet(this,K).keyword("array")}${s.length?" "+_classPrivateFieldGet(this,K).keyword(s):""} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("elements")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}=${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,M))}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("[")}\n`:`${_classPrivateFieldGet(this,K).keyword("array")}${s.length?" "+_classPrivateFieldGet(this,K).keyword(s):""} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("elements")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("[")}\n`,o=`${t}${_classPrivateFieldGet(this,K).plain("]")}`,r=_classPrivateFieldGet(this,M);break}case"object":{const s=e;if(e=function objectDeCycle(e){const t=[],i=[];return function deReCycle(s,r){let l,n,o;if(!("object"!=typeof s||null===s||s instanceof Boolean||s instanceof Date||s instanceof Number||s instanceof RegExp||s instanceof String)){for(l=0;l<t.length;l+=1)if(t[l]===s)return{"&circularReference":i[l]};if(t.push(s),i.push(r),prototypeName(s)===a)for(o=[],l=0;l<s.length;l+=1)o[l]=deReCycle(s[l],`${r}["${l}"]`);else for(n in o=Object.create(e),s)Object.prototype.hasOwnProperty.call(s,n)&&(o[n]=deReCycle(s[n],`${r}[${JSON.stringify(n)}]`));return o}return s}(e,"&")}(e),!0===i){const i=objectSize(e);let a="";a=i>_classPrivateFieldGet(this,L)?`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("props")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,L))}${_classPrivateFieldGet(this,K).plain(")")}`:`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("props")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")}`,n=`${_classPrivateFieldGet(this,K).keyword("object")} ${_classPrivateFieldGet(this,K).keyword(objectClass(s))} ${a} ${_classPrivateFieldGet(this,K).plain("{")}\n`,o=`${t}${_classPrivateFieldGet(this,K).plain("}")}`}else n=_classPrivateFieldGet(this,K).plain("(")+"\n",o=`${t}${_classPrivateFieldGet(this,K).plain(")")}`;r=_classPrivateFieldGet(this,L);break}case"arguments":{const i=e.length;n=i>_classPrivateFieldGet(this,M)?`${_classPrivateFieldGet(this,K).keyword("arguments")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("arity")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}, ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,M))}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("[")}\n`:`${_classPrivateFieldGet(this,K).keyword("arguments")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("arity")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("[")}\n`,o=`${t}${_classPrivateFieldGet(this,K).plain("]")}`,r=_classPrivateFieldGet(this,M);break}case"set":{const i=e.size;n=i>_classPrivateFieldGet(this,H)?`${_classPrivateFieldGet(this,K).keyword("set")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("size")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,H))}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("{")}\n`:`${_classPrivateFieldGet(this,K).keyword("set")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("size")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("{")}\n`,o=t+"}",r=_classPrivateFieldGet(this,H);break}case"map":{const i=e.size;n=i>_classPrivateFieldGet(this,B)?`${_classPrivateFieldGet(this,K).keyword("map")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("size")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,B))}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("{")}\n`:`${_classPrivateFieldGet(this,K).keyword("map")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("size")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("{")}\n`,o=`${t}${_classPrivateFieldGet(this,K).plain("}")}`,r=_classPrivateFieldGet(this,B);break}default:return this.formatValue(t,e)}let h=0;switch(c){case"set":{const i=Array.from(e);for(let e=0;e<i.length;e++){const s=i[e],a=this.formatValue(t,s);if(l+=this.formatAssign("set",t,e,a),h+=1,h>=r)break}break}case"map":for(const i of e.entries()){const[e,s]=i,a=this.formatValue(t,{key:e,value:s},!1);if(l+=this.formatAssign("map",t,e,a),h+=1,h>=r)break}break;default:{const i=Object.keys(e).sort(((e,t)=>e.localeCompare(t))).reduce(((e,t)=>(e[t]=void 0,e)),{});for(const s in i){if(!Object.prototype.hasOwnProperty.call(e,s))continue;const i=e[s],a=objectType(i),n=this.formatValue(t,i);if(l+=this.formatAssign(a,t,s,n),h+=1,h>=r)break}break}}return`${n}${l}${o}`}formatValue(e,t,i=!0){let a="",S=objectType(t),x="";const M=prototypeName(t);switch(M){case y:[S,a]=this.formatUndefined();break;case m:[S,a]=this.formatNull();break;case u:case j:[S,a]=this.formatGlobal(M,t,e);break;case n:[S,a]=this.formatBigInt(t);break;case F:[S,a]=this.formatNumber(t);break;case o:[S,a]=this.formatBoolean(t);break;case f:[S,a]=this.formatString(t);break;case G:[S,a]=this.formatRegexp(t);break;case d:case l:case P:[S,a]=this.formatFunction(M,t);break;case c:[S,a]=this.formatDate(t);break;case s:[S,a]=this.formatArguments(t);break;case g:[S,a]=this.formatSymbol(t);break;case _:[S,a]=this.formatPromise();break;case v:[S,a]=this.formatGenerator();break;case h:[S,a]=this.formatError(t);break;case k:case w:[S,a]=this.formatWeak(M);break;case b:[S,a]=this.formatSet(t);break;case p:[S,a]=this.formatMap(t);break;case r:case $:[S,a]=this.formatBuffer(M,t);break;default:if(M.includes("Array"))S="array",x=objectClass(t).toLowerCase(),t=Array.from(t);else if(M.includes("Iterator]")){const s=M.split(" ")[1];if("Set"===s)return this.toPrintable(new Set(Array.from(t).map((e=>e[1]))),e,i);if("Map"===s)return this.toPrintable(new Map(Array.from(t)),e,i);if("String"===s)return this.toPrintable(Array.from(t).map((e=>e[1])).join(""),e,i);if("Array"===s)return this.toPrintable(Array.from(t).map((e=>e[1])),e,i)}}switch(S){case"array":case"object":if(_classPrivateFieldGet(this,O)===_classPrivateFieldGet(this,T)){const e=objectSize(t);let i="";i=e>_classPrivateFieldGet(this,L)?`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("props")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(e)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,L))}${_classPrivateFieldGet(this,K).plain(")")}`:`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("props")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(e)}${_classPrivateFieldGet(this,K).plain(")")}`,a=`${_classPrivateFieldGet(this,K).keyword("object")} ${_classPrivateFieldGet(this,K).keyword(objectClass(t))} ${i}`}else{let s;_classPrivateFieldSet(this,O,_classPrivateFieldGet(this,O)+1),s="array"===S?""+_classPrivateFieldGet(this,K).comment(e):`${e}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,z))}`,a=this.toPrintable(t,s,i,x),_classPrivateFieldSet(this,O,_classPrivateFieldGet(this,O)-1)}break;default:S.length||(S=M.split("[object ").pop().split("]").shift().toLowerCase(),a=t.toString())}return`${_classPrivateFieldGet(this,K).keyword(S)}${S.length?_classPrivateFieldGet(this,K).plain(" • "):""}${a}`}formatArguments(e){return["arguments",this.toPrintable(e)]}formatBigInt(e){return["number bigint",_classPrivateFieldGet(this,K).number(e)]}formatBoolean(e){return["boolean",_classPrivateFieldGet(this,K).boolean(e)]}formatBuffer(e,t){return["array buffer",`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("bytes")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(t.byteLength)}${_classPrivateFieldGet(this,K).plain(")")}`]}formatDate(e){return["date",_classPrivateFieldGet(this,K).name(e.toISOString()+" • "+e.toString())]}formatError(e){return["error "+objectClass(e),_classPrivateFieldGet(this,K).string(e.message)]}formatFunction(e,t){let i="function";switch(e){case l:i+=" async";break;case P:i+=" generator"}const s=function funcNameExtract(e){if(e.name)return e.name;const t=/^function\s+([\w]+)\s*\(/.exec(e.toString());return t?t[1]:""}(t);s.length?i=`${i} ${_classPrivateFieldGet(this,K).name(s)}`:i+=" anonymous";const a=(""+t).replace(/\n+/g,"").split(")").shift()+") {…}";return[i,_classPrivateFieldGet(this,K).argument(a)]}formatGenerator(){return["generator",_classPrivateFieldGet(this,K).argument("Generator {…}")]}formatGlobal(e,t,i){return["global "+(e===j?"window":"this"),this.toPrintable({...t},`${i}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,z))}`)]}formatMap(e){return["map",this.toPrintable(e)]}formatNull(){return["empty",_classPrivateFieldGet(this,K).string("null")]}formatNumber(e){let t;return Number.isFinite(e)?t=Number.isInteger(e)?0===e?Object.is(e,-0)?"number negative zero":"number zero":"number integer":"number float":(t="number",Number.isNaN(e)?t+=" nan":e===Number.POSITIVE_INFINITY?t+=" positive infinity":t+=" negative infinity"),[t,_classPrivateFieldGet(this,K).number(Object.is(e,-0)?"-0":e)]}formatPromise(){return["promise",_classPrivateFieldGet(this,K).argument("Promise {…}")]}formatRegexp(e){return["regexp "+e.flags,_classPrivateFieldGet(this,K).name(e)]}formatSet(e){return["set",this.toPrintable(e)]}formatString(e){const t=[...e],i=t.length,s=e.length;let a,r="";return _classPrivateFieldGet(this,J)>0&&(r=s!==i?t.slice(0,_classPrivateFieldGet(this,J)).join(""):e.slice(0,_classPrivateFieldGet(this,J))),a=s===i?`${_classPrivateFieldGet(this,K).string(_classPrivateFieldGet(this,D))}${_classPrivateFieldGet(this,K).string(r||e)}${_classPrivateFieldGet(this,K).string(_classPrivateFieldGet(this,V))} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("length")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(s)}`:`${_classPrivateFieldGet(this,K).string(_classPrivateFieldGet(this,D))}${_classPrivateFieldGet(this,K).string(r||e)}${_classPrivateFieldGet(this,K).string(_classPrivateFieldGet(this,V))} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("length")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(s)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("symbols")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}`,a=i>_classPrivateFieldGet(this,J)?`${a}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,J))}${_classPrivateFieldGet(this,K).plain(")")}`:`${a}${_classPrivateFieldGet(this,K).plain(")")}`,function stringClearReference(e){return e.length<12?e:(" "+e).slice(1)}(r||e),["string",a]}formatSymbol(e){return["symbol",e.toString()]}formatUndefined(){return["empty",_classPrivateFieldGet(this,K).string("undefined")]}formatWeak(e){return e===w?["map weak",""]:["set weak",""]}formatAssign(e,t,i,s){let a;return"map"===e?`${t}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,z))}${s}${_classPrivateFieldGet(this,K).plain(",")}\n`:"set"===e?`${t}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,z))}${_classPrivateFieldGet(this,K).plain(_classPrivateFieldGet(this,E))} ${s}${_classPrivateFieldGet(this,K).plain(",")}\n`:(a=isInteger(i)||"array"===e&&"string"!=typeof i?`${_classPrivateFieldGet(this,K).plain("[")}${_classPrivateFieldGet(this,K).property(i)}${_classPrivateFieldGet(this,K).plain("]")}`:`${_classPrivateFieldGet(this,K).plain(_classPrivateFieldGet(this,D))}${_classPrivateFieldGet(this,K).property(i)}${_classPrivateFieldGet(this,K).plain(_classPrivateFieldGet(this,V))}`,`${t}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,z))}${a} ${_classPrivateFieldGet(this,K).plain(_classPrivateFieldGet(this,E))} ${s}${_classPrivateFieldGet(this,K).plain(",")}\n`)}log(e){if(_classPrivateFieldGet(this,I)&&(_classPrivateFieldGet(this,N)&&cliExit(),_classPrivateFieldGet(this,A)?setTimeout((()=>cliPrint(this.toPrintable(e),_classPrivateFieldGet(this,U))),0):cliPrint(this.toPrintable(e),_classPrivateFieldGet(this,U)),processExit(_classPrivateFieldGet(this,W))),_classPrivateFieldGet(this,q))return this.toPrintable(e)}static factory(e=!0,t){const i=Consono.createOptions(e),s=new Consono(i,t);return function consono(e){if(i.console&&(i.clear&&cliExit(),i.immediate?setTimeout((()=>cliPrint(s.toPrintable(e),i.stdout)),0):cliPrint(s.toPrintable(e),i.stdout),processExit(i.exit)),i.returns)return s.toPrintable(e)}}static createOptions(e=!0){const s={...t};return"boolean"==typeof e?s.console=e:e&&"object"==typeof e&&Object.assign(s,e),function objectPick(e,t){return t.length&&Object.keys(e).length?t.reduce(((t,i)=>(t[i]=e[i],t)),{}):{}}(s,i)}}exports.Consono=Consono,exports.THEME_DARK=S,exports.THEME_LIGHT=x,exports.consono=function consono(e,t=!0,i="light"){const s=Consono.createOptions(t),a=new Consono(s,i);if(s.console&&(s.clear&&cliExit(),s.immediate?setTimeout((()=>cliPrint(a.toPrintable(e),s.stdout)),0):cliPrint(a.toPrintable(e),s.stdout),processExit(s.exit)),s.returns)return a.toPrintable(e)},exports.consonoExit=function consonoExit(e,t=!0,i="light",s=0){const a=Consono.createOptions({...t,exit:s}),r=new Consono(a,i);if(a.console&&(a.clear&&cliExit(),a.immediate?setTimeout((()=>cliPrint(r.toPrintable(e),a.stdout)),0):cliPrint(r.toPrintable(e),a.stdout),processExit(a.exit)),a.returns)return r.toPrintable(e)},exports.consonoPlain=function consonoPlain(e,t=!0){const i=Consono.createOptions({...t,colorize:!1}),s=new Consono(i);if(i.console&&(i.clear&&cliExit(),i.immediate?setTimeout((()=>cliPrint(s.toPrintable(e),i.stdout)),0):cliPrint(s.toPrintable(e),i.stdout),processExit(i.exit)),i.returns)return s.toPrintable(e)},exports.consonoReturn=function consonoReturn(e,t=!0,i="light"){const s=Consono.createOptions({...t,console:!1,returns:!0}),a=new Consono(s,i);if(s.console&&(s.clear&&cliExit(),s.immediate?setTimeout((()=>cliPrint(a.toPrintable(e),s.stdout)),0):cliPrint(a.toPrintable(e),s.stdout),processExit(s.exit)),s.returns)return a.toPrintable(e)},exports.options=t;
//# sourceMappingURL=consono.node.cjs.map
