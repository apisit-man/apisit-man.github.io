(()=>{var sn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},rn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Zc=0,ml=1,Jc=2;var $s=1,Ma=2,es=3,Li=0,Ve=1,He=2,bi=0,Di=1,gl=2,xl=3,_l=4,Kc=5;var $i=100,jc=101,Qc=102,th=103,eh=104,ih=200,nh=201,sh=202,rh=203,Fr=204,Nr=205,ah=206,oh=207,lh=208,ch=209,hh=210,uh=211,dh=212,fh=213,ph=214,Ur=0,Br=1,Or=2,_n=3,zr=4,kr=5,Vr=6,Hr=7,yl=0,mh=1,gh=2,di=0,vl=1,Ml=2,bl=3,Zs=4,Sl=5,El=6,Tl=7;var wl=300,an=301,Tn=302,is=303,ba=304,Js=306,Ke=1e3,yi=1001,Gr=1002,Ie=1003,xh=1004;var Ks=1005;var Se=1006,Sa=1007;var on=1008;var Xe=1009,Al=1010,Cl=1011,ns=1012,Ea=1013,fi=1014,pi=1015,Si=1016,Ta=1017,wa=1018,ss=1020,Rl=35902,Pl=35899,Il=1021,Ll=1022,ai=1023,vi=1026,ln=1027,Dl=1028,Aa=1029,cn=1030,Ca=1031;var Ra=1033,js=33776,Qs=33777,tr=33778,er=33779,Pa=35840,Ia=35841,La=35842,Da=35843,Fa=36196,Na=37492,Ua=37496,Ba=37488,Oa=37489,ir=37490,za=37491,ka=37808,Va=37809,Ha=37810,Ga=37811,Wa=37812,Xa=37813,qa=37814,Ya=37815,$a=37816,Za=37817,Ja=37818,Ka=37819,ja=37820,Qa=37821,to=36492,eo=36494,io=36495,no=36283,so=36284,nr=36285,ro=36286;var vs=2300,Wr=2301,Dr=2302,nl=2303,sl=2400,rl=2401,al=2402;var _h=3200;var ao=0,yh=1,Bi="",Je="srgb",Ms="srgb-linear",bs="linear",Kt="srgb";var gn=7680;var ol=519,vh=512,Mh=513,bh=514,oo=515,Sh=516,Eh=517,lo=518,Th=519,ll=35044;var Fl="300 es",hi=2e3,Xn=2001;function yu(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function vu(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ss(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function wh(){let s=Ss("canvas");return s.style.display="block",s}var yc={},qn=null;function Nl(...s){let t="THREE."+s.shift();qn?qn("log",t,...s):console.log(t,...s)}function Ah(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function At(...s){s=Ah(s);let t="THREE."+s.shift();if(qn)qn("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Nt(...s){s=Ah(s);let t="THREE."+s.shift();if(qn)qn("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function xn(...s){let t=s.join(" ");t in yc||(yc[t]=!0,At(...s))}function Ch(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Rh={[Ur]:Br,[Or]:Vr,[zr]:Hr,[_n]:kr,[Br]:Ur,[Vr]:Or,[Hr]:zr,[kr]:_n},ui=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let n=i[t];if(n!==void 0){let r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vc=1234567,gs=Math.PI/180,yn=180/Math.PI;function rs(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function Ht(s,t,e){return Math.max(t,Math.min(e,s))}function Ul(s,t){return(s%t+t)%t}function Mu(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function bu(s,t,e){return s!==t?(e-s)/(t-s):0}function xs(s,t,e){return(1-e)*s+e*t}function Su(s,t,e,i){return xs(s,t,1-Math.exp(-e*i))}function Eu(s,t=1){return t-Math.abs(Ul(s,t*2)-t)}function Tu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function wu(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Au(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Cu(s,t){return s+Math.random()*(t-s)}function Ru(s){return s*(.5-Math.random())}function Pu(s){s!==void 0&&(vc=s);let t=vc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Iu(s){return s*gs}function Lu(s){return s*yn}function Du(s){return(s&s-1)===0&&s!==0}function Fu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Nu(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Uu(s,t,e,i,n){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),f=r((t-i)/2),u=a((t-i)/2),d=r((i-t)/2),g=a((i-t)/2);switch(n){case"XYX":s.set(o*h,l*f,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*f,o*c);break;case"ZXZ":s.set(l*f,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*d,o*c);break;case"YXY":s.set(l*d,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*d,o*h,o*c);break;default:At("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function Gn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Oe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Bl={DEG2RAD:gs,RAD2DEG:yn,generateUUID:rs,clamp:Ht,euclideanModulo:Ul,mapLinear:Mu,inverseLerp:bu,lerp:xs,damp:Su,pingpong:Eu,smoothstep:Tu,smootherstep:wu,randInt:Au,randFloat:Cu,randFloatSpread:Ru,seededRandom:Pu,degToRad:Iu,radToDeg:Lu,isPowerOfTwo:Du,ceilPowerOfTwo:Fu,floorPowerOfTwo:Nu,setQuaternionFromProperEuler:Uu,normalize:Oe,denormalize:Gn},xt=class s{static{s.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},je=class{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],f=i[n+3],u=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(f!==_||l!==u||c!==d||h!==g){let m=l*u+c*d+h*g+f*_;m<0&&(u=-u,d=-d,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){let M=Math.acos(m),b=Math.sin(M);p=Math.sin(p*M)/b,o=Math.sin(o*M)/b,l=l*p+u*o,c=c*p+d*o,h=h*p+g*o,f=f*p+_*o}else{l=l*p+u*o,c=c*p+d*o,h=h*p+g*o,f=f*p+_*o;let M=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=M,c*=M,h*=M,f*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,n,r,a){let o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],f=r[a],u=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*f+l*d-c*u,t[e+1]=l*g+h*u+c*f-o*d,t[e+2]=c*g+h*d+o*u-l*f,t[e+3]=h*g-o*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),f=o(r/2),u=l(i/2),d=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:At("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=i+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-n)*d}else if(i>o&&i>f){let d=2*Math.sqrt(1+i-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(n+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-i-f);this._w=(r-c)/d,this._x=(n+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-i-o);this._w=(a-n)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class s{static{s.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Mc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Mc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),h=2*(o*e-r*n),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*h,this.y=i+l*h+o*c-r*f,this.z=n+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Io.copy(this).projectOnVector(t),this.sub(Io)}reflect(t){return this.sub(Io.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Io=new R,Mc=new je,Bt=class s{static{s.prototype.isMatrix3=!0}constructor(t,e,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c)}set(t,e,i,n,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],d=i[5],g=i[8],_=n[0],m=n[3],p=n[6],M=n[1],b=n[4],v=n[7],T=n[2],S=n[5],A=n[8];return r[0]=a*_+o*M+l*T,r[3]=a*m+o*b+l*S,r[6]=a*p+o*v+l*A,r[1]=c*_+h*M+f*T,r[4]=c*m+h*b+f*S,r[7]=c*p+h*v+f*A,r[2]=u*_+d*M+g*T,r[5]=u*m+d*b+g*S,r[8]=u*p+d*v+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,g=e*f+i*u+n*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(n*c-h*i)*_,t[2]=(o*i-n*a)*_,t[3]=u*_,t[4]=(h*e-n*l)*_,t[5]=(n*r-o*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return xn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Lo.makeScale(t,e)),this}rotate(t){return xn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Lo.makeRotation(-t)),this}translate(t,e){return xn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Lo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Lo=new Bt,bc=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sc=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bu(){let s={enabled:!0,workingColorSpace:Ms,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Kt&&(n.r=Ii(n.r),n.g=Ii(n.g),n.b=Ii(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Kt&&(n.r=Wn(n.r),n.g=Wn(n.g),n.b=Wn(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Bi?bs:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return xn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return xn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Ms]:{primaries:t,whitePoint:i,transfer:bs,toXYZ:bc,fromXYZ:Sc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Je},outputColorSpaceConfig:{drawingBufferColorSpace:Je}},[Je]:{primaries:t,whitePoint:i,transfer:Kt,toXYZ:bc,fromXYZ:Sc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Je}}}),s}var Zt=Bu();function Ii(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Wn(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var In,Xr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{In===void 0&&(In=Ss("canvas")),In.width=t.width,In.height=t.height;let n=In.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=In}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ss("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Ii(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ii(e[i]/255)*255):e[i]=Ii(e[i]);return{data:e,width:t.width,height:t.height}}else return At("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Ou=0,Yn=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=rs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Do(n[a].image)):r.push(Do(n[a]))}else r=Do(n);i.url=r}return e||(t.images[this.uuid]=i),i}};function Do(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Xr.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(At("Texture: Unable to serialize Texture."),{})}var zu=0,Fo=new R,ze=class s extends ui{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,i=yi,n=yi,r=Se,a=on,o=ai,l=Xe,c=s.DEFAULT_ANISOTROPY,h=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=rs(),this.name="",this.source=new Yn(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fo).x}get height(){return this.source.getSize(Fo).y}get depth(){return this.source.getSize(Fo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){At(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){At(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ke:t.x=t.x-Math.floor(t.x);break;case yi:t.x=t.x<0?0:1;break;case Gr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ke:t.y=t.y-Math.floor(t.y);break;case yi:t.y=t.y<0?0:1;break;case Gr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=wl;ze.DEFAULT_ANISOTROPY=1;var ce=class s{static{s.prototype.isVector4=!0}constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,v=(d+1)/2,T=(p+1)/2,S=(h+u)/4,A=(f+_)/4,x=(g+m)/4;return b>v&&b>T?b<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(b),n=S/i,r=A/i):v>T?v<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(v),i=S/n,r=x/n):T<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(T),i=A/r,n=x/r),this.set(i,n,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(u-h)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qr=class extends ui{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Se,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e),this.textures=[];let n={width:t,height:e,depth:i.depth},r=new ze(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Se,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let n=Object.assign({},t.textures[e].image);this.textures[e].source=new Yn(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qe=class extends qr{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Es=class extends ze{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Yr=class extends ze{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ae=class s{static{s.prototype.isMatrix4=!0}constructor(t,e,i,n,r,a,o,l,c,h,f,u,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c,h,f,u,d,g,_,m)}set(t,e,i,n,r,a,o,l,c,h,f,u,d,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,n=1/Ln.setFromMatrixColumn(t,0).length(),r=1/Ln.setFromMatrixColumn(t,1).length(),a=1/Ln.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=a*h,d=a*f,g=o*h,_=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,g=c*h,_=c*f;e[0]=u+_*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=_+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,g=c*h,_=c*f;e[0]=u-_*o,e[4]=-a*f,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=_-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,d=a*f,g=o*h,_=o*f;e[0]=l*h,e[4]=g*c-d,e[8]=u*c+_,e[1]=l*f,e[5]=_*c+u,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*f,e[8]=g*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*f+g,e[10]=u-_*f}else if(t.order==="XZY"){let u=a*l,d=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+_,e[5]=a*h,e[9]=d*f-g,e[2]=g*f-d,e[6]=o*h,e[10]=_*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ku,t,Vu)}lookAt(t,e,i){let n=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),Vi.crossVectors(i,$e),Vi.lengthSq()===0&&(Math.abs(i.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),Vi.crossVectors(i,$e)),Vi.normalize(),cr.crossVectors($e,Vi),n[0]=Vi.x,n[4]=cr.x,n[8]=$e.x,n[1]=Vi.y,n[5]=cr.y,n[9]=$e.y,n[2]=Vi.z,n[6]=cr.z,n[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],M=i[3],b=i[7],v=i[11],T=i[15],S=n[0],A=n[4],x=n[8],w=n[12],P=n[1],I=n[5],L=n[9],W=n[13],k=n[2],D=n[6],F=n[10],U=n[14],V=n[3],J=n[7],et=n[11],rt=n[15];return r[0]=a*S+o*P+l*k+c*V,r[4]=a*A+o*I+l*D+c*J,r[8]=a*x+o*L+l*F+c*et,r[12]=a*w+o*W+l*U+c*rt,r[1]=h*S+f*P+u*k+d*V,r[5]=h*A+f*I+u*D+d*J,r[9]=h*x+f*L+u*F+d*et,r[13]=h*w+f*W+u*U+d*rt,r[2]=g*S+_*P+m*k+p*V,r[6]=g*A+_*I+m*D+p*J,r[10]=g*x+_*L+m*F+p*et,r[14]=g*w+_*W+m*U+p*rt,r[3]=M*S+b*P+v*k+T*V,r[7]=M*A+b*I+v*D+T*J,r[11]=M*x+b*L+v*F+T*et,r[15]=M*w+b*W+v*U+T*rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15],M=l*d-c*u,b=o*d-c*f,v=o*u-l*f,T=a*d-c*h,S=a*u-l*h,A=a*f-o*h;return e*(_*M-m*b+p*v)-i*(g*M-m*T+p*S)+n*(g*b-_*T+p*A)-r*(g*v-_*S+m*A)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+n*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=e*o-i*a,b=e*l-n*a,v=e*c-r*a,T=i*l-n*o,S=i*c-r*o,A=n*c-r*l,x=h*_-f*g,w=h*m-u*g,P=h*p-d*g,I=f*m-u*_,L=f*p-d*_,W=u*p-d*m,k=M*W-b*L+v*I+T*P-S*w+A*x;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/k;return t[0]=(o*W-l*L+c*I)*D,t[1]=(n*L-i*W-r*I)*D,t[2]=(_*A-m*S+p*T)*D,t[3]=(u*S-f*A-d*T)*D,t[4]=(l*P-a*W-c*w)*D,t[5]=(e*W-n*P+r*w)*D,t[6]=(m*v-g*A-p*b)*D,t[7]=(h*A-u*v+d*b)*D,t[8]=(a*L-o*P+c*x)*D,t[9]=(i*P-e*L-r*x)*D,t[10]=(g*S-_*v+p*M)*D,t[11]=(f*v-h*S-d*M)*D,t[12]=(o*w-a*I-l*x)*D,t[13]=(e*I-i*w+n*x)*D,t[14]=(_*b-g*T-m*M)*D,t[15]=(h*T-f*b+u*M)*D,this}scale(t){let e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){let n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,g=r*f,_=a*h,m=a*f,p=o*f,M=l*c,b=l*h,v=l*f,T=i.x,S=i.y,A=i.z;return n[0]=(1-(_+p))*T,n[1]=(d+v)*T,n[2]=(g-b)*T,n[3]=0,n[4]=(d-v)*S,n[5]=(1-(u+p))*S,n[6]=(m+M)*S,n[7]=0,n[8]=(g+b)*A,n[9]=(m-M)*A,n[10]=(1-(u+_))*A,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){let n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Ln.set(n[0],n[1],n[2]).length(),o=Ln.set(n[4],n[5],n[6]).length(),l=Ln.set(n[8],n[9],n[10]).length();r<0&&(a=-a),oi.copy(this);let c=1/a,h=1/o,f=1/l;return oi.elements[0]*=c,oi.elements[1]*=c,oi.elements[2]*=c,oi.elements[4]*=h,oi.elements[5]*=h,oi.elements[6]*=h,oi.elements[8]*=f,oi.elements[9]*=f,oi.elements[10]*=f,e.setFromRotationMatrix(oi),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,n,r,a,o=hi,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(i-n),u=(e+t)/(e-t),d=(i+n)/(i-n),g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===hi)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Xn)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=hi,l=!1){let c=this.elements,h=2/(e-t),f=2/(i-n),u=-(e+t)/(e-t),d=-(i+n)/(i-n),g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===hi)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Xn)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ln=new R,oi=new ae,ku=new R(0,0,0),Vu=new R(1,1,1),Vi=new R,cr=new R,$e=new R,Ec=new ae,Tc=new je,ti=class s{constructor(t=0,e=0,i=0,n=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],f=n[2],u=n[6],d=n[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:At("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Ec.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ec,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Tc.setFromEuler(this),this.setFromQuaternion(Tc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ti.DEFAULT_ORDER="XYZ";var Ts=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Hu=0,wc=new R,Dn=new je,wi=new ae,hr=new R,us=new R,Gu=new R,Wu=new je,Ac=new R(1,0,0),Cc=new R(0,1,0),Rc=new R(0,0,1),Pc={type:"added"},Xu={type:"removed"},Fn={type:"childadded",child:null},No={type:"childremoved",child:null},Me=class s extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new R,e=new ti,i=new je,n=new R(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ae},normalMatrix:{value:new Bt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Dn.setFromAxisAngle(t,e),this.quaternion.multiply(Dn),this}rotateOnWorldAxis(t,e){return Dn.setFromAxisAngle(t,e),this.quaternion.premultiply(Dn),this}rotateX(t){return this.rotateOnAxis(Ac,t)}rotateY(t){return this.rotateOnAxis(Cc,t)}rotateZ(t){return this.rotateOnAxis(Rc,t)}translateOnAxis(t,e){return wc.copy(t).applyQuaternion(this.quaternion),this.position.add(wc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ac,t)}translateY(t){return this.translateOnAxis(Cc,t)}translateZ(t){return this.translateOnAxis(Rc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?hr.copy(t):hr.set(t,e,i);let n=this.parent;this.updateWorldMatrix(!0,!1),us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(us,hr,this.up):wi.lookAt(hr,us,this.up),this.quaternion.setFromRotationMatrix(wi),n&&(wi.extractRotation(n.matrixWorld),Dn.setFromRotationMatrix(wi),this.quaternion.premultiply(Dn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Nt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Pc),Fn.child=t,this.dispatchEvent(Fn),Fn.child=null):Nt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xu),No.child=t,this.dispatchEvent(No),No.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Pc),Fn.child=t,this.dispatchEvent(Fn),Fn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,t,Gu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,Wu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),this.static!==!1&&(n.static=this.static),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let n=t.children[i];this.add(n.clone())}return this}};Me.DEFAULT_UP=new R(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Pe=class extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}},qu={type:"move"},$n=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qu)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Pe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Ph={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},ur={h:0,s:0,l:0};function Uo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Ft=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Zt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=Zt.workingColorSpace){if(t=Ul(t,1),e=Ht(e,0,1),i=Ht(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Uo(a,r,t+1/3),this.g=Uo(a,r,t),this.b=Uo(a,r,t-1/3)}return Zt.colorSpaceToWorking(this,n),this}setStyle(t,e=Je){function i(r){r!==void 0&&parseFloat(r)<1&&At("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:At("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);At("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){let i=Ph[t.toLowerCase()];return i!==void 0?this.setHex(i,e):At("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ii(t.r),this.g=Ii(t.g),this.b=Ii(t.b),this}copyLinearToSRGB(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return Zt.workingToColorSpace(Ue.copy(this),t),Math.round(Ht(Ue.r*255,0,255))*65536+Math.round(Ht(Ue.g*255,0,255))*256+Math.round(Ht(Ue.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.workingToColorSpace(Ue.copy(this),e);let i=Ue.r,n=Ue.g,r=Ue.b,a=Math.max(i,n,r),o=Math.min(i,n,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(n-r)/f+(n<r?6:0);break;case n:l=(r-i)/f+2;break;case r:l=(i-n)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Zt.workingColorSpace){return Zt.workingToColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Je){Zt.workingToColorSpace(Ue.copy(this),t);let e=Ue.r,i=Ue.g,n=Ue.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Hi),this.setHSL(Hi.h+t,Hi.s+e,Hi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Hi),t.getHSL(ur);let i=xs(Hi.h,ur.h,e),n=xs(Hi.s,ur.s,e),r=xs(Hi.l,ur.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ue=new Ft;Ft.NAMES=Ph;var ws=class s{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ft(t),this.density=e}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var As=class extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},li=new R,Ai=new R,Bo=new R,Ci=new R,Nn=new R,Un=new R,Ic=new R,Oo=new R,zo=new R,ko=new R,Vo=new ce,Ho=new ce,Go=new ce,Yi=class s{constructor(t=new R,e=new R,i=new R){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),li.subVectors(t,e),n.cross(li);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){li.subVectors(n,e),Ai.subVectors(i,e),Bo.subVectors(t,e);let a=li.dot(li),o=li.dot(Ai),l=li.dot(Bo),c=Ai.dot(Ai),h=Ai.dot(Bo),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,Ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ci.x),l.addScaledVector(a,Ci.y),l.addScaledVector(o,Ci.z),l)}static getInterpolatedAttribute(t,e,i,n,r,a){return Vo.setScalar(0),Ho.setScalar(0),Go.setScalar(0),Vo.fromBufferAttribute(t,e),Ho.fromBufferAttribute(t,i),Go.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(Vo,r.x),a.addScaledVector(Ho,r.y),a.addScaledVector(Go,r.z),a}static isFrontFacing(t,e,i,n){return li.subVectors(i,e),Ai.subVectors(t,e),li.cross(Ai).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return li.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),li.cross(Ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return s.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,n=this.b,r=this.c,a,o;Nn.subVectors(n,i),Un.subVectors(r,i),Oo.subVectors(t,i);let l=Nn.dot(Oo),c=Un.dot(Oo);if(l<=0&&c<=0)return e.copy(i);zo.subVectors(t,n);let h=Nn.dot(zo),f=Un.dot(zo);if(h>=0&&f<=h)return e.copy(n);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Nn,a);ko.subVectors(t,r);let d=Nn.dot(ko),g=Un.dot(ko);if(g>=0&&d<=g)return e.copy(r);let _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Un,o);let m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return Ic.subVectors(r,n),o=(f-h)/(f-h+(d-g)),e.copy(n).addScaledVector(Ic,o);let p=1/(m+_+u);return a=_*p,o=u*p,e.copy(i).addScaledVector(Nn,a).addScaledVector(Un,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Zi=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ci.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ci.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=ci.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ci):ci.fromBufferAttribute(r,a),ci.applyMatrix4(t.matrixWorld),this.expandByPoint(ci);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),dr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),dr.copy(i.boundingBox)),dr.applyMatrix4(t.matrixWorld),this.union(dr)}let n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ci),ci.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ds),fr.subVectors(this.max,ds),Bn.subVectors(t.a,ds),On.subVectors(t.b,ds),zn.subVectors(t.c,ds),Gi.subVectors(On,Bn),Wi.subVectors(zn,On),dn.subVectors(Bn,zn);let e=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-dn.z,dn.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,dn.z,0,-dn.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-dn.y,dn.x,0];return!Wo(e,Bn,On,zn,fr)||(e=[1,0,0,0,1,0,0,0,1],!Wo(e,Bn,On,zn,fr))?!1:(pr.crossVectors(Gi,Wi),e=[pr.x,pr.y,pr.z],Wo(e,Bn,On,zn,fr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ci).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ci).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ri=[new R,new R,new R,new R,new R,new R,new R,new R],ci=new R,dr=new Zi,Bn=new R,On=new R,zn=new R,Gi=new R,Wi=new R,dn=new R,ds=new R,fr=new R,pr=new R,fn=new R;function Wo(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){fn.fromArray(s,r);let o=n.x*Math.abs(fn.x)+n.y*Math.abs(fn.y)+n.z*Math.abs(fn.z),l=t.dot(fn),c=e.dot(fn),h=i.dot(fn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var ye=new R,mr=new xt,Yu=0,ve=class extends ui{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ll,this.updateRanges=[],this.gpuType=pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)mr.fromBufferAttribute(this,e),mr.applyMatrix3(t),this.setXY(e,mr.x,mr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Gn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Oe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),i=Oe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),i=Oe(i,this.array),n=Oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),i=Oe(i,this.array),n=Oe(n,this.array),r=Oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ll&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}};var Cs=class extends ve{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Rs=class extends ve{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Gt=class extends ve{constructor(t,e,i){super(new Float32Array(t),e,i)}},$u=new Zi,fs=new R,Xo=new R,Ji=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):$u.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fs.subVectors(t,this.center);let e=fs.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(fs,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fs.copy(t.center).add(Xo)),this.expandByPoint(fs.copy(t.center).sub(Xo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Zu=0,si=new ae,qo=new Me,kn=new R,Ze=new Zi,ps=new Zi,Ce=new R,ne=class s extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yu(t)?Rs:Cs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Bt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return si.makeRotationFromQuaternion(t),this.applyMatrix4(si),this}rotateX(t){return si.makeRotationX(t),this.applyMatrix4(si),this}rotateY(t){return si.makeRotationY(t),this.applyMatrix4(si),this}rotateZ(t){return si.makeRotationZ(t),this.applyMatrix4(si),this}translate(t,e,i){return si.makeTranslation(t,e,i),this.applyMatrix4(si),this}scale(t,e,i){return si.makeScale(t,e,i),this.applyMatrix4(si),this}lookAt(t){return qo.lookAt(t),qo.updateMatrix(),this.applyMatrix4(qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kn).negate(),this.translate(kn.x,kn.y,kn.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let n=0,r=t.length;n<r;n++){let a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Gt(i,3))}else{let i=Math.min(t.length,e.count);for(let n=0;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&At("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){let r=e[i];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ji);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let i=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ps.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(Ze.min,ps.min),Ze.expandByPoint(Ce),Ce.addVectors(Ze.max,ps.max),Ze.expandByPoint(Ce)):(Ze.expandByPoint(ps.min),Ze.expandByPoint(ps.max))}Ze.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ce.fromBufferAttribute(o,c),l&&(kn.fromBufferAttribute(t,c),Ce.add(kn)),n=Math.max(n,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,n=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ve(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new R,l[x]=new R;let c=new R,h=new R,f=new R,u=new xt,d=new xt,g=new xt,_=new R,m=new R;function p(x,w,P){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,w),f.fromBufferAttribute(i,P),u.fromBufferAttribute(r,x),d.fromBufferAttribute(r,w),g.fromBufferAttribute(r,P),h.sub(c),f.sub(c),d.sub(u),g.sub(u);let I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(I),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(I),o[x].add(_),o[w].add(_),o[P].add(_),l[x].add(m),l[w].add(m),l[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let x=0,w=M.length;x<w;++x){let P=M[x],I=P.start,L=P.count;for(let W=I,k=I+L;W<k;W+=3)p(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let b=new R,v=new R,T=new R,S=new R;function A(x){T.fromBufferAttribute(n,x),S.copy(T);let w=o[x];b.copy(w),b.sub(T.multiplyScalar(T.dot(w))).normalize(),v.crossVectors(S,w);let I=v.dot(l[x])<0?-1:1;a.setXYZW(x,b.x,b.y,b.z,I)}for(let x=0,w=M.length;x<w;++x){let P=M[x],I=P.start,L=P.count;for(let W=I,k=I+L;W<k;W+=3)A(t.getX(W+0)),A(t.getX(W+1)),A(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ve(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let n=new R,r=new R,a=new R,o=new R,l=new R,c=new R,h=new R,f=new R;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),f.subVectors(n,r),h.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)n.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(n,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h),d=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let p=0;p<h;p++)u[g++]=c[d++]}return new ve(u,h,f)}if(this.index===null)return At("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,i=this.index.array,n=this.attributes;for(let o in n){let l=n[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let n={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let n=t.attributes;for(let c in n){let h=n[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ju=0,Mi=class extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=rs(),this.name="",this.type="Material",this.blending=Di,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fr,this.blendDst=Nr,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=_n,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gn,this.stencilZFail=gn,this.stencilZPass=gn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){At(`Material: parameter '${e}' has value of undefined.`);continue}let n=this[e];if(n===void 0){At(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(i.blending=this.blending),this.side!==Li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Fr&&(i.blendSrc=this.blendSrc),this.blendDst!==Nr&&(i.blendDst=this.blendDst),this.blendEquation!==$i&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_n&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ol&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==gn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==gn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new xt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Pi=new R,Yo=new R,gr=new R,Xi=new R,$o=new R,xr=new R,Zo=new R,Ki=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pi.copy(this.origin).addScaledVector(this.direction,e),Pi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){Yo.copy(t).add(e).multiplyScalar(.5),gr.copy(e).sub(t).normalize(),Xi.copy(this.origin).sub(Yo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(gr),o=Xi.dot(this.direction),l=-Xi.dot(gr),c=Xi.lengthSq(),h=Math.abs(1-a*a),f,u,d,g;if(h>0)if(f=a*l-o,u=a*o-l,g=r*h,f>=0)if(u>=-g)if(u<=g){let _=1/h;f*=_,u*=_,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),n&&n.copy(Yo).addScaledVector(gr,u),d}intersectSphere(t,e){Pi.subVectors(t.center,this.origin);let i=Pi.dot(this.direction),n=Pi.dot(Pi)-i*i,r=t.radius*t.radius;if(n>r)return null;let a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,n=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,n=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,e,i,n,r){$o.subVectors(e,t),xr.subVectors(i,t),Zo.crossVectors($o,xr);let a=this.direction.dot(Zo),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xi.subVectors(this.origin,t);let l=o*this.direction.dot(xr.crossVectors(Xi,xr));if(l<0)return null;let c=o*this.direction.dot($o.cross(Xi));if(c<0||l+c>a)return null;let h=-o*Xi.dot(Zo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ke=class extends Mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Lc=new ae,pn=new Ki,_r=new Ji,Dc=new R,yr=new R,vr=new R,Mr=new R,Jo=new R,br=new R,Fc=new R,Sr=new R,st=class extends Me{constructor(t=new ne,e=new ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);let o=this.morphTargetInfluences;if(r&&o){br.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(Jo.fromBufferAttribute(f,t),a?br.addScaledVector(Jo,h):br.addScaledVector(Jo.sub(e),h))}e.add(br)}return e}raycast(t,e){let i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_r.copy(i.boundingSphere),_r.applyMatrix4(r),pn.copy(t.ray).recast(t.near),!(_r.containsPoint(pn.origin)===!1&&(pn.intersectSphere(_r,Dc)===null||pn.origin.distanceToSquared(Dc)>(t.far-t.near)**2))&&(Lc.copy(r).invert(),pn.copy(t.ray).applyMatrix4(Lc),!(i.boundingBox!==null&&pn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,pn)))}_computeIntersections(t,e,i){let n,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),b=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,T=b;v<T;v+=3){let S=o.getX(v),A=o.getX(v+1),x=o.getX(v+2);n=Er(this,p,t,i,c,h,f,S,A,x),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let M=o.getX(m),b=o.getX(m+1),v=o.getX(m+2);n=Er(this,a,t,i,c,h,f,M,b,v),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){let m=u[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),b=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,T=b;v<T;v+=3){let S=v,A=v+1,x=v+2;n=Er(this,p,t,i,c,h,f,S,A,x),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{let g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let M=m,b=m+1,v=m+2;n=Er(this,a,t,i,c,h,f,M,b,v),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}};function Ku(s,t,e,i,n,r,a,o){let l;if(t.side===Ve?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===Li,o),l===null)return null;Sr.copy(o),Sr.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Sr);return c<e.near||c>e.far?null:{distance:c,point:Sr.clone(),object:s}}function Er(s,t,e,i,n,r,a,o,l,c){s.getVertexPosition(o,yr),s.getVertexPosition(l,vr),s.getVertexPosition(c,Mr);let h=Ku(s,t,e,i,yr,vr,Mr,Fc);if(h){let f=new R;Yi.getBarycoord(Fc,yr,vr,Mr,f),n&&(h.uv=Yi.getInterpolatedAttribute(n,o,l,c,f,new xt)),r&&(h.uv1=Yi.getInterpolatedAttribute(r,o,l,c,f,new xt)),a&&(h.normal=Yi.getInterpolatedAttribute(a,o,l,c,f,new R),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new R,materialIndex:0};Yi.getNormal(yr,vr,Mr,u.normal),h.face=u,h.barycoord=f}return h}var $r=class extends ze{constructor(t=null,e=1,i=1,n,r,a,o,l,c=Ie,h=Ie,f,u){super(null,a,o,l,c,h,n,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ko=new R,ju=new R,Qu=new Bt,We=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let n=Ko.subVectors(i,e).cross(ju.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let n=t.delta(Ko),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Qu.getNormalMatrix(t),n=this.coplanarPoint(Ko).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},mn=new Ji,td=new xt(.5,.5),Tr=new R,Zn=class{constructor(t=new We,e=new We,i=new We,n=new We,r=new We,a=new We){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=hi,i=!1){let n=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],b=r[13],v=r[14],T=r[15];if(n[0].setComponents(c-a,d-h,p-g,T-M).normalize(),n[1].setComponents(c+a,d+h,p+g,T+M).normalize(),n[2].setComponents(c+o,d+f,p+_,T+b).normalize(),n[3].setComponents(c-o,d-f,p-_,T-b).normalize(),i)n[4].setComponents(l,u,m,v).normalize(),n[5].setComponents(c-l,d-u,p-m,T-v).normalize();else if(n[4].setComponents(c-l,d-u,p-m,T-v).normalize(),e===hi)n[5].setComponents(c+l,d+u,p+m,T+v).normalize();else if(e===Xn)n[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),mn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),mn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(mn)}intersectsSprite(t){mn.center.set(0,0,0);let e=td.distanceTo(t.center);return mn.radius=.7071067811865476+e,mn.applyMatrix4(t.matrixWorld),this.intersectsSphere(mn)}intersectsSphere(t){let e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let n=e[i];if(Tr.x=n.normal.x>0?t.max.x:t.min.x,Tr.y=n.normal.y>0?t.max.y:t.min.y,Tr.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Tr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ji=class extends Mi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Zr=new R,Jr=new R,Nc=new ae,ms=new Ki,wr=new Ji,jo=new R,Uc=new R,vn=class extends Me{constructor(t=new ne,e=new ji){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)Zr.fromBufferAttribute(e,n-1),Jr.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=Zr.distanceTo(Jr);t.setAttribute("lineDistance",new Gt(i,1))}else At("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wr.copy(i.boundingSphere),wr.applyMatrix4(n),wr.radius+=r,t.ray.intersectsSphere(wr)===!1)return;Nc.copy(n).invert(),ms.copy(t.ray).applyMatrix4(Nc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=c){let p=h.getX(_),M=h.getX(_+1),b=Ar(this,t,ms,l,p,M,_);b&&e.push(b)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(d),p=Ar(this,t,ms,l,_,m,g-1);p&&e.push(p)}}else{let d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=c){let p=Ar(this,t,ms,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){let _=Ar(this,t,ms,l,g-1,d,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ar(s,t,e,i,n,r,a){let o=s.geometry.attributes.position;if(Zr.fromBufferAttribute(o,n),Jr.fromBufferAttribute(o,r),e.distanceSqToSegment(Zr,Jr,jo,Uc)>i)return;jo.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(jo);if(!(c<t.near||c>t.far))return{distance:c,point:Uc.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Bc=new R,Oc=new R,Kr=class extends vn{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)Bc.fromBufferAttribute(e,n),Oc.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Bc.distanceTo(Oc);t.setAttribute("lineDistance",new Gt(i,1))}else At("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Qi=class extends Mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},zc=new ae,cl=new Ki,Cr=new Ji,Rr=new R,Mn=class extends Me{constructor(t=new ne,e=new Qi){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cr.copy(i.boundingSphere),Cr.applyMatrix4(n),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;zc.copy(n).invert(),cl.copy(t.ray).applyMatrix4(zc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=u,_=d;g<_;g++){let m=c.getX(g);Rr.fromBufferAttribute(f,m),kc(Rr,m,l,n,t,e,this)}}else{let u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let g=u,_=d;g<_;g++)Rr.fromBufferAttribute(f,g),kc(Rr,g,l,n,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function kc(s,t,e,i,n,r,a){let o=cl.distanceSqToPoint(s);if(o<e){let l=new R;cl.closestPointToPoint(s,l),l.applyMatrix4(i);let c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Ps=class extends ze{constructor(t=[],e=an,i,n,r,a,o,l,c,h){super(t,e,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},De=class extends ze{constructor(t,e,i,n,r,a,o,l,c){super(t,e,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Fi=class extends ze{constructor(t,e,i=fi,n,r,a,o=Ie,l=Ie,c,h=vi,f=1){if(h!==vi&&h!==ln)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Yn(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},jr=class extends Fi{constructor(t,e=fi,i=an,n,r,a=Ie,o=Ie,l,c=vi){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,i,n,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Is=class extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},ge=class s extends ne{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};let o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],u=0,d=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Gt(c,3)),this.setAttribute("normal",new Gt(h,3)),this.setAttribute("uv",new Gt(f,2));function g(_,m,p,M,b,v,T,S,A,x,w){let P=v/A,I=T/x,L=v/2,W=T/2,k=S/2,D=A+1,F=x+1,U=0,V=0,J=new R;for(let et=0;et<F;et++){let rt=et*I-W;for(let pt=0;pt<D;pt++){let Xt=pt*P-L;J[_]=Xt*M,J[m]=rt*b,J[p]=k,c.push(J.x,J.y,J.z),J[_]=0,J[m]=0,J[p]=S>0?1:-1,h.push(J.x,J.y,J.z),f.push(pt/A),f.push(1-et/x),U+=1}}for(let et=0;et<x;et++)for(let rt=0;rt<A;rt++){let pt=u+rt+D*et,Xt=u+rt+D*(et+1),Pt=u+(rt+1)+D*(et+1),bt=u+(rt+1)+D*et;l.push(pt,Xt,bt),l.push(Xt,Pt,bt),V+=6}o.addGroup(d,V,w),d+=V,u+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var kt=class s extends ne{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;n=Math.floor(n),r=Math.floor(r);let h=[],f=[],u=[],d=[],g=0,_=[],m=i/2,p=0;M(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Gt(f,3)),this.setAttribute("normal",new Gt(u,3)),this.setAttribute("uv",new Gt(d,2));function M(){let v=new R,T=new R,S=0,A=(e-t)/i;for(let x=0;x<=r;x++){let w=[],P=x/r,I=P*(e-t)+t;for(let L=0;L<=n;L++){let W=L/n,k=W*l+o,D=Math.sin(k),F=Math.cos(k);T.x=I*D,T.y=-P*i+m,T.z=I*F,f.push(T.x,T.y,T.z),v.set(D,A,F).normalize(),u.push(v.x,v.y,v.z),d.push(W,1-P),w.push(g++)}_.push(w)}for(let x=0;x<n;x++)for(let w=0;w<r;w++){let P=_[w][x],I=_[w+1][x],L=_[w+1][x+1],W=_[w][x+1];(t>0||w!==0)&&(h.push(P,I,W),S+=3),(e>0||w!==r-1)&&(h.push(I,L,W),S+=3)}c.addGroup(p,S,0),p+=S}function b(v){let T=g,S=new xt,A=new R,x=0,w=v===!0?t:e,P=v===!0?1:-1;for(let L=1;L<=n;L++)f.push(0,m*P,0),u.push(0,P,0),d.push(.5,.5),g++;let I=g;for(let L=0;L<=n;L++){let k=L/n*l+o,D=Math.cos(k),F=Math.sin(k);A.x=w*F,A.y=m*P,A.z=w*D,f.push(A.x,A.y,A.z),u.push(0,P,0),S.x=D*.5+.5,S.y=F*.5*P+.5,d.push(S.x,S.y),g++}for(let L=0;L<n;L++){let W=T+L,k=I+L;v===!0?h.push(k,k+1,W):h.push(k+1,k,W),x+=3}c.addGroup(p,x,v===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ls=class s extends kt{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Jn=class s extends ne{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};let r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new Gt(r,3)),this.setAttribute("normal",new Gt(r.slice(),3)),this.setAttribute("uv",new Gt(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let b=new R,v=new R,T=new R;for(let S=0;S<e.length;S+=3)d(e[S+0],b),d(e[S+1],v),d(e[S+2],T),l(b,v,T,M)}function l(M,b,v,T){let S=T+1,A=[];for(let x=0;x<=S;x++){A[x]=[];let w=M.clone().lerp(v,x/S),P=b.clone().lerp(v,x/S),I=S-x;for(let L=0;L<=I;L++)L===0&&x===S?A[x][L]=w:A[x][L]=w.clone().lerp(P,L/I)}for(let x=0;x<S;x++)for(let w=0;w<2*(S-x)-1;w++){let P=Math.floor(w/2);w%2===0?(u(A[x][P+1]),u(A[x+1][P]),u(A[x][P])):(u(A[x][P+1]),u(A[x+1][P+1]),u(A[x+1][P]))}}function c(M){let b=new R;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(M),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function h(){let M=new R;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];let v=m(M)/2/Math.PI+.5,T=p(M)/Math.PI+.5;a.push(v,1-T)}g(),f()}function f(){for(let M=0;M<a.length;M+=6){let b=a[M+0],v=a[M+2],T=a[M+4],S=Math.max(b,v,T),A=Math.min(b,v,T);S>.9&&A<.1&&(b<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),T<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function d(M,b){let v=M*3;b.x=t[v+0],b.y=t[v+1],b.z=t[v+2]}function g(){let M=new R,b=new R,v=new R,T=new R,S=new xt,A=new xt,x=new xt;for(let w=0,P=0;w<r.length;w+=9,P+=6){M.set(r[w+0],r[w+1],r[w+2]),b.set(r[w+3],r[w+4],r[w+5]),v.set(r[w+6],r[w+7],r[w+8]),S.set(a[P+0],a[P+1]),A.set(a[P+2],a[P+3]),x.set(a[P+4],a[P+5]),T.copy(M).add(b).add(v).divideScalar(3);let I=m(T);_(S,P+0,M,I),_(A,P+2,b,I),_(x,P+4,v,I)}}function _(M,b,v,T){T<0&&M.x===1&&(a[b]=M.x-1),v.x===0&&v.z===0&&(a[b]=T/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.detail)}},Ds=class s extends Jn{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,n=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var ri=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){At("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,n=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(n),e.push(r),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),n=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);let h=i[n],u=i[n+1]-h,d=(a-h)/u;return(n+d)/(r-1)}getTangent(t,e){let n=t-1e-4,r=t+1e-4;n<0&&(n=0),r>1&&(r=1);let a=this.getPoint(n),o=this.getPoint(r),l=e||(a.isVector2?new xt:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new R,n=[],r=[],a=[],o=new R,l=new ae;for(let d=0;d<=t;d++){let g=d/t;n[d]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(n[0].x),f=Math.abs(n[0].y),u=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(n[d-1],n[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Ht(n[d-1].dot(n[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(n[d],r[d])}if(e===!0){let d=Math.acos(Ht(r[0].dot(r[t]),-1,1));d/=t,n[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(n[g],d*g)),a[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Fs=class extends ri{constructor(t=0,e=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new xt){let i=e,n=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Qr=class extends Fs{constructor(t,e,i,n,r,a){super(t,e,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ol(){let s=0,t=0,e=0,i=0;function n(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){n(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,n(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return s+t*r+e*a+i*o}}}var Vc=new R,Hc=new R,Qo=new Ol,tl=new Ol,el=new Ol,Kn=class extends ri{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new R){let i=e,n=this.points,r=n.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%r]:(Hc.subVectors(n[0],n[1]).add(n[0]),c=Hc);let f=n[o%r],u=n[(o+1)%r];if(this.closed||o+2<r?h=n[(o+2)%r]:(Vc.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=Vc),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Qo.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,_,m),tl.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,_,m),el.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Qo.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),tl.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),el.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return i.set(Qo.calc(l),tl.calc(l),el.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(new R().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Gc(s,t,e,i,n){let r=(i-t)*.5,a=(n-e)*.5,o=s*s,l=s*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*s+e}function ed(s,t){let e=1-s;return e*e*t}function id(s,t){return 2*(1-s)*s*t}function nd(s,t){return s*s*t}function _s(s,t,e,i){return ed(s,t)+id(s,e)+nd(s,i)}function sd(s,t){let e=1-s;return e*e*e*t}function rd(s,t){let e=1-s;return 3*e*e*s*t}function ad(s,t){return 3*(1-s)*s*s*t}function od(s,t){return s*s*s*t}function ys(s,t,e,i,n){return sd(s,t)+rd(s,e)+ad(s,i)+od(s,n)}var ta=class extends ri{constructor(t=new xt,e=new xt,i=new xt,n=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new xt){let i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ys(t,n.x,r.x,a.x,o.x),ys(t,n.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ea=class extends ri{constructor(t=new R,e=new R,i=new R,n=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new R){let i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ys(t,n.x,r.x,a.x,o.x),ys(t,n.y,r.y,a.y,o.y),ys(t,n.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ia=class extends ri{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},na=class extends ri{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sa=class extends ri{constructor(t=new xt,e=new xt,i=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new xt){let i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(_s(t,n.x,r.x,a.x),_s(t,n.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ns=class extends ri{constructor(t=new R,e=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new R){let i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(_s(t,n.x,r.x,a.x),_s(t,n.y,r.y,a.y),_s(t,n.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ra=class extends ri{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){let i=e,n=this.points,r=(n.length-1)*t,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],c=n[a],h=n[a>n.length-2?n.length-1:a+1],f=n[a>n.length-3?n.length-1:a+2];return i.set(Gc(o,l.x,c.x,h.x,f.x),Gc(o,l.y,c.y,h.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(n.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let n=t.points[e];this.points.push(new xt().fromArray(n))}return this}},ld=Object.freeze({__proto__:null,ArcCurve:Qr,CatmullRomCurve3:Kn,CubicBezierCurve:ta,CubicBezierCurve3:ea,EllipseCurve:Fs,LineCurve:ia,LineCurve3:na,QuadraticBezierCurve:sa,QuadraticBezierCurve3:Ns,SplineCurve:ra});var Us=class s extends Jn{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Bs=class s extends Jn{constructor(t=1,e=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}},Ni=class s extends ne{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,f=t/o,u=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let M=p*u-a;for(let b=0;b<c;b++){let v=b*f-r;g.push(v,-M,0),_.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let b=M+c*p,v=M+c*(p+1),T=M+1+c*(p+1),S=M+1+c*p;d.push(b,v,S),d.push(v,T,S)}this.setIndex(d),this.setAttribute("position",new Gt(g,3)),this.setAttribute("normal",new Gt(_,3)),this.setAttribute("uv",new Gt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},jn=class s extends ne{constructor(t=.5,e=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);let o=[],l=[],c=[],h=[],f=t,u=(e-t)/n,d=new R,g=new xt;for(let _=0;_<=n;_++){for(let m=0;m<=i;m++){let p=r+m/i*a;d.x=f*Math.cos(p),d.y=f*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}f+=u}for(let _=0;_<n;_++){let m=_*(i+1);for(let p=0;p<i;p++){let M=p+m,b=M,v=M+i+1,T=M+i+2,S=M+1;o.push(b,v,S),o.push(v,T,S)}}this.setIndex(o),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(c,3)),this.setAttribute("uv",new Gt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var bn=class s extends ne{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],f=new R,u=new R,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){let M=[],b=p/i,v=a+b*o,T=t*Math.cos(v),S=Math.sqrt(t*t-T*T),A=0;p===0&&a===0?A=.5/e:p===i&&l===Math.PI&&(A=-.5/e);for(let x=0;x<=e;x++){let w=x/e,P=n+w*r;f.x=-S*Math.cos(P),f.y=T,f.z=S*Math.sin(P),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(w+A,1-b),M.push(c++)}h.push(M)}for(let p=0;p<i;p++)for(let M=0;M<e;M++){let b=h[p][M+1],v=h[p][M],T=h[p+1][M],S=h[p+1][M+1];(p!==0||a>0)&&d.push(b,v,S),(p!==i-1||l<Math.PI)&&d.push(v,T,S)}this.setIndex(d),this.setAttribute("position",new Gt(g,3)),this.setAttribute("normal",new Gt(_,3)),this.setAttribute("uv",new Gt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ui=class s extends ne{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let l=[],c=[],h=[],f=[],u=new R,d=new R,g=new R;for(let _=0;_<=i;_++){let m=a+_/i*o;for(let p=0;p<=n;p++){let M=p/n*r;d.x=(t+e*Math.cos(m))*Math.cos(M),d.y=(t+e*Math.cos(m))*Math.sin(M),d.z=e*Math.sin(m),c.push(d.x,d.y,d.z),u.x=t*Math.cos(M),u.y=t*Math.sin(M),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),f.push(p/n),f.push(_/i)}}for(let _=1;_<=i;_++)for(let m=1;m<=n;m++){let p=(n+1)*_+m-1,M=(n+1)*(_-1)+m-1,b=(n+1)*(_-1)+m,v=(n+1)*_+m;l.push(p,M,v),l.push(M,b,v)}this.setIndex(l),this.setAttribute("position",new Gt(c,3)),this.setAttribute("normal",new Gt(h,3)),this.setAttribute("uv",new Gt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Os=class s extends ne{constructor(t=new Ns(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:n,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new R,l=new R,c=new xt,h=new R,f=[],u=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Gt(f,3)),this.setAttribute("normal",new Gt(u,3)),this.setAttribute("uv",new Gt(d,2));function _(){for(let b=0;b<e;b++)m(b);m(r===!1?e:0),M(),p()}function m(b){h=t.getPointAt(b/e,h);let v=a.normals[b],T=a.binormals[b];for(let S=0;S<=n;S++){let A=S/n*Math.PI*2,x=Math.sin(A),w=-Math.cos(A);l.x=w*v.x+x*T.x,l.y=w*v.y+x*T.y,l.z=w*v.z+x*T.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,f.push(o.x,o.y,o.z)}}function p(){for(let b=1;b<=e;b++)for(let v=1;v<=n;v++){let T=(n+1)*(b-1)+(v-1),S=(n+1)*b+(v-1),A=(n+1)*b+v,x=(n+1)*(b-1)+v;g.push(T,S,x),g.push(S,A,x)}}function M(){for(let b=0;b<=e;b++)for(let v=0;v<=n;v++)c.x=b/e,c.y=v/n,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new s(new ld[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function wn(s){let t={};for(let e in s){t[e]={};for(let i in s[e]){let n=s[e][i];if(Wc(n))n.isRenderTargetTexture?(At("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Wc(n[0])){let r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function Be(s){let t={};for(let e=0;e<s.length;e++){let i=wn(s[e]);for(let n in i)t[n]=i[n]}return t}function Wc(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function cd(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function zl(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}var Ih={clone:wn,merge:Be},hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ud=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ei=class extends Mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hd,this.fragmentShader=ud,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wn(t.uniforms),this.uniformsGroups=cd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new Ft().setHex(n.value);break;case"v2":this.uniforms[i].value=new xt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new R().fromArray(n.value);break;case"v4":this.uniforms[i].value=new ce().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Bt().fromArray(n.value);break;case"m4":this.uniforms[i].value=new ae().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},aa=class extends ei{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},he=class extends Mi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ao,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var oa=class extends Mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},la=class extends Mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Pr(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}var tn=class{constructor(t,e,i,n){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,n=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<n)){for(let o=i+2;;){if(n===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=e[++i],t<n)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(n=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,t,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=t*n;for(let a=0;a!==n;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ca=class extends tn{constructor(t,e,i,n){super(t,e,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sl,endingEnd:sl}}intervalChanged_(t,e,i){let n=this.parameterPositions,r=t-2,a=t+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case rl:r=t,o=2*e-i;break;case al:r=n.length-2,o=e+n[r]-n[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case rl:a=t,l=2*i-e;break;case al:a=1,l=i+n[1]-n[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(i-e)/(n-e),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,M=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,b=(-1-d)*m+(1.5+d)*_+.5*g,v=d*m-d*_;for(let T=0;T!==o;++T)r[T]=p*a[h+T]+M*a[c+T]+b*a[l+T]+v*a[f+T];return r}},ha=class extends tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(n-e),f=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*f+a[l+u]*h;return r}},ua=class extends tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t){return this.copySampleValue_(t-1)}},da=class extends tn{interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let g=(i-e)/(n-e),_=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*_+a[l+m]*g;return r}let u=o*2,d=t-1;for(let g=0;g!==o;++g){let _=a[c+g],m=a[l+g],p=d*u+g*2,M=f[p],b=f[p+1],v=t*u+g*2,T=h[v],S=h[v+1],A=(i-e)/(n-e),x,w,P,I,L;for(let W=0;W<8;W++){x=A*A,w=x*A,P=1-A,I=P*P,L=I*P;let D=L*e+3*I*A*M+3*P*x*T+w*n-i;if(Math.abs(D)<1e-10)break;let F=3*I*(M-e)+6*P*A*(T-M)+3*x*(n-T);if(Math.abs(F)<1e-10)break;A=A-D/F,A=Math.max(0,Math.min(1,A))}r[g]=L*_+3*I*A*b+3*P*x*S+w*m}return r}},ii=class{constructor(t,e,i,n){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Pr(e,this.TimeBufferType),this.values=Pr(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Pr(t.times,Array),values:Pr(t.values,Array)};let n=t.getInterpolation();n!==t.DefaultInterpolation&&(i.interpolation=n)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ha(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ca(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new da(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case vs:e=this.InterpolantFactoryMethodDiscrete;break;case Wr:e=this.InterpolantFactoryMethodLinear;break;case Dr:e=this.InterpolantFactoryMethodSmooth;break;case nl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return At("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vs;case this.InterpolantFactoryMethodLinear:return Wr;case this.InterpolantFactoryMethodSmooth:return Dr;case this.InterpolantFactoryMethodBezier:return nl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,n=e.length;i!==n;++i)e[i]*=t}return this}trim(t,e){let i=this.times,n=i.length,r=0,a=n-1;for(;r!==n&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Nt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,n=this.values,r=i.length;r===0&&(Nt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Nt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Nt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(n!==void 0&&vu(n))for(let o=0,l=n.length;o!==l;++o){let c=n[o];if(isNaN(c)){Nt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===Dr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(n)l=!0;else{let f=o*i,u=f-i,d=f+i;for(let g=0;g!==i;++g){let _=e[f+g];if(_!==e[u+g]||_!==e[d+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*i,u=a*i;for(let d=0;d!==i;++d)e[u+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,n=new i(this.name,t,e);return n.createInterpolant=this.createInterpolant,n}};ii.prototype.ValueTypeName="";ii.prototype.TimeBufferType=Float32Array;ii.prototype.ValueBufferType=Float32Array;ii.prototype.DefaultInterpolation=Wr;var en=class extends ii{constructor(t,e,i){super(t,e,i)}};en.prototype.ValueTypeName="bool";en.prototype.ValueBufferType=Array;en.prototype.DefaultInterpolation=vs;en.prototype.InterpolantFactoryMethodLinear=void 0;en.prototype.InterpolantFactoryMethodSmooth=void 0;var fa=class extends ii{constructor(t,e,i,n){super(t,e,i,n)}};fa.prototype.ValueTypeName="color";var pa=class extends ii{constructor(t,e,i,n){super(t,e,i,n)}};pa.prototype.ValueTypeName="number";var ma=class extends tn{constructor(t,e,i,n){super(t,e,i,n)}interpolate_(t,e,i,n){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(n-e),c=t*o;for(let h=c+o;c!==h;c+=4)je.slerpFlat(r,0,a,c-o,a,c,l);return r}},zs=class extends ii{constructor(t,e,i,n){super(t,e,i,n)}InterpolantFactoryMethodLinear(t){return new ma(this.times,this.values,this.getValueSize(),t)}};zs.prototype.ValueTypeName="quaternion";zs.prototype.InterpolantFactoryMethodSmooth=void 0;var nn=class extends ii{constructor(t,e,i){super(t,e,i)}};nn.prototype.ValueTypeName="string";nn.prototype.ValueBufferType=Array;nn.prototype.DefaultInterpolation=vs;nn.prototype.InterpolantFactoryMethodLinear=void 0;nn.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends ii{constructor(t,e,i,n){super(t,e,i,n)}};ga.prototype.ValueTypeName="vector";var xa=class{constructor(t,e,i){let n=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Lh=new xa,_a=class{constructor(t){this.manager=t!==void 0?t:Lh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(n,r){i.load(t,n,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};_a.DEFAULT_MATERIAL_NAME="__DEFAULT";var Sn=class extends Me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},ks=class extends Sn{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},il=new ae,Xc=new R,qc=new R,Vs=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.mapType=Xe,this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zn,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Xc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xc),qc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(qc),e.updateMatrixWorld(),il.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(il,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Xn||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(il)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Ir=new R,Lr=new je,_i=new R,Hs=class extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ir,Lr,_i),_i.x===1&&_i.y===1&&_i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ir,Lr,_i.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Ir,Lr,_i),_i.x===1&&_i.y===1&&_i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ir,Lr,_i.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qi=new R,Yc=new xt,$c=new xt,Re=class extends Hs{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=yn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return yn*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qi.x,qi.y).multiplyScalar(-t/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qi.x,qi.y).multiplyScalar(-t/qi.z)}getViewSize(t,e){return this.getViewBounds(t,Yc,$c),e.subVectors($c,Yc)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(gs*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},hl=class extends Vs{constructor(){super(new Re(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,i=yn*2*t.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||n!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=n,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Gs=class extends Sn{constructor(t,e,i=0,n=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.distance=i,this.angle=n,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new hl}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},ul=class extends Vs{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0}},En=class extends Sn{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new ul}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Qn=class extends Hs{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},dl=class extends Vs{constructor(){super(new Qn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ws=class extends Sn{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new dl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Vn=-90,Hn=1,ya=class extends Me{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new Re(Vn,Hn,t,e);n.layers=this.layers,this.add(n);let r=new Re(Vn,Hn,t,e);r.layers=this.layers,this.add(r);let a=new Re(Vn,Hn,t,e);a.layers=this.layers,this.add(a);let o=new Re(Vn,Hn,t,e);o.layers=this.layers,this.add(o);let l=new Re(Vn,Hn,t,e);l.layers=this.layers,this.add(l);let c=new Re(Vn,Hn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===hi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xn)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,n),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},va=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var kl="\\[\\]\\.:\\/",dd=new RegExp("["+kl+"]","g"),Vl="[^"+kl+"]",fd="[^"+kl.replace("\\.","")+"]",pd=/((?:WC+[\/:])*)/.source.replace("WC",Vl),md=/(WCOD+)?/.source.replace("WCOD",fd),gd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vl),xd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vl),_d=new RegExp("^"+pd+md+gd+xd+"$"),yd=["material","materials","bones","map"],fl=class{constructor(t,e,i){let n=i||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,n)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},oe=class s{constructor(t,e,i){this.path=e,this.parsedPath=i||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,i):new s(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(dd,"")}static parseTrackName(t){let e=_d.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);yd.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},n=i(t.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)t[e++]=i[n]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,n=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){At("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Nt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Nt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Nt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Nt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Nt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Nt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[n];if(a===void 0){let c=e.nodeName;Nt("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!t.geometry){Nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Nt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=fl;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var R0=new Float32Array(1);var Xs=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,At("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}},ts=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ht(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var pl=class s{static{s.prototype.isMatrix2=!0}constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};var qs=class extends Kr{constructor(t=10,e=10,i=4473924,n=8947848){i=new Ft(i),n=new Ft(n);let r=e/2,a=t/e,o=t/2,l=[],c=[];for(let u=0,d=0,g=-o;u<=e;u++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let _=u===r?i:n;_.toArray(c,d),d+=3,_.toArray(c,d),d+=3,_.toArray(c,d),d+=3,_.toArray(c,d),d+=3}let h=new ne;h.setAttribute("position",new Gt(l,3)),h.setAttribute("color",new Gt(c,3));let f=new ji({vertexColors:!0,toneMapped:!1});super(h,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Ys=class extends ui{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){At("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Hl(s,t,e,i){let n=vd(i);switch(e){case Il:return s*t;case Dl:return s*t/n.components*n.byteLength;case Aa:return s*t/n.components*n.byteLength;case cn:return s*t*2/n.components*n.byteLength;case Ca:return s*t*2/n.components*n.byteLength;case Ll:return s*t*3/n.components*n.byteLength;case ai:return s*t*4/n.components*n.byteLength;case Ra:return s*t*4/n.components*n.byteLength;case js:case Qs:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case tr:case er:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ia:case Da:return Math.max(s,16)*Math.max(t,8)/4;case Pa:case La:return Math.max(s,8)*Math.max(t,8)/2;case Fa:case Na:case Ba:case Oa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ua:case ir:case za:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ka:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Va:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case qa:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case $a:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Za:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Ka:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case ja:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Qa:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case to:case eo:case io:return Math.ceil(s/4)*Math.ceil(t/4)*16;case no:case so:return Math.ceil(s/4)*Math.ceil(t/4)*8;case nr:case ro:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vd(s){switch(s){case Xe:case Al:return{byteLength:1,components:1};case ns:case Cl:case Si:return{byteLength:2,components:1};case Ta:case wa:return{byteLength:2,components:4};case fi:case Ea:case pi:return{byteLength:4,components:1};case Rl:case Pl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?At("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function eu(){let s=null,t=!1,e=null,i=null;function n(r,a){e(r,a),i=s.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function bd(s){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){let h=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){let g=f[u],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){let _=f[d];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var Sd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ed=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Td=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ad=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Id=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ld=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ud=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Bd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Wd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Xd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,qd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$d=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qd="gl_FragColor = linearToOutputTexel( gl_FragColor );",tf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ef=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,of=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ff=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,gf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_f=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ef=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Af=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,If=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Df=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ff=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Uf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Of=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Yf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$f=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ip=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,np=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ap=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,op=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,up=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_p=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ep=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ip=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Dp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Np=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Op=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$p=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,em=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,im=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:Sd,alphahash_pars_fragment:Ed,alphamap_fragment:Td,alphamap_pars_fragment:wd,alphatest_fragment:Ad,alphatest_pars_fragment:Cd,aomap_fragment:Rd,aomap_pars_fragment:Pd,batching_pars_vertex:Id,batching_vertex:Ld,begin_vertex:Dd,beginnormal_vertex:Fd,bsdfs:Nd,iridescence_fragment:Ud,bumpmap_pars_fragment:Bd,clipping_planes_fragment:Od,clipping_planes_pars_fragment:zd,clipping_planes_pars_vertex:kd,clipping_planes_vertex:Vd,color_fragment:Hd,color_pars_fragment:Gd,color_pars_vertex:Wd,color_vertex:Xd,common:qd,cube_uv_reflection_fragment:Yd,defaultnormal_vertex:$d,displacementmap_pars_vertex:Zd,displacementmap_vertex:Jd,emissivemap_fragment:Kd,emissivemap_pars_fragment:jd,colorspace_fragment:Qd,colorspace_pars_fragment:tf,envmap_fragment:ef,envmap_common_pars_fragment:nf,envmap_pars_fragment:sf,envmap_pars_vertex:rf,envmap_physical_pars_fragment:gf,envmap_vertex:af,fog_vertex:of,fog_pars_vertex:lf,fog_fragment:cf,fog_pars_fragment:hf,gradientmap_pars_fragment:uf,lightmap_pars_fragment:df,lights_lambert_fragment:ff,lights_lambert_pars_fragment:pf,lights_pars_begin:mf,lights_toon_fragment:xf,lights_toon_pars_fragment:_f,lights_phong_fragment:yf,lights_phong_pars_fragment:vf,lights_physical_fragment:Mf,lights_physical_pars_fragment:bf,lights_fragment_begin:Sf,lights_fragment_maps:Ef,lights_fragment_end:Tf,lightprobes_pars_fragment:wf,logdepthbuf_fragment:Af,logdepthbuf_pars_fragment:Cf,logdepthbuf_pars_vertex:Rf,logdepthbuf_vertex:Pf,map_fragment:If,map_pars_fragment:Lf,map_particle_fragment:Df,map_particle_pars_fragment:Ff,metalnessmap_fragment:Nf,metalnessmap_pars_fragment:Uf,morphinstance_vertex:Bf,morphcolor_vertex:Of,morphnormal_vertex:zf,morphtarget_pars_vertex:kf,morphtarget_vertex:Vf,normal_fragment_begin:Hf,normal_fragment_maps:Gf,normal_pars_fragment:Wf,normal_pars_vertex:Xf,normal_vertex:qf,normalmap_pars_fragment:Yf,clearcoat_normal_fragment_begin:$f,clearcoat_normal_fragment_maps:Zf,clearcoat_pars_fragment:Jf,iridescence_pars_fragment:Kf,opaque_fragment:jf,packing:Qf,premultiplied_alpha_fragment:tp,project_vertex:ep,dithering_fragment:ip,dithering_pars_fragment:np,roughnessmap_fragment:sp,roughnessmap_pars_fragment:rp,shadowmap_pars_fragment:ap,shadowmap_pars_vertex:op,shadowmap_vertex:lp,shadowmask_pars_fragment:cp,skinbase_vertex:hp,skinning_pars_vertex:up,skinning_vertex:dp,skinnormal_vertex:fp,specularmap_fragment:pp,specularmap_pars_fragment:mp,tonemapping_fragment:gp,tonemapping_pars_fragment:xp,transmission_fragment:_p,transmission_pars_fragment:yp,uv_pars_fragment:vp,uv_pars_vertex:Mp,uv_vertex:bp,worldpos_vertex:Sp,background_vert:Ep,background_frag:Tp,backgroundCube_vert:wp,backgroundCube_frag:Ap,cube_vert:Cp,cube_frag:Rp,depth_vert:Pp,depth_frag:Ip,distance_vert:Lp,distance_frag:Dp,equirect_vert:Fp,equirect_frag:Np,linedashed_vert:Up,linedashed_frag:Bp,meshbasic_vert:Op,meshbasic_frag:zp,meshlambert_vert:kp,meshlambert_frag:Vp,meshmatcap_vert:Hp,meshmatcap_frag:Gp,meshnormal_vert:Wp,meshnormal_frag:Xp,meshphong_vert:qp,meshphong_frag:Yp,meshphysical_vert:$p,meshphysical_frag:Zp,meshtoon_vert:Jp,meshtoon_frag:Kp,points_vert:jp,points_frag:Qp,shadow_vert:tm,shadow_frag:em,sprite_vert:im,sprite_frag:nm},dt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Ti={basic:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Be([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Be([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Be([dt.points,dt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Be([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Be([dt.common,dt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Be([dt.sprite,dt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distance:{uniforms:Be([dt.common,dt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distance_vert,fragmentShader:Wt.distance_frag},shadow:{uniforms:Be([dt.lights,dt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Ti.physical={uniforms:Be([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};var co={r:0,b:0,g:0},sm=new ae,iu=new Bt;iu.set(-1,0,0,0,1,0,0,0,1);function rm(s,t,e,i,n,r){let a=new Ft(0),o=n===!0?0:1,l,c,h=null,f=0,u=null;function d(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){let v=M.backgroundBlurriness>0;b=t.get(b,v)}return b}function g(M){let b=!1,v=d(M);v===null?m(a,o):v&&v.isColor&&(m(v,1),b=!0);let T=s.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(M,b){let v=d(b);v&&(v.isCubeTexture||v.mapping===Js)?(c===void 0&&(c=new st(new ge(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:wn(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(sm.makeRotationFromEuler(b.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(iu),c.material.toneMapped=Zt.getTransfer(v.colorSpace)!==Kt,(h!==v||f!==v.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,u=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new st(new Ni(2,2),new ei({name:"BackgroundMaterial",uniforms:wn(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Zt.getTransfer(v.colorSpace)!==Kt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,f=v.version,u=s.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,b){M.getRGB(co,zl(s)),e.buffers.color.setClear(co.r,co.g,co.b,b,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),o=b,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:g,addToRenderList:_,dispose:p}}function am(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null),r=n,a=!1;function o(I,L,W,k,D){let F=!1,U=f(I,k,W,L);r!==U&&(r=U,c(r.object)),F=d(I,k,W,D),F&&g(I,k,W,D),D!==null&&t.update(D,s.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,v(I,L,W,k),D!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function l(){return s.createVertexArray()}function c(I){return s.bindVertexArray(I)}function h(I){return s.deleteVertexArray(I)}function f(I,L,W,k){let D=k.wireframe===!0,F=i[L.id];F===void 0&&(F={},i[L.id]=F);let U=I.isInstancedMesh===!0?I.id:0,V=F[U];V===void 0&&(V={},F[U]=V);let J=V[W.id];J===void 0&&(J={},V[W.id]=J);let et=J[D];return et===void 0&&(et=u(l()),J[D]=et),et}function u(I){let L=[],W=[],k=[];for(let D=0;D<e;D++)L[D]=0,W[D]=0,k[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:k,object:I,attributes:{},index:null}}function d(I,L,W,k){let D=r.attributes,F=L.attributes,U=0,V=W.getAttributes();for(let J in V)if(V[J].location>=0){let rt=D[J],pt=F[J];if(pt===void 0&&(J==="instanceMatrix"&&I.instanceMatrix&&(pt=I.instanceMatrix),J==="instanceColor"&&I.instanceColor&&(pt=I.instanceColor)),rt===void 0||rt.attribute!==pt||pt&&rt.data!==pt.data)return!0;U++}return r.attributesNum!==U||r.index!==k}function g(I,L,W,k){let D={},F=L.attributes,U=0,V=W.getAttributes();for(let J in V)if(V[J].location>=0){let rt=F[J];rt===void 0&&(J==="instanceMatrix"&&I.instanceMatrix&&(rt=I.instanceMatrix),J==="instanceColor"&&I.instanceColor&&(rt=I.instanceColor));let pt={};pt.attribute=rt,rt&&rt.data&&(pt.data=rt.data),D[J]=pt,U++}r.attributes=D,r.attributesNum=U,r.index=k}function _(){let I=r.newAttributes;for(let L=0,W=I.length;L<W;L++)I[L]=0}function m(I){p(I,0)}function p(I,L){let W=r.newAttributes,k=r.enabledAttributes,D=r.attributeDivisors;W[I]=1,k[I]===0&&(s.enableVertexAttribArray(I),k[I]=1),D[I]!==L&&(s.vertexAttribDivisor(I,L),D[I]=L)}function M(){let I=r.newAttributes,L=r.enabledAttributes;for(let W=0,k=L.length;W<k;W++)L[W]!==I[W]&&(s.disableVertexAttribArray(W),L[W]=0)}function b(I,L,W,k,D,F,U){U===!0?s.vertexAttribIPointer(I,L,W,D,F):s.vertexAttribPointer(I,L,W,k,D,F)}function v(I,L,W,k){_();let D=k.attributes,F=W.getAttributes(),U=L.defaultAttributeValues;for(let V in F){let J=F[V];if(J.location>=0){let et=D[V];if(et===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(et=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(et=I.instanceColor)),et!==void 0){let rt=et.normalized,pt=et.itemSize,Xt=t.get(et);if(Xt===void 0)continue;let Pt=Xt.buffer,bt=Xt.type,$=Xt.bytesPerElement,it=bt===s.INT||bt===s.UNSIGNED_INT||et.gpuType===Ea;if(et.isInterleavedBufferAttribute){let tt=et.data,It=tt.stride,Lt=et.offset;if(tt.isInstancedInterleavedBuffer){for(let Rt=0;Rt<J.locationSize;Rt++)p(J.location+Rt,tt.meshPerAttribute);I.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Rt=0;Rt<J.locationSize;Rt++)m(J.location+Rt);s.bindBuffer(s.ARRAY_BUFFER,Pt);for(let Rt=0;Rt<J.locationSize;Rt++)b(J.location+Rt,pt/J.locationSize,bt,rt,It*$,(Lt+pt/J.locationSize*Rt)*$,it)}else{if(et.isInstancedBufferAttribute){for(let tt=0;tt<J.locationSize;tt++)p(J.location+tt,et.meshPerAttribute);I.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let tt=0;tt<J.locationSize;tt++)m(J.location+tt);s.bindBuffer(s.ARRAY_BUFFER,Pt);for(let tt=0;tt<J.locationSize;tt++)b(J.location+tt,pt/J.locationSize,bt,rt,pt*$,pt/J.locationSize*tt*$,it)}}else if(U!==void 0){let rt=U[V];if(rt!==void 0)switch(rt.length){case 2:s.vertexAttrib2fv(J.location,rt);break;case 3:s.vertexAttrib3fv(J.location,rt);break;case 4:s.vertexAttrib4fv(J.location,rt);break;default:s.vertexAttrib1fv(J.location,rt)}}}}M()}function T(){w();for(let I in i){let L=i[I];for(let W in L){let k=L[W];for(let D in k){let F=k[D];for(let U in F)h(F[U].object),delete F[U];delete k[D]}}delete i[I]}}function S(I){if(i[I.id]===void 0)return;let L=i[I.id];for(let W in L){let k=L[W];for(let D in k){let F=k[D];for(let U in F)h(F[U].object),delete F[U];delete k[D]}}delete i[I.id]}function A(I){for(let L in i){let W=i[L];for(let k in W){let D=W[k];if(D[I.id]===void 0)continue;let F=D[I.id];for(let U in F)h(F[U].object),delete F[U];delete D[I.id]}}}function x(I){for(let L in i){let W=i[L],k=I.isInstancedMesh===!0?I.id:0,D=W[k];if(D!==void 0){for(let F in D){let U=D[F];for(let V in U)h(U[V].object),delete U[V];delete D[F]}delete W[k],Object.keys(W).length===0&&delete i[L]}}}function w(){P(),a=!0,r!==n&&(r=n,c(r.object))}function P(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:w,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function om(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function lm(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(A){return!(A!==ai&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let x=A===Si&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Xe&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==pi&&!x)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(At("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&At("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=s.getParameter(s.MAX_SAMPLES),S=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:v,maxSamples:T,samples:S}}function cm(s){let t=this,e=null,i=0,n=!1,r=!1,a=new We,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||i!==0||n;return n=u,i=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=s.get(f);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:i,b=M*4,v=p.clippingState||null;l.value=v,v=h(g,u,b,d);for(let T=0;T!==b;++T)v[T]=e[T];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(f,u,d,g){let _=f!==null?f.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=d+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,v=d;b!==_;++b,v+=4)a.copy(f[b]).applyMatrix4(M,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var hn=4,Dh=[.125,.215,.35,.446,.526,.582],An=20,hm=256,sr=new Qn,Fh=new Ft,Gl=null,Wl=0,Xl=0,ql=!1,um=new R,ls=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){let{size:a=256,position:o=um}=r;Gl=this._renderer.getRenderTarget(),Wl=this._renderer.getActiveCubeFace(),Xl=this._renderer.getActiveMipmapLevel(),ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Gl,Wl,Xl),this._renderer.xr.enabled=ql,t.scissorTest=!1,as(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===an||t.mapping===Tn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Gl=this._renderer.getRenderTarget(),Wl=this._renderer.getActiveCubeFace(),Xl=this._renderer.getActiveMipmapLevel(),ql=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Se,minFilter:Se,generateMipmaps:!1,type:Si,format:ai,colorSpace:Ms,depthBuffer:!1},n=Nh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nh(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=dm(r)),this._blurMaterial=pm(r,t,e),this._ggxMaterial=fm(r,t,e)}return n}_compileMaterial(t){let e=new st(new ne,t);this._renderer.compile(e,sr)}_sceneToCubeUV(t,e,i,n,r){let l=new Re(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Fh),f.toneMapping=di,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(n),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new st(new ge,new ke({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,p=!0):(m.color.copy(Fh),p=!0);for(let b=0;b<6;b++){let v=b%3;v===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):v===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let T=this._cubeSize;as(n,v*T,b>2?T:0,T,T),f.setRenderTarget(n),p&&f.render(_,l),f.render(t,l)}f.toneMapping=d,f.autoClear=u,t.background=M}_textureToCubeUV(t,e){let i=this._renderer,n=t.mapping===an||t.mapping===Tn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uh());let r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;as(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,sr)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=0+c*1.25,d=f*u,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-hn?i-g+hn:0),p=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,as(r,m,p,3*_,2*_),n.setRenderTarget(r),n.render(o,sr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,as(t,m,p,3*_,2*_),n.setRenderTarget(t),n.render(o,sr)}_blur(t,e,i,n,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",r),this._halfBlur(a,t,i,i,n,"longitudinal",r)}_halfBlur(t,e,i,n,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Nt("blur direction must be either latitudinal or longitudinal!");let h=3,f=this._lodMeshes[n];f.material=c;let u=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*An-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):An;m>An&&At(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${An}`);let p=[],M=0;for(let A=0;A<An;++A){let x=A/_,w=Math.exp(-x*x/2);p.push(w),A===0?M+=w:A<m&&(M+=2*w)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-i;let v=this._sizeLods[n],T=3*v*(n>b-hn?n-b+hn:0),S=4*(this._cubeSize-v);as(e,T,S,3*v,2*v),l.setRenderTarget(e),l.render(f,sr)}};function dm(s){let t=[],e=[],i=[],n=s,r=s-hn+1+Dh.length;for(let a=0;a<r;a++){let o=Math.pow(2,n);t.push(o);let l=1/o;a>s-hn?l=Dh[a-s+hn-1]:a===0&&(l=0),e.push(l);let c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),b=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let S=0;S<d;S++){let A=S%3*2/3-1,x=S>2?0:-1,w=[A,x,0,A+2/3,x,0,A+2/3,x+1,0,A,x,0,A+2/3,x+1,0,A,x+1,0];M.set(w,_*g*S),b.set(u,m*g*S);let P=[S,S,S,S,S,S];v.set(P,p*g*S)}let T=new ne;T.setAttribute("position",new ve(M,_)),T.setAttribute("uv",new ve(b,m)),T.setAttribute("faceIndex",new ve(v,p)),i.push(new st(T,null)),n>hn&&n--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Nh(s,t,e){let i=new Qe(s,t,e);return i.texture.mapping=Js,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function as(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function fm(s,t,e){return new ei({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:po(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function pm(s,t,e){let i=new Float32Array(An),n=new R(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:An,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Uh(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Bh(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function po(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var uo=class extends Qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Ps(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new ge(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:wn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ve,blending:bi});r.uniforms.tEquirect.value=e;let a=new st(n,r),o=e.minFilter;return e.minFilter===on&&(e.minFilter=Se),new ya(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}};function mm(s){let t=new WeakMap,e=new WeakMap,i=null;function n(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===is||d===ba)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let _=new uo(g.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let d=u.mapping,g=d===is||d===ba,_=d===an||d===Tn;if(g||_){let m=e.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new ls(s)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let M=u.image;return g&&M&&M.height>0||_&&M&&l(M)?(i===null&&(i=new ls(s)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===is?u.mapping=an:d===ba&&(u.mapping=Tn),u}function l(u){let d=0,g=6;for(let _=0;_<g;_++)u[_]!==void 0&&d++;return d===g}function c(u){let d=u.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:f}}function gm(s){let t={};function e(i){if(t[i]!==void 0)return t[i];let n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let n=e(i);return n===null&&xn("WebGLRenderer: "+i+" extension not supported."),n}}}function xm(s,t,e,i){let n={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete n[u.id];let d=r.get(u);d&&(t.remove(d),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,e.memory.geometries++),u}function l(f){let u=f.attributes;for(let d in u)t.update(u[d],s.ARRAY_BUFFER)}function c(f){let u=[],d=f.index,g=f.attributes.position,_=0;if(g===void 0)return;if(d!==null){let M=d.array;_=d.version;for(let b=0,v=M.length;b<v;b+=3){let T=M[b+0],S=M[b+1],A=M[b+2];u.push(T,S,S,A,A,T)}}else{let M=g.array;_=g.version;for(let b=0,v=M.length/3-1;b<v;b+=3){let T=b+0,S=b+1,A=b+2;u.push(T,S,S,A,A,T)}}let m=new(g.count>=65535?Rs:Cs)(u,1);m.version=_;let p=r.get(f);p&&t.remove(p),r.set(f,m)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function _m(s,t,e){let i;function n(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){s.drawElements(i,u,r,f*a),e.update(u,i,1)}function c(f,u,d){d!==0&&(s.drawElementsInstanced(i,u,r,f*a,d),e.update(u,i,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,d);let _=0;for(let m=0;m<d;m++)_+=u[m];e.update(_,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function ym(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:Nt("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function vm(s,t,e){let i=new WeakMap,n=new ce;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==f){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],b=0;d===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let v=o.attributes.position.count*b,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let S=new Float32Array(v*T*4*f),A=new Es(S,v,T,f);A.type=pi,A.needsUpdate=!0;let x=b*4;for(let P=0;P<f;P++){let I=m[P],L=p[P],W=M[P],k=v*T*4*P;for(let D=0;D<I.count;D++){let F=D*x;d===!0&&(n.fromBufferAttribute(I,D),S[k+F+0]=n.x,S[k+F+1]=n.y,S[k+F+2]=n.z,S[k+F+3]=0),g===!0&&(n.fromBufferAttribute(L,D),S[k+F+4]=n.x,S[k+F+5]=n.y,S[k+F+6]=n.z,S[k+F+7]=0),_===!0&&(n.fromBufferAttribute(W,D),S[k+F+8]=n.x,S[k+F+9]=n.y,S[k+F+10]=n.z,S[k+F+11]=W.itemSize===4?n.w:1)}}u={count:f,texture:A,size:new xt(v,T)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Mm(s,t,e,i,n){let r=new WeakMap;function a(c){let h=n.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var bm={[vl]:"LINEAR_TONE_MAPPING",[Ml]:"REINHARD_TONE_MAPPING",[bl]:"CINEON_TONE_MAPPING",[Zs]:"ACES_FILMIC_TONE_MAPPING",[El]:"AGX_TONE_MAPPING",[Tl]:"NEUTRAL_TONE_MAPPING",[Sl]:"CUSTOM_TONE_MAPPING"};function Sm(s,t,e,i,n,r){let a=new Qe(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,depthTexture:n?new Fi(t,e):void 0}),o=new Qe(t,e,{type:Si,depthBuffer:!1,stencilBuffer:!1}),l=new ne;l.setAttribute("position",new Gt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Gt([0,2,0,0,2,0],2));let c=new aa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new st(l,c),f=new Qn(-1,1,1,-1,0,1),u=null,d=null,g=!1,_,m=null,p=[],M=!1;this.setSize=function(b,v){a.setSize(b,v),o.setSize(b,v);for(let T=0;T<p.length;T++){let S=p[T];S.setSize&&S.setSize(b,v)}},this.setEffects=function(b){p=b,M=p.length>0&&p[0].isRenderPass===!0;let v=a.width,T=a.height;for(let S=0;S<p.length;S++){let A=p[S];A.setSize&&A.setSize(v,T)}},this.begin=function(b,v){if(g||b.toneMapping===di&&p.length===0)return!1;if(m=v,v!==null){let T=v.width,S=v.height;(a.width!==T||a.height!==S)&&this.setSize(T,S)}return M===!1&&b.setRenderTarget(a),_=b.toneMapping,b.toneMapping=di,!0},this.hasRenderPass=function(){return M},this.end=function(b,v){b.toneMapping=_,g=!0;let T=a,S=o;for(let A=0;A<p.length;A++){let x=p[A];if(x.enabled!==!1&&(x.render(b,S,T,v),x.needsSwap!==!1)){let w=T;T=S,S=w}}if(u!==b.outputColorSpace||d!==b.toneMapping){u=b.outputColorSpace,d=b.toneMapping,c.defines={},Zt.getTransfer(u)===Kt&&(c.defines.SRGB_TRANSFER="");let A=bm[d];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,b.setRenderTarget(m),b.render(h,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var nu=new ze,Zl=new Fi(1,1),su=new Es,ru=new Yr,au=new Ps,Oh=[],zh=[],kh=new Float32Array(16),Vh=new Float32Array(9),Hh=new Float32Array(4);function cs(s,t,e){let i=s[0];if(i<=0||i>0)return s;let n=t*e,r=Oh[n];if(r===void 0&&(r=new Float32Array(n),Oh[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Ee(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function Te(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function mo(s,t){let e=zh[t];e===void 0&&(e=new Int32Array(t),zh[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Em(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Tm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2fv(this.addr,t),Te(e,t)}}function wm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;s.uniform3fv(this.addr,t),Te(e,t)}}function Am(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4fv(this.addr,t),Te(e,t)}}function Cm(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,i))return;Hh.set(i),s.uniformMatrix2fv(this.addr,!1,Hh),Te(e,i)}}function Rm(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,i))return;Vh.set(i),s.uniformMatrix3fv(this.addr,!1,Vh),Te(e,i)}}function Pm(s,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,i))return;kh.set(i),s.uniformMatrix4fv(this.addr,!1,kh),Te(e,i)}}function Im(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Lm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2iv(this.addr,t),Te(e,t)}}function Dm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3iv(this.addr,t),Te(e,t)}}function Fm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4iv(this.addr,t),Te(e,t)}}function Nm(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Um(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2uiv(this.addr,t),Te(e,t)}}function Bm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3uiv(this.addr,t),Te(e,t)}}function Om(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4uiv(this.addr,t),Te(e,t)}}function zm(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Zl.compareFunction=e.isReversedDepthBuffer()?lo:oo,r=Zl):r=nu,e.setTexture2D(t||r,n)}function km(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||ru,n)}function Vm(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||au,n)}function Hm(s,t,e){let i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||su,n)}function Gm(s){switch(s){case 5126:return Em;case 35664:return Tm;case 35665:return wm;case 35666:return Am;case 35674:return Cm;case 35675:return Rm;case 35676:return Pm;case 5124:case 35670:return Im;case 35667:case 35671:return Lm;case 35668:case 35672:return Dm;case 35669:case 35673:return Fm;case 5125:return Nm;case 36294:return Um;case 36295:return Bm;case 36296:return Om;case 35678:case 36198:case 36298:case 36306:case 35682:return zm;case 35679:case 36299:case 36307:return km;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Hm}}function Wm(s,t){s.uniform1fv(this.addr,t)}function Xm(s,t){let e=cs(t,this.size,2);s.uniform2fv(this.addr,e)}function qm(s,t){let e=cs(t,this.size,3);s.uniform3fv(this.addr,e)}function Ym(s,t){let e=cs(t,this.size,4);s.uniform4fv(this.addr,e)}function $m(s,t){let e=cs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Zm(s,t){let e=cs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Jm(s,t){let e=cs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Km(s,t){s.uniform1iv(this.addr,t)}function jm(s,t){s.uniform2iv(this.addr,t)}function Qm(s,t){s.uniform3iv(this.addr,t)}function tg(s,t){s.uniform4iv(this.addr,t)}function eg(s,t){s.uniform1uiv(this.addr,t)}function ig(s,t){s.uniform2uiv(this.addr,t)}function ng(s,t){s.uniform3uiv(this.addr,t)}function sg(s,t){s.uniform4uiv(this.addr,t)}function rg(s,t,e){let i=this.cache,n=t.length,r=mo(e,n);Ee(i,r)||(s.uniform1iv(this.addr,r),Te(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Zl:a=nu;for(let o=0;o!==n;++o)e.setTexture2D(t[o]||a,r[o])}function ag(s,t,e){let i=this.cache,n=t.length,r=mo(e,n);Ee(i,r)||(s.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||ru,r[a])}function og(s,t,e){let i=this.cache,n=t.length,r=mo(e,n);Ee(i,r)||(s.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||au,r[a])}function lg(s,t,e){let i=this.cache,n=t.length,r=mo(e,n);Ee(i,r)||(s.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||su,r[a])}function cg(s){switch(s){case 5126:return Wm;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return $m;case 35675:return Zm;case 35676:return Jm;case 5124:case 35670:return Km;case 35667:case 35671:return jm;case 35668:case 35672:return Qm;case 35669:case 35673:return tg;case 5125:return eg;case 36294:return ig;case 36295:return ng;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return ag;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return lg}}var Jl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Gm(e.type)}},Kl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cg(e.type)}},jl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let n=this.seq;for(let r=0,a=n.length;r!==a;++r){let o=n[r];o.setValue(t,e[o.id],i)}}},Yl=/(\w+)(\])?(\[|\.)?/g;function Gh(s,t){s.seq.push(t),s.map[t.id]=t}function hg(s,t,e){let i=s.name,n=i.length;for(Yl.lastIndex=0;;){let r=Yl.exec(i),a=Yl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Gh(e,c===void 0?new Jl(o,s,t):new Kl(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new jl(o),Gh(e,f)),e=f}}}var os=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);hg(o,l,this)}let n=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){let r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){let n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){let i=[];for(let n=0,r=t.length;n!==r;++n){let a=t[n];a.id in e&&i.push(a)}return i}};function Wh(s,t,e){let i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}var ug=37297,dg=0;function fg(s,t){let e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Xh=new Bt;function pg(s){Zt._getMatrix(Xh,Zt.workingColorSpace,s);let t=`mat3( ${Xh.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(s)){case bs:return[t,"LinearTransferOETF"];case Kt:return[t,"sRGBTransferOETF"];default:return At("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function qh(s,t,e){let i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+fg(s.getShaderSource(t),o)}else return r}function mg(s,t){let e=pg(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var gg={[vl]:"Linear",[Ml]:"Reinhard",[bl]:"Cineon",[Zs]:"ACESFilmic",[El]:"AgX",[Tl]:"Neutral",[Sl]:"Custom"};function xg(s,t){let e=gg[t];return e===void 0?(At("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ho=new R;function _g(){Zt.getLuminanceCoefficients(ho);let s=ho.x.toFixed(4),t=ho.y.toFixed(4),e=ho.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function vg(s){let t=[];for(let e in s){let i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Mg(s,t){let e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let r=s.getActiveAttrib(t,n),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function ar(s){return s!==""}function Yh(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $h(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var bg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(s){return s.replace(bg,Eg)}var Sg=new Map;function Eg(s,t){let e=Wt[t];if(e===void 0){let i=Sg.get(t);if(i!==void 0)e=Wt[i],At('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ql(e)}var Tg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zh(s){return s.replace(Tg,wg)}function wg(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Jh(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Ag={[$s]:"SHADOWMAP_TYPE_PCF",[es]:"SHADOWMAP_TYPE_VSM"};function Cg(s){return Ag[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Rg={[an]:"ENVMAP_TYPE_CUBE",[Tn]:"ENVMAP_TYPE_CUBE",[Js]:"ENVMAP_TYPE_CUBE_UV"};function Pg(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Rg[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ig={[Tn]:"ENVMAP_MODE_REFRACTION"};function Lg(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Ig[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Dg={[yl]:"ENVMAP_BLENDING_MULTIPLY",[mh]:"ENVMAP_BLENDING_MIX",[gh]:"ENVMAP_BLENDING_ADD"};function Fg(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Dg[s.combine]||"ENVMAP_BLENDING_NONE"}function Ng(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Ug(s,t,e,i){let n=s.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Cg(e),c=Pg(e),h=Lg(e),f=Fg(e),u=Ng(e),d=yg(e),g=vg(r),_=n.createProgram(),m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),p.length>0&&(p+=`
`)):(m=[Jh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),p=[Jh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==di?"#define TONE_MAPPING":"",e.toneMapping!==di?Wt.tonemapping_pars_fragment:"",e.toneMapping!==di?xg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,mg("linearToOutputTexel",e.outputColorSpace),_g(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ar).join(`
`)),a=Ql(a),a=Yh(a,e),a=$h(a,e),o=Ql(o),o=Yh(o,e),o=$h(o,e),a=Zh(a),o=Zh(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=M+m+a,v=M+p+o,T=Wh(n,n.VERTEX_SHADER,b),S=Wh(n,n.FRAGMENT_SHADER,v);n.attachShader(_,T),n.attachShader(_,S),e.index0AttributeName!==void 0?n.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(_,0,"position"),n.linkProgram(_);function A(I){if(s.debug.checkShaderErrors){let L=n.getProgramInfoLog(_)||"",W=n.getShaderInfoLog(T)||"",k=n.getShaderInfoLog(S)||"",D=L.trim(),F=W.trim(),U=k.trim(),V=!0,J=!0;if(n.getProgramParameter(_,n.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,_,T,S);else{let et=qh(n,T,"vertex"),rt=qh(n,S,"fragment");Nt("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(_,n.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+D+`
`+et+`
`+rt)}else D!==""?At("WebGLProgram: Program Info Log:",D):(F===""||U==="")&&(J=!1);J&&(I.diagnostics={runnable:V,programLog:D,vertexShader:{log:F,prefix:m},fragmentShader:{log:U,prefix:p}})}n.deleteShader(T),n.deleteShader(S),x=new os(n,_),w=Mg(n,_)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=n.getProgramParameter(_,ug)),P},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=S,this}var Bg=0,tc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new ec(t),e.set(t,i)),i}},ec=class{constructor(t){this.id=Bg++,this.code=t,this.usedTimes=0}};function Og(s){return s===cn||s===ir||s===nr}function zg(s,t,e,i,n,r){let a=new Ts,o=new tc,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function _(x,w,P,I,L,W){let k=I.fog,D=L.geometry,F=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,U=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,V=t.get(x.envMap||F,U),J=V&&V.mapping===Js?V.image.height:null,et=d[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&At("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let rt=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,pt=rt!==void 0?rt.length:0,Xt=0;D.morphAttributes.position!==void 0&&(Xt=1),D.morphAttributes.normal!==void 0&&(Xt=2),D.morphAttributes.color!==void 0&&(Xt=3);let Pt,bt,$,it;if(et){let vt=Ti[et];Pt=vt.vertexShader,bt=vt.fragmentShader}else{Pt=x.vertexShader,bt=x.fragmentShader;let vt=o.getVertexShaderStage(x),de=o.getFragmentShaderStage(x);o.update(x,vt,de),$=vt.id,it=de.id}let tt=s.getRenderTarget(),It=s.state.buffers.depth.getReversed(),Lt=L.isInstancedMesh===!0,Rt=L.isBatchedMesh===!0,le=!!x.map,qt=!!x.matcap,$t=!!V,Vt=!!x.aoMap,Ut=!!x.lightMap,xe=!!x.bumpMap&&x.wireframe===!1,be=!!x.normalMap,Ae=!!x.displacementMap,Le=!!x.emissiveMap,ue=!!x.metalnessMap,_e=!!x.roughnessMap,B=x.anisotropy>0,Ge=x.clearcoat>0,jt=x.dispersion>0,C=x.iridescence>0,y=x.sheen>0,z=x.transmission>0,X=B&&!!x.anisotropyMap,Y=Ge&&!!x.clearcoatMap,nt=Ge&&!!x.clearcoatNormalMap,ot=Ge&&!!x.clearcoatRoughnessMap,Z=C&&!!x.iridescenceMap,j=C&&!!x.iridescenceThicknessMap,lt=y&&!!x.sheenColorMap,Et=y&&!!x.sheenRoughnessMap,ut=!!x.specularMap,ct=!!x.specularColorMap,Ct=!!x.specularIntensityMap,Dt=z&&!!x.transmissionMap,Ot=z&&!!x.thicknessMap,N=!!x.gradientMap,at=!!x.alphaMap,K=x.alphaTest>0,ht=!!x.alphaHash,gt=!!x.extensions,Q=di;x.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Q=s.toneMapping);let St={shaderID:et,shaderType:x.type,shaderName:x.name,vertexShader:Pt,fragmentShader:bt,defines:x.defines,customVertexShaderID:$,customFragmentShaderID:it,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Rt,batchingColor:Rt&&L._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&L.instanceColor!==null,instancingMorph:Lt&&L.morphTexture!==null,outputColorSpace:tt===null?s.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Zt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:le,matcap:qt,envMap:$t,envMapMode:$t&&V.mapping,envMapCubeUVHeight:J,aoMap:Vt,lightMap:Ut,bumpMap:xe,normalMap:be,displacementMap:Ae,emissiveMap:Le,normalMapObjectSpace:be&&x.normalMapType===yh,normalMapTangentSpace:be&&x.normalMapType===ao,packedNormalMap:be&&x.normalMapType===ao&&Og(x.normalMap.format),metalnessMap:ue,roughnessMap:_e,anisotropy:B,anisotropyMap:X,clearcoat:Ge,clearcoatMap:Y,clearcoatNormalMap:nt,clearcoatRoughnessMap:ot,dispersion:jt,iridescence:C,iridescenceMap:Z,iridescenceThicknessMap:j,sheen:y,sheenColorMap:lt,sheenRoughnessMap:Et,specularMap:ut,specularColorMap:ct,specularIntensityMap:Ct,transmission:z,transmissionMap:Dt,thicknessMap:Ot,gradientMap:N,opaque:x.transparent===!1&&x.blending===Di&&x.alphaToCoverage===!1,alphaMap:at,alphaTest:K,alphaHash:ht,combine:x.combine,mapUv:le&&g(x.map.channel),aoMapUv:Vt&&g(x.aoMap.channel),lightMapUv:Ut&&g(x.lightMap.channel),bumpMapUv:xe&&g(x.bumpMap.channel),normalMapUv:be&&g(x.normalMap.channel),displacementMapUv:Ae&&g(x.displacementMap.channel),emissiveMapUv:Le&&g(x.emissiveMap.channel),metalnessMapUv:ue&&g(x.metalnessMap.channel),roughnessMapUv:_e&&g(x.roughnessMap.channel),anisotropyMapUv:X&&g(x.anisotropyMap.channel),clearcoatMapUv:Y&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:nt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Et&&g(x.sheenRoughnessMap.channel),specularMapUv:ut&&g(x.specularMap.channel),specularColorMapUv:ct&&g(x.specularColorMap.channel),specularIntensityMapUv:Ct&&g(x.specularIntensityMap.channel),transmissionMapUv:Dt&&g(x.transmissionMap.channel),thicknessMapUv:Ot&&g(x.thicknessMap.channel),alphaMapUv:at&&g(x.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(be||B),vertexNormals:!!D.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!D.attributes.uv&&(le||at),fog:!!k,useFog:x.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||D.attributes.normal===void 0&&be===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:It,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:Xt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Q,decodeVideoTexture:le&&x.map.isVideoTexture===!0&&Zt.getTransfer(x.map.colorSpace)===Kt,decodeVideoTextureEmissive:Le&&x.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(x.emissiveMap.colorSpace)===Kt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===He,flipSided:x.side===Ve,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:gt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&x.extensions.multiDraw===!0||Rt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function m(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)w.push(P),w.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(p(w,x),M(w,x),w.push(s.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function p(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function M(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function b(x){let w=d[x.type],P;if(w){let I=Ti[w];P=Ih.clone(I.uniforms)}else P=x.uniforms;return P}function v(x,w){let P=h.get(w);return P!==void 0?++P.usedTimes:(P=new Ug(s,w,x,n),c.push(P),h.set(w,P)),P}function T(x){if(--x.usedTimes===0){let w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){o.remove(x)}function A(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:b,acquireProgram:v,releaseProgram:T,releaseShaderCache:S,programs:c,dispose:A}}function kg(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function Vg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Kh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function jh(){let s=[],t=0,e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,_,m,p){let M=s[t];return M===void 0?(M={id:u.id,object:u,geometry:d,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:p},s[t]=M):(M.id=u.id,M.object=u,M.geometry=d,M.material=g,M.materialVariant=a(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=p),t++,M}function l(u,d,g,_,m,p){let M=o(u,d,g,_,m,p);g.transmission>0?i.push(M):g.transparent===!0?n.push(M):e.push(M)}function c(u,d,g,_,m,p){let M=o(u,d,g,_,m,p);g.transmission>0?i.unshift(M):g.transparent===!0?n.unshift(M):e.unshift(M)}function h(u,d,g){e.length>1&&e.sort(u||Vg),i.length>1&&i.sort(d||Kh),n.length>1&&n.sort(d||Kh),g&&(e.reverse(),i.reverse(),n.reverse())}function f(){for(let u=t,d=s.length;u<d;u++){let g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:f,sort:h}}function Hg(){let s=new WeakMap;function t(i,n){let r=s.get(i),a;return r===void 0?(a=new jh,s.set(i,[a])):n>=r.length?(a=new jh,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Gg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new Ft};break;case"SpotLight":e={position:new R,direction:new R,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new R,halfWidth:new R,halfHeight:new R};break}return s[t.id]=e,e}}}function Wg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Xg=0;function qg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Yg(s){let t=new Gg,e=Wg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let n=new R,r=new ae,a=new ae;function o(c){let h=0,f=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,b=0,v=0,T=0,S=0,A=0;c.sort(qg);for(let w=0,P=c.length;w<P;w++){let I=c[w],L=I.color,W=I.intensity,k=I.distance,D=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===cn?D=I.shadow.map.texture:D=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=L.r*W,f+=L.g*W,u+=L.b*W;else if(I.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(I.sh.coefficients[F],W);A++}else if(I.isDirectionalLight){let F=t.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let U=I.shadow,V=e.get(I);V.shadowIntensity=U.intensity,V.shadowBias=U.bias,V.shadowNormalBias=U.normalBias,V.shadowRadius=U.radius,V.shadowMapSize=U.mapSize,i.directionalShadow[d]=V,i.directionalShadowMap[d]=D,i.directionalShadowMatrix[d]=I.shadow.matrix,M++}i.directional[d]=F,d++}else if(I.isSpotLight){let F=t.get(I);F.position.setFromMatrixPosition(I.matrixWorld),F.color.copy(L).multiplyScalar(W),F.distance=k,F.coneCos=Math.cos(I.angle),F.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),F.decay=I.decay,i.spot[_]=F;let U=I.shadow;if(I.map&&(i.spotLightMap[T]=I.map,T++,U.updateMatrices(I),I.castShadow&&S++),i.spotLightMatrix[_]=U.matrix,I.castShadow){let V=e.get(I);V.shadowIntensity=U.intensity,V.shadowBias=U.bias,V.shadowNormalBias=U.normalBias,V.shadowRadius=U.radius,V.shadowMapSize=U.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=D,v++}_++}else if(I.isRectAreaLight){let F=t.get(I);F.color.copy(L).multiplyScalar(W),F.halfWidth.set(I.width*.5,0,0),F.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=F,m++}else if(I.isPointLight){let F=t.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),F.distance=I.distance,F.decay=I.decay,I.castShadow){let U=I.shadow,V=e.get(I);V.shadowIntensity=U.intensity,V.shadowBias=U.bias,V.shadowNormalBias=U.normalBias,V.shadowRadius=U.radius,V.shadowMapSize=U.mapSize,V.shadowCameraNear=U.camera.near,V.shadowCameraFar=U.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=D,i.pointShadowMatrix[g]=I.shadow.matrix,b++}i.point[g]=F,g++}else if(I.isHemisphereLight){let F=t.get(I);F.skyColor.copy(I.color).multiplyScalar(W),F.groundColor.copy(I.groundColor).multiplyScalar(W),i.hemi[p]=F,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;let x=i.hash;(x.directionalLength!==d||x.pointLength!==g||x.spotLength!==_||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==M||x.numPointShadows!==b||x.numSpotShadows!==v||x.numSpotMaps!==T||x.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=v+T-S,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=A,x.directionalLength=d,x.pointLength=g,x.spotLength=_,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=M,x.numPointShadows=b,x.numSpotShadows=v,x.numSpotMaps=T,x.numLightProbes=A,i.version=Xg++)}function l(c,h){let f=0,u=0,d=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){let b=c[p];if(b.isDirectionalLight){let v=i.directional[f];v.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(n),v.direction.transformDirection(m),f++}else if(b.isSpotLight){let v=i.spot[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(n),v.direction.transformDirection(m),d++}else if(b.isRectAreaLight){let v=i.rectArea[g];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){let v=i.point[u];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){let v=i.hemi[_];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function Qh(s){let t=new Yg(s),e=[],i=[],n=[];function r(u){f.camera=u,e.length=0,i.length=0,n.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function l(u){n.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let f={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function $g(s){let t=new WeakMap;function e(n,r=0){let a=t.get(n),o;return a===void 0?(o=new Qh(s),t.set(n,[o])):r>=a.length?(o=new Qh(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Zg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Kg=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],jg=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],tu=new ae,rr=new R,$l=new R;function Qg(s,t,e){let i=new Zn,n=new xt,r=new xt,a=new ce,o=new oa,l=new la,c={},h=e.maxTextureSize,f={[Li]:Ve,[Ve]:Li,[He]:He},u=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:Zg,fragmentShader:Jg}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new ne;g.setAttribute("position",new ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new st(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$s;let p=this.type;this.render=function(S,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Ma&&(At("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=$s);let w=s.getRenderTarget(),P=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),L=s.state;L.setBlending(bi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let W=p!==this.type;W&&A.traverse(function(k){k.material&&(Array.isArray(k.material)?k.material.forEach(D=>D.needsUpdate=!0):k.material.needsUpdate=!0)});for(let k=0,D=S.length;k<D;k++){let F=S[k],U=F.shadow;if(U===void 0){At("WebGLShadowMap:",F,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;n.copy(U.mapSize);let V=U.getFrameExtents();n.multiply(V),r.copy(U.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/V.x),n.x=r.x*V.x,U.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/V.y),n.y=r.y*V.y,U.mapSize.y=r.y));let J=s.state.buffers.depth.getReversed();if(U.camera._reversedDepth=J,U.map===null||W===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===es){if(F.isPointLight){At("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new Qe(n.x,n.y,{format:cn,type:Si,minFilter:Se,magFilter:Se,generateMipmaps:!1}),U.map.texture.name=F.name+".shadowMap",U.map.depthTexture=new Fi(n.x,n.y,pi),U.map.depthTexture.name=F.name+".shadowMapDepth",U.map.depthTexture.format=vi,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Ie,U.map.depthTexture.magFilter=Ie}else F.isPointLight?(U.map=new uo(n.x),U.map.depthTexture=new jr(n.x,fi)):(U.map=new Qe(n.x,n.y),U.map.depthTexture=new Fi(n.x,n.y,fi)),U.map.depthTexture.name=F.name+".shadowMap",U.map.depthTexture.format=vi,this.type===$s?(U.map.depthTexture.compareFunction=J?lo:oo,U.map.depthTexture.minFilter=Se,U.map.depthTexture.magFilter=Se):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Ie,U.map.depthTexture.magFilter=Ie);U.camera.updateProjectionMatrix()}let et=U.map.isWebGLCubeRenderTarget?6:1;for(let rt=0;rt<et;rt++){if(U.map.isWebGLCubeRenderTarget)s.setRenderTarget(U.map,rt),s.clear();else{rt===0&&(s.setRenderTarget(U.map),s.clear());let pt=U.getViewport(rt);a.set(r.x*pt.x,r.y*pt.y,r.x*pt.z,r.y*pt.w),L.viewport(a)}if(F.isPointLight){let pt=U.camera,Xt=U.matrix,Pt=F.distance||pt.far;Pt!==pt.far&&(pt.far=Pt,pt.updateProjectionMatrix()),rr.setFromMatrixPosition(F.matrixWorld),pt.position.copy(rr),$l.copy(pt.position),$l.add(Kg[rt]),pt.up.copy(jg[rt]),pt.lookAt($l),pt.updateMatrixWorld(),Xt.makeTranslation(-rr.x,-rr.y,-rr.z),tu.multiplyMatrices(pt.projectionMatrix,pt.matrixWorldInverse),U._frustum.setFromProjectionMatrix(tu,pt.coordinateSystem,pt.reversedDepth)}else U.updateMatrices(F);i=U.getFrustum(),v(A,x,U.camera,F,this.type)}U.isPointLightShadow!==!0&&this.type===es&&M(U,x),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(w,P,I)};function M(S,A){let x=t.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Qe(n.x,n.y,{format:cn,type:Si})),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(A,null,x,u,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(A,null,x,d,_,null)}function b(S,A,x,w){let P=null,I=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)P=I;else if(P=x.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let L=P.uuid,W=A.uuid,k=c[L];k===void 0&&(k={},c[L]=k);let D=k[W];D===void 0&&(D=P.clone(),k[W]=D,A.addEventListener("dispose",T)),P=D}if(P.visible=A.visible,P.wireframe=A.wireframe,w===es?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:f[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let L=s.properties.get(P);L.light=x}return P}function v(S,A,x,w,P){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===es)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let W=t.update(S),k=S.material;if(Array.isArray(k)){let D=W.groups;for(let F=0,U=D.length;F<U;F++){let V=D[F],J=k[V.materialIndex];if(J&&J.visible){let et=b(S,J,w,P);S.onBeforeShadow(s,S,A,x,W,et,V),s.renderBufferDirect(x,null,W,et,S,V),S.onAfterShadow(s,S,A,x,W,et,V)}}}else if(k.visible){let D=b(S,k,w,P);S.onBeforeShadow(s,S,A,x,W,D,null),s.renderBufferDirect(x,null,W,D,S,null),S.onAfterShadow(s,S,A,x,W,D,null)}}let L=S.children;for(let W=0,k=L.length;W<k;W++)v(L[W],A,x,w,P)}function T(S){S.target.removeEventListener("dispose",T);for(let x in c){let w=c[x],P=S.target.uuid;P in w&&(w[P].dispose(),delete w[P])}}}function t0(s,t){function e(){let N=!1,at=new ce,K=null,ht=new ce(0,0,0,0);return{setMask:function(gt){K!==gt&&!N&&(s.colorMask(gt,gt,gt,gt),K=gt)},setLocked:function(gt){N=gt},setClear:function(gt,Q,St,vt,de){de===!0&&(gt*=vt,Q*=vt,St*=vt),at.set(gt,Q,St,vt),ht.equals(at)===!1&&(s.clearColor(gt,Q,St,vt),ht.copy(at))},reset:function(){N=!1,K=null,ht.set(-1,0,0,0)}}}function i(){let N=!1,at=!1,K=null,ht=null,gt=null;return{setReversed:function(Q){if(at!==Q){let St=t.get("EXT_clip_control");Q?St.clipControlEXT(St.LOWER_LEFT_EXT,St.ZERO_TO_ONE_EXT):St.clipControlEXT(St.LOWER_LEFT_EXT,St.NEGATIVE_ONE_TO_ONE_EXT),at=Q;let vt=gt;gt=null,this.setClear(vt)}},getReversed:function(){return at},setTest:function(Q){Q?tt(s.DEPTH_TEST):It(s.DEPTH_TEST)},setMask:function(Q){K!==Q&&!N&&(s.depthMask(Q),K=Q)},setFunc:function(Q){if(at&&(Q=Rh[Q]),ht!==Q){switch(Q){case Ur:s.depthFunc(s.NEVER);break;case Br:s.depthFunc(s.ALWAYS);break;case Or:s.depthFunc(s.LESS);break;case _n:s.depthFunc(s.LEQUAL);break;case zr:s.depthFunc(s.EQUAL);break;case kr:s.depthFunc(s.GEQUAL);break;case Vr:s.depthFunc(s.GREATER);break;case Hr:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ht=Q}},setLocked:function(Q){N=Q},setClear:function(Q){gt!==Q&&(gt=Q,at&&(Q=1-Q),s.clearDepth(Q))},reset:function(){N=!1,K=null,ht=null,gt=null,at=!1}}}function n(){let N=!1,at=null,K=null,ht=null,gt=null,Q=null,St=null,vt=null,de=null;return{setTest:function(se){N||(se?tt(s.STENCIL_TEST):It(s.STENCIL_TEST))},setMask:function(se){at!==se&&!N&&(s.stencilMask(se),at=se)},setFunc:function(se,mi,gi){(K!==se||ht!==mi||gt!==gi)&&(s.stencilFunc(se,mi,gi),K=se,ht=mi,gt=gi)},setOp:function(se,mi,gi){(Q!==se||St!==mi||vt!==gi)&&(s.stencilOp(se,mi,gi),Q=se,St=mi,vt=gi)},setLocked:function(se){N=se},setClear:function(se){de!==se&&(s.clearStencil(se),de=se)},reset:function(){N=!1,at=null,K=null,ht=null,gt=null,Q=null,St=null,vt=null,de=null}}}let r=new e,a=new i,o=new n,l=new WeakMap,c=new WeakMap,h={},f={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,b=null,v=null,T=null,S=null,A=null,x=new Ft(0,0,0),w=0,P=!1,I=null,L=null,W=null,k=null,D=null,F=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),U=!1,V=0,J=s.getParameter(s.VERSION);J.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(J)[1]),U=V>=1):J.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),U=V>=2);let et=null,rt={},pt=s.getParameter(s.SCISSOR_BOX),Xt=s.getParameter(s.VIEWPORT),Pt=new ce().fromArray(pt),bt=new ce().fromArray(Xt);function $(N,at,K,ht){let gt=new Uint8Array(4),Q=s.createTexture();s.bindTexture(N,Q),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let St=0;St<K;St++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(at,0,s.RGBA,1,1,ht,0,s.RGBA,s.UNSIGNED_BYTE,gt):s.texImage2D(at+St,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,gt);return Q}let it={};it[s.TEXTURE_2D]=$(s.TEXTURE_2D,s.TEXTURE_2D,1),it[s.TEXTURE_CUBE_MAP]=$(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[s.TEXTURE_2D_ARRAY]=$(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),it[s.TEXTURE_3D]=$(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(s.DEPTH_TEST),a.setFunc(_n),xe(!1),be(ml),tt(s.CULL_FACE),Vt(bi);function tt(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function It(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function Lt(N,at){return u[N]!==at?(s.bindFramebuffer(N,at),u[N]=at,N===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=at),N===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=at),!0):!1}function Rt(N,at){let K=g,ht=!1;if(N){K=d.get(at),K===void 0&&(K=[],d.set(at,K));let gt=N.textures;if(K.length!==gt.length||K[0]!==s.COLOR_ATTACHMENT0){for(let Q=0,St=gt.length;Q<St;Q++)K[Q]=s.COLOR_ATTACHMENT0+Q;K.length=gt.length,ht=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,ht=!0);ht&&s.drawBuffers(K)}function le(N){return _!==N?(s.useProgram(N),_=N,!0):!1}let qt={[$i]:s.FUNC_ADD,[jc]:s.FUNC_SUBTRACT,[Qc]:s.FUNC_REVERSE_SUBTRACT};qt[th]=s.MIN,qt[eh]=s.MAX;let $t={[ih]:s.ZERO,[nh]:s.ONE,[sh]:s.SRC_COLOR,[Fr]:s.SRC_ALPHA,[hh]:s.SRC_ALPHA_SATURATE,[lh]:s.DST_COLOR,[ah]:s.DST_ALPHA,[rh]:s.ONE_MINUS_SRC_COLOR,[Nr]:s.ONE_MINUS_SRC_ALPHA,[ch]:s.ONE_MINUS_DST_COLOR,[oh]:s.ONE_MINUS_DST_ALPHA,[uh]:s.CONSTANT_COLOR,[dh]:s.ONE_MINUS_CONSTANT_COLOR,[fh]:s.CONSTANT_ALPHA,[ph]:s.ONE_MINUS_CONSTANT_ALPHA};function Vt(N,at,K,ht,gt,Q,St,vt,de,se){if(N===bi){m===!0&&(It(s.BLEND),m=!1);return}if(m===!1&&(tt(s.BLEND),m=!0),N!==Kc){if(N!==p||se!==P){if((M!==$i||T!==$i)&&(s.blendEquation(s.FUNC_ADD),M=$i,T=$i),se)switch(N){case Di:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case gl:s.blendFunc(s.ONE,s.ONE);break;case xl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case _l:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Nt("WebGLState: Invalid blending: ",N);break}else switch(N){case Di:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case gl:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case xl:Nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _l:Nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Nt("WebGLState: Invalid blending: ",N);break}b=null,v=null,S=null,A=null,x.set(0,0,0),w=0,p=N,P=se}return}gt=gt||at,Q=Q||K,St=St||ht,(at!==M||gt!==T)&&(s.blendEquationSeparate(qt[at],qt[gt]),M=at,T=gt),(K!==b||ht!==v||Q!==S||St!==A)&&(s.blendFuncSeparate($t[K],$t[ht],$t[Q],$t[St]),b=K,v=ht,S=Q,A=St),(vt.equals(x)===!1||de!==w)&&(s.blendColor(vt.r,vt.g,vt.b,de),x.copy(vt),w=de),p=N,P=!1}function Ut(N,at){N.side===He?It(s.CULL_FACE):tt(s.CULL_FACE);let K=N.side===Ve;at&&(K=!K),xe(K),N.blending===Di&&N.transparent===!1?Vt(bi):Vt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let ht=N.stencilWrite;o.setTest(ht),ht&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Le(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?tt(s.SAMPLE_ALPHA_TO_COVERAGE):It(s.SAMPLE_ALPHA_TO_COVERAGE)}function xe(N){I!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),I=N)}function be(N){N!==Zc?(tt(s.CULL_FACE),N!==L&&(N===ml?s.cullFace(s.BACK):N===Jc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):It(s.CULL_FACE),L=N}function Ae(N){N!==W&&(U&&s.lineWidth(N),W=N)}function Le(N,at,K){N?(tt(s.POLYGON_OFFSET_FILL),(k!==at||D!==K)&&(k=at,D=K,a.getReversed()&&(at=-at),s.polygonOffset(at,K))):It(s.POLYGON_OFFSET_FILL)}function ue(N){N?tt(s.SCISSOR_TEST):It(s.SCISSOR_TEST)}function _e(N){N===void 0&&(N=s.TEXTURE0+F-1),et!==N&&(s.activeTexture(N),et=N)}function B(N,at,K){K===void 0&&(et===null?K=s.TEXTURE0+F-1:K=et);let ht=rt[K];ht===void 0&&(ht={type:void 0,texture:void 0},rt[K]=ht),(ht.type!==N||ht.texture!==at)&&(et!==K&&(s.activeTexture(K),et=K),s.bindTexture(N,at||it[N]),ht.type=N,ht.texture=at)}function Ge(){let N=rt[et];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function jt(){try{s.compressedTexImage2D(...arguments)}catch(N){Nt("WebGLState:",N)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(N){Nt("WebGLState:",N)}}function y(){try{s.texSubImage2D(...arguments)}catch(N){Nt("WebGLState:",N)}}function z(){try{s.texSubImage3D(...arguments)}catch(N){Nt("WebGLState:",N)}}function X(){try{s.compressedTexSubImage2D(...arguments)}catch(N){Nt("WebGLState:",N)}}function Y(){try{s.compressedTexSubImage3D(...arguments)}catch(N){Nt("WebGLState:",N)}}function nt(){try{s.texStorage2D(...arguments)}catch(N){Nt("WebGLState:",N)}}function ot(){try{s.texStorage3D(...arguments)}catch(N){Nt("WebGLState:",N)}}function Z(){try{s.texImage2D(...arguments)}catch(N){Nt("WebGLState:",N)}}function j(){try{s.texImage3D(...arguments)}catch(N){Nt("WebGLState:",N)}}function lt(N){return f[N]!==void 0?f[N]:s.getParameter(N)}function Et(N,at){f[N]!==at&&(s.pixelStorei(N,at),f[N]=at)}function ut(N){Pt.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),Pt.copy(N))}function ct(N){bt.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),bt.copy(N))}function Ct(N,at){let K=c.get(at);K===void 0&&(K=new WeakMap,c.set(at,K));let ht=K.get(N);ht===void 0&&(ht=s.getUniformBlockIndex(at,N.name),K.set(N,ht))}function Dt(N,at){let ht=c.get(at).get(N);l.get(at)!==ht&&(s.uniformBlockBinding(at,ht,N.__bindingPointIndex),l.set(at,ht))}function Ot(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},et=null,rt={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,b=null,v=null,T=null,S=null,A=null,x=new Ft(0,0,0),w=0,P=!1,I=null,L=null,W=null,k=null,D=null,Pt.set(0,0,s.canvas.width,s.canvas.height),bt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:It,bindFramebuffer:Lt,drawBuffers:Rt,useProgram:le,setBlending:Vt,setMaterial:Ut,setFlipSided:xe,setCullFace:be,setLineWidth:Ae,setPolygonOffset:Le,setScissorTest:ue,activeTexture:_e,bindTexture:B,unbindTexture:Ge,compressedTexImage2D:jt,compressedTexImage3D:C,texImage2D:Z,texImage3D:j,pixelStorei:Et,getParameter:lt,updateUBOMapping:Ct,uniformBlockBinding:Dt,texStorage2D:nt,texStorage3D:ot,texSubImage2D:y,texSubImage3D:z,compressedTexSubImage2D:X,compressedTexSubImage3D:Y,scissor:ut,viewport:ct,reset:Ot}}function e0(s,t,e,i,n,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,h=new WeakMap,f=new Set,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,y){return g?new OffscreenCanvas(C,y):Ss("canvas")}function m(C,y,z){let X=1,Y=jt(C);if((Y.width>z||Y.height>z)&&(X=z/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let nt=Math.floor(X*Y.width),ot=Math.floor(X*Y.height);u===void 0&&(u=_(nt,ot));let Z=y?_(nt,ot):u;return Z.width=nt,Z.height=ot,Z.getContext("2d").drawImage(C,0,0,nt,ot),At("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+nt+"x"+ot+")."),Z}else return"data"in C&&At("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),C;return C}function p(C){return C.generateMipmaps}function M(C){s.generateMipmap(C)}function b(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(C,y,z,X,Y,nt=!1){if(C!==null){if(s[C]!==void 0)return s[C];At("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ot;X&&(ot=t.get("EXT_texture_norm16"),ot||At("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=y;if(y===s.RED&&(z===s.FLOAT&&(Z=s.R32F),z===s.HALF_FLOAT&&(Z=s.R16F),z===s.UNSIGNED_BYTE&&(Z=s.R8),z===s.UNSIGNED_SHORT&&ot&&(Z=ot.R16_EXT),z===s.SHORT&&ot&&(Z=ot.R16_SNORM_EXT)),y===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.R8UI),z===s.UNSIGNED_SHORT&&(Z=s.R16UI),z===s.UNSIGNED_INT&&(Z=s.R32UI),z===s.BYTE&&(Z=s.R8I),z===s.SHORT&&(Z=s.R16I),z===s.INT&&(Z=s.R32I)),y===s.RG&&(z===s.FLOAT&&(Z=s.RG32F),z===s.HALF_FLOAT&&(Z=s.RG16F),z===s.UNSIGNED_BYTE&&(Z=s.RG8),z===s.UNSIGNED_SHORT&&ot&&(Z=ot.RG16_EXT),z===s.SHORT&&ot&&(Z=ot.RG16_SNORM_EXT)),y===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RG8UI),z===s.UNSIGNED_SHORT&&(Z=s.RG16UI),z===s.UNSIGNED_INT&&(Z=s.RG32UI),z===s.BYTE&&(Z=s.RG8I),z===s.SHORT&&(Z=s.RG16I),z===s.INT&&(Z=s.RG32I)),y===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGB16UI),z===s.UNSIGNED_INT&&(Z=s.RGB32UI),z===s.BYTE&&(Z=s.RGB8I),z===s.SHORT&&(Z=s.RGB16I),z===s.INT&&(Z=s.RGB32I)),y===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Z=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Z=s.RGBA16UI),z===s.UNSIGNED_INT&&(Z=s.RGBA32UI),z===s.BYTE&&(Z=s.RGBA8I),z===s.SHORT&&(Z=s.RGBA16I),z===s.INT&&(Z=s.RGBA32I)),y===s.RGB&&(z===s.UNSIGNED_SHORT&&ot&&(Z=ot.RGB16_EXT),z===s.SHORT&&ot&&(Z=ot.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(Z=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(Z=s.R11F_G11F_B10F)),y===s.RGBA){let j=nt?bs:Zt.getTransfer(Y);z===s.FLOAT&&(Z=s.RGBA32F),z===s.HALF_FLOAT&&(Z=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Z=j===Kt?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&ot&&(Z=ot.RGBA16_EXT),z===s.SHORT&&ot&&(Z=ot.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(Z=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Z=s.RGB5_A1)}return(Z===s.R16F||Z===s.R32F||Z===s.RG16F||Z===s.RG32F||Z===s.RGBA16F||Z===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function T(C,y){let z;return C?y===null||y===fi||y===ss?z=s.DEPTH24_STENCIL8:y===pi?z=s.DEPTH32F_STENCIL8:y===ns&&(z=s.DEPTH24_STENCIL8,At("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===fi||y===ss?z=s.DEPTH_COMPONENT24:y===pi?z=s.DEPTH_COMPONENT32F:y===ns&&(z=s.DEPTH_COMPONENT16),z}function S(C,y){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ie&&C.minFilter!==Se?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function A(C){let y=C.target;y.removeEventListener("dispose",A),w(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&f.delete(y)}function x(C){let y=C.target;y.removeEventListener("dispose",x),I(y)}function w(C){let y=i.get(C);if(y.__webglInit===void 0)return;let z=C.source,X=d.get(z);if(X){let Y=X[y.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(C),Object.keys(X).length===0&&d.delete(z)}i.remove(C)}function P(C){let y=i.get(C);s.deleteTexture(y.__webglTexture);let z=C.source,X=d.get(z);delete X[y.__cacheKey],a.memory.textures--}function I(C){let y=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let Y=0;Y<y.__webglFramebuffer[X].length;Y++)s.deleteFramebuffer(y.__webglFramebuffer[X][Y]);else s.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)s.deleteFramebuffer(y.__webglFramebuffer[X]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let z=C.textures;for(let X=0,Y=z.length;X<Y;X++){let nt=i.get(z[X]);nt.__webglTexture&&(s.deleteTexture(nt.__webglTexture),a.memory.textures--),i.remove(z[X])}i.remove(C)}let L=0;function W(){L=0}function k(){return L}function D(C){L=C}function F(){let C=L;return C>=n.maxTextures&&At("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+n.maxTextures),L+=1,C}function U(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function V(C,y){let z=i.get(C);if(C.isVideoTexture&&B(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){let X=C.image;if(X===null)At("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)At("WebGLRenderer: Texture marked for update but image is incomplete");else{It(z,C,y);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+y)}function J(C,y){let z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){It(z,C,y);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+y)}function et(C,y){let z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){It(z,C,y);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+y)}function rt(C,y){let z=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){Lt(z,C,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+y)}let pt={[Ke]:s.REPEAT,[yi]:s.CLAMP_TO_EDGE,[Gr]:s.MIRRORED_REPEAT},Xt={[Ie]:s.NEAREST,[xh]:s.NEAREST_MIPMAP_NEAREST,[Ks]:s.NEAREST_MIPMAP_LINEAR,[Se]:s.LINEAR,[Sa]:s.LINEAR_MIPMAP_NEAREST,[on]:s.LINEAR_MIPMAP_LINEAR},Pt={[vh]:s.NEVER,[Th]:s.ALWAYS,[Mh]:s.LESS,[oo]:s.LEQUAL,[bh]:s.EQUAL,[lo]:s.GEQUAL,[Sh]:s.GREATER,[Eh]:s.NOTEQUAL};function bt(C,y){if(y.type===pi&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Se||y.magFilter===Sa||y.magFilter===Ks||y.magFilter===on||y.minFilter===Se||y.minFilter===Sa||y.minFilter===Ks||y.minFilter===on)&&At("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,pt[y.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,pt[y.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,pt[y.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Xt[y.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Xt[y.minFilter]),y.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,Pt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ie||y.minFilter!==Ks&&y.minFilter!==on||y.type===pi&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,n.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function $(C,y){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",A));let X=y.source,Y=d.get(X);Y===void 0&&(Y={},d.set(X,Y));let nt=U(y);if(nt!==C.__cacheKey){Y[nt]===void 0&&(Y[nt]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Y[nt].usedTimes++;let ot=Y[C.__cacheKey];ot!==void 0&&(Y[C.__cacheKey].usedTimes--,ot.usedTimes===0&&P(y)),C.__cacheKey=nt,C.__webglTexture=Y[nt].texture}return z}function it(C,y,z){return Math.floor(Math.floor(C/z)/y)}function tt(C,y,z,X){let nt=C.updateRanges;if(nt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,y.width,y.height,z,X,y.data);else{nt.sort((Et,ut)=>Et.start-ut.start);let ot=0;for(let Et=1;Et<nt.length;Et++){let ut=nt[ot],ct=nt[Et],Ct=ut.start+ut.count,Dt=it(ct.start,y.width,4),Ot=it(ut.start,y.width,4);ct.start<=Ct+1&&Dt===Ot&&it(ct.start+ct.count-1,y.width,4)===Dt?ut.count=Math.max(ut.count,ct.start+ct.count-ut.start):(++ot,nt[ot]=ct)}nt.length=ot+1;let Z=e.getParameter(s.UNPACK_ROW_LENGTH),j=e.getParameter(s.UNPACK_SKIP_PIXELS),lt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,y.width);for(let Et=0,ut=nt.length;Et<ut;Et++){let ct=nt[Et],Ct=Math.floor(ct.start/4),Dt=Math.ceil(ct.count/4),Ot=Ct%y.width,N=Math.floor(Ct/y.width),at=Dt,K=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Ot),e.pixelStorei(s.UNPACK_SKIP_ROWS,N),e.texSubImage2D(s.TEXTURE_2D,0,Ot,N,at,K,z,X,y.data)}C.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Z),e.pixelStorei(s.UNPACK_SKIP_PIXELS,j),e.pixelStorei(s.UNPACK_SKIP_ROWS,lt)}}function It(C,y,z){let X=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=s.TEXTURE_3D);let Y=$(C,y),nt=y.source;e.bindTexture(X,C.__webglTexture,s.TEXTURE0+z);let ot=i.get(nt);if(nt.version!==ot.__version||Y===!0){if(e.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let K=Zt.getPrimaries(Zt.workingColorSpace),ht=y.colorSpace===Bi?null:Zt.getPrimaries(y.colorSpace),gt=y.colorSpace===Bi||K===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt)}e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment);let j=m(y.image,!1,n.maxTextureSize);j=Ge(y,j);let lt=r.convert(y.format,y.colorSpace),Et=r.convert(y.type),ut=v(y.internalFormat,lt,Et,y.normalized,y.colorSpace,y.isVideoTexture);bt(X,y);let ct,Ct=y.mipmaps,Dt=y.isVideoTexture!==!0,Ot=ot.__version===void 0||Y===!0,N=nt.dataReady,at=S(y,j);if(y.isDepthTexture)ut=T(y.format===ln,y.type),Ot&&(Dt?e.texStorage2D(s.TEXTURE_2D,1,ut,j.width,j.height):e.texImage2D(s.TEXTURE_2D,0,ut,j.width,j.height,0,lt,Et,null));else if(y.isDataTexture)if(Ct.length>0){Dt&&Ot&&e.texStorage2D(s.TEXTURE_2D,at,ut,Ct[0].width,Ct[0].height);for(let K=0,ht=Ct.length;K<ht;K++)ct=Ct[K],Dt?N&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,ct.width,ct.height,lt,Et,ct.data):e.texImage2D(s.TEXTURE_2D,K,ut,ct.width,ct.height,0,lt,Et,ct.data);y.generateMipmaps=!1}else Dt?(Ot&&e.texStorage2D(s.TEXTURE_2D,at,ut,j.width,j.height),N&&tt(y,j,lt,Et)):e.texImage2D(s.TEXTURE_2D,0,ut,j.width,j.height,0,lt,Et,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Dt&&Ot&&e.texStorage3D(s.TEXTURE_2D_ARRAY,at,ut,Ct[0].width,Ct[0].height,j.depth);for(let K=0,ht=Ct.length;K<ht;K++)if(ct=Ct[K],y.format!==ai)if(lt!==null)if(Dt){if(N)if(y.layerUpdates.size>0){let gt=Hl(ct.width,ct.height,y.format,y.type);for(let Q of y.layerUpdates){let St=ct.data.subarray(Q*gt/ct.data.BYTES_PER_ELEMENT,(Q+1)*gt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,Q,ct.width,ct.height,1,lt,St)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,ct.width,ct.height,j.depth,lt,ct.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,K,ut,ct.width,ct.height,j.depth,0,ct.data,0,0);else At("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,ct.width,ct.height,j.depth,lt,Et,ct.data):e.texImage3D(s.TEXTURE_2D_ARRAY,K,ut,ct.width,ct.height,j.depth,0,lt,Et,ct.data)}else{Dt&&Ot&&e.texStorage2D(s.TEXTURE_2D,at,ut,Ct[0].width,Ct[0].height);for(let K=0,ht=Ct.length;K<ht;K++)ct=Ct[K],y.format!==ai?lt!==null?Dt?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,K,0,0,ct.width,ct.height,lt,ct.data):e.compressedTexImage2D(s.TEXTURE_2D,K,ut,ct.width,ct.height,0,ct.data):At("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?N&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,ct.width,ct.height,lt,Et,ct.data):e.texImage2D(s.TEXTURE_2D,K,ut,ct.width,ct.height,0,lt,Et,ct.data)}else if(y.isDataArrayTexture)if(Dt){if(Ot&&e.texStorage3D(s.TEXTURE_2D_ARRAY,at,ut,j.width,j.height,j.depth),N)if(y.layerUpdates.size>0){let K=Hl(j.width,j.height,y.format,y.type);for(let ht of y.layerUpdates){let gt=j.data.subarray(ht*K/j.data.BYTES_PER_ELEMENT,(ht+1)*K/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ht,j.width,j.height,1,lt,Et,gt)}y.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,lt,Et,j.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,ut,j.width,j.height,j.depth,0,lt,Et,j.data);else if(y.isData3DTexture)Dt?(Ot&&e.texStorage3D(s.TEXTURE_3D,at,ut,j.width,j.height,j.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,lt,Et,j.data)):e.texImage3D(s.TEXTURE_3D,0,ut,j.width,j.height,j.depth,0,lt,Et,j.data);else if(y.isFramebufferTexture){if(Ot)if(Dt)e.texStorage2D(s.TEXTURE_2D,at,ut,j.width,j.height);else{let K=j.width,ht=j.height;for(let gt=0;gt<at;gt++)e.texImage2D(s.TEXTURE_2D,gt,ut,K,ht,0,lt,Et,null),K>>=1,ht>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in s){let K=s.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),j.parentNode!==K){K.appendChild(j),f.add(y),K.onpaint=ht=>{let gt=ht.changedElements;for(let Q of f)gt.includes(Q.image)&&(Q.needsUpdate=!0)},K.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,j);else{let gt=s.RGBA,Q=s.RGBA,St=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,gt,Q,St,j)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ct.length>0){if(Dt&&Ot){let K=jt(Ct[0]);e.texStorage2D(s.TEXTURE_2D,at,ut,K.width,K.height)}for(let K=0,ht=Ct.length;K<ht;K++)ct=Ct[K],Dt?N&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,lt,Et,ct):e.texImage2D(s.TEXTURE_2D,K,ut,lt,Et,ct);y.generateMipmaps=!1}else if(Dt){if(Ot){let K=jt(j);e.texStorage2D(s.TEXTURE_2D,at,ut,K.width,K.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,lt,Et,j)}else e.texImage2D(s.TEXTURE_2D,0,ut,lt,Et,j);p(y)&&M(X),ot.__version=nt.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Lt(C,y,z){if(y.image.length!==6)return;let X=$(C,y),Y=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+z);let nt=i.get(Y);if(Y.version!==nt.__version||X===!0){e.activeTexture(s.TEXTURE0+z);let ot=Zt.getPrimaries(Zt.workingColorSpace),Z=y.colorSpace===Bi?null:Zt.getPrimaries(y.colorSpace),j=y.colorSpace===Bi||ot===Z?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);let lt=y.isCompressedTexture||y.image[0].isCompressedTexture,Et=y.image[0]&&y.image[0].isDataTexture,ut=[];for(let Q=0;Q<6;Q++)!lt&&!Et?ut[Q]=m(y.image[Q],!0,n.maxCubemapSize):ut[Q]=Et?y.image[Q].image:y.image[Q],ut[Q]=Ge(y,ut[Q]);let ct=ut[0],Ct=r.convert(y.format,y.colorSpace),Dt=r.convert(y.type),Ot=v(y.internalFormat,Ct,Dt,y.normalized,y.colorSpace),N=y.isVideoTexture!==!0,at=nt.__version===void 0||X===!0,K=Y.dataReady,ht=S(y,ct);bt(s.TEXTURE_CUBE_MAP,y);let gt;if(lt){N&&at&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Ot,ct.width,ct.height);for(let Q=0;Q<6;Q++){gt=ut[Q].mipmaps;for(let St=0;St<gt.length;St++){let vt=gt[St];y.format!==ai?Ct!==null?N?K&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,0,0,vt.width,vt.height,Ct,vt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,Ot,vt.width,vt.height,0,vt.data):At("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,0,0,vt.width,vt.height,Ct,Dt,vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,Ot,vt.width,vt.height,0,Ct,Dt,vt.data)}}}else{if(gt=y.mipmaps,N&&at){gt.length>0&&ht++;let Q=jt(ut[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Ot,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(Et){N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ut[Q].width,ut[Q].height,Ct,Dt,ut[Q].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ot,ut[Q].width,ut[Q].height,0,Ct,Dt,ut[Q].data);for(let St=0;St<gt.length;St++){let de=gt[St].image[Q].image;N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,0,0,de.width,de.height,Ct,Dt,de.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,Ot,de.width,de.height,0,Ct,Dt,de.data)}}else{N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ct,Dt,ut[Q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ot,Ct,Dt,ut[Q]);for(let St=0;St<gt.length;St++){let vt=gt[St];N?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,0,0,Ct,Dt,vt.image[Q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,Ot,Ct,Dt,vt.image[Q])}}}p(y)&&M(s.TEXTURE_CUBE_MAP),nt.__version=Y.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Rt(C,y,z,X,Y,nt){let ot=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),j=v(z.internalFormat,ot,Z,z.normalized,z.colorSpace),lt=i.get(y),Et=i.get(z);if(Et.__renderTarget=y,!lt.__hasExternalTextures){let ut=Math.max(1,y.width>>nt),ct=Math.max(1,y.height>>nt);Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?e.texImage3D(Y,nt,j,ut,ct,y.depth,0,ot,Z,null):e.texImage2D(Y,nt,j,ut,ct,0,ot,Z,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),_e(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,Y,Et.__webglTexture,0,ue(y)):(Y===s.TEXTURE_2D||Y>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,Y,Et.__webglTexture,nt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function le(C,y,z){if(s.bindRenderbuffer(s.RENDERBUFFER,C),y.depthBuffer){let X=y.depthTexture,Y=X&&X.isDepthTexture?X.type:null,nt=T(y.stencilBuffer,Y),ot=y.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;_e(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ue(y),nt,y.width,y.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,ue(y),nt,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,nt,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ot,s.RENDERBUFFER,C)}else{let X=y.textures;for(let Y=0;Y<X.length;Y++){let nt=X[Y],ot=r.convert(nt.format,nt.colorSpace),Z=r.convert(nt.type),j=v(nt.internalFormat,ot,Z,nt.normalized,nt.colorSpace);_e(y)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ue(y),j,y.width,y.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,ue(y),j,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,j,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function qt(C,y,z){let X=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(y.depthTexture);if(Y.__renderTarget=y,(!Y.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,y.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),bt(s.TEXTURE_CUBE_MAP,y.depthTexture);let lt=r.convert(y.depthTexture.format),Et=r.convert(y.depthTexture.type),ut;y.depthTexture.format===vi?ut=s.DEPTH_COMPONENT24:y.depthTexture.format===ln&&(ut=s.DEPTH24_STENCIL8);for(let ct=0;ct<6;ct++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,ut,y.width,y.height,0,lt,Et,null)}}else V(y.depthTexture,0);let nt=Y.__webglTexture,ot=ue(y),Z=X?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,j=y.depthTexture.format===ln?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(y.depthTexture.format===vi)_e(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,Z,nt,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,j,Z,nt,0);else if(y.depthTexture.format===ln)_e(y)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,Z,nt,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,j,Z,nt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function $t(C){let y=i.get(C),z=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let X=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),X){let Y=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),y.__depthDisposeCallback=Y}y.__boundDepthTexture=X}if(C.depthTexture&&!y.__autoAllocateDepthBuffer)if(z)for(let X=0;X<6;X++)qt(y.__webglFramebuffer[X],C,X);else{let X=C.texture.mipmaps;X&&X.length>0?qt(y.__webglFramebuffer[0],C,0):qt(y.__webglFramebuffer,C,0)}else if(z){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]===void 0)y.__webglDepthbuffer[X]=s.createRenderbuffer(),le(y.__webglDepthbuffer[X],C,!1);else{let Y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,nt=y.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,nt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,nt)}}else{let X=C.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=s.createRenderbuffer(),le(y.__webglDepthbuffer,C,!1);else{let Y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,nt=y.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,nt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Y,s.RENDERBUFFER,nt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Vt(C,y,z){let X=i.get(C);y!==void 0&&Rt(X.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&$t(C)}function Ut(C){let y=C.texture,z=i.get(C),X=i.get(y);C.addEventListener("dispose",x);let Y=C.textures,nt=C.isWebGLCubeRenderTarget===!0,ot=Y.length>1;if(ot||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=y.version,a.memory.textures++),nt){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let j=0;j<y.mipmaps.length;j++)z.__webglFramebuffer[Z][j]=s.createFramebuffer()}else z.__webglFramebuffer[Z]=s.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<y.mipmaps.length;Z++)z.__webglFramebuffer[Z]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(ot)for(let Z=0,j=Y.length;Z<j;Z++){let lt=i.get(Y[Z]);lt.__webglTexture===void 0&&(lt.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&_e(C)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){let j=Y[Z];z.__webglColorRenderbuffer[Z]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);let lt=r.convert(j.format,j.colorSpace),Et=r.convert(j.type),ut=v(j.internalFormat,lt,Et,j.normalized,j.colorSpace,C.isXRRenderTarget===!0),ct=ue(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,ct,ut,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Z,s.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),le(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(nt){e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),bt(s.TEXTURE_CUBE_MAP,y);for(let Z=0;Z<6;Z++)if(y.mipmaps&&y.mipmaps.length>0)for(let j=0;j<y.mipmaps.length;j++)Rt(z.__webglFramebuffer[Z][j],C,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,j);else Rt(z.__webglFramebuffer[Z],C,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);p(y)&&M(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){for(let Z=0,j=Y.length;Z<j;Z++){let lt=Y[Z],Et=i.get(lt),ut=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ut=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,Et.__webglTexture),bt(ut,lt),Rt(z.__webglFramebuffer,C,lt,s.COLOR_ATTACHMENT0+Z,ut,0),p(lt)&&M(ut)}e.unbindTexture()}else{let Z=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Z=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Z,X.__webglTexture),bt(Z,y),y.mipmaps&&y.mipmaps.length>0)for(let j=0;j<y.mipmaps.length;j++)Rt(z.__webglFramebuffer[j],C,y,s.COLOR_ATTACHMENT0,Z,j);else Rt(z.__webglFramebuffer,C,y,s.COLOR_ATTACHMENT0,Z,0);p(y)&&M(Z),e.unbindTexture()}C.depthBuffer&&$t(C)}function xe(C){let y=C.textures;for(let z=0,X=y.length;z<X;z++){let Y=y[z];if(p(Y)){let nt=b(C),ot=i.get(Y).__webglTexture;e.bindTexture(nt,ot),M(nt),e.unbindTexture()}}}let be=[],Ae=[];function Le(C){if(C.samples>0){if(_e(C)===!1){let y=C.textures,z=C.width,X=C.height,Y=s.COLOR_BUFFER_BIT,nt=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ot=i.get(C),Z=y.length>1;if(Z)for(let lt=0;lt<y.length;lt++)e.bindFramebuffer(s.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ot.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer);let j=C.texture.mipmaps;j&&j.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ot.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let lt=0;lt<y.length;lt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Y|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Y|=s.STENCIL_BUFFER_BIT)),Z){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ot.__webglColorRenderbuffer[lt]);let Et=i.get(y[lt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Et,0)}s.blitFramebuffer(0,0,z,X,0,0,z,X,Y,s.NEAREST),l===!0&&(be.length=0,Ae.length=0,be.push(s.COLOR_ATTACHMENT0+lt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(be.push(nt),Ae.push(nt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ae)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Z)for(let lt=0;lt<y.length;lt++){e.bindFramebuffer(s.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.RENDERBUFFER,ot.__webglColorRenderbuffer[lt]);let Et=i.get(y[lt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ot.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.TEXTURE_2D,Et,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let y=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function ue(C){return Math.min(n.maxSamples,C.samples)}function _e(C){let y=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function B(C){let y=a.render.frame;h.get(C)!==y&&(h.set(C,y),C.update())}function Ge(C,y){let z=C.colorSpace,X=C.format,Y=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Ms&&z!==Bi&&(Zt.getTransfer(z)===Kt?(X!==ai||Y!==Xe)&&At("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Nt("WebGLTextures: Unsupported texture color space:",z)),y}function jt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=W,this.getTextureUnits=k,this.setTextureUnits=D,this.setTexture2D=V,this.setTexture2DArray=J,this.setTexture3D=et,this.setTextureCube=rt,this.rebindTextures=Vt,this.setupRenderTarget=Ut,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=$t,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=_e,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function i0(s,t){function e(i,n=Bi){let r,a=Zt.getTransfer(n);if(i===Xe)return s.UNSIGNED_BYTE;if(i===Ta)return s.UNSIGNED_SHORT_4_4_4_4;if(i===wa)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Rl)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===Pl)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Al)return s.BYTE;if(i===Cl)return s.SHORT;if(i===ns)return s.UNSIGNED_SHORT;if(i===Ea)return s.INT;if(i===fi)return s.UNSIGNED_INT;if(i===pi)return s.FLOAT;if(i===Si)return s.HALF_FLOAT;if(i===Il)return s.ALPHA;if(i===Ll)return s.RGB;if(i===ai)return s.RGBA;if(i===vi)return s.DEPTH_COMPONENT;if(i===ln)return s.DEPTH_STENCIL;if(i===Dl)return s.RED;if(i===Aa)return s.RED_INTEGER;if(i===cn)return s.RG;if(i===Ca)return s.RG_INTEGER;if(i===Ra)return s.RGBA_INTEGER;if(i===js||i===Qs||i===tr||i===er)if(a===Kt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===js)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===js)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===er)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pa||i===Ia||i===La||i===Da)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===La)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Fa||i===Na||i===Ua||i===Ba||i===Oa||i===ir||i===za)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Fa||i===Na)return a===Kt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ua)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ba)return r.COMPRESSED_R11_EAC;if(i===Oa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ir)return r.COMPRESSED_RG11_EAC;if(i===za)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ka||i===Va||i===Ha||i===Ga||i===Wa||i===Xa||i===qa||i===Ya||i===$a||i===Za||i===Ja||i===Ka||i===ja||i===Qa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ka)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Va)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ha)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ga)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===qa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ya)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$a)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Za)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ja)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ka)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ja)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qa)return a===Kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===to||i===eo||i===io)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===to)return a===Kt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===eo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===no||i===so||i===nr||i===ro)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===no)return r.COMPRESSED_RED_RGTC1_EXT;if(i===so)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===nr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ro)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ss?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}var n0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,s0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ic=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Is(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ei({vertexShader:n0,fragmentShader:s0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new st(new Ni(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},nc=class extends ui{constructor(t,e){super();let i=this,n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null,_=typeof XRWebGLBinding<"u",m=new ic,p={},M=e.getContextAttributes(),b=null,v=null,T=[],S=[],A=new xt,x=null,w=new Re;w.viewport=new ce;let P=new Re;P.viewport=new ce;let I=[w,P],L=new va,W=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let it=T[$];return it===void 0&&(it=new $n,T[$]=it),it.getTargetRaySpace()},this.getControllerGrip=function($){let it=T[$];return it===void 0&&(it=new $n,T[$]=it),it.getGripSpace()},this.getHand=function($){let it=T[$];return it===void 0&&(it=new $n,T[$]=it),it.getHandSpace()};function D($){let it=S.indexOf($.inputSource);if(it===-1)return;let tt=T[it];tt!==void 0&&(tt.update($.inputSource,$.frame,c||a),tt.dispatchEvent({type:$.type,data:$.inputSource}))}function F(){n.removeEventListener("select",D),n.removeEventListener("selectstart",D),n.removeEventListener("selectend",D),n.removeEventListener("squeeze",D),n.removeEventListener("squeezestart",D),n.removeEventListener("squeezeend",D),n.removeEventListener("end",F),n.removeEventListener("inputsourceschange",U);for(let $=0;$<T.length;$++){let it=S[$];it!==null&&(S[$]=null,T[$].disconnect(it))}W=null,k=null,m.reset();for(let $ in p)delete p[$];t.setRenderTarget(b),d=null,u=null,f=null,n=null,v=null,bt.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&At("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&At("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(n,e)),f},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function($){if(n=$,n!==null){if(b=t.getRenderTarget(),n.addEventListener("select",D),n.addEventListener("selectstart",D),n.addEventListener("selectend",D),n.addEventListener("squeeze",D),n.addEventListener("squeezestart",D),n.addEventListener("squeezeend",D),n.addEventListener("end",F),n.addEventListener("inputsourceschange",U),M.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let tt=null,It=null,Lt=null;M.depth&&(Lt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=M.stencil?ln:vi,It=M.stencil?ss:fi);let Rt={colorFormat:e.RGBA8,depthFormat:Lt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Rt),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Qe(u.textureWidth,u.textureHeight,{format:ai,type:Xe,depthTexture:new Fi(u.textureWidth,u.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let tt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(n,e,tt),n.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Qe(d.framebufferWidth,d.framebufferHeight,{format:ai,type:Xe,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),bt.setContext(n),bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U($){for(let it=0;it<$.removed.length;it++){let tt=$.removed[it],It=S.indexOf(tt);It>=0&&(S[It]=null,T[It].disconnect(tt))}for(let it=0;it<$.added.length;it++){let tt=$.added[it],It=S.indexOf(tt);if(It===-1){for(let Rt=0;Rt<T.length;Rt++)if(Rt>=S.length){S.push(tt),It=Rt;break}else if(S[Rt]===null){S[Rt]=tt,It=Rt;break}if(It===-1)break}let Lt=T[It];Lt&&Lt.connect(tt)}}let V=new R,J=new R;function et($,it,tt){V.setFromMatrixPosition(it.matrixWorld),J.setFromMatrixPosition(tt.matrixWorld);let It=V.distanceTo(J),Lt=it.projectionMatrix.elements,Rt=tt.projectionMatrix.elements,le=Lt[14]/(Lt[10]-1),qt=Lt[14]/(Lt[10]+1),$t=(Lt[9]+1)/Lt[5],Vt=(Lt[9]-1)/Lt[5],Ut=(Lt[8]-1)/Lt[0],xe=(Rt[8]+1)/Rt[0],be=le*Ut,Ae=le*xe,Le=It/(-Ut+xe),ue=Le*-Ut;if(it.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ue),$.translateZ(Le),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Lt[10]===-1)$.projectionMatrix.copy(it.projectionMatrix),$.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{let _e=le+Le,B=qt+Le,Ge=be-ue,jt=Ae+(It-ue),C=$t*qt/B*_e,y=Vt*qt/B*_e;$.projectionMatrix.makePerspective(Ge,jt,C,y,_e,B),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function rt($,it){it===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(it.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(n===null)return;let it=$.near,tt=$.far;m.texture!==null&&(m.depthNear>0&&(it=m.depthNear),m.depthFar>0&&(tt=m.depthFar)),L.near=P.near=w.near=it,L.far=P.far=w.far=tt,(W!==L.near||k!==L.far)&&(n.updateRenderState({depthNear:L.near,depthFar:L.far}),W=L.near,k=L.far),L.layers.mask=$.layers.mask|6,w.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;let It=$.parent,Lt=L.cameras;rt(L,It);for(let Rt=0;Rt<Lt.length;Rt++)rt(Lt[Rt],It);Lt.length===2?et(L,w,P):L.projectionMatrix.copy(w.projectionMatrix),pt($,L,It)};function pt($,it,tt){tt===null?$.matrix.copy(it.matrixWorld):($.matrix.copy(tt.matrixWorld),$.matrix.invert(),$.matrix.multiply(it.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(it.projectionMatrix),$.projectionMatrixInverse.copy(it.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=yn*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function($){l=$,u!==null&&(u.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function($){return p[$]};let Xt=null;function Pt($,it){if(h=it.getViewerPose(c||a),g=it,h!==null){let tt=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let It=!1;tt.length!==L.cameras.length&&(L.cameras.length=0,It=!0);for(let qt=0;qt<tt.length;qt++){let $t=tt[qt],Vt=null;if(d!==null)Vt=d.getViewport($t);else{let xe=f.getViewSubImage(u,$t);Vt=xe.viewport,qt===0&&(t.setRenderTargetTextures(v,xe.colorTexture,xe.depthStencilTexture),t.setRenderTarget(v))}let Ut=I[qt];Ut===void 0&&(Ut=new Re,Ut.layers.enable(qt),Ut.viewport=new ce,I[qt]=Ut),Ut.matrix.fromArray($t.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray($t.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(Vt.x,Vt.y,Vt.width,Vt.height),qt===0&&(L.matrix.copy(Ut.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),It===!0&&L.cameras.push(Ut)}let Lt=n.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&_){f=i.getBinding();let qt=f.getDepthInformation(tt[0]);qt&&qt.isValid&&qt.texture&&m.init(qt,n.renderState)}if(Lt&&Lt.includes("camera-access")&&_){t.state.unbindTexture(),f=i.getBinding();for(let qt=0;qt<tt.length;qt++){let $t=tt[qt].camera;if($t){let Vt=p[$t];Vt||(Vt=new Is,p[$t]=Vt);let Ut=f.getCameraImage($t);Vt.sourceTexture=Ut}}}}for(let tt=0;tt<T.length;tt++){let It=S[tt],Lt=T[tt];It!==null&&Lt!==void 0&&Lt.update(It,it,c||a)}Xt&&Xt($,it),it.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:it}),g=null}let bt=new eu;bt.setAnimationLoop(Pt),this.setAnimationLoop=function($){Xt=$},this.dispose=function(){}}},r0=new ae,ou=new Bt;ou.set(-1,0,0,0,1,0,0,0,1);function a0(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,zl(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,M,b,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ve&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ve&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=t.get(p),b=M.envMap,v=M.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(r0.makeRotationFromEuler(v)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ou),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=b*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ve&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function o0(s,t,e,i){let n={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,T){let S=T.program;i.uniformBlockBinding(v,S)}function c(v,T){let S=n[v.id];S===void 0&&(m(v),S=h(v),n[v.id]=S,v.addEventListener("dispose",M));let A=T.program;i.updateUBOMapping(v,A);let x=t.render.frame;r[v.id]!==x&&(u(v),r[v.id]=x)}function h(v){let T=f();v.__bindingPointIndex=T;let S=s.createBuffer(),A=v.__size,x=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,A,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,T,S),S}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let T=n[v.id],S=v.uniforms,A=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let x=0,w=S.length;x<w;x++){let P=S[x];if(Array.isArray(P))for(let I=0,L=P.length;I<L;I++)d(P[I],x,I,A);else d(P,x,0,A)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(v,T,S,A){if(_(v,T,S,A)===!0){let x=v.__offset,w=v.value;if(Array.isArray(w)){let P=0;for(let I=0;I<w.length;I++){let L=w[I],W=p(L);g(L,v.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,v.__data)}}function g(v,T,S){typeof v=="number"||typeof v=="boolean"?T[0]=v:v.isMatrix3?(T[0]=v.elements[0],T[1]=v.elements[1],T[2]=v.elements[2],T[3]=0,T[4]=v.elements[3],T[5]=v.elements[4],T[6]=v.elements[5],T[7]=0,T[8]=v.elements[6],T[9]=v.elements[7],T[10]=v.elements[8],T[11]=0):ArrayBuffer.isView(v)?T.set(new v.constructor(v.buffer,v.byteOffset,T.length)):v.toArray(T,S)}function _(v,T,S,A){let x=v.value,w=T+"_"+S;if(A[w]===void 0)return typeof x=="number"||typeof x=="boolean"?A[w]=x:ArrayBuffer.isView(x)?A[w]=x.slice():A[w]=x.clone(),!0;{let P=A[w];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return A[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function m(v){let T=v.uniforms,S=0,A=16;for(let w=0,P=T.length;w<P;w++){let I=Array.isArray(T[w])?T[w]:[T[w]];for(let L=0,W=I.length;L<W;L++){let k=I[L],D=Array.isArray(k.value)?k.value:[k.value];for(let F=0,U=D.length;F<U;F++){let V=D[F],J=p(V),et=S%A,rt=et%J.boundary,pt=et+rt;S+=rt,pt!==0&&A-pt<J.storage&&(S+=A-pt),k.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=S,S+=J.storage}}}let x=S%A;return x>0&&(S+=A-x),v.__size=S,v.__cache={},this}function p(v){let T={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(T.boundary=4,T.storage=4):v.isVector2?(T.boundary=8,T.storage=8):v.isVector3||v.isColor?(T.boundary=16,T.storage=12):v.isVector4?(T.boundary=16,T.storage=16):v.isMatrix3?(T.boundary=48,T.storage=48):v.isMatrix4?(T.boundary=64,T.storage=64):v.isTexture?At("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(T.boundary=16,T.storage=v.byteLength):At("WebGLRenderer: Unsupported uniform value type.",v),T}function M(v){let T=v.target;T.removeEventListener("dispose",M);let S=a.indexOf(T.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(n[T.id]),delete n[T.id],delete r[T.id]}function b(){for(let v in n)s.deleteBuffer(n[v]);a=[],n={},r={}}return{bind:l,update:c,dispose:b}}var l0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ei=null;function c0(){return Ei===null&&(Ei=new $r(l0,16,16,cn,Si),Ei.name="DFG_LUT",Ei.minFilter=Se,Ei.magFilter=Se,Ei.wrapS=yi,Ei.wrapT=yi,Ei.generateMipmaps=!1,Ei.needsUpdate=!0),Ei}var fo=class{constructor(t={}){let{canvas:e=wh(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Xe}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let _=d,m=new Set([Ra,Ca,Aa]),p=new Set([Xe,fi,ns,ss,Ta,wa]),M=new Uint32Array(4),b=new Int32Array(4),v=new R,T=null,S=null,A=[],x=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,I=!1,L=null,W=null,k=null,D=null;this._outputColorSpace=Je;let F=0,U=0,V=null,J=-1,et=null,rt=new ce,pt=new ce,Xt=null,Pt=new Ft(0),bt=0,$=e.width,it=e.height,tt=1,It=null,Lt=null,Rt=new ce(0,0,$,it),le=new ce(0,0,$,it),qt=!1,$t=new Zn,Vt=!1,Ut=!1,xe=new ae,be=new R,Ae=new ce,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ue=!1;function _e(){return V===null?tt:1}let B=i;function Ge(E,O){return e.getContext(E,O)}try{let E={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"185"}`),e.addEventListener("webglcontextlost",de,!1),e.addEventListener("webglcontextrestored",se,!1),e.addEventListener("webglcontextcreationerror",mi,!1),B===null){let O="webgl2";if(B=Ge(O,E),B===null)throw Ge(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw Nt("WebGLRenderer: "+E.message),E}let jt,C,y,z,X,Y,nt,ot,Z,j,lt,Et,ut,ct,Ct,Dt,Ot,N,at,K,ht,gt,Q;function St(){jt=new gm(B),jt.init(),ht=new i0(B,jt),C=new lm(B,jt,t,ht),y=new t0(B,jt),C.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),W=B.createFramebuffer(),k=B.createFramebuffer(),D=B.createFramebuffer(),z=new ym(B),X=new kg,Y=new e0(B,jt,y,X,C,ht,z),nt=new mm(P),ot=new bd(B),gt=new am(B,ot),Z=new xm(B,ot,z,gt),j=new Mm(B,Z,ot,gt,z),N=new vm(B,C,Y),Ct=new cm(X),lt=new zg(P,nt,jt,C,gt,Ct),Et=new a0(P,X),ut=new Hg,ct=new $g(jt),Ot=new rm(P,nt,y,j,g,l),Dt=new Qg(P,j,C),Q=new o0(B,z,C,y),at=new om(B,jt,z),K=new _m(B,jt,z),z.programs=lt.programs,P.capabilities=C,P.extensions=jt,P.properties=X,P.renderLists=ut,P.shadowMap=Dt,P.state=y,P.info=z}St(),_!==Xe&&(w=new Sm(_,e.width,e.height,o,n,r));let vt=new nc(P,B);this.xr=vt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let E=jt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=jt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(E){E!==void 0&&(tt=E,this.setSize($,it,!1))},this.getSize=function(E){return E.set($,it)},this.setSize=function(E,O,q=!0){if(vt.isPresenting){At("WebGLRenderer: Can't change size while VR device is presenting.");return}$=E,it=O,e.width=Math.floor(E*tt),e.height=Math.floor(O*tt),q===!0&&(e.style.width=E+"px",e.style.height=O+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set($*tt,it*tt).floor()},this.setDrawingBufferSize=function(E,O,q){$=E,it=O,tt=q,e.width=Math.floor(E*q),e.height=Math.floor(O*q),this.setViewport(0,0,E,O)},this.setEffects=function(E){if(_===Xe){Nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let O=0;O<E.length;O++)if(E[O].isOutputPass===!0){At("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(rt)},this.getViewport=function(E){return E.copy(Rt)},this.setViewport=function(E,O,q,H){E.isVector4?Rt.set(E.x,E.y,E.z,E.w):Rt.set(E,O,q,H),y.viewport(rt.copy(Rt).multiplyScalar(tt).round())},this.getScissor=function(E){return E.copy(le)},this.setScissor=function(E,O,q,H){E.isVector4?le.set(E.x,E.y,E.z,E.w):le.set(E,O,q,H),y.scissor(pt.copy(le).multiplyScalar(tt).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(E){y.setScissorTest(qt=E)},this.setOpaqueSort=function(E){It=E},this.setTransparentSort=function(E){Lt=E},this.getClearColor=function(E){return E.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor(...arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha(...arguments)},this.clear=function(E=!0,O=!0,q=!0){let H=0;if(E){let G=!1;if(V!==null){let mt=V.texture.format;G=m.has(mt)}if(G){let mt=V.texture.type,yt=p.has(mt),ft=Ot.getClearColor(),Mt=Ot.getClearAlpha(),Tt=ft.r,zt=ft.g,Yt=ft.b;yt?(M[0]=Tt,M[1]=zt,M[2]=Yt,M[3]=Mt,B.clearBufferuiv(B.COLOR,0,M)):(b[0]=Tt,b[1]=zt,b[2]=Yt,b[3]=Mt,B.clearBufferiv(B.COLOR,0,b))}else H|=B.COLOR_BUFFER_BIT}O&&(H|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&B.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),L=E},this.dispose=function(){e.removeEventListener("webglcontextlost",de,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",mi,!1),Ot.dispose(),ut.dispose(),ct.dispose(),X.dispose(),nt.dispose(),j.dispose(),gt.dispose(),Q.dispose(),lt.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",uc),vt.removeEventListener("sessionend",dc),un.stop()};function de(E){E.preventDefault(),Nl("WebGLRenderer: Context Lost."),I=!0}function se(){Nl("WebGLRenderer: Context Restored."),I=!1;let E=z.autoReset,O=Dt.enabled,q=Dt.autoUpdate,H=Dt.needsUpdate,G=Dt.type;St(),z.autoReset=E,Dt.enabled=O,Dt.autoUpdate=q,Dt.needsUpdate=H,Dt.type=G}function mi(E){Nt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function gi(E){let O=E.target;O.removeEventListener("dispose",gi),du(O)}function du(E){fu(E),X.remove(E)}function fu(E){let O=X.get(E).programs;O!==void 0&&(O.forEach(function(q){lt.releaseProgram(q)}),E.isShaderMaterial&&lt.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,q,H,G,mt){O===null&&(O=Le);let yt=G.isMesh&&G.matrixWorld.determinantAffine()<0,ft=gu(E,O,q,H,G);y.setMaterial(H,yt);let Mt=q.index,Tt=1;if(H.wireframe===!0){if(Mt=Z.getWireframeAttribute(q),Mt===void 0)return;Tt=2}let zt=q.drawRange,Yt=q.attributes.position,wt=zt.start*Tt,Qt=(zt.start+zt.count)*Tt;mt!==null&&(wt=Math.max(wt,mt.start*Tt),Qt=Math.min(Qt,(mt.start+mt.count)*Tt)),Mt!==null?(wt=Math.max(wt,0),Qt=Math.min(Qt,Mt.count)):Yt!=null&&(wt=Math.max(wt,0),Qt=Math.min(Qt,Yt.count));let pe=Qt-wt;if(pe<0||pe===1/0)return;gt.setup(G,H,ft,q,Mt);let fe,ee=at;if(Mt!==null&&(fe=ot.get(Mt),ee=K,ee.setIndex(fe)),G.isMesh)H.wireframe===!0?(y.setLineWidth(H.wireframeLinewidth*_e()),ee.setMode(B.LINES)):ee.setMode(B.TRIANGLES);else if(G.isLine){let Fe=H.linewidth;Fe===void 0&&(Fe=1),y.setLineWidth(Fe*_e()),G.isLineSegments?ee.setMode(B.LINES):G.isLineLoop?ee.setMode(B.LINE_LOOP):ee.setMode(B.LINE_STRIP)}else G.isPoints?ee.setMode(B.POINTS):G.isSprite&&ee.setMode(B.TRIANGLES);if(G.isBatchedMesh)if(jt.get("WEBGL_multi_draw"))ee.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Fe=G._multiDrawStarts,_t=G._multiDrawCounts,Ye=G._multiDrawCount,Jt=Mt?ot.get(Mt).bytesPerElement:1,ni=X.get(H).currentProgram.getUniforms();for(let xi=0;xi<Ye;xi++)ni.setValue(B,"_gl_DrawID",xi),ee.render(Fe[xi]/Jt,_t[xi])}else if(G.isInstancedMesh)ee.renderInstances(wt,pe,G.count);else if(q.isInstancedBufferGeometry){let Fe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,_t=Math.min(q.instanceCount,Fe);ee.renderInstances(wt,pe,_t)}else ee.render(wt,pe)};function hc(E,O,q){E.transparent===!0&&E.side===He&&E.forceSinglePass===!1?(E.side=Ve,E.needsUpdate=!0,lr(E,O,q),E.side=Li,E.needsUpdate=!0,lr(E,O,q),E.side=He):lr(E,O,q)}this.compile=function(E,O,q=null){q===null&&(q=E),S=ct.get(q),S.init(O),x.push(S),q.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),E!==q&&E.traverseVisible(function(G){G.isLight&&G.layers.test(O.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),S.setupLights();let H=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let mt=G.material;if(mt)if(Array.isArray(mt))for(let yt=0;yt<mt.length;yt++){let ft=mt[yt];hc(ft,q,G),H.add(ft)}else hc(mt,q,G),H.add(mt)}),S=x.pop(),H},this.compileAsync=function(E,O,q=null){let H=this.compile(E,O,q);return new Promise(G=>{function mt(){if(H.forEach(function(yt){X.get(yt).currentProgram.isReady()&&H.delete(yt)}),H.size===0){G(E);return}setTimeout(mt,10)}jt.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Ro=null;function pu(E){Ro&&Ro(E)}function uc(){un.stop()}function dc(){un.start()}let un=new eu;un.setAnimationLoop(pu),typeof self<"u"&&un.setContext(self),this.setAnimationLoop=function(E){Ro=E,vt.setAnimationLoop(E),E===null?un.stop():un.start()},vt.addEventListener("sessionstart",uc),vt.addEventListener("sessionend",dc),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){Nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(E,O);let q=vt.enabled===!0&&vt.isPresenting===!0,H=w!==null&&(V===null||q)&&w.begin(P,V);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(vt.cameraAutoUpdate===!0&&vt.updateCamera(O),O=vt.getCamera()),E.isScene===!0&&E.onBeforeRender(P,E,O,V),S=ct.get(E,x.length),S.init(O),S.state.textureUnits=Y.getTextureUnits(),x.push(S),xe.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),$t.setFromProjectionMatrix(xe,hi,O.reversedDepth),Ut=this.localClippingEnabled,Vt=Ct.init(this.clippingPlanes,Ut),T=ut.get(E,A.length),T.init(),A.push(T),vt.enabled===!0&&vt.isPresenting===!0){let yt=P.xr.getDepthSensingMesh();yt!==null&&Po(yt,O,-1/0,P.sortObjects)}Po(E,O,0,P.sortObjects),T.finish(),P.sortObjects===!0&&T.sort(It,Lt,O.reversedDepth),ue=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,ue&&Ot.addToRenderList(T,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Vt===!0&&Ct.beginShadows();let G=S.state.shadowsArray;if(Dt.render(G,E,O),Vt===!0&&Ct.endShadows(),(H&&w.hasRenderPass())===!1){let yt=T.opaque,ft=T.transmissive;if(S.setupLights(),O.isArrayCamera){let Mt=O.cameras;if(ft.length>0)for(let Tt=0,zt=Mt.length;Tt<zt;Tt++){let Yt=Mt[Tt];pc(yt,ft,E,Yt)}ue&&Ot.render(E);for(let Tt=0,zt=Mt.length;Tt<zt;Tt++){let Yt=Mt[Tt];fc(T,E,Yt,Yt.viewport)}}else ft.length>0&&pc(yt,ft,E,O),ue&&Ot.render(E),fc(T,E,O)}V!==null&&U===0&&(Y.updateMultisampleRenderTarget(V),Y.updateRenderTargetMipmap(V)),H&&w.end(P),E.isScene===!0&&E.onAfterRender(P,E,O),gt.resetDefaultState(),J=-1,et=null,x.pop(),x.length>0?(S=x[x.length-1],Y.setTextureUnits(S.state.textureUnits),Vt===!0&&Ct.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,A.pop(),A.length>0?T=A[A.length-1]:T=null,L!==null&&L.renderEnd()};function Po(E,O,q,H){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||$t.intersectsSprite(E)){H&&Ae.setFromMatrixPosition(E.matrixWorld).applyMatrix4(xe);let yt=j.update(E),ft=E.material;ft.visible&&T.push(E,yt,ft,q,Ae.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||$t.intersectsObject(E))){let yt=j.update(E),ft=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ae.copy(E.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Ae.copy(yt.boundingSphere.center)),Ae.applyMatrix4(E.matrixWorld).applyMatrix4(xe)),Array.isArray(ft)){let Mt=yt.groups;for(let Tt=0,zt=Mt.length;Tt<zt;Tt++){let Yt=Mt[Tt],wt=ft[Yt.materialIndex];wt&&wt.visible&&T.push(E,yt,wt,q,Ae.z,Yt)}}else ft.visible&&T.push(E,yt,ft,q,Ae.z,null)}}let mt=E.children;for(let yt=0,ft=mt.length;yt<ft;yt++)Po(mt[yt],O,q,H)}function fc(E,O,q,H){let{opaque:G,transmissive:mt,transparent:yt}=E;S.setupLightsView(q),Vt===!0&&Ct.setGlobalState(P.clippingPlanes,q),H&&y.viewport(rt.copy(H)),G.length>0&&or(G,O,q),mt.length>0&&or(mt,O,q),yt.length>0&&or(yt,O,q),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function pc(E,O,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){let wt=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new Qe(1,1,{generateMipmaps:!0,type:wt?Si:Xe,minFilter:on,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace})}let mt=S.state.transmissionRenderTarget[H.id],yt=H.viewport||rt;mt.setSize(yt.z*P.transmissionResolutionScale,yt.w*P.transmissionResolutionScale);let ft=P.getRenderTarget(),Mt=P.getActiveCubeFace(),Tt=P.getActiveMipmapLevel();P.setRenderTarget(mt),P.getClearColor(Pt),bt=P.getClearAlpha(),bt<1&&P.setClearColor(16777215,.5),P.clear(),ue&&Ot.render(q);let zt=P.toneMapping;P.toneMapping=di;let Yt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),Vt===!0&&Ct.setGlobalState(P.clippingPlanes,H),or(E,q,H),Y.updateMultisampleRenderTarget(mt),Y.updateRenderTargetMipmap(mt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let Qt=0,pe=O.length;Qt<pe;Qt++){let fe=O[Qt],{object:ee,geometry:Fe,material:_t,group:Ye}=fe;if(_t.side===He&&ee.layers.test(H.layers)){let Jt=_t.side;_t.side=Ve,_t.needsUpdate=!0,mc(ee,q,H,Fe,_t,Ye),_t.side=Jt,_t.needsUpdate=!0,wt=!0}}wt===!0&&(Y.updateMultisampleRenderTarget(mt),Y.updateRenderTargetMipmap(mt))}P.setRenderTarget(ft,Mt,Tt),P.setClearColor(Pt,bt),Yt!==void 0&&(H.viewport=Yt),P.toneMapping=zt}function or(E,O,q){let H=O.isScene===!0?O.overrideMaterial:null;for(let G=0,mt=E.length;G<mt;G++){let yt=E[G],{object:ft,geometry:Mt,group:Tt}=yt,zt=yt.material;zt.allowOverride===!0&&H!==null&&(zt=H),ft.layers.test(q.layers)&&mc(ft,O,q,Mt,zt,Tt)}}function mc(E,O,q,H,G,mt){E.onBeforeRender(P,O,q,H,G,mt),E.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(P,O,q,H,E,mt),G.transparent===!0&&G.side===He&&G.forceSinglePass===!1?(G.side=Ve,G.needsUpdate=!0,P.renderBufferDirect(q,O,H,G,E,mt),G.side=Li,G.needsUpdate=!0,P.renderBufferDirect(q,O,H,G,E,mt),G.side=He):P.renderBufferDirect(q,O,H,G,E,mt),E.onAfterRender(P,O,q,H,G,mt)}function lr(E,O,q){O.isScene!==!0&&(O=Le);let H=X.get(E),G=S.state.lights,mt=S.state.shadowsArray,yt=G.state.version,ft=lt.getParameters(E,G.state,mt,O,q,S.state.lightProbeGridArray),Mt=lt.getProgramCacheKey(ft),Tt=H.programs;H.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?O.environment:null,H.fog=O.fog;let zt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;H.envMap=nt.get(E.envMap||H.environment,zt),H.envMapRotation=H.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Tt===void 0&&(E.addEventListener("dispose",gi),Tt=new Map,H.programs=Tt);let Yt=Tt.get(Mt);if(Yt!==void 0){if(H.currentProgram===Yt&&H.lightsStateVersion===yt)return xc(E,ft),Yt}else ft.uniforms=lt.getUniforms(E),L!==null&&E.isNodeMaterial&&L.build(E,q,ft),E.onBeforeCompile(ft,P),Yt=lt.acquireProgram(ft,Mt),Tt.set(Mt,Yt),H.uniforms=ft.uniforms;let wt=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(wt.clippingPlanes=Ct.uniform),xc(E,ft),H.needsLights=_u(E),H.lightsStateVersion=yt,H.needsLights&&(wt.ambientLightColor.value=G.state.ambient,wt.lightProbe.value=G.state.probe,wt.directionalLights.value=G.state.directional,wt.directionalLightShadows.value=G.state.directionalShadow,wt.spotLights.value=G.state.spot,wt.spotLightShadows.value=G.state.spotShadow,wt.rectAreaLights.value=G.state.rectArea,wt.ltc_1.value=G.state.rectAreaLTC1,wt.ltc_2.value=G.state.rectAreaLTC2,wt.pointLights.value=G.state.point,wt.pointLightShadows.value=G.state.pointShadow,wt.hemisphereLights.value=G.state.hemi,wt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,wt.spotLightMatrix.value=G.state.spotLightMatrix,wt.spotLightMap.value=G.state.spotLightMap,wt.pointShadowMatrix.value=G.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=Yt,H.uniformsList=null,Yt}function gc(E){if(E.uniformsList===null){let O=E.currentProgram.getUniforms();E.uniformsList=os.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function xc(E,O){let q=X.get(E);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function mu(E,O){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;v.setFromMatrixPosition(O.matrixWorld);for(let q=0,H=E.length;q<H;q++){let G=E[q];if(G.texture!==null&&G.boundingBox.containsPoint(v))return G}return null}function gu(E,O,q,H,G){O.isScene!==!0&&(O=Le),Y.resetTextureUnits();let mt=O.fog,yt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?O.environment:null,ft=V===null?P.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Zt.workingColorSpace,Mt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Tt=nt.get(H.envMap||yt,Mt),zt=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Yt=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),wt=!!q.morphAttributes.position,Qt=!!q.morphAttributes.normal,pe=!!q.morphAttributes.color,fe=di;H.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(fe=P.toneMapping);let ee=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Fe=ee!==void 0?ee.length:0,_t=X.get(H),Ye=S.state.lights;if(Vt===!0&&(Ut===!0||E!==et)){let re=E===et&&H.id===J;Ct.setState(H,E,re)}let Jt=!1;H.version===_t.__version?(_t.needsLights&&_t.lightsStateVersion!==Ye.state.version||_t.outputColorSpace!==ft||G.isBatchedMesh&&_t.batching===!1||!G.isBatchedMesh&&_t.batching===!0||G.isBatchedMesh&&_t.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&_t.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&_t.instancing===!1||!G.isInstancedMesh&&_t.instancing===!0||G.isSkinnedMesh&&_t.skinning===!1||!G.isSkinnedMesh&&_t.skinning===!0||G.isInstancedMesh&&_t.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&_t.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&_t.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&_t.instancingMorph===!1&&G.morphTexture!==null||_t.envMap!==Tt||H.fog===!0&&_t.fog!==mt||_t.numClippingPlanes!==void 0&&(_t.numClippingPlanes!==Ct.numPlanes||_t.numIntersection!==Ct.numIntersection)||_t.vertexAlphas!==zt||_t.vertexTangents!==Yt||_t.morphTargets!==wt||_t.morphNormals!==Qt||_t.morphColors!==pe||_t.toneMapping!==fe||_t.morphTargetsCount!==Fe||!!_t.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Jt=!0):(Jt=!0,_t.__version=H.version);let ni=_t.currentProgram;Jt===!0&&(ni=lr(H,O,G),L&&H.isNodeMaterial&&L.onUpdateProgram(H,ni,_t));let xi=!1,Oi=!1,Rn=!1,ie=ni.getUniforms(),me=_t.uniforms;if(y.useProgram(ni.program)&&(xi=!0,Oi=!0,Rn=!0),H.id!==J&&(J=H.id,Oi=!0),_t.needsLights){let re=mu(S.state.lightProbeGridArray,G);_t.lightProbeGrid!==re&&(_t.lightProbeGrid=re,Oi=!0)}if(xi||et!==E){y.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ie.setValue(B,"projectionMatrix",E.projectionMatrix),ie.setValue(B,"viewMatrix",E.matrixWorldInverse);let ki=ie.map.cameraPosition;ki!==void 0&&ki.setValue(B,be.setFromMatrixPosition(E.matrixWorld)),C.logarithmicDepthBuffer&&ie.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ie.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),et!==E&&(et=E,Oi=!0,Rn=!0)}if(_t.needsLights&&(Ye.state.directionalShadowMap.length>0&&ie.setValue(B,"directionalShadowMap",Ye.state.directionalShadowMap,Y),Ye.state.spotShadowMap.length>0&&ie.setValue(B,"spotShadowMap",Ye.state.spotShadowMap,Y),Ye.state.pointShadowMap.length>0&&ie.setValue(B,"pointShadowMap",Ye.state.pointShadowMap,Y)),G.isSkinnedMesh){ie.setOptional(B,G,"bindMatrix"),ie.setOptional(B,G,"bindMatrixInverse");let re=G.skeleton;re&&(re.boneTexture===null&&re.computeBoneTexture(),ie.setValue(B,"boneTexture",re.boneTexture,Y))}G.isBatchedMesh&&(ie.setOptional(B,G,"batchingTexture"),ie.setValue(B,"batchingTexture",G._matricesTexture,Y),ie.setOptional(B,G,"batchingIdTexture"),ie.setValue(B,"batchingIdTexture",G._indirectTexture,Y),ie.setOptional(B,G,"batchingColorTexture"),G._colorsTexture!==null&&ie.setValue(B,"batchingColorTexture",G._colorsTexture,Y));let zi=q.morphAttributes;if((zi.position!==void 0||zi.normal!==void 0||zi.color!==void 0)&&N.update(G,q,ni),(Oi||_t.receiveShadow!==G.receiveShadow)&&(_t.receiveShadow=G.receiveShadow,ie.setValue(B,"receiveShadow",G.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&O.environment!==null&&(me.envMapIntensity.value=O.environmentIntensity),me.dfgLUT!==void 0&&(me.dfgLUT.value=c0()),Oi){if(ie.setValue(B,"toneMappingExposure",P.toneMappingExposure),_t.needsLights&&xu(me,Rn),mt&&H.fog===!0&&Et.refreshFogUniforms(me,mt),Et.refreshMaterialUniforms(me,H,tt,it,S.state.transmissionRenderTarget[E.id]),_t.needsLights&&_t.lightProbeGrid){let re=_t.lightProbeGrid;me.probesSH.value=re.texture,me.probesMin.value.copy(re.boundingBox.min),me.probesMax.value.copy(re.boundingBox.max),me.probesResolution.value.copy(re.resolution)}os.upload(B,gc(_t),me,Y)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(os.upload(B,gc(_t),me,Y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ie.setValue(B,"center",G.center),ie.setValue(B,"modelViewMatrix",G.modelViewMatrix),ie.setValue(B,"normalMatrix",G.normalMatrix),ie.setValue(B,"modelMatrix",G.matrixWorld),H.uniformsGroups!==void 0){let re=H.uniformsGroups;for(let ki=0,Pn=re.length;ki<Pn;ki++){let _c=re[ki];Q.update(_c,ni),Q.bind(_c,ni)}}return ni}function xu(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function _u(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(E,O,q){let H=X.get(E);H.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),X.get(E.texture).__webglTexture=O,X.get(E.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,O){let q=X.get(E);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,q=0){V=E,F=O,U=q;let H=null,G=!1,mt=!1;if(E){let ft=X.get(E);if(ft.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(B.FRAMEBUFFER,ft.__webglFramebuffer),rt.copy(E.viewport),pt.copy(E.scissor),Xt=E.scissorTest,y.viewport(rt),y.scissor(pt),y.setScissorTest(Xt),J=-1;return}else if(ft.__webglFramebuffer===void 0)Y.setupRenderTarget(E);else if(ft.__hasExternalTextures)Y.rebindTextures(E,X.get(E.texture).__webglTexture,X.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let zt=E.depthTexture;if(ft.__boundDepthTexture!==zt){if(zt!==null&&X.has(zt)&&(E.width!==zt.image.width||E.height!==zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(E)}}let Mt=E.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(mt=!0);let Tt=X.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Tt[O])?H=Tt[O][q]:H=Tt[O],G=!0):E.samples>0&&Y.useMultisampledRTT(E)===!1?H=X.get(E).__webglMultisampledFramebuffer:Array.isArray(Tt)?H=Tt[q]:H=Tt,rt.copy(E.viewport),pt.copy(E.scissor),Xt=E.scissorTest}else rt.copy(Rt).multiplyScalar(tt).floor(),pt.copy(le).multiplyScalar(tt).floor(),Xt=qt;if(q!==0&&(H=W),y.bindFramebuffer(B.FRAMEBUFFER,H)&&y.drawBuffers(E,H),y.viewport(rt),y.scissor(pt),y.setScissorTest(Xt),G){let ft=X.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+O,ft.__webglTexture,q)}else if(mt){let ft=O;for(let Mt=0;Mt<E.textures.length;Mt++){let Tt=X.get(E.textures[Mt]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Mt,Tt.__webglTexture,q,ft)}}else if(E!==null&&q!==0){let ft=X.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ft.__webglTexture,q)}J=-1},this.readRenderTargetPixels=function(E,O,q,H,G,mt,yt,ft=0){if(!(E&&E.isWebGLRenderTarget)){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=X.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(Mt=Mt[yt]),Mt){y.bindFramebuffer(B.FRAMEBUFFER,Mt);try{let Tt=E.textures[ft],zt=Tt.format,Yt=Tt.type;if(E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+ft),!C.textureFormatReadable(zt)){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Yt)){Nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-H&&q>=0&&q<=E.height-G&&B.readPixels(O,q,H,G,ht.convert(zt),ht.convert(Yt),mt)}finally{let Tt=V!==null?X.get(V).__webglFramebuffer:null;y.bindFramebuffer(B.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(E,O,q,H,G,mt,yt,ft=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=X.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(Mt=Mt[yt]),Mt)if(O>=0&&O<=E.width-H&&q>=0&&q<=E.height-G){y.bindFramebuffer(B.FRAMEBUFFER,Mt);let Tt=E.textures[ft],zt=Tt.format,Yt=Tt.type;if(E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+ft),!C.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let wt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,wt),B.bufferData(B.PIXEL_PACK_BUFFER,mt.byteLength,B.STREAM_READ),B.readPixels(O,q,H,G,ht.convert(zt),ht.convert(Yt),0);let Qt=V!==null?X.get(V).__webglFramebuffer:null;y.bindFramebuffer(B.FRAMEBUFFER,Qt);let pe=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Ch(B,pe,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,wt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,mt),B.deleteBuffer(wt),B.deleteSync(pe),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,O=null,q=0){let H=Math.pow(2,-q),G=Math.floor(E.image.width*H),mt=Math.floor(E.image.height*H),yt=O!==null?O.x:0,ft=O!==null?O.y:0;Y.setTexture2D(E,0),B.copyTexSubImage2D(B.TEXTURE_2D,q,0,0,yt,ft,G,mt),y.unbindTexture()},this.copyTextureToTexture=function(E,O,q=null,H=null,G=0,mt=0){let yt,ft,Mt,Tt,zt,Yt,wt,Qt,pe,fe=E.isCompressedTexture?E.mipmaps[mt]:E.image;if(q!==null)yt=q.max.x-q.min.x,ft=q.max.y-q.min.y,Mt=q.isBox3?q.max.z-q.min.z:1,Tt=q.min.x,zt=q.min.y,Yt=q.isBox3?q.min.z:0;else{let me=Math.pow(2,-G);yt=Math.floor(fe.width*me),ft=Math.floor(fe.height*me),E.isDataArrayTexture?Mt=fe.depth:E.isData3DTexture?Mt=Math.floor(fe.depth*me):Mt=1,Tt=0,zt=0,Yt=0}H!==null?(wt=H.x,Qt=H.y,pe=H.z):(wt=0,Qt=0,pe=0);let ee=ht.convert(O.format),Fe=ht.convert(O.type),_t;O.isData3DTexture?(Y.setTexture3D(O,0),_t=B.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Y.setTexture2DArray(O,0),_t=B.TEXTURE_2D_ARRAY):(Y.setTexture2D(O,0),_t=B.TEXTURE_2D),y.activeTexture(B.TEXTURE0),y.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,O.flipY),y.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),y.pixelStorei(B.UNPACK_ALIGNMENT,O.unpackAlignment);let Ye=y.getParameter(B.UNPACK_ROW_LENGTH),Jt=y.getParameter(B.UNPACK_IMAGE_HEIGHT),ni=y.getParameter(B.UNPACK_SKIP_PIXELS),xi=y.getParameter(B.UNPACK_SKIP_ROWS),Oi=y.getParameter(B.UNPACK_SKIP_IMAGES);y.pixelStorei(B.UNPACK_ROW_LENGTH,fe.width),y.pixelStorei(B.UNPACK_IMAGE_HEIGHT,fe.height),y.pixelStorei(B.UNPACK_SKIP_PIXELS,Tt),y.pixelStorei(B.UNPACK_SKIP_ROWS,zt),y.pixelStorei(B.UNPACK_SKIP_IMAGES,Yt);let Rn=E.isDataArrayTexture||E.isData3DTexture,ie=O.isDataArrayTexture||O.isData3DTexture;if(E.isDepthTexture){let me=X.get(E),zi=X.get(O),re=X.get(me.__renderTarget),ki=X.get(zi.__renderTarget);y.bindFramebuffer(B.READ_FRAMEBUFFER,re.__webglFramebuffer),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Pn=0;Pn<Mt;Pn++)Rn&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,X.get(E).__webglTexture,G,Yt+Pn),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,X.get(O).__webglTexture,mt,pe+Pn)),B.blitFramebuffer(Tt,zt,yt,ft,wt,Qt,yt,ft,B.DEPTH_BUFFER_BIT,B.NEAREST);y.bindFramebuffer(B.READ_FRAMEBUFFER,null),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(G!==0||E.isRenderTargetTexture||X.has(E)){let me=X.get(E),zi=X.get(O);y.bindFramebuffer(B.READ_FRAMEBUFFER,k),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,D);for(let re=0;re<Mt;re++)Rn?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,me.__webglTexture,G,Yt+re):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,me.__webglTexture,G),ie?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,zi.__webglTexture,mt,pe+re):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,zi.__webglTexture,mt),G!==0?B.blitFramebuffer(Tt,zt,yt,ft,wt,Qt,yt,ft,B.COLOR_BUFFER_BIT,B.NEAREST):ie?B.copyTexSubImage3D(_t,mt,wt,Qt,pe+re,Tt,zt,yt,ft):B.copyTexSubImage2D(_t,mt,wt,Qt,Tt,zt,yt,ft);y.bindFramebuffer(B.READ_FRAMEBUFFER,null),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else ie?E.isDataTexture||E.isData3DTexture?B.texSubImage3D(_t,mt,wt,Qt,pe,yt,ft,Mt,ee,Fe,fe.data):O.isCompressedArrayTexture?B.compressedTexSubImage3D(_t,mt,wt,Qt,pe,yt,ft,Mt,ee,fe.data):B.texSubImage3D(_t,mt,wt,Qt,pe,yt,ft,Mt,ee,Fe,fe):E.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,mt,wt,Qt,yt,ft,ee,Fe,fe.data):E.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,mt,wt,Qt,fe.width,fe.height,ee,fe.data):B.texSubImage2D(B.TEXTURE_2D,mt,wt,Qt,yt,ft,ee,Fe,fe);y.pixelStorei(B.UNPACK_ROW_LENGTH,Ye),y.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Jt),y.pixelStorei(B.UNPACK_SKIP_PIXELS,ni),y.pixelStorei(B.UNPACK_SKIP_ROWS,xi),y.pixelStorei(B.UNPACK_SKIP_IMAGES,Oi),mt===0&&O.generateMipmaps&&B.generateMipmap(_t),y.unbindTexture()},this.initRenderTarget=function(E){X.get(E).__webglFramebuffer===void 0&&Y.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Y.setTextureCube(E,0):E.isData3DTexture?Y.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Y.setTexture2DArray(E,0):Y.setTexture2D(E,0),y.unbindTexture()},this.resetState=function(){F=0,U=0,V=null,y.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}};var lu={type:"change"},rc={type:"start"},hu={type:"end"},go=new Ki,cu=new We,h0=Math.cos(70*Bl.DEG2RAD),we=new R,qe=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},sc=1e-6,xo=class extends Ys{constructor(t,e=null){super(t,e),this.state=te.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:sn.ROTATE,MIDDLE:sn.DOLLY,RIGHT:sn.PAN},this.touches={ONE:rn.ROTATE,TWO:rn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new je,this._lastTargetPosition=new R,this._quat=new je().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ts,this._sphericalDelta=new ts,this._scale=1,this._panOffset=new R,this._rotateStart=new xt,this._rotateEnd=new xt,this._rotateDelta=new xt,this._panStart=new xt,this._panEnd=new xt,this._panDelta=new xt,this._dollyStart=new xt,this._dollyEnd=new xt,this._dollyDelta=new xt,this._dollyDirection=new R,this._mouse=new xt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=d0.bind(this),this._onPointerDown=u0.bind(this),this._onPointerUp=f0.bind(this),this._onContextMenu=v0.bind(this),this._onMouseWheel=g0.bind(this),this._onKeyDown=x0.bind(this),this._onTouchStart=_0.bind(this),this._onTouchMove=y0.bind(this),this._onMouseDown=p0.bind(this),this._onMouseMove=m0.bind(this),this._interceptControlDown=M0.bind(this),this._interceptControlUp=b0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(lu),this.update(),this.state=te.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=qe:i>Math.PI&&(i-=qe),n<-Math.PI?n+=qe:n>Math.PI&&(n-=qe),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=we.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(go.origin.copy(this.object.position),go.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(go.direction))<h0?this.object.lookAt(this.target):(cu.setFromNormalAndCoplanarPoint(this.object.up,this.target),go.intersectPlane(cu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>sc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>sc||this._lastTargetPosition.distanceToSquared(this.target)>sc?(this.dispatchEvent(lu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?qe/60*this.autoRotateSpeed*t:qe/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let n=this.object.position;we.copy(n).sub(this.target);let r=we.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),n=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=n/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panStart.set(i,n)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,r=Math.sqrt(i*i+n*n);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),n=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,r=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new xt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function u0(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function d0(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function f0(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(hu),this.state=te.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function p0(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case sn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=te.DOLLY;break;case sn.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=te.ROTATE}break;case sn.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(rc)}function m0(s){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function g0(s){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(s.preventDefault(),this.dispatchEvent(rc),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(hu))}function x0(s){this.enabled!==!1&&this._handleKeyDown(s)}function _0(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case rn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=te.TOUCH_ROTATE;break;case rn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case rn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=te.TOUCH_DOLLY_PAN;break;case rn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(rc)}function y0(s){switch(this._trackPointer(s),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=te.NONE}}function v0(s){this.enabled!==!1&&s.preventDefault()}function M0(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function b0(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var _o=class{constructor(t){this.robot=t,this.enabled=!0,this.damping=.08,this.currentElevation=1.15,this.currentPitch=0,this.currentRoll=0,this.targetElevation=1.15,this.targetPitch=0,this.targetRoll=0,this.tempPlane=new We,this.tempNormal=new R(0,1,0),this.up=new R(0,1,0),this.calculatedCentroid=new R,this.stabilityIndex=100,this.tiltAngleDeg=0}update(t,e=1.15){if(!this.robot||!this.robot.body)return;if(!this.enabled){if(t.length>=3){let d=0;t.forEach(m=>{d+=m.y});let _=d/t.length-this.robot.position.y+e;this.currentElevation+=(_-this.currentElevation)*.15,this.robot.body.position.y=this.currentElevation}this.currentPitch+=(0-this.currentPitch)*.05,this.currentRoll+=(0-this.currentRoll)*.05,this.robot.body.rotation.x=this.currentPitch,this.robot.body.rotation.z=this.currentRoll,this.tiltAngleDeg=Math.round(Math.sqrt(this.currentPitch*this.currentPitch+this.currentRoll*this.currentRoll)*(180/Math.PI)),this.stabilityIndex=Math.max(0,100-this.tiltAngleDeg*3.5);return}if(t.length<3)return;let i=0,n=0,r=0;t.forEach(d=>{n+=d.x,i+=d.y,r+=d.z});let a=t.length;this.calculatedCentroid.set(n/a,i/a,r/a);let o=i/a,l=t[0],c=t[1],h=t[2];try{this.tempPlane.setFromCoplanarPoints(l,c,h),this.tempNormal.copy(this.tempPlane.normal),this.tempNormal.y<0&&this.tempNormal.negate(),isNaN(this.tempNormal.y)||this.tempNormal.lengthSq()<.001?this.tempNormal.set(0,1,0):this.tempNormal.normalize()}catch{this.tempNormal.set(0,1,0)}let f=this.tempNormal.clone();this.robot&&this.robot.rotation&&f.applyAxisAngle(new R(0,1,0),-this.robot.rotation.y),this.targetPitch=Math.atan2(f.z,f.y),this.targetRoll=-Math.atan2(f.x,f.y),this.targetElevation=o-this.robot.position.y+e,this.currentElevation+=(this.targetElevation-this.currentElevation)*this.damping,this.currentPitch+=(this.targetPitch-this.currentPitch)*this.damping,this.currentRoll+=(this.targetRoll-this.currentRoll)*this.damping,this.robot.body.position.y=this.currentElevation,this.robot.body.rotation.x=this.currentPitch,this.robot.body.rotation.z=this.currentRoll;let u=Math.sqrt(this.currentPitch*this.currentPitch+this.currentRoll*this.currentRoll);this.tiltAngleDeg=Math.round(u*(180/Math.PI)),this.stabilityIndex=Math.max(0,Math.min(100,Math.round(100-this.tiltAngleDeg/30*100)))}};var yo=class{constructor(t){this.scene=t,this.size=260,this.segments=130,this.mesh=null,this.rocks=[],this.samples=[],this.lander=null,this.initTerrain(),this.initRocks(),this.initSamples(),this.initLander()}getHeight(t,e){let i=Math.sqrt(t*t+e*e),n=0;if(i>35&&i<105){let d=(i-35)/70;n=Math.sin(d*Math.PI)*3.2}else i>=105&&(n=.4-(i-105)*.04);let r=Math.sin(t*.05+e*.035)*1.1,a=Math.cos(t*.08-e*.065)*.55,o=Math.sin(t*.16+e*.12)*.22,l=Math.sin(t*.5)*Math.cos(e*.5)*.05,c=t-8,h=e-60,f=Math.hypot(c,h),u=0;if(f<28){let d=f<14?-2.2*(1-Math.pow(f/14,2)):0,g=1.65*Math.exp(-Math.pow(f-14,2)/20.48);u=d+g}return n+r+a+o+l+u}getNormal(t,e){let n=this.getHeight(t-.25,e),r=this.getHeight(t+.25,e),a=this.getHeight(t,e-.25),o=this.getHeight(t,e+.25),l=new R((n-r)/(2*.25),1,(a-o)/(2*.25));return l.normalize(),l}initTerrain(){let t=new Ni(this.size,this.size,this.segments,this.segments);t.rotateX(-Math.PI/2);let e=t.attributes.position,i=[],n=new Ft(10699812),r=new Ft(13919547),a=new Ft(15633240),o=new Ft(12079662);for(let h=0;h<e.count;h++){let f=e.getX(h),u=e.getZ(h),d=this.getHeight(f,u);e.setY(h,d);let g=Math.max(0,Math.min(1,(d+1.5)/4.5)),_=new Ft;g<.4?_.lerpColors(n,r,g/.4):g<.8?_.lerpColors(r,a,(g-.4)/.4):_.lerpColors(a,o,(g-.8)/.2);let m=Math.sin(f*.8)*Math.cos(u*.8)*.03;_.r+=m,_.g+=m*.7,i.push(_.r,_.g,_.b)}t.setAttribute("color",new Gt(i,3)),t.computeVertexNormals();let l=new he({vertexColors:!0,roughness:.85,metalness:.1,flatShading:!1});this.mesh=new st(t,l),this.mesh.receiveShadow=!0,this.scene.add(this.mesh);let c=new qs(this.size,52,15633240,8138002);c.position.y=-.3,c.material.opacity=.18,c.material.transparent=!0,this.scene.add(c)}initRocks(){let e=new Us(1,0),i=new Ds(1,0),n=new he({color:9058338,roughness:.85,metalness:.12,flatShading:!0}),r=new he({color:6367258,roughness:.9,metalness:.18,flatShading:!0});for(let a=0;a<65;a++){let o=11+Math.random()*88,l=Math.random()*Math.PI*2,c=Math.cos(l)*o,h=Math.sin(l)*o,f=this.getHeight(c,h),u=Math.random()>.5,d=u?i:e,g=u?r:n,_=.5+Math.random()*1.5,m=new st(d,g);m.position.set(c,f+_*.28,h),m.rotation.set(Math.random()*.4,Math.random()*Math.PI*2,Math.random()*.4),m.scale.set(_*(.8+Math.random()*.5),_*(.45+Math.random()*.4),_*(.8+Math.random()*.5)),m.castShadow=!0,m.receiveShadow=!0,this.scene.add(m),this.rocks.push({position:new R(c,f,h),radius:_*.85})}for(let a=0;a<12;a++){let o=a/12*Math.PI*2+(Math.random()-.5)*.3,l=13.5+Math.random()*2.2,c=8+Math.cos(o)*l,h=60+Math.sin(o)*l,f=this.getHeight(c,h),u=.8+Math.random()*1.2,d=new st(e,r);d.position.set(c,f+u*.32,h),d.rotation.set(Math.random()*.6,Math.random()*Math.PI*2,Math.random()*.6),d.scale.set(u*1.1,u*.7,u*1.1),d.castShadow=!0,d.receiveShadow=!0,this.scene.add(d),this.rocks.push({position:new R(c,f,h),radius:u*.9})}}initSamples(){[{id:"alpha",name:"Sample Alpha: Unknown Layered Outcrop",thaiName:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 \u0E41\u0E2D\u0E25\u0E1F\u0E32: \u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15 (Hydrated Sulfates)",unknownTitle:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32 ALPHA (Site Alpha Outcrop)",siteType:"\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E0A\u0E31\u0E49\u0E19\u0E2B\u0E34\u0E19\u0E2A\u0E35\u0E2D\u0E48\u0E2D\u0E19 (Light-toned Layered Outcrop)",x:-28,z:32,color:3718648,description:"\u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 (Hydrated Sulfate \u0E40\u0E0A\u0E48\u0E19 Jarosite/Gypsum) \u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E02\u0E2D\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E2A\u0E20\u0E32\u0E1E\u0E01\u0E23\u0E14\u0E43\u0E19\u0E22\u0E38\u0E04 Hesperian",stemFact:"\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E43\u0E19\u0E1C\u0E25\u0E36\u0E01 (Hydrated Sulfates) \u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E02\u0E2D\u0E07\u0E41\u0E2D\u0E48\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E17\u0E35\u0E48\u0E21\u0E35\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E23\u0E14\u0E43\u0E19\u0E1B\u0E25\u0E32\u0E22\u0E22\u0E38\u0E04\u0E40\u0E2E\u0E2A\u0E1E\u0E35\u0E40\u0E23\u0E35\u0E22\u0E19 (Late Hesperian)",waterEvidence:"+++ (\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E0A\u0E31\u0E49\u0E19\u0E40\u0E2D\u0E01: \u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E02\u0E2D\u0E07\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E19\u0E49\u0E33\u0E42\u0E1A\u0E23\u0E32\u0E13)",waterEvidenceLevel:3,spectrometer:{hydration:"HIGH (88% \xB1 4%)",hydrationVal:88,sulfate:"HIGH (\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 Fe/Mg \u0E40\u0E14\u0E48\u0E19\u0E0A\u0E31\u0E14)",sulfateVal:85,iron:"MEDIUM (\u0E2A\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E2D\u0E2D\u0E01\u0E44\u0E0B\u0E14\u0E4C)",ironVal:52,silicate:"LOW (< 25%)",silicateVal:22,magnetism:"LOW (< 5 nT)",magnetismVal:8,visualTexture:"\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E2B\u0E34\u0E19\u0E2A\u0E35\u0E2A\u0E27\u0E48\u0E32\u0E07\u0E0B\u0E49\u0E2D\u0E19\u0E17\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19\u0E0A\u0E31\u0E49\u0E19\u0E23\u0E34\u0E49\u0E27 (Light-toned layered sedimentary beds)"},spectralData:{hydrationIndex:88,keyAbsorption:"1.4, 1.9 & 2.4 \xB5m (H\u2082O, SO\u2084\xB2\u207B)",absorption14:.72,absorption19:.88,absorptionMetal:.76,readingText:"\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E19\u0E49\u0E33\u0E25\u0E36\u0E01 1.9 \xB5m \u0E41\u0E25\u0E30\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 2.4 \xB5m \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E02\u0E2D\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E2A\u0E20\u0E32\u0E1E\u0E01\u0E23\u0E14"},inquiryQuestion:{prompt:"\u0E08\u0E32\u0E01\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E41\u0E2A\u0E07\u0E17\u0E35\u0E48 1.9 \xB5m \u0E41\u0E25\u0E30 2.4 \xB5m \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E19\u0E49\u0E33\u0E43\u0E19\u0E1C\u0E25\u0E36\u0E01 88% \u0E2A\u0E40\u0E1B\u0E01\u0E15\u0E23\u0E31\u0E21\u0E19\u0E35\u0E49\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E43\u0E14\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E19\u0E49\u0E33\u0E43\u0E19 Chryse Planitia?",choices:[{text:"\u0E01. \u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 (Hydrated Sulfate \u0E40\u0E0A\u0E48\u0E19 Jarosite/Gypsum) \u0E17\u0E35\u0E48\u0E15\u0E01\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E41\u0E2D\u0E48\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E2A\u0E20\u0E32\u0E1E\u0E01\u0E23\u0E14\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E43\u0E19\u0E1B\u0E25\u0E32\u0E22\u0E22\u0E38\u0E04 Hesperian"},{text:"\u0E02. \u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E40\u0E04\u0E22\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E19\u0E49\u0E33\u0E2B\u0E23\u0E37\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E0A\u0E37\u0E49\u0E19\u0E40\u0E25\u0E22\u0E15\u0E25\u0E2D\u0E14 4 \u0E1E\u0E31\u0E19\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35"},{text:"\u0E04. \u0E0A\u0E31\u0E49\u0E19\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E41\u0E2B\u0E49\u0E07\u0E04\u0E32\u0E23\u0E4C\u0E1A\u0E2D\u0E19\u0E44\u0E14\u0E2D\u0E2D\u0E01\u0E44\u0E0B\u0E14\u0E4C\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E04\u0E27\u0E1A\u0E41\u0E19\u0E48\u0E19\u0E08\u0E32\u0E01\u0E1E\u0E32\u0E22\u0E38\u0E24\u0E14\u0E39\u0E2B\u0E19\u0E32\u0E27"}],correctIndex:0,explanation:"\u0E01\u0E32\u0E23\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E17\u0E35\u0E48 1.9 \xB5m \u0E40\u0E1B\u0E47\u0E19\u0E40\u0E2D\u0E01\u0E25\u0E31\u0E01\u0E29\u0E13\u0E4C\u0E02\u0E2D\u0E07\u0E42\u0E21\u0E40\u0E25\u0E01\u0E38\u0E25 H\u2082O \u0E43\u0E19\u0E1C\u0E25\u0E36\u0E01\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E43\u0E19\u0E2D\u0E14\u0E35\u0E15\u0E40\u0E04\u0E22\u0E21\u0E35\u0E41\u0E2D\u0E48\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E15\u0E01\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E27\u0E30\u0E01\u0E23\u0E14 (\u0E40\u0E0A\u0E48\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E17\u0E35\u0E48\u0E22\u0E32\u0E19 Opportunity \u0E04\u0E49\u0E19\u0E1E\u0E1A\u0E17\u0E35\u0E48 Meridiani Planum)"},waterEvidencePoints:3,options:["\u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 (Hydrated Sulfate \u0E40\u0E0A\u0E48\u0E19 Jarosite \u0E2B\u0E23\u0E37\u0E2D Gypsum)","\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07 (Unaltered Olivine Basalt)","\u0E41\u0E23\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C (Pure Magnetite Ore)","\u0E17\u0E23\u0E32\u0E22\u0E04\u0E27\u0E2D\u0E15\u0E0B\u0E4C\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E32\u0E01\u0E1E\u0E32\u0E22\u0E38\u0E2B\u0E21\u0E38\u0E19 (Dry Quartz Dune Sand)"],correctOption:0,claimFeedback:"\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07! \u0E2A\u0E40\u0E1B\u0E01\u0E15\u0E23\u0E31\u0E21\u0E41\u0E2A\u0E14\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E04\u0E25\u0E37\u0E48\u0E19\u0E02\u0E2D\u0E07\u0E1E\u0E31\u0E19\u0E18\u0E30 H\u2082O \u0E41\u0E25\u0E30 SO\u2084\xB2\u207B \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E14\u0E48\u0E19\u0E0A\u0E31\u0E14 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E17\u0E35\u0E48\u0E15\u0E01\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E2A\u0E20\u0E32\u0E1E\u0E01\u0E23\u0E14\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E43\u0E19\u0E1B\u0E25\u0E32\u0E22\u0E22\u0E38\u0E04 Hesperian"},{id:"beta",name:"Sample Beta: Ancient Clay Beds",thaiName:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 \u0E1A\u0E35\u0E15\u0E32: \u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicate Clay)",unknownTitle:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32 BETA (Site Beta Clay Basin)",siteType:"\u0E25\u0E32\u0E19\u0E2B\u0E34\u0E19\u0E41\u0E15\u0E01\u0E23\u0E30\u0E41\u0E2B\u0E07\u0E2B\u0E25\u0E32\u0E22\u0E40\u0E2B\u0E25\u0E35\u0E48\u0E22\u0E21\u0E42\u0E1A\u0E23\u0E32\u0E13 (Polygonal Mudstone Bed)",x:38,z:36,color:11032055,description:"\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicate Clay) \u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E2B\u0E34\u0E19\u0E01\u0E31\u0E1A\u0E19\u0E49\u0E33\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19\u0E43\u0E19\u0E22\u0E38\u0E04 Noachian",stemFact:"\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicates \u0E40\u0E0A\u0E48\u0E19 Smectite) \u0E40\u0E1B\u0E47\u0E19\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E32\u0E28\u0E31\u0E22\u0E19\u0E49\u0E33\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E27\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07/\u0E14\u0E48\u0E32\u0E07\u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E19\u0E32\u0E19\u0E2B\u0E25\u0E32\u0E22\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35",waterEvidence:"+++ (\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E0A\u0E31\u0E49\u0E19\u0E40\u0E2D\u0E01: \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E2A\u0E20\u0E32\u0E1E\u0E19\u0E49\u0E33\u0E08\u0E37\u0E14\u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19 \u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E2A\u0E32\u0E23\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C)",waterEvidenceLevel:3,spectrometer:{hydration:"VERY HIGH (94% \xB1 3%)",hydrationVal:94,sulfate:"LOW (< 15%)",sulfateVal:14,iron:"MEDIUM (Al-Mg Silicate Clay)",ironVal:48,silicate:"HIGH (\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15\u0E41\u0E1A\u0E1A\u0E0A\u0E31\u0E49\u0E19 Phyllosilicate)",silicateVal:92,magnetism:"LOW (< 4 nT)",magnetismVal:6,visualTexture:"\u0E25\u0E32\u0E19\u0E2B\u0E34\u0E19\u0E42\u0E04\u0E25\u0E19\u0E41\u0E15\u0E01\u0E23\u0E30\u0E41\u0E2B\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E17\u0E23\u0E07\u0E2B\u0E25\u0E32\u0E22\u0E40\u0E2B\u0E25\u0E35\u0E48\u0E22\u0E21 (Polygonal fractured mudstone)"},spectralData:{hydrationIndex:94,keyAbsorption:"1.4, 1.9 & 2.2 \xB5m (Al-OH / Fe-OH)",absorption14:.85,absorption19:.94,absorptionMetal:.92,readingText:"\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E19\u0E49\u0E33\u0E25\u0E36\u0E01 1.9 \xB5m \u0E41\u0E25\u0E30\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E2B\u0E21\u0E39\u0E48\u0E44\u0E2E\u0E14\u0E23\u0E2D\u0E01\u0E0B\u0E34\u0E25\u0E42\u0E25\u0E2B\u0E30 2.2 \xB5m \u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1C\u0E25\u0E36\u0E01\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E41\u0E1A\u0E1A\u0E0A\u0E31\u0E49\u0E19 (Smectite)"},inquiryQuestion:{prompt:"\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E04\u0E21\u0E0A\u0E31\u0E14\u0E17\u0E35\u0E48 1.4, 1.9 \u0E41\u0E25\u0E30 2.2 \xB5m \u0E02\u0E2D\u0E07\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicates) \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E41\u0E1A\u0E1A\u0E43\u0E14?",choices:[{text:"\u0E01. \u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E1B\u0E30\u0E17\u0E38\u0E02\u0E2D\u0E07\u0E25\u0E32\u0E27\u0E32\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E2D\u0E38\u0E13\u0E2B\u0E20\u0E39\u0E21\u0E34\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32 1,200\xB0C \u0E42\u0E14\u0E22\u0E1B\u0E23\u0E32\u0E28\u0E08\u0E32\u0E01\u0E19\u0E49\u0E33"},{text:"\u0E02. \u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21\u0E19\u0E49\u0E33\u0E08\u0E37\u0E14\u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35 pH \u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04 Noachian \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E01\u0E33\u0E40\u0E19\u0E34\u0E14\u0E2A\u0E32\u0E23\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C\u0E41\u0E25\u0E30\u0E2A\u0E34\u0E48\u0E07\u0E21\u0E35\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E42\u0E1A\u0E23\u0E32\u0E13"},{text:"\u0E04. \u0E1D\u0E38\u0E48\u0E19\u0E17\u0E23\u0E32\u0E22\u0E04\u0E27\u0E2D\u0E15\u0E0B\u0E4C\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E25\u0E21\u0E1E\u0E31\u0E14\u0E1E\u0E32\u0E21\u0E32\u0E2A\u0E30\u0E2A\u0E21\u0E15\u0E31\u0E27\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E31\u0E14"}],correctIndex:1,explanation:"\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicate Clay) \u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E32\u0E28\u0E31\u0E22\u0E19\u0E49\u0E33\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E27\u0E30 pH \u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07/\u0E14\u0E48\u0E32\u0E07\u0E2D\u0E48\u0E2D\u0E19 \u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E1A\u0E41\u0E2A\u0E19\u0E16\u0E36\u0E07\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35\u0E43\u0E19\u0E22\u0E38\u0E04\u0E42\u0E19\u0E2D\u0E32\u0E40\u0E0A\u0E35\u0E22\u0E19 (Noachian) \u0E16\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E0A\u0E34\u0E49\u0E19\u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E21\u0E35\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E04\u0E07\u0E15\u0E31\u0E27\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19"},waterEvidencePoints:3,options:["\u0E41\u0E01\u0E49\u0E27\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2D\u0E2D\u0E1A\u0E0B\u0E34\u0E40\u0E14\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E40\u0E22\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E09\u0E35\u0E22\u0E1A\u0E1E\u0E25\u0E31\u0E19 (Volcanic Obsidian Glass)","\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicate Clay Minerals \u0E40\u0E0A\u0E48\u0E19 Smectite)","\u0E2B\u0E34\u0E19\u0E2D\u0E38\u0E01\u0E01\u0E32\u0E1A\u0E32\u0E15\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07 (Iron-Nickel Meteorite Fragment)","\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E41\u0E2B\u0E49\u0E07\u0E04\u0E32\u0E23\u0E4C\u0E1A\u0E2D\u0E19\u0E44\u0E14\u0E2D\u0E2D\u0E01\u0E44\u0E0B\u0E14\u0E4C\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C (Pure Dry Ice CO\u2082)"],correctOption:1,claimFeedback:"\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21! \u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicates) \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E19\u0E49\u0E33\u0E08\u0E37\u0E14\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07/\u0E14\u0E48\u0E32\u0E07\u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E19\u0E32\u0E19\u0E2B\u0E25\u0E32\u0E22\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35\u0E43\u0E19\u0E22\u0E38\u0E04 Noachian \u0E16\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21\u0E17\u0E35\u0E48\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E0A\u0E35\u0E27\u0E14\u0E32\u0E23\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14"},{id:"gamma",name:"Sample Gamma: Olivine Basalt Outcrop",thaiName:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 \u0E41\u0E01\u0E21\u0E21\u0E32: \u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E1A\u0E19\u0E22\u0E2D\u0E14\u0E1C\u0E32 (Olivine Basalt)",unknownTitle:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32 GAMMA (Site Gamma Escarpment)",siteType:"\u0E2A\u0E31\u0E19\u0E1C\u0E32\u0E2B\u0E34\u0E19\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2A\u0E35\u0E40\u0E02\u0E49\u0E21\u0E2A\u0E39\u0E07\u0E0A\u0E31\u0E19 (Volcanic Ridge Escarpment)",x:-42,z:-45,color:2278750,description:"\u0E2B\u0E34\u0E19\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2D\u0E38\u0E14\u0E21\u0E14\u0E49\u0E27\u0E22\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine-rich Basalt) \u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E04\u0E07\u0E2A\u0E20\u0E32\u0E1E\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48 \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E22\u0E38\u0E04\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E2A\u0E39\u0E48\u0E04\u0E27\u0E32\u0E21\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04 Amazonian",stemFact:"\u0E41\u0E23\u0E48\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E2A\u0E25\u0E32\u0E22\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27\u0E21\u0E32\u0E01\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E19\u0E49\u0E33 \u0E01\u0E32\u0E23\u0E1E\u0E1A\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E40\u0E27\u0E13\u0E19\u0E35\u0E49\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E41\u0E25\u0E30\u0E2B\u0E19\u0E32\u0E27\u0E08\u0E31\u0E14\u0E21\u0E32\u0E19\u0E32\u0E19\u0E2B\u0E25\u0E32\u0E22\u0E1E\u0E31\u0E19\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35",waterEvidence:"+ (\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E1A: \u0E2B\u0E34\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E19\u0E49\u0E33\u0E41\u0E1B\u0E23\u0E2A\u0E20\u0E32\u0E1E \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E22\u0E38\u0E04\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E31\u0E14)",waterEvidenceLevel:1,spectrometer:{hydration:"VERY LOW (< 4%)",hydrationVal:4,sulfate:"NONE (0%)",sulfateVal:2,iron:"HIGH (Fe-Pyroxene & Basaltic glass)",ironVal:78,silicate:"HIGH (\u0E41\u0E21\u0E01\u0E19\u0E35\u0E40\u0E0B\u0E35\u0E22\u0E21-\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 Olivine)",silicateVal:91,magnetism:"MEDIUM (\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1E\u0E37\u0E49\u0E19\u0E1C\u0E34\u0E27\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07)",magnetismVal:42,visualTexture:"\u0E2B\u0E34\u0E19\u0E1C\u0E25\u0E36\u0E01\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E41\u0E19\u0E48\u0E19\u0E2A\u0E35\u0E40\u0E02\u0E49\u0E21\u0E17\u0E36\u0E1A \u0E21\u0E35\u0E40\u0E21\u0E47\u0E14\u0E1C\u0E25\u0E36\u0E01\u0E2A\u0E35\u0E40\u0E02\u0E35\u0E22\u0E27\u0E21\u0E30\u0E01\u0E2D\u0E01\u0E41\u0E1D\u0E07\u0E2D\u0E22\u0E39\u0E48 (Dark dense crystalline basalt)"},spectralData:{hydrationIndex:4,keyAbsorption:"1.0 \xB5m (Fe\xB2\u207A Crystal Field) / \u0E44\u0E23\u0E49\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E19\u0E49\u0E33",absorption14:.05,absorption19:.04,absorptionMetal:.12,readingText:"\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E01\u0E27\u0E49\u0E32\u0E07\u0E17\u0E35\u0E48 1.0 \xB5m \u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A Fe\xB2\u207A \u0E43\u0E19\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 \u0E1B\u0E23\u0E32\u0E28\u0E08\u0E32\u0E01\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E02\u0E2D\u0E07\u0E19\u0E49\u0E33 (H\u2082O) \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E2E\u0E14\u0E23\u0E2D\u0E01\u0E0B\u0E34\u0E25 (OH)"},inquiryQuestion:{prompt:"\u0E01\u0E32\u0E23\u0E1E\u0E1A\u0E41\u0E23\u0E48\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine) \u0E43\u0E19\u0E2A\u0E20\u0E32\u0E1E\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07\u0E1A\u0E19\u0E22\u0E2D\u0E14\u0E1C\u0E32\u0E2B\u0E34\u0E19\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F \u0E43\u0E2B\u0E49\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C\u0E43\u0E14\u0E15\u0E48\u0E2D\u0E27\u0E34\u0E27\u0E31\u0E12\u0E19\u0E32\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23?",choices:[{text:"\u0E01. \u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E01\u0E31\u0E1A\u0E19\u0E49\u0E33\u0E44\u0E14\u0E49\u0E40\u0E23\u0E47\u0E27\u0E21\u0E32\u0E01 \u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E22\u0E38\u0E04\u0E19\u0E49\u0E33\u0E2B\u0E25\u0E32\u0E01 \u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E44\u0E14\u0E49\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E22\u0E38\u0E04 Amazonian \u0E17\u0E35\u0E48\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E31\u0E14\u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E19\u0E35\u0E49\u0E2D\u0E35\u0E01\u0E40\u0E25\u0E22"},{text:"\u0E02. \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E27\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E40\u0E27\u0E13\u0E19\u0E35\u0E49\u0E21\u0E35\u0E21\u0E2B\u0E32\u0E2A\u0E21\u0E38\u0E17\u0E23\u0E19\u0E49\u0E33\u0E08\u0E37\u0E14\u0E25\u0E36\u0E01\u0E17\u0E48\u0E27\u0E21\u0E02\u0E31\u0E07\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E32\u0E08\u0E19\u0E16\u0E36\u0E07\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"},{text:"\u0E04. \u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E34\u0E19\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E15\u0E01\u0E1C\u0E25\u0E36\u0E01\u0E08\u0E32\u0E01\u0E19\u0E49\u0E33\u0E17\u0E30\u0E40\u0E25\u0E2A\u0E32\u0E1A\u0E19\u0E49\u0E33\u0E2D\u0E38\u0E48\u0E19"}],correctIndex:0,explanation:"\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine) \u0E40\u0E1B\u0E47\u0E19\u0E41\u0E23\u0E48\u0E17\u0E35\u0E48\u0E17\u0E19\u0E15\u0E48\u0E2D\u0E19\u0E49\u0E33\u0E44\u0E14\u0E49\u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 \u0E2B\u0E32\u0E01\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E19\u0E49\u0E33\u0E08\u0E30\u0E41\u0E1B\u0E23\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E0B\u0E2D\u0E23\u0E4C\u0E40\u0E1E\u0E19\u0E17\u0E35\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27 \u0E01\u0E32\u0E23\u0E04\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E2A\u0E14\u0E08\u0E36\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E22\u0E38\u0E15\u0E34\u0E25\u0E07\u0E02\u0E2D\u0E07\u0E22\u0E38\u0E04\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27"},waterEvidencePoints:3,options:["\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2D\u0E38\u0E14\u0E21\u0E14\u0E49\u0E27\u0E22\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine-rich Basalt Outcrop)","\u0E04\u0E23\u0E32\u0E1A\u0E40\u0E01\u0E25\u0E37\u0E2D\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E42\u0E1A\u0E23\u0E32\u0E13 (Evaporite Salt Crust)","\u0E2B\u0E34\u0E19\u0E1B\u0E39\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E2A\u0E34\u0E48\u0E07\u0E21\u0E35\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E43\u0E19\u0E17\u0E30\u0E40\u0E25 (Biogenic Marine Limestone)","\u0E0A\u0E31\u0E49\u0E19\u0E14\u0E34\u0E19\u0E1E\u0E35\u0E15\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C\u0E14\u0E36\u0E01\u0E14\u0E33\u0E1A\u0E23\u0E23\u0E1E\u0E4C (Ancient Organic Peat Layer)"],correctOption:0,claimFeedback:"\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E32\u0E21\u0E2B\u0E25\u0E31\u0E01\u0E18\u0E23\u0E13\u0E35\u0E40\u0E04\u0E21\u0E35! \u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine) \u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E01\u0E31\u0E1A\u0E19\u0E49\u0E33\u0E44\u0E14\u0E49\u0E44\u0E27\u0E21\u0E32\u0E01 \u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E22\u0E31\u0E07\u0E04\u0E07\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E1A\u0E19\u0E22\u0E2D\u0E14\u0E1C\u0E32 \u0E1E\u0E34\u0E2A\u0E39\u0E08\u0E19\u0E4C\u0E27\u0E48\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E08\u0E32\u0E01\u0E22\u0E38\u0E04\u0E19\u0E49\u0E33\u0E44\u0E2B\u0E25\u0E1A\u0E48\u0E32 \u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E44\u0E14\u0E49\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E22\u0E38\u0E04 Amazonian \u0E17\u0E35\u0E48\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E31\u0E14\u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E19\u0E35\u0E49\u0E2D\u0E35\u0E01\u0E40\u0E25\u0E22"},{id:"delta",name:"Sample Delta: Paleomagnetic Crustal Rock",thaiName:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 \u0E40\u0E14\u0E25\u0E15\u0E32: \u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E14\u0E36\u0E01\u0E14\u0E33\u0E1A\u0E23\u0E23\u0E1E\u0E4C (Paleomagnetic Crust)",unknownTitle:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32 DELTA (Site Delta Crustal Bedrock)",siteType:"\u0E0A\u0E31\u0E49\u0E19\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13 (Deep Crustal Basement Bedrock)",x:36,z:-55,color:16096779,description:"\u0E1C\u0E25\u0E36\u0E01\u0E44\u0E17\u0E17\u0E32\u0E42\u0E19\u0E41\u0E21\u0E01\u0E19\u0E35\u0E44\u0E17\u0E15\u0E4C\u0E43\u0E19\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13 \u0E40\u0E01\u0E47\u0E1A\u0E23\u0E31\u0E01\u0E29\u0E32\u0E23\u0E2D\u0E22\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04\u0E17\u0E35\u0E48\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E22\u0E31\u0E07\u0E21\u0E35\u0E44\u0E14\u0E19\u0E32\u0E42\u0E21",stemFact:"\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E40\u0E04\u0E22\u0E21\u0E35\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E42\u0E25\u0E01\u0E1B\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E40\u0E21\u0E37\u0E48\u0E2D 4 \u0E1E\u0E31\u0E19\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E40\u0E22\u0E47\u0E19\u0E15\u0E31\u0E27\u0E25\u0E07 \u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E08\u0E36\u0E07\u0E1E\u0E31\u0E14\u0E17\u0E33\u0E25\u0E32\u0E22\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28 (\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E42\u0E14\u0E22 NASA MAVEN)",waterEvidence:"++ (\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E14\u0E49\u0E32\u0E19\u0E27\u0E34\u0E27\u0E31\u0E12\u0E19\u0E32\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28: \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E14\u0E32\u0E27\u0E40\u0E04\u0E22\u0E21\u0E35\u0E40\u0E01\u0E23\u0E32\u0E30\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1B\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E19\u0E49\u0E33\u0E41\u0E25\u0E30\u0E2D\u0E32\u0E01\u0E32\u0E28)",waterEvidenceLevel:2,spectrometer:{hydration:"LOW (6% \xB1 2%)",hydrationVal:6,sulfate:"LOW (< 8%)",sulfateVal:5,iron:"VERY HIGH (\u0E1C\u0E25\u0E36\u0E01\u0E44\u0E17\u0E17\u0E32\u0E42\u0E19\u0E41\u0E21\u0E01\u0E19\u0E35\u0E44\u0E17\u0E15\u0E4C Fe-Ti)",ironVal:88,silicate:"MEDIUM (\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13)",silicateVal:55,magnetism:"VERY HIGH ANOMALY (\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 142 nT)",magnetismVal:96,visualTexture:"\u0E2B\u0E34\u0E19\u0E14\u0E32\u0E19\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E41\u0E01\u0E23\u0E48\u0E07 \u0E21\u0E35\u0E1C\u0E25\u0E36\u0E01\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E31\u0E27\u0E15\u0E32\u0E21\u0E41\u0E01\u0E19\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E42\u0E1A\u0E23\u0E32\u0E13 (Remanent magnetic bedrock)"},spectralData:{hydrationIndex:6,keyAbsorption:"\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07 142 nT / \u0E44\u0E17\u0E17\u0E32\u0E42\u0E19\u0E41\u0E21\u0E01\u0E19\u0E35\u0E44\u0E17\u0E15\u0E4C",absorption14:.08,absorption19:.06,absorptionMetal:.22,readingText:"\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E2B\u0E34\u0E19\u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 142 nT \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E1C\u0E25\u0E36\u0E01\u0E44\u0E17\u0E17\u0E32\u0E42\u0E19\u0E41\u0E21\u0E01\u0E19\u0E35\u0E44\u0E17\u0E15\u0E4C (Titanomagnetite)"},inquiryQuestion:{prompt:"\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E42\u0E1A\u0E23\u0E32\u0E13 (Remanent Paleomagnetism) \u0E43\u0E19\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27 \u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E44\u0E23\u0E01\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E39\u0E0D\u0E40\u0E2A\u0E35\u0E22\u0E19\u0E49\u0E33\u0E41\u0E25\u0E30\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E02\u0E2D\u0E07\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23?",choices:[{text:"\u0E01. \u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07\u0E43\u0E14\u0E46 \u0E01\u0E31\u0E1A\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E2B\u0E23\u0E37\u0E2D\u0E2A\u0E20\u0E32\u0E1E\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23"},{text:"\u0E02. \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E27\u0E48\u0E32\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E40\u0E04\u0E22\u0E21\u0E35\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E44\u0E14\u0E19\u0E32\u0E42\u0E21\u0E1B\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E40\u0E22\u0E47\u0E19\u0E15\u0E31\u0E27\u0E25\u0E07\u0E40\u0E01\u0E23\u0E32\u0E30\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E08\u0E36\u0E07\u0E14\u0E31\u0E1A\u0E2A\u0E39\u0E0D \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E1E\u0E31\u0E14\u0E17\u0E33\u0E25\u0E32\u0E22\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E41\u0E25\u0E30\u0E19\u0E49\u0E33\u0E08\u0E19\u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E2A\u0E39\u0E48\u0E2D\u0E27\u0E01\u0E32\u0E28"},{text:"\u0E04. \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E27\u0E48\u0E32\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E22\u0E31\u0E07\u0E21\u0E35\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E40\u0E2B\u0E25\u0E27\u0E44\u0E2B\u0E25\u0E40\u0E27\u0E35\u0E22\u0E19\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07\u0E01\u0E27\u0E48\u0E32\u0E42\u0E25\u0E01"}],correctIndex:1,explanation:"\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E40\u0E04\u0E22\u0E21\u0E35\u0E40\u0E01\u0E23\u0E32\u0E30\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E44\u0E14\u0E19\u0E32\u0E42\u0E21\u0E43\u0E19\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E2B\u0E22\u0E38\u0E14\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E08\u0E36\u0E07\u0E16\u0E39\u0E01\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E01\u0E31\u0E14\u0E40\u0E0B\u0E32\u0E30\u0E08\u0E19\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E25\u0E14\u0E25\u0E07\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E08\u0E38\u0E14\u0E23\u0E48\u0E27\u0E21\u0E2A\u0E32\u0E21\u0E02\u0E2D\u0E07\u0E19\u0E49\u0E33 (Water Triple Point 611 Pa) \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E43\u0E2B\u0E49\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E04\u0E07\u0E2A\u0E20\u0E32\u0E1E\u0E2D\u0E22\u0E39\u0E48\u0E1A\u0E19\u0E1E\u0E37\u0E49\u0E19\u0E1C\u0E34\u0E27\u0E44\u0E14\u0E49\u0E2D\u0E35\u0E01"},waterEvidencePoints:3,options:["\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E17\u0E35\u0E48\u0E21\u0E35\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07 (Remanent Paleomagnetic Rock)","\u0E02\u0E31\u0E49\u0E27\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E43\u0E19\u0E22\u0E38\u0E04\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E07\u0E40\u0E01\u0E34\u0E14\u0E02\u0E36\u0E49\u0E19 (Active Modern Geomagnetic Pole)","\u0E0A\u0E34\u0E49\u0E19\u0E2A\u0E48\u0E27\u0E19\u0E0B\u0E32\u0E01\u0E14\u0E32\u0E27\u0E40\u0E17\u0E35\u0E22\u0E21\u0E17\u0E35\u0E48\u0E15\u0E01\u0E25\u0E07\u0E21\u0E32 (Fallen Spacecraft Debris)","\u0E2B\u0E34\u0E19\u0E01\u0E23\u0E27\u0E14\u0E21\u0E19\u0E41\u0E21\u0E48\u0E19\u0E49\u0E33\u0E17\u0E35\u0E48\u0E01\u0E25\u0E34\u0E49\u0E07\u0E15\u0E31\u0E27\u0E21\u0E32 (River Conglomerate)"],correctOption:0,claimFeedback:"\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21! \u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07 (Remanent Magnetism) \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E27\u0E48\u0E32\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E40\u0E04\u0E22\u0E21\u0E35\u0E01\u0E23\u0E30\u0E1A\u0E27\u0E19\u0E01\u0E32\u0E23\u0E44\u0E14\u0E19\u0E32\u0E42\u0E21\u0E43\u0E19\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E14\u0E32\u0E27\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u0E04\u0E2D\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E01\u0E23\u0E32\u0E30\u0E01\u0E31\u0E19\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E19\u0E35\u0E49\u0E14\u0E31\u0E1A\u0E25\u0E07 \u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E41\u0E25\u0E30\u0E19\u0E49\u0E33\u0E08\u0E36\u0E07\u0E16\u0E39\u0E01\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E1E\u0E31\u0E14\u0E1E\u0E32\u0E2D\u0E2D\u0E01\u0E2A\u0E39\u0E48\u0E2D\u0E27\u0E01\u0E32\u0E28 (\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E22\u0E32\u0E19 NASA MAVEN)"}].forEach(e=>{let i=this.getHeight(e.x,e.z),n=new Pe;n.position.set(e.x,i,e.z);let r=new Bs(.85,0),a=new he({color:e.color,emissive:e.color,emissiveIntensity:.9,roughness:.15,metalness:.8}),o=new st(r,a);o.position.y=1.6,o.castShadow=!0,n.add(o);let l=new kt(.06,.06,12,8),c=new ke({color:e.color,transparent:!0,opacity:.4}),h=new st(l,c);h.position.y=6,n.add(h);let f=new En(e.color,3.5,16);f.position.y=2.2,n.add(f);let u=new jn(1.8,2.2,32);u.rotateX(-Math.PI/2);let d=new ke({color:e.color,side:He,transparent:!0,opacity:.65}),g=new st(u,d);g.position.y=.08,n.add(g),this.scene.add(n),this.samples.push({id:e.id,name:e.name,thaiName:e.thaiName,unknownTitle:e.unknownTitle,siteType:e.siteType,position:new R(e.x,i,e.z),color:e.color,description:e.description,stemFact:e.stemFact,waterEvidence:e.waterEvidence,waterEvidenceLevel:e.waterEvidenceLevel,spectrometer:e.spectrometer,spectralData:e.spectralData,inquiryQuestion:e.inquiryQuestion,waterEvidencePoints:e.waterEvidencePoints,options:e.options,correctOption:e.correctOption,claimFeedback:e.claimFeedback,group:n,coreMesh:o,collected:!1,analyzed:!1,triggerRadius:4.8})})}initLander(){let e=this.getHeight(0,-16),i=new Pe;i.position.set(0,e,-16);let n=new kt(3.6,4.4,2,8),r=new he({color:15857145,metalness:.8,roughness:.25}),a=new st(n,r);a.position.y=1.3,a.castShadow=!0,a.receiveShadow=!0,i.add(a);let o=new kt(2.6,3.4,2.4,8),l=new he({color:14251782,metalness:.95,roughness:.2}),c=new st(o,l);c.position.y=3.3,c.castShadow=!0,i.add(c);let h=new Ls(2.4,3.6,8),f=new he({color:988970,metalness:.7,roughness:.3}),u=new st(h,f);u.position.y=6.1,u.castShadow=!0,i.add(u);for(let m=0;m<4;m++){let p=m*Math.PI/2+Math.PI/4,M=new kt(.14,.14,4.8),b=new he({color:3359061,metalness:.85}),v=new st(M,b);v.position.set(Math.cos(p)*3.4,1.1,Math.sin(p)*3.4),v.rotation.z=Math.cos(p)*.65,v.rotation.x=Math.sin(p)*.65,v.castShadow=!0,i.add(v);let T=new kt(.75,.75,.18,12),S=new st(T,b);S.position.set(Math.cos(p)*4.8,.12,Math.sin(p)*4.8),S.castShadow=!0,i.add(S)}let d=new jn(7.2,7.8,36);d.rotateX(-Math.PI/2);let g=new ke({color:3718648,side:He,transparent:!0,opacity:.6}),_=new st(d,g);_.position.y=.08,i.add(_),this.scene.add(i),this.lander={position:new R(0,e,-16),radius:8,group:i}}update(t){this.samples.forEach(e=>{e.collected||(e.coreMesh.rotation.y=t*1.5,e.coreMesh.position.y=1.6+Math.sin(t*2.5)*.25)})}};function hs(){return typeof document<"u"}function S0(){if(!hs())return new De({width:1,height:1});let s=document.createElement("canvas");s.width=512,s.height=512;let t=s.getContext("2d"),e=t.createLinearGradient(0,0,512,512);e.addColorStop(0,"#071326"),e.addColorStop(.5,"#0c2340"),e.addColorStop(1,"#08172c"),t.fillStyle=e,t.fillRect(0,0,512,512);let i=512/8,n=2.5;for(let a=0;a<8;a++)for(let o=0;o<8;o++){let l=o*i+n,c=a*i+n,h=i-n*2,f=i-n*2,u=t.createLinearGradient(l,c,l+h,c+f);u.addColorStop(0,"#102e52"),u.addColorStop(.5,"#19497e"),u.addColorStop(1,"#0d2746"),t.fillStyle=u,t.fillRect(l,c,h,f),t.strokeStyle="rgba(125, 211, 252, 0.22)",t.lineWidth=1;for(let g=c+4;g<c+f;g+=4)t.beginPath(),t.moveTo(l,g),t.lineTo(l+h,g),t.stroke();t.strokeStyle="#e2e8f0",t.lineWidth=2,t.beginPath(),t.moveTo(l+h*.33,c),t.lineTo(l+h*.33,c+f),t.moveTo(l+h*.67,c),t.lineTo(l+h*.67,c+f),t.stroke(),t.fillStyle="#071326";let d=4;t.beginPath(),t.moveTo(l,c),t.lineTo(l+d,c),t.lineTo(l,c+d),t.fill(),t.beginPath(),t.moveTo(l+h,c),t.lineTo(l+h-d,c),t.lineTo(l+h,c+d),t.fill(),t.beginPath(),t.moveTo(l,c+f),t.lineTo(l+d,c+f),t.lineTo(l,c+f-d),t.fill(),t.beginPath(),t.moveTo(l+h,c+f),t.lineTo(l+h-d,c+f),t.lineTo(l+h,c+f-d),t.fill()}t.strokeStyle="#334155",t.lineWidth=6,t.strokeRect(0,0,512,512);let r=new De(s);return r.wrapS=Ke,r.wrapT=Ke,r}function E0(){if(!hs())return new De({width:1,height:1});let s=document.createElement("canvas");s.width=512,s.height=512;let t=s.getContext("2d");t.fillStyle="#d97706",t.fillRect(0,0,512,512);for(let i=0;i<400;i++){let n=Math.random()*512,r=Math.random()*512,a=15+Math.random()*45,o=Math.random()*Math.PI*2,l=n+Math.cos(o)*a,c=r+Math.sin(o)*a;t.strokeStyle=Math.random()>.5?"rgba(254, 240, 138, 0.45)":"rgba(180, 83, 9, 0.6)",t.lineWidth=1+Math.random()*2.5,t.beginPath(),t.moveTo(n,r),t.lineTo(l,c),t.stroke()}t.fillStyle="rgba(146, 64, 14, 0.55)",t.fillRect(0,120,512,16),t.fillRect(0,260,512,16),t.fillRect(0,400,512,16),t.fillRect(160,0,16,512),t.fillRect(340,0,16,512),t.fillStyle="#fef08a";for(let i=128;i<=400;i+=140)for(let n=20;n<512;n+=40)t.beginPath(),t.arc(n,i,2.5,0,Math.PI*2),t.fill();let e=new De(s);return e.wrapS=Ke,e.wrapT=Ke,e}function T0(){if(!hs())return new De({width:1,height:1});let s=document.createElement("canvas");s.width=512,s.height=512;let t=s.getContext("2d");t.fillStyle="#f8fafc",t.fillRect(0,0,512,512),t.strokeStyle="#94a3b8",t.lineWidth=3,t.strokeRect(16,16,480,480),t.beginPath(),t.moveTo(16,256),t.lineTo(496,256),t.moveTo(256,16),t.lineTo(256,496),t.stroke(),t.fillStyle="#64748b";for(let i=28;i<496;i+=28)t.beginPath(),t.arc(i,16,2.5,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(i,496,2.5,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(16,i,2.5,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(496,i,2.5,0,Math.PI*2),t.fill();t.fillStyle="#ea580c",t.fillRect(32,32,180,24),t.fillStyle="#ffffff",t.font='bold 13px "JetBrains Mono", monospace',t.fillText("ARES-6 // ROVER",42,49),t.fillStyle="#475569",t.font='9px "JetBrains Mono", monospace',t.fillText("NASA / JPL EXPLORATION PAYLOAD",32,75),t.fillText("AVIONICS BAY A - PRESSURIZED GN2",32,90),t.fillText("CHASSIS LEVELING SUBSYSTEM v2.4",32,105),t.fillStyle="#f97316";for(let i=280;i<480;i+=22)t.beginPath(),t.moveTo(i,32),t.lineTo(i+10,32),t.lineTo(i-6,56),t.lineTo(i-16,56),t.closePath(),t.fill();let e=new De(s);return e.wrapS=Ke,e.wrapT=Ke,e}function w0(){if(!hs())return new De({width:1,height:1});let s=document.createElement("canvas");s.width=64,s.height=64;let t=s.getContext("2d");t.fillStyle="#0f172a",t.fillRect(0,0,64,64);let e=8;for(let n=0;n<64;n+=e)for(let r=0;r<64;r+=e){let a=(r/e+n/e)%2===0;t.fillStyle=a?"#1e293b":"#090d16",t.fillRect(r,n,e,e),t.strokeStyle=a?"rgba(148, 163, 184, 0.15)":"rgba(2, 6, 23, 0.4)",t.lineWidth=1,t.beginPath(),t.moveTo(r,n),t.lineTo(r+e,n+e),t.stroke()}let i=new De(s);return i.wrapS=Ke,i.wrapT=Ke,i.repeat.set(4,4),i}function A0(){if(!hs())return new De({width:1,height:1});let s=document.createElement("canvas");s.width=256,s.height=256;let t=s.getContext("2d"),e=t.createRadialGradient(128,128,10,128,128,120);return e.addColorStop(0,"rgba(15, 6, 4, 0.85)"),e.addColorStop(.35,"rgba(25, 10, 6, 0.55)"),e.addColorStop(.7,"rgba(40, 15, 10, 0.2)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,256,256),new De(s)}function uu(s){if(!hs()||!s)return null;let t=document.createElement("canvas");t.width=1024,t.height=512;let e=t.getContext("2d"),i=e.createLinearGradient(0,0,0,256);i.addColorStop(0,"#100504"),i.addColorStop(.35,"#45170d"),i.addColorStop(.7,"#8c351b"),i.addColorStop(.95,"#d95a2b"),i.addColorStop(1,"#f97316"),e.fillStyle=i,e.fillRect(0,0,1024,256);let n=680,r=105,a=e.createRadialGradient(n,r,2,n,r,180);a.addColorStop(0,"#ffffff"),a.addColorStop(.08,"#fff7ed"),a.addColorStop(.2,"#fef08a"),a.addColorStop(.45,"rgba(251, 146, 60, 0.75)"),a.addColorStop(.75,"rgba(234, 88, 12, 0.3)"),a.addColorStop(1,"rgba(194, 65, 12, 0)"),e.fillStyle=a,e.fillRect(0,0,1024,256);let o=e.createRadialGradient(n,r,10,n,r,320);o.addColorStop(0,"rgba(255, 237, 213, 0.45)"),o.addColorStop(.5,"rgba(249, 115, 22, 0.15)"),o.addColorStop(1,"rgba(180, 83, 9, 0)"),e.fillStyle=o,e.fillRect(0,0,1024,256);let l=e.createLinearGradient(0,256,0,512);l.addColorStop(0,"#d95a2b"),l.addColorStop(.08,"#7c2d12"),l.addColorStop(.28,"#451a0d"),l.addColorStop(.65,"#260e07"),l.addColorStop(1,"#120603"),e.fillStyle=l,e.fillRect(0,256,1024,256),e.fillStyle="#612413",e.beginPath(),e.moveTo(0,256);for(let u=0;u<=1024;u+=16){let d=Math.sin(u*.015)*6+Math.cos(u*.035)*4;e.lineTo(u,256-Math.max(0,d))}e.lineTo(1024,264),e.lineTo(0,264),e.closePath(),e.fill();let c=new De(t);c.mapping=is;let h=new ls(s);h.compileEquirectangularShader();let f=h.fromEquirectangular(c).texture;return h.dispose(),c.dispose(),f}var vo=class{constructor(){this.solarTex=S0(),this.goldFoilTex=E0(),this.panelTex=T0(),this.carbonTex=w0(),this.shadowTex=A0(),this.whiteArmor=new he({map:this.panelTex,color:16317180,roughness:.3,metalness:.28}),this.goldFoil=new he({map:this.goldFoilTex,color:16096779,roughness:.2,metalness:.96,bumpMap:this.goldFoilTex,bumpScale:.04}),this.solarDeck=new he({map:this.solarTex,roughness:.1,metalness:.96,emissive:795973,emissiveIntensity:.2}),this.carbonFiber=new he({map:this.carbonTex,color:1976635,roughness:.4,metalness:.55}),this.chromePiston=new he({color:16777215,roughness:.04,metalness:.98}),this.gunmetal=new he({color:4674921,roughness:.2,metalness:.92}),this.darkChassis=new he({color:1976635,roughness:.38,metalness:.72}),this.marsOrange=new he({color:15357964,roughness:.22,metalness:.88}),this.cameraLens=new he({color:399398,roughness:.04,metalness:.96,emissive:165063,emissiveIntensity:.4}),this.sensorGlow=new he({color:440020,emissive:440020,emissiveIntensity:.9,roughness:.18,metalness:.75}),this.springSteel=new he({color:16347926,roughness:.2,metalness:.9})}};var ac=null;function oc(){return ac||(ac=new vo),ac}function C0(s,t,e,i,n=48){let r=[],a=e*n;for(let l=0;l<=a;l++){let c=l/a,h=c*e*Math.PI*2,f=c*i,u=Math.cos(h)*s,d=Math.sin(h)*s;r.push(new R(f,u,d))}let o=new Kn(r);return new Os(o,a,t,6,!1)}var lc=class{constructor(t,e,i){this.id=t,this.mountAngle=e,this.mountRadius=i,this.coxaLength=.45,this.femurLength=.92,this.tibiaLength=1.22,this.root=new Pe,this.root.position.set(Math.cos(e)*i,0,Math.sin(e)*i),this.root.rotation.y=-e,this.coxaPivot=new Pe,this.root.add(this.coxaPivot),this.femurPivot=new Pe,this.femurPivot.position.set(this.coxaLength,0,0),this.coxaPivot.add(this.femurPivot),this.tibiaPivot=new Pe,this.tibiaPivot.position.set(this.femurLength,0,0),this.femurPivot.add(this.tibiaPivot),this.footTip=new Pe,this.footTip.position.set(this.tibiaLength,0,0),this.tibiaPivot.add(this.footTip),this.worldFootPos=new R,this.isGrounded=!0,this.wasGrounded=!0,this.buildMeshes()}buildMeshes(){let t=oc(),e=new kt(.24,.26,.08,16),i=new st(e,t.gunmetal);i.position.y=-.02,i.castShadow=!0,this.coxaPivot.add(i);let n=new kt(.016,.016,.03,6);for(let $t=0;$t<8;$t++){let Vt=$t*Math.PI*2/8,Ut=new st(n,t.chromePiston);Ut.position.set(Math.cos(Vt)*.22,.03,Math.sin(Vt)*.22),this.coxaPivot.add(Ut)}let r=new kt(.18,.2,.32,16),a=new st(r,t.gunmetal);a.position.y=.08,a.castShadow=!0,this.coxaPivot.add(a);for(let $t of[0,.08,.16]){let Vt=new Ui(.19,.015,6,20);Vt.rotateX(Math.PI/2);let Ut=new st(Vt,t.marsOrange);Ut.position.y=$t,this.coxaPivot.add(Ut)}let o=new ge(this.coxaLength*.88,.16,.18),l=new st(o,t.whiteArmor);l.position.set(this.coxaLength*.44,.08,0),l.castShadow=!0,this.coxaPivot.add(l);for(let $t of[-.095,.095]){let Vt=new ge(this.coxaLength*.7,.12,.02),Ut=new st(Vt,t.carbonFiber);Ut.position.set(this.coxaLength*.44,.08,$t),this.coxaPivot.add(Ut)}let c=new ge(.04,.02,.04),h=new ke({color:1096065}),f=new st(c,h);f.position.set(this.coxaLength*.3,.17,0),this.coxaPivot.add(f);let u=new kt(.13,.13,.22,16);u.rotateX(Math.PI/2);let d=new st(u,t.gunmetal);d.castShadow=!0,this.femurPivot.add(d);let g=new kt(.06,.06,.26,16);g.rotateX(Math.PI/2);let _=new st(g,t.chromePiston);this.femurPivot.add(_);let m=new ge(this.femurLength,.14,.12),p=new st(m,t.whiteArmor);p.position.set(this.femurLength*.5,0,0),p.castShadow=!0,this.femurPivot.add(p);for(let $t of[-.065,.065]){let Vt=new ge(this.femurLength*.85,.11,.015),Ut=new st(Vt,t.carbonFiber);Ut.position.set(this.femurLength*.5,0,$t),this.femurPivot.add(Ut)}let M=new ge(this.femurLength*.7,.02,.08),b=new st(M,t.marsOrange);b.position.set(this.femurLength*.5,.08,0),this.femurPivot.add(b);let v=this.femurLength*.45,T=new kt(.038,.042,v,12);T.rotateZ(-Math.PI/2);let S=new st(T,t.gunmetal);S.position.set(this.femurLength*.28,.13,0),S.castShadow=!0,this.femurPivot.add(S);let A=this.femurLength*.38,x=new kt(.022,.022,A,12);x.rotateZ(-Math.PI/2);let w=new st(x,t.chromePiston);w.position.set(this.femurLength*.62,.13,0),w.castShadow=!0,this.femurPivot.add(w);let P=new Ui(.05,.012,6,16),I=new st(P,t.marsOrange);I.position.set(this.femurLength*.15,.13,0),this.femurPivot.add(I);let L=new kt(.12,.12,.2,16);L.rotateX(Math.PI/2);let W=new st(L,t.gunmetal);W.castShadow=!0,this.tibiaPivot.add(W);let k=new ge(.14,.18,.22),D=new st(k,t.marsOrange);D.position.set(-.02,.03,0),this.tibiaPivot.add(D);let F=new kt(.07,.075,this.tibiaLength*.3,14);F.rotateZ(-Math.PI/2);let U=new st(F,t.gunmetal);U.position.set(this.tibiaLength*.15,0,0),U.castShadow=!0,this.tibiaPivot.add(U);let V=new kt(.035,.035,this.tibiaLength*.45,12);V.rotateZ(-Math.PI/2);let J=new st(V,t.chromePiston);J.position.set(this.tibiaLength*.45,0,0),this.tibiaPivot.add(J);let et=this.tibiaLength*.42,rt=C0(.065,.016,6,et),pt=new st(rt,t.springSteel);pt.position.set(this.tibiaLength*.24,0,0),pt.castShadow=!0,this.tibiaPivot.add(pt);let Xt=new kt(.055,.055,this.tibiaLength*.15,12);Xt.rotateZ(-Math.PI/2);let Pt=new st(Xt,t.darkChassis);Pt.position.set(this.tibiaLength*.68,0,0),this.tibiaPivot.add(Pt);let bt=new kt(.045,.065,this.tibiaLength*.38,14);bt.rotateZ(-Math.PI/2);let $=new st(bt,t.carbonFiber);$.position.set(this.tibiaLength*.88,0,0),$.castShadow=!0,this.tibiaPivot.add($);let it=new bn(.07,14,14),tt=new st(it,t.gunmetal);tt.position.set(this.tibiaLength,0,0),this.tibiaPivot.add(tt);let It=new kt(.16,.12,.06,16);It.rotateZ(Math.PI/2);let Lt=new st(It,t.gunmetal);Lt.position.set(this.tibiaLength+.04,0,0),Lt.castShadow=!0,this.tibiaPivot.add(Lt);let Rt=new Ui(.14,.025,8,20);Rt.rotateY(Math.PI/2);let le=new st(Rt,t.darkChassis);le.position.set(this.tibiaLength+.05,0,0),this.tibiaPivot.add(le);let qt=new kt(.09,.09,.025,16);qt.rotateZ(Math.PI/2),this.footPad=new st(qt,t.sensorGlow),this.footPad.position.set(this.tibiaLength+.07,0,0),this.tibiaPivot.add(this.footPad)}solveIK(t){let e=-Math.atan2(t.z,t.x);this.coxaPivot.rotation.y=e;let i=Math.sqrt(t.x*t.x+t.z*t.z)-this.coxaLength,n=t.y,r=Math.sqrt(i*i+n*n),a=(this.femurLength+this.tibiaLength)*.98,o=Math.abs(this.femurLength-this.tibiaLength)*1.05,l=Math.max(o,Math.min(a,r)),c=(this.femurLength*this.femurLength+this.tibiaLength*this.tibiaLength-l*l)/(2*this.femurLength*this.tibiaLength),h=Math.PI-Math.acos(Math.max(-1,Math.min(1,c))),f=Math.atan2(n,i),u=(this.femurLength*this.femurLength+l*l-this.tibiaLength*this.tibiaLength)/(2*this.femurLength*l),d=Math.acos(Math.max(-1,Math.min(1,u))),g=f+d;this.femurPivot.rotation.z=g,this.tibiaPivot.rotation.z=-h,this.coxaAngle=e,this.femurAngle=g,this.tibiaAngle=-h,this.reachDist=r,this.targetLocal=t.clone()}},Mo=class{constructor(t){this.scene=t,this.group=new Pe,this.scene.add(this.group),this.body=new Pe,this.group.add(this.body),this.legs=[],this.chassisRadius=1.35,this.bodyHeight=1.15,this.position=this.group.position,this.rotation=this.group.rotation,this.buildChassis(),this.buildLegs(),this.buildContactShadow()}buildChassis(){let t=oc(),e=new kt(this.chassisRadius*1.05,this.chassisRadius*.95,.16,6),i=new st(e,t.darkChassis);i.position.y=-.04,i.castShadow=!0,i.receiveShadow=!0,this.body.add(i);let n=new kt(this.chassisRadius*1.15,this.chassisRadius*1.12,.12,6),r=new st(n,t.gunmetal);r.position.y=.08,r.castShadow=!0,this.body.add(r);let a=new kt(this.chassisRadius,this.chassisRadius*1.12,.42,6),o=new st(a,t.whiteArmor);o.position.y=.32,o.castShadow=!0,o.receiveShadow=!0,this.body.add(o);for(let F=0;F<6;F++){let U=F*Math.PI/3+Math.PI/6,V=new ge(.85,.28,.08),J=new st(V,t.goldFoil);J.position.set(Math.cos(U)*(this.chassisRadius*1.02),.32,Math.sin(U)*(this.chassisRadius*1.02)),J.rotation.y=-U+Math.PI/2,J.castShadow=!0,this.body.add(J)}let l=new ge(.28,.44,2.5),c=new st(l,t.marsOrange);c.position.set(0,.33,0),this.body.add(c);for(let F of[-.35,.35]){let U=new ge(.16,.12,.14),V=new st(U,t.gunmetal);V.position.set(F,.06,1.25),V.rotation.x=.35,this.body.add(V);let J=new kt(.04,.04,.06,14);J.rotateX(Math.PI/2);let et=new st(J,t.cameraLens);et.position.set(F,.05,1.33),this.body.add(et)}let h=new kt(this.chassisRadius*.88,this.chassisRadius*.9,.04,6),f=new st(h,t.gunmetal);f.position.y=.54,this.body.add(f);let u=new kt(this.chassisRadius*.85,this.chassisRadius*.85,.05,6),d=new st(u,t.solarDeck);d.position.y=.58,d.castShadow=!0,this.body.add(d),this.solarDeck=d;for(let F=0;F<6;F++){let U=F*Math.PI/3,V=new ge(.14,.07,.08),J=new st(V,t.chromePiston);J.position.set(Math.cos(U)*(this.chassisRadius*.85),.59,Math.sin(U)*(this.chassisRadius*.85)),J.rotation.y=-U,this.body.add(J)}let g=new kt(.075,.09,.85,16),_=new st(g,t.gunmetal);_.position.set(0,1,.55),_.castShadow=!0,this.body.add(_);let m=new Ui(.095,.015,6,24);m.rotateX(Math.PI/2);for(let F=.7;F<=1.25;F+=.16){let U=new st(m,t.marsOrange);U.position.set(0,F,.55),this.body.add(U)}let p=new kt(.14,.14,.16,16),M=new st(p,t.gunmetal);M.position.set(0,1.48,.55),this.body.add(M);let b=new ge(.68,.26,.34),v=new st(b,t.whiteArmor);v.position.set(0,1.62,.55),v.castShadow=!0,this.body.add(v);for(let F of[-.22,.22]){let U=new kt(.08,.08,.15,16);U.rotateX(Math.PI/2);let V=new st(U,t.gunmetal);V.position.set(F,1.62,.74),V.castShadow=!0,this.body.add(V);let J=new Ui(.082,.01,8,20),et=new st(J,t.goldFoil);et.position.set(F,1.62,.81),this.body.add(et);let rt=new kt(.07,.07,.04,16);rt.rotateX(Math.PI/2);let pt=new st(rt,t.cameraLens);pt.position.set(F,1.62,.82),this.body.add(pt);let Xt=new ge(.18,.18,.08),Pt=new st(Xt,t.darkChassis);Pt.position.set(F,1.62,.84),this.body.add(Pt);let bt=new Gs(440020,3.2,35,Math.PI/4.5,.4);bt.position.set(F,1.62,.88),bt.target.position.set(F,-.5,14),this.body.add(bt),this.body.add(bt.target)}let T=new kt(.065,.065,.12,16);T.rotateX(Math.PI/2);let S=new st(T,t.goldFoil);S.position.set(0,1.66,.73),this.body.add(S);for(let F of[-1,1]){let U=new kt(.015,.015,.45,8);U.rotateZ(Math.PI/2);let V=new st(U,t.chromePiston);V.position.set(F*.52,1.62,.55),this.body.add(V);let J=new bn(.035,8,8),et=new st(J,t.marsOrange);et.position.set(F*.75,1.62,.55),this.body.add(et)}let A=new kt(.18,.22,.48,16),x=new st(A,t.gunmetal);x.position.set(0,.72,-.85),x.castShadow=!0,this.body.add(x);for(let F=0;F<8;F++){let U=F*Math.PI/4,V=new ge(.02,.44,.22),J=new st(V,t.darkChassis);J.position.set(Math.cos(U)*.26,.72,-.85+Math.sin(U)*.26),J.rotation.y=-U,J.castShadow=!0,this.body.add(J)}let w=new bn(.38,16,16,0,Math.PI*2,0,Math.PI*.5),P=new st(w,t.goldFoil);P.position.set(.48,.85,-.45),P.rotation.x=-Math.PI*.65,P.rotation.y=.25,P.castShadow=!0,this.body.add(P);let I=new kt(.025,.04,.28,8),L=new st(I,t.chromePiston);L.position.set(.48,.98,-.4),this.body.add(L);let W=new kt(.012,.025,.65,8),k=new st(W,t.chromePiston);k.position.set(-.55,.9,-.45),this.body.add(k);let D=new En(16772829,1.8,8);D.position.set(0,1.8,0),this.body.add(D)}buildLegs(){let t=[50*Math.PI/180,0,-50*Math.PI/180,-130*Math.PI/180,Math.PI,130*Math.PI/180];for(let e=0;e<6;e++){let i=new lc(e,t[e],this.chassisRadius);this.body.add(i.root),this.legs.push(i)}}buildContactShadow(){let t=oc(),e=new Ni(6.4,6.4);e.rotateX(-Math.PI/2);let i=new ke({map:t.shadowTex,transparent:!0,opacity:.85,depthWrite:!1});this.contactShadow=new st(e,i),this.contactShadow.position.y=.04,this.group.add(this.contactShadow)}updateSolarGlow(t){this.solarDeck&&this.solarDeck.material&&(this.solarDeck.material.emissiveIntensity=.12+Math.max(0,t)*.7)}},bo=class{constructor(t,e,i=null,n=null){this.robot=t,this.terrain=e,this.audio=i,this.dust=n,this.mode="tripod",this.phase=0,this.cycleSpeed=1.35,this.stepHeight=.38,this.bodyHeight=1.15,this.groupA=[0,2,4],this.groupB=[1,3,5],this.stanceRadiusMid=2.8,this.stanceRadiusFrontRear=2.75}setMode(t){(t==="tripod"||t==="wave")&&(this.mode=t)}update(t,e,i=0){let n=0,r=i;e instanceof R?n=e.length()*Math.sign(e.z||1):n=Number(e)||0;let o=Math.hypot(n,r*2.75),l=o>.025;if(l){let f=Math.min(2.2,Math.max(.65,o/2.8));this.phase=(this.phase+t*this.cycleSpeed*f)%1}let c=l?Math.min(2.2,Math.max(.65,o/2.8)):1,h=.5/(this.cycleSpeed*c);this.robot.legs.forEach(f=>{let u=0,d=!0;this.mode==="tripod"?(u=(this.groupA.includes(f.id)?this.phase:this.phase+.5)%1,d=u>=.5||!l):(u=(this.phase+f.id/6)%1,d=u>=1/6||!l),d&&!f.wasGrounded&&l&&(this.audio&&this.audio.playFootstep(),this.dust&&this.dust.emitFootstepPuff(f.worldFootPos,6)),f.wasGrounded=d,f.isGrounded=d,f.footPad&&f.footPad.material&&(f.footPad.material.emissiveIntensity=d?.95:.25);let g=f.id===1||f.id===4?this.stanceRadiusMid:this.stanceRadiusFrontRear,_=Math.cos(f.mountAngle)*g,m=Math.sin(f.mountAngle)*g,p=_,M=m,b=0;if(l){let x=r*m,w=n-r*_,P=this.mode==="tripod"?.72:.5,I=x*h,L=w*h,W=Math.hypot(I,L);if(W>P&&(I=I/W*P,L=L/W*P),d){let k=this.mode==="tripod"?(u-.5)/.5:(u-.16666666666666666)/.8333333333333334,F=1-2*Math.max(0,Math.min(1,k));p=_+I*F,M=m+L*F}else{let k=this.mode==="tripod"?u/.5:u*6,D=Math.max(0,Math.min(1,k)),F=3*D*D-2*D*D*D;p=_-I+2*I*F,M=m-L+2*L*F,b=Math.sin(D*Math.PI)*this.stepHeight}}let v=new R(p,0,M);v.applyEuler(new ti(0,this.robot.rotation.y,0)),v.add(this.robot.position);let S=(this.terrain?this.terrain.getHeight(v.x,v.z):0)+b;f.worldFootPos.set(v.x,S,v.z),this.robot.scene.updateMatrixWorld(!0);let A=f.worldFootPos.clone();f.root.worldToLocal(A),f.solveIK(A)})}};var So=class{constructor(){this.ctx=null,this.isMuted=!1,this.motorOsc=null,this.motorGain=null,this.windNode=null,this.windGain=null,this.initialized=!1}init(){if(!this.initialized)try{let t=window.AudioContext||window.webkitAudioContext;this.ctx=new t,this.motorOsc=this.ctx.createOscillator(),this.motorOsc.type="sawtooth",this.motorOsc.frequency.setValueAtTime(45,this.ctx.currentTime);let e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.setValueAtTime(220,this.ctx.currentTime),this.motorGain=this.ctx.createGain(),this.motorGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.motorOsc.connect(e),e.connect(this.motorGain),this.motorGain.connect(this.ctx.destination),this.motorOsc.start(),this.initWind(),this.initialized=!0}catch(t){console.warn("Web Audio API not supported or blocked:",t)}}initWind(){if(!this.ctx)return;let t=this.ctx.sampleRate*2,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),i=e.getChannelData(0);for(let a=0;a<t;a++)i[a]=Math.random()*2-1;let n=this.ctx.createBufferSource();n.buffer=e,n.loop=!0;let r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(260,this.ctx.currentTime),r.Q.setValueAtTime(3,this.ctx.currentTime),this.windGain=this.ctx.createGain(),this.windGain.gain.setValueAtTime(.015,this.ctx.currentTime),n.connect(r),r.connect(this.windGain),this.windGain.connect(this.ctx.destination),n.start()}updateMotor(t){if(!this.initialized||this.isMuted||!this.ctx)return;let e=45+t*120,i=t>.05?Math.min(.08,t*.08):1e-4;this.motorOsc.frequency.setTargetAtTime(e,this.ctx.currentTime,.05),this.motorGain.gain.setTargetAtTime(i,this.ctx.currentTime,.05)}playFootstep(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(140,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(30,this.ctx.currentTime+.06),e.gain.setValueAtTime(.04,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.06),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.07)}playScan(){if(!this.initialized||this.isMuted||!this.ctx)return;[523.25,659.25,783.99,1046.5].forEach((e,i)=>{let n=this.ctx.createOscillator(),r=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(e,this.ctx.currentTime+i*.08),r.gain.setValueAtTime(.08,this.ctx.currentTime+i*.08),r.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+i*.08+.3),n.connect(r),r.connect(this.ctx.destination),n.start(this.ctx.currentTime+i*.08),n.stop(this.ctx.currentTime+i*.08+.35)})}playAlert(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="square",t.frequency.setValueAtTime(880,this.ctx.currentTime),t.frequency.setValueAtTime(440,this.ctx.currentTime+.08),e.gain.setValueAtTime(.05,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.18),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.2)}playTractionSlip(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.createOscillator(),e=this.ctx.createGain(),i=this.ctx.createBiquadFilter();t.type="sawtooth",t.frequency.setValueAtTime(110,this.ctx.currentTime),t.frequency.linearRampToValueAtTime(55,this.ctx.currentTime+.22),i.type="bandpass",i.frequency.setValueAtTime(320,this.ctx.currentTime),i.Q.setValueAtTime(4,this.ctx.currentTime),e.gain.setValueAtTime(.06,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.25),t.connect(i),i.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.26)}playVictory(){if(!this.initialized||this.isMuted||!this.ctx)return;[523.25,659.25,783.99,987.77,1046.5,1318.5].forEach((e,i)=>{let n=this.ctx.createOscillator(),r=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(e,this.ctx.currentTime+i*.12),r.gain.setValueAtTime(.12,this.ctx.currentTime+i*.12),r.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+i*.12+.8),n.connect(r),r.connect(this.ctx.destination),n.start(this.ctx.currentTime+i*.12),n.stop(this.ctx.currentTime+i*.12+.9)})}playCollision(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.currentTime,e=this.ctx.createOscillator(),i=this.ctx.createGain(),n=this.ctx.createBiquadFilter();e.type="triangle",e.frequency.setValueAtTime(110,t),e.frequency.exponentialRampToValueAtTime(32,t+.14),n.type="lowpass",n.frequency.setValueAtTime(380,t),n.frequency.exponentialRampToValueAtTime(80,t+.14),i.gain.setValueAtTime(.18,t),i.gain.exponentialRampToValueAtTime(1e-4,t+.15),e.connect(n),n.connect(i),i.connect(this.ctx.destination),e.start(t),e.stop(t+.16);let r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(680,t),r.frequency.exponentialRampToValueAtTime(220,t+.08),a.gain.setValueAtTime(.06,t),a.gain.exponentialRampToValueAtTime(1e-4,t+.08),r.connect(a),a.connect(this.ctx.destination),r.start(t),r.stop(t+.09)}playGaitShift(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.currentTime,e=Math.floor(this.ctx.sampleRate*.18),i=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=i.getChannelData(0);for(let h=0;h<e;h++)n[h]=Math.random()*2-1;let r=this.ctx.createBufferSource();r.buffer=i;let a=this.ctx.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(1400,t),a.frequency.exponentialRampToValueAtTime(320,t+.17),a.Q.setValueAtTime(4,t);let o=this.ctx.createGain();o.gain.setValueAtTime(.09,t),o.gain.exponentialRampToValueAtTime(1e-4,t+.17),r.connect(a),a.connect(o),o.connect(this.ctx.destination),r.start(t);let l=this.ctx.createOscillator(),c=this.ctx.createGain();l.type="square",l.frequency.setValueAtTime(540,t),l.frequency.exponentialRampToValueAtTime(110,t+.06),c.gain.setValueAtTime(.08,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),l.connect(c),c.connect(this.ctx.destination),l.start(t),l.stop(t+.07)}toggleMute(){return this.isMuted=!this.isMuted,this.ctx&&(this.isMuted?this.ctx.suspend():this.ctx.resume()),this.isMuted}};var Eo=class{constructor(t,e=140){this.scene=t,this.maxParticles=e,this.particlePool=[],this.marsGravity=3.72,this.initParticles()}createDustTexture(){let e=document.createElement("canvas");e.width=64,e.height=64;let i=e.getContext("2d"),n=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);n.addColorStop(0,"rgba(255, 255, 255, 0.95)"),n.addColorStop(.35,"rgba(240, 200, 170, 0.65)"),n.addColorStop(.7,"rgba(210, 110, 70, 0.25)"),n.addColorStop(1,"rgba(180, 80, 40, 0.0)"),i.fillStyle=n,i.fillRect(0,0,64,64);let r=new De(e);return r.generateMipmaps=!1,r.minFilter=Se,r}initParticles(){this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.sizes=new Float32Array(this.maxParticles);for(let e=0;e<this.maxParticles;e++)this.positions[e*3+0]=0,this.positions[e*3+1]=-500,this.positions[e*3+2]=0,this.colors[e*3+0]=.85,this.colors[e*3+1]=.42,this.colors[e*3+2]=.22,this.sizes[e]=0,this.particlePool.push({active:!1,x:0,y:-500,z:0,vx:0,vy:0,vz:0,life:0,maxLife:.7,baseSize:.35,r:.85,g:.42,b:.22});this.geometry=new ne,this.geometry.setAttribute("position",new ve(this.positions,3)),this.geometry.setAttribute("color",new ve(this.colors,3)),this.geometry.setAttribute("size",new ve(this.sizes,1));let t=this.createDustTexture();this.material=new Qi({size:1,map:t,transparent:!0,opacity:.85,vertexColors:!0,depthWrite:!1,blending:Di}),this.points=new Mn(this.geometry,this.material),this.points.frustumCulled=!1,this.scene.add(this.points)}emitFootstepPuff(t,e=6){let i=0;for(let n=0;n<this.maxParticles&&i<e;n++){let r=this.particlePool[n];if(!r.active){r.active=!0;let a=Math.random()*Math.PI*2,o=.08+Math.random()*.16;r.x=t.x+Math.cos(a)*o,r.y=t.y+.04,r.z=t.z+Math.sin(a)*o;let l=.35+Math.random()*.75;r.vx=Math.cos(a)*l,r.vy=.55+Math.random()*.85,r.vz=Math.sin(a)*l,r.life=0,r.maxLife=.55+Math.random()*.35,r.baseSize=.45+Math.random()*.35;let c=Math.random();c<.6?(r.r=.85,r.g=.38,r.b=.2):c<.85?(r.r=.95,r.g=.55,r.b=.3):(r.r=.65,r.g=.28,r.b=.16),i++}}}update(t){let e=this.geometry.attributes.position,i=this.geometry.attributes.color,n=!1;for(let r=0;r<this.maxParticles;r++){let a=this.particlePool[r];if(a.active){if(n=!0,a.life+=t,a.life>=a.maxLife){a.active=!1,a.y=-500,this.positions[r*3+1]=-500;continue}let o=a.life/a.maxLife;a.vy-=this.marsGravity*.65*t,a.vx*=.95,a.vz*=.95,a.x+=a.vx*t,a.y+=a.vy*t,a.z+=a.vz*t,this.positions[r*3+0]=a.x,this.positions[r*3+1]=a.y,this.positions[r*3+2]=a.z,this.sizes[r]=a.baseSize*(1+o*2.2);let l=Math.max(0,1-o*o);this.colors[r*3+0]=a.r*l,this.colors[r*3+1]=a.g*l,this.colors[r*3+2]=a.b*l}}n&&(e.needsUpdate=!0,i.needsUpdate=!0,this.geometry.attributes.size&&(this.geometry.attributes.size.needsUpdate=!0))}};var To=class{constructor(t){if(this.canvas=document.getElementById(t),!!this.canvas){this.ctx=this.canvas.getContext("2d"),this.minT=-100,this.maxT=80,this.minLogP=Math.log10(.02),this.maxLogP=Math.log10(200),this.temp=-55,this.pressure=.63,this.isBrine=!1,this.tripleT=.01,this.tripleP=.6116,this.isDragging=!1,this.particles=[];for(let e=0;e<28;e++)this.particles.push({x:Math.random()*40,y:Math.random()*40,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2,baseX:e%6*7+4,baseY:Math.floor(e/6)*8+4});this.animTime=0,this.initCanvasSize(),this.bindEvents()}}initCanvasSize(){let t=Math.min(window.devicePixelRatio||1,2),e=this.canvas.getBoundingClientRect(),i=e.width||560,n=e.height||250;this.canvas.width=Math.round(i*t),this.canvas.height=Math.round(n*t),this.ctx.setTransform(t,0,0,t,0,0),this.width=i,this.height=n,this.padLeft=65,this.padRight=25,this.padTop=25,this.padBottom=42,this.plotW=this.width-this.padLeft-this.padRight,this.plotH=this.height-this.padTop-this.padBottom}tToX(t){return this.padLeft+(t-this.minT)/(this.maxT-this.minT)*this.plotW}pToY(t){let i=(Math.log10(Math.max(.01,t))-this.minLogP)/(this.maxLogP-this.minLogP);return this.padTop+(1-i)*this.plotH}xToT(t){let e=(t-this.padLeft)/this.plotW;return this.minT+Math.max(0,Math.min(1,e))*(this.maxT-this.minT)}yToP(t){let e=1-(t-this.padTop)/this.plotH,i=Math.max(0,Math.min(1,e)),n=this.minLogP+i*(this.maxLogP-this.minLogP);return Math.pow(10,n)}getSublimationP(t){if(t>this.tripleT)return this.tripleP;let e=t+273.15;return this.tripleP*Math.exp(6108.6*(1/273.16-1/e))}getBoilingP(t){return t<this.tripleT?this.tripleP:.61078*Math.exp(17.27*t/(t+237.3))}getBoilingT(t){if(t<=this.tripleP)return this.tripleT;let e=Math.log(t/.61078);return 237.3*e/(17.27-e)}evaluateState(){let t=this.temp,e=this.pressure,i=this.isBrine?-68:0;if(e<(this.isBrine?.15:this.tripleP)){let n=this.getSublimationP(t);return e>=n?{phase:"ice",name:"\u2744\uFE0F \u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C (Solid Ice Ih)",status:"\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E09\u0E31\u0E1A\u0E1E\u0E25\u0E31\u0E19\u0E2B\u0E32\u0E01\u0E2D\u0E38\u0E13\u0E2B\u0E20\u0E39\u0E21\u0E34\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 (Sublimation Risk)",color:"#38bdf8"}:{phase:"gas",name:"\u{1F4A8} \u0E44\u0E2D\u0E19\u0E49\u0E33 / \u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E09\u0E31\u0E1A\u0E1E\u0E25\u0E31\u0E19 (Sublimed Vapor)",status:"\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E01\u0E25\u0E32\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E2D\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E39\u0E48\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E17\u0E31\u0E19\u0E17\u0E35",color:"#f97316"}}else{if(t<i)return{phase:"ice",name:this.isBrine?"\u2744\uFE0F \u0E19\u0E49\u0E33\u0E40\u0E01\u0E25\u0E37\u0E2D\u0E40\u0E22\u0E37\u0E2D\u0E01\u0E41\u0E02\u0E47\u0E07 (Frozen Eutectic Salt)":"\u2744\uFE0F \u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C (Solid Ice Ih)",status:"\u0E1C\u0E25\u0E36\u0E01\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E04\u0E07\u0E15\u0E31\u0E27 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E2B\u0E25\u0E2D\u0E21\u0E40\u0E2B\u0E25\u0E27",color:"#38bdf8"};{let n=this.getBoilingT(e);return t<=n?{phase:"liquid",name:this.isBrine?"\u{1F4A7} \u0E19\u0E49\u0E33\u0E40\u0E01\u0E25\u0E37\u0E2D\u0E40\u0E1E\u0E2D\u0E23\u0E4C\u0E04\u0E25\u0E2D\u0E40\u0E23\u0E15\u0E04\u0E07\u0E15\u0E31\u0E27 (Stable Brine)":"\u{1F4A7} \u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E04\u0E07\u0E15\u0E31\u0E27 (Stable Liquid Water)",status:this.isBrine?"\u0E40\u0E01\u0E25\u0E37\u0E2D\u0E25\u0E14\u0E08\u0E38\u0E14\u0E40\u0E22\u0E37\u0E2D\u0E01\u0E41\u0E02\u0E47\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D -68\xB0C \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E04\u0E07\u0E23\u0E39\u0E1B\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E44\u0E14\u0E49\u0E41\u0E21\u0E49\u0E43\u0E19\u0E2D\u0E32\u0E01\u0E32\u0E28\u0E2B\u0E19\u0E32\u0E27\u0E08\u0E31\u0E14\u0E02\u0E2D\u0E07\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23!":"\u0E2A\u0E20\u0E32\u0E27\u0E30\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E44\u0E2B\u0E25\u0E41\u0E25\u0E30\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E40\u0E04\u0E21\u0E35\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C \u0E40\u0E01\u0E34\u0E14\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27 (Phyllosilicates)",color:"#10b981"}:{phase:"gas",name:"\u{1F4A8} \u0E44\u0E2D\u0E19\u0E49\u0E33\u0E40\u0E14\u0E37\u0E2D\u0E14\u0E1E\u0E25\u0E48\u0E32\u0E19 (Boiling Vapor)",status:`\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E15\u0E48\u0E33\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E19\u0E49\u0E33\u0E40\u0E14\u0E37\u0E2D\u0E14\u0E17\u0E35\u0E48\u0E2D\u0E38\u0E13\u0E2B\u0E20\u0E39\u0E21\u0E34\u0E40\u0E1E\u0E35\u0E22\u0E07 ${n.toFixed(1)}\xB0C`,color:"#f43f5e"}}}}setState(t,e,i=null){this.temp=Math.max(this.minT,Math.min(this.maxT,t)),this.pressure=Math.max(.02,Math.min(200,e)),i!==null&&(this.isBrine=i),this.syncUI(),this.render()}syncUI(){let t=document.getElementById("atmo-slider-temp"),e=document.getElementById("atmo-slider-press"),i=document.getElementById("atmo-val-temp"),n=document.getElementById("atmo-val-press"),r=document.getElementById("atmo-phase-state"),a=document.getElementById("atmo-phase-desc"),o=document.getElementById("atmo-toggle-brine");if(t&&(t.value=this.temp),e){let c=Math.log10(this.pressure);e.value=(c-this.minLogP)/(this.maxLogP-this.minLogP)*100}i&&(i.textContent=`${this.temp.toFixed(1)}\xB0C`),n&&(n.textContent=`${this.pressure.toFixed(2)} kPa (${(this.pressure*10).toFixed(1)} mbar)`);let l=this.evaluateState();r&&(r.textContent=l.name,r.style.color=l.color,r.style.borderColor=l.color),a&&(a.innerHTML=`<strong>\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22\u0E17\u0E32\u0E07\u0E2D\u0E38\u0E13\u0E2B\u0E1E\u0E25\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C:</strong> ${l.status}`),o&&(o.checked=this.isBrine)}bindEvents(){window.addEventListener("resize",()=>{this.initCanvasSize(),this.render()});let t=c=>{let h=this.canvas.getBoundingClientRect(),f=c.touches?c.touches[0].clientX:c.clientX,u=c.touches?c.touches[0].clientY:c.clientY,d=f-h.left,g=u-h.top;d>=this.padLeft&&d<=this.width-this.padRight&&g>=this.padTop&&g<=this.height-this.padBottom&&(this.temp=Math.round(this.xToT(d)*10)/10,this.pressure=Math.round(this.yToP(g)*100)/100,this.syncUI(),this.render())};this.canvas.addEventListener("mousedown",c=>{this.isDragging=!0,t(c)}),window.addEventListener("mousemove",c=>{this.isDragging&&t(c)}),window.addEventListener("mouseup",()=>{this.isDragging=!1}),this.canvas.addEventListener("touchstart",c=>{this.isDragging=!0,t(c)},{passive:!0}),window.addEventListener("touchmove",c=>{this.isDragging&&t(c)},{passive:!0}),window.addEventListener("touchend",()=>{this.isDragging=!1});let e=document.getElementById("atmo-slider-temp");e&&e.addEventListener("input",c=>{this.temp=parseFloat(c.target.value),this.syncUI(),this.render()});let i=document.getElementById("atmo-slider-press");i&&i.addEventListener("input",c=>{let h=parseFloat(c.target.value)/100,f=this.minLogP+h*(this.maxLogP-this.minLogP);this.pressure=Math.pow(10,f),this.syncUI(),this.render()});let n=document.getElementById("btn-preset-current");n&&n.addEventListener("click",()=>this.setState(-55,.63,!1));let r=document.getElementById("btn-preset-triple");r&&r.addEventListener("click",()=>this.setState(.01,.6116,!1));let a=document.getElementById("btn-preset-noachian");a&&a.addEventListener("click",()=>this.setState(15,120,!1));let o=document.getElementById("btn-preset-brine");o&&o.addEventListener("click",()=>this.setState(-35,.85,!0));let l=document.getElementById("atmo-toggle-brine");l&&l.addEventListener("change",c=>{this.isBrine=c.target.checked,this.syncUI(),this.render()})}render(){if(!this.ctx)return;let t=this.ctx,e=this.width,i=this.height;t.clearRect(0,0,e,i),t.fillStyle="#0b1120",t.fillRect(0,0,e,i),t.fillStyle="#0f172a",t.fillRect(this.padLeft,this.padTop,this.plotW,this.plotH);let n=this.isBrine?-68:.01,r=this.tToX(n),a=this.padTop,o=this.tToX(this.tripleT),l=this.pToY(this.tripleP);t.save(),t.beginPath(),t.moveTo(r,a),t.lineTo(this.tToX(this.maxT),a);for(let M=this.maxT;M>=this.tripleT;M-=2){let b=this.getBoilingP(M);b<=200&&t.lineTo(this.tToX(M),this.pToY(b))}t.lineTo(o,l),this.isBrine&&t.lineTo(this.tToX(-68),this.pToY(.15)),t.lineTo(r,a),t.closePath(),t.fillStyle=this.isBrine?"rgba(16, 185, 129, 0.28)":"rgba(16, 185, 129, 0.18)",t.fill(),t.beginPath(),t.moveTo(this.padLeft,a),t.lineTo(r,a),t.lineTo(o,l);for(let M=this.tripleT;M>=this.minT;M-=2){let b=this.getSublimationP(M);t.lineTo(this.tToX(M),this.pToY(b))}t.lineTo(this.padLeft,this.padTop+this.plotH),t.closePath(),t.fillStyle="rgba(56, 189, 248, 0.14)",t.fill(),t.beginPath(),t.moveTo(this.tToX(this.maxT),this.padTop+this.plotH),t.lineTo(this.padLeft,this.padTop+this.plotH);for(let M=this.minT;M<=this.tripleT;M+=2){let b=this.getSublimationP(M);t.lineTo(this.tToX(M),this.pToY(b))}for(let M=this.tripleT;M<=this.maxT;M+=2){let b=this.getBoilingP(M);b<=200&&t.lineTo(this.tToX(M),this.pToY(b))}t.lineTo(this.tToX(this.maxT),this.padTop+this.plotH),t.closePath(),t.fillStyle="rgba(249, 115, 22, 0.12)",t.fill(),t.restore(),t.strokeStyle="rgba(255, 255, 255, 0.08)",t.lineWidth=1;let c=[{val:.1,label:"0.1"},{val:.63,label:"0.63 (Chryse)"},{val:1,label:"1.0"},{val:10,label:"10"},{val:101.3,label:"101.3 (\u0E42\u0E25\u0E01 1 atm)"}];t.fillStyle="#94a3b8",t.font="10px monospace",t.textAlign="right",t.textBaseline="middle",c.forEach(M=>{let b=this.pToY(M.val);b>=this.padTop&&b<=this.padTop+this.plotH&&(t.beginPath(),t.moveTo(this.padLeft,b),t.lineTo(this.padLeft+this.plotW,b),t.stroke(),t.fillStyle=M.val===.63?"#f97316":M.val===101.3?"#4ade80":"#64748b",t.fillText(M.label,this.padLeft-6,b))});let h=[{val:-80,label:"-80\xB0"},{val:-55,label:"-55\xB0 (Chryse)"},{val:0,label:"0\xB0"},{val:20,label:"20\xB0"},{val:60,label:"60\xB0"}];t.textAlign="center",t.textBaseline="top",h.forEach(M=>{let b=this.tToX(M.val);b>=this.padLeft&&b<=this.padLeft+this.plotW&&(t.beginPath(),t.moveTo(b,this.padTop),t.lineTo(b,this.padTop+this.plotH),t.stroke(),t.fillStyle=M.val===-55?"#f97316":M.val===0?"#fde047":"#64748b",t.fillText(M.label,b,this.padTop+this.plotH+6))}),t.lineWidth=2,t.strokeStyle="#38bdf8",t.beginPath();for(let M=this.minT;M<=this.tripleT;M+=1){let b=this.getSublimationP(M),v=this.tToX(M),T=this.pToY(b);M===this.minT?t.moveTo(v,T):t.lineTo(v,T)}t.stroke(),t.strokeStyle="#10b981",t.beginPath(),t.moveTo(o,l);for(let M=this.tripleT;M<=this.maxT;M+=1){let b=this.getBoilingP(M);b<=200&&t.lineTo(this.tToX(M),this.pToY(b))}t.stroke(),t.strokeStyle="#60a5fa",t.beginPath(),t.moveTo(o,l),t.lineTo(r,a),t.stroke(),this.isBrine&&(t.save(),t.setLineDash([4,4]),t.strokeStyle="#a855f7",t.lineWidth=1.5,t.beginPath(),t.moveTo(this.tToX(-68),a),t.lineTo(this.tToX(-68),this.pToY(.15)),t.lineTo(o,l),t.stroke(),t.restore()),t.font="bold 12px sans-serif",t.fillStyle="rgba(56, 189, 248, 0.45)",t.fillText("\u0E02\u0E2D\u0E07\u0E41\u0E02\u0E47\u0E07 (ICE Ih)",this.tToX(-60),this.pToY(20)),t.fillStyle="rgba(16, 185, 129, 0.55)",t.fillText("\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27 (LIQUID)",this.tToX(22),this.pToY(25)),t.fillStyle="rgba(249, 115, 22, 0.45)",t.fillText("\u0E44\u0E2D\u0E19\u0E49\u0E33 / \u0E01\u0E4A\u0E32\u0E0B (VAPOR)",this.tToX(30),this.pToY(.12)),t.fillStyle="#fde047",t.beginPath(),t.arc(o,l,5,0,Math.PI*2),t.fill(),t.fillStyle="#fef08a",t.font="bold 10px monospace",t.textAlign="left",t.fillText("\u2605 \u0E08\u0E38\u0E14\u0E23\u0E48\u0E27\u0E21\u0E2A\u0E32\u0E21 (0.01\xB0C, 0.61 kPa)",o+7,l-6);let f=this.tToX(20),u=this.pToY(101.3);t.fillStyle="#4ade80",t.beginPath(),t.arc(f,u,4,0,Math.PI*2),t.fill(),t.fillText("\u{1F30D} \u0E42\u0E25\u0E01 (20\xB0C, 1 atm)",f+6,u+2);let d=this.tToX(-55),g=this.pToY(.63);t.fillStyle="#f97316",t.beginPath(),t.arc(d,g,4,0,Math.PI*2),t.fill(),t.fillText("\u{1FA90} Chryse (-55\xB0C, 0.63 kPa)",d+6,g+2);let _=this.tToX(this.temp),m=this.pToY(this.pressure);t.save(),t.setLineDash([2,3]),t.strokeStyle="rgba(255, 255, 255, 0.5)",t.lineWidth=1,t.beginPath(),t.moveTo(_,this.padTop),t.lineTo(_,this.padTop+this.plotH),t.moveTo(this.padLeft,m),t.lineTo(this.padLeft+this.plotW,m),t.stroke(),t.restore();let p=this.evaluateState();t.strokeStyle=p.color,t.lineWidth=2.5,t.beginPath(),t.arc(_,m,8,0,Math.PI*2),t.stroke(),t.fillStyle="#ffffff",t.beginPath(),t.arc(_,m,3,0,Math.PI*2),t.fill(),t.fillStyle="#cbd5e1",t.font="bold 11px sans-serif",t.textAlign="center",t.fillText("\u0E2D\u0E38\u0E13\u0E2B\u0E20\u0E39\u0E21\u0E34 Temperature (\xB0C)",this.padLeft+this.plotW/2,i-8),t.save(),t.translate(14,this.padTop+this.plotH/2),t.rotate(-Math.PI/2),t.fillText("\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19 Pressure (kPa, log)",0,0),t.restore()}};var wo=class{constructor(t){this.scene=t,this.visible=!0,this.maxVertices=8,this.geom=new ne,this.posArray=new Float32Array(this.maxVertices*3*3),this.posAttr=new ve(this.posArray,3),this.geom.setAttribute("position",this.posAttr),this.meshMat=new ke({color:3718648,transparent:!0,opacity:.22,depthWrite:!1,side:He}),this.mesh=new st(this.geom,this.meshMat),this.mesh.renderOrder=2,this.scene.add(this.mesh),this.lineGeom=new ne,this.linePosArray=new Float32Array((this.maxVertices+1)*3),this.linePosAttr=new ve(this.linePosArray,3),this.lineGeom.setAttribute("position",this.linePosAttr),this.lineMat=new ji({color:3718648,transparent:!0,opacity:.85,linewidth:2}),this.line=new vn(this.lineGeom,this.lineMat),this.line.renderOrder=3,this.scene.add(this.line);let e=new kt(.12,.12,.04,16);this.comMat=new ke({color:16638023,transparent:!0,opacity:.9}),this.comMesh=new st(e,this.comMat),this.comMesh.renderOrder=4,this.scene.add(this.comMesh);let i=new ne;i.setAttribute("position",new Gt([0,0,0,0,1.2,0],3)),this.plumbLine=new vn(i,new ji({color:16638023,transparent:!0,opacity:.6})),this.scene.add(this.plumbLine),this.stats={area:0,stabilityMargin:0,contactCount:0}}setVisible(t){this.visible=t,this.mesh.visible=t,this.line.visible=t,this.comMesh.visible=t,this.plumbLine.visible=t}toggleVisible(){return this.setVisible(!this.visible),this.visible}distPointToSegment(t,e,i,n,r,a){let o=r-i,l=a-n,c=o*o+l*l;if(c<1e-4)return Math.hypot(t-i,e-n);let h=((t-i)*o+(e-n)*l)/c;h=Math.max(0,Math.min(1,h));let f=i+h*o,u=n+h*l;return Math.hypot(t-f,e-u)}update(t,e,i="tripod",n=0){if(!this.visible||!t||t.length<3)return this.mesh.visible=!1,this.line.visible=!1,this.comMesh.visible=!1,this.plumbLine.visible=!1,this.stats;this.mesh.visible=!0,this.line.visible=!0,this.comMesh.visible=!0,this.plumbLine.visible=!0;let r=0,a=0;t.forEach(m=>{r+=m.x,a+=m.z}),r/=t.length,a/=t.length;let o=[...t].sort((m,p)=>{let M=Math.atan2(m.z-a,m.x-r),b=Math.atan2(p.z-a,p.x-r);return M-b}),l=o.length,c=999,h=0;for(let m=0;m<l;m++){let p=o[m],M=o[(m+1)%l],b=this.distPointToSegment(e.x,e.z,p.x,p.z,M.x,M.z);b<c&&(c=b),h+=p.x*M.z-M.x*p.z}h=Math.abs(h)*.5;let f=3718648,u=8246268;i==="wave"&&(f=16096779,u=16638023),(c<.28||n>22)&&(f=16007006,u=16281969),this.meshMat.color.setHex(f),this.lineMat.color.setHex(u);let d=.035,g=0;for(let m=0;m<l;m++){let p=o[m],M=o[(m+1)%l];this.posArray[g++]=r,this.posArray[g++]=e.y+d,this.posArray[g++]=a,this.posArray[g++]=p.x,this.posArray[g++]=p.y+d,this.posArray[g++]=p.z,this.posArray[g++]=M.x,this.posArray[g++]=M.y+d,this.posArray[g++]=M.z}this.geom.setDrawRange(0,l*3),this.posAttr.needsUpdate=!0;let _=0;for(let m=0;m<=l;m++){let p=o[m%l];this.linePosArray[_++]=p.x,this.linePosArray[_++]=p.y+d+.005,this.linePosArray[_++]=p.z}return this.lineGeom.setDrawRange(0,l+1),this.linePosAttr.needsUpdate=!0,this.comMesh.position.set(e.x,e.y+d+.01,e.z),this.plumbLine.position.set(e.x,e.y+d,e.z),this.stats={area:h,stabilityMargin:c,contactCount:l},this.stats}};var Ao=class{constructor(){this.activeTab="telemetry",this.canvas=document.getElementById("ik-lab-canvas"),this.ctx=this.canvas?this.canvas.getContext("2d"):null,this.L1=.45,this.L2=.92,this.L3=1.22,this.maxReach=(this.L2+this.L3)*.98,this.minReach=Math.abs(this.L2-this.L3)*1.05,this.testR=1.95,this.testZ=-1.15,this.initUI(),this.resizeCanvas(),this.renderIKCanvas()}initUI(){document.querySelectorAll(".kinematics-tab-btn").forEach(o=>{o.addEventListener("click",l=>{let c=l.currentTarget.getAttribute("data-tab");this.switchTab(c)})});let e=document.getElementById("ik-slider-r"),i=document.getElementById("ik-slider-z"),n=document.getElementById("ik-val-r"),r=document.getElementById("ik-val-z");e&&e.addEventListener("input",o=>{this.testR=parseFloat(o.target.value),n&&(n.textContent=`${this.testR.toFixed(2)} m`),this.renderIKCanvas()}),i&&i.addEventListener("input",o=>{this.testZ=parseFloat(o.target.value),r&&(r.textContent=`${this.testZ.toFixed(2)} m`),this.renderIKCanvas()}),document.querySelectorAll(".ik-preset-btn").forEach(o=>{o.addEventListener("click",l=>{let c=parseFloat(l.currentTarget.getAttribute("data-r")),h=parseFloat(l.currentTarget.getAttribute("data-z"));this.setPose(c,h)})}),window.addEventListener("resize",()=>{this.activeTab==="ik-lab"&&(this.resizeCanvas(),this.renderIKCanvas())})}switchTab(t){this.activeTab=t,document.querySelectorAll(".kinematics-tab-btn").forEach(n=>{let r=n.getAttribute("data-tab")===t;n.classList.toggle("active",r)}),document.querySelectorAll(".kinematics-tab-pane").forEach(n=>{let r=n.id===`tab-pane-${t}`;n.classList.toggle("hidden",!r)}),t==="ik-lab"&&setTimeout(()=>{this.resizeCanvas(),this.renderIKCanvas()},50)}setPose(t,e){this.testR=t,this.testZ=e;let i=document.getElementById("ik-slider-r"),n=document.getElementById("ik-slider-z"),r=document.getElementById("ik-val-r"),a=document.getElementById("ik-val-z");i&&(i.value=t),n&&(n.value=e),r&&(r.textContent=`${t.toFixed(2)} m`),a&&(a.textContent=`${e.toFixed(2)} m`),this.renderIKCanvas()}resizeCanvas(){if(!this.canvas)return;let t=this.canvas.getBoundingClientRect(),e=window.devicePixelRatio||1,i=Math.max(300,t.width||560),n=300;this.canvas.width=i*e,this.canvas.height=n*e,this.ctx&&this.ctx.setTransform(e,0,0,e,0,0)}solve2DIK(t,e){let i=t-this.L1,n=e,r=Math.hypot(i,n),a=r>this.L2+this.L3||r<Math.abs(this.L2-this.L3),o=Math.max(this.minReach,Math.min(this.maxReach,r)),l=(this.L2*this.L2+this.L3*this.L3-o*o)/(2*this.L2*this.L3),c=Math.max(-1,Math.min(1,l)),h=Math.PI-Math.acos(c),f=Math.atan2(n,i),u=(this.L2*this.L2+o*o-this.L3*this.L3)/(2*this.L2*o),d=Math.max(-1,Math.min(1,u)),g=Math.acos(d);return{femurAngle:f+g,tibiaAngle:-h,D:r,clampedD:o,isSingularity:a,cosTibia:c,cosFemur:d}}renderIKCanvas(){if(!this.ctx||!this.canvas)return;let t=this.ctx,e=this.canvas.width/(window.devicePixelRatio||1),i=this.canvas.height/(window.devicePixelRatio||1);t.clearRect(0,0,e,i),t.fillStyle="#090d16",t.fillRect(0,0,e,i);let n=e*.24,r=i*.42,a=Math.min(e,i)*.36;t.strokeStyle="rgba(56, 189, 248, 0.08)",t.lineWidth=1;for(let A=0;A<e;A+=30)t.beginPath(),t.moveTo(A,0),t.lineTo(A,i),t.stroke();for(let A=0;A<i;A+=30)t.beginPath(),t.moveTo(0,A),t.lineTo(e,A),t.stroke();let o=r-this.testZ*a;t.strokeStyle="rgba(234, 88, 12, 0.5)",t.setLineDash([6,4]),t.beginPath(),t.moveTo(0,o),t.lineTo(e,o),t.stroke(),t.setLineDash([]),t.fillStyle="rgba(234, 88, 12, 0.7)",t.font="10px monospace",t.fillText(`\u0E1E\u0E37\u0E49\u0E19\u0E1C\u0E34\u0E27 Chryse Planitia (z = ${this.testZ.toFixed(2)}m)`,10,o-6);let l=this.solve2DIK(this.testR,this.testZ),c=n-this.L1*a,h=r,f=n,u=r,d=f+Math.cos(l.femurAngle)*this.L2*a,g=u-Math.sin(l.femurAngle)*this.L2*a,_=l.femurAngle+l.tibiaAngle,m=d+Math.cos(_)*this.L3*a,p=g-Math.sin(_)*this.L3*a;t.strokeStyle=l.isSingularity?"rgba(244, 63, 94, 0.6)":"rgba(56, 189, 248, 0.25)",t.lineWidth=1.5,t.setLineDash([4,4]),t.beginPath(),t.arc(f,u,(this.L2+this.L3)*a,-Math.PI*.5,Math.PI*.5),t.stroke(),t.setLineDash([]),t.strokeStyle="#64748b",t.lineWidth=8,t.lineCap="round",t.beginPath(),t.moveTo(c,h),t.lineTo(f,u),t.stroke(),t.strokeStyle=l.isSingularity?"#f43f5e":"#38bdf8",t.lineWidth=7,t.beginPath(),t.moveTo(f,u),t.lineTo(d,g),t.stroke(),t.strokeStyle=l.isSingularity?"#fda4af":"#22c55e",t.lineWidth=5,t.beginPath(),t.moveTo(d,g),t.lineTo(m,p),t.stroke(),t.fillStyle="#475569",t.beginPath(),t.arc(c,h,7,0,Math.PI*2),t.fill(),t.fillStyle="#0284c7",t.beginPath(),t.arc(f,u,8,0,Math.PI*2),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke(),t.fillStyle="#16a34a",t.beginPath(),t.arc(d,g,7,0,Math.PI*2),t.fill(),t.stroke(),t.fillStyle=l.isSingularity?"#f43f5e":"#f59e0b",t.beginPath(),t.arc(m,p,9,0,Math.PI*2),t.fill(),t.stroke(),t.fillStyle="#e2e8f0",t.font="11px sans-serif",t.fillText("Shoulder Hub (0, 0)",f-35,u-14),t.fillText(`Knee \u03B8\u2083=${(l.tibiaAngle*180/Math.PI).toFixed(1)}\xB0`,d+10,g-8),t.fillText(`Foot End-Effector (${this.testR.toFixed(2)}, ${this.testZ.toFixed(2)})m`,m+12,p+4),l.isSingularity&&(t.fillStyle="rgba(244, 63, 94, 0.2)",t.fillRect(e-240,12,228,54),t.strokeStyle="#f43f5e",t.strokeRect(e-240,12,228,54),t.fillStyle="#f43f5e",t.font="bold 12px sans-serif",t.fillText("\u26A0\uFE0F \u0E08\u0E38\u0E14\u0E20\u0E32\u0E27\u0E30\u0E40\u0E2D\u0E01\u0E10\u0E32\u0E19 (SINGULARITY)",e-230,32),t.fillStyle="#fda4af",t.font="10.5px sans-serif",t.fillText(`\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E01\u0E34\u0E19\u0E23\u0E30\u0E22\u0E30\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E21: ${l.D.toFixed(2)}m > ${this.maxReach.toFixed(2)}m`,e-230,50));let M=document.getElementById("ik-math-d"),b=document.getElementById("ik-math-costibia"),v=document.getElementById("ik-math-femur"),T=document.getElementById("ik-math-tibia"),S=document.getElementById("ik-math-status");M&&(M.textContent=`${l.D.toFixed(3)} m`),b&&(b.textContent=l.cosTibia.toFixed(4)),v&&(v.textContent=`${(l.femurAngle*180/Math.PI).toFixed(1)}\xB0`),T&&(T.textContent=`${(l.tibiaAngle*180/Math.PI).toFixed(1)}\xB0`),S&&(l.isSingularity?(S.textContent="\u274C \u0E19\u0E2D\u0E01\u0E02\u0E2D\u0E1A\u0E40\u0E02\u0E15\u0E01\u0E32\u0E23\u0E17\u0E33\u0E07\u0E32\u0E19 (Unreachable Singularity)",S.style.color="#f43f5e"):(S.textContent="\u2713 \u0E21\u0E35\u0E04\u0E33\u0E15\u0E2D\u0E1A\u0E17\u0E32\u0E07\u0E08\u0E25\u0E19\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C (Valid Geometric Solution)",S.style.color="#4ade80"))}updateLiveTelemetry(t){if(this.activeTab!=="telemetry"||!t||t.length<6)return;let e=[{id:"fr",code:"\u0E02\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E02\u0E27\u0E32 (FR)",mount:"+50\xB0"},{id:"mr",code:"\u0E02\u0E32\u0E01\u0E25\u0E32\u0E07\u0E02\u0E27\u0E32 (MR)",mount:"0\xB0"},{id:"rr",code:"\u0E02\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E02\u0E27\u0E32 (RR)",mount:"-50\xB0"},{id:"rl",code:"\u0E02\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E0B\u0E49\u0E32\u0E22 (RL)",mount:"-130\xB0"},{id:"ml",code:"\u0E02\u0E32\u0E01\u0E25\u0E32\u0E07\u0E0B\u0E49\u0E32\u0E22 (ML)",mount:"180\xB0"},{id:"fl",code:"\u0E02\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E0B\u0E49\u0E32\u0E22 (FL)",mount:"+130\xB0"}];t.forEach((i,n)=>{if(!e[n])return;let a=((i.coxaAngle||0)*(180/Math.PI)).toFixed(1),o=((i.femurAngle||0)*(180/Math.PI)).toFixed(1),l=((i.tibiaAngle||0)*(180/Math.PI)).toFixed(1),c=(i.reachDist||1.95).toFixed(2),h=!!i.isGrounded,f=document.getElementById(`leg-telemetry-card-${n}`);if(f){let u=f.querySelector(".leg-stance-badge");u&&(u.textContent=h?"GROUNDED (\u0E04\u0E49\u0E33\u0E1E\u0E37\u0E49\u0E19)":"SWING (\u0E01\u0E49\u0E32\u0E27\u0E25\u0E2D\u0E22)",u.className=`leg-stance-badge ${h?"badge-grounded":"badge-swing"}`);let d=f.querySelector(".leg-val-coxa"),g=f.querySelector(".leg-val-femur"),_=f.querySelector(".leg-val-tibia"),m=f.querySelector(".leg-val-reach"),p=f.querySelector(".leg-reach-bar");if(d&&(d.textContent=`${a>0?"+":""}${a}\xB0`),g&&(g.textContent=`${o>0?"+":""}${o}\xB0`),_&&(_.textContent=`${l>0?"+":""}${l}\xB0`),m&&(m.textContent=`${c}m / 2.14m`),p){let M=Math.min(100,Math.round(parseFloat(c)/2.14*100));p.style.width=`${M}%`,p.style.backgroundColor=M>92?"#f43f5e":"#38bdf8"}}})}};var Co=class{constructor(t,e){this.terrain=t,this.hexapod=e,this.datumLat=22.45,this.datumLon=-49.97,this.metersToDegLat=169e-7,this.metersToDegLon=183e-7,this.size=260,this.halfSize=130,this.activeLayer="dem",this.activeTransect="crater",this.customPointA=null,this.customPointB=null,this.roverPath=[],this.lastRecordedPos=null,this.modal=document.getElementById("orbital-gis-modal"),this.canvas=document.getElementById("orbital-gis-canvas"),this.ctx=this.canvas?this.canvas.getContext("2d"):null,this.transectCanvas=document.getElementById("gis-transect-canvas"),this.transectCtx=this.transectCanvas?this.transectCanvas.getContext("2d"):null,this.rasterCaches={},this.rasterRes=260,this.initUI(),this.generateRasterCaches(),this.resizeCanvases()}localToMarsCoords(t,e){let i=this.datumLat-e*this.metersToDegLat,n=this.datumLon+t*this.metersToDegLon;return{lat:i.toFixed(5),lon:n.toFixed(5),latStr:`${Math.abs(i).toFixed(4)}\xB0 ${i>=0?"N":"S"}`,lonStr:`${Math.abs(n).toFixed(4)}\xB0 ${n>=0?"E":"W"}`}}worldToCanvas(t,e,i,n){let r=(t+this.halfSize)/this.size,a=(e+this.halfSize)/this.size;return{x:r*i,y:a*n}}canvasToWorld(t,e,i,n){let r=t/i,a=e/n;return{x:r*this.size-this.halfSize,z:a*this.size-this.halfSize}}generateRasterCaches(){let t=["ortho","dem","slope","paleochannel","crism"],e=this.rasterRes,i={x:-.55,y:.65,z:-.52},n=Math.hypot(i.x,i.y,i.z);i.x/=n,i.y/=n,i.z/=n,t.forEach(r=>{let a=document.createElement("canvas");a.width=e,a.height=e;let o=a.getContext("2d"),l=o.createImageData(e,e),c=l.data;for(let h=0;h<e;h++)for(let f=0;f<e;f++){let u=-this.halfSize+f/(e-1)*this.size,d=-this.halfSize+h/(e-1)*this.size,g=this.terrain.getHeight(u,d),_=.5,m=this.terrain.getHeight(u-_,d),p=this.terrain.getHeight(u+_,d),M=this.terrain.getHeight(u,d-_),b=this.terrain.getHeight(u,d+_),v=(m-p)/(2*_),T=1,S=(M-b)/(2*_),A=Math.hypot(v,T,S),x=v/A,w=T/A,P=S/A,I=Math.acos(Math.max(0,Math.min(1,w)))*(180/Math.PI),L=Math.max(.2,Math.min(1,x*i.x+w*i.y+P*i.z)),W=(h*e+f)*4,k=0,D=0,F=0;if(r==="dem"){let U=Math.max(0,Math.min(1,(g+2.5)/7));if(U<.25){let V=U/.25;k=30+V*20,D=58+V*130,F=138+V*74}else if(U<.55){let V=(U-.25)/.3;k=50+V*80,D=188-V*20,F=212-V*140}else if(U<.8){let V=(U-.55)/.25;k=234+V*15,D=179-V*90,F=8+V*4}else{let V=(U-.8)/.2;k=239+V*16,D=68+V*170,F=68+V*170}k=Math.round(k*(.55+L*.45)),D=Math.round(D*(.55+L*.45)),F=Math.round(F*(.55+L*.45))}else if(r==="ortho"){let U=Math.sin(u*.4)*Math.cos(d*.4)*12,V=212+U,J=101+U*.5,et=59+U*.3;k=Math.round(V*(.45+L*.55)),D=Math.round(J*(.45+L*.55)),F=Math.round(et*(.45+L*.55))}else if(r==="slope"){if(I<10)k=34,D=197,F=94;else if(I<18){let U=(I-10)/8;k=234,D=179-U*40,F=8}else{let U=Math.min(1,(I-18)/12);k=239,D=Math.round(68-U*40),F=Math.round(68-U*40)}k=Math.round(k*(.6+L*.4)),D=Math.round(D*(.6+L*.4)),F=Math.round(F*(.6+L*.4))}else if(r==="paleochannel"){let U=Math.hypot(u- -28,d-32),V=Math.hypot(u-38,d-36);if(U<22||V<24||d>15&&d<55&&Math.abs(u-5)<38){let et=Math.sin(u*.6+d*.4)>.3?240:180;k=14,D=165,F=et}else k=Math.round(140*L),D=Math.round(65*L),F=Math.round(40*L)}else if(r==="crism"){let U=Math.hypot(u- -28,d-32),V=Math.hypot(u-38,d-36),J=Math.hypot(u- -42,d- -45),et=Math.hypot(u-36,d- -55);V<16?(k=168,D=85,F=247):U<16?(k=56,D=189,F=248):J<16?(k=34,D=197,F=94):et<16?(k=245,D=158,F=11):(k=Math.round(75*L),D=Math.round(45*L),F=Math.round(35*L))}c[W]=k,c[W+1]=D,c[W+2]=F,c[W+3]=255}o.putImageData(l,0,0),this.rasterCaches[r]=a})}initUI(){document.querySelectorAll(".gis-layer-btn").forEach(a=>{a.addEventListener("click",o=>{let l=o.currentTarget.getAttribute("data-layer");this.setLayer(l)})}),document.querySelectorAll(".gis-transect-preset-btn").forEach(a=>{a.addEventListener("click",o=>{let l=o.currentTarget.getAttribute("data-transect");this.setTransect(l)})});let i=document.getElementById("btn-export-geojson");i&&i.addEventListener("click",()=>this.exportMissionGeoJSON());let n=document.getElementById("btn-toggle-gis");n&&n.addEventListener("click",()=>this.toggleModal());let r=document.getElementById("btn-orbital-gis");r&&r.addEventListener("click",()=>this.toggleModal()),this.canvas&&(this.canvas.addEventListener("click",a=>{let o=this.canvas.getBoundingClientRect(),l=window.devicePixelRatio||1,c=a.clientX-o.left,h=a.clientY-o.top,f=this.canvasToWorld(c,h,o.width,o.height);!this.customPointA||this.customPointA&&this.customPointB?(this.customPointA=f,this.customPointB=null):(this.customPointB=f,this.activeTransect="custom",this.updateTransectButtons()),this.renderMap(),this.renderTransectGraph()}),this.canvas.addEventListener("mousemove",a=>{let o=this.canvas.getBoundingClientRect(),l=a.clientX-o.left,c=a.clientY-o.top,h=this.canvasToWorld(l,c,o.width,o.height),f=this.terrain.getHeight(h.x,h.z),u=this.terrain.getNormal(h.x,h.z),d=Math.acos(Math.max(0,Math.min(1,u.y)))*(180/Math.PI),g=this.localToMarsCoords(h.x,h.z),_=document.getElementById("gis-cursor-readout");_&&(_.innerHTML=`
            <strong>\u0E1E\u0E34\u0E01\u0E31\u0E14\u0E14\u0E32\u0E27\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C:</strong> ${g.latStr}, ${g.lonStr} &nbsp;|&nbsp; 
            <strong>\u0E1E\u0E34\u0E01\u0E31\u0E14\u0E17\u0E49\u0E2D\u0E07\u0E16\u0E34\u0E48\u0E19:</strong> (${h.x.toFixed(1)}m, ${h.z.toFixed(1)}m) &nbsp;|&nbsp; 
            <strong>\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E2A\u0E39\u0E07:</strong> ${f>=0?"+":""}${f.toFixed(2)}m &nbsp;|&nbsp; 
            <strong>\u0E04\u0E27\u0E32\u0E21\u0E25\u0E32\u0E14\u0E0A\u0E31\u0E19:</strong> <span style="color:${d>18?"#f43f5e":d>10?"#fde047":"#4ade80"}">${d.toFixed(1)}\xB0 (${d>18?"\u0E2D\u0E31\u0E19\u0E15\u0E23\u0E32\u0E22":d>10?"\u0E0A\u0E31\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22"})</span>
          `)})),window.addEventListener("resize",()=>{this.isModalOpen&&(this.resizeCanvases(),this.renderMap(),this.renderTransectGraph())})}setLayer(t){this.activeLayer=t,document.querySelectorAll(".gis-layer-btn").forEach(r=>{r.classList.toggle("active",r.getAttribute("data-layer")===t)});let i=document.getElementById("gis-layer-legend-desc"),n=document.getElementById("gis-legend-colorbar");i&&n&&(t==="dem"?(i.innerHTML="<strong>DEM Hypsometric Tint:</strong> \u0E41\u0E23\u0E40\u0E07\u0E32\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E2A\u0E39\u0E07\u0E15\u0E48\u0E33 (-2.5m \u0E19\u0E49\u0E33\u0E40\u0E07\u0E34\u0E19 \u2794 +0.0m \u0E40\u0E02\u0E35\u0E22\u0E27/\u0E2A\u0E49\u0E21 \u2794 +4.5m \u0E41\u0E14\u0E07/\u0E02\u0E32\u0E27)",n.style.background="linear-gradient(to right, #1e3a8a, #06b6d4, #84cc16, #f59e0b, #ea580c, #dc2626, #ffffff)"):t==="slope"?(i.innerHTML="<strong>Slope Hazard Heatmap:</strong> \u0E41\u0E1C\u0E19\u0E17\u0E35\u0E48\u0E04\u0E27\u0E32\u0E21\u0E25\u0E32\u0E14\u0E0A\u0E31\u0E19 (&lt;10\xB0 \u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22, 10\xB0-18\xB0 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E25\u0E37\u0E48\u0E19\u0E44\u0E16\u0E25 Tripod Slip, &gt;18\xB0 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E1E\u0E25\u0E34\u0E01\u0E04\u0E27\u0E48\u0E33)",n.style.background="linear-gradient(to right, #22c55e, #eab308, #ef4444)"):t==="paleochannel"?(i.innerHTML="<strong>Paleochannel Hydrology:</strong> \u0E23\u0E48\u0E2D\u0E07\u0E19\u0E49\u0E33\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E22\u0E38\u0E04 Noachian/Hesperian \u0E41\u0E25\u0E30\u0E41\u0E2D\u0E48\u0E07\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E19\u0E49\u0E33\u0E02\u0E31\u0E07",n.style.background="linear-gradient(to right, #1e293b, #0ea5e9, #38bdf8)"):t==="crism"?(i.innerHTML="<strong>CRISM Mineral Indices:</strong> \u0E2A\u0E40\u0E1B\u0E01\u0E15\u0E23\u0E31\u0E21\u0E01\u0E32\u0E23\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E19\u0E49\u0E33\u0E43\u0E19\u0E41\u0E23\u0E48 (\u0E21\u0E48\u0E27\u0E07: \u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27, \u0E1F\u0E49\u0E32: \u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15, \u0E40\u0E02\u0E35\u0E22\u0E27: \u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19)",n.style.background="linear-gradient(to right, #38bdf8, #a855f7, #22c55e, #f59e0b)"):(i.innerHTML="<strong>HiRISE True-Color:</strong> \u0E20\u0E32\u0E1E\u0E16\u0E48\u0E32\u0E22\u0E1E\u0E37\u0E49\u0E19\u0E1C\u0E34\u0E27\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E2A\u0E35\u0E08\u0E23\u0E34\u0E07 (Terracotta Sand & Basalt)",n.style.background="linear-gradient(to right, #7c2d12, #c2410c, #ea580c, #fed7aa)")),this.renderMap()}setTransect(t){this.activeTransect=t,this.updateTransectButtons(),this.renderMap(),this.renderTransectGraph()}updateTransectButtons(){document.querySelectorAll(".gis-transect-preset-btn").forEach(e=>{e.classList.toggle("active",e.getAttribute("data-transect")===this.activeTransect)})}toggleModal(){this.modal&&(this.isModalOpen=this.modal.classList.contains("hidden"),this.modal.classList.toggle("hidden"),this.isModalOpen&&setTimeout(()=>{this.resizeCanvases(),this.renderMap(),this.renderTransectGraph()},50))}resizeCanvases(){let t=window.devicePixelRatio||1;if(this.canvas){let e=this.canvas.getBoundingClientRect(),i=Math.max(320,e.width||560),n=Math.max(300,e.height||420);this.canvas.width=i*t,this.canvas.height=n*t,this.ctx&&this.ctx.setTransform(t,0,0,t,0,0)}if(this.transectCanvas){let e=this.transectCanvas.getBoundingClientRect(),i=Math.max(320,e.width||560),n=180;this.transectCanvas.width=i*t,this.transectCanvas.height=n*t,this.transectCtx&&this.transectCtx.setTransform(t,0,0,t,0,0)}}update(t,e){t&&(!this.lastRecordedPos||this.lastRecordedPos.distanceTo(t)>=1.6)&&(this.roverPath.push({x:t.x,y:t.y,z:t.z,time:Date.now()}),this.lastRecordedPos=t.clone(),this.roverPath.length>600&&this.roverPath.shift(),this.isModalOpen&&(this.renderMap(),this.activeTransect==="rover-target"&&this.renderTransectGraph()))}getTransectPoints(){let t=this.hexapod.position;if(this.activeTransect==="crater")return{a:{x:-14,z:60,name:"Crater West Rim"},b:{x:30,z:60,name:"Crater East Ejecta"},title:"Chryse Meteorite Crater Rim-to-Rim Cross-Section (\u0E41\u0E2D\u0E48\u0E07\u0E2D\u0E38\u0E01\u0E01\u0E32\u0E1A\u0E32\u0E15\u0E44\u0E04\u0E23\u0E0B\u0E35)"};if(this.activeTransect==="lander-beta")return{a:{x:0,z:-16,name:"MAV Lander Base"},b:{x:38,z:36,name:"Site Beta Clays"},title:"Outflow Sedimentary Basin Transect (\u0E10\u0E32\u0E19\u0E22\u0E32\u0E19\u0E2A\u0E39\u0E48\u0E41\u0E2D\u0E48\u0E07\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1A\u0E35\u0E15\u0E32)"};if(this.activeTransect==="rover-target"){let e={x:38,z:36,name:"Target Beacon"};if(this.terrain&&this.terrain.samples){let i=this.terrain.samples.filter(n=>!n.collected);i.length>0&&(i.sort((n,r)=>{let a=Math.hypot(t.x-n.x,t.z-n.z),o=Math.hypot(t.x-r.x,t.z-r.z);return a-o}),e={x:i[0].x,z:i[0].z,name:i[0].id.toUpperCase()})}return{a:{x:t.x,z:t.z,name:"ARES-6 Rover"},b:e,title:`Rover Approach Transect (ARES-6 \u2794 ${e.name})`}}else if(this.activeTransect==="custom"&&this.customPointA&&this.customPointB)return{a:{x:this.customPointA.x,z:this.customPointA.z,name:"Point A"},b:{x:this.customPointB.x,z:this.customPointB.z,name:"Point B"},title:"Custom User Topographic Profile (\u0E20\u0E32\u0E04\u0E15\u0E31\u0E14\u0E02\u0E27\u0E32\u0E07\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E2D\u0E07)"};return{a:{x:-35,z:0,name:"West Outcrop"},b:{x:35,z:0,name:"East Outcrop"},title:"Chryse Equator East-West Transect"}}renderMap(){if(!this.ctx||!this.canvas)return;let t=this.ctx,e=this.canvas.width/(window.devicePixelRatio||1),i=this.canvas.height/(window.devicePixelRatio||1);t.clearRect(0,0,e,i);let n=this.rasterCaches[this.activeLayer];n&&(t.imageSmoothingEnabled=!0,t.drawImage(n,0,0,e,i)),t.strokeStyle="rgba(255, 255, 255, 0.12)",t.lineWidth=1,t.setLineDash([3,4]);for(let M=-100;M<=100;M+=50){let b=this.worldToCanvas(M,0,e,i);t.beginPath(),t.moveTo(b.x,0),t.lineTo(b.x,i),t.stroke()}for(let M=-100;M<=100;M+=50){let b=this.worldToCanvas(0,M,e,i);t.beginPath(),t.moveTo(0,b.y),t.lineTo(e,b.y),t.stroke()}if(t.setLineDash([]),this.roverPath.length>1){t.strokeStyle="#38bdf8",t.lineWidth=2.5,t.beginPath();for(let M=0;M<this.roverPath.length;M++){let b=this.worldToCanvas(this.roverPath[M].x,this.roverPath[M].z,e,i);M===0?t.moveTo(b.x,b.y):t.lineTo(b.x,b.y)}t.stroke()}let r=this.getTransectPoints();if(r&&r.a&&r.b){let M=this.worldToCanvas(r.a.x,r.a.z,e,i),b=this.worldToCanvas(r.b.x,r.b.z,e,i);t.strokeStyle="#f43f5e",t.lineWidth=2,t.setLineDash([5,3]),t.beginPath(),t.moveTo(M.x,M.y),t.lineTo(b.x,b.y),t.stroke(),t.setLineDash([]),t.fillStyle="#f43f5e",t.beginPath(),t.arc(M.x,M.y,5,0,Math.PI*2),t.fill(),t.fillStyle="#f43f5e",t.beginPath(),t.arc(b.x,b.y,5,0,Math.PI*2),t.fill()}let a=this.worldToCanvas(0,-16,e,i);t.fillStyle="#f97316",t.beginPath(),t.arc(a.x,a.y,7,0,Math.PI*2),t.fill(),t.strokeStyle="#fff",t.lineWidth=1.5,t.stroke(),t.fillStyle="#fdba74",t.font="bold 10px monospace",t.fillText("MAV LANDER (0, -16)",a.x+9,a.y+3);let o=this.worldToCanvas(8,60,e,i);t.strokeStyle="rgba(244, 63, 94, 0.7)",t.lineWidth=1.5,t.setLineDash([4,4]),t.beginPath();let l=14/this.size*e;t.arc(o.x,o.y,l,0,Math.PI*2),t.stroke(),t.setLineDash([]),t.fillStyle="rgba(254, 202, 202, 0.8)",t.font="9.5px sans-serif",t.fillText("Chryse Crater (r=14m)",o.x-30,o.y-l-4),this.terrain&&this.terrain.samples&&this.terrain.samples.forEach(M=>{let b=this.worldToCanvas(M.x,M.z,e,i),v="#"+M.color.toString(16).padStart(6,"0");t.fillStyle=v,t.beginPath(),t.arc(b.x,b.y,M.collected?5:6.5,0,Math.PI*2),t.fill(),t.strokeStyle="#ffffff",t.lineWidth=1.5,t.stroke(),t.fillStyle="#ffffff",t.font="bold 10px sans-serif",t.fillText(`${M.id.toUpperCase()} ${M.collected?"\u2713":""}`,b.x+8,b.y+3)});let c=this.hexapod.position,h=this.worldToCanvas(c.x,c.z,e,i);t.fillStyle="rgba(56, 189, 248, 0.25)",t.beginPath(),t.arc(h.x,h.y,11,0,Math.PI*2),t.fill(),t.fillStyle="#38bdf8",t.beginPath(),t.arc(h.x,h.y,5,0,Math.PI*2),t.fill(),t.strokeStyle="#ffffff",t.lineWidth=2,t.stroke();let f=this.hexapod.rotation.y,u=14,d=h.x+Math.sin(f)*u,g=h.y+Math.cos(f)*u;t.strokeStyle="#38bdf8",t.lineWidth=2.5,t.beginPath(),t.moveTo(h.x,h.y),t.lineTo(d,g),t.stroke();let _=50/this.size*e,m=e-_-16,p=i-16;t.strokeStyle="#ffffff",t.lineWidth=2.5,t.beginPath(),t.moveTo(m,p),t.lineTo(m+_,p),t.moveTo(m,p-4),t.lineTo(m,p+4),t.moveTo(m+_,p-4),t.lineTo(m+_,p+4),t.stroke(),t.fillStyle="#ffffff",t.font="10px monospace",t.fillText("50m",m+_*.35,p-6)}renderTransectGraph(){if(!this.transectCtx||!this.transectCanvas)return;let t=this.transectCtx,e=this.transectCanvas.width/(window.devicePixelRatio||1),i=this.transectCanvas.height/(window.devicePixelRatio||1);t.clearRect(0,0,e,i),t.fillStyle="#070a12",t.fillRect(0,0,e,i);let n=this.getTransectPoints();if(!n||!n.a||!n.b)return;let r=n.a.x,a=n.a.z,o=n.b.x,l=n.b.z,c=Math.hypot(o-r,l-a);if(c<.1)return;let h=120,f=[],u=999,d=-999,g=0,_=0;for(let Pt=0;Pt<=h;Pt++){let bt=Pt/h,$=r+bt*(o-r),it=a+bt*(l-a),tt=this.terrain.getHeight($,it),It=this.terrain.getNormal($,it),Lt=Math.acos(Math.max(0,Math.min(1,It.y)))*(180/Math.PI);f.push({dist:bt*c,elev:tt,slope:Lt,x:$,z:it}),tt<u&&(u=tt),tt>d&&(d=tt),Lt>g&&(g=Lt),_+=Lt}let m=_/(h+1),p=Math.max(1.5,d-u),M=45,b=25,v=e-M-25,T=i-b-30,S=u-.5,A=d+.5,x=A-S;t.strokeStyle="rgba(255, 255, 255, 0.08)",t.lineWidth=1,t.fillStyle="#64748b",t.font="10px monospace";for(let Pt=Math.floor(S);Pt<=Math.ceil(A);Pt+=1){let bt=b+T-(Pt-S)/x*T;bt>=b&&bt<=b+T&&(t.beginPath(),t.moveTo(M,bt),t.lineTo(M+v,bt),t.stroke(),t.fillText(`${Pt>=0?"+":""}${Pt.toFixed(1)}m`,6,bt+3))}let w=c>80?25:c>40?10:5;for(let Pt=0;Pt<=c;Pt+=w){let bt=M+Pt/c*v;t.beginPath(),t.moveTo(bt,b),t.lineTo(bt,b+T),t.stroke(),t.fillText(`${Math.round(Pt)}m`,bt-8,i-8)}t.beginPath(),t.moveTo(M,b+T);for(let Pt=0;Pt<=h;Pt++){let bt=f[Pt],$=M+bt.dist/c*v,it=b+T-(bt.elev-S)/x*T;t.lineTo($,it)}t.lineTo(M+v,b+T),t.closePath();let P=t.createLinearGradient(0,b,0,b+T);P.addColorStop(0,"rgba(234, 88, 12, 0.4)"),P.addColorStop(1,"rgba(15, 23, 42, 0.1)"),t.fillStyle=P,t.fill(),t.strokeStyle="#f97316",t.lineWidth=2.5,t.beginPath();for(let Pt=0;Pt<=h;Pt++){let bt=f[Pt],$=M+bt.dist/c*v,it=b+T-(bt.elev-S)/x*T;Pt===0?t.moveTo($,it):t.lineTo($,it)}t.stroke();let I=this.hexapod.position,L=o-r,W=l-a,k=L*L+W*W,D=((I.x-r)*L+(I.z-a)*W)/k;D=Math.max(0,Math.min(1,D));let F=D*c,U=this.terrain.getHeight(I.x,I.z),V=M+D*v,J=b+T-(U-S)/x*T;t.strokeStyle="#38bdf8",t.lineWidth=1.5,t.setLineDash([3,3]),t.beginPath(),t.moveTo(V,b),t.lineTo(V,b+T),t.stroke(),t.setLineDash([]),t.fillStyle="#38bdf8",t.beginPath(),t.arc(V,J,6,0,Math.PI*2),t.fill(),t.strokeStyle="#ffffff",t.lineWidth=2,t.stroke(),t.fillStyle="#38bdf8",t.font="bold 10px monospace",t.fillText(`ARES-6 (${U.toFixed(2)}m)`,V-25,J-10);let et=document.getElementById("gis-transect-title"),rt=document.getElementById("gis-transect-dist"),pt=document.getElementById("gis-transect-relief"),Xt=document.getElementById("gis-transect-slope");et&&(et.textContent=n.title),rt&&(rt.textContent=`${c.toFixed(1)} m`),pt&&(pt.textContent=`${(d-u).toFixed(2)} m (min: ${u.toFixed(1)}m, max: ${d.toFixed(1)}m)`),Xt&&(Xt.textContent=`\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m.toFixed(1)}\xB0 | \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 ${g.toFixed(1)}\xB0`)}exportMissionGeoJSON(){let t=this.roverPath.map(c=>{let h=this.localToMarsCoords(c.x,c.z);return[parseFloat(h.lon),parseFloat(h.lat),parseFloat(c.y.toFixed(2))]});if(t.length===0){let c=this.hexapod.position,h=this.localToMarsCoords(c.x,c.z);t.push([parseFloat(h.lon),parseFloat(h.lat),parseFloat(c.y.toFixed(2))])}let e=[];e.push({type:"Feature",geometry:{type:"LineString",coordinates:t},properties:{name:"ARES-6 Autonomous Exploration Track",rover:"ARES-6 Hexapod Rover",theater:"Mars Chryse Planitia Lowlands",totalPoints:t.length,exportTimestamp:new Date().toISOString(),institutionCredit:"Dr. Apisit Tongchai - Independent STEM Educational Project"}});let i=this.localToMarsCoords(0,-16);e.push({type:"Feature",geometry:{type:"Point",coordinates:[parseFloat(i.lon),parseFloat(i.lat),0]},properties:{name:"MAV Lander Extraction Base Station",type:"LandingCraft",status:"Operational"}});let n=this.localToMarsCoords(8,60);e.push({type:"Feature",geometry:{type:"Point",coordinates:[parseFloat(n.lon),parseFloat(n.lat),-2.2]},properties:{name:"Chryse Meteorite Impact Crater",radiusMeters:14,depthMeters:-2.2,ejectaRimHeightMeters:1.65,geologicalEpoch:"Amazonian / Late Hesperian"}}),this.terrain&&this.terrain.samples&&this.terrain.samples.forEach(c=>{let h=this.localToMarsCoords(c.x,c.z);e.push({type:"Feature",geometry:{type:"Point",coordinates:[parseFloat(h.lon),parseFloat(h.lat),parseFloat(this.terrain.getHeight(c.x,c.z).toFixed(2))]},properties:{id:c.id,name:c.name,thaiName:c.thaiName,siteType:c.siteType,mineralClassification:c.options[c.correctOption],hydrationIndexPct:c.spectralData.hydrationIndex,keyAbsorptionBands:c.spectralData.keyAbsorption,collected:!!c.collected,waterEvidenceLevel:c.waterEvidenceLevel}})});let r={type:"FeatureCollection",name:"ARES6_Mars_ChrysePlanitia_MissionData",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:e},a=new Blob([JSON.stringify(r,null,2)],{type:"application/geo+json;charset=utf-8"}),o=URL.createObjectURL(a),l=document.createElement("a");l.href=o,l.download=`ARES6_ChrysePlanitia_MissionData_${Date.now()}.geojson`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(o)}};var cc=class{constructor(){this.container=document.getElementById("canvas-container"),this.canvas=document.getElementById("webgl-canvas"),this.clock=new Xs,this.audio=new So,this.keys={},this.joystickVector=new xt(0,0),this.joystickActive=!1,this.dpadState={up:!1,down:!1,left:!1,right:!1},this.steerMode="camera",this.touchControlsVisible=!0,this.batterySaver=!1,this.inputVector=new R,this.moveSpeed=6.2,this.turnSpeed=1.8,this.currentSpeed=0,this.currentTurnRate=0,this.battery=100,this.solarCharging=0,this.collectedSamples=new Set,this.totalSamples=4,this.missionComplete=!1,this.missionStartTime=Date.now(),this.stabilityWarnings=0,this.lastCollisionAlertTime=0,this.collisionAlertTimer=null,this.lastSlipWarningTime=0,this.levelerTrial=null,this.dust=null,this.phaseDiagram=null,this.supportPolygon=null,this.kinematicsInspector=null,this.orbitalGis=null,this.trialHistory=[],this.dustTau=.1,this.solarCosTheta=.88,this.investigation={evidenceScore:0,maxScore:12,sampleResults:{},activeSample:null,correctCount:0,spectrometerOpen:!1},this.cameraModes=["orbit-follow","top-down","mast-cam","inspect"],this.cameraModeIndex=0,this.cameraMode=this.cameraModes[this.cameraModeIndex],this.camAzimuth=0,this.targetCamAzimuth=0,this.camElevation=.38,this.targetCamElevation=.38,this.camDistance=8.5,this.targetCamDistance=8.5,this.isPointerDown=!1,this.lastPointerX=0,this.lastPointerY=0,this.touchPinchStartDist=0,this.touchPinchStartCamDist=8.5,this.initScene(),this.initEntities(),this.initControls(),this.initUI(),this.bindEvents(),this.animate=this.animate.bind(this),requestAnimationFrame(this.animate)}getAdaptivePixelRatio(){return/Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent)||navigator.maxTouchPoints>0&&(window.innerWidth<=1024||window.innerHeight<=768)?Math.min(window.devicePixelRatio||1,1.6):Math.min(window.devicePixelRatio||1,2)}initScene(){let t=window.innerWidth,e=window.innerHeight;this.scene=new As,this.scene.background=new Ft(1247752),this.scene.fog=new ws(12604458,.009),this.camera=new Re(55,t/e,.1,1e3),this.camera.position.set(0,8,-12),this.renderer=new fo({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(t,e),this.renderer.setPixelRatio(this.getAdaptivePixelRatio()),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ma,this.renderer.toneMapping=Zs,this.renderer.toneMappingExposure=1.15;let i=uu(this.renderer);i&&(this.scene.environment=i),this.orbitControls=new xo(this.camera,this.renderer.domElement),this.orbitControls.enableDamping=!0,this.orbitControls.dampingFactor=.05,this.orbitControls.maxPolarAngle=Math.PI/2-.05,this.orbitControls.minDistance=2.5,this.orbitControls.maxDistance=60,this.orbitControls.enabled=!1;let n=new Ws(16772829,2.3);n.position.set(80,110,-60),n.castShadow=!0,n.shadow.mapSize.width=2048,n.shadow.mapSize.height=2048,n.shadow.camera.near=10,n.shadow.camera.far=300,n.shadow.camera.left=-40,n.shadow.camera.right=40,n.shadow.camera.top=40,n.shadow.camera.bottom=-40,n.shadow.bias=-5e-4,this.scene.add(n),this.sunLight=n;let r=new ks(16750950,4465169,.9);this.scene.add(r);let a=new ne,o=600,l=[];for(let h=0;h<o;h++){let f=Math.random(),u=Math.random(),d=f*2*Math.PI,g=Math.acos(2*u-1),_=400;l.push(_*Math.sin(g)*Math.cos(d),Math.abs(_*Math.cos(g))+20,_*Math.sin(g)*Math.sin(d))}a.setAttribute("position",new Gt(l,3));let c=new Qi({color:16777215,size:1.2,transparent:!0,opacity:.8});this.stars=new Mn(a,c),this.scene.add(this.stars)}initEntities(){this.terrain=new yo(this.scene),this.hexapod=new Mo(this.scene);let t=0,e=0,i=this.terrain.getHeight(t,e);this.hexapod.position.set(t,i,e),this.hexapod.rotation.y=0,this.camera.position.set(t,i+3.2,e-7.5),this.camera.lookAt(t,i+.9,e),this.orbitControls.target.set(t,i+.9,e),this.dust=new Eo(this.scene),this.gait=new bo(this.hexapod,this.terrain,this.audio,this.dust),this.leveler=new _o(this.hexapod),this.supportPolygon=new wo(this.scene),this.kinematicsInspector=new Ao,this.orbitalGis=new Co(this.terrain,this.hexapod)}initControls(){window.addEventListener("keydown",a=>{this.keys[a.code]=!0,this.audio.init(),a.code==="KeyR"&&this.toggleSteerMode(),a.code==="KeyL"&&this.toggleLeveler(),a.code==="KeyG"&&this.toggleGait(),a.code==="KeyP"&&this.toggleSupportPolygon(),a.code==="KeyE"&&this.toggleExperimentsModal(),a.code==="KeyC"&&this.toggleCameraMode(),a.code==="KeyF"&&this.toggleFullscreen(),a.code==="KeyM"&&this.toggleMute(),a.code==="KeyH"&&this.toggleInspector(),a.code==="KeyO"&&this.toggleOrbitalGIS(),(a.code==="ArrowUp"||a.code==="KeyW")&&document.getElementById("btn-dpad-up")?.classList.add("active"),(a.code==="ArrowDown"||a.code==="KeyS")&&document.getElementById("btn-dpad-down")?.classList.add("active"),(a.code==="ArrowLeft"||a.code==="KeyA")&&document.getElementById("btn-dpad-left")?.classList.add("active"),(a.code==="ArrowRight"||a.code==="KeyD")&&document.getElementById("btn-dpad-right")?.classList.add("active")}),window.addEventListener("keyup",a=>{this.keys[a.code]=!1,(a.code==="ArrowUp"||a.code==="KeyW")&&document.getElementById("btn-dpad-up")?.classList.remove("active"),(a.code==="ArrowDown"||a.code==="KeyS")&&document.getElementById("btn-dpad-down")?.classList.remove("active"),(a.code==="ArrowLeft"||a.code==="KeyA")&&document.getElementById("btn-dpad-left")?.classList.remove("active"),(a.code==="ArrowRight"||a.code==="KeyD")&&document.getElementById("btn-dpad-right")?.classList.remove("active")});let t=document.getElementById("joystick-zone"),e=document.getElementById("joystick-knob");if(t&&e){let a=null,o=0,l=0,c=45,h=(g,_,m)=>{a=m,this.joystickActive=!0,this.audio.init();let p=t.getBoundingClientRect();o=p.left+p.width/2,l=p.top+p.height/2,f(g,_)},f=(g,_)=>{let m=g-o,p=_-l,M=Math.hypot(m,p);M>c&&(m=m/M*c,p=p/M*c),e.style.transform=`translate(${m}px, ${p}px)`,this.joystickVector.set(m/c,-p/c)},u=()=>{a=null,this.joystickActive=!1,e.style.transform="translate(0px, 0px)",this.joystickVector.set(0,0)};t.addEventListener("pointerdown",g=>{if(!(g.target&&g.target.classList&&g.target.classList.contains("dpad-arrow"))&&(g.preventDefault(),h(g.clientX,g.clientY,g.pointerId),t.setPointerCapture))try{t.setPointerCapture(g.pointerId)}catch{}}),window.addEventListener("pointermove",g=>{!this.joystickActive||g.pointerId!==a||f(g.clientX,g.clientY)});let d=g=>{if(g.pointerId===a&&(u(),t.releasePointerCapture))try{t.releasePointerCapture(g.pointerId)}catch{}};window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d),t.addEventListener("touchstart",g=>{if(g.target&&g.target.classList&&g.target.classList.contains("dpad-arrow"))return;g.preventDefault();let _=g.changedTouches[0];h(_.clientX,_.clientY,_.identifier)},{passive:!1}),window.addEventListener("touchmove",g=>{if(this.joystickActive)for(let _=0;_<g.changedTouches.length;_++){let m=g.changedTouches[_];if(m.identifier===a){f(m.clientX,m.clientY);break}}},{passive:!1}),window.addEventListener("touchend",g=>{if(this.joystickActive){for(let _=0;_<g.changedTouches.length;_++)if(g.changedTouches[_].identifier===a){u();break}}})}[{id:"btn-dpad-up",dir:"up"},{id:"btn-dpad-down",dir:"down"},{id:"btn-dpad-left",dir:"left"},{id:"btn-dpad-right",dir:"right"}].forEach(({id:a,dir:o})=>{let l=document.getElementById(a);if(!l)return;let c=f=>{f.preventDefault(),f.stopPropagation(),this.dpadState[o]=!0,l.classList.add("active"),this.audio.init()},h=f=>{f.preventDefault(),f.stopPropagation(),this.dpadState[o]=!1,l.classList.remove("active")};l.addEventListener("pointerdown",c),l.addEventListener("pointerup",h),l.addEventListener("pointercancel",h),l.addEventListener("mouseleave",h),l.addEventListener("touchstart",c,{passive:!1}),l.addEventListener("touchend",h,{passive:!1}),l.addEventListener("touchcancel",h,{passive:!1})});let n=this.canvas||this.renderer.domElement;n.addEventListener("pointerdown",a=>{if(!(a.button!==0&&a.pointerType==="mouse")&&(this.isPointerDown=!0,this.lastPointerX=a.clientX,this.lastPointerY=a.clientY,this.audio.init(),n.setPointerCapture))try{n.setPointerCapture(a.pointerId)}catch{}}),window.addEventListener("pointermove",a=>{if(!this.isPointerDown)return;let o=a.clientX-this.lastPointerX,l=a.clientY-this.lastPointerY;this.lastPointerX=a.clientX,this.lastPointerY=a.clientY,this.targetCamAzimuth-=o*.0055,this.targetCamElevation+=l*.0045,this.targetCamElevation=Math.max(.06,Math.min(Math.PI/2-.04,this.targetCamElevation))});let r=a=>{if(this.isPointerDown=!1,n.releasePointerCapture&&a.pointerId!==void 0)try{n.releasePointerCapture(a.pointerId)}catch{}};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),n.addEventListener("wheel",a=>{a.preventDefault();let o=a.deltaY>0?1.12:.89;this.targetCamDistance=Math.max(3,Math.min(38,this.targetCamDistance*o))},{passive:!1}),n.addEventListener("touchstart",a=>{if(a.touches.length===2){let o=a.touches[0].clientX-a.touches[1].clientX,l=a.touches[0].clientY-a.touches[1].clientY;this.touchPinchStartDist=Math.sqrt(o*o+l*l),this.touchPinchStartCamDist=this.targetCamDistance}},{passive:!0}),n.addEventListener("touchmove",a=>{if(a.touches.length===2&&this.touchPinchStartDist>0){let o=a.touches[0].clientX-a.touches[1].clientX,l=a.touches[0].clientY-a.touches[1].clientY,c=Math.sqrt(o*o+l*l),h=this.touchPinchStartDist/Math.max(c,1);this.targetCamDistance=Math.max(3,Math.min(38,this.touchPinchStartCamDist*h))}},{passive:!0})}initUI(){this.ui={pitchVal:document.getElementById("hud-pitch-val"),rollVal:document.getElementById("hud-roll-val"),horizonBar:document.getElementById("hud-horizon-bar"),stabilityVal:document.getElementById("hud-stability-val"),stabilityBar:document.getElementById("hud-stability-bar"),altitudeVal:document.getElementById("hud-altitude-val"),speedVal:document.getElementById("hud-speed-val"),batteryVal:document.getElementById("hud-battery-val"),batteryBar:document.getElementById("hud-battery-bar"),solarVal:document.getElementById("hud-solar-val"),solarCosVal:document.getElementById("hud-solar-cos"),solarAngleVal:document.getElementById("hud-solar-angle"),solarEffBar:document.getElementById("hud-solar-eff-bar"),solarStatus:document.getElementById("hud-solar-status"),sampleCounter:document.getElementById("hud-sample-count"),evidenceScoreVal:document.getElementById("hud-evidence-score"),evidenceBar:document.getElementById("hud-evidence-bar"),atmoBox:document.getElementById("hud-atmo-box"),btnExperimentsNav:document.getElementById("btn-experiments"),btnExperimentsDock:document.getElementById("btn-open-experiments"),steerBtn:document.getElementById("btn-toggle-steer"),steerBtnText:document.getElementById("hud-steer-btn-text"),levelerBtn:document.getElementById("btn-toggle-leveler"),levelerStatus:document.getElementById("hud-leveler-status"),gaitBtn:document.getElementById("btn-toggle-gait"),gaitStatus:document.getElementById("hud-gait-status"),cameraBtn:document.getElementById("btn-toggle-cam"),camBtnText:document.getElementById("hud-cam-btn-text"),zoomInBtn:document.getElementById("btn-zoom-in"),zoomOutBtn:document.getElementById("btn-zoom-out"),camResetBtn:document.getElementById("btn-cam-reset"),muteBtn:document.getElementById("btn-toggle-audio"),spectrometerModal:document.getElementById("spectrometer-modal"),specSiteBadge:document.getElementById("spec-site-badge"),specSampleName:document.getElementById("spec-sample-name"),specHydrationPill:document.getElementById("spec-hydration-pill"),specPeakLabel:document.getElementById("spec-peak-label"),specBar14:document.getElementById("spec-bar-14"),specVal14:document.getElementById("spec-val-14"),specBar19:document.getElementById("spec-bar-19"),specVal19:document.getElementById("spec-val-19"),specBarMetal:document.getElementById("spec-bar-metal"),specValMetal:document.getElementById("spec-val-metal"),specInstrumentReading:document.getElementById("spec-instrument-reading"),specInquiryPrompt:document.getElementById("spec-inquiry-prompt"),specChoicesContainer:document.getElementById("spec-choices-container"),specFeedback:document.getElementById("spec-feedback"),btnConfirmSample:document.getElementById("btn-confirm-sample"),levelerExpModal:document.getElementById("leveler-experiment-modal"),gaitExpModal:document.getElementById("gait-experiment-modal"),atmoModal:document.getElementById("atmo-modal"),cerReportModal:document.getElementById("cer-report-modal"),cerFinalScore:document.getElementById("cer-final-score"),cerAccuracyRate:document.getElementById("cer-accuracy-rate"),cerFinalTime:document.getElementById("cer-final-time"),cerRankTitle:document.getElementById("cer-rank-title"),legDots:[document.getElementById("leg-0"),document.getElementById("leg-1"),document.getElementById("leg-2"),document.getElementById("leg-3"),document.getElementById("leg-4"),document.getElementById("leg-5")],minimapCanvas:document.getElementById("minimap-canvas"),warningToast:document.getElementById("warning-toast"),mobileHudToggleBtn:document.getElementById("btn-mobile-hud-toggle"),ribbonHudToggleBtn:document.getElementById("btn-ribbon-hud-toggle"),closeMobileHudBtn:document.getElementById("btn-close-mobile-hud"),telemetryDrawer:document.getElementById("telemetry-drawer"),ribbonSpeed:document.getElementById("ribbon-speed-val"),ribbonBattery:document.getElementById("ribbon-battery-val"),ribbonSamples:document.getElementById("ribbon-sample-val"),ribbonTimer:document.getElementById("ribbon-timer-val"),navSpeed:document.getElementById("nav-speed-val"),navBattery:document.getElementById("nav-battery-val"),navSamples:document.getElementById("nav-sample-val"),navTimer:document.getElementById("nav-timer-val"),btnFullscreen:document.getElementById("btn-fullscreen"),fullscreenIcon:document.getElementById("fullscreen-icon"),fullscreenText:document.getElementById("fullscreen-text"),btnDockFullscreen:document.getElementById("btn-dock-fullscreen"),dockFullscreenIcon:document.getElementById("dock-fullscreen-icon"),btnRibbonFullscreen:document.getElementById("btn-ribbon-fullscreen"),ribbonFullscreenIcon:document.getElementById("ribbon-fullscreen-icon"),mobileMenuModal:document.getElementById("mobile-menu-modal"),btnMobileMenuNav:document.getElementById("btn-mobile-menu-toggle"),btnMobileMenuRibbon:document.getElementById("btn-ribbon-mobile-menu"),btnMobileModalFullscreen:document.getElementById("btn-mobile-modal-fullscreen"),mobileModalFsIcon:document.getElementById("mobile-modal-fs-icon"),mobileModalFsText:document.getElementById("mobile-modal-fs-text"),mobileModalFsStatus:document.getElementById("mobile-modal-fs-status"),mMenuSpeed:document.getElementById("m-menu-speed-val"),mMenuBattery:document.getElementById("m-menu-battery-val"),mMenuStability:document.getElementById("m-menu-stability-val"),mMenuSamples:document.getElementById("m-menu-samples-val"),mBtnSteer:document.getElementById("m-btn-steer"),mTileSteerVal:document.getElementById("m-tile-steer-val"),mBtnLeveler:document.getElementById("m-btn-leveler"),mTileLevelerVal:document.getElementById("m-tile-leveler-val"),mBtnGait:document.getElementById("m-btn-gait"),mTileGaitVal:document.getElementById("m-tile-gait-val"),mBtnCam:document.getElementById("m-btn-cam"),mTileCamVal:document.getElementById("m-tile-cam-val"),mBtnCamReset:document.getElementById("m-btn-cam-reset"),mBtnAudio:document.getElementById("m-btn-audio"),mTileAudioVal:document.getElementById("m-tile-audio-val"),btnToggleTouchControls:document.getElementById("btn-toggle-touch-controls"),lblTouchControlsState:document.getElementById("lbl-touch-controls-state"),btnToggleMobilePerf:document.getElementById("btn-toggle-mobile-perf"),lblMobilePerfState:document.getElementById("lbl-mobile-perf-state"),mBtnOpenExperiments:document.getElementById("m-btn-open-experiments"),mBtnOpenHud:document.getElementById("m-btn-open-hud"),mBtnOpenBriefing:document.getElementById("m-btn-open-briefing"),bottomDock:document.querySelector(".bottom-dock"),waypointLayer:document.getElementById("waypoint-markers-layer"),waypointHudBar:document.getElementById("waypoint-hud-bar")},this.minimapCtx=this.ui.minimapCanvas?this.ui.minimapCanvas.getContext("2d"):null,this.drawMinimap(),this.updateHUD()}bindEvents(){window.addEventListener("resize",()=>{let v=window.innerWidth,T=window.innerHeight;this.camera.aspect=v/T,this.camera.updateProjectionMatrix(),this.renderer.setSize(v,T),this.renderer.setPixelRatio(this.getAdaptivePixelRatio())});let t=v=>{v&&(v.preventDefault(),v.stopPropagation()),this.ui.telemetryDrawer&&(this.ui.telemetryDrawer.classList.toggle("mobile-open"),this.ui.telemetryDrawer.classList.contains("mobile-open")&&this.drawMinimap()),this.audio.init()},e=v=>{v&&(v.preventDefault(),v.stopPropagation()),this.ui.telemetryDrawer&&this.ui.telemetryDrawer.classList.remove("mobile-open")};this.ui.mobileHudToggleBtn&&this.ui.mobileHudToggleBtn.addEventListener("click",t),this.ui.ribbonHudToggleBtn&&this.ui.ribbonHudToggleBtn.addEventListener("click",t),this.ui.closeMobileHudBtn&&this.ui.closeMobileHudBtn.addEventListener("click",e),this.ui.telemetryDrawer&&this.ui.telemetryDrawer.addEventListener("click",v=>{v.target===this.ui.telemetryDrawer&&e(v)}),this.ui.steerBtn&&this.ui.steerBtn.addEventListener("click",()=>this.toggleSteerMode()),this.ui.levelerBtn&&this.ui.levelerBtn.addEventListener("click",()=>this.toggleLeveler()),this.ui.gaitBtn&&this.ui.gaitBtn.addEventListener("click",()=>this.toggleGait()),this.ui.cameraBtn&&this.ui.cameraBtn.addEventListener("click",()=>this.toggleCameraMode()),this.ui.zoomInBtn&&this.ui.zoomInBtn.addEventListener("click",()=>this.zoomIn()),this.ui.zoomOutBtn&&this.ui.zoomOutBtn.addEventListener("click",()=>this.zoomOut()),this.ui.camResetBtn&&this.ui.camResetBtn.addEventListener("click",()=>this.resetCamera()),this.ui.muteBtn&&this.ui.muteBtn.addEventListener("click",()=>this.toggleMute()),this.ui.btnFullscreen&&this.ui.btnFullscreen.addEventListener("click",()=>this.toggleFullscreen()),this.ui.btnDockFullscreen&&this.ui.btnDockFullscreen.addEventListener("click",()=>this.toggleFullscreen()),this.ui.btnRibbonFullscreen&&this.ui.btnRibbonFullscreen.addEventListener("click",()=>this.toggleFullscreen()),this.ui.btnMobileMenuNav&&this.ui.btnMobileMenuNav.addEventListener("click",()=>this.toggleMobileMenu()),this.ui.btnMobileMenuRibbon&&this.ui.btnMobileMenuRibbon.addEventListener("click",()=>this.toggleMobileMenu()),this.ui.btnMobileModalFullscreen&&this.ui.btnMobileModalFullscreen.addEventListener("click",()=>this.toggleFullscreen()),this.ui.mBtnSteer&&this.ui.mBtnSteer.addEventListener("click",()=>this.toggleSteerMode()),this.ui.mBtnLeveler&&this.ui.mBtnLeveler.addEventListener("click",()=>this.toggleLeveler()),this.ui.mBtnGait&&this.ui.mBtnGait.addEventListener("click",()=>this.toggleGait()),this.ui.mBtnCam&&this.ui.mBtnCam.addEventListener("click",()=>this.toggleCameraMode()),this.ui.mBtnCamReset&&this.ui.mBtnCamReset.addEventListener("click",()=>this.resetCamera()),this.ui.mBtnAudio&&this.ui.mBtnAudio.addEventListener("click",()=>this.toggleMute()),this.ui.btnToggleTouchControls&&this.ui.btnToggleTouchControls.addEventListener("click",()=>this.toggleTouchControls()),this.ui.btnToggleMobilePerf&&this.ui.btnToggleMobilePerf.addEventListener("click",()=>this.toggleMobilePerformance()),this.ui.mBtnOpenExperiments&&this.ui.mBtnOpenExperiments.addEventListener("click",()=>{this.closeMobileMenu(),this.toggleExperimentsModal()}),this.ui.mBtnOpenHud&&this.ui.mBtnOpenHud.addEventListener("click",()=>{this.closeMobileMenu(),this.ui.telemetryDrawer&&this.ui.telemetryDrawer.classList.toggle("mobile-open")}),this.ui.mBtnOpenBriefing&&this.ui.mBtnOpenBriefing.addEventListener("click",()=>{this.closeMobileMenu();let v=document.getElementById("briefing-modal");v&&v.classList.toggle("hidden")});let i=()=>{this.updateFullscreenUI()};document.addEventListener("fullscreenchange",i),document.addEventListener("webkitfullscreenchange",i),document.addEventListener("mozfullscreenchange",i),document.addEventListener("MSFullscreenChange",i),this.ui.btnExperimentsNav&&this.ui.btnExperimentsNav.addEventListener("click",()=>this.toggleExperimentsModal()),this.ui.btnExperimentsDock&&this.ui.btnExperimentsDock.addEventListener("click",()=>this.toggleExperimentsModal()),this.ui.atmoBox&&this.ui.atmoBox.addEventListener("click",()=>this.openAtmoModal()),this.ui.btnConfirmSample&&this.ui.btnConfirmSample.addEventListener("click",()=>this.confirmSampleCollection());let n=document.getElementById("btn-run-trial-a");n&&n.addEventListener("click",()=>this.runLevelerTrial("a"));let r=document.getElementById("btn-run-trial-b");r&&r.addEventListener("click",()=>this.runLevelerTrial("b"));let a=document.getElementById("btn-export-cer");a&&a.addEventListener("click",()=>this.exportCERReport());let o=document.getElementById("btn-export-trials-csv");o&&o.addEventListener("click",()=>this.exportTrialsCSV());let l=document.getElementById("atmo-slider-tau"),c=document.getElementById("atmo-val-tau");l&&l.addEventListener("input",v=>{this.dustTau=parseFloat(v.target.value);let T=Math.round((1-this.dustTau)*100),S="\u0E1F\u0E49\u0E32\u0E42\u0E1B\u0E23\u0E48\u0E07";this.dustTau>=.4?S="\u0E1E\u0E32\u0E22\u0E38\u0E1D\u0E38\u0E48\u0E19\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07 (Global Dust Storm)":this.dustTau>=.25?S="\u0E2B\u0E21\u0E2D\u0E01\u0E1D\u0E38\u0E48\u0E19\u0E2B\u0E19\u0E32\u0E17\u0E36\u0E1A (Dust Haze)":this.dustTau>=.15&&(S="\u0E1D\u0E38\u0E48\u0E19\u0E1F\u0E38\u0E49\u0E07\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07"),c&&(c.textContent=`\u03C4 = ${this.dustTau.toFixed(2)} (${S} ${T}% \u0E41\u0E2A\u0E07\u0E2A\u0E48\u0E2D\u0E07\u0E16\u0E36\u0E07)`),this.scene&&this.scene.fog&&(this.scene.fog.density=.007+this.dustTau*.018)});let h=document.getElementById("btn-toggle-polygon");h&&h.addEventListener("click",()=>this.toggleSupportPolygon());let f=document.getElementById("btn-toggle-polygon-modal");f&&f.addEventListener("click",()=>this.toggleSupportPolygon());let u=document.getElementById("btn-select-tripod");u&&u.addEventListener("click",()=>this.selectGait("tripod"));let d=document.getElementById("btn-select-wave");d&&d.addEventListener("click",()=>this.selectGait("wave"));let g=document.getElementById("btn-inspector");g&&g.addEventListener("click",()=>this.toggleInspector());let _=document.getElementById("btn-orbital-gis");_&&_.addEventListener("click",()=>this.toggleOrbitalGIS());let m=document.getElementById("btn-toggle-gis");m&&m.addEventListener("click",()=>this.toggleOrbitalGIS());let p=document.getElementById("btn-briefing");p&&p.addEventListener("click",()=>{let v=document.getElementById("briefing-modal");v&&v.classList.toggle("hidden")}),document.querySelectorAll(".modal-close").forEach(v=>{v.addEventListener("click",T=>{let S=T.currentTarget.getAttribute("data-target"),A=document.getElementById(S);A&&A.classList.add("hidden"),S==="spectrometer-modal"&&(this.investigation.spectrometerOpen=!1)})}),document.querySelectorAll(".modal-overlay").forEach(v=>{v.addEventListener("click",T=>{T.target===v&&v.id!=="welcome-modal"&&(v.classList.add("hidden"),v.id==="spectrometer-modal"&&(this.investigation.spectrometerOpen=!1))})})}toggleSteerMode(){this.steerMode=this.steerMode==="camera"?"rover":"camera";let e=this.steerMode==="camera"?"STEER: \u0E21\u0E38\u0E21\u0E01\u0E25\u0E49\u0E2D\u0E07 (R)":"STEER: \u0E2B\u0E31\u0E27\u0E2B\u0E38\u0E48\u0E19 (R)";this.ui.steerBtnText?this.ui.steerBtnText.textContent=e:this.ui.steerBtn&&(this.ui.steerBtn.innerHTML=`<span>\u{1F579}\uFE0F</span> <span>${e}</span>`),this.updateMobileMenuUI(),this.audio.playScan()}toggleLeveler(){this.leveler.enabled=!this.leveler.enabled;let t=this.leveler.enabled;this.ui.levelerStatus&&(this.ui.levelerStatus.textContent=t?"ON (ACTIVE)":"OFF (DISABLED)",this.ui.levelerStatus.className=t?"text-emerald-400 font-bold":"text-rose-400 font-bold"),this.ui.levelerBtn&&(this.ui.levelerBtn.classList.toggle("border-emerald-500",t),this.ui.levelerBtn.classList.toggle("border-rose-500",!t)),this.updateMobileMenuUI(),this.audio.playScan()}toggleGait(){let t=this.gait.mode==="tripod"?"wave":"tripod";this.gait.setMode(t);let e=t==="tripod";this.ui.gaitStatus&&(this.ui.gaitStatus.textContent=e?"TRIPOD (FAST)":"WAVE (STABLE)",this.ui.gaitStatus.className=e?"text-cyan-400 font-bold":"text-amber-400 font-bold"),e||this.showWaveEngagedToast(),this.updateMobileMenuUI(),this.audio.playGaitShift()}toggleSupportPolygon(){if(this.supportPolygon){let t=this.supportPolygon.toggleVisible();this.audio.playScan();let e=document.getElementById("btn-toggle-polygon");e&&(e.classList.toggle("border-cyan-400",t),e.classList.toggle("text-cyan-400",t));let i=document.getElementById("btn-toggle-polygon-modal");i&&(i.textContent=t?"\u0E0B\u0E48\u0E2D\u0E19\u0E1C\u0E31\u0E07\u0E10\u0E32\u0E19\u0E04\u0E49\u0E33\u0E22\u0E31\u0E19 (Polygon)":"\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E31\u0E07\u0E10\u0E32\u0E19\u0E04\u0E49\u0E33\u0E22\u0E31\u0E19 (Polygon)")}}exportTrialsCSV(){this.audio.playScan();let t=`Trial,MeanSlopeDeg,MeanTiltDeg,RMSJitterDeg,StabilityIndexPct,SampleCount,Timestamp
`;if(this.trialHistory.length===0){let r=this.terrain.getNormal(this.hexapod.position.x,this.hexapod.position.z),a=Math.acos(Math.max(0,Math.min(1,r.y)))*(180/Math.PI),o=(this.leveler.tiltAngleDeg||0).toFixed(2),l=this.leveler.stabilityIndex||100;t+=`CURRENT,${a.toFixed(2)},${o},0.00,${l},1,${new Date().toISOString()}
`}else this.trialHistory.forEach(r=>{t+=`${r.trial},${r.meanSlope},${r.meanTilt},${r.rmsJitter},${r.meanStab},${r.sampleCount},${r.timestamp}
`});let e=new Blob([t],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(e),n=document.createElement("a");n.href=i,n.download=`ARES6_Leveler_Trials_ChrysePlanitia_${Date.now()}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)}zoomIn(){this.targetCamDistance=Math.max(3,this.targetCamDistance*.82),this.audio.playScan()}zoomOut(){this.targetCamDistance=Math.min(38,this.targetCamDistance*1.22),this.audio.playScan()}resetCamera(){this.targetCamAzimuth=0,this.targetCamElevation=.38,this.targetCamDistance=8.5,this.audio.playScan()}toggleCameraMode(){this.cameraModeIndex=(this.cameraModeIndex+1)%this.cameraModes.length,this.cameraMode=this.cameraModes[this.cameraModeIndex];let t=this.cameraMode==="inspect";if(this.orbitControls.enabled=t,t){let n=this.hexapod.position.clone().add(new R(0,.95,0));this.orbitControls.target.copy(n)}let i={"orbit-follow":"CAM: \u0E2D\u0E34\u0E2A\u0E23\u0E30 (C)","top-down":"CAM: \u0E21\u0E38\u0E21\u0E2A\u0E39\u0E07 (C)","mast-cam":"CAM: \u0E40\u0E2A\u0E32\u0E22\u0E32\u0E19 (C)",inspect:"CAM: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E20\u0E32\u0E1E (C)"}[this.cameraMode]||"CAM (C)";this.ui.camBtnText?this.ui.camBtnText.textContent=i:this.ui.cameraBtn&&(this.ui.cameraBtn.textContent=`\u{1F3A5} ${i}`),this.updateMobileMenuUI(),this.audio.playScan()}toggleMute(){let t=this.audio.toggleMute();this.ui.muteBtn&&(this.ui.muteBtn.textContent=t?"\u{1F507} AUDIO: OFF":"\u{1F50A} AUDIO: ON"),this.updateMobileMenuUI()}toggleInspector(){let t=document.getElementById("inspector-modal");t&&(t.classList.toggle("hidden"),t.classList.contains("hidden")||(this.audio.playScan(),this.kinematicsInspector&&setTimeout(()=>{this.kinematicsInspector.resizeCanvas(),this.kinematicsInspector.renderIKCanvas()},50)))}toggleOrbitalGIS(){this.orbitalGis&&(this.orbitalGis.toggleModal(),this.audio.playScan())}isFullscreen(){return!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)}toggleFullscreen(){this.audio.init();try{if(this.isFullscreen())document.exitFullscreen?document.exitFullscreen().catch(t=>{console.warn("exitFullscreen error:",t)}):document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();else{let t=document.documentElement;t.requestFullscreen?t.requestFullscreen().catch(e=>{console.warn("requestFullscreen error:",e)}):t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen()}}catch(t){console.warn("Fullscreen toggle failed:",t)}this.audio.playScan(),setTimeout(()=>this.updateFullscreenUI(),100)}updateFullscreenUI(){let t=this.isFullscreen();document.body.classList.toggle("is-fullscreen",t);let e=t?"\u{1F5D7}":"\u26F6",i=t?"\u0E22\u0E48\u0E2D\u0E08\u0E2D":"\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D",n=t?"\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D (F \u0E2B\u0E23\u0E37\u0E2D Esc)":"\u0E40\u0E1B\u0E34\u0E14\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D (F)";this.ui.fullscreenIcon&&(this.ui.fullscreenIcon.textContent=e),this.ui.fullscreenText&&(this.ui.fullscreenText.textContent=i),this.ui.btnFullscreen&&(this.ui.btnFullscreen.title=n,this.ui.btnFullscreen.classList.toggle("active",t)),this.ui.dockFullscreenIcon&&(this.ui.dockFullscreenIcon.textContent=e),this.ui.btnDockFullscreen&&(this.ui.btnDockFullscreen.title=n,this.ui.btnDockFullscreen.classList.toggle("active",t)),this.ui.ribbonFullscreenIcon&&(this.ui.ribbonFullscreenIcon.textContent=e),this.ui.btnRibbonFullscreen&&(this.ui.btnRibbonFullscreen.title=t?"\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D":"\u0E40\u0E1B\u0E34\u0E14\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D",this.ui.btnRibbonFullscreen.classList.toggle("active",t)),this.ui.mobileModalFsIcon&&(this.ui.mobileModalFsIcon.textContent=e),this.ui.mobileModalFsText&&(this.ui.mobileModalFsText.textContent=t?"\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D (Windowed)":"\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D (Fullscreen Mode)"),this.ui.mobileModalFsStatus&&(this.ui.mobileModalFsStatus.textContent=t?"\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D\u0E2D\u0E22\u0E39\u0E48 (Active)":"\u0E41\u0E15\u0E30\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E34\u0E14"),this.ui.btnMobileModalFullscreen&&this.ui.btnMobileModalFullscreen.classList.toggle("active",t)}openMobileMenu(){this.ui.mobileMenuModal&&(this.audio.init(),this.audio.playScan(),this.updateFullscreenUI(),this.updateMobileMenuUI(),this.ui.mobileMenuModal.classList.remove("hidden"))}closeMobileMenu(){this.ui.mobileMenuModal&&this.ui.mobileMenuModal.classList.add("hidden")}toggleMobileMenu(){this.ui.mobileMenuModal&&(this.ui.mobileMenuModal.classList.contains("hidden")?this.openMobileMenu():this.closeMobileMenu())}updateMobileMenuUI(){if(this.ui.mTileSteerVal&&(this.ui.mTileSteerVal.textContent=this.steerMode==="camera"?"\u0E21\u0E38\u0E21\u0E01\u0E25\u0E49\u0E2D\u0E07":"\u0E2B\u0E31\u0E27\u0E2B\u0E38\u0E48\u0E19"),this.ui.mTileLevelerVal){let t=this.leveler.enabled;this.ui.mTileLevelerVal.textContent=t?"ON":"OFF",this.ui.mTileLevelerVal.className=t?"m-tile-tag text-emerald-400":"m-tile-tag text-rose-400"}if(this.ui.mTileGaitVal){let t=this.gait.mode==="tripod";this.ui.mTileGaitVal.textContent=t?"Tripod":"Wave",this.ui.mTileGaitVal.className=t?"m-tile-tag text-cyan-400":"m-tile-tag text-amber-400"}if(this.ui.mTileCamVal){let t={"orbit-follow":"\u0E2D\u0E34\u0E2A\u0E23\u0E30 360\xB0","top-down":"\u0E21\u0E38\u0E21\u0E2A\u0E39\u0E07\u0E42\u0E14\u0E23\u0E19","mast-cam":"\u0E40\u0E2A\u0E32\u0E22\u0E32\u0E19 POV",inspect:"\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E20\u0E32\u0E1E"};this.ui.mTileCamVal.textContent=t[this.cameraMode]||"\u0E01\u0E25\u0E49\u0E2D\u0E07"}if(this.ui.mTileAudioVal){let t=this.audio.isMuted;this.ui.mTileAudioVal.textContent=t?"OFF":"ON",this.ui.mTileAudioVal.className=t?"m-tile-tag text-rose-400":"m-tile-tag text-emerald-400"}this.ui.lblTouchControlsState&&this.ui.btnToggleTouchControls&&(this.ui.lblTouchControlsState.textContent=this.touchControlsVisible?"\u0E41\u0E2A\u0E14\u0E07\u0E1B\u0E38\u0E48\u0E21":"\u0E0B\u0E48\u0E2D\u0E19\u0E1B\u0E38\u0E48\u0E21",this.ui.btnToggleTouchControls.classList.toggle("active",this.touchControlsVisible)),this.ui.lblMobilePerfState&&this.ui.btnToggleMobilePerf&&(this.ui.lblMobilePerfState.textContent=this.batterySaver?"\u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E41\u0E1A\u0E15\u0E40\u0E15\u0E2D\u0E23\u0E35\u0E48":"\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (\u0E04\u0E21\u0E0A\u0E31\u0E14)",this.ui.btnToggleMobilePerf.classList.toggle("active",!this.batterySaver))}toggleTouchControls(){this.touchControlsVisible=!this.touchControlsVisible,this.ui.bottomDock&&this.ui.bottomDock.classList.toggle("touch-hidden",!this.touchControlsVisible),this.ui.lblTouchControlsState&&this.ui.btnToggleTouchControls&&(this.ui.lblTouchControlsState.textContent=this.touchControlsVisible?"\u0E41\u0E2A\u0E14\u0E07\u0E1B\u0E38\u0E48\u0E21":"\u0E0B\u0E48\u0E2D\u0E19\u0E1B\u0E38\u0E48\u0E21",this.ui.btnToggleTouchControls.classList.toggle("active",this.touchControlsVisible)),this.audio.playScan()}toggleMobilePerformance(){this.batterySaver=!this.batterySaver;let t=this.batterySaver?1:this.getAdaptivePixelRatio();this.renderer.setPixelRatio(t),this.renderer.setSize(window.innerWidth,window.innerHeight),this.ui.lblMobilePerfState&&this.ui.btnToggleMobilePerf&&(this.ui.lblMobilePerfState.textContent=this.batterySaver?"\u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E41\u0E1A\u0E15\u0E40\u0E15\u0E2D\u0E23\u0E35\u0E48":"\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (\u0E04\u0E21\u0E0A\u0E31\u0E14)",this.ui.btnToggleMobilePerf.classList.toggle("active",!this.batterySaver)),this.audio.playScan()}getInputVector(){let t=0,e=0;(this.keys.KeyW||this.keys.ArrowUp)&&(t+=1),(this.keys.KeyS||this.keys.ArrowDown)&&(t-=1),(this.keys.KeyA||this.keys.ArrowLeft)&&(e-=1),(this.keys.KeyD||this.keys.ArrowRight)&&(e+=1),this.joystickActive&&(t+=this.joystickVector.y,e+=this.joystickVector.x),this.dpadState&&(this.dpadState.up&&(t+=1),this.dpadState.down&&(t-=1),this.dpadState.left&&(e-=1),this.dpadState.right&&(e+=1));let i=Math.hypot(e,t);return i>1&&(e/=i,t/=i),this.keys.Space&&(e=0,t=0),{rawX:e,rawY:t}}updateRoverPhysics(t){let{rawX:e,rawY:i}=this.getInputVector(),n=this.gait.mode==="tripod"?1:.65,r=Math.hypot(e,i),a=0,o=0;if(this.steerMode==="camera"){if(r>.05){let S=new R;if(this.camera.getWorldDirection(S),S.y=0,S.lengthSq()<1e-4){let w=new R(0,1,0).applyQuaternion(this.camera.quaternion);S.set(w.x,0,w.z)}S.normalize();let A=new R(S.z,0,-S.x),x=new R;if(x.addScaledVector(S,i),x.addScaledVector(A,e),x.lengthSq()>.001){x.normalize();let P=Math.atan2(x.x,x.z)-this.hexapod.rotation.y;P=Math.atan2(Math.sin(P),Math.cos(P)),o=Math.max(-1,Math.min(1,P*2.8))*this.turnSpeed*n;let L=Math.max(0,Math.cos(P));a=r*this.moveSpeed*n*Math.pow(L,1.25)}}}else a=i*this.moveSpeed*n,o=e*this.turnSpeed*n;let l=this.terrain.getNormal(this.hexapod.position.x,this.hexapod.position.z),c=Math.max(0,Math.min(1,l.y)),f=Math.acos(c)*(180/Math.PI);if(f>13)if(this.gait.mode==="tripod"){let S=Math.min(.65,(f-13)/18);a*=1-S*.85,this.leveler&&Math.abs(this.currentSpeed)>.05&&(this.leveler.currentPitch+=(Math.random()-.5)*.04*S,this.leveler.currentRoll+=(Math.random()-.5)*.04*S),this.leveler.stabilityIndex=Math.max(8,this.leveler.stabilityIndex-Math.round(S*35));let A=Date.now();A-this.lastSlipWarningTime>2800&&(this.lastSlipWarningTime=A,this.showSlipAlert(f),this.audio.playTractionSlip())}else this.leveler.stabilityIndex=Math.min(100,this.leveler.stabilityIndex+8);if(this.keys.Space)this.currentSpeed*=.76,this.currentTurnRate*=.76;else{let S=this.steerMode==="camera"?.16:.14,A=this.steerMode==="camera"?.22:.18;this.currentSpeed+=(a-this.currentSpeed)*S,this.currentTurnRate+=(o-this.currentTurnRate)*A}Math.abs(this.currentTurnRate)>.008&&(this.hexapod.rotation.y+=this.currentTurnRate*t);let u=new R(Math.sin(this.hexapod.rotation.y),0,Math.cos(this.hexapod.rotation.y)),d=this.hexapod.position.clone();Math.abs(this.currentSpeed)>.01&&(d.addScaledVector(u,this.currentSpeed*t),this.battery=Math.max(0,this.battery-t*.25));let g=[];if(this.terrain.lander&&g.push({x:this.terrain.lander.position.x,z:this.terrain.lander.position.z,radius:4.6,type:"lander"}),this.terrain.rocks&&this.terrain.rocks.length>0)for(let S=0;S<this.terrain.rocks.length;S++){let A=this.terrain.rocks[S];g.push({x:A.position.x,z:A.position.z,radius:A.radius,type:"rock"})}let _=1.65,m=!1;for(let S=0;S<2;S++)for(let A=0;A<g.length;A++){let x=g[A],w=d.x-x.x,P=d.z-x.z,I=Math.sqrt(w*w+P*P),L=x.radius+_;if(I<L&&I>.001){m=!0;let W=w/I,k=P/I;if(d.x=x.x+W*L,d.z=x.z+k*L,u.x*W+u.z*k<0){let F=-k,U=W,et=(u.x*F+u.z*U>=0?1:-1)*2.6*t;this.hexapod.rotation.y+=et,u.set(Math.sin(this.hexapod.rotation.y),0,Math.cos(this.hexapod.rotation.y)),this.currentSpeed*=.86}}}if(m){let S=Date.now();S-this.lastCollisionAlertTime>750&&(this.lastCollisionAlertTime=S,this.audio.playCollision(),this.showCollisionAlert(),this.leveler&&(this.leveler.currentPitch+=(Math.random()-.5)*.05,this.leveler.currentRoll+=(Math.random()-.5)*.05))}this.hexapod.position.x=d.x,this.hexapod.position.z=d.z;let p=this.terrain.getHeight(this.hexapod.position.x,this.hexapod.position.z);this.hexapod.position.y+=(p-this.hexapod.position.y)*.15;let M=new R(0,1,0);M.applyEuler(new ti(this.leveler.currentPitch,0,this.leveler.currentRoll,"ZXY")),M.applyAxisAngle(new R(0,1,0),this.hexapod.rotation.y),M.normalize();let b=new R(80,110,-60).normalize();this.solarCosTheta=Math.max(0,M.dot(b));let v=this.dustTau!==void 0?this.dustTau:.1;this.solarCharging=.5*this.solarCosTheta*(1-v),this.battery=Math.min(100,this.battery+this.solarCharging*t*.12),this.hexapod.updateSolarGlow(this.solarCosTheta);let T=Math.max(Math.abs(this.currentSpeed)/this.moveSpeed,Math.abs(this.currentTurnRate)/this.turnSpeed);this.audio.updateMotor(T),this.inputVector.set(Math.sin(this.hexapod.rotation.y)*this.currentSpeed,0,Math.cos(this.hexapod.rotation.y)*this.currentSpeed)}showCollisionAlert(){if(!this.ui.warningToast)return;let t=document.getElementById("warning-title"),e=document.getElementById("warning-desc");t&&(t.textContent="\u{1F6E1}\uFE0F \u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E19: \u0E23\u0E30\u0E1A\u0E1A\u0E2B\u0E25\u0E1A\u0E2B\u0E25\u0E35\u0E01\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E17\u0E33\u0E07\u0E32\u0E19 (DEFLECTION ACTIVE)"),e&&(e.textContent="\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C/\u0E10\u0E32\u0E19\u0E22\u0E32\u0E19 - \u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E25\u0E44\u0E01\u0E17\u0E33\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E35\u0E48\u0E22\u0E07\u0E17\u0E34\u0E28\u0E17\u0E32\u0E07\u0E2B\u0E25\u0E1A\u0E2B\u0E25\u0E35\u0E01\u0E23\u0E2D\u0E1A\u0E2A\u0E34\u0E48\u0E07\u0E01\u0E35\u0E14\u0E02\u0E27\u0E32\u0E07"),this.ui.warningToast.classList.remove("hidden"),this.collisionAlertTimer&&clearTimeout(this.collisionAlertTimer),this.collisionAlertTimer=setTimeout(()=>{this.leveler&&this.leveler.tiltAngleDeg<=28&&this.ui.warningToast.classList.add("hidden")},1300)}showSlipAlert(t){if(!this.ui.warningToast)return;let e=document.getElementById("warning-title"),i=document.getElementById("warning-desc");e&&(e.textContent=`\u26A0\uFE0F \u0E02\u0E32\u0E44\u0E16\u0E25\u0E25\u0E37\u0E48\u0E19: \u0E25\u0E32\u0E14\u0E0A\u0E31\u0E19\u0E2A\u0E39\u0E07 ${t.toFixed(0)}\xB0 (TRIPOD SLIP)`),i&&(i.textContent="\u0E42\u0E2B\u0E21\u0E14 Tripod (3 \u0E02\u0E32) \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E10\u0E32\u0E19\u0E41\u0E04\u0E1A\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E1A\u0E19\u0E17\u0E32\u0E07\u0E0A\u0E31\u0E19! \u0E01\u0E14 [G] \u0E2A\u0E25\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19 WAVE GAIT \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 5 \u0E02\u0E32"),this.ui.warningToast.classList.remove("hidden"),this.collisionAlertTimer&&clearTimeout(this.collisionAlertTimer),this.collisionAlertTimer=setTimeout(()=>{this.leveler&&this.leveler.tiltAngleDeg<=28&&this.ui.warningToast.classList.add("hidden")},2500)}showWaveEngagedToast(){if(!this.ui.warningToast)return;let t=document.getElementById("warning-title"),e=document.getElementById("warning-desc");t&&(t.textContent="\u{1F9D7} \u0E40\u0E1B\u0E34\u0E14\u0E42\u0E2B\u0E21\u0E14 WAVE GAIT: \u0E22\u0E36\u0E14\u0E40\u0E01\u0E32\u0E30\u0E1E\u0E37\u0E49\u0E19\u0E1C\u0E34\u0E27\u0E14\u0E49\u0E27\u0E22 5 \u0E02\u0E32 (MAX STABILITY)"),e&&(e.textContent="Duty Cycle 83.3% \u0E02\u0E22\u0E32\u0E22\u0E23\u0E39\u0E1B\u0E2B\u0E25\u0E32\u0E22\u0E40\u0E2B\u0E25\u0E35\u0E48\u0E22\u0E21\u0E10\u0E32\u0E19\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A \u0E43\u0E2B\u0E49\u0E41\u0E23\u0E07\u0E09\u0E38\u0E14\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1B\u0E35\u0E19\u0E40\u0E19\u0E34\u0E19\u0E17\u0E23\u0E32\u0E22\u0E41\u0E25\u0E30\u0E2A\u0E31\u0E19\u0E1C\u0E32"),this.ui.warningToast.classList.remove("hidden"),this.collisionAlertTimer&&clearTimeout(this.collisionAlertTimer),this.collisionAlertTimer=setTimeout(()=>{this.ui.warningToast.classList.add("hidden")},2200)}checkMissions(){let t=this.hexapod.position;this.terrain.samples.forEach(e=>{!e.collected&&!this.investigation.spectrometerOpen&&t.distanceTo(e.position)<=e.triggerRadius&&this.openSpectrometerModal(e)}),this.terrain.lander&&t.distanceTo(this.terrain.lander.position)<=this.terrain.lander.radius&&this.collectedSamples.size===this.totalSamples&&!this.missionComplete&&this.completeMission()}openSpectrometerModal(t){if(!(this.investigation.spectrometerOpen||t.collected)){if(this.investigation.spectrometerOpen=!0,this.investigation.activeSample=t,this.currentSpeed*=.3,this.investigation.sampleResults[t.id]||(this.investigation.sampleResults[t.id]={attempts:0,solved:!1,earnedPoints:0}),this.ui.specSiteBadge&&(this.ui.specSiteBadge.textContent=t.id.toUpperCase()),this.ui.specSampleName&&(this.ui.specSampleName.textContent=t.thaiName),this.ui.specHydrationPill&&(this.ui.specHydrationPill.textContent=`\u{1F4A7} \u0E19\u0E49\u0E33: ${t.spectralData.hydrationIndex}%`,this.ui.specHydrationPill.className=t.spectralData.hydrationIndex>=70?"water-evidence-pill high":t.spectralData.hydrationIndex>=30?"water-evidence-pill medium":"water-evidence-pill low"),this.ui.specPeakLabel&&(this.ui.specPeakLabel.textContent=`\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E2B\u0E25\u0E31\u0E01: ${t.spectralData.keyAbsorption}`),this.ui.specBar14&&(this.ui.specBar14.style.width=`${Math.round(t.spectralData.absorption14*100)}%`),this.ui.specVal14&&(this.ui.specVal14.textContent=`-${t.spectralData.absorption14.toFixed(2)}`),this.ui.specBar19&&(this.ui.specBar19.style.width=`${Math.round(t.spectralData.absorption19*100)}%`),this.ui.specVal19&&(this.ui.specVal19.textContent=`-${t.spectralData.absorption19.toFixed(2)}`),this.ui.specBarMetal&&(this.ui.specBarMetal.style.width=`${Math.round(t.spectralData.absorptionMetal*100)}%`),this.ui.specValMetal&&(this.ui.specValMetal.textContent=`-${t.spectralData.absorptionMetal.toFixed(2)}`),this.ui.specInstrumentReading&&(this.ui.specInstrumentReading.textContent=t.spectralData.readingText),this.ui.specInquiryPrompt&&(this.ui.specInquiryPrompt.textContent=t.inquiryQuestion.prompt),this.ui.specChoicesContainer){this.ui.specChoicesContainer.innerHTML="";let e=["\u0E01","\u0E02","\u0E04"];t.inquiryQuestion.choices.forEach((i,n)=>{let r=document.createElement("div");r.className="inquiry-choice-card",r.innerHTML=`
          <div class="choice-tag">${e[n]}</div>
          <div class="choice-text">${i.text}</div>
        `,r.addEventListener("click",()=>this.handleChoiceSelection(t,n,r)),this.ui.specChoicesContainer.appendChild(r)})}this.ui.specFeedback&&(this.ui.specFeedback.className="hidden",this.ui.specFeedback.innerHTML=""),this.ui.btnConfirmSample&&(this.ui.btnConfirmSample.disabled=!0,this.ui.btnConfirmSample.innerHTML="\u{1F512} \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E17\u0E32\u0E07\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07"),this.ui.spectrometerModal&&this.ui.spectrometerModal.classList.remove("hidden"),this.audio.playScan()}}handleChoiceSelection(t,e,i){let n=this.investigation.sampleResults[t.id];if(n.solved)return;n.attempts++;let r=e===t.inquiryQuestion.correctIndex;if(this.ui.specChoicesContainer&&this.ui.specChoicesContainer.querySelectorAll(".inquiry-choice-card").forEach(o=>o.classList.remove("selected","incorrect")),r){n.solved=!0,i.classList.add("correct");let a=n.attempts===1?t.waterEvidencePoints:n.attempts===2?Math.max(1,t.waterEvidencePoints-1):1;n.earnedPoints=a,this.investigation.evidenceScore+=a,n.attempts===1&&this.investigation.correctCount++,this.ui.specFeedback&&(this.ui.specFeedback.className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 p-3 rounded-xl",this.ui.specFeedback.innerHTML=`
          <strong style="color: #4ade80;">\u2705 \u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E25\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E32\u0E21\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E2A\u0E40\u0E1B\u0E01\u0E42\u0E15\u0E23\u0E21\u0E34\u0E40\u0E15\u0E2D\u0E23\u0E4C!</strong><br>
          ${t.inquiryQuestion.explanation}<br>
          <span style="color: #38bdf8; font-weight: 800; font-family: var(--font-mono); margin-top: 4px; display: inline-block;">
            +${a} \u0E04\u0E30\u0E41\u0E19\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E19\u0E49\u0E33\u0E42\u0E1A\u0E23\u0E32\u0E13 (CER Evidence Score)
          </span>
        `,this.ui.specFeedback.classList.remove("hidden")),this.ui.btnConfirmSample&&(this.ui.btnConfirmSample.disabled=!1,this.ui.btnConfirmSample.innerHTML=`\u{1F4E5} \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E25\u0E30\u0E40\u0E01\u0E47\u0E1A\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 (${t.thaiName}) \u2794`),this.audio.playVictory()}else i.classList.add("incorrect"),this.ui.specFeedback&&(this.ui.specFeedback.className="bg-rose-950/70 border border-rose-500/40 text-rose-200 p-3 rounded-xl",this.ui.specFeedback.innerHTML=`
          <strong style="color: #f43f5e;">\u274C \u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19:</strong><br>
          \u0E2A\u0E31\u0E07\u0E40\u0E01\u0E15\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E17\u0E35\u0E48 <strong>${t.spectralData.keyAbsorption}</strong> \u0E41\u0E25\u0E30\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E19\u0E49\u0E33\u0E43\u0E19\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07 <strong>${t.spectralData.hydrationIndex}%</strong> \u0E25\u0E2D\u0E07\u0E17\u0E1A\u0E17\u0E27\u0E19\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E2D\u0E37\u0E48\u0E19
        `,this.ui.specFeedback.classList.remove("hidden")),this.audio.playCollision();this.updateHUD()}confirmSampleCollection(){let t=this.investigation.activeSample;t&&(t.collected=!0,this.collectedSamples.add(t.id),t.coreMesh&&t.coreMesh.scale.set(.2,.2,.2),t.group&&t.group.children.forEach(e=>{e.material&&e.material.opacity&&(e.material.opacity=.15)}),this.audio.playScan(),this.ui.spectrometerModal&&this.ui.spectrometerModal.classList.add("hidden"),this.investigation.spectrometerOpen=!1,this.updateHUD(),this.collectedSamples.size===this.totalSamples&&this.audio.playVictory())}toggleExperimentsModal(){this.ui.levelerExpModal&&this.ui.levelerExpModal.classList.toggle("hidden"),this.audio.playScan()}openAtmoModal(){this.ui.atmoModal&&(this.ui.atmoModal.classList.remove("hidden"),this.phaseDiagram||(this.phaseDiagram=new To("atmo-phase-canvas")),this.phaseDiagram&&requestAnimationFrame(()=>{this.phaseDiagram.initCanvasSize(),this.phaseDiagram.syncUI(),this.phaseDiagram.render()})),this.audio.playScan()}openGaitExpModal(){this.ui.gaitExpModal&&this.ui.gaitExpModal.classList.remove("hidden"),this.audio.playScan()}selectGait(t){this.gait.setMode(t);let e=t==="tripod";this.ui.gaitStatus&&(this.ui.gaitStatus.textContent=e?"TRIPOD (FAST)":"WAVE (STABLE)",this.ui.gaitStatus.className=e?"text-cyan-400 font-bold":"text-amber-400 font-bold"),e||this.showWaveEngagedToast(),this.ui.gaitExpModal&&this.ui.gaitExpModal.classList.add("hidden"),this.audio.playGaitShift()}runLevelerTrial(t){this.audio.playScan();let e=t==="a";this.leveler.enabled=!e,this.ui.levelerStatus&&(this.ui.levelerStatus.textContent=e?"OFF (TRIAL A)":"ON (ACTIVE TRIAL B)",this.ui.levelerStatus.className=e?"text-rose-400 font-bold":"text-emerald-400 font-bold");let i=document.getElementById("exp-telemetry-progress"),n=document.getElementById("exp-progress-text"),r=document.getElementById("exp-progress-pct");i&&i.classList.remove("hidden"),n&&(n.textContent=`\u{1F4E1} \u0E01\u0E33\u0E25\u0E31\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E42\u0E17\u0E23\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E17\u0E23\u0E07\u0E15\u0E31\u0E27\u0E2A\u0E14 (${e?"Trial A: \u0E1B\u0E34\u0E14\u0E23\u0E30\u0E1A\u0E1A":"Trial B: \u0E40\u0E1B\u0E34\u0E14\u0E23\u0E30\u0E1A\u0E1A"})...`),r&&(r.textContent="0%");let a=document.getElementById(e?"exp-status-a":"exp-status-b");a&&(a.textContent="\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E38\u0E48\u0E21\u0E27\u0E31\u0E14\u0E2A\u0E14...",a.style.color="#38bdf8"),this.levelerTrial={trial:t,duration:3.5,elapsed:0,samples:[],lastBeep:0}}updateLevelerTrial(t){if(!this.levelerTrial)return;let e=this.levelerTrial;e.elapsed+=t,e.elapsed-e.lastBeep>.6&&(e.lastBeep=e.elapsed,this.audio.playFootstep());let i=this.terrain.getNormal(this.hexapod.position.x,this.hexapod.position.z),n=Math.acos(Math.max(0,Math.min(1,i.y)))*(180/Math.PI),r=0;this.leveler.tiltAngleDeg!==void 0?r=this.leveler.tiltAngleDeg:r=Math.hypot(this.leveler.currentPitch,this.leveler.currentRoll)*(180/Math.PI);let a=this.leveler.stabilityIndex!==void 0?this.leveler.stabilityIndex:100;if(e.trial==="a"){let c=Math.max(16.5,n*.95+(Math.random()-.5)*4.2),h=Math.max(15,Math.min(45,a-50+(Math.random()-.5)*12));e.samples.push({tilt:c,stab:h,slope:Math.max(18,n)})}else{let c=Math.max(1.8,Math.min(5.2,r+(Math.random()-.5)*.6)),h=Math.max(85,Math.min(99,93+(Math.random()-.5)*4));e.samples.push({tilt:c,stab:h,slope:Math.max(18,n)})}let o=Math.min(100,Math.round(e.elapsed/e.duration*100)),l=document.getElementById("exp-progress-pct");l&&(l.textContent=`${o}%`),e.elapsed>=e.duration&&this.finishLevelerTrial()}finishLevelerTrial(){if(!this.levelerTrial)return;let t=this.levelerTrial;this.levelerTrial=null;let e=document.getElementById("exp-telemetry-progress");e&&e.classList.add("hidden");let i=t.samples.length||1,n=0,r=0,a=0;t.samples.forEach(b=>{n+=b.tilt,r+=b.stab,a+=b.slope});let o=n/i,l=Math.round(r/i),c=(a/i).toFixed(1),h=0;t.samples.forEach(b=>{h+=Math.pow(b.tilt-o,2)});let f=Math.sqrt(h/i),u=t.trial==="a",d=document.getElementById(u?"exp-status-a":"exp-status-b"),g=document.getElementById(u?"exp-slope-a":"exp-slope-b"),_=document.getElementById(u?"exp-tilt-a":"exp-tilt-b"),m=document.getElementById(u?"exp-jitter-a":"exp-jitter-b"),p=document.getElementById(u?"exp-stab-a":"exp-stab-b");d&&(d.textContent="\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u2713",d.style.color=u?"#fda4af":"#6ee7b7"),g&&(g.textContent=`${c}\xB0`),_&&(_.textContent=`${o.toFixed(1)}\xB0 (${u?"\u0E40\u0E2D\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E25\u0E32\u0E14\u0E1C\u0E32":"\u0E0A\u0E14\u0E40\u0E0A\u0E22\u0E23\u0E30\u0E19\u0E32\u0E1A"})`),m&&(m.textContent=`\xB1${f.toFixed(2)}\xB0 (${u?"\u0E44\u0E23\u0E49\u0E15\u0E31\u0E27\u0E0B\u0E31\u0E1A\u0E2A\u0E31\u0E48\u0E19":"Damping 0.08"})`),p&&(p.textContent=`${l}% (${u?"\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E04\u0E27\u0E48\u0E33":"\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23\u0E20\u0E32\u0E1E\u0E2A\u0E39\u0E07"})`);let M=document.getElementById("exp-empirical-conclusion");M&&(M.innerHTML=`<strong>\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E17\u0E14\u0E25\u0E2D\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C:</strong> \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E34\u0E14 Active Leveler (Trial B) \u0E2B\u0E38\u0E48\u0E19\u0E22\u0E19\u0E15\u0E4C ARES-6 \u0E25\u0E14\u0E21\u0E38\u0E21\u0E40\u0E2D\u0E35\u0E22\u0E07\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E25\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D <strong>${o.toFixed(1)}\xB0</strong> \u0E41\u0E25\u0E30\u0E25\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E19\u0E44\u0E2B\u0E27 (RMS Jitter) \u0E40\u0E2B\u0E25\u0E37\u0E2D <strong>\xB1${f.toFixed(2)}\xB0</strong> \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E43\u0E2B\u0E49\u0E14\u0E31\u0E0A\u0E19\u0E35\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23\u0E20\u0E32\u0E1E\u0E17\u0E23\u0E07\u0E15\u0E31\u0E27\u0E1E\u0E38\u0E48\u0E07\u0E2A\u0E39\u0E07\u0E16\u0E36\u0E07 <strong>${l}%</strong> \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E2A\u0E21\u0E21\u0E15\u0E34\u0E10\u0E32\u0E19\u0E17\u0E35\u0E48 1 \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19`),this.trialHistory.push({trial:t.trial.toUpperCase(),meanSlope:parseFloat(c),meanTilt:parseFloat(o.toFixed(2)),rmsJitter:parseFloat(f.toFixed(2)),meanStab:l,sampleCount:i,timestamp:new Date().toISOString()}),u?this.audio.playAlert():this.audio.playVictory()}completeMission(){this.missionComplete=!0,this.audio.playVictory();let t=Math.round((Date.now()-this.missionStartTime)/1e3),e=Math.floor(t/60),i=t%60,n=`${e}:${i<10?"0":""}${i}`,r=this.investigation.evidenceScore,a=Math.round(this.investigation.correctCount/4*100),o="Lead Planetary Geologist";r>=11?o="Principal Planetary Geoscientist (\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E19\u0E31\u0E01\u0E18\u0E23\u0E13\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32 Chryse)":r>=8?o="Senior Mars Astrobiology Specialist (\u0E1C\u0E39\u0E49\u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E0A\u0E35\u0E27\u0E14\u0E32\u0E23\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C)":o="Mars Field Surveyor (\u0E19\u0E31\u0E01\u0E2A\u0E33\u0E23\u0E27\u0E08\u0E20\u0E32\u0E04\u0E2A\u0E19\u0E32\u0E21\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23)",this.ui.cerFinalScore&&(this.ui.cerFinalScore.textContent=`${r}/12 pts`),this.ui.cerAccuracyRate&&(this.ui.cerAccuracyRate.textContent=`${a}%`),this.ui.cerFinalTime&&(this.ui.cerFinalTime.textContent=n),this.ui.cerRankTitle&&(this.ui.cerRankTitle.textContent=o);let l=document.getElementById("cer-claim-text");l&&(r>=10?l.innerHTML="\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E2A\u0E40\u0E1B\u0E01\u0E15\u0E23\u0E31\u0E21\u0E2D\u0E34\u0E19\u0E1F\u0E23\u0E32\u0E40\u0E23\u0E14\u0E23\u0E30\u0E22\u0E30\u0E43\u0E01\u0E25\u0E49 (VNIR) \u0E41\u0E25\u0E30\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E42\u0E1A\u0E23\u0E32\u0E13 \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32 <strong>Chryse Planitia \u0E43\u0E19\u0E2D\u0E14\u0E35\u0E15\u0E22\u0E38\u0E04 Noachian (3.8 \u0E1E\u0E31\u0E19\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19)</strong> \u0E40\u0E04\u0E22\u0E21\u0E35\u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21\u0E17\u0E35\u0E48\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07\u0E04\u0E07\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E39\u0E48\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19 \u0E01\u0E48\u0E2D\u0E15\u0E31\u0E27\u0E40\u0E1B\u0E47\u0E19\u0E17\u0E30\u0E40\u0E25\u0E2A\u0E32\u0E1A\u0E41\u0E25\u0E30\u0E18\u0E32\u0E23\u0E19\u0E49\u0E33\u0E2B\u0E25\u0E32\u0E01 \u0E01\u0E48\u0E2D\u0E19\u0E08\u0E30\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E1C\u0E48\u0E32\u0E19\u0E2A\u0E39\u0E48\u0E19\u0E49\u0E33\u0E01\u0E23\u0E14\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04 Hesperian \u0E41\u0E25\u0E30\u0E01\u0E25\u0E32\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E17\u0E30\u0E40\u0E25\u0E17\u0E23\u0E32\u0E22\u0E40\u0E22\u0E37\u0E2D\u0E01\u0E41\u0E02\u0E47\u0E07\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04 Amazonian":l.innerHTML="\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E20\u0E32\u0E04\u0E2A\u0E19\u0E32\u0E21\u0E23\u0E30\u0E1A\u0E38\u0E27\u0E48\u0E32 Chryse Planitia \u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E17\u0E32\u0E07\u0E18\u0E23\u0E13\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32\u0E2B\u0E25\u0E32\u0E22\u0E22\u0E38\u0E04 \u0E42\u0E14\u0E22\u0E1E\u0E1A\u0E23\u0E48\u0E2D\u0E07\u0E23\u0E2D\u0E22\u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E41\u0E25\u0E30\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E27\u0E48\u0E32\u0E43\u0E19\u0E2D\u0E14\u0E35\u0E15\u0E40\u0E04\u0E22\u0E21\u0E35\u0E1B\u0E0F\u0E34\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E19\u0E49\u0E33\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19 \u0E41\u0E21\u0E49\u0E08\u0E30\u0E21\u0E35\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E1A\u0E32\u0E07\u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E33\u0E23\u0E27\u0E08\u0E0B\u0E49\u0E33\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21");let c=document.getElementById("cer-evidence-list");if(c&&this.terrain&&this.terrain.samples){let f="";this.terrain.samples.forEach(u=>{let d=this.investigation.sampleResults[u.id]||{attempts:1,earnedPoints:3},g=d.earnedPoints===3?"#34d399":"#fbbf24",_=d.earnedPoints===3?"\u2713 \u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E04\u0E23\u0E31\u0E49\u0E07\u0E41\u0E23\u0E01 (+3 pts)":`\u2713 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 (+${d.earnedPoints} pts)`,m=u.inquiryQuestion.choices[u.inquiryQuestion.correctIndex].text;f+=`
          <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
              <strong style="color: #67e8f9;">\u2022 ${u.thaiName} (${u.id.toUpperCase()}):</strong>
              <span style="font-size: 11px; font-family: var(--font-mono); color: ${g};">${_}</span>
            </div>
            <div style="color: #cbd5e1; font-size: 0.82rem;">
              \u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E2B\u0E25\u0E31\u0E01: <strong>${u.spectralData.keyAbsorption}</strong> (\u0E04\u0E27\u0E32\u0E21\u0E0A\u0E37\u0E49\u0E19 ${u.spectralData.hydrationIndex}%)<br>
              <em>\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C:</em> ${m}
            </div>
          </div>
        `}),c.innerHTML=f}let h=document.getElementById("cer-reasoning-text");h&&(h.innerHTML=`
        \u0E01\u0E23\u0E30\u0E1A\u0E27\u0E19\u0E01\u0E32\u0E23\u0E15\u0E01\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E02\u0E2D\u0E07 <strong>Phyllosilicate Clay (Site Beta)</strong> \u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27 pH \u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E19\u0E31\u0E1A\u0E2B\u0E21\u0E37\u0E48\u0E19\u0E1B\u0E35 \u0E0B\u0E36\u0E48\u0E07\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19 <strong>Paleomagnetic Anomaly (Site Delta)</strong> \u0E17\u0E35\u0E48\u0E1E\u0E34\u0E2A\u0E39\u0E08\u0E19\u0E4C\u0E27\u0E48\u0E32\u0E43\u0E19\u0E22\u0E38\u0E04\u0E19\u0E31\u0E49\u0E19\u0E41\u0E01\u0E19\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E22\u0E31\u0E07\u0E21\u0E35\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1B\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E2B\u0E19\u0E32\u0E41\u0E19\u0E48\u0E19 (\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19 &gt; 100 kPa) \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E19\u0E49\u0E33\u0E04\u0E07\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E40\u0E2B\u0E19\u0E37\u0E2D\u0E08\u0E38\u0E14\u0E23\u0E48\u0E27\u0E21\u0E2A\u0E32\u0E21 (0.611 kPa) \u0E44\u0E14\u0E49<br><br>
        \u0E15\u0E48\u0E2D\u0E21\u0E32\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E14\u0E31\u0E1A\u0E2A\u0E39\u0E0D \u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E08\u0E36\u0E07\u0E01\u0E27\u0E32\u0E14\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E2D\u0E2D\u0E01\u0E2A\u0E39\u0E48\u0E2D\u0E27\u0E01\u0E32\u0E28 \u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E25\u0E14\u0E2E\u0E27\u0E1A\u0E25\u0E07\u0E2A\u0E39\u0E48 0.63 kPa \u0E43\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 \u0E19\u0E49\u0E33\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E08\u0E36\u0E07\u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27 \u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E44\u0E27\u0E49\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07 <strong>Jarosite (Site Alpha)</strong> \u0E41\u0E25\u0E30\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E2A\u0E14 <strong>Olivine (Site Gamma)</strong> \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07\u0E2D\u0E35\u0E01\u0E40\u0E25\u0E22
      `),this.ui.cerReportModal&&this.ui.cerReportModal.classList.remove("hidden")}exportCERReport(){let t=Math.round((Date.now()-this.missionStartTime)/1e3),e=Math.floor(t/60),i=t%60,n=`${e}:${i<10?"0":""}${i}`,r=this.investigation.evidenceScore,a=Math.round(this.investigation.correctCount/4*100),o=`# \u{1FA90} \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E1A\u0E40\u0E2A\u0E32\u0E30\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C Chryse Planitia (CER Report)
`;o+=`**\u0E2B\u0E38\u0E48\u0E19\u0E22\u0E19\u0E15\u0E4C\u0E2A\u0E33\u0E23\u0E27\u0E08:** ARES-6 Autonomous Martian Hexapod
`,o+=`**\u0E04\u0E30\u0E41\u0E19\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19 (Evidence Score):** ${r}/12 pts (${a}%)
`,o+=`**\u0E40\u0E27\u0E25\u0E32\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23:** ${n}

`,o+=`## 1. \u0E02\u0E49\u0E2D\u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23 (Claim)
`;let l=document.getElementById("cer-claim-text");o+=`${l?l.textContent.trim():""}

`,o+=`## 2. \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C (Evidence)
`,this.terrain&&this.terrain.samples&&this.terrain.samples.forEach(h=>{let f=this.investigation.sampleResults[h.id]||{attempts:1,earnedPoints:3};o+=`- **${h.thaiName} (${h.id.toUpperCase()}):** \u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19 ${h.spectralData.keyAbsorption} (\u0E04\u0E27\u0E32\u0E21\u0E0A\u0E37\u0E49\u0E19 ${h.spectralData.hydrationIndex}%) \u2014 \u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${f.earnedPoints} \u0E04\u0E30\u0E41\u0E19\u0E19 (\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C ${f.attempts} \u0E04\u0E23\u0E31\u0E49\u0E07)
`}),o+=`
`,o+=`## 3. \u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E41\u0E25\u0E30\u0E01\u0E25\u0E44\u0E01\u0E17\u0E32\u0E07\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C (Reasoning)
`;let c=document.getElementById("cer-reasoning-text");o+=`${c?c.textContent.trim():""}

`,o+=`---
*\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E27\u0E34\u0E08\u0E31\u0E22\u0E20\u0E32\u0E04\u0E2A\u0E19\u0E32\u0E21\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23 \u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E15\u0E32\u0E21\u0E01\u0E23\u0E2D\u0E1A CER \u0E42\u0E14\u0E22 \u0E14\u0E23. \u0E2D\u0E20\u0E34\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \u0E17\u0E2D\u0E07\u0E44\u0E0A\u0E22*
`,navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(o).then(()=>{let h=document.getElementById("cer-export-toast");h&&(h.classList.remove("hidden"),setTimeout(()=>h.classList.add("hidden"),3500)),this.audio.playScan()}).catch(h=>{console.warn("Clipboard write failed:",h)})}updateHUD(){let t=(this.leveler.currentPitch*180/Math.PI).toFixed(1),e=(this.leveler.currentRoll*180/Math.PI).toFixed(1);if(this.ui.pitchVal&&(this.ui.pitchVal.textContent=`${t}\xB0`),this.ui.rollVal&&(this.ui.rollVal.textContent=`${e}\xB0`),this.ui.horizonBar){let u=this.leveler.currentPitch*45,d=-this.leveler.currentRoll*(180/Math.PI);this.ui.horizonBar.style.transform=`translate(-50%, calc(-50% + ${u}px)) rotate(${d}deg)`}let i=this.leveler.stabilityIndex;this.ui.stabilityVal&&(this.ui.stabilityVal.textContent=`${i}%`),this.ui.stabilityBar&&(this.ui.stabilityBar.style.width=`${i}%`,this.ui.stabilityBar.className=i>70?"h-full bg-emerald-500":i>35?"h-full bg-amber-500":"h-full bg-rose-500"),this.leveler.tiltAngleDeg>28?(this.ui.warningToast&&this.ui.warningToast.classList.remove("hidden"),this.audio.playAlert()):this.ui.warningToast&&this.ui.warningToast.classList.add("hidden"),this.ui.altitudeVal&&(this.ui.altitudeVal.textContent=`${this.hexapod.position.y.toFixed(1)} m`);let n=Math.hypot(this.currentSpeed,this.currentTurnRate*1.6);this.ui.speedVal&&(this.ui.speedVal.textContent=`${n.toFixed(1)} m/s`),this.ui.batteryVal&&(this.ui.batteryVal.textContent=`${Math.round(this.battery)}%`),this.ui.batteryBar&&(this.ui.batteryBar.style.width=`${Math.round(this.battery)}%`),this.ui.solarCosVal&&(this.ui.solarCosVal.textContent=`cos \u03B8 = ${this.solarCosTheta.toFixed(2)}`),this.ui.solarVal&&(this.ui.solarVal.textContent=`+${this.solarCharging.toFixed(2)} kW`);let a=Math.acos(Math.max(0,Math.min(1,this.solarCosTheta)))*(180/Math.PI);if(this.ui.solarAngleVal&&(this.ui.solarAngleVal.textContent=`${a.toFixed(1)}\xB0`),this.ui.solarEffBar&&(this.ui.solarEffBar.style.width=`${Math.round(this.solarCosTheta*100)}%`),this.ui.solarStatus&&(this.solarCosTheta>=.8?(this.ui.solarStatus.textContent="\u2600\uFE0F \u0E1B\u0E23\u0E30\u0E08\u0E38\u0E44\u0E1F\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E (Optimal Incidence)",this.ui.solarStatus.style.color="#4ade80"):this.solarCosTheta>=.45?(this.ui.solarStatus.textContent="\u{1F324}\uFE0F \u0E1B\u0E23\u0E30\u0E08\u0E38\u0E44\u0E1F\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 (Moderate Angle)",this.ui.solarStatus.style.color="#fde047"):(this.ui.solarStatus.textContent="\u{1F311} \u0E21\u0E38\u0E21\u0E15\u0E01\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E40\u0E09\u0E35\u0E22\u0E07\u0E21\u0E32\u0E01 (Low Irradiance)",this.ui.solarStatus.style.color="#f87171")),this.ui.sampleCounter&&(this.ui.sampleCounter.textContent=`${this.collectedSamples.size}/${this.totalSamples}`),this.ui.evidenceScoreVal&&(this.ui.evidenceScoreVal.textContent=`${this.investigation.evidenceScore}/12 pts`),this.ui.evidenceBar){let u=Math.min(100,Math.round(this.investigation.evidenceScore/12*100));this.ui.evidenceBar.style.width=`${u}%`}this.ui.ribbonSpeed&&(this.ui.ribbonSpeed.textContent=`${n.toFixed(1)} m/s`),this.ui.ribbonBattery&&(this.ui.ribbonBattery.textContent=`${Math.round(this.battery)}%`),this.ui.ribbonSamples&&(this.ui.ribbonSamples.textContent=`${this.collectedSamples.size}/${this.totalSamples}`),this.ui.mMenuSpeed&&(this.ui.mMenuSpeed.textContent=`${n.toFixed(1)} m/s`),this.ui.mMenuBattery&&(this.ui.mMenuBattery.textContent=`${Math.round(this.battery)}%`),this.ui.mMenuStability&&(this.ui.mMenuStability.textContent=`${i}%`),this.ui.mMenuSamples&&(this.ui.mMenuSamples.textContent=`${this.collectedSamples.size}/${this.totalSamples}`),this.ui.navSpeed&&(this.ui.navSpeed.textContent=`${n.toFixed(1)} m/s`),this.ui.navBattery&&(this.ui.navBattery.textContent=`${Math.round(this.battery)}%`),this.ui.navSamples&&(this.ui.navSamples.textContent=`${this.collectedSamples.size}/${this.totalSamples}`),this.hexapod.legs.forEach((u,d)=>{let g=this.ui.legDots[d];g&&(g.className=u.isGrounded?"leg-dot grounded":"leg-dot swing")});let o=Math.floor((Date.now()-this.missionStartTime)/1e3),l=Math.floor(o/60),c=o%60,h=`${l<10?"0":""}${l}:${c<10?"0":""}${c}`,f=document.getElementById("hud-mission-timer");f&&(f.textContent=h),this.ui.ribbonTimer&&(this.ui.ribbonTimer.textContent=h),this.ui.navTimer&&(this.ui.navTimer.textContent=h),this.drawMinimap()}drawMinimap(){if(!this.minimapCtx)return;let t=this.minimapCtx,e=this.ui.minimapCanvas.width,i=this.ui.minimapCanvas.height,n=e/260;if(t.clearRect(0,0,e,i),t.strokeStyle="rgba(239, 68, 68, 0.35)",t.lineWidth=1.5,t.beginPath(),t.arc(e/2,i/2,85*n,0,Math.PI*2),t.stroke(),this.terrain.rocks){t.fillStyle="rgba(180, 83, 9, 0.45)";for(let h=0;h<this.terrain.rocks.length;h++){let f=this.terrain.rocks[h],u=e/2+f.position.x*n,d=i/2-f.position.z*n;t.beginPath(),t.arc(u,d,Math.max(1.2,f.radius*n*.7),0,Math.PI*2),t.fill()}}let r=this.terrain.lander?this.terrain.lander.position.z:-16,a=e/2+0*n,o=i/2-r*n;t.fillStyle="#38bdf8",t.beginPath(),t.arc(a,o,4.5,0,Math.PI*2),t.fill(),t.strokeStyle="rgba(56, 189, 248, 0.35)",t.lineWidth=1,t.beginPath(),t.arc(a,o,8*n,0,Math.PI*2),t.stroke(),this.terrain.samples.forEach(h=>{let f=e/2+h.position.x*n,u=i/2-h.position.z*n;t.fillStyle=h.collected?"#64748b":"#"+h.color.toString(16).padStart(6,"0"),t.beginPath(),t.arc(f,u,h.collected?2.5:4.5,0,Math.PI*2),t.fill()});let l=e/2+this.hexapod.position.x*n,c=i/2-this.hexapod.position.z*n;t.save(),t.translate(l,c),t.rotate(this.hexapod.rotation.y),t.fillStyle="#f97316",t.beginPath(),t.moveTo(0,-7),t.lineTo(4,4),t.lineTo(-4,4),t.closePath(),t.fill(),t.restore()}updateWaypointMarkers(){if(!this.ui.waypointLayer||!this.camera)return;let t=this.hexapod.position,e=[];if(this.terrain&&this.terrain.samples&&this.terrain.samples.forEach(a=>{e.push({id:a.id,name:a.id.toUpperCase(),thaiName:a.thaiName,pos:a.position.clone().add(new R(0,2.4,0)),color:"#"+a.color.toString(16).padStart(6,"0"),collected:a.collected,type:"sample"})}),this.terrain&&this.terrain.lander){let a=this.collectedSamples.size===this.totalSamples;e.push({id:"lander",name:a?"\u{1F680} MAV EXTRACTION":"MAV BASE",thaiName:"\u0E22\u0E32\u0E19\u0E25\u0E07\u0E08\u0E2D\u0E14 MAV",pos:this.terrain.lander.position.clone().add(new R(0,3.8,0)),color:a?"#f97316":"#38bdf8",collected:this.missionComplete,type:"lander",isPrimary:a})}let i=window.innerWidth,n=window.innerHeight,r="";e.forEach(a=>{let o=Math.round(t.distanceTo(a.pos)),l=document.getElementById(`wp-dist-${a.id}`),c=document.getElementById(`wp-chip-${a.id}`);if(l&&(a.collected?(l.textContent="\u2713",c&&c.classList.add("collected")):(l.textContent=`${o}m`,c&&c.classList.remove("collected"))),c&&c.classList.toggle("primary-pulse",!!a.isPrimary&&!a.collected),a.collected&&!a.isPrimary)return;let h=a.pos.clone().project(this.camera),f=h.z>1,u=(h.x*.5+.5)*i,d=(-(h.y*.5)+.5)*n,g=36;if(f||u<g||u>i-g||d<g||d>n-g){let m=u-i/2,p=d-n/2;f&&(m=-m,p=-p);let M=Math.atan2(p,m),b=(i/2-g)*Math.cos(M),v=(n/2-g)*Math.sin(M);u=i/2+b,d=n/2+v;let T=Math.round(M*(180/Math.PI));r+=`
          <div class="waypoint-pin edge ${a.isPrimary?"primary":""}" style="left: ${u.toFixed(0)}px; top: ${d.toFixed(0)}px; --accent: ${a.color};">
            <span class="wp-pin-arrow" style="transform: rotate(${T}deg);">\u27A4</span>
            <span class="wp-pin-badge">${a.name} ${o}m</span>
          </div>
        `}else r+=`
          <div class="waypoint-pin in-screen ${a.isPrimary?"primary":""}" style="left: ${u.toFixed(0)}px; top: ${d.toFixed(0)}px; --accent: ${a.color};">
            <div class="wp-pin-dot"></div>
            <div class="wp-pin-label">
              <span class="wp-pin-title">${a.name}</span>
              <span class="wp-pin-meters">${o}m</span>
            </div>
          </div>
        `}),this.ui.waypointLayer.innerHTML=r}updateCamera(){this.camAzimuth+=(this.targetCamAzimuth-this.camAzimuth)*.12,this.camElevation+=(this.targetCamElevation-this.camElevation)*.12,this.camDistance+=(this.targetCamDistance-this.camDistance)*.15;let t=Math.hypot(this.currentSpeed,this.currentTurnRate*1.5),e=Math.min(1,t/this.moveSpeed),n=(this.cameraMode==="mast-cam"?62:this.cameraMode==="top-down"?50:55)+e*3.8;this.camera.fov+=(n-this.camera.fov)*.08,this.camera.updateProjectionMatrix();let r=this.hexapod.position.clone().add(new R(0,.95,0));if(this.cameraMode==="orbit-follow"){let o=this.hexapod.rotation.y+this.camAzimuth,l=this.camDistance*Math.cos(this.camElevation),c=this.camDistance*Math.sin(this.camElevation),h=-Math.sin(o)*l,f=-Math.cos(o)*l,u=this.leveler?this.leveler.currentPitch:0,d=Math.max(0,-u*.85),g=Math.max(.6,c+d),_=r.clone().add(new R(h,g,f)),m=this.terrain.getHeight(_.x,_.z)+1.15;_.y<m&&(_.y=m),this.camera.position.lerp(_,.12),this.camera.lookAt(r)}else if(this.cameraMode==="top-down"){let a=Math.max(18,this.camDistance*2.2),o=this.hexapod.rotation.y,l=this.hexapod.position.clone().add(new R(-Math.sin(o)*1.5,a,-Math.cos(o)*1.5));this.camera.position.lerp(l,.12),this.camera.lookAt(r)}else if(this.cameraMode==="mast-cam"){let a=this.hexapod.rotation.y,o=new R(Math.sin(a),0,Math.cos(a)),l=this.hexapod.position.clone().add(new R(o.x*.45,1.35,o.z*.45)),c=l.clone().add(new R(o.x*12,-.9,o.z*12));this.camera.position.lerp(l,.25),this.camera.lookAt(c)}else if(this.cameraMode==="inspect"){let a=r.clone().sub(this.orbitControls.target);this.camera.position.add(a),this.orbitControls.target.copy(r),this.orbitControls.update()}}animate(){requestAnimationFrame(this.animate);let t=Math.min(this.clock.getDelta(),.1),e=this.clock.getElapsedTime();if(this.updateRoverPhysics(t),this.gait&&this.hexapod){this.gait.update(t,this.currentSpeed,this.currentTurnRate);let i=[];if(this.hexapod.legs.forEach(n=>{n.isGrounded&&i.push(n.worldFootPos.clone())}),this.leveler.update(i,this.gait.bodyHeight),this.supportPolygon){let n=this.terrain.getNormal(this.hexapod.position.x,this.hexapod.position.z),r=Math.acos(Math.max(0,Math.min(1,n.y)))*(180/Math.PI),a=this.supportPolygon.update(i,this.hexapod.position,this.gait.mode,r),o=document.getElementById("gait-telemetry-contacts"),l=document.getElementById("gait-telemetry-area"),c=document.getElementById("gait-telemetry-margin");o&&(o.textContent=`${a.contactCount}/6`),l&&(l.textContent=`${a.area.toFixed(2)} m\xB2`),c&&(c.textContent=`${a.stabilityMargin.toFixed(2)} m`)}}if(this.dust&&this.dust.update(t),this.updateLevelerTrial(t),this.kinematicsInspector&&this.hexapod&&this.hexapod.legs){let i=document.getElementById("inspector-modal");i&&!i.classList.contains("hidden")&&this.kinematicsInspector.updateLiveTelemetry(this.hexapod.legs)}this.orbitalGis&&this.hexapod&&this.orbitalGis.update(this.hexapod.position,this.hexapod.rotation.y),this.terrain.update(e),this.checkMissions(),this.updateCamera(),this.updateHUD(),this.updateWaypointMarkers(),this.sunLight&&(this.sunLight.target.position.copy(this.hexapod.position),this.sunLight.target.updateMatrixWorld()),this.renderer.render(this.scene,this.camera)}};window.addEventListener("DOMContentLoaded",()=>{new cc});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
