function _classPrivateFieldGet(e,t){return function _classApplyDescriptorGet(e,t){if(t.get)return t.get.call(e);return t.value}(e,_classExtractFieldDescriptor(e,t,"get"))}function _classPrivateFieldSet(e,t,i){return function _classApplyDescriptorSet(e,t,i){if(t.set)t.set.call(e,i);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=i}}(e,_classExtractFieldDescriptor(e,t,"set"),i),i}function _classExtractFieldDescriptor(e,t,i){if(!t.has(e))throw new TypeError("attempted to "+i+" private field on non-instance");return t.get(e)}const e={arrayMaxElements:99,assignSymbol:"→",clear:!1,colorize:!0,console:!0,depth:20,exit:!1,immediate:!1,indent:"ˑˑ",indentPad:1,mapMaxEntries:99,objectMaxProps:99,quotesEnd:'"',quotesStart:'"',returns:!0,setMaxValues:99,stdout:!1,stringMaxLength:360},t=["arrayMaxElements","assignSymbol","clear","colorize","console","depth","exit","indent","mapMaxEntries","objectMaxProps","quotesEnd","quotesStart","returns","setMaxValues","stdout","stringMaxLength"];var i="[object Arguments]",s="[object Array]",a="[object ArrayBuffer]",r="[object AsyncFunction]",l="[object BigInt]",n="[object Boolean]",o="[object Date]",c="[object Error]",h="[object Function]",d="[object Generator]",v="[object GeneratorFunction]",P="[object global]",u="[object Map]",m="[object Null]",p="[object Number]",F="[object Promise]",_="[object RegExp]",b="[object Set]",G="[object SharedArrayBuffer]",$="[object String]",f="[object Symbol]",g="[object Undefined]",y="[object WeakMap]",w="[object WeakSet]",k="[object Window]";const S={argument:"[31m",boolean:"[35m",comment:"[30m",keyword:"[34m",name:"[32m",number:"[35m",plain:"[30m",property:"[31m",string:"[32m"},j={argument:"[31m",boolean:"[35m",comment:"[37m",keyword:"[34m",name:"[32m",number:"[35m",plain:"[37m",property:"[31m",string:"[32m"};class Theme{constructor(e=3,t="light"){let i;switch(!0){case"dark"===t:i=j;break;case"light"===t:default:i=S}this.argument=e=>i.argument+e.toString()+"[0m",this.boolean=e=>i.boolean+e.toString()+"[0m",this.comment=e=>i.comment+e.toString()+"[0m",this.keyword=e=>i.keyword+e.toString()+"[0m",this.name=e=>i.name+e.toString()+"[0m",this.number=e=>i.number+e.toString()+"[0m",this.plain=e=>i.plain+e.toString()+"[0m",this.property=e=>i.property+e.toString()+"[0m",this.string=e=>i.string+e.toString()+"[0m"}}function cliExit(){if("clear"in console)try{console.clear()}catch(e){}else try{process.stdout.write("[2J[0;0H")}catch(e){}}function cliPrint(e){console.log(e)}function isInteger(e){return Number.isInteger(Number.parseInt(e))}function objectClass(e){return e&&"constructor"in e&&"name"in e.constructor?e.constructor.name:""}function prototypeName(e){return Object.prototype.toString.call(e)}function looseClone(e){if(null==e||"object"!=typeof e)return e;const t=new e.constructor;for(let i in e)t[i]=looseClone(e[i]);return t}function objectDeCycle(e){const t=[],i=[];return function deReCycle(a,r){let l,n,o;if(!("object"!=typeof a||null===a||a instanceof Boolean||a instanceof Date||a instanceof Number||a instanceof RegExp||a instanceof String)){for(l=0;l<t.length;l+=1)if(t[l]===a)return{"&circularReference":i[l]};if(t.push(a),i.push(r),prototypeName(a)===s)for(o=[],l=0;l<a.length;l+=1)o[l]=deReCycle(a[l],`${r}["${l}"]`);else for(n in o=Object.isFrozen(e)?looseClone(e):Object.create(e),a)Object.prototype.hasOwnProperty.call(a,n)&&(o[n]=deReCycle(a[n],`${r}[${JSON.stringify(n)}]`));return o}return a}(e,"&")}function objectSize(e){return Object.keys(e).length}function objectType(e){const t=prototypeName(e).toLowerCase().split("[object ").pop().split("]").shift();return["global","window"].includes(t)?"object":t.includes("error")?"error":t}function processExit(e=0){if(!1===e)return;!0===e&&(e=0);const t=Number.parseInt(e.toString());if(Number.isInteger(t)&&!(t<0))try{process.exit(t)}catch(e){}}var x=new WeakMap,E=new WeakMap,M=new WeakMap,N=new WeakMap,O=new WeakMap,C=new WeakMap,W=new WeakMap,I=new WeakMap,A=new WeakMap,T=new WeakMap,z=new WeakMap,B=new WeakMap,D=new WeakMap,R=new WeakMap,V=new WeakMap,J=new WeakMap,L=new WeakMap,q=new WeakMap,U=new WeakMap,H=new WeakMap;class Consono{constructor(e={},t="light"){x.set(this,{writable:!0,value:void 0}),E.set(this,{writable:!0,value:void 0}),M.set(this,{writable:!0,value:void 0}),N.set(this,{writable:!0,value:void 0}),O.set(this,{writable:!0,value:void 0}),C.set(this,{writable:!0,value:void 0}),W.set(this,{writable:!0,value:void 0}),I.set(this,{writable:!0,value:void 0}),A.set(this,{writable:!0,value:void 0}),T.set(this,{writable:!0,value:void 0}),z.set(this,{writable:!0,value:void 0}),B.set(this,{writable:!0,value:void 0}),D.set(this,{writable:!0,value:void 0}),R.set(this,{writable:!0,value:void 0}),V.set(this,{writable:!0,value:void 0}),J.set(this,{writable:!0,value:void 0}),L.set(this,{writable:!0,value:void 0}),q.set(this,{writable:!0,value:void 0}),U.set(this,{writable:!0,value:void 0}),H.set(this,{writable:!0,value:void 0}),this.setOptions(e),this.setTheme(t)}setTheme(e){_classPrivateFieldSet(this,H,new Theme(_classPrivateFieldGet(this,N)?3:0,e))}setOptions(t={}){t=t||{};const i={...e,...t};_classPrivateFieldSet(this,x,Number.parseInt(i.arrayMaxElements)),_classPrivateFieldSet(this,E,`${i.assignSymbol}`),_classPrivateFieldSet(this,M,!!i.clear),_classPrivateFieldSet(this,N,!!i.colorize),_classPrivateFieldSet(this,O,!!i.console),_classPrivateFieldSet(this,q,!!i.stdout),_classPrivateFieldSet(this,C,0),_classPrivateFieldSet(this,W,Number.parseInt(i.depth)),!1===i.exit?_classPrivateFieldSet(this,I,!1):!0===i.exit?_classPrivateFieldSet(this,I,0):isInteger(i.exit)?_classPrivateFieldSet(this,I,i.exit):_classPrivateFieldSet(this,I,!1),_classPrivateFieldSet(this,T,`${i.indent}`),_classPrivateFieldSet(this,z,_classPrivateFieldGet(this,T).repeat(i.indentPad)),_classPrivateFieldSet(this,B,Number.parseInt(i.mapMaxEntries)),_classPrivateFieldSet(this,D,Number.parseInt(i.objectMaxProps)),_classPrivateFieldSet(this,R,`${i.quotesEnd}`),_classPrivateFieldSet(this,V,`${i.quotesStart}`),_classPrivateFieldSet(this,J,!!i.returns),_classPrivateFieldSet(this,A,!!i.immediate),_classPrivateFieldSet(this,L,Number.parseInt(i.setMaxValues)),_classPrivateFieldSet(this,U,Number.parseInt(i.stringMaxLength))}toPrintable(e,t="",i=!0,s=""){let a,r="",l="",n="";const o=objectType(e);switch(o){case"array":{const i=e.length;l=i>_classPrivateFieldGet(this,x)?`${_classPrivateFieldGet(this,H).keyword("array")}${s.length?` ${_classPrivateFieldGet(this,H).keyword(s)}`:""} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("elements")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(",")} ${_classPrivateFieldGet(this,H).argument("shown")}=${_classPrivateFieldGet(this,H).number(_classPrivateFieldGet(this,x))}${_classPrivateFieldGet(this,H).plain(")")} ${_classPrivateFieldGet(this,H).plain("[")}\n`:`${_classPrivateFieldGet(this,H).keyword("array")}${s.length?` ${_classPrivateFieldGet(this,H).keyword(s)}`:""} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("elements")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(")")} ${_classPrivateFieldGet(this,H).plain("[")}\n`,n=`${t}${_classPrivateFieldGet(this,H).plain("]")}`,a=_classPrivateFieldGet(this,x);break}case"object":{const s=e;if(e=objectDeCycle(e),!0===i){const i=objectSize(e);let a="";a=i>_classPrivateFieldGet(this,D)?`${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("props")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(",")} ${_classPrivateFieldGet(this,H).argument("shown")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(_classPrivateFieldGet(this,D))}${_classPrivateFieldGet(this,H).plain(")")}`:`${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("props")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(")")}`,l=`${_classPrivateFieldGet(this,H).keyword("object")} ${_classPrivateFieldGet(this,H).keyword(objectClass(s))} ${a} ${_classPrivateFieldGet(this,H).plain("{")}\n`,n=`${t}${_classPrivateFieldGet(this,H).plain("}")}`}else l=`${_classPrivateFieldGet(this,H).plain("(")}\n`,n=`${t}${_classPrivateFieldGet(this,H).plain(")")}`;a=_classPrivateFieldGet(this,D);break}case"arguments":{const i=e.length;l=i>_classPrivateFieldGet(this,x)?`${_classPrivateFieldGet(this,H).keyword("arguments")} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("arity")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}, ${_classPrivateFieldGet(this,H).argument("shown")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(_classPrivateFieldGet(this,x))}${_classPrivateFieldGet(this,H).plain(")")} ${_classPrivateFieldGet(this,H).plain("[")}\n`:`${_classPrivateFieldGet(this,H).keyword("arguments")} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("arity")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(")")} ${_classPrivateFieldGet(this,H).plain("[")}\n`,n=`${t}${_classPrivateFieldGet(this,H).plain("]")}`,a=_classPrivateFieldGet(this,x);break}case"set":{const i=e.size;l=i>_classPrivateFieldGet(this,L)?`${_classPrivateFieldGet(this,H).keyword("set")} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("size")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(",")} ${_classPrivateFieldGet(this,H).argument("shown")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(_classPrivateFieldGet(this,L))}${_classPrivateFieldGet(this,H).plain(")")} ${_classPrivateFieldGet(this,H).plain("{")}\n`:`${_classPrivateFieldGet(this,H).keyword("set")} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("size")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(")")} ${_classPrivateFieldGet(this,H).plain("{")}\n`,n=`${t}}`,a=_classPrivateFieldGet(this,L);break}case"map":{const i=e.size;l=i>_classPrivateFieldGet(this,B)?`${_classPrivateFieldGet(this,H).keyword("map")} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("size")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(",")} ${_classPrivateFieldGet(this,H).argument("shown")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(_classPrivateFieldGet(this,B))}${_classPrivateFieldGet(this,H).plain(")")} ${_classPrivateFieldGet(this,H).plain("{")}\n`:`${_classPrivateFieldGet(this,H).keyword("map")} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("size")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}${_classPrivateFieldGet(this,H).plain(")")} ${_classPrivateFieldGet(this,H).plain("{")}\n`,n=`${t}${_classPrivateFieldGet(this,H).plain("}")}`,a=_classPrivateFieldGet(this,B);break}default:return this.formatValue(t,e)}let c=0;switch(o){case"set":{const i=Array.from(e);for(let e=0;e<i.length;e++){const s=i[e],l=this.formatValue(t,s);if(r+=this.formatAssign("set",t,e,l),c+=1,c>=a)break}break}case"map":for(const i of e.entries()){const[e,s]=i,l=this.formatValue(t,{key:e,value:s},!1);if(r+=this.formatAssign("map",t,e,l),c+=1,c>=a)break}break;default:{const i=Object.keys(e).sort(((e,t)=>e.localeCompare(t))).reduce(((e,t)=>(e[t]=void 0,e)),{});for(const s in i){if(!Object.prototype.hasOwnProperty.call(e,s))continue;const i=e[s],l=objectType(i),n=this.formatValue(t,i);if(r+=this.formatAssign(l,t,s,n),c+=1,c>=a)break}break}}return`${l}${r}${n}`}formatValue(e,t,s=!0){let S="",j=objectType(t),x="";const E=prototypeName(t);switch(E){case g:[j,S]=this.formatUndefined();break;case m:[j,S]=this.formatNull();break;case P:case k:[j,S]=this.formatGlobal(E,t,e);break;case l:[j,S]=this.formatBigInt(t);break;case p:[j,S]=this.formatNumber(t);break;case n:[j,S]=this.formatBoolean(t);break;case $:[j,S]=this.formatString(t);break;case _:[j,S]=this.formatRegexp(t);break;case h:case r:case v:[j,S]=this.formatFunction(E,t);break;case o:[j,S]=this.formatDate(t);break;case i:[j,S]=this.formatArguments(t);break;case f:[j,S]=this.formatSymbol(t);break;case F:[j,S]=this.formatPromise();break;case d:[j,S]=this.formatGenerator();break;case c:[j,S]=this.formatError(t);break;case w:case y:[j,S]=this.formatWeak(E);break;case b:[j,S]=this.formatSet(t);break;case u:[j,S]=this.formatMap(t);break;case a:case G:[j,S]=this.formatBuffer(E,t);break;default:if(E.includes("Array"))j="array",x=objectClass(t).toLowerCase(),t=Array.from(t);else if(E.includes("Iterator]")){const i=E.split(" ")[1];if("Set"===i)return this.toPrintable(new Set(Array.from(t).map((e=>e[1]))),e,s);if("Map"===i)return this.toPrintable(new Map(Array.from(t)),e,s);if("String"===i)return this.toPrintable(Array.from(t).map((e=>e[1])).join(""),e,s);if("Array"===i)return this.toPrintable(Array.from(t).map((e=>e[1])),e,s)}}switch(j){case"array":case"object":if(_classPrivateFieldGet(this,C)===_classPrivateFieldGet(this,W)){const e=objectSize(t);let i="";i=e>_classPrivateFieldGet(this,D)?`${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("props")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(e)}${_classPrivateFieldGet(this,H).plain(",")} ${_classPrivateFieldGet(this,H).argument("shown")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(_classPrivateFieldGet(this,D))}${_classPrivateFieldGet(this,H).plain(")")}`:`${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("props")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(e)}${_classPrivateFieldGet(this,H).plain(")")}`,S=`${_classPrivateFieldGet(this,H).keyword("object")} ${_classPrivateFieldGet(this,H).keyword(objectClass(t))} ${i}`}else{let i;_classPrivateFieldSet(this,C,_classPrivateFieldGet(this,C)+1),i="array"===j?`${_classPrivateFieldGet(this,H).comment(e)}`:`${e}${_classPrivateFieldGet(this,H).comment(_classPrivateFieldGet(this,z))}`,S=this.toPrintable(t,i,s,x),_classPrivateFieldSet(this,C,_classPrivateFieldGet(this,C)-1)}break;default:j.length||(j=E.split("[object ").pop().split("]").shift().toLowerCase(),S=t.toString())}return`${_classPrivateFieldGet(this,H).keyword(j)}${j.length?_classPrivateFieldGet(this,H).plain(" • "):""}${S}`}formatArguments(e){return["arguments",this.toPrintable(e)]}formatBigInt(e){return["number bigint",_classPrivateFieldGet(this,H).number(e)]}formatBoolean(e){return["boolean",_classPrivateFieldGet(this,H).boolean(e)]}formatBuffer(e,t){return["array buffer",`${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("bytes")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(t.byteLength)}${_classPrivateFieldGet(this,H).plain(")")}`]}formatDate(e){return["date",_classPrivateFieldGet(this,H).name(e.toISOString()+" • "+e.toString())]}formatError(e){return[`error ${objectClass(e)}`,_classPrivateFieldGet(this,H).string(e.message)]}formatFunction(e,t){let i="function";switch(e){case r:i=`${i} async`;break;case v:i=`${i} generator`}const s=function funcNameExtract(e){if(e.name)return e.name;const t=/^function\s+([\w]+)\s*\(/.exec(e.toString());return t?t[1]:""}(t);i=s.length?`${i} ${_classPrivateFieldGet(this,H).name(s)}`:`${i} anonymous`;const a=`${t}`.replace(/\n+/g,"").split(")").shift()+") {…}";return[i,_classPrivateFieldGet(this,H).argument(a)]}formatGenerator(){return["generator",_classPrivateFieldGet(this,H).argument("Generator {…}")]}formatGlobal(e,t,i){return["global "+(e===k?"window":"this"),this.toPrintable({...t},`${i}${_classPrivateFieldGet(this,H).comment(_classPrivateFieldGet(this,z))}`)]}formatMap(e){return["map",this.toPrintable(e)]}formatNull(){return["empty",_classPrivateFieldGet(this,H).string("null")]}formatNumber(e){let t;return Number.isFinite(e)?t=Number.isInteger(e)?0===e?Object.is(e,-0)?"number negative zero":"number zero":"number integer":"number float":(t="number",Number.isNaN(e)?t+=" nan":e===Number.POSITIVE_INFINITY?t+=" positive infinity":t+=" negative infinity"),[t,_classPrivateFieldGet(this,H).number(Object.is(e,-0)?"-0":e)]}formatPromise(){return["promise",_classPrivateFieldGet(this,H).argument("Promise {…}")]}formatRegexp(e){return[`regexp ${e.flags}`,_classPrivateFieldGet(this,H).name(e)]}formatSet(e){return["set",this.toPrintable(e)]}formatString(e){const t=[...e],i=t.length,s=e.length;let a,r="";return _classPrivateFieldGet(this,U)>0&&(r=s!==i?t.slice(0,_classPrivateFieldGet(this,U)).join(""):e.slice(0,_classPrivateFieldGet(this,U))),a=s===i?`${_classPrivateFieldGet(this,H).string(_classPrivateFieldGet(this,V))}${_classPrivateFieldGet(this,H).string(r||e)}${_classPrivateFieldGet(this,H).string(_classPrivateFieldGet(this,R))} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("length")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(s)}`:`${_classPrivateFieldGet(this,H).string(_classPrivateFieldGet(this,V))}${_classPrivateFieldGet(this,H).string(r||e)}${_classPrivateFieldGet(this,H).string(_classPrivateFieldGet(this,R))} ${_classPrivateFieldGet(this,H).plain("(")}${_classPrivateFieldGet(this,H).argument("length")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(s)}${_classPrivateFieldGet(this,H).plain(",")} ${_classPrivateFieldGet(this,H).argument("symbols")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(i)}`,a=i>_classPrivateFieldGet(this,U)?`${a}${_classPrivateFieldGet(this,H).plain(",")} ${_classPrivateFieldGet(this,H).argument("shown")}${_classPrivateFieldGet(this,H).plain("=")}${_classPrivateFieldGet(this,H).number(_classPrivateFieldGet(this,U))}${_classPrivateFieldGet(this,H).plain(")")}`:`${a}${_classPrivateFieldGet(this,H).plain(")")}`,function stringClearReference(e){return e.length<12?e:(" "+e).slice(1)}(r||e),["string",a]}formatSymbol(e){return["symbol",e.toString()]}formatUndefined(){return["empty",_classPrivateFieldGet(this,H).string("undefined")]}formatWeak(e){return e===y?["map weak",""]:["set weak",""]}formatAssign(e,t,i,s){let a;return"map"===e?`${t}${_classPrivateFieldGet(this,H).comment(_classPrivateFieldGet(this,z))}${s}${_classPrivateFieldGet(this,H).plain(",")}\n`:"set"===e?`${t}${_classPrivateFieldGet(this,H).comment(_classPrivateFieldGet(this,z))}${_classPrivateFieldGet(this,H).plain(_classPrivateFieldGet(this,E))} ${s}${_classPrivateFieldGet(this,H).plain(",")}\n`:(a=isInteger(i)||"array"===e&&"string"!=typeof i?`${_classPrivateFieldGet(this,H).plain("[")}${_classPrivateFieldGet(this,H).property(i)}${_classPrivateFieldGet(this,H).plain("]")}`:`${_classPrivateFieldGet(this,H).plain(_classPrivateFieldGet(this,V))}${_classPrivateFieldGet(this,H).property(i)}${_classPrivateFieldGet(this,H).plain(_classPrivateFieldGet(this,R))}`,`${t}${_classPrivateFieldGet(this,H).comment(_classPrivateFieldGet(this,z))}${a} ${_classPrivateFieldGet(this,H).plain(_classPrivateFieldGet(this,E))} ${s}${_classPrivateFieldGet(this,H).plain(",")}\n`)}log(e){if(_classPrivateFieldGet(this,O)&&(_classPrivateFieldGet(this,M)&&cliExit(),_classPrivateFieldGet(this,A)?setTimeout((()=>cliPrint(this.toPrintable(e))),0):cliPrint(this.toPrintable(e)),processExit(_classPrivateFieldGet(this,I))),_classPrivateFieldGet(this,J))return this.toPrintable(e)}static factory(e=!0,t){const i=Consono.createOptions(e),s=new Consono(i,t);return function consono(e){if(i.console&&(i.clear&&cliExit(),i.immediate?setTimeout((()=>cliPrint(s.toPrintable(e))),0):cliPrint(s.toPrintable(e)),processExit(i.exit)),i.returns)return s.toPrintable(e)}}static createOptions(i=!0){const s={...e};return"boolean"==typeof i?s.console=i:i&&"object"==typeof i&&Object.assign(s,i),function objectPick(e,t){return t.length&&Object.keys(e).length?t.reduce(((t,i)=>(t[i]=e[i],t)),{}):{}}(s,t)}}const Y={argument:[253,151,31],boolean:[174,129,255],comment:[117,113,94],keyword:[249,38,114],name:[230,219,116],number:[174,129,255],plain:[128,128,128],property:[102,217,239],string:[166,226,46]},K={argument:[245,135,31],boolean:[66,113,174],comment:[117,113,94],keyword:[200,40,41],name:[201,159,0],number:[101,67,133],plain:[128,128,128],property:[32,123,129],string:[113,140,0]};function consono(e,t=!0,i="light"){const s=Consono.createOptions(t),a=new Consono(s,i);if(s.console&&(s.clear&&cliExit(),s.immediate?setTimeout((()=>cliPrint(a.toPrintable(e))),0):cliPrint(a.toPrintable(e)),processExit(s.exit)),s.returns)return a.toPrintable(e)}function consonoExit(e,t=!0,i="light",s=0){const a=Consono.createOptions({...t,exit:s}),r=new Consono(a,i);if(a.console&&(a.clear&&cliExit(),a.immediate?setTimeout((()=>cliPrint(r.toPrintable(e))),0):cliPrint(r.toPrintable(e)),processExit(a.exit)),a.returns)return r.toPrintable(e)}function consonoJSON(e,t=!0){let i;i=void 0===e?void 0:JSON.parse(JSON.stringify(e),null,2);const s=Consono.createOptions({...t});if(s.console&&(s.clear&&cliExit(),s.immediate?setTimeout((()=>{void 0===i?console.dir(void 0):console.dir(i)}),0):void 0===i?console.dir(void 0):console.dir(i),processExit(s.exit)),s.returns)return i}function consonoOut(e,t){let i;i=void 0===e?void 0:JSON.parse(JSON.stringify(e),null,2);const s=Consono.createOptions({...t});if(s.console&&(s.clear&&cliExit(),s.immediate?setTimeout((()=>{void 0===i?process.stdout.write(void 0):process.stdout.write(i),process.stdout.write("\n")}),0):(void 0===i?process.stdout.write(void 0):process.stdout.write(i),process.stdout.write("\n")),processExit(s.exit)),s.returns)return i}function consonoPlain(e,t=!0){const i=Consono.createOptions({...t,colorize:!1}),s=new Consono(i);if(i.console&&(i.clear&&cliExit(),i.immediate?setTimeout((()=>cliPrint(s.toPrintable(e))),0):cliPrint(s.toPrintable(e)),processExit(i.exit)),i.returns)return s.toPrintable(e)}function consonoReturn(e,t=!0,i="light"){const s=Consono.createOptions({...t,console:!1,returns:!0}),a=new Consono(s,i);if(s.console&&(s.clear&&cliExit(),s.immediate?setTimeout((()=>cliPrint(a.toPrintable(e))),0):cliPrint(a.toPrintable(e)),processExit(s.exit)),s.returns)return a.toPrintable(e)}export{Consono,Y as THEME_DARK,K as THEME_LIGHT,consono,consonoExit,consonoJSON,consonoOut,consonoPlain,consonoReturn,e as options};
//# sourceMappingURL=consono.browser.mjs.map
