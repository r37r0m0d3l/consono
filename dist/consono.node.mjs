import{Instance as e,supportsColor as t}from"chalk";function _classPrivateFieldGet(e,t){var i=t.get(e);if(!i)throw new TypeError("attempted to get private field on non-instance");return i.get?i.get.call(e):i.value}function _classPrivateFieldSet(e,t,i){var s=t.get(e);if(!s)throw new TypeError("attempted to set private field on non-instance");if(s.set)s.set.call(e,i);else{if(!s.writable)throw new TypeError("attempted to set read only private field");s.value=i}return i}const i={arrayMaxElements:99,assignSymbol:"→",clear:!1,colorize:!0,console:!0,depth:20,exit:!1,immediate:!1,indent:"ˑˑ",indentPad:1,mapMaxEntries:99,objectMaxProps:99,quotesEnd:'"',quotesStart:'"',returns:!0,setMaxValues:99,stdout:!1,stringMaxLength:360},s=["arrayMaxElements","assignSymbol","clear","colorize","console","depth","exit","indent","mapMaxEntries","objectMaxProps","quotesEnd","quotesStart","returns","setMaxValues","stdout","stringMaxLength"];var a="[object Arguments]",r="[object Array]",l="[object ArrayBuffer]",n="[object AsyncFunction]",o="[object BigInt]",c="[object Boolean]",h="[object Date]",d="[object Error]",v="[object Function]",P="[object Generator]",u="[object GeneratorFunction]",m="[object global]",p="[object Map]",F="[object Null]",_="[object Number]",G="[object Promise]",b="[object RegExp]",$="[object Set]",f="[object SharedArrayBuffer]",g="[object String]",w="[object Symbol]",y="[object Undefined]",k="[object WeakMap]",j="[object WeakSet]",S="[object Window]";const x={argument:[253,151,31],boolean:[174,129,255],comment:[117,113,94],keyword:[249,38,114],name:[230,219,116],number:[174,129,255],plain:[128,128,128],property:[102,217,239],string:[166,226,46]},M={argument:[245,135,31],boolean:[66,113,174],comment:[117,113,94],keyword:[200,40,41],name:[201,159,0],number:[101,67,133],plain:[128,128,128],property:[32,123,129],string:[113,140,0]};class Theme{constructor(i=3,s="light"){let a;switch(this.cli=new e({level:Math.min(i,t.level)}),!0){case"dark"===s:a=x;break;case"light"===s:a=M;break;case"[object Object]"===Object.prototype.toString.call(s):a={...M,...s};break;default:a=M}this.argument=this.compose(...a.argument),this.boolean=this.compose(...a.boolean),this.comment=this.compose(...a.comment),this.keyword=this.compose(...a.keyword),this.name=this.compose(...a.name),this.number=this.compose(...a.number),this.plain=this.compose(...a.plain),this.property=this.compose(...a.property),this.string=this.compose(...a.string)}static toRGB(e){return e=Number.parseInt(e.toString(),10),Number.isInteger(e)?Math.min(255,Math.max(0,e)):255}compose(e=255,t=255,i=255){return e=Theme.toRGB(e),t=Theme.toRGB(t),i=Theme.toRGB(i),s=>this.cli.rgb(e,t,i)(s.toString())}}function cliExit(){if("clear"in console)try{console.clear()}catch(e){}else try{process.stdout.write("[2J[0;0H")}catch(e){}}function cliPrint(e,t=!1){t?process.stdout.write(e):console.log(e)}function isInteger(e){return Number.isInteger(Number.parseInt(e))}function objectClass(e){return e.constructor.name}function prototypeName(e){return Object.prototype.toString.call(e)}function objectSize(e){return Object.keys(e).length}function objectType(e){const t=prototypeName(e).toLowerCase().split("[object ").pop().split("]").shift();return["global","window"].includes(t)?"object":t.includes("error")?"error":t}function processExit(e=0){if(!1===e)return;!0===e&&(e=0);const t=Number.parseInt(e.toString());if(Number.isInteger(t)&&!(t<0))try{process.exit(t)}catch(e){}}var E=new WeakMap,N=new WeakMap,C=new WeakMap,I=new WeakMap,O=new WeakMap,W=new WeakMap,T=new WeakMap,A=new WeakMap,z=new WeakMap,B=new WeakMap,R=new WeakMap,V=new WeakMap,L=new WeakMap,q=new WeakMap,D=new WeakMap,U=new WeakMap,J=new WeakMap,H=new WeakMap,Y=new WeakMap,K=new WeakMap;class Consono{constructor(e={},t="light"){E.set(this,{writable:!0,value:void 0}),N.set(this,{writable:!0,value:void 0}),C.set(this,{writable:!0,value:void 0}),I.set(this,{writable:!0,value:void 0}),O.set(this,{writable:!0,value:void 0}),W.set(this,{writable:!0,value:void 0}),T.set(this,{writable:!0,value:void 0}),A.set(this,{writable:!0,value:void 0}),z.set(this,{writable:!0,value:void 0}),B.set(this,{writable:!0,value:void 0}),R.set(this,{writable:!0,value:void 0}),V.set(this,{writable:!0,value:void 0}),L.set(this,{writable:!0,value:void 0}),q.set(this,{writable:!0,value:void 0}),D.set(this,{writable:!0,value:void 0}),U.set(this,{writable:!0,value:void 0}),J.set(this,{writable:!0,value:void 0}),H.set(this,{writable:!0,value:void 0}),Y.set(this,{writable:!0,value:void 0}),K.set(this,{writable:!0,value:void 0}),this.setOptions(e),this.setTheme(t)}setTheme(e){_classPrivateFieldSet(this,K,new Theme(_classPrivateFieldGet(this,I)?3:0,e))}setOptions(e={}){e=e||{};const t={...i,...e};_classPrivateFieldSet(this,E,Number.parseInt(t.arrayMaxElements)),_classPrivateFieldSet(this,N,""+t.assignSymbol),_classPrivateFieldSet(this,C,!!t.clear),_classPrivateFieldSet(this,I,!!t.colorize),_classPrivateFieldSet(this,O,!!t.console),_classPrivateFieldSet(this,H,!!t.stdout),_classPrivateFieldSet(this,W,0),_classPrivateFieldSet(this,T,Number.parseInt(t.depth)),!1===t.exit?_classPrivateFieldSet(this,A,!1):!0===t.exit?_classPrivateFieldSet(this,A,0):isInteger(t.exit)?_classPrivateFieldSet(this,A,t.exit):_classPrivateFieldSet(this,A,!1),_classPrivateFieldSet(this,B,""+t.indent),_classPrivateFieldSet(this,R,_classPrivateFieldGet(this,B).repeat(t.indentPad)),_classPrivateFieldSet(this,V,Number.parseInt(t.mapMaxEntries)),_classPrivateFieldSet(this,L,Number.parseInt(t.objectMaxProps)),_classPrivateFieldSet(this,q,""+t.quotesEnd),_classPrivateFieldSet(this,D,""+t.quotesStart),_classPrivateFieldSet(this,U,!!t.returns),_classPrivateFieldSet(this,z,!!t.immediate),_classPrivateFieldSet(this,J,Number.parseInt(t.setMaxValues)),_classPrivateFieldSet(this,Y,Number.parseInt(t.stringMaxLength))}toPrintable(e,t="",i=!0,s=""){let a,l="",n="",o="";const c=objectType(e);switch(c){case"array":{const i=e.length;n=i>_classPrivateFieldGet(this,E)?`${_classPrivateFieldGet(this,K).keyword("array")}${s.length?" "+_classPrivateFieldGet(this,K).keyword(s):""} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("elements")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}=${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,E))}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("[")}\n`:`${_classPrivateFieldGet(this,K).keyword("array")}${s.length?" "+_classPrivateFieldGet(this,K).keyword(s):""} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("elements")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("[")}\n`,o=`${t}${_classPrivateFieldGet(this,K).plain("]")}`,a=_classPrivateFieldGet(this,E);break}case"object":{const s=e;if(e=function objectDeCycle(e){const t=[],i=[];return function deReCycle(s,a){let l,n,o;if(!("object"!=typeof s||null===s||s instanceof Boolean||s instanceof Date||s instanceof Number||s instanceof RegExp||s instanceof String)){for(l=0;l<t.length;l+=1)if(t[l]===s)return{"&circularReference":i[l]};if(t.push(s),i.push(a),prototypeName(s)===r)for(o=[],l=0;l<s.length;l+=1)o[l]=deReCycle(s[l],`${a}["${l}"]`);else for(n in o=Object.create(e),s)Object.prototype.hasOwnProperty.call(s,n)&&(o[n]=deReCycle(s[n],`${a}[${JSON.stringify(n)}]`));return o}return s}(e,"&")}(e),!0===i){const i=objectSize(e);let a="";a=i>_classPrivateFieldGet(this,L)?`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("props")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,L))}${_classPrivateFieldGet(this,K).plain(")")}`:`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("props")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")}`,n=`${_classPrivateFieldGet(this,K).keyword("object")} ${_classPrivateFieldGet(this,K).keyword(objectClass(s))} ${a} ${_classPrivateFieldGet(this,K).plain("{")}\n`,o=`${t}${_classPrivateFieldGet(this,K).plain("}")}`}else n=_classPrivateFieldGet(this,K).plain("(")+"\n",o=`${t}${_classPrivateFieldGet(this,K).plain(")")}`;a=_classPrivateFieldGet(this,L);break}case"arguments":{const i=e.length;n=i>_classPrivateFieldGet(this,E)?`${_classPrivateFieldGet(this,K).keyword("arguments")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("arity")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}, ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,E))}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("[")}\n`:`${_classPrivateFieldGet(this,K).keyword("arguments")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("arity")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("[")}\n`,o=`${t}${_classPrivateFieldGet(this,K).plain("]")}`,a=_classPrivateFieldGet(this,E);break}case"set":{const i=e.size;n=i>_classPrivateFieldGet(this,J)?`${_classPrivateFieldGet(this,K).keyword("set")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("size")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,J))}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("{")}\n`:`${_classPrivateFieldGet(this,K).keyword("set")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("size")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("{")}\n`,o=t+"}",a=_classPrivateFieldGet(this,J);break}case"map":{const i=e.size;n=i>_classPrivateFieldGet(this,V)?`${_classPrivateFieldGet(this,K).keyword("map")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("size")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,V))}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("{")}\n`:`${_classPrivateFieldGet(this,K).keyword("map")} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("size")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}${_classPrivateFieldGet(this,K).plain(")")} ${_classPrivateFieldGet(this,K).plain("{")}\n`,o=`${t}${_classPrivateFieldGet(this,K).plain("}")}`,a=_classPrivateFieldGet(this,V);break}default:return this.formatValue(t,e)}let h=0;switch(c){case"set":{const i=Array.from(e);for(let e=0;e<i.length;e++){const s=i[e],r=this.formatValue(t,s);if(l+=this.formatAssign("set",t,e,r),h+=1,h>=a)break}break}case"map":for(const i of e.entries()){const[e,s]=i,r=this.formatValue(t,{key:e,value:s},!1);if(l+=this.formatAssign("map",t,e,r),h+=1,h>=a)break}break;default:{const i=Object.keys(e).sort(((e,t)=>e.localeCompare(t))).reduce(((e,t)=>(e[t]=void 0,e)),{});for(const s in i){if(!Object.prototype.hasOwnProperty.call(e,s))continue;const i=e[s],r=objectType(i),n=this.formatValue(t,i);if(l+=this.formatAssign(r,t,s,n),h+=1,h>=a)break}break}}return`${n}${l}${o}`}formatValue(e,t,i=!0){let s="",r=objectType(t),x="";const M=prototypeName(t);switch(M){case y:[r,s]=this.formatUndefined();break;case F:[r,s]=this.formatNull();break;case m:case S:[r,s]=this.formatGlobal(M,t,e);break;case o:[r,s]=this.formatBigInt(t);break;case _:[r,s]=this.formatNumber(t);break;case c:[r,s]=this.formatBoolean(t);break;case g:[r,s]=this.formatString(t);break;case b:[r,s]=this.formatRegexp(t);break;case v:case n:case u:[r,s]=this.formatFunction(M,t);break;case h:[r,s]=this.formatDate(t);break;case a:[r,s]=this.formatArguments(t);break;case w:[r,s]=this.formatSymbol(t);break;case G:[r,s]=this.formatPromise();break;case P:[r,s]=this.formatGenerator();break;case d:[r,s]=this.formatError(t);break;case j:case k:[r,s]=this.formatWeak(M);break;case $:[r,s]=this.formatSet(t);break;case p:[r,s]=this.formatMap(t);break;case l:case f:[r,s]=this.formatBuffer(M,t);break;default:if(M.includes("Array"))r="array",x=objectClass(t).toLowerCase(),t=Array.from(t);else if(M.includes("Iterator]")){const s=M.split(" ")[1];if("Set"===s)return this.toPrintable(new Set(Array.from(t).map((e=>e[1]))),e,i);if("Map"===s)return this.toPrintable(new Map(Array.from(t)),e,i);if("String"===s)return this.toPrintable(Array.from(t).map((e=>e[1])).join(""),e,i);if("Array"===s)return this.toPrintable(Array.from(t).map((e=>e[1])),e,i)}}switch(r){case"array":case"object":if(_classPrivateFieldGet(this,W)===_classPrivateFieldGet(this,T)){const e=objectSize(t);let i="";i=e>_classPrivateFieldGet(this,L)?`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("props")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(e)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,L))}${_classPrivateFieldGet(this,K).plain(")")}`:`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("props")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(e)}${_classPrivateFieldGet(this,K).plain(")")}`,s=`${_classPrivateFieldGet(this,K).keyword("object")} ${_classPrivateFieldGet(this,K).keyword(objectClass(t))} ${i}`}else{let a;_classPrivateFieldSet(this,W,_classPrivateFieldGet(this,W)+1),a="array"===r?""+_classPrivateFieldGet(this,K).comment(e):`${e}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,R))}`,s=this.toPrintable(t,a,i,x),_classPrivateFieldSet(this,W,_classPrivateFieldGet(this,W)-1)}break;default:r.length||(r=M.split("[object ").pop().split("]").shift().toLowerCase(),s=t.toString())}return`${_classPrivateFieldGet(this,K).keyword(r)}${r.length?_classPrivateFieldGet(this,K).plain(" • "):""}${s}`}formatArguments(e){return["arguments",this.toPrintable(e)]}formatBigInt(e){return["number bigint",_classPrivateFieldGet(this,K).number(e)]}formatBoolean(e){return["boolean",_classPrivateFieldGet(this,K).boolean(e)]}formatBuffer(e,t){return["array buffer",`${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("bytes")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(t.byteLength)}${_classPrivateFieldGet(this,K).plain(")")}`]}formatDate(e){return["date",_classPrivateFieldGet(this,K).name(e.toISOString()+" • "+e.toString())]}formatError(e){return["error "+objectClass(e),_classPrivateFieldGet(this,K).string(e.message)]}formatFunction(e,t){let i="function";switch(e){case n:i+=" async";break;case u:i+=" generator"}const s=function funcNameExtract(e){if(e.name)return e.name;const t=/^function\s+([\w]+)\s*\(/.exec(e.toString());return t?t[1]:""}(t);s.length?i=`${i} ${_classPrivateFieldGet(this,K).name(s)}`:i+=" anonymous";const a=(""+t).replace(/\n+/g,"").split(")").shift()+") {…}";return[i,_classPrivateFieldGet(this,K).argument(a)]}formatGenerator(){return["generator",_classPrivateFieldGet(this,K).argument("Generator {…}")]}formatGlobal(e,t,i){return["global "+(e===S?"window":"this"),this.toPrintable({...t},`${i}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,R))}`)]}formatMap(e){return["map",this.toPrintable(e)]}formatNull(){return["empty",_classPrivateFieldGet(this,K).string("null")]}formatNumber(e){let t;return Number.isFinite(e)?t=Number.isInteger(e)?0===e?Object.is(e,-0)?"number negative zero":"number zero":"number integer":"number float":(t="number",Number.isNaN(e)?t+=" nan":e===Number.POSITIVE_INFINITY?t+=" positive infinity":t+=" negative infinity"),[t,_classPrivateFieldGet(this,K).number(Object.is(e,-0)?"-0":e)]}formatPromise(){return["promise",_classPrivateFieldGet(this,K).argument("Promise {…}")]}formatRegexp(e){return["regexp "+e.flags,_classPrivateFieldGet(this,K).name(e)]}formatSet(e){return["set",this.toPrintable(e)]}formatString(e){const t=[...e],i=t.length,s=e.length;let a,r="";return _classPrivateFieldGet(this,Y)>0&&(r=s!==i?t.slice(0,_classPrivateFieldGet(this,Y)).join(""):e.slice(0,_classPrivateFieldGet(this,Y))),a=s===i?`${_classPrivateFieldGet(this,K).string(_classPrivateFieldGet(this,D))}${_classPrivateFieldGet(this,K).string(r||e)}${_classPrivateFieldGet(this,K).string(_classPrivateFieldGet(this,q))} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("length")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(s)}`:`${_classPrivateFieldGet(this,K).string(_classPrivateFieldGet(this,D))}${_classPrivateFieldGet(this,K).string(r||e)}${_classPrivateFieldGet(this,K).string(_classPrivateFieldGet(this,q))} ${_classPrivateFieldGet(this,K).plain("(")}${_classPrivateFieldGet(this,K).argument("length")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(s)}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("symbols")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(i)}`,a=i>_classPrivateFieldGet(this,Y)?`${a}${_classPrivateFieldGet(this,K).plain(",")} ${_classPrivateFieldGet(this,K).argument("shown")}${_classPrivateFieldGet(this,K).plain("=")}${_classPrivateFieldGet(this,K).number(_classPrivateFieldGet(this,Y))}${_classPrivateFieldGet(this,K).plain(")")}`:`${a}${_classPrivateFieldGet(this,K).plain(")")}`,function stringClearReference(e){return e.length<12?e:(" "+e).slice(1)}(r||e),["string",a]}formatSymbol(e){return["symbol",e.toString()]}formatUndefined(){return["empty",_classPrivateFieldGet(this,K).string("undefined")]}formatWeak(e){return e===k?["map weak",""]:["set weak",""]}formatAssign(e,t,i,s){let a;return"map"===e?`${t}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,R))}${s}${_classPrivateFieldGet(this,K).plain(",")}\n`:"set"===e?`${t}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,R))}${_classPrivateFieldGet(this,K).plain(_classPrivateFieldGet(this,N))} ${s}${_classPrivateFieldGet(this,K).plain(",")}\n`:(a=isInteger(i)||"array"===e&&"string"!=typeof i?`${_classPrivateFieldGet(this,K).plain("[")}${_classPrivateFieldGet(this,K).property(i)}${_classPrivateFieldGet(this,K).plain("]")}`:`${_classPrivateFieldGet(this,K).plain(_classPrivateFieldGet(this,D))}${_classPrivateFieldGet(this,K).property(i)}${_classPrivateFieldGet(this,K).plain(_classPrivateFieldGet(this,q))}`,`${t}${_classPrivateFieldGet(this,K).comment(_classPrivateFieldGet(this,R))}${a} ${_classPrivateFieldGet(this,K).plain(_classPrivateFieldGet(this,N))} ${s}${_classPrivateFieldGet(this,K).plain(",")}\n`)}log(e){if(_classPrivateFieldGet(this,O)&&(_classPrivateFieldGet(this,C)&&cliExit(),_classPrivateFieldGet(this,z)?setTimeout((()=>cliPrint(this.toPrintable(e),_classPrivateFieldGet(this,H))),0):cliPrint(this.toPrintable(e),_classPrivateFieldGet(this,H)),processExit(_classPrivateFieldGet(this,A))),_classPrivateFieldGet(this,U))return this.toPrintable(e)}static factory(e=!0,t){const i=Consono.createOptions(e),s=new Consono(i,t);return function consono(e){if(i.console&&(i.clear&&cliExit(),i.immediate?setTimeout((()=>cliPrint(s.toPrintable(e),i.stdout)),0):cliPrint(s.toPrintable(e),i.stdout),processExit(i.exit)),i.returns)return s.toPrintable(e)}}static createOptions(e=!0){const t={...i};return"boolean"==typeof e?t.console=e:e&&"object"==typeof e&&Object.assign(t,e),function objectPick(e,t){return t.length&&Object.keys(e).length?t.reduce(((t,i)=>(t[i]=e[i],t)),{}):{}}(t,s)}}function consono(e,t=!0,i="light"){const s=Consono.createOptions(t),a=new Consono(s,i);if(s.console&&(s.clear&&cliExit(),s.immediate?setTimeout((()=>cliPrint(a.toPrintable(e),s.stdout)),0):cliPrint(a.toPrintable(e),s.stdout),processExit(s.exit)),s.returns)return a.toPrintable(e)}function consonoExit(e,t=!0,i="light",s=0){const a=Consono.createOptions({...t,exit:s}),r=new Consono(a,i);if(a.console&&(a.clear&&cliExit(),a.immediate?setTimeout((()=>cliPrint(r.toPrintable(e),a.stdout)),0):cliPrint(r.toPrintable(e),a.stdout),processExit(a.exit)),a.returns)return r.toPrintable(e)}function consonoPlain(e,t=!0){const i=Consono.createOptions({...t,colorize:!1}),s=new Consono(i);if(i.console&&(i.clear&&cliExit(),i.immediate?setTimeout((()=>cliPrint(s.toPrintable(e),i.stdout)),0):cliPrint(s.toPrintable(e),i.stdout),processExit(i.exit)),i.returns)return s.toPrintable(e)}function consonoReturn(e,t=!0,i="light"){const s=Consono.createOptions({...t,console:!1,returns:!0}),a=new Consono(s,i);if(s.console&&(s.clear&&cliExit(),s.immediate?setTimeout((()=>cliPrint(a.toPrintable(e),s.stdout)),0):cliPrint(a.toPrintable(e),s.stdout),processExit(s.exit)),s.returns)return a.toPrintable(e)}export{Consono,x as THEME_DARK,M as THEME_LIGHT,consono,consonoExit,consonoPlain,consonoReturn,i as options};
//# sourceMappingURL=consono.node.mjs.map
