(()=>{var sn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},rn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yc=0,fl=1,$c=2;var $s=1,Ma=2,es=3,Li=0,Ve=1,He=2,bi=0,Di=1,pl=2,ml=3,gl=4,Zc=5;var $i=100,Jc=101,Kc=102,jc=103,Qc=104,th=200,eh=201,ih=202,nh=203,Nr=204,Fr=205,sh=206,rh=207,ah=208,oh=209,lh=210,ch=211,hh=212,uh=213,dh=214,Ur=0,Br=1,Or=2,_n=3,zr=4,kr=5,Vr=6,Hr=7,xl=0,fh=1,ph=2,di=0,_l=1,yl=2,vl=3,Zs=4,Ml=5,bl=6,Sl=7;var El=300,an=301,Tn=302,is=303,ba=304,Js=306,Ke=1e3,yi=1001,Gr=1002,Ie=1003,mh=1004;var Ks=1005;var Se=1006,Sa=1007;var on=1008;var Xe=1009,Tl=1010,wl=1011,ns=1012,Ea=1013,fi=1014,pi=1015,Si=1016,Ta=1017,wa=1018,ss=1020,Al=35902,Cl=35899,Rl=1021,Pl=1022,ai=1023,vi=1026,ln=1027,Il=1028,Aa=1029,cn=1030,Ca=1031;var Ra=1033,js=33776,Qs=33777,tr=33778,er=33779,Pa=35840,Ia=35841,La=35842,Da=35843,Na=36196,Fa=37492,Ua=37496,Ba=37488,Oa=37489,ir=37490,za=37491,ka=37808,Va=37809,Ha=37810,Ga=37811,Wa=37812,Xa=37813,qa=37814,Ya=37815,$a=37816,Za=37817,Ja=37818,Ka=37819,ja=37820,Qa=37821,to=36492,eo=36494,io=36495,no=36283,so=36284,nr=36285,ro=36286;var vs=2300,Wr=2301,Dr=2302,el=2303,il=2400,nl=2401,sl=2402;var gh=3200;var ao=0,xh=1,Bi="",Je="srgb",Ms="srgb-linear",bs="linear",Jt="srgb";var gn=7680;var rl=519,_h=512,yh=513,vh=514,oo=515,Mh=516,bh=517,lo=518,Sh=519,al=35044;var Ll="300 es",hi=2e3,Xn=2001;function xu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function _u(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ss(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Eh(){let n=Ss("canvas");return n.style.display="block",n}var xc={},qn=null;function Dl(...n){let t="THREE."+n.shift();qn?qn("log",t,...n):console.log(t,...n)}function Th(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function wt(...n){n=Th(n);let t="THREE."+n.shift();if(qn)qn("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Lt(...n){n=Th(n);let t="THREE."+n.shift();if(qn)qn("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function xn(...n){let t=n.join(" ");t in xc||(xc[t]=!0,wt(...n))}function wh(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Ah={[Ur]:Br,[Or]:Vr,[zr]:Hr,[_n]:kr,[Br]:Ur,[Vr]:Or,[Hr]:zr,[kr]:_n},ui=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_c=1234567,gs=Math.PI/180,yn=180/Math.PI;function rs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]).toLowerCase()}function kt(n,t,e){return Math.max(t,Math.min(e,n))}function Nl(n,t){return(n%t+t)%t}function yu(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function vu(n,t,e){return n!==t?(e-n)/(t-n):0}function xs(n,t,e){return(1-e)*n+e*t}function Mu(n,t,e,i){return xs(n,t,1-Math.exp(-e*i))}function bu(n,t=1){return t-Math.abs(Nl(n,t*2)-t)}function Su(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Eu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Tu(n,t){return n+Math.floor(Math.random()*(t-n+1))}function wu(n,t){return n+Math.random()*(t-n)}function Au(n){return n*(.5-Math.random())}function Cu(n){n!==void 0&&(_c=n);let t=_c+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ru(n){return n*gs}function Pu(n){return n*yn}function Iu(n){return(n&n-1)===0&&n!==0}function Lu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Du(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Nu(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),u=a((t+i)/2),f=r((t-i)/2),h=a((t-i)/2),d=r((i-t)/2),g=a((i-t)/2);switch(s){case"XYX":n.set(o*u,l*f,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*f,o*c);break;case"ZXZ":n.set(l*f,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*g,l*d,o*c);break;case"YXY":n.set(l*d,o*u,l*g,o*c);break;case"ZYZ":n.set(l*g,l*d,o*u,o*c);break;default:wt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Gn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Oe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Fl={DEG2RAD:gs,RAD2DEG:yn,generateUUID:rs,clamp:kt,euclideanModulo:Nl,mapLinear:yu,inverseLerp:vu,lerp:xs,damp:Mu,pingpong:bu,smoothstep:Su,smootherstep:Eu,randInt:Tu,randFloat:wu,randFloatSpread:Au,seededRandom:Cu,degToRad:Ru,radToDeg:Pu,isPowerOfTwo:Iu,ceilPowerOfTwo:Lu,floorPowerOfTwo:Du,setQuaternionFromProperEuler:Nu,normalize:Oe,denormalize:Gn},gt=class n{static{n.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},je=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3],h=r[a+0],d=r[a+1],g=r[a+2],y=r[a+3];if(f!==y||l!==h||c!==d||u!==g){let p=l*h+c*d+u*g+f*y;p<0&&(h=-h,d=-d,g=-g,y=-y,p=-p);let m=1-o;if(p<.9995){let M=Math.acos(p),E=Math.sin(M);m=Math.sin(m*M)/E,o=Math.sin(o*M)/E,l=l*m+h*o,c=c*m+d*o,u=u*m+g*o,f=f*m+y*o}else{l=l*m+h*o,c=c*m+d*o,u=u*m+g*o,f=f*m+y*o;let M=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=M,c*=M,u*=M,f*=M}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[a],h=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+u*f+l*d-c*h,t[e+1]=l*g+u*h+c*f-o*d,t[e+2]=c*g+u*d+o*h-l*f,t[e+3]=u*g-o*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),f=o(r/2),h=l(i/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:wt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+o+f;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>f){let d=2*Math.sqrt(1+i-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-i-f);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+f-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class n{static{n.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ro.copy(this).projectOnVector(t),this.sub(Ro)}reflect(t){return this.sub(Ro.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ro=new R,yc=new je,Ft=class n{static{n.prototype.isMatrix3=!0}constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],y=s[0],p=s[3],m=s[6],M=s[1],E=s[4],v=s[7],w=s[2],S=s[5],C=s[8];return r[0]=a*y+o*M+l*w,r[3]=a*p+o*E+l*S,r[6]=a*m+o*v+l*C,r[1]=c*y+u*M+f*w,r[4]=c*p+u*E+f*S,r[7]=c*m+u*v+f*C,r[2]=h*y+d*M+g*w,r[5]=h*p+d*E+g*S,r[8]=h*m+d*v+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,h=o*l-u*r,d=c*r-a*l,g=e*f+i*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=f*y,t[1]=(s*c-u*i)*y,t[2]=(o*i-s*a)*y,t[3]=h*y,t[4]=(u*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=d*y,t[7]=(i*l-c*e)*y,t[8]=(a*e-i*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return xn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Po.makeScale(t,e)),this}rotate(t){return xn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Po.makeRotation(-t)),this}translate(t,e){return xn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Po.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Po=new Ft,vc=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mc=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fu(){let n={enabled:!0,workingColorSpace:Ms,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Jt&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Jt&&(s.r=Wn(s.r),s.g=Wn(s.g),s.b=Wn(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bi?bs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ms]:{primaries:t,whitePoint:i,transfer:bs,toXYZ:vc,fromXYZ:Mc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Je},outputColorSpaceConfig:{drawingBufferColorSpace:Je}},[Je]:{primaries:t,whitePoint:i,transfer:Jt,toXYZ:vc,fromXYZ:Mc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Je}}}),n}var $t=Fu();function Ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Wn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var In,Xr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{In===void 0&&(In=Ss("canvas")),In.width=t.width,In.height=t.height;let s=In.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=In}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ss("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ii(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ii(e[i]/255)*255):e[i]=Ii(e[i]);return{data:e,width:t.width,height:t.height}}else return wt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Uu=0,Yn=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=rs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Io(s[a].image)):r.push(Io(s[a]))}else r=Io(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Io(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Xr.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(wt("Texture: Unable to serialize Texture."),{})}var Bu=0,Lo=new R,ze=class n extends ui{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=yi,s=yi,r=Se,a=on,o=ai,l=Xe,c=n.DEFAULT_ANISOTROPY,u=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=rs(),this.name="",this.source=new Yn(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Lo).x}get height(){return this.source.getSize(Lo).y}get depth(){return this.source.getSize(Lo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){wt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){wt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==El)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ke:t.x=t.x-Math.floor(t.x);break;case yi:t.x=t.x<0?0:1;break;case Gr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ke:t.y=t.y-Math.floor(t.y);break;case yi:t.y=t.y<0?0:1;break;case Gr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=El;ze.DEFAULT_ANISOTROPY=1;var ce=class n{static{n.prototype.isVector4=!0}constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],y=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-y)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+y)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,v=(d+1)/2,w=(m+1)/2,S=(u+h)/4,C=(f+y)/4,x=(g+p)/4;return E>v&&E>w?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=S/i,r=C/i):v>w?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=S/s,r=x/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=C/r,s=x/r),this.set(i,s,r,e),this}let M=Math.sqrt((p-g)*(p-g)+(f-y)*(f-y)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(f-y)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qr=class extends ui{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Se,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new ze(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Se,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Yn(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qe=class extends qr{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Es=class extends ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Yr=class extends ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ae=class n{static{n.prototype.isMatrix4=!0}constructor(t,e,i,s,r,a,o,l,c,u,f,h,d,g,y,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,u,f,h,d,g,y,p)}set(t,e,i,s,r,a,o,l,c,u,f,h,d,g,y,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=g,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/Ln.setFromMatrixColumn(t,0).length(),r=1/Ln.setFromMatrixColumn(t,1).length(),a=1/Ln.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=a*u,d=a*f,g=o*u,y=o*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=h-y*c,e[9]=-o*l,e[2]=y-h*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){let h=l*u,d=l*f,g=c*u,y=c*f;e[0]=h+y*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=d*o-g,e[6]=y+h*o,e[10]=a*l}else if(t.order==="ZXY"){let h=l*u,d=l*f,g=c*u,y=c*f;e[0]=h-y*o,e[4]=-a*f,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*u,e[9]=y-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let h=a*u,d=a*f,g=o*u,y=o*f;e[0]=l*u,e[4]=g*c-d,e[8]=h*c+y,e[1]=l*f,e[5]=y*c+h,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let h=a*l,d=a*c,g=o*l,y=o*c;e[0]=l*u,e[4]=y-h*f,e[8]=g*f+d,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=d*f+g,e[10]=h-y*f}else if(t.order==="XZY"){let h=a*l,d=a*c,g=o*l,y=o*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+y,e[5]=a*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=o*u,e[10]=y*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ou,t,zu)}lookAt(t,e,i){let s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),Vi.crossVectors(i,$e),Vi.lengthSq()===0&&(Math.abs(i.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),Vi.crossVectors(i,$e)),Vi.normalize(),cr.crossVectors($e,Vi),s[0]=Vi.x,s[4]=cr.x,s[8]=$e.x,s[1]=Vi.y,s[5]=cr.y,s[9]=$e.y,s[2]=Vi.z,s[6]=cr.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],y=i[6],p=i[10],m=i[14],M=i[3],E=i[7],v=i[11],w=i[15],S=s[0],C=s[4],x=s[8],T=s[12],P=s[1],I=s[5],L=s[9],W=s[13],X=s[2],U=s[6],B=s[10],z=s[14],q=s[3],j=s[7],et=s[11],ht=s[15];return r[0]=a*S+o*P+l*X+c*q,r[4]=a*C+o*I+l*U+c*j,r[8]=a*x+o*L+l*B+c*et,r[12]=a*T+o*W+l*z+c*ht,r[1]=u*S+f*P+h*X+d*q,r[5]=u*C+f*I+h*U+d*j,r[9]=u*x+f*L+h*B+d*et,r[13]=u*T+f*W+h*z+d*ht,r[2]=g*S+y*P+p*X+m*q,r[6]=g*C+y*I+p*U+m*j,r[10]=g*x+y*L+p*B+m*et,r[14]=g*T+y*W+p*z+m*ht,r[3]=M*S+E*P+v*X+w*q,r[7]=M*C+E*I+v*U+w*j,r[11]=M*x+E*L+v*B+w*et,r[15]=M*T+E*W+v*z+w*ht,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],y=t[7],p=t[11],m=t[15],M=l*d-c*h,E=o*d-c*f,v=o*h-l*f,w=a*d-c*u,S=a*h-l*u,C=a*f-o*u;return e*(y*M-p*E+m*v)-i*(g*M-p*w+m*S)+s*(g*E-y*w+m*C)-r*(g*v-y*S+p*C)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],y=t[13],p=t[14],m=t[15],M=e*o-i*a,E=e*l-s*a,v=e*c-r*a,w=i*l-s*o,S=i*c-r*o,C=s*c-r*l,x=u*y-f*g,T=u*p-h*g,P=u*m-d*g,I=f*p-h*y,L=f*m-d*y,W=h*m-d*p,X=M*W-E*L+v*I+w*P-S*T+C*x;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/X;return t[0]=(o*W-l*L+c*I)*U,t[1]=(s*L-i*W-r*I)*U,t[2]=(y*C-p*S+m*w)*U,t[3]=(h*S-f*C-d*w)*U,t[4]=(l*P-a*W-c*T)*U,t[5]=(e*W-s*P+r*T)*U,t[6]=(p*v-g*C-m*E)*U,t[7]=(u*C-h*v+d*E)*U,t[8]=(a*L-o*P+c*x)*U,t[9]=(i*P-e*L-r*x)*U,t[10]=(g*S-y*v+m*M)*U,t[11]=(f*v-u*S-d*M)*U,t[12]=(o*T-a*I-l*x)*U,t[13]=(e*I-i*T+s*x)*U,t[14]=(y*E-g*w-p*M)*U,t[15]=(u*w-f*E+h*M)*U,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,f=o+o,h=r*c,d=r*u,g=r*f,y=a*u,p=a*f,m=o*f,M=l*c,E=l*u,v=l*f,w=i.x,S=i.y,C=i.z;return s[0]=(1-(y+m))*w,s[1]=(d+v)*w,s[2]=(g-E)*w,s[3]=0,s[4]=(d-v)*S,s[5]=(1-(h+m))*S,s[6]=(p+M)*S,s[7]=0,s[8]=(g+E)*C,s[9]=(p-M)*C,s[10]=(1-(h+y))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Ln.set(s[0],s[1],s[2]).length(),o=Ln.set(s[4],s[5],s[6]).length(),l=Ln.set(s[8],s[9],s[10]).length();r<0&&(a=-a),oi.copy(this);let c=1/a,u=1/o,f=1/l;return oi.elements[0]*=c,oi.elements[1]*=c,oi.elements[2]*=c,oi.elements[4]*=u,oi.elements[5]*=u,oi.elements[6]*=u,oi.elements[8]*=f,oi.elements[9]*=f,oi.elements[10]*=f,e.setFromRotationMatrix(oi),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=hi,l=!1){let c=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),d=(i+s)/(i-s),g,y;if(l)g=r/(a-r),y=a*r/(a-r);else if(o===hi)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Xn)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=hi,l=!1){let c=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),d=-(i+s)/(i-s),g,y;if(l)g=1/(a-r),y=a/(a-r);else if(o===hi)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===Xn)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ln=new R,oi=new ae,Ou=new R(0,0,0),zu=new R(1,1,1),Vi=new R,cr=new R,$e=new R,bc=new ae,Sc=new je,ti=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-kt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:wt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return bc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(bc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sc.setFromEuler(this),this.setFromQuaternion(Sc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ti.DEFAULT_ORDER="XYZ";var Ts=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ku=0,Ec=new R,Dn=new je,wi=new ae,hr=new R,us=new R,Vu=new R,Hu=new je,Tc=new R(1,0,0),wc=new R(0,1,0),Ac=new R(0,0,1),Cc={type:"added"},Gu={type:"removed"},Nn={type:"childadded",child:null},Do={type:"childremoved",child:null},Me=class n extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new R,e=new ti,i=new je,s=new R(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new Ft}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Dn.setFromAxisAngle(t,e),this.quaternion.multiply(Dn),this}rotateOnWorldAxis(t,e){return Dn.setFromAxisAngle(t,e),this.quaternion.premultiply(Dn),this}rotateX(t){return this.rotateOnAxis(Tc,t)}rotateY(t){return this.rotateOnAxis(wc,t)}rotateZ(t){return this.rotateOnAxis(Ac,t)}translateOnAxis(t,e){return Ec.copy(t).applyQuaternion(this.quaternion),this.position.add(Ec.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Tc,t)}translateY(t){return this.translateOnAxis(wc,t)}translateZ(t){return this.translateOnAxis(Ac,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?hr.copy(t):hr.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(us,hr,this.up):wi.lookAt(hr,us,this.up),this.quaternion.setFromRotationMatrix(wi),s&&(wi.extractRotation(s.matrixWorld),Dn.setFromRotationMatrix(wi),this.quaternion.premultiply(Dn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Lt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Cc),Nn.child=t,this.dispatchEvent(Nn),Nn.child=null):Lt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Gu),Do.child=t,this.dispatchEvent(Do),Do.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Cc),Nn.child=t,this.dispatchEvent(Nn),Nn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,t,Vu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(us,Hu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Me.DEFAULT_UP=new R(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Pe=class extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}},Wu={type:"move"},$n=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,i),m=this._getHandJoint(c,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wu)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Pe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Ch={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},ur={h:0,s:0,l:0};function No(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Pt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=$t.workingColorSpace){if(t=Nl(t,1),e=kt(e,0,1),i=kt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=No(a,r,t+1/3),this.g=No(a,r,t),this.b=No(a,r,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,e=Je){function i(r){r!==void 0&&parseFloat(r)<1&&wt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:wt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);wt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){let i=Ch[t.toLowerCase()];return i!==void 0?this.setHex(i,e):wt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ii(t.r),this.g=Ii(t.g),this.b=Ii(t.b),this}copyLinearToSRGB(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return $t.workingToColorSpace(Ue.copy(this),t),Math.round(kt(Ue.r*255,0,255))*65536+Math.round(kt(Ue.g*255,0,255))*256+Math.round(kt(Ue.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Ue.copy(this),e);let i=Ue.r,s=Ue.g,r=Ue.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Je){$t.workingToColorSpace(Ue.copy(this),t);let e=Ue.r,i=Ue.g,s=Ue.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Hi),this.setHSL(Hi.h+t,Hi.s+e,Hi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Hi),t.getHSL(ur);let i=xs(Hi.h,ur.h,e),s=xs(Hi.s,ur.s,e),r=xs(Hi.l,ur.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ue=new Pt;Pt.NAMES=Ch;var ws=class n{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Pt(t),this.density=e}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var As=class extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},li=new R,Ai=new R,Fo=new R,Ci=new R,Fn=new R,Un=new R,Rc=new R,Uo=new R,Bo=new R,Oo=new R,zo=new ce,ko=new ce,Vo=new ce,Yi=class n{constructor(t=new R,e=new R,i=new R){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),li.subVectors(t,e),s.cross(li);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){li.subVectors(s,e),Ai.subVectors(i,e),Fo.subVectors(t,e);let a=li.dot(li),o=li.dot(Ai),l=li.dot(Fo),c=Ai.dot(Ai),u=Ai.dot(Fo),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let h=1/f,d=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ci.x),l.addScaledVector(a,Ci.y),l.addScaledVector(o,Ci.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return zo.setScalar(0),ko.setScalar(0),Vo.setScalar(0),zo.fromBufferAttribute(t,e),ko.fromBufferAttribute(t,i),Vo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(zo,r.x),a.addScaledVector(ko,r.y),a.addScaledVector(Vo,r.z),a}static isFrontFacing(t,e,i,s){return li.subVectors(i,e),Ai.subVectors(t,e),li.cross(Ai).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return li.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),li.cross(Ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;Fn.subVectors(s,i),Un.subVectors(r,i),Uo.subVectors(t,i);let l=Fn.dot(Uo),c=Un.dot(Uo);if(l<=0&&c<=0)return e.copy(i);Bo.subVectors(t,s);let u=Fn.dot(Bo),f=Un.dot(Bo);if(u>=0&&f<=u)return e.copy(s);let h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector(Fn,a);Oo.subVectors(t,r);let d=Fn.dot(Oo),g=Un.dot(Oo);if(g>=0&&d<=g)return e.copy(r);let y=d*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Un,o);let p=u*g-d*f;if(p<=0&&f-u>=0&&d-g>=0)return Rc.subVectors(r,s),o=(f-u)/(f-u+(d-g)),e.copy(s).addScaledVector(Rc,o);let m=1/(p+y+h);return a=y*m,o=h*m,e.copy(i).addScaledVector(Fn,a).addScaledVector(Un,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Zi=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ci.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ci.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=ci.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ci):ci.fromBufferAttribute(r,a),ci.applyMatrix4(t.matrixWorld),this.expandByPoint(ci);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),dr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),dr.copy(i.boundingBox)),dr.applyMatrix4(t.matrixWorld),this.union(dr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ci),ci.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ds),fr.subVectors(this.max,ds),Bn.subVectors(t.a,ds),On.subVectors(t.b,ds),zn.subVectors(t.c,ds),Gi.subVectors(On,Bn),Wi.subVectors(zn,On),dn.subVectors(Bn,zn);let e=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-dn.z,dn.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,dn.z,0,-dn.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-dn.y,dn.x,0];return!Ho(e,Bn,On,zn,fr)||(e=[1,0,0,0,1,0,0,0,1],!Ho(e,Bn,On,zn,fr))?!1:(pr.crossVectors(Gi,Wi),e=[pr.x,pr.y,pr.z],Ho(e,Bn,On,zn,fr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ci).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ci).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ri=[new R,new R,new R,new R,new R,new R,new R,new R],ci=new R,dr=new Zi,Bn=new R,On=new R,zn=new R,Gi=new R,Wi=new R,dn=new R,ds=new R,fr=new R,pr=new R,fn=new R;function Ho(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){fn.fromArray(n,r);let o=s.x*Math.abs(fn.x)+s.y*Math.abs(fn.y)+s.z*Math.abs(fn.z),l=t.dot(fn),c=e.dot(fn),u=i.dot(fn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var ye=new R,mr=new gt,Xu=0,ve=class extends ui{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=al,this.updateRanges=[],this.gpuType=pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)mr.fromBufferAttribute(this,e),mr.applyMatrix3(t),this.setXY(e,mr.x,mr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Gn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Oe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),i=Oe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),i=Oe(i,this.array),s=Oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),i=Oe(i,this.array),s=Oe(s,this.array),r=Oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==al&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}};var Cs=class extends ve{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Rs=class extends ve{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Vt=class extends ve{constructor(t,e,i){super(new Float32Array(t),e,i)}},qu=new Zi,fs=new R,Go=new R,Ji=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):qu.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fs.subVectors(t,this.center);let e=fs.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(fs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Go.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fs.copy(t.center).add(Go)),this.expandByPoint(fs.copy(t.center).sub(Go))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Yu=0,si=new ae,Wo=new Me,kn=new R,Ze=new Zi,ps=new Zi,Ce=new R,ne=class n extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xu(t)?Rs:Cs)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ft().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return si.makeRotationFromQuaternion(t),this.applyMatrix4(si),this}rotateX(t){return si.makeRotationX(t),this.applyMatrix4(si),this}rotateY(t){return si.makeRotationY(t),this.applyMatrix4(si),this}rotateZ(t){return si.makeRotationZ(t),this.applyMatrix4(si),this}translate(t,e,i){return si.makeTranslation(t,e,i),this.applyMatrix4(si),this}scale(t,e,i){return si.makeScale(t,e,i),this.applyMatrix4(si),this}lookAt(t){return Wo.lookAt(t),Wo.updateMatrix(),this.applyMatrix4(Wo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kn).negate(),this.translate(kn.x,kn.y,kn.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Vt(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&wt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ji);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let i=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ps.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(Ze.min,ps.min),Ze.expandByPoint(Ce),Ce.addVectors(Ze.max,ps.max),Ze.expandByPoint(Ce)):(Ze.expandByPoint(ps.min),Ze.expandByPoint(ps.max))}Ze.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ce.fromBufferAttribute(o,c),l&&(kn.fromBufferAttribute(t,c),Ce.add(kn)),s=Math.max(s,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ve(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new R,l[x]=new R;let c=new R,u=new R,f=new R,h=new gt,d=new gt,g=new gt,y=new R,p=new R;function m(x,T,P){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,P),h.fromBufferAttribute(r,x),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),u.sub(c),f.sub(c),d.sub(h),g.sub(h);let I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(I),p.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(I),o[x].add(y),o[T].add(y),o[P].add(y),l[x].add(p),l[T].add(p),l[P].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let x=0,T=M.length;x<T;++x){let P=M[x],I=P.start,L=P.count;for(let W=I,X=I+L;W<X;W+=3)m(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let E=new R,v=new R,w=new R,S=new R;function C(x){w.fromBufferAttribute(s,x),S.copy(w);let T=o[x];E.copy(T),E.sub(w.multiplyScalar(w.dot(T))).normalize(),v.crossVectors(S,T);let I=v.dot(l[x])<0?-1:1;a.setXYZW(x,E.x,E.y,E.z,I)}for(let x=0,T=M.length;x<T;++x){let P=M[x],I=P.start,L=P.count;for(let W=I,X=I+L;W<X;W+=3)C(t.getX(W+0)),C(t.getX(W+1)),C(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ve(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);let s=new R,r=new R,a=new R,o=new R,l=new R,c=new R,u=new R,f=new R;if(t)for(let h=0,d=t.count;h<d;h+=3){let g=t.getX(h+0),y=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,p),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u),d=0,g=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*u;for(let m=0;m<u;m++)h[g++]=c[d++]}return new ve(h,u,f)}if(this.index===null)return wt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){let h=c[u],d=t(h,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){let d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],f=r[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var $u=0,Mi=class extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=rs(),this.name="",this.type="Material",this.blending=Di,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nr,this.blendDst=Fr,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=_n,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gn,this.stencilZFail=gn,this.stencilZPass=gn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){wt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){wt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(i.blending=this.blending),this.side!==Li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Nr&&(i.blendSrc=this.blendSrc),this.blendDst!==Fr&&(i.blendDst=this.blendDst),this.blendEquation!==$i&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_n&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==gn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==gn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Pt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new gt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new gt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Pi=new R,Xo=new R,gr=new R,Xi=new R,qo=new R,xr=new R,Yo=new R,Ki=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Pi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pi.copy(this.origin).addScaledVector(this.direction,e),Pi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Xo.copy(t).add(e).multiplyScalar(.5),gr.copy(e).sub(t).normalize(),Xi.copy(this.origin).sub(Xo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(gr),o=Xi.dot(this.direction),l=-Xi.dot(gr),c=Xi.lengthSq(),u=Math.abs(1-a*a),f,h,d,g;if(u>0)if(f=a*l-o,h=a*o-l,g=r*u,f>=0)if(h>=-g)if(h<=g){let y=1/u;f*=y,h*=y,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Xo).addScaledVector(gr,h),d}intersectSphere(t,e){Pi.subVectors(t.center,this.origin);let i=Pi.dot(this.direction),s=Pi.dot(Pi)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,e,i,s,r){qo.subVectors(e,t),xr.subVectors(i,t),Yo.crossVectors(qo,xr);let a=this.direction.dot(Yo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xi.subVectors(this.origin,t);let l=o*this.direction.dot(xr.crossVectors(Xi,xr));if(l<0)return null;let c=o*this.direction.dot(qo.cross(Xi));if(c<0||l+c>a)return null;let u=-o*Xi.dot(Yo);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ke=class extends Mi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Pc=new ae,pn=new Ki,_r=new Ji,Ic=new R,yr=new R,vr=new R,Mr=new R,$o=new R,br=new R,Lc=new R,Sr=new R,nt=class extends Me{constructor(t=new ne,e=new ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){br.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],f=r[l];u!==0&&($o.fromBufferAttribute(f,t),a?br.addScaledVector($o,u):br.addScaledVector($o.sub(e),u))}e.add(br)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_r.copy(i.boundingSphere),_r.applyMatrix4(r),pn.copy(t.ray).recast(t.near),!(_r.containsPoint(pn.origin)===!1&&(pn.intersectSphere(_r,Ic)===null||pn.origin.distanceToSquared(Ic)>(t.far-t.near)**2))&&(Pc.copy(r).invert(),pn.copy(t.ray).applyMatrix4(Pc),!(i.boundingBox!==null&&pn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,pn)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){let p=h[g],m=a[p.materialIndex],M=Math.max(p.start,d.start),E=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let v=M,w=E;v<w;v+=3){let S=o.getX(v),C=o.getX(v+1),x=o.getX(v+2);s=Er(this,m,t,i,c,u,f,S,C,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let p=g,m=y;p<m;p+=3){let M=o.getX(p),E=o.getX(p+1),v=o.getX(p+2);s=Er(this,a,t,i,c,u,f,M,E,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=h.length;g<y;g++){let p=h[g],m=a[p.materialIndex],M=Math.max(p.start,d.start),E=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let v=M,w=E;v<w;v+=3){let S=v,C=v+1,x=v+2;s=Er(this,m,t,i,c,u,f,S,C,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let p=g,m=y;p<m;p+=3){let M=p,E=p+1,v=p+2;s=Er(this,a,t,i,c,u,f,M,E,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Zu(n,t,e,i,s,r,a,o){let l;if(t.side===Ve?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Li,o),l===null)return null;Sr.copy(o),Sr.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Sr);return c<e.near||c>e.far?null:{distance:c,point:Sr.clone(),object:n}}function Er(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,yr),n.getVertexPosition(l,vr),n.getVertexPosition(c,Mr);let u=Zu(n,t,e,i,yr,vr,Mr,Lc);if(u){let f=new R;Yi.getBarycoord(Lc,yr,vr,Mr,f),s&&(u.uv=Yi.getInterpolatedAttribute(s,o,l,c,f,new gt)),r&&(u.uv1=Yi.getInterpolatedAttribute(r,o,l,c,f,new gt)),a&&(u.normal=Yi.getInterpolatedAttribute(a,o,l,c,f,new R),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new R,materialIndex:0};Yi.getNormal(yr,vr,Mr,h.normal),u.face=h,u.barycoord=f}return u}var $r=class extends ze{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Ie,u=Ie,f,h){super(null,a,o,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zo=new R,Ju=new R,Ku=new Ft,We=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Zo.subVectors(i,e).cross(Ju.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(Zo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Ku.getNormalMatrix(t),s=this.coplanarPoint(Zo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},mn=new Ji,ju=new gt(.5,.5),Tr=new R,Zn=class{constructor(t=new We,e=new We,i=new We,s=new We,r=new We,a=new We){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=hi,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],d=r[7],g=r[8],y=r[9],p=r[10],m=r[11],M=r[12],E=r[13],v=r[14],w=r[15];if(s[0].setComponents(c-a,d-u,m-g,w-M).normalize(),s[1].setComponents(c+a,d+u,m+g,w+M).normalize(),s[2].setComponents(c+o,d+f,m+y,w+E).normalize(),s[3].setComponents(c-o,d-f,m-y,w-E).normalize(),i)s[4].setComponents(l,h,p,v).normalize(),s[5].setComponents(c-l,d-h,m-p,w-v).normalize();else if(s[4].setComponents(c-l,d-h,m-p,w-v).normalize(),e===hi)s[5].setComponents(c+l,d+h,m+p,w+v).normalize();else if(e===Xn)s[5].setComponents(l,h,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),mn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),mn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(mn)}intersectsSprite(t){mn.center.set(0,0,0);let e=ju.distanceTo(t.center);return mn.radius=.7071067811865476+e,mn.applyMatrix4(t.matrixWorld),this.intersectsSphere(mn)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Tr.x=s.normal.x>0?t.max.x:t.min.x,Tr.y=s.normal.y>0?t.max.y:t.min.y,Tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Tr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ji=class extends Mi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Zr=new R,Jr=new R,Dc=new ae,ms=new Ki,wr=new Ji,Jo=new R,Nc=new R,vn=class extends Me{constructor(t=new ne,e=new ji){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Zr.fromBufferAttribute(e,s-1),Jr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Zr.distanceTo(Jr);t.setAttribute("lineDistance",new Vt(i,1))}else wt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wr.copy(i.boundingSphere),wr.applyMatrix4(s),wr.radius+=r,t.ray.intersectsSphere(wr)===!1)return;Dc.copy(s).invert(),ms.copy(t.ray).applyMatrix4(Dc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){let d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=d,p=g-1;y<p;y+=c){let m=u.getX(y),M=u.getX(y+1),E=Ar(this,t,ms,l,m,M,y);E&&e.push(E)}if(this.isLineLoop){let y=u.getX(g-1),p=u.getX(d),m=Ar(this,t,ms,l,y,p,g-1);m&&e.push(m)}}else{let d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=d,p=g-1;y<p;y+=c){let m=Ar(this,t,ms,l,y,y+1,y);m&&e.push(m)}if(this.isLineLoop){let y=Ar(this,t,ms,l,g-1,d,g-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ar(n,t,e,i,s,r,a){let o=n.geometry.attributes.position;if(Zr.fromBufferAttribute(o,s),Jr.fromBufferAttribute(o,r),e.distanceSqToSegment(Zr,Jr,Jo,Nc)>i)return;Jo.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Jo);if(!(c<t.near||c>t.far))return{distance:c,point:Nc.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Fc=new R,Uc=new R,Kr=class extends vn{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Fc.fromBufferAttribute(e,s),Uc.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Fc.distanceTo(Uc);t.setAttribute("lineDistance",new Vt(i,1))}else wt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Qi=class extends Mi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Bc=new ae,ol=new Ki,Cr=new Ji,Rr=new R,Mn=class extends Me{constructor(t=new ne,e=new Qi){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cr.copy(i.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;Bc.copy(s).invert(),ol.copy(t.ray).applyMatrix4(Bc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let g=h,y=d;g<y;g++){let p=c.getX(g);Rr.fromBufferAttribute(f,p),Oc(Rr,p,l,s,t,e,this)}}else{let h=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let g=h,y=d;g<y;g++)Rr.fromBufferAttribute(f,g),Oc(Rr,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Oc(n,t,e,i,s,r,a){let o=ol.distanceSqToPoint(n);if(o<e){let l=new R;ol.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Ps=class extends ze{constructor(t=[],e=an,i,s,r,a,o,l,c,u){super(t,e,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},De=class extends ze{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ni=class extends ze{constructor(t,e,i=fi,s,r,a,o=Ie,l=Ie,c,u=vi,f=1){if(u!==vi&&u!==ln)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Yn(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},jr=class extends Ni{constructor(t,e=fi,i=an,s,r,a=Ie,o=Ie,l,c=vi){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Is=class extends ze{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},ge=class n extends ne{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],f=[],h=0,d=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(f,2));function g(y,p,m,M,E,v,w,S,C,x,T){let P=v/C,I=w/x,L=v/2,W=w/2,X=S/2,U=C+1,B=x+1,z=0,q=0,j=new R;for(let et=0;et<B;et++){let ht=et*I-W;for(let xt=0;xt<U;xt++){let Yt=xt*P-L;j[y]=Yt*M,j[p]=ht*E,j[m]=X,c.push(j.x,j.y,j.z),j[y]=0,j[p]=0,j[m]=S>0?1:-1,u.push(j.x,j.y,j.z),f.push(xt/C),f.push(1-et/x),z+=1}}for(let et=0;et<x;et++)for(let ht=0;ht<C;ht++){let xt=h+ht+U*et,Yt=h+ht+U*(et+1),jt=h+(ht+1)+U*(et+1),Gt=h+(ht+1)+U*et;l.push(xt,Yt,Gt),l.push(Yt,jt,Gt),q+=6}o.addGroup(d,q,T),d+=q,h+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ot=class n extends ne{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],h=[],d=[],g=0,y=[],p=i/2,m=0;M(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Vt(f,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(d,2));function M(){let v=new R,w=new R,S=0,C=(e-t)/i;for(let x=0;x<=r;x++){let T=[],P=x/r,I=P*(e-t)+t;for(let L=0;L<=s;L++){let W=L/s,X=W*l+o,U=Math.sin(X),B=Math.cos(X);w.x=I*U,w.y=-P*i+p,w.z=I*B,f.push(w.x,w.y,w.z),v.set(U,C,B).normalize(),h.push(v.x,v.y,v.z),d.push(W,1-P),T.push(g++)}y.push(T)}for(let x=0;x<s;x++)for(let T=0;T<r;T++){let P=y[T][x],I=y[T+1][x],L=y[T+1][x+1],W=y[T][x+1];(t>0||T!==0)&&(u.push(P,I,W),S+=3),(e>0||T!==r-1)&&(u.push(I,L,W),S+=3)}c.addGroup(m,S,0),m+=S}function E(v){let w=g,S=new gt,C=new R,x=0,T=v===!0?t:e,P=v===!0?1:-1;for(let L=1;L<=s;L++)f.push(0,p*P,0),h.push(0,P,0),d.push(.5,.5),g++;let I=g;for(let L=0;L<=s;L++){let X=L/s*l+o,U=Math.cos(X),B=Math.sin(X);C.x=T*B,C.y=p*P,C.z=T*U,f.push(C.x,C.y,C.z),h.push(0,P,0),S.x=U*.5+.5,S.y=B*.5*P+.5,d.push(S.x,S.y),g++}for(let L=0;L<s;L++){let W=w+L,X=I+L;v===!0?u.push(X,X+1,W):u.push(X+1,X,W),x+=3}c.addGroup(m,x,v===!0?1:2),m+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ls=class n extends Ot{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Jn=class n extends ne{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(r.slice(),3)),this.setAttribute("uv",new Vt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let E=new R,v=new R,w=new R;for(let S=0;S<e.length;S+=3)d(e[S+0],E),d(e[S+1],v),d(e[S+2],w),l(E,v,w,M)}function l(M,E,v,w){let S=w+1,C=[];for(let x=0;x<=S;x++){C[x]=[];let T=M.clone().lerp(v,x/S),P=E.clone().lerp(v,x/S),I=S-x;for(let L=0;L<=I;L++)L===0&&x===S?C[x][L]=T:C[x][L]=T.clone().lerp(P,L/I)}for(let x=0;x<S;x++)for(let T=0;T<2*(S-x)-1;T++){let P=Math.floor(T/2);T%2===0?(h(C[x][P+1]),h(C[x+1][P]),h(C[x][P])):(h(C[x][P+1]),h(C[x+1][P+1]),h(C[x+1][P]))}}function c(M){let E=new R;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(M),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function u(){let M=new R;for(let E=0;E<r.length;E+=3){M.x=r[E+0],M.y=r[E+1],M.z=r[E+2];let v=p(M)/2/Math.PI+.5,w=m(M)/Math.PI+.5;a.push(v,1-w)}g(),f()}function f(){for(let M=0;M<a.length;M+=6){let E=a[M+0],v=a[M+2],w=a[M+4],S=Math.max(E,v,w),C=Math.min(E,v,w);S>.9&&C<.1&&(E<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),w<.2&&(a[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function d(M,E){let v=M*3;E.x=t[v+0],E.y=t[v+1],E.z=t[v+2]}function g(){let M=new R,E=new R,v=new R,w=new R,S=new gt,C=new gt,x=new gt;for(let T=0,P=0;T<r.length;T+=9,P+=6){M.set(r[T+0],r[T+1],r[T+2]),E.set(r[T+3],r[T+4],r[T+5]),v.set(r[T+6],r[T+7],r[T+8]),S.set(a[P+0],a[P+1]),C.set(a[P+2],a[P+3]),x.set(a[P+4],a[P+5]),w.copy(M).add(E).add(v).divideScalar(3);let I=p(w);y(S,P+0,M,I),y(C,P+2,E,I),y(x,P+4,v,I)}}function y(M,E,v,w){w<0&&M.x===1&&(a[E]=M.x-1),v.x===0&&v.z===0&&(a[E]=w/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.detail)}},Ds=class n extends Jn{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var ri=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){wt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let u=i[s],h=i[s+1]-u,d=(a-u)/h;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new gt:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new R,s=[],r=[],a=[],o=new R,l=new ae;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(kt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(kt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Ns=class extends ri{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new gt){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*f+this.aX,c=h*f+d*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Qr=class extends Ns{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ul(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,f){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,s(a,o,h,d)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var zc=new R,kc=new R,Ko=new Ul,jo=new Ul,Qo=new Ul,Kn=class extends ri{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new R){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(kc.subVectors(s[0],s[1]).add(s[0]),c=kc);let f=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(zc.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=zc),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),d),y=Math.pow(f.distanceToSquared(h),d),p=Math.pow(h.distanceToSquared(u),d);y<1e-4&&(y=1),g<1e-4&&(g=y),p<1e-4&&(p=y),Ko.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,g,y,p),jo.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,g,y,p),Qo.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,g,y,p)}else this.curveType==="catmullrom"&&(Ko.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),jo.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),Qo.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(Ko.calc(l),jo.calc(l),Qo.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new R().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Vc(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function Qu(n,t){let e=1-n;return e*e*t}function td(n,t){return 2*(1-n)*n*t}function ed(n,t){return n*n*t}function _s(n,t,e,i){return Qu(n,t)+td(n,e)+ed(n,i)}function id(n,t){let e=1-n;return e*e*e*t}function nd(n,t){let e=1-n;return 3*e*e*n*t}function sd(n,t){return 3*(1-n)*n*n*t}function rd(n,t){return n*n*n*t}function ys(n,t,e,i,s){return id(n,t)+nd(n,e)+sd(n,i)+rd(n,s)}var ta=class extends ri{constructor(t=new gt,e=new gt,i=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new gt){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ys(t,s.x,r.x,a.x,o.x),ys(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ea=class extends ri{constructor(t=new R,e=new R,i=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new R){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ys(t,s.x,r.x,a.x,o.x),ys(t,s.y,r.y,a.y,o.y),ys(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ia=class extends ri{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},na=class extends ri{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sa=class extends ri{constructor(t=new gt,e=new gt,i=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new gt){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(_s(t,s.x,r.x,a.x),_s(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fs=class extends ri{constructor(t=new R,e=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new R){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(_s(t,s.x,r.x,a.x),_s(t,s.y,r.y,a.y),_s(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ra=class extends ri{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return i.set(Vc(o,l.x,c.x,u.x,f.x),Vc(o,l.y,c.y,u.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new gt().fromArray(s))}return this}},ad=Object.freeze({__proto__:null,ArcCurve:Qr,CatmullRomCurve3:Kn,CubicBezierCurve:ta,CubicBezierCurve3:ea,EllipseCurve:Ns,LineCurve:ia,LineCurve3:na,QuadraticBezierCurve:sa,QuadraticBezierCurve3:Fs,SplineCurve:ra});var Us=class n extends Jn{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var Bs=class n extends Jn{constructor(t=1,e=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},Fi=class n extends ne{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,f=t/o,h=e/l,d=[],g=[],y=[],p=[];for(let m=0;m<u;m++){let M=m*h-a;for(let E=0;E<c;E++){let v=E*f-r;g.push(v,-M,0),y.push(0,0,1),p.push(E/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){let E=M+c*m,v=M+c*(m+1),w=M+1+c*(m+1),S=M+1+c*m;d.push(E,v,S),d.push(v,w,S)}this.setIndex(d),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(y,3)),this.setAttribute("uv",new Vt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},jn=class n extends ne{constructor(t=.5,e=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],u=[],f=t,h=(e-t)/s,d=new R,g=new gt;for(let y=0;y<=s;y++){for(let p=0;p<=i;p++){let m=r+p/i*a;d.x=f*Math.cos(m),d.y=f*Math.sin(m),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}f+=h}for(let y=0;y<s;y++){let p=y*(i+1);for(let m=0;m<i;m++){let M=m+p,E=M,v=M+i+1,w=M+i+2,S=M+1;o.push(E,v,S),o.push(v,w,S)}}this.setIndex(o),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(c,3)),this.setAttribute("uv",new Vt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var bn=class n extends ne{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,u=[],f=new R,h=new R,d=[],g=[],y=[],p=[];for(let m=0;m<=i;m++){let M=[],E=m/i,v=a+E*o,w=t*Math.cos(v),S=Math.sqrt(t*t-w*w),C=0;m===0&&a===0?C=.5/e:m===i&&l===Math.PI&&(C=-.5/e);for(let x=0;x<=e;x++){let T=x/e,P=s+T*r;f.x=-S*Math.cos(P),f.y=w,f.z=S*Math.sin(P),g.push(f.x,f.y,f.z),h.copy(f).normalize(),y.push(h.x,h.y,h.z),p.push(T+C,1-E),M.push(c++)}u.push(M)}for(let m=0;m<i;m++)for(let M=0;M<e;M++){let E=u[m][M+1],v=u[m][M],w=u[m+1][M],S=u[m+1][M+1];(m!==0||a>0)&&d.push(E,v,S),(m!==i-1||l<Math.PI)&&d.push(v,w,S)}this.setIndex(d),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(y,3)),this.setAttribute("uv",new Vt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ui=class n extends ne{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],u=[],f=[],h=new R,d=new R,g=new R;for(let y=0;y<=i;y++){let p=a+y/i*o;for(let m=0;m<=s;m++){let M=m/s*r;d.x=(t+e*Math.cos(p))*Math.cos(M),d.y=(t+e*Math.cos(p))*Math.sin(M),d.z=e*Math.sin(p),c.push(d.x,d.y,d.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),g.subVectors(d,h).normalize(),u.push(g.x,g.y,g.z),f.push(m/s),f.push(y/i)}}for(let y=1;y<=i;y++)for(let p=1;p<=s;p++){let m=(s+1)*y+p-1,M=(s+1)*(y-1)+p-1,E=(s+1)*(y-1)+p,v=(s+1)*y+p;l.push(m,M,v),l.push(M,E,v)}this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Os=class n extends ne{constructor(t=new Fs(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new R,l=new R,c=new gt,u=new R,f=[],h=[],d=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new Vt(f,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(d,2));function y(){for(let E=0;E<e;E++)p(E);p(r===!1?e:0),M(),m()}function p(E){u=t.getPointAt(E/e,u);let v=a.normals[E],w=a.binormals[E];for(let S=0;S<=s;S++){let C=S/s*Math.PI*2,x=Math.sin(C),T=-Math.cos(C);l.x=T*v.x+x*w.x,l.y=T*v.y+x*w.y,l.z=T*v.z+x*w.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=u.x+i*l.x,o.y=u.y+i*l.y,o.z=u.z+i*l.z,f.push(o.x,o.y,o.z)}}function m(){for(let E=1;E<=e;E++)for(let v=1;v<=s;v++){let w=(s+1)*(E-1)+(v-1),S=(s+1)*E+(v-1),C=(s+1)*E+v,x=(s+1)*(E-1)+v;g.push(w,S,x),g.push(S,C,x)}}function M(){for(let E=0;E<=e;E++)for(let v=0;v<=s;v++)c.x=E/e,c.y=v/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new ad[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function wn(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(Hc(s))s.isRenderTargetTexture?(wt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Hc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Be(n){let t={};for(let e=0;e<n.length;e++){let i=wn(n[e]);for(let s in i)t[s]=i[s]}return t}function Hc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function od(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Bl(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}var Rh={clone:wn,merge:Be},ld=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ei=class extends Mi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ld,this.fragmentShader=cd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=wn(t.uniforms),this.uniformsGroups=od(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Pt().setHex(s.value);break;case"v2":this.uniforms[i].value=new gt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new R().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ce().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ft().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ae().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},aa=class extends ei{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},he=class extends Mi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ao,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var oa=class extends Mi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},la=class extends Mi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Pr(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}var tn=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ca=class extends tn{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:il,endingEnd:il}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case nl:r=t,o=2*e-i;break;case sl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case nl:a=t,l=2*i-e;break;case sl:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(i-e)/(s-e),y=g*g,p=y*g,m=-h*p+2*h*y-h*g,M=(1+h)*p+(-1.5-2*h)*y+(-.5+h)*g+1,E=(-1-d)*p+(1.5+d)*y+.5*g,v=d*p-d*y;for(let w=0;w!==o;++w)r[w]=m*a[u+w]+M*a[c+w]+E*a[l+w]+v*a[f+w];return r}},ha=class extends tn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(i-e)/(s-e),f=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*f+a[l+h]*u;return r}},ua=class extends tn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},da=class extends tn{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let g=(i-e)/(s-e),y=1-g;for(let p=0;p!==o;++p)r[p]=a[c+p]*y+a[l+p]*g;return r}let h=o*2,d=t-1;for(let g=0;g!==o;++g){let y=a[c+g],p=a[l+g],m=d*h+g*2,M=f[m],E=f[m+1],v=t*h+g*2,w=u[v],S=u[v+1],C=(i-e)/(s-e),x,T,P,I,L;for(let W=0;W<8;W++){x=C*C,T=x*C,P=1-C,I=P*P,L=I*P;let U=L*e+3*I*C*M+3*P*x*w+T*s-i;if(Math.abs(U)<1e-10)break;let B=3*I*(M-e)+6*P*C*(w-M)+3*x*(s-w);if(Math.abs(B)<1e-10)break;C=C-U/B,C=Math.max(0,Math.min(1,C))}r[g]=L*y+3*I*C*E+3*P*x*S+T*p}return r}},ii=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Pr(e,this.TimeBufferType),this.values=Pr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Pr(t.times,Array),values:Pr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ha(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ca(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new da(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case vs:e=this.InterpolantFactoryMethodDiscrete;break;case Wr:e=this.InterpolantFactoryMethodLinear;break;case Dr:e=this.InterpolantFactoryMethodSmooth;break;case el:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return wt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vs;case this.InterpolantFactoryMethodLinear:return Wr;case this.InterpolantFactoryMethodSmooth:return Dr;case this.InterpolantFactoryMethodBezier:return el}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Lt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Lt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Lt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Lt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&_u(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Lt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Dr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let f=o*i,h=f-i,d=f+i;for(let g=0;g!==i;++g){let y=e[f+g];if(y!==e[h+g]||y!==e[d+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*i,h=a*i;for(let d=0;d!==i;++d)e[h+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};ii.prototype.ValueTypeName="";ii.prototype.TimeBufferType=Float32Array;ii.prototype.ValueBufferType=Float32Array;ii.prototype.DefaultInterpolation=Wr;var en=class extends ii{constructor(t,e,i){super(t,e,i)}};en.prototype.ValueTypeName="bool";en.prototype.ValueBufferType=Array;en.prototype.DefaultInterpolation=vs;en.prototype.InterpolantFactoryMethodLinear=void 0;en.prototype.InterpolantFactoryMethodSmooth=void 0;var fa=class extends ii{constructor(t,e,i,s){super(t,e,i,s)}};fa.prototype.ValueTypeName="color";var pa=class extends ii{constructor(t,e,i,s){super(t,e,i,s)}};pa.prototype.ValueTypeName="number";var ma=class extends tn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)je.slerpFlat(r,0,a,c-o,a,c,l);return r}},zs=class extends ii{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new ma(this.times,this.values,this.getValueSize(),t)}};zs.prototype.ValueTypeName="quaternion";zs.prototype.InterpolantFactoryMethodSmooth=void 0;var nn=class extends ii{constructor(t,e,i){super(t,e,i)}};nn.prototype.ValueTypeName="string";nn.prototype.ValueBufferType=Array;nn.prototype.DefaultInterpolation=vs;nn.prototype.InterpolantFactoryMethodLinear=void 0;nn.prototype.InterpolantFactoryMethodSmooth=void 0;var ga=class extends ii{constructor(t,e,i,s){super(t,e,i,s)}};ga.prototype.ValueTypeName="vector";var xa=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ph=new xa,_a=class{constructor(t){this.manager=t!==void 0?t:Ph,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};_a.DEFAULT_MATERIAL_NAME="__DEFAULT";var Sn=class extends Me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},ks=class extends Sn{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},tl=new ae,Gc=new R,Wc=new R,Vs=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.mapType=Xe,this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zn,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Gc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gc),Wc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wc),e.updateMatrixWorld(),tl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tl,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Xn||e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(tl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Ir=new R,Lr=new je,_i=new R,Hs=class extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ir,Lr,_i),_i.x===1&&_i.y===1&&_i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ir,Lr,_i.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Ir,Lr,_i),_i.x===1&&_i.y===1&&_i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ir,Lr,_i.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},qi=new R,Xc=new gt,qc=new gt,Re=class extends Hs{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=yn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return yn*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qi.x,qi.y).multiplyScalar(-t/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qi.x,qi.y).multiplyScalar(-t/qi.z)}getViewSize(t,e){return this.getViewBounds(t,Xc,qc),e.subVectors(qc,Xc)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(gs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ll=class extends Vs{constructor(){super(new Re(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,i=yn*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Gs=class extends Sn{constructor(t,e,i=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new ll}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},cl=class extends Vs{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0}},En=class extends Sn{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new cl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Qn=class extends Hs{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},hl=class extends Vs{constructor(){super(new Qn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ws=class extends Sn{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new hl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Vn=-90,Hn=1,ya=class extends Me{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Re(Vn,Hn,t,e);s.layers=this.layers,this.add(s);let r=new Re(Vn,Hn,t,e);r.layers=this.layers,this.add(r);let a=new Re(Vn,Hn,t,e);a.layers=this.layers,this.add(a);let o=new Re(Vn,Hn,t,e);o.layers=this.layers,this.add(o);let l=new Re(Vn,Hn,t,e);l.layers=this.layers,this.add(l);let c=new Re(Vn,Hn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===hi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xn)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},va=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Ol="\\[\\]\\.:\\/",hd=new RegExp("["+Ol+"]","g"),zl="[^"+Ol+"]",ud="[^"+Ol.replace("\\.","")+"]",dd=/((?:WC+[\/:])*)/.source.replace("WC",zl),fd=/(WCOD+)?/.source.replace("WCOD",ud),pd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zl),md=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zl),gd=new RegExp("^"+dd+fd+pd+md+"$"),xd=["material","materials","bones","map"],ul=class{constructor(t,e,i){let s=i||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},oe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(hd,"")}static parseTrackName(t){let e=gd.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);xd.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){wt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Lt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=ul;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var A0=new Float32Array(1);var Xs=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,wt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}},ts=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=kt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(kt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var dl=class n{static{n.prototype.isMatrix2=!0}constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};var qs=class extends Kr{constructor(t=10,e=10,i=4473924,s=8947848){i=new Pt(i),s=new Pt(s);let r=e/2,a=t/e,o=t/2,l=[],c=[];for(let h=0,d=0,g=-o;h<=e;h++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let y=h===r?i:s;y.toArray(c,d),d+=3,y.toArray(c,d),d+=3,y.toArray(c,d),d+=3,y.toArray(c,d),d+=3}let u=new ne;u.setAttribute("position",new Vt(l,3)),u.setAttribute("color",new Vt(c,3));let f=new ji({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Ys=class extends ui{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){wt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function kl(n,t,e,i){let s=_d(i);switch(e){case Rl:return n*t;case Il:return n*t/s.components*s.byteLength;case Aa:return n*t/s.components*s.byteLength;case cn:return n*t*2/s.components*s.byteLength;case Ca:return n*t*2/s.components*s.byteLength;case Pl:return n*t*3/s.components*s.byteLength;case ai:return n*t*4/s.components*s.byteLength;case Ra:return n*t*4/s.components*s.byteLength;case js:case Qs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case tr:case er:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ia:case Da:return Math.max(n,16)*Math.max(t,8)/4;case Pa:case La:return Math.max(n,8)*Math.max(t,8)/2;case Na:case Fa:case Ba:case Oa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ua:case ir:case za:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ka:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Va:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case qa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case $a:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Za:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ka:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ja:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Qa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case to:case eo:case io:return Math.ceil(n/4)*Math.ceil(t/4)*16;case no:case so:return Math.ceil(n/4)*Math.ceil(t/4)*8;case nr:case ro:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function _d(n){switch(n){case Xe:case Tl:return{byteLength:1,components:1};case ns:case wl:case Si:return{byteLength:2,components:1};case Ta:case wa:return{byteLength:2,components:4};case fi:case Ea:case pi:return{byteLength:4,components:1};case Al:case Cl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?wt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Qh(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function vd(n){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){let u=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){let g=f[h],y=f[d];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++h,f[h]=y)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){let y=f[d];n.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Md=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bd=`#ifdef USE_ALPHAHASH
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
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Td=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ad=`#ifdef USE_AOMAP
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
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rd=`#ifdef USE_BATCHING
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
#endif`,Pd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ld=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nd=`#ifdef USE_IRIDESCENCE
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
#endif`,Fd=`#ifdef USE_BUMPMAP
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
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Wd=`#define PI 3.141592653589793
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
} // validated`,Xd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qd=`vec3 transformedNormal = objectNormal;
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
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$d=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kd="gl_FragColor = linearToOutputTexel( gl_FragColor );",jd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qd=`#ifdef USE_ENVMAP
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
#endif`,tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ef=`#ifdef USE_ENVMAP
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
#endif`,nf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
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
#endif`,rf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,of=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cf=`#ifdef USE_GRADIENTMAP
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
}`,hf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ff=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,pf=`#ifdef USE_ENVMAP
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
#endif`,mf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yf=`PhysicalMaterial material;
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
#endif`,vf=`uniform sampler2D dfgLUT;
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
}`,Mf=`
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
#endif`,bf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ef=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Tf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Af=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,If=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lf=`#if defined( USE_POINTS_UV )
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
#endif`,Df=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ff=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Uf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Of=`#ifdef USE_MORPHTARGETS
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
#endif`,zf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Vf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Xf=`#ifdef USE_NORMALMAP
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
#endif`,qf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$f=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ep=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ip=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ap=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,op=`float getShadowMask() {
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
}`,lp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cp=`#ifdef USE_SKINNING
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
#endif`,hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,up=`#ifdef USE_SKINNING
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
#endif`,dp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gp=`#ifdef USE_TRANSMISSION
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
#endif`,xp=`#ifdef USE_TRANSMISSION
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
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
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`#include <common>
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
}`,Rp=`#if DEPTH_PACKING == 3200
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
}`,Pp=`#define DISTANCE
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
}`,Ip=`#define DISTANCE
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
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Np=`uniform float scale;
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
}`,Fp=`uniform vec3 diffuse;
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
}`,Up=`#include <common>
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
}`,Bp=`uniform vec3 diffuse;
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
}`,Op=`#define LAMBERT
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
}`,zp=`#define LAMBERT
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
}`,kp=`#define MATCAP
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
}`,Vp=`#define MATCAP
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
}`,Hp=`#define NORMAL
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
}`,Gp=`#define NORMAL
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
}`,Wp=`#define PHONG
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
}`,Xp=`#define PHONG
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
}`,qp=`#define STANDARD
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
}`,Yp=`#define STANDARD
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
}`,$p=`#define TOON
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
}`,Zp=`#define TOON
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
}`,Jp=`uniform float size;
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
}`,Kp=`uniform vec3 diffuse;
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
}`,jp=`#include <common>
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
}`,Qp=`uniform vec3 color;
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
}`,tm=`uniform float rotation;
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
}`,em=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:Md,alphahash_pars_fragment:bd,alphamap_fragment:Sd,alphamap_pars_fragment:Ed,alphatest_fragment:Td,alphatest_pars_fragment:wd,aomap_fragment:Ad,aomap_pars_fragment:Cd,batching_pars_vertex:Rd,batching_vertex:Pd,begin_vertex:Id,beginnormal_vertex:Ld,bsdfs:Dd,iridescence_fragment:Nd,bumpmap_pars_fragment:Fd,clipping_planes_fragment:Ud,clipping_planes_pars_fragment:Bd,clipping_planes_pars_vertex:Od,clipping_planes_vertex:zd,color_fragment:kd,color_pars_fragment:Vd,color_pars_vertex:Hd,color_vertex:Gd,common:Wd,cube_uv_reflection_fragment:Xd,defaultnormal_vertex:qd,displacementmap_pars_vertex:Yd,displacementmap_vertex:$d,emissivemap_fragment:Zd,emissivemap_pars_fragment:Jd,colorspace_fragment:Kd,colorspace_pars_fragment:jd,envmap_fragment:Qd,envmap_common_pars_fragment:tf,envmap_pars_fragment:ef,envmap_pars_vertex:nf,envmap_physical_pars_fragment:pf,envmap_vertex:sf,fog_vertex:rf,fog_pars_vertex:af,fog_fragment:of,fog_pars_fragment:lf,gradientmap_pars_fragment:cf,lightmap_pars_fragment:hf,lights_lambert_fragment:uf,lights_lambert_pars_fragment:df,lights_pars_begin:ff,lights_toon_fragment:mf,lights_toon_pars_fragment:gf,lights_phong_fragment:xf,lights_phong_pars_fragment:_f,lights_physical_fragment:yf,lights_physical_pars_fragment:vf,lights_fragment_begin:Mf,lights_fragment_maps:bf,lights_fragment_end:Sf,lightprobes_pars_fragment:Ef,logdepthbuf_fragment:Tf,logdepthbuf_pars_fragment:wf,logdepthbuf_pars_vertex:Af,logdepthbuf_vertex:Cf,map_fragment:Rf,map_pars_fragment:Pf,map_particle_fragment:If,map_particle_pars_fragment:Lf,metalnessmap_fragment:Df,metalnessmap_pars_fragment:Nf,morphinstance_vertex:Ff,morphcolor_vertex:Uf,morphnormal_vertex:Bf,morphtarget_pars_vertex:Of,morphtarget_vertex:zf,normal_fragment_begin:kf,normal_fragment_maps:Vf,normal_pars_fragment:Hf,normal_pars_vertex:Gf,normal_vertex:Wf,normalmap_pars_fragment:Xf,clearcoat_normal_fragment_begin:qf,clearcoat_normal_fragment_maps:Yf,clearcoat_pars_fragment:$f,iridescence_pars_fragment:Zf,opaque_fragment:Jf,packing:Kf,premultiplied_alpha_fragment:jf,project_vertex:Qf,dithering_fragment:tp,dithering_pars_fragment:ep,roughnessmap_fragment:ip,roughnessmap_pars_fragment:np,shadowmap_pars_fragment:sp,shadowmap_pars_vertex:rp,shadowmap_vertex:ap,shadowmask_pars_fragment:op,skinbase_vertex:lp,skinning_pars_vertex:cp,skinning_vertex:hp,skinnormal_vertex:up,specularmap_fragment:dp,specularmap_pars_fragment:fp,tonemapping_fragment:pp,tonemapping_pars_fragment:mp,transmission_fragment:gp,transmission_pars_fragment:xp,uv_pars_fragment:_p,uv_pars_vertex:yp,uv_vertex:vp,worldpos_vertex:Mp,background_vert:bp,background_frag:Sp,backgroundCube_vert:Ep,backgroundCube_frag:Tp,cube_vert:wp,cube_frag:Ap,depth_vert:Cp,depth_frag:Rp,distance_vert:Pp,distance_frag:Ip,equirect_vert:Lp,equirect_frag:Dp,linedashed_vert:Np,linedashed_frag:Fp,meshbasic_vert:Up,meshbasic_frag:Bp,meshlambert_vert:Op,meshlambert_frag:zp,meshmatcap_vert:kp,meshmatcap_frag:Vp,meshnormal_vert:Hp,meshnormal_frag:Gp,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:qp,meshphysical_frag:Yp,meshtoon_vert:$p,meshtoon_frag:Zp,points_vert:Jp,points_frag:Kp,shadow_vert:jp,shadow_frag:Qp,sprite_vert:tm,sprite_frag:em},dt={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},Ti={basic:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Pt(0)},envMapIntensity:{value:1}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Be([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Be([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Be([dt.points,dt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Be([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Be([dt.common,dt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Be([dt.sprite,dt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distance:{uniforms:Be([dt.common,dt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distance_vert,fragmentShader:Ht.distance_frag},shadow:{uniforms:Be([dt.lights,dt.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};Ti.physical={uniforms:Be([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};var co={r:0,b:0,g:0},im=new ae,tu=new Ft;tu.set(-1,0,0,0,1,0,0,0,1);function nm(n,t,e,i,s,r){let a=new Pt(0),o=s===!0?0:1,l,c,u=null,f=0,h=null;function d(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){let v=M.backgroundBlurriness>0;E=t.get(E,v)}return E}function g(M){let E=!1,v=d(M);v===null?p(a,o):v&&v.isColor&&(p(v,1),E=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function y(M,E){let v=d(E);v&&(v.isCubeTexture||v.mapping===Js)?(c===void 0&&(c=new nt(new ge(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:wn(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(im.makeRotationFromEuler(E.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(tu),c.material.toneMapped=$t.getTransfer(v.colorSpace)!==Jt,(u!==v||f!==v.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new nt(new Fi(2,2),new ei({name:"BackgroundMaterial",uniforms:wn(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$t.getTransfer(v.colorSpace)!==Jt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function p(M,E){M.getRGB(co,Bl(n)),e.buffers.color.setClear(co.r,co.g,co.b,E,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),o=E,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,p(a,o)},render:g,addToRenderList:y,dispose:m}}function sm(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(I,L,W,X,U){let B=!1,z=f(I,X,W,L);r!==z&&(r=z,c(r.object)),B=d(I,X,W,U),B&&g(I,X,W,U),U!==null&&t.update(U,n.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,v(I,L,W,X),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function f(I,L,W,X){let U=X.wireframe===!0,B=i[L.id];B===void 0&&(B={},i[L.id]=B);let z=I.isInstancedMesh===!0?I.id:0,q=B[z];q===void 0&&(q={},B[z]=q);let j=q[W.id];j===void 0&&(j={},q[W.id]=j);let et=j[U];return et===void 0&&(et=h(l()),j[U]=et),et}function h(I){let L=[],W=[],X=[];for(let U=0;U<e;U++)L[U]=0,W[U]=0,X[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:X,object:I,attributes:{},index:null}}function d(I,L,W,X){let U=r.attributes,B=L.attributes,z=0,q=W.getAttributes();for(let j in q)if(q[j].location>=0){let ht=U[j],xt=B[j];if(xt===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(xt=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(xt=I.instanceColor)),ht===void 0||ht.attribute!==xt||xt&&ht.data!==xt.data)return!0;z++}return r.attributesNum!==z||r.index!==X}function g(I,L,W,X){let U={},B=L.attributes,z=0,q=W.getAttributes();for(let j in q)if(q[j].location>=0){let ht=B[j];ht===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(ht=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(ht=I.instanceColor));let xt={};xt.attribute=ht,ht&&ht.data&&(xt.data=ht.data),U[j]=xt,z++}r.attributes=U,r.attributesNum=z,r.index=X}function y(){let I=r.newAttributes;for(let L=0,W=I.length;L<W;L++)I[L]=0}function p(I){m(I,0)}function m(I,L){let W=r.newAttributes,X=r.enabledAttributes,U=r.attributeDivisors;W[I]=1,X[I]===0&&(n.enableVertexAttribArray(I),X[I]=1),U[I]!==L&&(n.vertexAttribDivisor(I,L),U[I]=L)}function M(){let I=r.newAttributes,L=r.enabledAttributes;for(let W=0,X=L.length;W<X;W++)L[W]!==I[W]&&(n.disableVertexAttribArray(W),L[W]=0)}function E(I,L,W,X,U,B,z){z===!0?n.vertexAttribIPointer(I,L,W,U,B):n.vertexAttribPointer(I,L,W,X,U,B)}function v(I,L,W,X){y();let U=X.attributes,B=W.getAttributes(),z=L.defaultAttributeValues;for(let q in B){let j=B[q];if(j.location>=0){let et=U[q];if(et===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(et=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(et=I.instanceColor)),et!==void 0){let ht=et.normalized,xt=et.itemSize,Yt=t.get(et);if(Yt===void 0)continue;let jt=Yt.buffer,Gt=Yt.type,Z=Yt.bytesPerElement,st=Gt===n.INT||Gt===n.UNSIGNED_INT||et.gpuType===Ea;if(et.isInterleavedBufferAttribute){let tt=et.data,It=tt.stride,Dt=et.offset;if(tt.isInstancedInterleavedBuffer){for(let Ct=0;Ct<j.locationSize;Ct++)m(j.location+Ct,tt.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Ct=0;Ct<j.locationSize;Ct++)p(j.location+Ct);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let Ct=0;Ct<j.locationSize;Ct++)E(j.location+Ct,xt/j.locationSize,Gt,ht,It*Z,(Dt+xt/j.locationSize*Ct)*Z,st)}else{if(et.isInstancedBufferAttribute){for(let tt=0;tt<j.locationSize;tt++)m(j.location+tt,et.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let tt=0;tt<j.locationSize;tt++)p(j.location+tt);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let tt=0;tt<j.locationSize;tt++)E(j.location+tt,xt/j.locationSize,Gt,ht,xt*Z,xt/j.locationSize*tt*Z,st)}}else if(z!==void 0){let ht=z[q];if(ht!==void 0)switch(ht.length){case 2:n.vertexAttrib2fv(j.location,ht);break;case 3:n.vertexAttrib3fv(j.location,ht);break;case 4:n.vertexAttrib4fv(j.location,ht);break;default:n.vertexAttrib1fv(j.location,ht)}}}}M()}function w(){T();for(let I in i){let L=i[I];for(let W in L){let X=L[W];for(let U in X){let B=X[U];for(let z in B)u(B[z].object),delete B[z];delete X[U]}}delete i[I]}}function S(I){if(i[I.id]===void 0)return;let L=i[I.id];for(let W in L){let X=L[W];for(let U in X){let B=X[U];for(let z in B)u(B[z].object),delete B[z];delete X[U]}}delete i[I.id]}function C(I){for(let L in i){let W=i[L];for(let X in W){let U=W[X];if(U[I.id]===void 0)continue;let B=U[I.id];for(let z in B)u(B[z].object),delete B[z];delete U[I.id]}}}function x(I){for(let L in i){let W=i[L],X=I.isInstancedMesh===!0?I.id:0,U=W[X];if(U!==void 0){for(let B in U){let z=U[B];for(let q in z)u(z[q].object),delete z[q];delete U[B]}delete W[X],Object.keys(W).length===0&&delete i[L]}}}function T(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:p,disableUnusedAttributes:M}}function rm(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function am(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==ai&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let x=C===Si&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Xe&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==pi&&!x)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(wt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&wt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),S=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:v,maxSamples:w,samples:S}}function om(n){let t=this,e=null,i=0,s=!1,r=!1,a=new We,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){let g=f.clippingPlanes,y=f.clipIntersection,p=f.clipShadows,m=n.get(f);if(!s||g===null||g.length===0||r&&!p)r?u(null):c();else{let M=r?0:i,E=M*4,v=m.clippingState||null;l.value=v,v=u(g,h,E,d);for(let w=0;w!==E;++w)v[w]=e[w];m.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,g){let y=f!==null?f.length:0,p=null;if(y!==0){if(p=l.value,g!==!0||p===null){let m=d+y*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let E=0,v=d;E!==y;++E,v+=4)a.copy(f[E]).applyMatrix4(M,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}var hn=4,Ih=[.125,.215,.35,.446,.526,.582],An=20,lm=256,sr=new Qn,Lh=new Pt,Vl=null,Hl=0,Gl=0,Wl=!1,cm=new R,ls=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=cm}=r;Vl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Vl,Hl,Gl),this._renderer.xr.enabled=Wl,t.scissorTest=!1,as(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===an||t.mapping===Tn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Vl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Se,minFilter:Se,generateMipmaps:!1,type:Si,format:ai,colorSpace:Ms,depthBuffer:!1},s=Dh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dh(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=hm(r)),this._blurMaterial=dm(r,t,e),this._ggxMaterial=um(r,t,e)}return s}_compileMaterial(t){let e=new nt(new ne,t);this._renderer.compile(e,sr)}_sceneToCubeUV(t,e,i,s,r){let l=new Re(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Lh),f.toneMapping=di,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nt(new ge,new ke({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,p=y.material,m=!1,M=t.background;M?M.isColor&&(p.color.copy(M),t.background=null,m=!0):(p.color.copy(Lh),m=!0);for(let E=0;E<6;E++){let v=E%3;v===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[E],r.y,r.z)):v===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[E]));let w=this._cubeSize;as(s,v*w,E>2?w:0,w,w),f.setRenderTarget(s),m&&f.render(y,l),f.render(t,l)}f.toneMapping=d,f.autoClear=h,t.background=M}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===an||t.mapping===Tn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;as(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,sr)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=0+c*1.25,d=f*h,{_lodMax:g}=this,y=this._sizeLods[i],p=3*y*(i>g-hn?i-g+hn:0),m=4*(this._cubeSize-y);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,as(r,p,m,3*y,2*y),s.setRenderTarget(r),s.render(o,sr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,as(t,p,m,3*y,2*y),s.setRenderTarget(t),s.render(o,sr)}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Lt("blur direction must be either latitudinal or longitudinal!");let u=3,f=this._lodMeshes[s];f.material=c;let h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*An-1),y=r/g,p=isFinite(r)?1+Math.floor(u*y):An;p>An&&wt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${An}`);let m=[],M=0;for(let C=0;C<An;++C){let x=C/y,T=Math.exp(-x*x/2);m.push(T),C===0?M+=T:C<p&&(M+=2*T)}for(let C=0;C<m.length;C++)m[C]=m[C]/M;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-i;let v=this._sizeLods[s],w=3*v*(s>E-hn?s-E+hn:0),S=4*(this._cubeSize-v);as(e,w,S,3*v,2*v),l.setRenderTarget(e),l.render(f,sr)}};function hm(n){let t=[],e=[],i=[],s=n,r=n-hn+1+Ih.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>n-hn?l=Ih[a-n+hn-1]:a===0&&(l=0),e.push(l);let c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,y=3,p=2,m=1,M=new Float32Array(y*g*d),E=new Float32Array(p*g*d),v=new Float32Array(m*g*d);for(let S=0;S<d;S++){let C=S%3*2/3-1,x=S>2?0:-1,T=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];M.set(T,y*g*S),E.set(h,p*g*S);let P=[S,S,S,S,S,S];v.set(P,m*g*S)}let w=new ne;w.setAttribute("position",new ve(M,y)),w.setAttribute("uv",new ve(E,p)),w.setAttribute("faceIndex",new ve(v,m)),i.push(new nt(w,null)),s>hn&&s--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Dh(n,t,e){let i=new Qe(n,t,e);return i.texture.mapping=Js,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function as(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function um(n,t,e){return new ei({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:lm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:po(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function dm(n,t,e){let i=new Float32Array(An),s=new R(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:An,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:po(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Nh(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:po(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Fh(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:po(),fragmentShader:`

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
	`}var uo=class extends Qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Ps(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ge(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:wn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ve,blending:bi});r.uniforms.tEquirect.value=e;let a=new nt(s,r),o=e.minFilter;return e.minFilter===on&&(e.minFilter=Se),new ya(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};function fm(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){let d=h.mapping;if(d===is||d===ba)if(t.has(h)){let g=t.get(h).texture;return o(g,h.mapping)}else{let g=h.image;if(g&&g.height>0){let y=new uo(g.height);return y.fromEquirectangularTexture(n,h),t.set(h,y),h.addEventListener("dispose",c),o(y.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let d=h.mapping,g=d===is||d===ba,y=d===an||d===Tn;if(g||y){let p=e.get(h),m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new ls(n)),p=g?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{let M=h.image;return g&&M&&M.height>0||y&&M&&l(M)?(i===null&&(i=new ls(n)),p=g?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,d){return d===is?h.mapping=an:d===ba&&(h.mapping=Tn),h}function l(h){let d=0,g=6;for(let y=0;y<g;y++)h[y]!==void 0&&d++;return d===g}function c(h){let d=h.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(h){let d=h.target;d.removeEventListener("dispose",u);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function pm(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&xn("WebGLRenderer: "+i+" extension not supported."),s}}}function mm(n,t,e,i){let s={},r=new WeakMap;function a(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];let d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(f){let h=f.attributes;for(let d in h)t.update(h[d],n.ARRAY_BUFFER)}function c(f){let h=[],d=f.index,g=f.attributes.position,y=0;if(g===void 0)return;if(d!==null){let M=d.array;y=d.version;for(let E=0,v=M.length;E<v;E+=3){let w=M[E+0],S=M[E+1],C=M[E+2];h.push(w,S,S,C,C,w)}}else{let M=g.array;y=g.version;for(let E=0,v=M.length/3-1;E<v;E+=3){let w=E+0,S=E+1,C=E+2;h.push(w,S,S,C,C,w)}}let p=new(g.count>=65535?Rs:Cs)(h,1);p.version=y;let m=r.get(f);m&&t.remove(m),r.set(f,p)}function u(f){let h=r.get(f);if(h){let d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function gm(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*a),e.update(h,i,1)}function c(f,h,d){d!==0&&(n.drawElementsInstanced(i,h,r,f*a,d),e.update(h,i,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,d);let y=0;for(let p=0;p<d;p++)y+=h[p];e.update(y,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function xm(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Lt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function _m(n,t,e){let i=new WeakMap,s=new ce;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==f){let T=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],E=0;d===!0&&(E=1),g===!0&&(E=2),y===!0&&(E=3);let v=o.attributes.position.count*E,w=1;v>t.maxTextureSize&&(w=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let S=new Float32Array(v*w*4*f),C=new Es(S,v,w,f);C.type=pi,C.needsUpdate=!0;let x=E*4;for(let P=0;P<f;P++){let I=p[P],L=m[P],W=M[P],X=v*w*4*P;for(let U=0;U<I.count;U++){let B=U*x;d===!0&&(s.fromBufferAttribute(I,U),S[X+B+0]=s.x,S[X+B+1]=s.y,S[X+B+2]=s.z,S[X+B+3]=0),g===!0&&(s.fromBufferAttribute(L,U),S[X+B+4]=s.x,S[X+B+5]=s.y,S[X+B+6]=s.z,S[X+B+7]=0),y===!0&&(s.fromBufferAttribute(W,U),S[X+B+8]=s.x,S[X+B+9]=s.y,S[X+B+10]=s.z,S[X+B+11]=W.itemSize===4?s.w:1)}}h={count:f,texture:C,size:new gt(v,w)},i.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];let g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function ym(n,t,e,i,s){let r=new WeakMap;function a(c){let u=s.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var vm={[_l]:"LINEAR_TONE_MAPPING",[yl]:"REINHARD_TONE_MAPPING",[vl]:"CINEON_TONE_MAPPING",[Zs]:"ACES_FILMIC_TONE_MAPPING",[bl]:"AGX_TONE_MAPPING",[Sl]:"NEUTRAL_TONE_MAPPING",[Ml]:"CUSTOM_TONE_MAPPING"};function Mm(n,t,e,i,s,r){let a=new Qe(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Ni(t,e):void 0}),o=new Qe(t,e,{type:Si,depthBuffer:!1,stencilBuffer:!1}),l=new ne;l.setAttribute("position",new Vt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Vt([0,2,0,0,2,0],2));let c=new aa({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new nt(l,c),f=new Qn(-1,1,1,-1,0,1),h=null,d=null,g=!1,y,p=null,m=[],M=!1;this.setSize=function(E,v){a.setSize(E,v),o.setSize(E,v);for(let w=0;w<m.length;w++){let S=m[w];S.setSize&&S.setSize(E,v)}},this.setEffects=function(E){m=E,M=m.length>0&&m[0].isRenderPass===!0;let v=a.width,w=a.height;for(let S=0;S<m.length;S++){let C=m[S];C.setSize&&C.setSize(v,w)}},this.begin=function(E,v){if(g||E.toneMapping===di&&m.length===0)return!1;if(p=v,v!==null){let w=v.width,S=v.height;(a.width!==w||a.height!==S)&&this.setSize(w,S)}return M===!1&&E.setRenderTarget(a),y=E.toneMapping,E.toneMapping=di,!0},this.hasRenderPass=function(){return M},this.end=function(E,v){E.toneMapping=y,g=!0;let w=a,S=o;for(let C=0;C<m.length;C++){let x=m[C];if(x.enabled!==!1&&(x.render(E,S,w,v),x.needsSwap!==!1)){let T=w;w=S,S=T}}if(h!==E.outputColorSpace||d!==E.toneMapping){h=E.outputColorSpace,d=E.toneMapping,c.defines={},$t.getTransfer(h)===Jt&&(c.defines.SRGB_TRANSFER="");let C=vm[d];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(p),E.render(u,f),p=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var eu=new ze,Yl=new Ni(1,1),iu=new Es,nu=new Yr,su=new Ps,Uh=[],Bh=[],Oh=new Float32Array(16),zh=new Float32Array(9),kh=new Float32Array(4);function cs(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Uh[s];if(r===void 0&&(r=new Float32Array(s),Uh[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Ee(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Te(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function mo(n,t){let e=Bh[t];e===void 0&&(e=new Int32Array(t),Bh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function bm(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Sm(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2fv(this.addr,t),Te(e,t)}}function Em(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;n.uniform3fv(this.addr,t),Te(e,t)}}function Tm(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4fv(this.addr,t),Te(e,t)}}function wm(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,i))return;kh.set(i),n.uniformMatrix2fv(this.addr,!1,kh),Te(e,i)}}function Am(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,i))return;zh.set(i),n.uniformMatrix3fv(this.addr,!1,zh),Te(e,i)}}function Cm(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,i))return;Oh.set(i),n.uniformMatrix4fv(this.addr,!1,Oh),Te(e,i)}}function Rm(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Pm(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2iv(this.addr,t),Te(e,t)}}function Im(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3iv(this.addr,t),Te(e,t)}}function Lm(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4iv(this.addr,t),Te(e,t)}}function Dm(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Nm(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2uiv(this.addr,t),Te(e,t)}}function Fm(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3uiv(this.addr,t),Te(e,t)}}function Um(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4uiv(this.addr,t),Te(e,t)}}function Bm(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Yl.compareFunction=e.isReversedDepthBuffer()?lo:oo,r=Yl):r=eu,e.setTexture2D(t||r,s)}function Om(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||nu,s)}function zm(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||su,s)}function km(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||iu,s)}function Vm(n){switch(n){case 5126:return bm;case 35664:return Sm;case 35665:return Em;case 35666:return Tm;case 35674:return wm;case 35675:return Am;case 35676:return Cm;case 5124:case 35670:return Rm;case 35667:case 35671:return Pm;case 35668:case 35672:return Im;case 35669:case 35673:return Lm;case 5125:return Dm;case 36294:return Nm;case 36295:return Fm;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return Om;case 35680:case 36300:case 36308:case 36293:return zm;case 36289:case 36303:case 36311:case 36292:return km}}function Hm(n,t){n.uniform1fv(this.addr,t)}function Gm(n,t){let e=cs(t,this.size,2);n.uniform2fv(this.addr,e)}function Wm(n,t){let e=cs(t,this.size,3);n.uniform3fv(this.addr,e)}function Xm(n,t){let e=cs(t,this.size,4);n.uniform4fv(this.addr,e)}function qm(n,t){let e=cs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Ym(n,t){let e=cs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function $m(n,t){let e=cs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Zm(n,t){n.uniform1iv(this.addr,t)}function Jm(n,t){n.uniform2iv(this.addr,t)}function Km(n,t){n.uniform3iv(this.addr,t)}function jm(n,t){n.uniform4iv(this.addr,t)}function Qm(n,t){n.uniform1uiv(this.addr,t)}function tg(n,t){n.uniform2uiv(this.addr,t)}function eg(n,t){n.uniform3uiv(this.addr,t)}function ig(n,t){n.uniform4uiv(this.addr,t)}function ng(n,t,e){let i=this.cache,s=t.length,r=mo(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Yl:a=eu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function sg(n,t,e){let i=this.cache,s=t.length,r=mo(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||nu,r[a])}function rg(n,t,e){let i=this.cache,s=t.length,r=mo(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||su,r[a])}function ag(n,t,e){let i=this.cache,s=t.length,r=mo(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||iu,r[a])}function og(n){switch(n){case 5126:return Hm;case 35664:return Gm;case 35665:return Wm;case 35666:return Xm;case 35674:return qm;case 35675:return Ym;case 35676:return $m;case 5124:case 35670:return Zm;case 35667:case 35671:return Jm;case 35668:case 35672:return Km;case 35669:case 35673:return jm;case 5125:return Qm;case 36294:return tg;case 36295:return eg;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return ng;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return ag}}var $l=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Vm(e.type)}},Zl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=og(e.type)}},Jl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Xl=/(\w+)(\])?(\[|\.)?/g;function Vh(n,t){n.seq.push(t),n.map[t.id]=t}function lg(n,t,e){let i=n.name,s=i.length;for(Xl.lastIndex=0;;){let r=Xl.exec(i),a=Xl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Vh(e,c===void 0?new $l(o,n,t):new Zl(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new Jl(o),Vh(e,f)),e=f}}}var os=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);lg(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Hh(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var cg=37297,hg=0;function ug(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var Gh=new Ft;function dg(n){$t._getMatrix(Gh,$t.workingColorSpace,n);let t=`mat3( ${Gh.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(n)){case bs:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return wt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Wh(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+ug(n.getShaderSource(t),o)}else return r}function fg(n,t){let e=dg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var pg={[_l]:"Linear",[yl]:"Reinhard",[vl]:"Cineon",[Zs]:"ACESFilmic",[bl]:"AgX",[Sl]:"Neutral",[Ml]:"Custom"};function mg(n,t){let e=pg[t];return e===void 0?(wt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ho=new R;function gg(){$t.getLuminanceCoefficients(ho);let n=ho.x.toFixed(4),t=ho.y.toFixed(4),e=ho.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function _g(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function yg(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function ar(n){return n!==""}function Xh(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function qh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var vg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kl(n){return n.replace(vg,bg)}var Mg=new Map;function bg(n,t){let e=Ht[t];if(e===void 0){let i=Mg.get(t);if(i!==void 0)e=Ht[i],wt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Kl(e)}var Sg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yh(n){return n.replace(Sg,Eg)}function Eg(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $h(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Tg={[$s]:"SHADOWMAP_TYPE_PCF",[es]:"SHADOWMAP_TYPE_VSM"};function wg(n){return Tg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ag={[an]:"ENVMAP_TYPE_CUBE",[Tn]:"ENVMAP_TYPE_CUBE",[Js]:"ENVMAP_TYPE_CUBE_UV"};function Cg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Ag[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var Rg={[Tn]:"ENVMAP_MODE_REFRACTION"};function Pg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Rg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ig={[xl]:"ENVMAP_BLENDING_MULTIPLY",[fh]:"ENVMAP_BLENDING_MIX",[ph]:"ENVMAP_BLENDING_ADD"};function Lg(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ig[n.combine]||"ENVMAP_BLENDING_NONE"}function Dg(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Ng(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=wg(e),c=Cg(e),u=Pg(e),f=Lg(e),h=Dg(e),d=xg(e),g=_g(r),y=s.createProgram(),p,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),m.length>0&&(m+=`
`)):(p=[$h(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),m=[$h(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==di?"#define TONE_MAPPING":"",e.toneMapping!==di?Ht.tonemapping_pars_fragment:"",e.toneMapping!==di?mg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,fg("linearToOutputTexel",e.outputColorSpace),gg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ar).join(`
`)),a=Kl(a),a=Xh(a,e),a=qh(a,e),o=Kl(o),o=Xh(o,e),o=qh(o,e),a=Yh(a),o=Yh(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let E=M+p+a,v=M+m+o,w=Hh(s,s.VERTEX_SHADER,E),S=Hh(s,s.FRAGMENT_SHADER,v);s.attachShader(y,w),s.attachShader(y,S),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function C(I){if(n.debug.checkShaderErrors){let L=s.getProgramInfoLog(y)||"",W=s.getShaderInfoLog(w)||"",X=s.getShaderInfoLog(S)||"",U=L.trim(),B=W.trim(),z=X.trim(),q=!0,j=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,w,S);else{let et=Wh(s,w,"vertex"),ht=Wh(s,S,"fragment");Lt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+et+`
`+ht)}else U!==""?wt("WebGLProgram: Program Info Log:",U):(B===""||z==="")&&(j=!1);j&&(I.diagnostics={runnable:q,programLog:U,vertexShader:{log:B,prefix:p},fragmentShader:{log:z,prefix:m}})}s.deleteShader(w),s.deleteShader(S),x=new os(s,y),T=yg(s,y)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(y,cg)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=hg++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=w,this.fragmentShader=S,this}var Fg=0,jl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Ql(t),e.set(t,i)),i}},Ql=class{constructor(t){this.id=Fg++,this.code=t,this.usedTimes=0}};function Ug(n){return n===cn||n===ir||n===nr}function Bg(n,t,e,i,s,r){let a=new Ts,o=new jl,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer,h=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function y(x,T,P,I,L,W){let X=I.fog,U=L.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,q=t.get(x.envMap||B,z),j=q&&q.mapping===Js?q.image.height:null,et=d[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&wt("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let ht=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,xt=ht!==void 0?ht.length:0,Yt=0;U.morphAttributes.position!==void 0&&(Yt=1),U.morphAttributes.normal!==void 0&&(Yt=2),U.morphAttributes.color!==void 0&&(Yt=3);let jt,Gt,Z,st;if(et){let vt=Ti[et];jt=vt.vertexShader,Gt=vt.fragmentShader}else{jt=x.vertexShader,Gt=x.fragmentShader;let vt=o.getVertexShaderStage(x),de=o.getFragmentShaderStage(x);o.update(x,vt,de),Z=vt.id,st=de.id}let tt=n.getRenderTarget(),It=n.state.buffers.depth.getReversed(),Dt=L.isInstancedMesh===!0,Ct=L.isBatchedMesh===!0,le=!!x.map,Wt=!!x.matcap,qt=!!q,zt=!!x.aoMap,Nt=!!x.lightMap,xe=!!x.bumpMap&&x.wireframe===!1,be=!!x.normalMap,Ae=!!x.displacementMap,Le=!!x.emissiveMap,ue=!!x.metalnessMap,_e=!!x.roughnessMap,N=x.anisotropy>0,Ge=x.clearcoat>0,Kt=x.dispersion>0,A=x.iridescence>0,_=x.sheen>0,O=x.transmission>0,H=N&&!!x.anisotropyMap,Y=Ge&&!!x.clearcoatMap,it=Ge&&!!x.clearcoatNormalMap,at=Ge&&!!x.clearcoatRoughnessMap,$=A&&!!x.iridescenceMap,K=A&&!!x.iridescenceThicknessMap,ot=_&&!!x.sheenColorMap,St=_&&!!x.sheenRoughnessMap,ut=!!x.specularMap,lt=!!x.specularColorMap,At=!!x.specularIntensityMap,Rt=O&&!!x.transmissionMap,Ut=O&&!!x.thicknessMap,D=!!x.gradientMap,rt=!!x.alphaMap,J=x.alphaTest>0,ct=!!x.alphaHash,mt=!!x.extensions,Q=di;x.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Q=n.toneMapping);let bt={shaderID:et,shaderType:x.type,shaderName:x.name,vertexShader:jt,fragmentShader:Gt,defines:x.defines,customVertexShaderID:Z,customFragmentShaderID:st,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Ct,batchingColor:Ct&&L._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&L.instanceColor!==null,instancingMorph:Dt&&L.morphTexture!==null,outputColorSpace:tt===null?n.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:$t.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:le,matcap:Wt,envMap:qt,envMapMode:qt&&q.mapping,envMapCubeUVHeight:j,aoMap:zt,lightMap:Nt,bumpMap:xe,normalMap:be,displacementMap:Ae,emissiveMap:Le,normalMapObjectSpace:be&&x.normalMapType===xh,normalMapTangentSpace:be&&x.normalMapType===ao,packedNormalMap:be&&x.normalMapType===ao&&Ug(x.normalMap.format),metalnessMap:ue,roughnessMap:_e,anisotropy:N,anisotropyMap:H,clearcoat:Ge,clearcoatMap:Y,clearcoatNormalMap:it,clearcoatRoughnessMap:at,dispersion:Kt,iridescence:A,iridescenceMap:$,iridescenceThicknessMap:K,sheen:_,sheenColorMap:ot,sheenRoughnessMap:St,specularMap:ut,specularColorMap:lt,specularIntensityMap:At,transmission:O,transmissionMap:Rt,thicknessMap:Ut,gradientMap:D,opaque:x.transparent===!1&&x.blending===Di&&x.alphaToCoverage===!1,alphaMap:rt,alphaTest:J,alphaHash:ct,combine:x.combine,mapUv:le&&g(x.map.channel),aoMapUv:zt&&g(x.aoMap.channel),lightMapUv:Nt&&g(x.lightMap.channel),bumpMapUv:xe&&g(x.bumpMap.channel),normalMapUv:be&&g(x.normalMap.channel),displacementMapUv:Ae&&g(x.displacementMap.channel),emissiveMapUv:Le&&g(x.emissiveMap.channel),metalnessMapUv:ue&&g(x.metalnessMap.channel),roughnessMapUv:_e&&g(x.roughnessMap.channel),anisotropyMapUv:H&&g(x.anisotropyMap.channel),clearcoatMapUv:Y&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:ot&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:St&&g(x.sheenRoughnessMap.channel),specularMapUv:ut&&g(x.specularMap.channel),specularColorMapUv:lt&&g(x.specularColorMap.channel),specularIntensityMapUv:At&&g(x.specularIntensityMap.channel),transmissionMapUv:Rt&&g(x.transmissionMap.channel),thicknessMapUv:Ut&&g(x.thicknessMap.channel),alphaMapUv:rt&&g(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(be||N),vertexNormals:!!U.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&(le||rt),fog:!!X,useFog:x.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&be===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:It,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Yt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Q,decodeVideoTexture:le&&x.map.isVideoTexture===!0&&$t.getTransfer(x.map.colorSpace)===Jt,decodeVideoTextureEmissive:Le&&x.emissiveMap.isVideoTexture===!0&&$t.getTransfer(x.emissiveMap.colorSpace)===Jt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===He,flipSided:x.side===Ve,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:mt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&x.extensions.multiDraw===!0||Ct)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function p(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)T.push(P),T.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(m(T,x),M(T,x),T.push(n.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function m(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function M(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function E(x){let T=d[x.type],P;if(T){let I=Ti[T];P=Rh.clone(I.uniforms)}else P=x.uniforms;return P}function v(x,T){let P=u.get(T);return P!==void 0?++P.usedTimes:(P=new Ng(n,T,x,s),c.push(P),u.set(T,P)),P}function w(x){if(--x.usedTimes===0){let T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function S(x){o.remove(x)}function C(){o.dispose()}return{getParameters:y,getProgramCacheKey:p,getUniforms:E,acquireProgram:v,releaseProgram:w,releaseShaderCache:S,programs:c,dispose:C}}function Og(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function zg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Zh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Jh(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,g,y,p,m){let M=n[t];return M===void 0?(M={id:h.id,object:h,geometry:d,material:g,materialVariant:a(h),groupOrder:y,renderOrder:h.renderOrder,z:p,group:m},n[t]=M):(M.id=h.id,M.object=h,M.geometry=d,M.material=g,M.materialVariant=a(h),M.groupOrder=y,M.renderOrder=h.renderOrder,M.z=p,M.group=m),t++,M}function l(h,d,g,y,p,m){let M=o(h,d,g,y,p,m);g.transmission>0?i.push(M):g.transparent===!0?s.push(M):e.push(M)}function c(h,d,g,y,p,m){let M=o(h,d,g,y,p,m);g.transmission>0?i.unshift(M):g.transparent===!0?s.unshift(M):e.unshift(M)}function u(h,d,g){e.length>1&&e.sort(h||zg),i.length>1&&i.sort(d||Zh),s.length>1&&s.sort(d||Zh),g&&(e.reverse(),i.reverse(),s.reverse())}function f(){for(let h=t,d=n.length;h<d;h++){let g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function kg(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new Jh,n.set(i,[a])):s>=r.length?(a=new Jh,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Vg(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new Pt};break;case"SpotLight":e={position:new R,direction:new R,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new R,halfWidth:new R,halfHeight:new R};break}return n[t.id]=e,e}}}function Hg(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Gg=0;function Wg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Xg(n){let t=new Vg,e=Hg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let s=new R,r=new ae,a=new ae;function o(c){let u=0,f=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let d=0,g=0,y=0,p=0,m=0,M=0,E=0,v=0,w=0,S=0,C=0;c.sort(Wg);for(let T=0,P=c.length;T<P;T++){let I=c[T],L=I.color,W=I.intensity,X=I.distance,U=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===cn?U=I.shadow.map.texture:U=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=L.r*W,f+=L.g*W,h+=L.b*W;else if(I.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(I.sh.coefficients[B],W);C++}else if(I.isDirectionalLight){let B=t.get(I);if(B.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let z=I.shadow,q=e.get(I);q.shadowIntensity=z.intensity,q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,i.directionalShadow[d]=q,i.directionalShadowMap[d]=U,i.directionalShadowMatrix[d]=I.shadow.matrix,M++}i.directional[d]=B,d++}else if(I.isSpotLight){let B=t.get(I);B.position.setFromMatrixPosition(I.matrixWorld),B.color.copy(L).multiplyScalar(W),B.distance=X,B.coneCos=Math.cos(I.angle),B.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),B.decay=I.decay,i.spot[y]=B;let z=I.shadow;if(I.map&&(i.spotLightMap[w]=I.map,w++,z.updateMatrices(I),I.castShadow&&S++),i.spotLightMatrix[y]=z.matrix,I.castShadow){let q=e.get(I);q.shadowIntensity=z.intensity,q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,i.spotShadow[y]=q,i.spotShadowMap[y]=U,v++}y++}else if(I.isRectAreaLight){let B=t.get(I);B.color.copy(L).multiplyScalar(W),B.halfWidth.set(I.width*.5,0,0),B.halfHeight.set(0,I.height*.5,0),i.rectArea[p]=B,p++}else if(I.isPointLight){let B=t.get(I);if(B.color.copy(I.color).multiplyScalar(I.intensity),B.distance=I.distance,B.decay=I.decay,I.castShadow){let z=I.shadow,q=e.get(I);q.shadowIntensity=z.intensity,q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,q.shadowCameraNear=z.camera.near,q.shadowCameraFar=z.camera.far,i.pointShadow[g]=q,i.pointShadowMap[g]=U,i.pointShadowMatrix[g]=I.shadow.matrix,E++}i.point[g]=B,g++}else if(I.isHemisphereLight){let B=t.get(I);B.skyColor.copy(I.color).multiplyScalar(W),B.groundColor.copy(I.groundColor).multiplyScalar(W),i.hemi[m]=B,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;let x=i.hash;(x.directionalLength!==d||x.pointLength!==g||x.spotLength!==y||x.rectAreaLength!==p||x.hemiLength!==m||x.numDirectionalShadows!==M||x.numPointShadows!==E||x.numSpotShadows!==v||x.numSpotMaps!==w||x.numLightProbes!==C)&&(i.directional.length=d,i.spot.length=y,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=v+w-S,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=C,x.directionalLength=d,x.pointLength=g,x.spotLength=y,x.rectAreaLength=p,x.hemiLength=m,x.numDirectionalShadows=M,x.numPointShadows=E,x.numSpotShadows=v,x.numSpotMaps=w,x.numLightProbes=C,i.version=Gg++)}function l(c,u){let f=0,h=0,d=0,g=0,y=0,p=u.matrixWorldInverse;for(let m=0,M=c.length;m<M;m++){let E=c[m];if(E.isDirectionalLight){let v=i.directional[f];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),f++}else if(E.isSpotLight){let v=i.spot[d];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),d++}else if(E.isRectAreaLight){let v=i.rectArea[g];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),a.identity(),r.copy(E.matrixWorld),r.premultiply(p),a.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){let v=i.point[h];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(p),h++}else if(E.isHemisphereLight){let v=i.hemi[y];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(p),y++}}}return{setup:o,setupView:l,state:i}}function Kh(n){let t=new Xg(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function a(h){e.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function qg(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Kh(n),t.set(s,[o])):r>=a.length?(o=new Kh(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Yg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$g=`uniform sampler2D shadow_pass;
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
}`,Zg=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Jg=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],jh=new ae,rr=new R,ql=new R;function Kg(n,t,e){let i=new Zn,s=new gt,r=new gt,a=new ce,o=new oa,l=new la,c={},u=e.maxTextureSize,f={[Li]:Ve,[Ve]:Li,[He]:He},h=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:Yg,fragmentShader:$g}),d=h.clone();d.defines.HORIZONTAL_PASS=1;let g=new ne;g.setAttribute("position",new ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new nt(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$s;let m=this.type;this.render=function(S,C,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;this.type===Ma&&(wt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=$s);let T=n.getRenderTarget(),P=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),L=n.state;L.setBlending(bi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let W=m!==this.type;W&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(U=>U.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,U=S.length;X<U;X++){let B=S[X],z=B.shadow;if(z===void 0){wt("WebGLShadowMap:",B,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let q=z.getFrameExtents();s.multiply(q),r.copy(z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/q.x),s.x=r.x*q.x,z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/q.y),s.y=r.y*q.y,z.mapSize.y=r.y));let j=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=j,z.map===null||W===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===es){if(B.isPointLight){wt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Qe(s.x,s.y,{format:cn,type:Si,minFilter:Se,magFilter:Se,generateMipmaps:!1}),z.map.texture.name=B.name+".shadowMap",z.map.depthTexture=new Ni(s.x,s.y,pi),z.map.depthTexture.name=B.name+".shadowMapDepth",z.map.depthTexture.format=vi,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ie,z.map.depthTexture.magFilter=Ie}else B.isPointLight?(z.map=new uo(s.x),z.map.depthTexture=new jr(s.x,fi)):(z.map=new Qe(s.x,s.y),z.map.depthTexture=new Ni(s.x,s.y,fi)),z.map.depthTexture.name=B.name+".shadowMap",z.map.depthTexture.format=vi,this.type===$s?(z.map.depthTexture.compareFunction=j?lo:oo,z.map.depthTexture.minFilter=Se,z.map.depthTexture.magFilter=Se):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ie,z.map.depthTexture.magFilter=Ie);z.camera.updateProjectionMatrix()}let et=z.map.isWebGLCubeRenderTarget?6:1;for(let ht=0;ht<et;ht++){if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,ht),n.clear();else{ht===0&&(n.setRenderTarget(z.map),n.clear());let xt=z.getViewport(ht);a.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),L.viewport(a)}if(B.isPointLight){let xt=z.camera,Yt=z.matrix,jt=B.distance||xt.far;jt!==xt.far&&(xt.far=jt,xt.updateProjectionMatrix()),rr.setFromMatrixPosition(B.matrixWorld),xt.position.copy(rr),ql.copy(xt.position),ql.add(Zg[ht]),xt.up.copy(Jg[ht]),xt.lookAt(ql),xt.updateMatrixWorld(),Yt.makeTranslation(-rr.x,-rr.y,-rr.z),jh.multiplyMatrices(xt.projectionMatrix,xt.matrixWorldInverse),z._frustum.setFromProjectionMatrix(jh,xt.coordinateSystem,xt.reversedDepth)}else z.updateMatrices(B);i=z.getFrustum(),v(C,x,z.camera,B,this.type)}z.isPointLightShadow!==!0&&this.type===es&&M(z,x),z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(T,P,I)};function M(S,C){let x=t.update(y);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Qe(s.x,s.y,{format:cn,type:Si})),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(C,null,x,h,y,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(C,null,x,d,y,null)}function E(S,C,x,T){let P=null,I=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)P=I;else if(P=x.isPointLight===!0?l:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let L=P.uuid,W=C.uuid,X=c[L];X===void 0&&(X={},c[L]=X);let U=X[W];U===void 0&&(U=P.clone(),X[W]=U,C.addEventListener("dispose",w)),P=U}if(P.visible=C.visible,P.wireframe=C.wireframe,T===es?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:f[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let L=n.properties.get(P);L.light=x}return P}function v(S,C,x,T,P){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===es)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let W=t.update(S),X=S.material;if(Array.isArray(X)){let U=W.groups;for(let B=0,z=U.length;B<z;B++){let q=U[B],j=X[q.materialIndex];if(j&&j.visible){let et=E(S,j,T,P);S.onBeforeShadow(n,S,C,x,W,et,q),n.renderBufferDirect(x,null,W,et,S,q),S.onAfterShadow(n,S,C,x,W,et,q)}}}else if(X.visible){let U=E(S,X,T,P);S.onBeforeShadow(n,S,C,x,W,U,null),n.renderBufferDirect(x,null,W,U,S,null),S.onAfterShadow(n,S,C,x,W,U,null)}}let L=S.children;for(let W=0,X=L.length;W<X;W++)v(L[W],C,x,T,P)}function w(S){S.target.removeEventListener("dispose",w);for(let x in c){let T=c[x],P=S.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function jg(n,t){function e(){let D=!1,rt=new ce,J=null,ct=new ce(0,0,0,0);return{setMask:function(mt){J!==mt&&!D&&(n.colorMask(mt,mt,mt,mt),J=mt)},setLocked:function(mt){D=mt},setClear:function(mt,Q,bt,vt,de){de===!0&&(mt*=vt,Q*=vt,bt*=vt),rt.set(mt,Q,bt,vt),ct.equals(rt)===!1&&(n.clearColor(mt,Q,bt,vt),ct.copy(rt))},reset:function(){D=!1,J=null,ct.set(-1,0,0,0)}}}function i(){let D=!1,rt=!1,J=null,ct=null,mt=null;return{setReversed:function(Q){if(rt!==Q){let bt=t.get("EXT_clip_control");Q?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT),rt=Q;let vt=mt;mt=null,this.setClear(vt)}},getReversed:function(){return rt},setTest:function(Q){Q?tt(n.DEPTH_TEST):It(n.DEPTH_TEST)},setMask:function(Q){J!==Q&&!D&&(n.depthMask(Q),J=Q)},setFunc:function(Q){if(rt&&(Q=Ah[Q]),ct!==Q){switch(Q){case Ur:n.depthFunc(n.NEVER);break;case Br:n.depthFunc(n.ALWAYS);break;case Or:n.depthFunc(n.LESS);break;case _n:n.depthFunc(n.LEQUAL);break;case zr:n.depthFunc(n.EQUAL);break;case kr:n.depthFunc(n.GEQUAL);break;case Vr:n.depthFunc(n.GREATER);break;case Hr:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ct=Q}},setLocked:function(Q){D=Q},setClear:function(Q){mt!==Q&&(mt=Q,rt&&(Q=1-Q),n.clearDepth(Q))},reset:function(){D=!1,J=null,ct=null,mt=null,rt=!1}}}function s(){let D=!1,rt=null,J=null,ct=null,mt=null,Q=null,bt=null,vt=null,de=null;return{setTest:function(se){D||(se?tt(n.STENCIL_TEST):It(n.STENCIL_TEST))},setMask:function(se){rt!==se&&!D&&(n.stencilMask(se),rt=se)},setFunc:function(se,mi,gi){(J!==se||ct!==mi||mt!==gi)&&(n.stencilFunc(se,mi,gi),J=se,ct=mi,mt=gi)},setOp:function(se,mi,gi){(Q!==se||bt!==mi||vt!==gi)&&(n.stencilOp(se,mi,gi),Q=se,bt=mi,vt=gi)},setLocked:function(se){D=se},setClear:function(se){de!==se&&(n.clearStencil(se),de=se)},reset:function(){D=!1,rt=null,J=null,ct=null,mt=null,Q=null,bt=null,vt=null,de=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},f={},h={},d=new WeakMap,g=[],y=null,p=!1,m=null,M=null,E=null,v=null,w=null,S=null,C=null,x=new Pt(0,0,0),T=0,P=!1,I=null,L=null,W=null,X=null,U=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,q=0,j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(j)[1]),z=q>=1):j.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),z=q>=2);let et=null,ht={},xt=n.getParameter(n.SCISSOR_BOX),Yt=n.getParameter(n.VIEWPORT),jt=new ce().fromArray(xt),Gt=new ce().fromArray(Yt);function Z(D,rt,J,ct){let mt=new Uint8Array(4),Q=n.createTexture();n.bindTexture(D,Q),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let bt=0;bt<J;bt++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(rt,0,n.RGBA,1,1,ct,0,n.RGBA,n.UNSIGNED_BYTE,mt):n.texImage2D(rt+bt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,mt);return Q}let st={};st[n.TEXTURE_2D]=Z(n.TEXTURE_2D,n.TEXTURE_2D,1),st[n.TEXTURE_CUBE_MAP]=Z(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[n.TEXTURE_2D_ARRAY]=Z(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),st[n.TEXTURE_3D]=Z(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(n.DEPTH_TEST),a.setFunc(_n),xe(!1),be(fl),tt(n.CULL_FACE),zt(bi);function tt(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function It(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Dt(D,rt){return h[D]!==rt?(n.bindFramebuffer(D,rt),h[D]=rt,D===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=rt),D===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=rt),!0):!1}function Ct(D,rt){let J=g,ct=!1;if(D){J=d.get(rt),J===void 0&&(J=[],d.set(rt,J));let mt=D.textures;if(J.length!==mt.length||J[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,bt=mt.length;Q<bt;Q++)J[Q]=n.COLOR_ATTACHMENT0+Q;J.length=mt.length,ct=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,ct=!0);ct&&n.drawBuffers(J)}function le(D){return y!==D?(n.useProgram(D),y=D,!0):!1}let Wt={[$i]:n.FUNC_ADD,[Jc]:n.FUNC_SUBTRACT,[Kc]:n.FUNC_REVERSE_SUBTRACT};Wt[jc]=n.MIN,Wt[Qc]=n.MAX;let qt={[th]:n.ZERO,[eh]:n.ONE,[ih]:n.SRC_COLOR,[Nr]:n.SRC_ALPHA,[lh]:n.SRC_ALPHA_SATURATE,[ah]:n.DST_COLOR,[sh]:n.DST_ALPHA,[nh]:n.ONE_MINUS_SRC_COLOR,[Fr]:n.ONE_MINUS_SRC_ALPHA,[oh]:n.ONE_MINUS_DST_COLOR,[rh]:n.ONE_MINUS_DST_ALPHA,[ch]:n.CONSTANT_COLOR,[hh]:n.ONE_MINUS_CONSTANT_COLOR,[uh]:n.CONSTANT_ALPHA,[dh]:n.ONE_MINUS_CONSTANT_ALPHA};function zt(D,rt,J,ct,mt,Q,bt,vt,de,se){if(D===bi){p===!0&&(It(n.BLEND),p=!1);return}if(p===!1&&(tt(n.BLEND),p=!0),D!==Zc){if(D!==m||se!==P){if((M!==$i||w!==$i)&&(n.blendEquation(n.FUNC_ADD),M=$i,w=$i),se)switch(D){case Di:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pl:n.blendFunc(n.ONE,n.ONE);break;case ml:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case gl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Lt("WebGLState: Invalid blending: ",D);break}else switch(D){case Di:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ml:Lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gl:Lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Lt("WebGLState: Invalid blending: ",D);break}E=null,v=null,S=null,C=null,x.set(0,0,0),T=0,m=D,P=se}return}mt=mt||rt,Q=Q||J,bt=bt||ct,(rt!==M||mt!==w)&&(n.blendEquationSeparate(Wt[rt],Wt[mt]),M=rt,w=mt),(J!==E||ct!==v||Q!==S||bt!==C)&&(n.blendFuncSeparate(qt[J],qt[ct],qt[Q],qt[bt]),E=J,v=ct,S=Q,C=bt),(vt.equals(x)===!1||de!==T)&&(n.blendColor(vt.r,vt.g,vt.b,de),x.copy(vt),T=de),m=D,P=!1}function Nt(D,rt){D.side===He?It(n.CULL_FACE):tt(n.CULL_FACE);let J=D.side===Ve;rt&&(J=!J),xe(J),D.blending===Di&&D.transparent===!1?zt(bi):zt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let ct=D.stencilWrite;o.setTest(ct),ct&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Le(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?tt(n.SAMPLE_ALPHA_TO_COVERAGE):It(n.SAMPLE_ALPHA_TO_COVERAGE)}function xe(D){I!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),I=D)}function be(D){D!==Yc?(tt(n.CULL_FACE),D!==L&&(D===fl?n.cullFace(n.BACK):D===$c?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):It(n.CULL_FACE),L=D}function Ae(D){D!==W&&(z&&n.lineWidth(D),W=D)}function Le(D,rt,J){D?(tt(n.POLYGON_OFFSET_FILL),(X!==rt||U!==J)&&(X=rt,U=J,a.getReversed()&&(rt=-rt),n.polygonOffset(rt,J))):It(n.POLYGON_OFFSET_FILL)}function ue(D){D?tt(n.SCISSOR_TEST):It(n.SCISSOR_TEST)}function _e(D){D===void 0&&(D=n.TEXTURE0+B-1),et!==D&&(n.activeTexture(D),et=D)}function N(D,rt,J){J===void 0&&(et===null?J=n.TEXTURE0+B-1:J=et);let ct=ht[J];ct===void 0&&(ct={type:void 0,texture:void 0},ht[J]=ct),(ct.type!==D||ct.texture!==rt)&&(et!==J&&(n.activeTexture(J),et=J),n.bindTexture(D,rt||st[D]),ct.type=D,ct.texture=rt)}function Ge(){let D=ht[et];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Kt(){try{n.compressedTexImage2D(...arguments)}catch(D){Lt("WebGLState:",D)}}function A(){try{n.compressedTexImage3D(...arguments)}catch(D){Lt("WebGLState:",D)}}function _(){try{n.texSubImage2D(...arguments)}catch(D){Lt("WebGLState:",D)}}function O(){try{n.texSubImage3D(...arguments)}catch(D){Lt("WebGLState:",D)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Lt("WebGLState:",D)}}function Y(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Lt("WebGLState:",D)}}function it(){try{n.texStorage2D(...arguments)}catch(D){Lt("WebGLState:",D)}}function at(){try{n.texStorage3D(...arguments)}catch(D){Lt("WebGLState:",D)}}function $(){try{n.texImage2D(...arguments)}catch(D){Lt("WebGLState:",D)}}function K(){try{n.texImage3D(...arguments)}catch(D){Lt("WebGLState:",D)}}function ot(D){return f[D]!==void 0?f[D]:n.getParameter(D)}function St(D,rt){f[D]!==rt&&(n.pixelStorei(D,rt),f[D]=rt)}function ut(D){jt.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),jt.copy(D))}function lt(D){Gt.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Gt.copy(D))}function At(D,rt){let J=c.get(rt);J===void 0&&(J=new WeakMap,c.set(rt,J));let ct=J.get(D);ct===void 0&&(ct=n.getUniformBlockIndex(rt,D.name),J.set(D,ct))}function Rt(D,rt){let ct=c.get(rt).get(D);l.get(rt)!==ct&&(n.uniformBlockBinding(rt,ct,D.__bindingPointIndex),l.set(rt,ct))}function Ut(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},et=null,ht={},h={},d=new WeakMap,g=[],y=null,p=!1,m=null,M=null,E=null,v=null,w=null,S=null,C=null,x=new Pt(0,0,0),T=0,P=!1,I=null,L=null,W=null,X=null,U=null,jt.set(0,0,n.canvas.width,n.canvas.height),Gt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:It,bindFramebuffer:Dt,drawBuffers:Ct,useProgram:le,setBlending:zt,setMaterial:Nt,setFlipSided:xe,setCullFace:be,setLineWidth:Ae,setPolygonOffset:Le,setScissorTest:ue,activeTexture:_e,bindTexture:N,unbindTexture:Ge,compressedTexImage2D:Kt,compressedTexImage3D:A,texImage2D:$,texImage3D:K,pixelStorei:St,getParameter:ot,updateUBOMapping:At,uniformBlockBinding:Rt,texStorage2D:it,texStorage3D:at,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:ut,viewport:lt,reset:Ut}}function Qg(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,u=new WeakMap,f=new Set,h,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(A,_){return g?new OffscreenCanvas(A,_):Ss("canvas")}function p(A,_,O){let H=1,Y=Kt(A);if((Y.width>O||Y.height>O)&&(H=O/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let it=Math.floor(H*Y.width),at=Math.floor(H*Y.height);h===void 0&&(h=y(it,at));let $=_?y(it,at):h;return $.width=it,$.height=at,$.getContext("2d").drawImage(A,0,0,it,at),wt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+it+"x"+at+")."),$}else return"data"in A&&wt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),A;return A}function m(A){return A.generateMipmaps}function M(A){n.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(A,_,O,H,Y,it=!1){if(A!==null){if(n[A]!==void 0)return n[A];wt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let at;H&&(at=t.get("EXT_texture_norm16"),at||wt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===n.RED&&(O===n.FLOAT&&($=n.R32F),O===n.HALF_FLOAT&&($=n.R16F),O===n.UNSIGNED_BYTE&&($=n.R8),O===n.UNSIGNED_SHORT&&at&&($=at.R16_EXT),O===n.SHORT&&at&&($=at.R16_SNORM_EXT)),_===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.R8UI),O===n.UNSIGNED_SHORT&&($=n.R16UI),O===n.UNSIGNED_INT&&($=n.R32UI),O===n.BYTE&&($=n.R8I),O===n.SHORT&&($=n.R16I),O===n.INT&&($=n.R32I)),_===n.RG&&(O===n.FLOAT&&($=n.RG32F),O===n.HALF_FLOAT&&($=n.RG16F),O===n.UNSIGNED_BYTE&&($=n.RG8),O===n.UNSIGNED_SHORT&&at&&($=at.RG16_EXT),O===n.SHORT&&at&&($=at.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RG8UI),O===n.UNSIGNED_SHORT&&($=n.RG16UI),O===n.UNSIGNED_INT&&($=n.RG32UI),O===n.BYTE&&($=n.RG8I),O===n.SHORT&&($=n.RG16I),O===n.INT&&($=n.RG32I)),_===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RGB8UI),O===n.UNSIGNED_SHORT&&($=n.RGB16UI),O===n.UNSIGNED_INT&&($=n.RGB32UI),O===n.BYTE&&($=n.RGB8I),O===n.SHORT&&($=n.RGB16I),O===n.INT&&($=n.RGB32I)),_===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RGBA8UI),O===n.UNSIGNED_SHORT&&($=n.RGBA16UI),O===n.UNSIGNED_INT&&($=n.RGBA32UI),O===n.BYTE&&($=n.RGBA8I),O===n.SHORT&&($=n.RGBA16I),O===n.INT&&($=n.RGBA32I)),_===n.RGB&&(O===n.UNSIGNED_SHORT&&at&&($=at.RGB16_EXT),O===n.SHORT&&at&&($=at.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),_===n.RGBA){let K=it?bs:$t.getTransfer(Y);O===n.FLOAT&&($=n.RGBA32F),O===n.HALF_FLOAT&&($=n.RGBA16F),O===n.UNSIGNED_BYTE&&($=K===Jt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&at&&($=at.RGBA16_EXT),O===n.SHORT&&at&&($=at.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function w(A,_){let O;return A?_===null||_===fi||_===ss?O=n.DEPTH24_STENCIL8:_===pi?O=n.DEPTH32F_STENCIL8:_===ns&&(O=n.DEPTH24_STENCIL8,wt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===fi||_===ss?O=n.DEPTH_COMPONENT24:_===pi?O=n.DEPTH_COMPONENT32F:_===ns&&(O=n.DEPTH_COMPONENT16),O}function S(A,_){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ie&&A.minFilter!==Se?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function C(A){let _=A.target;_.removeEventListener("dispose",C),T(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&f.delete(_)}function x(A){let _=A.target;_.removeEventListener("dispose",x),I(_)}function T(A){let _=i.get(A);if(_.__webglInit===void 0)return;let O=A.source,H=d.get(O);if(H){let Y=H[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&P(A),Object.keys(H).length===0&&d.delete(O)}i.remove(A)}function P(A){let _=i.get(A);n.deleteTexture(_.__webglTexture);let O=A.source,H=d.get(O);delete H[_.__cacheKey],a.memory.textures--}function I(A){let _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let Y=0;Y<_.__webglFramebuffer[H].length;Y++)n.deleteFramebuffer(_.__webglFramebuffer[H][Y]);else n.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)n.deleteFramebuffer(_.__webglFramebuffer[H]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let O=A.textures;for(let H=0,Y=O.length;H<Y;H++){let it=i.get(O[H]);it.__webglTexture&&(n.deleteTexture(it.__webglTexture),a.memory.textures--),i.remove(O[H])}i.remove(A)}let L=0;function W(){L=0}function X(){return L}function U(A){L=A}function B(){let A=L;return A>=s.maxTextures&&wt("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),L+=1,A}function z(A){let _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function q(A,_){let O=i.get(A);if(A.isVideoTexture&&N(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){let H=A.image;if(H===null)wt("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)wt("WebGLRenderer: Texture marked for update but image is incomplete");else{It(O,A,_);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+_)}function j(A,_){let O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){It(O,A,_);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+_)}function et(A,_){let O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){It(O,A,_);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+_)}function ht(A,_){let O=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){Dt(O,A,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+_)}let xt={[Ke]:n.REPEAT,[yi]:n.CLAMP_TO_EDGE,[Gr]:n.MIRRORED_REPEAT},Yt={[Ie]:n.NEAREST,[mh]:n.NEAREST_MIPMAP_NEAREST,[Ks]:n.NEAREST_MIPMAP_LINEAR,[Se]:n.LINEAR,[Sa]:n.LINEAR_MIPMAP_NEAREST,[on]:n.LINEAR_MIPMAP_LINEAR},jt={[_h]:n.NEVER,[Sh]:n.ALWAYS,[yh]:n.LESS,[oo]:n.LEQUAL,[vh]:n.EQUAL,[lo]:n.GEQUAL,[Mh]:n.GREATER,[bh]:n.NOTEQUAL};function Gt(A,_){if(_.type===pi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Se||_.magFilter===Sa||_.magFilter===Ks||_.magFilter===on||_.minFilter===Se||_.minFilter===Sa||_.minFilter===Ks||_.minFilter===on)&&wt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,xt[_.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,xt[_.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,xt[_.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,Yt[_.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,Yt[_.minFilter]),_.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,jt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ie||_.minFilter!==Ks&&_.minFilter!==on||_.type===pi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Z(A,_){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",C));let H=_.source,Y=d.get(H);Y===void 0&&(Y={},d.set(H,Y));let it=z(_);if(it!==A.__cacheKey){Y[it]===void 0&&(Y[it]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Y[it].usedTimes++;let at=Y[A.__cacheKey];at!==void 0&&(Y[A.__cacheKey].usedTimes--,at.usedTimes===0&&P(_)),A.__cacheKey=it,A.__webglTexture=Y[it].texture}return O}function st(A,_,O){return Math.floor(Math.floor(A/O)/_)}function tt(A,_,O,H){let it=A.updateRanges;if(it.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,O,H,_.data);else{it.sort((St,ut)=>St.start-ut.start);let at=0;for(let St=1;St<it.length;St++){let ut=it[at],lt=it[St],At=ut.start+ut.count,Rt=st(lt.start,_.width,4),Ut=st(ut.start,_.width,4);lt.start<=At+1&&Rt===Ut&&st(lt.start+lt.count-1,_.width,4)===Rt?ut.count=Math.max(ut.count,lt.start+lt.count-ut.start):(++at,it[at]=lt)}it.length=at+1;let $=e.getParameter(n.UNPACK_ROW_LENGTH),K=e.getParameter(n.UNPACK_SKIP_PIXELS),ot=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let St=0,ut=it.length;St<ut;St++){let lt=it[St],At=Math.floor(lt.start/4),Rt=Math.ceil(lt.count/4),Ut=At%_.width,D=Math.floor(At/_.width),rt=Rt,J=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Ut),e.pixelStorei(n.UNPACK_SKIP_ROWS,D),e.texSubImage2D(n.TEXTURE_2D,0,Ut,D,rt,J,O,H,_.data)}A.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,$),e.pixelStorei(n.UNPACK_SKIP_PIXELS,K),e.pixelStorei(n.UNPACK_SKIP_ROWS,ot)}}function It(A,_,O){let H=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=n.TEXTURE_3D);let Y=Z(A,_),it=_.source;e.bindTexture(H,A.__webglTexture,n.TEXTURE0+O);let at=i.get(it);if(it.version!==at.__version||Y===!0){if(e.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let J=$t.getPrimaries($t.workingColorSpace),ct=_.colorSpace===Bi?null:$t.getPrimaries(_.colorSpace),mt=_.colorSpace===Bi||J===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt)}e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let K=p(_.image,!1,s.maxTextureSize);K=Ge(_,K);let ot=r.convert(_.format,_.colorSpace),St=r.convert(_.type),ut=v(_.internalFormat,ot,St,_.normalized,_.colorSpace,_.isVideoTexture);Gt(H,_);let lt,At=_.mipmaps,Rt=_.isVideoTexture!==!0,Ut=at.__version===void 0||Y===!0,D=it.dataReady,rt=S(_,K);if(_.isDepthTexture)ut=w(_.format===ln,_.type),Ut&&(Rt?e.texStorage2D(n.TEXTURE_2D,1,ut,K.width,K.height):e.texImage2D(n.TEXTURE_2D,0,ut,K.width,K.height,0,ot,St,null));else if(_.isDataTexture)if(At.length>0){Rt&&Ut&&e.texStorage2D(n.TEXTURE_2D,rt,ut,At[0].width,At[0].height);for(let J=0,ct=At.length;J<ct;J++)lt=At[J],Rt?D&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,lt.width,lt.height,ot,St,lt.data):e.texImage2D(n.TEXTURE_2D,J,ut,lt.width,lt.height,0,ot,St,lt.data);_.generateMipmaps=!1}else Rt?(Ut&&e.texStorage2D(n.TEXTURE_2D,rt,ut,K.width,K.height),D&&tt(_,K,ot,St)):e.texImage2D(n.TEXTURE_2D,0,ut,K.width,K.height,0,ot,St,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Rt&&Ut&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,ut,At[0].width,At[0].height,K.depth);for(let J=0,ct=At.length;J<ct;J++)if(lt=At[J],_.format!==ai)if(ot!==null)if(Rt){if(D)if(_.layerUpdates.size>0){let mt=kl(lt.width,lt.height,_.format,_.type);for(let Q of _.layerUpdates){let bt=lt.data.subarray(Q*mt/lt.data.BYTES_PER_ELEMENT,(Q+1)*mt/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,Q,lt.width,lt.height,1,ot,bt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,K.depth,ot,lt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,ut,lt.width,lt.height,K.depth,0,lt.data,0,0);else wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Rt?D&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,lt.width,lt.height,K.depth,ot,St,lt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,J,ut,lt.width,lt.height,K.depth,0,ot,St,lt.data)}else{Rt&&Ut&&e.texStorage2D(n.TEXTURE_2D,rt,ut,At[0].width,At[0].height);for(let J=0,ct=At.length;J<ct;J++)lt=At[J],_.format!==ai?ot!==null?Rt?D&&e.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,lt.width,lt.height,ot,lt.data):e.compressedTexImage2D(n.TEXTURE_2D,J,ut,lt.width,lt.height,0,lt.data):wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Rt?D&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,lt.width,lt.height,ot,St,lt.data):e.texImage2D(n.TEXTURE_2D,J,ut,lt.width,lt.height,0,ot,St,lt.data)}else if(_.isDataArrayTexture)if(Rt){if(Ut&&e.texStorage3D(n.TEXTURE_2D_ARRAY,rt,ut,K.width,K.height,K.depth),D)if(_.layerUpdates.size>0){let J=kl(K.width,K.height,_.format,_.type);for(let ct of _.layerUpdates){let mt=K.data.subarray(ct*J/K.data.BYTES_PER_ELEMENT,(ct+1)*J/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ct,K.width,K.height,1,ot,St,mt)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ot,St,K.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,ut,K.width,K.height,K.depth,0,ot,St,K.data);else if(_.isData3DTexture)Rt?(Ut&&e.texStorage3D(n.TEXTURE_3D,rt,ut,K.width,K.height,K.depth),D&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ot,St,K.data)):e.texImage3D(n.TEXTURE_3D,0,ut,K.width,K.height,K.depth,0,ot,St,K.data);else if(_.isFramebufferTexture){if(Ut)if(Rt)e.texStorage2D(n.TEXTURE_2D,rt,ut,K.width,K.height);else{let J=K.width,ct=K.height;for(let mt=0;mt<rt;mt++)e.texImage2D(n.TEXTURE_2D,mt,ut,J,ct,0,ot,St,null),J>>=1,ct>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let J=n.canvas;if(J.hasAttribute("layoutsubtree")||J.setAttribute("layoutsubtree","true"),K.parentNode!==J){J.appendChild(K),f.add(_),J.onpaint=ct=>{let mt=ct.changedElements;for(let Q of f)mt.includes(Q.image)&&(Q.needsUpdate=!0)},J.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,K);else{let mt=n.RGBA,Q=n.RGBA,bt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,mt,Q,bt,K)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(At.length>0){if(Rt&&Ut){let J=Kt(At[0]);e.texStorage2D(n.TEXTURE_2D,rt,ut,J.width,J.height)}for(let J=0,ct=At.length;J<ct;J++)lt=At[J],Rt?D&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,ot,St,lt):e.texImage2D(n.TEXTURE_2D,J,ut,ot,St,lt);_.generateMipmaps=!1}else if(Rt){if(Ut){let J=Kt(K);e.texStorage2D(n.TEXTURE_2D,rt,ut,J.width,J.height)}D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ot,St,K)}else e.texImage2D(n.TEXTURE_2D,0,ut,ot,St,K);m(_)&&M(H),at.__version=it.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Dt(A,_,O){if(_.image.length!==6)return;let H=Z(A,_),Y=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+O);let it=i.get(Y);if(Y.version!==it.__version||H===!0){e.activeTexture(n.TEXTURE0+O);let at=$t.getPrimaries($t.workingColorSpace),$=_.colorSpace===Bi?null:$t.getPrimaries(_.colorSpace),K=_.colorSpace===Bi||at===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let ot=_.isCompressedTexture||_.image[0].isCompressedTexture,St=_.image[0]&&_.image[0].isDataTexture,ut=[];for(let Q=0;Q<6;Q++)!ot&&!St?ut[Q]=p(_.image[Q],!0,s.maxCubemapSize):ut[Q]=St?_.image[Q].image:_.image[Q],ut[Q]=Ge(_,ut[Q]);let lt=ut[0],At=r.convert(_.format,_.colorSpace),Rt=r.convert(_.type),Ut=v(_.internalFormat,At,Rt,_.normalized,_.colorSpace),D=_.isVideoTexture!==!0,rt=it.__version===void 0||H===!0,J=Y.dataReady,ct=S(_,lt);Gt(n.TEXTURE_CUBE_MAP,_);let mt;if(ot){D&&rt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ct,Ut,lt.width,lt.height);for(let Q=0;Q<6;Q++){mt=ut[Q].mipmaps;for(let bt=0;bt<mt.length;bt++){let vt=mt[bt];_.format!==ai?At!==null?D?J&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt,0,0,vt.width,vt.height,At,vt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt,Ut,vt.width,vt.height,0,vt.data):wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt,0,0,vt.width,vt.height,At,Rt,vt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt,Ut,vt.width,vt.height,0,At,Rt,vt.data)}}}else{if(mt=_.mipmaps,D&&rt){mt.length>0&&ct++;let Q=Kt(ut[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ct,Ut,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(St){D?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ut[Q].width,ut[Q].height,At,Rt,ut[Q].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ut,ut[Q].width,ut[Q].height,0,At,Rt,ut[Q].data);for(let bt=0;bt<mt.length;bt++){let de=mt[bt].image[Q].image;D?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt+1,0,0,de.width,de.height,At,Rt,de.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt+1,Ut,de.width,de.height,0,At,Rt,de.data)}}else{D?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,At,Rt,ut[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ut,At,Rt,ut[Q]);for(let bt=0;bt<mt.length;bt++){let vt=mt[bt];D?J&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt+1,0,0,At,Rt,vt.image[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,bt+1,Ut,At,Rt,vt.image[Q])}}}m(_)&&M(n.TEXTURE_CUBE_MAP),it.__version=Y.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function Ct(A,_,O,H,Y,it){let at=r.convert(O.format,O.colorSpace),$=r.convert(O.type),K=v(O.internalFormat,at,$,O.normalized,O.colorSpace),ot=i.get(_),St=i.get(O);if(St.__renderTarget=_,!ot.__hasExternalTextures){let ut=Math.max(1,_.width>>it),lt=Math.max(1,_.height>>it);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?e.texImage3D(Y,it,K,ut,lt,_.depth,0,at,$,null):e.texImage2D(Y,it,K,ut,lt,0,at,$,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),_e(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,Y,St.__webglTexture,0,ue(_)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,Y,St.__webglTexture,it),e.bindFramebuffer(n.FRAMEBUFFER,null)}function le(A,_,O){if(n.bindRenderbuffer(n.RENDERBUFFER,A),_.depthBuffer){let H=_.depthTexture,Y=H&&H.isDepthTexture?H.type:null,it=w(_.stencilBuffer,Y),at=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;_e(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue(_),it,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue(_),it,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,it,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,at,n.RENDERBUFFER,A)}else{let H=_.textures;for(let Y=0;Y<H.length;Y++){let it=H[Y],at=r.convert(it.format,it.colorSpace),$=r.convert(it.type),K=v(it.internalFormat,at,$,it.normalized,it.colorSpace);_e(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue(_),K,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue(_),K,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,K,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Wt(A,_,O){let H=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(_.depthTexture);if(Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Gt(n.TEXTURE_CUBE_MAP,_.depthTexture);let ot=r.convert(_.depthTexture.format),St=r.convert(_.depthTexture.type),ut;_.depthTexture.format===vi?ut=n.DEPTH_COMPONENT24:_.depthTexture.format===ln&&(ut=n.DEPTH24_STENCIL8);for(let lt=0;lt<6;lt++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,ut,_.width,_.height,0,ot,St,null)}}else q(_.depthTexture,0);let it=Y.__webglTexture,at=ue(_),$=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,K=_.depthTexture.format===ln?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===vi)_e(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,$,it,0,at):n.framebufferTexture2D(n.FRAMEBUFFER,K,$,it,0);else if(_.depthTexture.format===ln)_e(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,$,it,0,at):n.framebufferTexture2D(n.FRAMEBUFFER,K,$,it,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function qt(A){let _=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){let H=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){let Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=H}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)Wt(_.__webglFramebuffer[H],A,H);else{let H=A.texture.mipmaps;H&&H.length>0?Wt(_.__webglFramebuffer[0],A,0):Wt(_.__webglFramebuffer,A,0)}else if(O){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=n.createRenderbuffer(),le(_.__webglDepthbuffer[H],A,!1);else{let Y=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=_.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,it)}}else{let H=A.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),le(_.__webglDepthbuffer,A,!1);else{let Y=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,it)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function zt(A,_,O){let H=i.get(A);_!==void 0&&Ct(H.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&qt(A)}function Nt(A){let _=A.texture,O=i.get(A),H=i.get(_);A.addEventListener("dispose",x);let Y=A.textures,it=A.isWebGLCubeRenderTarget===!0,at=Y.length>1;if(at||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=_.version,a.memory.textures++),it){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let K=0;K<_.mipmaps.length;K++)O.__webglFramebuffer[$][K]=n.createFramebuffer()}else O.__webglFramebuffer[$]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)O.__webglFramebuffer[$]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(at)for(let $=0,K=Y.length;$<K;$++){let ot=i.get(Y[$]);ot.__webglTexture===void 0&&(ot.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&_e(A)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<Y.length;$++){let K=Y[$];O.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[$]);let ot=r.convert(K.format,K.colorSpace),St=r.convert(K.type),ut=v(K.internalFormat,ot,St,K.normalized,K.colorSpace,A.isXRRenderTarget===!0),lt=ue(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,lt,ut,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,O.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),le(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(it){e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),Gt(n.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Ct(O.__webglFramebuffer[$][K],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,K);else Ct(O.__webglFramebuffer[$],A,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);m(_)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(at){for(let $=0,K=Y.length;$<K;$++){let ot=Y[$],St=i.get(ot),ut=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ut=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ut,St.__webglTexture),Gt(ut,ot),Ct(O.__webglFramebuffer,A,ot,n.COLOR_ATTACHMENT0+$,ut,0),m(ot)&&M(ut)}e.unbindTexture()}else{let $=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture($,H.__webglTexture),Gt($,_),_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Ct(O.__webglFramebuffer[K],A,_,n.COLOR_ATTACHMENT0,$,K);else Ct(O.__webglFramebuffer,A,_,n.COLOR_ATTACHMENT0,$,0);m(_)&&M($),e.unbindTexture()}A.depthBuffer&&qt(A)}function xe(A){let _=A.textures;for(let O=0,H=_.length;O<H;O++){let Y=_[O];if(m(Y)){let it=E(A),at=i.get(Y).__webglTexture;e.bindTexture(it,at),M(it),e.unbindTexture()}}}let be=[],Ae=[];function Le(A){if(A.samples>0){if(_e(A)===!1){let _=A.textures,O=A.width,H=A.height,Y=n.COLOR_BUFFER_BIT,it=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=i.get(A),$=_.length>1;if($)for(let ot=0;ot<_.length;ot++)e.bindFramebuffer(n.FRAMEBUFFER,at.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,at.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer);let K=A.texture.mipmaps;K&&K.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,at.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let ot=0;ot<_.length;ot++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,at.__webglColorRenderbuffer[ot]);let St=i.get(_[ot]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,St,0)}n.blitFramebuffer(0,0,O,H,0,0,O,H,Y,n.NEAREST),l===!0&&(be.length=0,Ae.length=0,be.push(n.COLOR_ATTACHMENT0+ot),A.depthBuffer&&A.resolveDepthBuffer===!1&&(be.push(it),Ae.push(it),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ae)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let ot=0;ot<_.length;ot++){e.bindFramebuffer(n.FRAMEBUFFER,at.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.RENDERBUFFER,at.__webglColorRenderbuffer[ot]);let St=i.get(_[ot]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,at.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.TEXTURE_2D,St,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let _=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ue(A){return Math.min(s.maxSamples,A.samples)}function _e(A){let _=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(A){let _=a.render.frame;u.get(A)!==_&&(u.set(A,_),A.update())}function Ge(A,_){let O=A.colorSpace,H=A.format,Y=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Ms&&O!==Bi&&($t.getTransfer(O)===Jt?(H!==ai||Y!==Xe)&&wt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Lt("WebGLTextures: Unsupported texture color space:",O)),_}function Kt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=W,this.getTextureUnits=X,this.setTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=j,this.setTexture3D=et,this.setTextureCube=ht,this.rebindTextures=zt,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=Ct,this.useMultisampledRTT=_e,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function t0(n,t){function e(i,s=Bi){let r,a=$t.getTransfer(s);if(i===Xe)return n.UNSIGNED_BYTE;if(i===Ta)return n.UNSIGNED_SHORT_4_4_4_4;if(i===wa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Al)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Cl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Tl)return n.BYTE;if(i===wl)return n.SHORT;if(i===ns)return n.UNSIGNED_SHORT;if(i===Ea)return n.INT;if(i===fi)return n.UNSIGNED_INT;if(i===pi)return n.FLOAT;if(i===Si)return n.HALF_FLOAT;if(i===Rl)return n.ALPHA;if(i===Pl)return n.RGB;if(i===ai)return n.RGBA;if(i===vi)return n.DEPTH_COMPONENT;if(i===ln)return n.DEPTH_STENCIL;if(i===Il)return n.RED;if(i===Aa)return n.RED_INTEGER;if(i===cn)return n.RG;if(i===Ca)return n.RG_INTEGER;if(i===Ra)return n.RGBA_INTEGER;if(i===js||i===Qs||i===tr||i===er)if(a===Jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===js)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===js)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===er)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Pa||i===Ia||i===La||i===Da)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===La)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Na||i===Fa||i===Ua||i===Ba||i===Oa||i===ir||i===za)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Na||i===Fa)return a===Jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ua)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ba)return r.COMPRESSED_R11_EAC;if(i===Oa)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ir)return r.COMPRESSED_RG11_EAC;if(i===za)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ka||i===Va||i===Ha||i===Ga||i===Wa||i===Xa||i===qa||i===Ya||i===$a||i===Za||i===Ja||i===Ka||i===ja||i===Qa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ka)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Va)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ha)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ga)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Wa)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Xa)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===qa)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ya)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===$a)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Za)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ja)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ka)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ja)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qa)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===to||i===eo||i===io)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===to)return a===Jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===eo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===no||i===so||i===nr||i===ro)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===no)return r.COMPRESSED_RED_RGTC1_EXT;if(i===so)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===nr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ro)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ss?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var e0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i0=`
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

}`,tc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Is(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ei({vertexShader:e0,fragmentShader:i0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new nt(new Fi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ec=class extends ui{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null,y=typeof XRWebGLBinding<"u",p=new tc,m={},M=e.getContextAttributes(),E=null,v=null,w=[],S=[],C=new gt,x=null,T=new Re;T.viewport=new ce;let P=new Re;P.viewport=new ce;let I=[T,P],L=new va,W=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let st=w[Z];return st===void 0&&(st=new $n,w[Z]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Z){let st=w[Z];return st===void 0&&(st=new $n,w[Z]=st),st.getGripSpace()},this.getHand=function(Z){let st=w[Z];return st===void 0&&(st=new $n,w[Z]=st),st.getHandSpace()};function U(Z){let st=S.indexOf(Z.inputSource);if(st===-1)return;let tt=w[st];tt!==void 0&&(tt.update(Z.inputSource,Z.frame,c||a),tt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function B(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",z);for(let Z=0;Z<w.length;Z++){let st=S[Z];st!==null&&(S[Z]=null,w[Z].disconnect(st))}W=null,X=null,p.reset();for(let Z in m)delete m[Z];t.setRenderTarget(E),d=null,h=null,f=null,s=null,v=null,Gt.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,i.isPresenting===!0&&wt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&wt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",B),s.addEventListener("inputsourceschange",z),M.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let tt=null,It=null,Dt=null;M.depth&&(Dt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=M.stencil?ln:vi,It=M.stencil?ss:fi);let Ct={colorFormat:e.RGBA8,depthFormat:Dt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ct),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),v=new Qe(h.textureWidth,h.textureHeight,{format:ai,type:Xe,depthTexture:new Ni(h.textureWidth,h.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let tt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Qe(d.framebufferWidth,d.framebufferHeight,{format:ai,type:Xe,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Gt.setContext(s),Gt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function z(Z){for(let st=0;st<Z.removed.length;st++){let tt=Z.removed[st],It=S.indexOf(tt);It>=0&&(S[It]=null,w[It].disconnect(tt))}for(let st=0;st<Z.added.length;st++){let tt=Z.added[st],It=S.indexOf(tt);if(It===-1){for(let Ct=0;Ct<w.length;Ct++)if(Ct>=S.length){S.push(tt),It=Ct;break}else if(S[Ct]===null){S[Ct]=tt,It=Ct;break}if(It===-1)break}let Dt=w[It];Dt&&Dt.connect(tt)}}let q=new R,j=new R;function et(Z,st,tt){q.setFromMatrixPosition(st.matrixWorld),j.setFromMatrixPosition(tt.matrixWorld);let It=q.distanceTo(j),Dt=st.projectionMatrix.elements,Ct=tt.projectionMatrix.elements,le=Dt[14]/(Dt[10]-1),Wt=Dt[14]/(Dt[10]+1),qt=(Dt[9]+1)/Dt[5],zt=(Dt[9]-1)/Dt[5],Nt=(Dt[8]-1)/Dt[0],xe=(Ct[8]+1)/Ct[0],be=le*Nt,Ae=le*xe,Le=It/(-Nt+xe),ue=Le*-Nt;if(st.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ue),Z.translateZ(Le),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Dt[10]===-1)Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{let _e=le+Le,N=Wt+Le,Ge=be-ue,Kt=Ae+(It-ue),A=qt*Wt/N*_e,_=zt*Wt/N*_e;Z.projectionMatrix.makePerspective(Ge,Kt,A,_,_e,N),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ht(Z,st){st===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(st.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let st=Z.near,tt=Z.far;p.texture!==null&&(p.depthNear>0&&(st=p.depthNear),p.depthFar>0&&(tt=p.depthFar)),L.near=P.near=T.near=st,L.far=P.far=T.far=tt,(W!==L.near||X!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),W=L.near,X=L.far),L.layers.mask=Z.layers.mask|6,T.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;let It=Z.parent,Dt=L.cameras;ht(L,It);for(let Ct=0;Ct<Dt.length;Ct++)ht(Dt[Ct],It);Dt.length===2?et(L,T,P):L.projectionMatrix.copy(T.projectionMatrix),xt(Z,L,It)};function xt(Z,st,tt){tt===null?Z.matrix.copy(st.matrixWorld):(Z.matrix.copy(tt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(st.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(st.projectionMatrix),Z.projectionMatrixInverse.copy(st.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=yn*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(L)},this.getCameraTexture=function(Z){return m[Z]};let Yt=null;function jt(Z,st){if(u=st.getViewerPose(c||a),g=st,u!==null){let tt=u.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let It=!1;tt.length!==L.cameras.length&&(L.cameras.length=0,It=!0);for(let Wt=0;Wt<tt.length;Wt++){let qt=tt[Wt],zt=null;if(d!==null)zt=d.getViewport(qt);else{let xe=f.getViewSubImage(h,qt);zt=xe.viewport,Wt===0&&(t.setRenderTargetTextures(v,xe.colorTexture,xe.depthStencilTexture),t.setRenderTarget(v))}let Nt=I[Wt];Nt===void 0&&(Nt=new Re,Nt.layers.enable(Wt),Nt.viewport=new ce,I[Wt]=Nt),Nt.matrix.fromArray(qt.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray(qt.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(zt.x,zt.y,zt.width,zt.height),Wt===0&&(L.matrix.copy(Nt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),It===!0&&L.cameras.push(Nt)}let Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){f=i.getBinding();let Wt=f.getDepthInformation(tt[0]);Wt&&Wt.isValid&&Wt.texture&&p.init(Wt,s.renderState)}if(Dt&&Dt.includes("camera-access")&&y){t.state.unbindTexture(),f=i.getBinding();for(let Wt=0;Wt<tt.length;Wt++){let qt=tt[Wt].camera;if(qt){let zt=m[qt];zt||(zt=new Is,m[qt]=zt);let Nt=f.getCameraImage(qt);zt.sourceTexture=Nt}}}}for(let tt=0;tt<w.length;tt++){let It=S[tt],Dt=w[tt];It!==null&&Dt!==void 0&&Dt.update(It,st,c||a)}Yt&&Yt(Z,st),st.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:st}),g=null}let Gt=new Qh;Gt.setAnimationLoop(jt),this.setAnimationLoop=function(Z){Yt=Z},this.dispose=function(){}}},n0=new ae,ru=new Ft;ru.set(-1,0,0,0,1,0,0,0,1);function s0(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Bl(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,M,E,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),f(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&d(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),y(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,E):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ve&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ve&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let M=t.get(m),E=M.envMap,v=M.envMapRotation;E&&(p.envMap.value=E,p.envMapRotation.value.setFromMatrix4(n0.makeRotationFromEuler(v)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(ru),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,E){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=E*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ve&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){let M=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function r0(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,w){let S=w.program;i.uniformBlockBinding(v,S)}function c(v,w){let S=s[v.id];S===void 0&&(p(v),S=u(v),s[v.id]=S,v.addEventListener("dispose",M));let C=w.program;i.updateUBOMapping(v,C);let x=t.render.frame;r[v.id]!==x&&(h(v),r[v.id]=x)}function u(v){let w=f();v.__bindingPointIndex=w;let S=n.createBuffer(),C=v.__size,x=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,C,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let w=s[v.id],S=v.uniforms,C=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let x=0,T=S.length;x<T;x++){let P=S[x];if(Array.isArray(P))for(let I=0,L=P.length;I<L;I++)d(P[I],x,I,C);else d(P,x,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(v,w,S,C){if(y(v,w,S,C)===!0){let x=v.__offset,T=v.value;if(Array.isArray(T)){let P=0;for(let I=0;I<T.length;I++){let L=T[I],W=m(L);g(L,v.__data,P),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(P+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,v.__data)}}function g(v,w,S){typeof v=="number"||typeof v=="boolean"?w[0]=v:v.isMatrix3?(w[0]=v.elements[0],w[1]=v.elements[1],w[2]=v.elements[2],w[3]=0,w[4]=v.elements[3],w[5]=v.elements[4],w[6]=v.elements[5],w[7]=0,w[8]=v.elements[6],w[9]=v.elements[7],w[10]=v.elements[8],w[11]=0):ArrayBuffer.isView(v)?w.set(new v.constructor(v.buffer,v.byteOffset,w.length)):v.toArray(w,S)}function y(v,w,S,C){let x=v.value,T=w+"_"+S;if(C[T]===void 0)return typeof x=="number"||typeof x=="boolean"?C[T]=x:ArrayBuffer.isView(x)?C[T]=x.slice():C[T]=x.clone(),!0;{let P=C[T];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return C[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function p(v){let w=v.uniforms,S=0,C=16;for(let T=0,P=w.length;T<P;T++){let I=Array.isArray(w[T])?w[T]:[w[T]];for(let L=0,W=I.length;L<W;L++){let X=I[L],U=Array.isArray(X.value)?X.value:[X.value];for(let B=0,z=U.length;B<z;B++){let q=U[B],j=m(q),et=S%C,ht=et%j.boundary,xt=et+ht;S+=ht,xt!==0&&C-xt<j.storage&&(S+=C-xt),X.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=S,S+=j.storage}}}let x=S%C;return x>0&&(S+=C-x),v.__size=S,v.__cache={},this}function m(v){let w={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?wt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(w.boundary=16,w.storage=v.byteLength):wt("WebGLRenderer: Unsupported uniform value type.",v),w}function M(v){let w=v.target;w.removeEventListener("dispose",M);let S=a.indexOf(w.__bindingPointIndex);a.splice(S,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function E(){for(let v in s)n.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:E}}var a0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ei=null;function o0(){return Ei===null&&(Ei=new $r(a0,16,16,cn,Si),Ei.name="DFG_LUT",Ei.minFilter=Se,Ei.magFilter=Se,Ei.wrapS=yi,Ei.wrapT=yi,Ei.generateMipmaps=!1,Ei.needsUpdate=!0),Ei}var fo=class{constructor(t={}){let{canvas:e=Eh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Xe}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let y=d,p=new Set([Ra,Ca,Aa]),m=new Set([Xe,fi,ns,ss,Ta,wa]),M=new Uint32Array(4),E=new Int32Array(4),v=new R,w=null,S=null,C=[],x=[],T=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,I=!1,L=null,W=null,X=null,U=null;this._outputColorSpace=Je;let B=0,z=0,q=null,j=-1,et=null,ht=new ce,xt=new ce,Yt=null,jt=new Pt(0),Gt=0,Z=e.width,st=e.height,tt=1,It=null,Dt=null,Ct=new ce(0,0,Z,st),le=new ce(0,0,Z,st),Wt=!1,qt=new Zn,zt=!1,Nt=!1,xe=new ae,be=new R,Ae=new ce,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ue=!1;function _e(){return q===null?tt:1}let N=i;function Ge(b,F){return e.getContext(b,F)}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"185"}`),e.addEventListener("webglcontextlost",de,!1),e.addEventListener("webglcontextrestored",se,!1),e.addEventListener("webglcontextcreationerror",mi,!1),N===null){let F="webgl2";if(N=Ge(F,b),N===null)throw Ge(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Lt("WebGLRenderer: "+b.message),b}let Kt,A,_,O,H,Y,it,at,$,K,ot,St,ut,lt,At,Rt,Ut,D,rt,J,ct,mt,Q;function bt(){Kt=new pm(N),Kt.init(),ct=new t0(N,Kt),A=new am(N,Kt,t,ct),_=new jg(N,Kt),A.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),W=N.createFramebuffer(),X=N.createFramebuffer(),U=N.createFramebuffer(),O=new xm(N),H=new Og,Y=new Qg(N,Kt,_,H,A,ct,O),it=new fm(P),at=new vd(N),mt=new sm(N,at),$=new mm(N,at,O,mt),K=new ym(N,$,at,mt,O),D=new _m(N,A,Y),At=new om(H),ot=new Bg(P,it,Kt,A,mt,At),St=new s0(P,H),ut=new kg,lt=new qg(Kt),Ut=new nm(P,it,_,K,g,l),Rt=new Kg(P,K,A),Q=new r0(N,O,A,_),rt=new rm(N,Kt,O),J=new gm(N,Kt,O),O.programs=ot.programs,P.capabilities=A,P.extensions=Kt,P.properties=H,P.renderLists=ut,P.shadowMap=Rt,P.state=_,P.info=O}bt(),y!==Xe&&(T=new Mm(y,e.width,e.height,o,s,r));let vt=new ec(P,N);this.xr=vt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let b=Kt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Kt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(b){b!==void 0&&(tt=b,this.setSize(Z,st,!1))},this.getSize=function(b){return b.set(Z,st)},this.setSize=function(b,F,G=!0){if(vt.isPresenting){wt("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=b,st=F,e.width=Math.floor(b*tt),e.height=Math.floor(F*tt),G===!0&&(e.style.width=b+"px",e.style.height=F+"px"),T!==null&&T.setSize(e.width,e.height),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(Z*tt,st*tt).floor()},this.setDrawingBufferSize=function(b,F,G){Z=b,st=F,tt=G,e.width=Math.floor(b*G),e.height=Math.floor(F*G),this.setViewport(0,0,b,F)},this.setEffects=function(b){if(y===Xe){Lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let F=0;F<b.length;F++)if(b[F].isOutputPass===!0){wt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ht)},this.getViewport=function(b){return b.copy(Ct)},this.setViewport=function(b,F,G,k){b.isVector4?Ct.set(b.x,b.y,b.z,b.w):Ct.set(b,F,G,k),_.viewport(ht.copy(Ct).multiplyScalar(tt).round())},this.getScissor=function(b){return b.copy(le)},this.setScissor=function(b,F,G,k){b.isVector4?le.set(b.x,b.y,b.z,b.w):le.set(b,F,G,k),_.scissor(xt.copy(le).multiplyScalar(tt).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(b){_.setScissorTest(Wt=b)},this.setOpaqueSort=function(b){It=b},this.setTransparentSort=function(b){Dt=b},this.getClearColor=function(b){return b.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor(...arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,G=!0){let k=0;if(b){let V=!1;if(q!==null){let pt=q.texture.format;V=p.has(pt)}if(V){let pt=q.texture.type,yt=m.has(pt),ft=Ut.getClearColor(),Mt=Ut.getClearAlpha(),Et=ft.r,Bt=ft.g,Xt=ft.b;yt?(M[0]=Et,M[1]=Bt,M[2]=Xt,M[3]=Mt,N.clearBufferuiv(N.COLOR,0,M)):(E[0]=Et,E[1]=Bt,E[2]=Xt,E[3]=Mt,N.clearBufferiv(N.COLOR,0,E))}else k|=N.COLOR_BUFFER_BIT}F&&(k|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),L=b},this.dispose=function(){e.removeEventListener("webglcontextlost",de,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",mi,!1),Ut.dispose(),ut.dispose(),lt.dispose(),H.dispose(),it.dispose(),K.dispose(),mt.dispose(),Q.dispose(),ot.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",cc),vt.removeEventListener("sessionend",hc),un.stop()};function de(b){b.preventDefault(),Dl("WebGLRenderer: Context Lost."),I=!0}function se(){Dl("WebGLRenderer: Context Restored."),I=!1;let b=O.autoReset,F=Rt.enabled,G=Rt.autoUpdate,k=Rt.needsUpdate,V=Rt.type;bt(),O.autoReset=b,Rt.enabled=F,Rt.autoUpdate=G,Rt.needsUpdate=k,Rt.type=V}function mi(b){Lt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function gi(b){let F=b.target;F.removeEventListener("dispose",gi),hu(F)}function hu(b){uu(b),H.remove(b)}function uu(b){let F=H.get(b).programs;F!==void 0&&(F.forEach(function(G){ot.releaseProgram(G)}),b.isShaderMaterial&&ot.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,G,k,V,pt){F===null&&(F=Le);let yt=V.isMesh&&V.matrixWorld.determinantAffine()<0,ft=pu(b,F,G,k,V);_.setMaterial(k,yt);let Mt=G.index,Et=1;if(k.wireframe===!0){if(Mt=$.getWireframeAttribute(G),Mt===void 0)return;Et=2}let Bt=G.drawRange,Xt=G.attributes.position,Tt=Bt.start*Et,Qt=(Bt.start+Bt.count)*Et;pt!==null&&(Tt=Math.max(Tt,pt.start*Et),Qt=Math.min(Qt,(pt.start+pt.count)*Et)),Mt!==null?(Tt=Math.max(Tt,0),Qt=Math.min(Qt,Mt.count)):Xt!=null&&(Tt=Math.max(Tt,0),Qt=Math.min(Qt,Xt.count));let pe=Qt-Tt;if(pe<0||pe===1/0)return;mt.setup(V,k,ft,G,Mt);let fe,ee=rt;if(Mt!==null&&(fe=at.get(Mt),ee=J,ee.setIndex(fe)),V.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*_e()),ee.setMode(N.LINES)):ee.setMode(N.TRIANGLES);else if(V.isLine){let Ne=k.linewidth;Ne===void 0&&(Ne=1),_.setLineWidth(Ne*_e()),V.isLineSegments?ee.setMode(N.LINES):V.isLineLoop?ee.setMode(N.LINE_LOOP):ee.setMode(N.LINE_STRIP)}else V.isPoints?ee.setMode(N.POINTS):V.isSprite&&ee.setMode(N.TRIANGLES);if(V.isBatchedMesh)if(Kt.get("WEBGL_multi_draw"))ee.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Ne=V._multiDrawStarts,_t=V._multiDrawCounts,Ye=V._multiDrawCount,Zt=Mt?at.get(Mt).bytesPerElement:1,ni=H.get(k).currentProgram.getUniforms();for(let xi=0;xi<Ye;xi++)ni.setValue(N,"_gl_DrawID",xi),ee.render(Ne[xi]/Zt,_t[xi])}else if(V.isInstancedMesh)ee.renderInstances(Tt,pe,V.count);else if(G.isInstancedBufferGeometry){let Ne=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,_t=Math.min(G.instanceCount,Ne);ee.renderInstances(Tt,pe,_t)}else ee.render(Tt,pe)};function lc(b,F,G){b.transparent===!0&&b.side===He&&b.forceSinglePass===!1?(b.side=Ve,b.needsUpdate=!0,lr(b,F,G),b.side=Li,b.needsUpdate=!0,lr(b,F,G),b.side=He):lr(b,F,G)}this.compile=function(b,F,G=null){G===null&&(G=b),S=lt.get(G),S.init(F),x.push(S),G.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),b!==G&&b.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),S.setupLights();let k=new Set;return b.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let pt=V.material;if(pt)if(Array.isArray(pt))for(let yt=0;yt<pt.length;yt++){let ft=pt[yt];lc(ft,G,V),k.add(ft)}else lc(pt,G,V),k.add(pt)}),S=x.pop(),k},this.compileAsync=function(b,F,G=null){let k=this.compile(b,F,G);return new Promise(V=>{function pt(){if(k.forEach(function(yt){H.get(yt).currentProgram.isReady()&&k.delete(yt)}),k.size===0){V(b);return}setTimeout(pt,10)}Kt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let Ao=null;function du(b){Ao&&Ao(b)}function cc(){un.stop()}function hc(){un.start()}let un=new Qh;un.setAnimationLoop(du),typeof self<"u"&&un.setContext(self),this.setAnimationLoop=function(b){Ao=b,vt.setAnimationLoop(b),b===null?un.stop():un.start()},vt.addEventListener("sessionstart",cc),vt.addEventListener("sessionend",hc),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){Lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(b,F);let G=vt.enabled===!0&&vt.isPresenting===!0,k=T!==null&&(q===null||G)&&T.begin(P,q);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(vt.cameraAutoUpdate===!0&&vt.updateCamera(F),F=vt.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,F,q),S=lt.get(b,x.length),S.init(F),S.state.textureUnits=Y.getTextureUnits(),x.push(S),xe.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),qt.setFromProjectionMatrix(xe,hi,F.reversedDepth),Nt=this.localClippingEnabled,zt=At.init(this.clippingPlanes,Nt),w=ut.get(b,C.length),w.init(),C.push(w),vt.enabled===!0&&vt.isPresenting===!0){let yt=P.xr.getDepthSensingMesh();yt!==null&&Co(yt,F,-1/0,P.sortObjects)}Co(b,F,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(It,Dt,F.reversedDepth),ue=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,ue&&Ut.addToRenderList(w,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),zt===!0&&At.beginShadows();let V=S.state.shadowsArray;if(Rt.render(V,b,F),zt===!0&&At.endShadows(),(k&&T.hasRenderPass())===!1){let yt=w.opaque,ft=w.transmissive;if(S.setupLights(),F.isArrayCamera){let Mt=F.cameras;if(ft.length>0)for(let Et=0,Bt=Mt.length;Et<Bt;Et++){let Xt=Mt[Et];dc(yt,ft,b,Xt)}ue&&Ut.render(b);for(let Et=0,Bt=Mt.length;Et<Bt;Et++){let Xt=Mt[Et];uc(w,b,Xt,Xt.viewport)}}else ft.length>0&&dc(yt,ft,b,F),ue&&Ut.render(b),uc(w,b,F)}q!==null&&z===0&&(Y.updateMultisampleRenderTarget(q),Y.updateRenderTargetMipmap(q)),k&&T.end(P),b.isScene===!0&&b.onAfterRender(P,b,F),mt.resetDefaultState(),j=-1,et=null,x.pop(),x.length>0?(S=x[x.length-1],Y.setTextureUnits(S.state.textureUnits),zt===!0&&At.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,L!==null&&L.renderEnd()};function Co(b,F,G,k){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLightProbeGrid)S.pushLightProbeGrid(b);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||qt.intersectsSprite(b)){k&&Ae.setFromMatrixPosition(b.matrixWorld).applyMatrix4(xe);let yt=K.update(b),ft=b.material;ft.visible&&w.push(b,yt,ft,G,Ae.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||qt.intersectsObject(b))){let yt=K.update(b),ft=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ae.copy(b.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Ae.copy(yt.boundingSphere.center)),Ae.applyMatrix4(b.matrixWorld).applyMatrix4(xe)),Array.isArray(ft)){let Mt=yt.groups;for(let Et=0,Bt=Mt.length;Et<Bt;Et++){let Xt=Mt[Et],Tt=ft[Xt.materialIndex];Tt&&Tt.visible&&w.push(b,yt,Tt,G,Ae.z,Xt)}}else ft.visible&&w.push(b,yt,ft,G,Ae.z,null)}}let pt=b.children;for(let yt=0,ft=pt.length;yt<ft;yt++)Co(pt[yt],F,G,k)}function uc(b,F,G,k){let{opaque:V,transmissive:pt,transparent:yt}=b;S.setupLightsView(G),zt===!0&&At.setGlobalState(P.clippingPlanes,G),k&&_.viewport(ht.copy(k)),V.length>0&&or(V,F,G),pt.length>0&&or(pt,F,G),yt.length>0&&or(yt,F,G),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function dc(b,F,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[k.id]===void 0){let Tt=Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[k.id]=new Qe(1,1,{generateMipmaps:!0,type:Tt?Si:Xe,minFilter:on,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace})}let pt=S.state.transmissionRenderTarget[k.id],yt=k.viewport||ht;pt.setSize(yt.z*P.transmissionResolutionScale,yt.w*P.transmissionResolutionScale);let ft=P.getRenderTarget(),Mt=P.getActiveCubeFace(),Et=P.getActiveMipmapLevel();P.setRenderTarget(pt),P.getClearColor(jt),Gt=P.getClearAlpha(),Gt<1&&P.setClearColor(16777215,.5),P.clear(),ue&&Ut.render(G);let Bt=P.toneMapping;P.toneMapping=di;let Xt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),S.setupLightsView(k),zt===!0&&At.setGlobalState(P.clippingPlanes,k),or(b,G,k),Y.updateMultisampleRenderTarget(pt),Y.updateRenderTargetMipmap(pt),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let Qt=0,pe=F.length;Qt<pe;Qt++){let fe=F[Qt],{object:ee,geometry:Ne,material:_t,group:Ye}=fe;if(_t.side===He&&ee.layers.test(k.layers)){let Zt=_t.side;_t.side=Ve,_t.needsUpdate=!0,fc(ee,G,k,Ne,_t,Ye),_t.side=Zt,_t.needsUpdate=!0,Tt=!0}}Tt===!0&&(Y.updateMultisampleRenderTarget(pt),Y.updateRenderTargetMipmap(pt))}P.setRenderTarget(ft,Mt,Et),P.setClearColor(jt,Gt),Xt!==void 0&&(k.viewport=Xt),P.toneMapping=Bt}function or(b,F,G){let k=F.isScene===!0?F.overrideMaterial:null;for(let V=0,pt=b.length;V<pt;V++){let yt=b[V],{object:ft,geometry:Mt,group:Et}=yt,Bt=yt.material;Bt.allowOverride===!0&&k!==null&&(Bt=k),ft.layers.test(G.layers)&&fc(ft,F,G,Mt,Bt,Et)}}function fc(b,F,G,k,V,pt){b.onBeforeRender(P,F,G,k,V,pt),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(P,F,G,k,b,pt),V.transparent===!0&&V.side===He&&V.forceSinglePass===!1?(V.side=Ve,V.needsUpdate=!0,P.renderBufferDirect(G,F,k,V,b,pt),V.side=Li,V.needsUpdate=!0,P.renderBufferDirect(G,F,k,V,b,pt),V.side=He):P.renderBufferDirect(G,F,k,V,b,pt),b.onAfterRender(P,F,G,k,V,pt)}function lr(b,F,G){F.isScene!==!0&&(F=Le);let k=H.get(b),V=S.state.lights,pt=S.state.shadowsArray,yt=V.state.version,ft=ot.getParameters(b,V.state,pt,F,G,S.state.lightProbeGridArray),Mt=ot.getProgramCacheKey(ft),Et=k.programs;k.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?F.environment:null,k.fog=F.fog;let Bt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;k.envMap=it.get(b.envMap||k.environment,Bt),k.envMapRotation=k.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Et===void 0&&(b.addEventListener("dispose",gi),Et=new Map,k.programs=Et);let Xt=Et.get(Mt);if(Xt!==void 0){if(k.currentProgram===Xt&&k.lightsStateVersion===yt)return mc(b,ft),Xt}else ft.uniforms=ot.getUniforms(b),L!==null&&b.isNodeMaterial&&L.build(b,G,ft),b.onBeforeCompile(ft,P),Xt=ot.acquireProgram(ft,Mt),Et.set(Mt,Xt),k.uniforms=ft.uniforms;let Tt=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Tt.clippingPlanes=At.uniform),mc(b,ft),k.needsLights=gu(b),k.lightsStateVersion=yt,k.needsLights&&(Tt.ambientLightColor.value=V.state.ambient,Tt.lightProbe.value=V.state.probe,Tt.directionalLights.value=V.state.directional,Tt.directionalLightShadows.value=V.state.directionalShadow,Tt.spotLights.value=V.state.spot,Tt.spotLightShadows.value=V.state.spotShadow,Tt.rectAreaLights.value=V.state.rectArea,Tt.ltc_1.value=V.state.rectAreaLTC1,Tt.ltc_2.value=V.state.rectAreaLTC2,Tt.pointLights.value=V.state.point,Tt.pointLightShadows.value=V.state.pointShadow,Tt.hemisphereLights.value=V.state.hemi,Tt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Tt.spotLightMatrix.value=V.state.spotLightMatrix,Tt.spotLightMap.value=V.state.spotLightMap,Tt.pointShadowMatrix.value=V.state.pointShadowMatrix),k.lightProbeGrid=S.state.lightProbeGridArray.length>0,k.currentProgram=Xt,k.uniformsList=null,Xt}function pc(b){if(b.uniformsList===null){let F=b.currentProgram.getUniforms();b.uniformsList=os.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function mc(b,F){let G=H.get(b);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function fu(b,F){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;v.setFromMatrixPosition(F.matrixWorld);for(let G=0,k=b.length;G<k;G++){let V=b[G];if(V.texture!==null&&V.boundingBox.containsPoint(v))return V}return null}function pu(b,F,G,k,V){F.isScene!==!0&&(F=Le),Y.resetTextureUnits();let pt=F.fog,yt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?F.environment:null,ft=q===null?P.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:$t.workingColorSpace,Mt=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Et=it.get(k.envMap||yt,Mt),Bt=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Xt=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Tt=!!G.morphAttributes.position,Qt=!!G.morphAttributes.normal,pe=!!G.morphAttributes.color,fe=di;k.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(fe=P.toneMapping);let ee=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ne=ee!==void 0?ee.length:0,_t=H.get(k),Ye=S.state.lights;if(zt===!0&&(Nt===!0||b!==et)){let re=b===et&&k.id===j;At.setState(k,b,re)}let Zt=!1;k.version===_t.__version?(_t.needsLights&&_t.lightsStateVersion!==Ye.state.version||_t.outputColorSpace!==ft||V.isBatchedMesh&&_t.batching===!1||!V.isBatchedMesh&&_t.batching===!0||V.isBatchedMesh&&_t.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&_t.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&_t.instancing===!1||!V.isInstancedMesh&&_t.instancing===!0||V.isSkinnedMesh&&_t.skinning===!1||!V.isSkinnedMesh&&_t.skinning===!0||V.isInstancedMesh&&_t.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&_t.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&_t.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&_t.instancingMorph===!1&&V.morphTexture!==null||_t.envMap!==Et||k.fog===!0&&_t.fog!==pt||_t.numClippingPlanes!==void 0&&(_t.numClippingPlanes!==At.numPlanes||_t.numIntersection!==At.numIntersection)||_t.vertexAlphas!==Bt||_t.vertexTangents!==Xt||_t.morphTargets!==Tt||_t.morphNormals!==Qt||_t.morphColors!==pe||_t.toneMapping!==fe||_t.morphTargetsCount!==Ne||!!_t.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Zt=!0):(Zt=!0,_t.__version=k.version);let ni=_t.currentProgram;Zt===!0&&(ni=lr(k,F,V),L&&k.isNodeMaterial&&L.onUpdateProgram(k,ni,_t));let xi=!1,Oi=!1,Rn=!1,ie=ni.getUniforms(),me=_t.uniforms;if(_.useProgram(ni.program)&&(xi=!0,Oi=!0,Rn=!0),k.id!==j&&(j=k.id,Oi=!0),_t.needsLights){let re=fu(S.state.lightProbeGridArray,V);_t.lightProbeGrid!==re&&(_t.lightProbeGrid=re,Oi=!0)}if(xi||et!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ie.setValue(N,"projectionMatrix",b.projectionMatrix),ie.setValue(N,"viewMatrix",b.matrixWorldInverse);let ki=ie.map.cameraPosition;ki!==void 0&&ki.setValue(N,be.setFromMatrixPosition(b.matrixWorld)),A.logarithmicDepthBuffer&&ie.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ie.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),et!==b&&(et=b,Oi=!0,Rn=!0)}if(_t.needsLights&&(Ye.state.directionalShadowMap.length>0&&ie.setValue(N,"directionalShadowMap",Ye.state.directionalShadowMap,Y),Ye.state.spotShadowMap.length>0&&ie.setValue(N,"spotShadowMap",Ye.state.spotShadowMap,Y),Ye.state.pointShadowMap.length>0&&ie.setValue(N,"pointShadowMap",Ye.state.pointShadowMap,Y)),V.isSkinnedMesh){ie.setOptional(N,V,"bindMatrix"),ie.setOptional(N,V,"bindMatrixInverse");let re=V.skeleton;re&&(re.boneTexture===null&&re.computeBoneTexture(),ie.setValue(N,"boneTexture",re.boneTexture,Y))}V.isBatchedMesh&&(ie.setOptional(N,V,"batchingTexture"),ie.setValue(N,"batchingTexture",V._matricesTexture,Y),ie.setOptional(N,V,"batchingIdTexture"),ie.setValue(N,"batchingIdTexture",V._indirectTexture,Y),ie.setOptional(N,V,"batchingColorTexture"),V._colorsTexture!==null&&ie.setValue(N,"batchingColorTexture",V._colorsTexture,Y));let zi=G.morphAttributes;if((zi.position!==void 0||zi.normal!==void 0||zi.color!==void 0)&&D.update(V,G,ni),(Oi||_t.receiveShadow!==V.receiveShadow)&&(_t.receiveShadow=V.receiveShadow,ie.setValue(N,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&F.environment!==null&&(me.envMapIntensity.value=F.environmentIntensity),me.dfgLUT!==void 0&&(me.dfgLUT.value=o0()),Oi){if(ie.setValue(N,"toneMappingExposure",P.toneMappingExposure),_t.needsLights&&mu(me,Rn),pt&&k.fog===!0&&St.refreshFogUniforms(me,pt),St.refreshMaterialUniforms(me,k,tt,st,S.state.transmissionRenderTarget[b.id]),_t.needsLights&&_t.lightProbeGrid){let re=_t.lightProbeGrid;me.probesSH.value=re.texture,me.probesMin.value.copy(re.boundingBox.min),me.probesMax.value.copy(re.boundingBox.max),me.probesResolution.value.copy(re.resolution)}os.upload(N,pc(_t),me,Y)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(os.upload(N,pc(_t),me,Y),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ie.setValue(N,"center",V.center),ie.setValue(N,"modelViewMatrix",V.modelViewMatrix),ie.setValue(N,"normalMatrix",V.normalMatrix),ie.setValue(N,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){let re=k.uniformsGroups;for(let ki=0,Pn=re.length;ki<Pn;ki++){let gc=re[ki];Q.update(gc,ni),Q.bind(gc,ni)}}return ni}function mu(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function gu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(b,F,G){let k=H.get(b);k.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),H.get(b.texture).__webglTexture=F,H.get(b.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){let G=H.get(b);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(b,F=0,G=0){q=b,B=F,z=G;let k=null,V=!1,pt=!1;if(b){let ft=H.get(b);if(ft.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,ft.__webglFramebuffer),ht.copy(b.viewport),xt.copy(b.scissor),Yt=b.scissorTest,_.viewport(ht),_.scissor(xt),_.setScissorTest(Yt),j=-1;return}else if(ft.__webglFramebuffer===void 0)Y.setupRenderTarget(b);else if(ft.__hasExternalTextures)Y.rebindTextures(b,H.get(b.texture).__webglTexture,H.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Bt=b.depthTexture;if(ft.__boundDepthTexture!==Bt){if(Bt!==null&&H.has(Bt)&&(b.width!==Bt.image.width||b.height!==Bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(b)}}let Mt=b.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(pt=!0);let Et=H.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Et[F])?k=Et[F][G]:k=Et[F],V=!0):b.samples>0&&Y.useMultisampledRTT(b)===!1?k=H.get(b).__webglMultisampledFramebuffer:Array.isArray(Et)?k=Et[G]:k=Et,ht.copy(b.viewport),xt.copy(b.scissor),Yt=b.scissorTest}else ht.copy(Ct).multiplyScalar(tt).floor(),xt.copy(le).multiplyScalar(tt).floor(),Yt=Wt;if(G!==0&&(k=W),_.bindFramebuffer(N.FRAMEBUFFER,k)&&_.drawBuffers(b,k),_.viewport(ht),_.scissor(xt),_.setScissorTest(Yt),V){let ft=H.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,ft.__webglTexture,G)}else if(pt){let ft=F;for(let Mt=0;Mt<b.textures.length;Mt++){let Et=H.get(b.textures[Mt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Mt,Et.__webglTexture,G,ft)}}else if(b!==null&&G!==0){let ft=H.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ft.__webglTexture,G)}j=-1},this.readRenderTargetPixels=function(b,F,G,k,V,pt,yt,ft=0){if(!(b&&b.isWebGLRenderTarget)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=H.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&yt!==void 0&&(Mt=Mt[yt]),Mt){_.bindFramebuffer(N.FRAMEBUFFER,Mt);try{let Et=b.textures[ft],Bt=Et.format,Xt=Et.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ft),!A.textureFormatReadable(Bt)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Xt)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-k&&G>=0&&G<=b.height-V&&N.readPixels(F,G,k,V,ct.convert(Bt),ct.convert(Xt),pt)}finally{let Et=q!==null?H.get(q).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(b,F,G,k,V,pt,yt,ft=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=H.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&yt!==void 0&&(Mt=Mt[yt]),Mt)if(F>=0&&F<=b.width-k&&G>=0&&G<=b.height-V){_.bindFramebuffer(N.FRAMEBUFFER,Mt);let Et=b.textures[ft],Bt=Et.format,Xt=Et.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ft),!A.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Tt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Tt),N.bufferData(N.PIXEL_PACK_BUFFER,pt.byteLength,N.STREAM_READ),N.readPixels(F,G,k,V,ct.convert(Bt),ct.convert(Xt),0);let Qt=q!==null?H.get(q).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Qt);let pe=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await wh(N,pe,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Tt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pt),N.deleteBuffer(Tt),N.deleteSync(pe),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,G=0){let k=Math.pow(2,-G),V=Math.floor(b.image.width*k),pt=Math.floor(b.image.height*k),yt=F!==null?F.x:0,ft=F!==null?F.y:0;Y.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,G,0,0,yt,ft,V,pt),_.unbindTexture()},this.copyTextureToTexture=function(b,F,G=null,k=null,V=0,pt=0){let yt,ft,Mt,Et,Bt,Xt,Tt,Qt,pe,fe=b.isCompressedTexture?b.mipmaps[pt]:b.image;if(G!==null)yt=G.max.x-G.min.x,ft=G.max.y-G.min.y,Mt=G.isBox3?G.max.z-G.min.z:1,Et=G.min.x,Bt=G.min.y,Xt=G.isBox3?G.min.z:0;else{let me=Math.pow(2,-V);yt=Math.floor(fe.width*me),ft=Math.floor(fe.height*me),b.isDataArrayTexture?Mt=fe.depth:b.isData3DTexture?Mt=Math.floor(fe.depth*me):Mt=1,Et=0,Bt=0,Xt=0}k!==null?(Tt=k.x,Qt=k.y,pe=k.z):(Tt=0,Qt=0,pe=0);let ee=ct.convert(F.format),Ne=ct.convert(F.type),_t;F.isData3DTexture?(Y.setTexture3D(F,0),_t=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Y.setTexture2DArray(F,0),_t=N.TEXTURE_2D_ARRAY):(Y.setTexture2D(F,0),_t=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);let Ye=_.getParameter(N.UNPACK_ROW_LENGTH),Zt=_.getParameter(N.UNPACK_IMAGE_HEIGHT),ni=_.getParameter(N.UNPACK_SKIP_PIXELS),xi=_.getParameter(N.UNPACK_SKIP_ROWS),Oi=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,fe.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,fe.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Et),_.pixelStorei(N.UNPACK_SKIP_ROWS,Bt),_.pixelStorei(N.UNPACK_SKIP_IMAGES,Xt);let Rn=b.isDataArrayTexture||b.isData3DTexture,ie=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){let me=H.get(b),zi=H.get(F),re=H.get(me.__renderTarget),ki=H.get(zi.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,re.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Pn=0;Pn<Mt;Pn++)Rn&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(b).__webglTexture,V,Xt+Pn),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,H.get(F).__webglTexture,pt,pe+Pn)),N.blitFramebuffer(Et,Bt,yt,ft,Tt,Qt,yt,ft,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(V!==0||b.isRenderTargetTexture||H.has(b)){let me=H.get(b),zi=H.get(F);_.bindFramebuffer(N.READ_FRAMEBUFFER,X),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,U);for(let re=0;re<Mt;re++)Rn?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,me.__webglTexture,V,Xt+re):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,me.__webglTexture,V),ie?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,zi.__webglTexture,pt,pe+re):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,zi.__webglTexture,pt),V!==0?N.blitFramebuffer(Et,Bt,yt,ft,Tt,Qt,yt,ft,N.COLOR_BUFFER_BIT,N.NEAREST):ie?N.copyTexSubImage3D(_t,pt,Tt,Qt,pe+re,Et,Bt,yt,ft):N.copyTexSubImage2D(_t,pt,Tt,Qt,Et,Bt,yt,ft);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ie?b.isDataTexture||b.isData3DTexture?N.texSubImage3D(_t,pt,Tt,Qt,pe,yt,ft,Mt,ee,Ne,fe.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(_t,pt,Tt,Qt,pe,yt,ft,Mt,ee,fe.data):N.texSubImage3D(_t,pt,Tt,Qt,pe,yt,ft,Mt,ee,Ne,fe):b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pt,Tt,Qt,yt,ft,ee,Ne,fe.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pt,Tt,Qt,fe.width,fe.height,ee,fe.data):N.texSubImage2D(N.TEXTURE_2D,pt,Tt,Qt,yt,ft,ee,Ne,fe);_.pixelStorei(N.UNPACK_ROW_LENGTH,Ye),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Zt),_.pixelStorei(N.UNPACK_SKIP_PIXELS,ni),_.pixelStorei(N.UNPACK_SKIP_ROWS,xi),_.pixelStorei(N.UNPACK_SKIP_IMAGES,Oi),pt===0&&F.generateMipmaps&&N.generateMipmap(_t),_.unbindTexture()},this.initRenderTarget=function(b){H.get(b).__webglFramebuffer===void 0&&Y.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Y.setTextureCube(b,0):b.isData3DTexture?Y.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Y.setTexture2DArray(b,0):Y.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){B=0,z=0,q=null,_.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}};var au={type:"change"},nc={type:"start"},lu={type:"end"},go=new Ki,ou=new We,l0=Math.cos(70*Fl.DEG2RAD),we=new R,qe=2*Math.PI,te={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ic=1e-6,xo=class extends Ys{constructor(t,e=null){super(t,e),this.state=te.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:sn.ROTATE,MIDDLE:sn.DOLLY,RIGHT:sn.PAN},this.touches={ONE:rn.ROTATE,TWO:rn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new je,this._lastTargetPosition=new R,this._quat=new je().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ts,this._sphericalDelta=new ts,this._scale=1,this._panOffset=new R,this._rotateStart=new gt,this._rotateEnd=new gt,this._rotateDelta=new gt,this._panStart=new gt,this._panEnd=new gt,this._panDelta=new gt,this._dollyStart=new gt,this._dollyEnd=new gt,this._dollyDelta=new gt,this._dollyDirection=new R,this._mouse=new gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=h0.bind(this),this._onPointerDown=c0.bind(this),this._onPointerUp=u0.bind(this),this._onContextMenu=_0.bind(this),this._onMouseWheel=p0.bind(this),this._onKeyDown=m0.bind(this),this._onTouchStart=g0.bind(this),this._onTouchMove=x0.bind(this),this._onMouseDown=d0.bind(this),this._onMouseMove=f0.bind(this),this._interceptControlDown=y0.bind(this),this._interceptControlUp=v0.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(au),this.update(),this.state=te.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===te.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=qe:i>Math.PI&&(i-=qe),s<-Math.PI?s+=qe:s>Math.PI&&(s-=qe),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=we.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new R(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(go.origin.copy(this.object.position),go.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(go.direction))<l0?this.object.lookAt(this.target):(ou.setFromNormalAndCoplanarPoint(this.object.up,this.target),go.intersectPlane(ou,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ic||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ic||this._lastTargetPosition.distanceToSquared(this.target)>ic?(this.dispatchEvent(au),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?qe/60*this.autoRotateSpeed*t:qe/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;we.copy(s).sub(this.target);let r=we.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-qe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function c0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function h0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function u0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(lu),this.state=te.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function d0(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case sn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=te.DOLLY;break;case sn.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=te.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=te.ROTATE}break;case sn.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=te.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=te.PAN}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(nc)}function f0(n){switch(this.state){case te.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case te.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case te.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function p0(n){this.enabled===!1||this.enableZoom===!1||this.state!==te.NONE||(n.preventDefault(),this.dispatchEvent(nc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(lu))}function m0(n){this.enabled!==!1&&this._handleKeyDown(n)}function g0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case rn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=te.TOUCH_ROTATE;break;case rn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=te.TOUCH_PAN;break;default:this.state=te.NONE}break;case 2:switch(this.touches.TWO){case rn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=te.TOUCH_DOLLY_PAN;break;case rn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=te.TOUCH_DOLLY_ROTATE;break;default:this.state=te.NONE}break;default:this.state=te.NONE}this.state!==te.NONE&&this.dispatchEvent(nc)}function x0(n){switch(this._trackPointer(n),this.state){case te.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case te.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case te.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case te.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=te.NONE}}function _0(n){this.enabled!==!1&&n.preventDefault()}function y0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function v0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var _o=class{constructor(t){this.robot=t,this.enabled=!0,this.damping=.08,this.currentElevation=1.15,this.currentPitch=0,this.currentRoll=0,this.targetElevation=1.15,this.targetPitch=0,this.targetRoll=0,this.tempPlane=new We,this.tempNormal=new R(0,1,0),this.up=new R(0,1,0),this.calculatedCentroid=new R,this.stabilityIndex=100,this.tiltAngleDeg=0}update(t,e=1.15){if(!this.robot||!this.robot.body)return;if(!this.enabled){if(t.length>=3){let d=0;t.forEach(p=>{d+=p.y});let y=d/t.length-this.robot.position.y+e;this.currentElevation+=(y-this.currentElevation)*.15,this.robot.body.position.y=this.currentElevation}this.currentPitch+=(0-this.currentPitch)*.05,this.currentRoll+=(0-this.currentRoll)*.05,this.robot.body.rotation.x=this.currentPitch,this.robot.body.rotation.z=this.currentRoll,this.tiltAngleDeg=Math.round(Math.sqrt(this.currentPitch*this.currentPitch+this.currentRoll*this.currentRoll)*(180/Math.PI)),this.stabilityIndex=Math.max(0,100-this.tiltAngleDeg*3.5);return}if(t.length<3)return;let i=0,s=0,r=0;t.forEach(d=>{s+=d.x,i+=d.y,r+=d.z});let a=t.length;this.calculatedCentroid.set(s/a,i/a,r/a);let o=i/a,l=t[0],c=t[1],u=t[2];try{this.tempPlane.setFromCoplanarPoints(l,c,u),this.tempNormal.copy(this.tempPlane.normal),this.tempNormal.y<0&&this.tempNormal.negate(),isNaN(this.tempNormal.y)||this.tempNormal.lengthSq()<.001?this.tempNormal.set(0,1,0):this.tempNormal.normalize()}catch{this.tempNormal.set(0,1,0)}let f=this.tempNormal.clone();this.robot&&this.robot.rotation&&f.applyAxisAngle(new R(0,1,0),-this.robot.rotation.y),this.targetPitch=Math.atan2(f.z,f.y),this.targetRoll=-Math.atan2(f.x,f.y),this.targetElevation=o-this.robot.position.y+e,this.currentElevation+=(this.targetElevation-this.currentElevation)*this.damping,this.currentPitch+=(this.targetPitch-this.currentPitch)*this.damping,this.currentRoll+=(this.targetRoll-this.currentRoll)*this.damping,this.robot.body.position.y=this.currentElevation,this.robot.body.rotation.x=this.currentPitch,this.robot.body.rotation.z=this.currentRoll;let h=Math.sqrt(this.currentPitch*this.currentPitch+this.currentRoll*this.currentRoll);this.tiltAngleDeg=Math.round(h*(180/Math.PI)),this.stabilityIndex=Math.max(0,Math.min(100,Math.round(100-this.tiltAngleDeg/30*100)))}};var yo=class{constructor(t){this.scene=t,this.size=260,this.segments=130,this.mesh=null,this.rocks=[],this.samples=[],this.lander=null,this.initTerrain(),this.initRocks(),this.initSamples(),this.initLander()}getHeight(t,e){let i=Math.sqrt(t*t+e*e),s=0;if(i>35&&i<105){let c=(i-35)/70;s=Math.sin(c*Math.PI)*3.2}else i>=105&&(s=.4-(i-105)*.04);let r=Math.sin(t*.05+e*.035)*1.1,a=Math.cos(t*.08-e*.065)*.55,o=Math.sin(t*.16+e*.12)*.22,l=Math.sin(t*.5)*Math.cos(e*.5)*.05;return s+r+a+o+l}getNormal(t,e){let s=this.getHeight(t-.25,e),r=this.getHeight(t+.25,e),a=this.getHeight(t,e-.25),o=this.getHeight(t,e+.25),l=new R((s-r)/(2*.25),1,(a-o)/(2*.25));return l.normalize(),l}initTerrain(){let t=new Fi(this.size,this.size,this.segments,this.segments);t.rotateX(-Math.PI/2);let e=t.attributes.position,i=[],s=new Pt(10699812),r=new Pt(13919547),a=new Pt(15633240),o=new Pt(12079662);for(let u=0;u<e.count;u++){let f=e.getX(u),h=e.getZ(u),d=this.getHeight(f,h);e.setY(u,d);let g=Math.max(0,Math.min(1,(d+1.5)/4.5)),y=new Pt;g<.4?y.lerpColors(s,r,g/.4):g<.8?y.lerpColors(r,a,(g-.4)/.4):y.lerpColors(a,o,(g-.8)/.2);let p=Math.sin(f*.8)*Math.cos(h*.8)*.03;y.r+=p,y.g+=p*.7,i.push(y.r,y.g,y.b)}t.setAttribute("color",new Vt(i,3)),t.computeVertexNormals();let l=new he({vertexColors:!0,roughness:.85,metalness:.1,flatShading:!1});this.mesh=new nt(t,l),this.mesh.receiveShadow=!0,this.scene.add(this.mesh);let c=new qs(this.size,52,15633240,8138002);c.position.y=-.3,c.material.opacity=.18,c.material.transparent=!0,this.scene.add(c)}initRocks(){let e=new Us(1,0),i=new Ds(1,0),s=new he({color:9058338,roughness:.85,metalness:.12,flatShading:!0}),r=new he({color:6367258,roughness:.9,metalness:.18,flatShading:!0});for(let a=0;a<65;a++){let o=11+Math.random()*88,l=Math.random()*Math.PI*2,c=Math.cos(l)*o,u=Math.sin(l)*o,f=this.getHeight(c,u),h=Math.random()>.5,d=h?i:e,g=h?r:s,y=.5+Math.random()*1.5,p=new nt(d,g);p.position.set(c,f+y*.28,u),p.rotation.set(Math.random()*.4,Math.random()*Math.PI*2,Math.random()*.4),p.scale.set(y*(.8+Math.random()*.5),y*(.45+Math.random()*.4),y*(.8+Math.random()*.5)),p.castShadow=!0,p.receiveShadow=!0,this.scene.add(p),this.rocks.push({position:new R(c,f,u),radius:y*.85})}}initSamples(){[{id:"alpha",name:"Sample Alpha: Unknown Layered Outcrop",thaiName:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 \u0E41\u0E2D\u0E25\u0E1F\u0E32: \u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15 (Hydrated Sulfates)",unknownTitle:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32 ALPHA (Site Alpha Outcrop)",siteType:"\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E0A\u0E31\u0E49\u0E19\u0E2B\u0E34\u0E19\u0E2A\u0E35\u0E2D\u0E48\u0E2D\u0E19 (Light-toned Layered Outcrop)",x:-28,z:32,color:3718648,description:"\u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 (Hydrated Sulfate \u0E40\u0E0A\u0E48\u0E19 Jarosite/Gypsum) \u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E02\u0E2D\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E2A\u0E20\u0E32\u0E1E\u0E01\u0E23\u0E14\u0E43\u0E19\u0E22\u0E38\u0E04 Hesperian",stemFact:"\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E43\u0E19\u0E1C\u0E25\u0E36\u0E01 (Hydrated Sulfates) \u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E02\u0E2D\u0E07\u0E41\u0E2D\u0E48\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E17\u0E35\u0E48\u0E21\u0E35\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E23\u0E14\u0E43\u0E19\u0E1B\u0E25\u0E32\u0E22\u0E22\u0E38\u0E04\u0E40\u0E2E\u0E2A\u0E1E\u0E35\u0E40\u0E23\u0E35\u0E22\u0E19 (Late Hesperian)",waterEvidence:"+++ (\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E0A\u0E31\u0E49\u0E19\u0E40\u0E2D\u0E01: \u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E02\u0E2D\u0E07\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E19\u0E49\u0E33\u0E42\u0E1A\u0E23\u0E32\u0E13)",waterEvidenceLevel:3,spectrometer:{hydration:"HIGH (88% \xB1 4%)",hydrationVal:88,sulfate:"HIGH (\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 Fe/Mg \u0E40\u0E14\u0E48\u0E19\u0E0A\u0E31\u0E14)",sulfateVal:85,iron:"MEDIUM (\u0E2A\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E2D\u0E2D\u0E01\u0E44\u0E0B\u0E14\u0E4C)",ironVal:52,silicate:"LOW (< 25%)",silicateVal:22,magnetism:"LOW (< 5 nT)",magnetismVal:8,visualTexture:"\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E2B\u0E34\u0E19\u0E2A\u0E35\u0E2A\u0E27\u0E48\u0E32\u0E07\u0E0B\u0E49\u0E2D\u0E19\u0E17\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19\u0E0A\u0E31\u0E49\u0E19\u0E23\u0E34\u0E49\u0E27 (Light-toned layered sedimentary beds)"},spectralData:{hydrationIndex:88,keyAbsorption:"1.4, 1.9 & 2.4 \xB5m (H\u2082O, SO\u2084\xB2\u207B)",absorption14:.72,absorption19:.88,absorptionMetal:.76,readingText:"\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E19\u0E49\u0E33\u0E25\u0E36\u0E01 1.9 \xB5m \u0E41\u0E25\u0E30\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 2.4 \xB5m \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E02\u0E2D\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E2A\u0E20\u0E32\u0E1E\u0E01\u0E23\u0E14"},inquiryQuestion:{prompt:"\u0E08\u0E32\u0E01\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E41\u0E2A\u0E07\u0E17\u0E35\u0E48 1.9 \xB5m \u0E41\u0E25\u0E30 2.4 \xB5m \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E19\u0E49\u0E33\u0E43\u0E19\u0E1C\u0E25\u0E36\u0E01 88% \u0E2A\u0E40\u0E1B\u0E01\u0E15\u0E23\u0E31\u0E21\u0E19\u0E35\u0E49\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E43\u0E14\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E19\u0E49\u0E33\u0E43\u0E19 Chryse Planitia?",choices:[{text:"\u0E01. \u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 (Hydrated Sulfate \u0E40\u0E0A\u0E48\u0E19 Jarosite/Gypsum) \u0E17\u0E35\u0E48\u0E15\u0E01\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E41\u0E2D\u0E48\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E2A\u0E20\u0E32\u0E1E\u0E01\u0E23\u0E14\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E43\u0E19\u0E1B\u0E25\u0E32\u0E22\u0E22\u0E38\u0E04 Hesperian"},{text:"\u0E02. \u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E40\u0E04\u0E22\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E19\u0E49\u0E33\u0E2B\u0E23\u0E37\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E0A\u0E37\u0E49\u0E19\u0E40\u0E25\u0E22\u0E15\u0E25\u0E2D\u0E14 4 \u0E1E\u0E31\u0E19\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35"},{text:"\u0E04. \u0E0A\u0E31\u0E49\u0E19\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E41\u0E2B\u0E49\u0E07\u0E04\u0E32\u0E23\u0E4C\u0E1A\u0E2D\u0E19\u0E44\u0E14\u0E2D\u0E2D\u0E01\u0E44\u0E0B\u0E14\u0E4C\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E04\u0E27\u0E1A\u0E41\u0E19\u0E48\u0E19\u0E08\u0E32\u0E01\u0E1E\u0E32\u0E22\u0E38\u0E24\u0E14\u0E39\u0E2B\u0E19\u0E32\u0E27"}],correctIndex:0,explanation:"\u0E01\u0E32\u0E23\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E17\u0E35\u0E48 1.9 \xB5m \u0E40\u0E1B\u0E47\u0E19\u0E40\u0E2D\u0E01\u0E25\u0E31\u0E01\u0E29\u0E13\u0E4C\u0E02\u0E2D\u0E07\u0E42\u0E21\u0E40\u0E25\u0E01\u0E38\u0E25 H\u2082O \u0E43\u0E19\u0E1C\u0E25\u0E36\u0E01\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E43\u0E19\u0E2D\u0E14\u0E35\u0E15\u0E40\u0E04\u0E22\u0E21\u0E35\u0E41\u0E2D\u0E48\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E15\u0E01\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E27\u0E30\u0E01\u0E23\u0E14 (\u0E40\u0E0A\u0E48\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E1A\u0E17\u0E35\u0E48\u0E22\u0E32\u0E19 Opportunity \u0E04\u0E49\u0E19\u0E1E\u0E1A\u0E17\u0E35\u0E48 Meridiani Planum)"},waterEvidencePoints:3,options:["\u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15 (Hydrated Sulfate \u0E40\u0E0A\u0E48\u0E19 Jarosite \u0E2B\u0E23\u0E37\u0E2D Gypsum)","\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07 (Unaltered Olivine Basalt)","\u0E41\u0E23\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C (Pure Magnetite Ore)","\u0E17\u0E23\u0E32\u0E22\u0E04\u0E27\u0E2D\u0E15\u0E0B\u0E4C\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E32\u0E01\u0E1E\u0E32\u0E22\u0E38\u0E2B\u0E21\u0E38\u0E19 (Dry Quartz Dune Sand)"],correctOption:0,claimFeedback:"\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07! \u0E2A\u0E40\u0E1B\u0E01\u0E15\u0E23\u0E31\u0E21\u0E41\u0E2A\u0E14\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E04\u0E25\u0E37\u0E48\u0E19\u0E02\u0E2D\u0E07\u0E1E\u0E31\u0E19\u0E18\u0E30 H\u2082O \u0E41\u0E25\u0E30 SO\u2084\xB2\u207B \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E14\u0E48\u0E19\u0E0A\u0E31\u0E14 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E17\u0E35\u0E48\u0E15\u0E01\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E19\u0E49\u0E33\u0E40\u0E04\u0E47\u0E21\u0E2A\u0E20\u0E32\u0E1E\u0E01\u0E23\u0E14\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E43\u0E19\u0E1B\u0E25\u0E32\u0E22\u0E22\u0E38\u0E04 Hesperian"},{id:"beta",name:"Sample Beta: Ancient Clay Beds",thaiName:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 \u0E1A\u0E35\u0E15\u0E32: \u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicate Clay)",unknownTitle:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32 BETA (Site Beta Clay Basin)",siteType:"\u0E25\u0E32\u0E19\u0E2B\u0E34\u0E19\u0E41\u0E15\u0E01\u0E23\u0E30\u0E41\u0E2B\u0E07\u0E2B\u0E25\u0E32\u0E22\u0E40\u0E2B\u0E25\u0E35\u0E48\u0E22\u0E21\u0E42\u0E1A\u0E23\u0E32\u0E13 (Polygonal Mudstone Bed)",x:38,z:36,color:11032055,description:"\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicate Clay) \u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E2B\u0E34\u0E19\u0E01\u0E31\u0E1A\u0E19\u0E49\u0E33\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19\u0E43\u0E19\u0E22\u0E38\u0E04 Noachian",stemFact:"\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicates \u0E40\u0E0A\u0E48\u0E19 Smectite) \u0E40\u0E1B\u0E47\u0E19\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E32\u0E28\u0E31\u0E22\u0E19\u0E49\u0E33\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E27\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07/\u0E14\u0E48\u0E32\u0E07\u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E19\u0E32\u0E19\u0E2B\u0E25\u0E32\u0E22\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35",waterEvidence:"+++ (\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E0A\u0E31\u0E49\u0E19\u0E40\u0E2D\u0E01: \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E2A\u0E20\u0E32\u0E1E\u0E19\u0E49\u0E33\u0E08\u0E37\u0E14\u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19 \u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E2A\u0E32\u0E23\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C)",waterEvidenceLevel:3,spectrometer:{hydration:"VERY HIGH (94% \xB1 3%)",hydrationVal:94,sulfate:"LOW (< 15%)",sulfateVal:14,iron:"MEDIUM (Al-Mg Silicate Clay)",ironVal:48,silicate:"HIGH (\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15\u0E41\u0E1A\u0E1A\u0E0A\u0E31\u0E49\u0E19 Phyllosilicate)",silicateVal:92,magnetism:"LOW (< 4 nT)",magnetismVal:6,visualTexture:"\u0E25\u0E32\u0E19\u0E2B\u0E34\u0E19\u0E42\u0E04\u0E25\u0E19\u0E41\u0E15\u0E01\u0E23\u0E30\u0E41\u0E2B\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E39\u0E1B\u0E17\u0E23\u0E07\u0E2B\u0E25\u0E32\u0E22\u0E40\u0E2B\u0E25\u0E35\u0E48\u0E22\u0E21 (Polygonal fractured mudstone)"},spectralData:{hydrationIndex:94,keyAbsorption:"1.4, 1.9 & 2.2 \xB5m (Al-OH / Fe-OH)",absorption14:.85,absorption19:.94,absorptionMetal:.92,readingText:"\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E19\u0E49\u0E33\u0E25\u0E36\u0E01 1.9 \xB5m \u0E41\u0E25\u0E30\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E2B\u0E21\u0E39\u0E48\u0E44\u0E2E\u0E14\u0E23\u0E2D\u0E01\u0E0B\u0E34\u0E25\u0E42\u0E25\u0E2B\u0E30 2.2 \xB5m \u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1C\u0E25\u0E36\u0E01\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E41\u0E1A\u0E1A\u0E0A\u0E31\u0E49\u0E19 (Smectite)"},inquiryQuestion:{prompt:"\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E04\u0E21\u0E0A\u0E31\u0E14\u0E17\u0E35\u0E48 1.4, 1.9 \u0E41\u0E25\u0E30 2.2 \xB5m \u0E02\u0E2D\u0E07\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicates) \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E41\u0E1A\u0E1A\u0E43\u0E14?",choices:[{text:"\u0E01. \u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E1B\u0E30\u0E17\u0E38\u0E02\u0E2D\u0E07\u0E25\u0E32\u0E27\u0E32\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E2D\u0E38\u0E13\u0E2B\u0E20\u0E39\u0E21\u0E34\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32 1,200\xB0C \u0E42\u0E14\u0E22\u0E1B\u0E23\u0E32\u0E28\u0E08\u0E32\u0E01\u0E19\u0E49\u0E33"},{text:"\u0E02. \u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21\u0E19\u0E49\u0E33\u0E08\u0E37\u0E14\u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35 pH \u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04 Noachian \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E01\u0E33\u0E40\u0E19\u0E34\u0E14\u0E2A\u0E32\u0E23\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C\u0E41\u0E25\u0E30\u0E2A\u0E34\u0E48\u0E07\u0E21\u0E35\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E42\u0E1A\u0E23\u0E32\u0E13"},{text:"\u0E04. \u0E1D\u0E38\u0E48\u0E19\u0E17\u0E23\u0E32\u0E22\u0E04\u0E27\u0E2D\u0E15\u0E0B\u0E4C\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E25\u0E21\u0E1E\u0E31\u0E14\u0E1E\u0E32\u0E21\u0E32\u0E2A\u0E30\u0E2A\u0E21\u0E15\u0E31\u0E27\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E31\u0E14"}],correctIndex:1,explanation:"\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicate Clay) \u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E32\u0E28\u0E31\u0E22\u0E19\u0E49\u0E33\u0E43\u0E19\u0E2A\u0E20\u0E32\u0E27\u0E30 pH \u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07/\u0E14\u0E48\u0E32\u0E07\u0E2D\u0E48\u0E2D\u0E19 \u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E1A\u0E41\u0E2A\u0E19\u0E16\u0E36\u0E07\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35\u0E43\u0E19\u0E22\u0E38\u0E04\u0E42\u0E19\u0E2D\u0E32\u0E40\u0E0A\u0E35\u0E22\u0E19 (Noachian) \u0E16\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E0A\u0E34\u0E49\u0E19\u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E21\u0E35\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E04\u0E07\u0E15\u0E31\u0E27\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19"},waterEvidencePoints:3,options:["\u0E41\u0E01\u0E49\u0E27\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2D\u0E2D\u0E1A\u0E0B\u0E34\u0E40\u0E14\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E40\u0E22\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E09\u0E35\u0E22\u0E1A\u0E1E\u0E25\u0E31\u0E19 (Volcanic Obsidian Glass)","\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicate Clay Minerals \u0E40\u0E0A\u0E48\u0E19 Smectite)","\u0E2B\u0E34\u0E19\u0E2D\u0E38\u0E01\u0E01\u0E32\u0E1A\u0E32\u0E15\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07 (Iron-Nickel Meteorite Fragment)","\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E41\u0E2B\u0E49\u0E07\u0E04\u0E32\u0E23\u0E4C\u0E1A\u0E2D\u0E19\u0E44\u0E14\u0E2D\u0E2D\u0E01\u0E44\u0E0B\u0E14\u0E4C\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C (Pure Dry Ice CO\u2082)"],correctOption:1,claimFeedback:"\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21! \u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E1F\u0E34\u0E25\u0E42\u0E25\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 (Phyllosilicates) \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E19\u0E49\u0E33\u0E08\u0E37\u0E14\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07/\u0E14\u0E48\u0E32\u0E07\u0E41\u0E0A\u0E48\u0E02\u0E31\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E19\u0E32\u0E19\u0E2B\u0E25\u0E32\u0E22\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35\u0E43\u0E19\u0E22\u0E38\u0E04 Noachian \u0E16\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21\u0E17\u0E35\u0E48\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E0A\u0E35\u0E27\u0E14\u0E32\u0E23\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14"},{id:"gamma",name:"Sample Gamma: Olivine Basalt Outcrop",thaiName:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 \u0E41\u0E01\u0E21\u0E21\u0E32: \u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E1A\u0E19\u0E22\u0E2D\u0E14\u0E1C\u0E32 (Olivine Basalt)",unknownTitle:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32 GAMMA (Site Gamma Escarpment)",siteType:"\u0E2A\u0E31\u0E19\u0E1C\u0E32\u0E2B\u0E34\u0E19\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2A\u0E35\u0E40\u0E02\u0E49\u0E21\u0E2A\u0E39\u0E07\u0E0A\u0E31\u0E19 (Volcanic Ridge Escarpment)",x:-42,z:-45,color:2278750,description:"\u0E2B\u0E34\u0E19\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2D\u0E38\u0E14\u0E21\u0E14\u0E49\u0E27\u0E22\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine-rich Basalt) \u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E04\u0E07\u0E2A\u0E20\u0E32\u0E1E\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48 \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E22\u0E38\u0E04\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E2A\u0E39\u0E48\u0E04\u0E27\u0E32\u0E21\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04 Amazonian",stemFact:"\u0E41\u0E23\u0E48\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E2A\u0E25\u0E32\u0E22\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27\u0E21\u0E32\u0E01\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E19\u0E49\u0E33 \u0E01\u0E32\u0E23\u0E1E\u0E1A\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E40\u0E27\u0E13\u0E19\u0E35\u0E49\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E41\u0E25\u0E30\u0E2B\u0E19\u0E32\u0E27\u0E08\u0E31\u0E14\u0E21\u0E32\u0E19\u0E32\u0E19\u0E2B\u0E25\u0E32\u0E22\u0E1E\u0E31\u0E19\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35",waterEvidence:"+ (\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E1A: \u0E2B\u0E34\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E19\u0E49\u0E33\u0E41\u0E1B\u0E23\u0E2A\u0E20\u0E32\u0E1E \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E22\u0E38\u0E04\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E31\u0E14)",waterEvidenceLevel:1,spectrometer:{hydration:"VERY LOW (< 4%)",hydrationVal:4,sulfate:"NONE (0%)",sulfateVal:2,iron:"HIGH (Fe-Pyroxene & Basaltic glass)",ironVal:78,silicate:"HIGH (\u0E41\u0E21\u0E01\u0E19\u0E35\u0E40\u0E0B\u0E35\u0E22\u0E21-\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E0B\u0E34\u0E25\u0E34\u0E40\u0E01\u0E15 Olivine)",silicateVal:91,magnetism:"MEDIUM (\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1E\u0E37\u0E49\u0E19\u0E1C\u0E34\u0E27\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07)",magnetismVal:42,visualTexture:"\u0E2B\u0E34\u0E19\u0E1C\u0E25\u0E36\u0E01\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E41\u0E19\u0E48\u0E19\u0E2A\u0E35\u0E40\u0E02\u0E49\u0E21\u0E17\u0E36\u0E1A \u0E21\u0E35\u0E40\u0E21\u0E47\u0E14\u0E1C\u0E25\u0E36\u0E01\u0E2A\u0E35\u0E40\u0E02\u0E35\u0E22\u0E27\u0E21\u0E30\u0E01\u0E2D\u0E01\u0E41\u0E1D\u0E07\u0E2D\u0E22\u0E39\u0E48 (Dark dense crystalline basalt)"},spectralData:{hydrationIndex:4,keyAbsorption:"1.0 \xB5m (Fe\xB2\u207A Crystal Field) / \u0E44\u0E23\u0E49\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E19\u0E49\u0E33",absorption14:.05,absorption19:.04,absorptionMetal:.12,readingText:"\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E01\u0E27\u0E49\u0E32\u0E07\u0E17\u0E35\u0E48 1.0 \xB5m \u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A Fe\xB2\u207A \u0E43\u0E19\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 \u0E1B\u0E23\u0E32\u0E28\u0E08\u0E32\u0E01\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E02\u0E2D\u0E07\u0E19\u0E49\u0E33 (H\u2082O) \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E2E\u0E14\u0E23\u0E2D\u0E01\u0E0B\u0E34\u0E25 (OH)"},inquiryQuestion:{prompt:"\u0E01\u0E32\u0E23\u0E1E\u0E1A\u0E41\u0E23\u0E48\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine) \u0E43\u0E19\u0E2A\u0E20\u0E32\u0E1E\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07\u0E1A\u0E19\u0E22\u0E2D\u0E14\u0E1C\u0E32\u0E2B\u0E34\u0E19\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F \u0E43\u0E2B\u0E49\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C\u0E43\u0E14\u0E15\u0E48\u0E2D\u0E27\u0E34\u0E27\u0E31\u0E12\u0E19\u0E32\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23?",choices:[{text:"\u0E01. \u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E01\u0E31\u0E1A\u0E19\u0E49\u0E33\u0E44\u0E14\u0E49\u0E40\u0E23\u0E47\u0E27\u0E21\u0E32\u0E01 \u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E22\u0E38\u0E04\u0E19\u0E49\u0E33\u0E2B\u0E25\u0E32\u0E01 \u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E44\u0E14\u0E49\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E22\u0E38\u0E04 Amazonian \u0E17\u0E35\u0E48\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E31\u0E14\u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E19\u0E35\u0E49\u0E2D\u0E35\u0E01\u0E40\u0E25\u0E22"},{text:"\u0E02. \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E27\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E40\u0E27\u0E13\u0E19\u0E35\u0E49\u0E21\u0E35\u0E21\u0E2B\u0E32\u0E2A\u0E21\u0E38\u0E17\u0E23\u0E19\u0E49\u0E33\u0E08\u0E37\u0E14\u0E25\u0E36\u0E01\u0E17\u0E48\u0E27\u0E21\u0E02\u0E31\u0E07\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E32\u0E08\u0E19\u0E16\u0E36\u0E07\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"},{text:"\u0E04. \u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E34\u0E19\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E15\u0E01\u0E1C\u0E25\u0E36\u0E01\u0E08\u0E32\u0E01\u0E19\u0E49\u0E33\u0E17\u0E30\u0E40\u0E25\u0E2A\u0E32\u0E1A\u0E19\u0E49\u0E33\u0E2D\u0E38\u0E48\u0E19"}],correctIndex:0,explanation:"\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine) \u0E40\u0E1B\u0E47\u0E19\u0E41\u0E23\u0E48\u0E17\u0E35\u0E48\u0E17\u0E19\u0E15\u0E48\u0E2D\u0E19\u0E49\u0E33\u0E44\u0E14\u0E49\u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 \u0E2B\u0E32\u0E01\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E19\u0E49\u0E33\u0E08\u0E30\u0E41\u0E1B\u0E23\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E0B\u0E2D\u0E23\u0E4C\u0E40\u0E1E\u0E19\u0E17\u0E35\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27 \u0E01\u0E32\u0E23\u0E04\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E2A\u0E14\u0E08\u0E36\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E22\u0E38\u0E15\u0E34\u0E25\u0E07\u0E02\u0E2D\u0E07\u0E22\u0E38\u0E04\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27"},waterEvidencePoints:3,options:["\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F\u0E2D\u0E38\u0E14\u0E21\u0E14\u0E49\u0E27\u0E22\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine-rich Basalt Outcrop)","\u0E04\u0E23\u0E32\u0E1A\u0E40\u0E01\u0E25\u0E37\u0E2D\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E42\u0E1A\u0E23\u0E32\u0E13 (Evaporite Salt Crust)","\u0E2B\u0E34\u0E19\u0E1B\u0E39\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E2A\u0E34\u0E48\u0E07\u0E21\u0E35\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E43\u0E19\u0E17\u0E30\u0E40\u0E25 (Biogenic Marine Limestone)","\u0E0A\u0E31\u0E49\u0E19\u0E14\u0E34\u0E19\u0E1E\u0E35\u0E15\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C\u0E14\u0E36\u0E01\u0E14\u0E33\u0E1A\u0E23\u0E23\u0E1E\u0E4C (Ancient Organic Peat Layer)"],correctOption:0,claimFeedback:"\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E32\u0E21\u0E2B\u0E25\u0E31\u0E01\u0E18\u0E23\u0E13\u0E35\u0E40\u0E04\u0E21\u0E35! \u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19 (Olivine) \u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E01\u0E31\u0E1A\u0E19\u0E49\u0E33\u0E44\u0E14\u0E49\u0E44\u0E27\u0E21\u0E32\u0E01 \u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E42\u0E2D\u0E25\u0E34\u0E27\u0E35\u0E19\u0E22\u0E31\u0E07\u0E04\u0E07\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E1A\u0E19\u0E22\u0E2D\u0E14\u0E1C\u0E32 \u0E1E\u0E34\u0E2A\u0E39\u0E08\u0E19\u0E4C\u0E27\u0E48\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E08\u0E32\u0E01\u0E22\u0E38\u0E04\u0E19\u0E49\u0E33\u0E44\u0E2B\u0E25\u0E1A\u0E48\u0E32 \u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E44\u0E14\u0E49\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E22\u0E38\u0E04 Amazonian \u0E17\u0E35\u0E48\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E08\u0E31\u0E14\u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E21\u0E35\u0E19\u0E49\u0E33\u0E2A\u0E31\u0E21\u0E1C\u0E31\u0E2A\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E19\u0E35\u0E49\u0E2D\u0E35\u0E01\u0E40\u0E25\u0E22"},{id:"delta",name:"Sample Delta: Paleomagnetic Crustal Rock",thaiName:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 \u0E40\u0E14\u0E25\u0E15\u0E32: \u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E14\u0E36\u0E01\u0E14\u0E33\u0E1A\u0E23\u0E23\u0E1E\u0E4C (Paleomagnetic Crust)",unknownTitle:"\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32 DELTA (Site Delta Crustal Bedrock)",siteType:"\u0E0A\u0E31\u0E49\u0E19\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13 (Deep Crustal Basement Bedrock)",x:36,z:-55,color:16096779,description:"\u0E1C\u0E25\u0E36\u0E01\u0E44\u0E17\u0E17\u0E32\u0E42\u0E19\u0E41\u0E21\u0E01\u0E19\u0E35\u0E44\u0E17\u0E15\u0E4C\u0E43\u0E19\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13 \u0E40\u0E01\u0E47\u0E1A\u0E23\u0E31\u0E01\u0E29\u0E32\u0E23\u0E2D\u0E22\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04\u0E17\u0E35\u0E48\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E22\u0E31\u0E07\u0E21\u0E35\u0E44\u0E14\u0E19\u0E32\u0E42\u0E21",stemFact:"\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E40\u0E04\u0E22\u0E21\u0E35\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E42\u0E25\u0E01\u0E1B\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E40\u0E21\u0E37\u0E48\u0E2D 4 \u0E1E\u0E31\u0E19\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E40\u0E22\u0E47\u0E19\u0E15\u0E31\u0E27\u0E25\u0E07 \u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E08\u0E36\u0E07\u0E1E\u0E31\u0E14\u0E17\u0E33\u0E25\u0E32\u0E22\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28 (\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E42\u0E14\u0E22 NASA MAVEN)",waterEvidence:"++ (\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E14\u0E49\u0E32\u0E19\u0E27\u0E34\u0E27\u0E31\u0E12\u0E19\u0E32\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28: \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E14\u0E32\u0E27\u0E40\u0E04\u0E22\u0E21\u0E35\u0E40\u0E01\u0E23\u0E32\u0E30\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1B\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E19\u0E49\u0E33\u0E41\u0E25\u0E30\u0E2D\u0E32\u0E01\u0E32\u0E28)",waterEvidenceLevel:2,spectrometer:{hydration:"LOW (6% \xB1 2%)",hydrationVal:6,sulfate:"LOW (< 8%)",sulfateVal:5,iron:"VERY HIGH (\u0E1C\u0E25\u0E36\u0E01\u0E44\u0E17\u0E17\u0E32\u0E42\u0E19\u0E41\u0E21\u0E01\u0E19\u0E35\u0E44\u0E17\u0E15\u0E4C Fe-Ti)",ironVal:88,silicate:"MEDIUM (\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13)",silicateVal:55,magnetism:"VERY HIGH ANOMALY (\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 142 nT)",magnetismVal:96,visualTexture:"\u0E2B\u0E34\u0E19\u0E14\u0E32\u0E19\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E41\u0E01\u0E23\u0E48\u0E07 \u0E21\u0E35\u0E1C\u0E25\u0E36\u0E01\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E31\u0E27\u0E15\u0E32\u0E21\u0E41\u0E01\u0E19\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E42\u0E1A\u0E23\u0E32\u0E13 (Remanent magnetic bedrock)"},spectralData:{hydrationIndex:6,keyAbsorption:"\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07 142 nT / \u0E44\u0E17\u0E17\u0E32\u0E42\u0E19\u0E41\u0E21\u0E01\u0E19\u0E35\u0E44\u0E17\u0E15\u0E4C",absorption14:.08,absorption19:.06,absorptionMetal:.22,readingText:"\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E2B\u0E34\u0E19\u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 142 nT \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E1C\u0E25\u0E36\u0E01\u0E44\u0E17\u0E17\u0E32\u0E42\u0E19\u0E41\u0E21\u0E01\u0E19\u0E35\u0E44\u0E17\u0E15\u0E4C (Titanomagnetite)"},inquiryQuestion:{prompt:"\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E42\u0E1A\u0E23\u0E32\u0E13 (Remanent Paleomagnetism) \u0E43\u0E19\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27 \u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E44\u0E23\u0E01\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E39\u0E0D\u0E40\u0E2A\u0E35\u0E22\u0E19\u0E49\u0E33\u0E41\u0E25\u0E30\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E02\u0E2D\u0E07\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23?",choices:[{text:"\u0E01. \u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07\u0E43\u0E14\u0E46 \u0E01\u0E31\u0E1A\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E2B\u0E23\u0E37\u0E2D\u0E2A\u0E20\u0E32\u0E1E\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23"},{text:"\u0E02. \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E27\u0E48\u0E32\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E40\u0E04\u0E22\u0E21\u0E35\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E44\u0E14\u0E19\u0E32\u0E42\u0E21\u0E1B\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E40\u0E22\u0E47\u0E19\u0E15\u0E31\u0E27\u0E25\u0E07\u0E40\u0E01\u0E23\u0E32\u0E30\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E08\u0E36\u0E07\u0E14\u0E31\u0E1A\u0E2A\u0E39\u0E0D \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E1E\u0E31\u0E14\u0E17\u0E33\u0E25\u0E32\u0E22\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E41\u0E25\u0E30\u0E19\u0E49\u0E33\u0E08\u0E19\u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E2A\u0E39\u0E48\u0E2D\u0E27\u0E01\u0E32\u0E28"},{text:"\u0E04. \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E27\u0E48\u0E32\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E22\u0E31\u0E07\u0E21\u0E35\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E40\u0E2B\u0E25\u0E27\u0E44\u0E2B\u0E25\u0E40\u0E27\u0E35\u0E22\u0E19\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07\u0E01\u0E27\u0E48\u0E32\u0E42\u0E25\u0E01"}],correctIndex:1,explanation:"\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E40\u0E04\u0E22\u0E21\u0E35\u0E40\u0E01\u0E23\u0E32\u0E30\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E44\u0E14\u0E19\u0E32\u0E42\u0E21\u0E43\u0E19\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E2B\u0E22\u0E38\u0E14\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E08\u0E36\u0E07\u0E16\u0E39\u0E01\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E01\u0E31\u0E14\u0E40\u0E0B\u0E32\u0E30\u0E08\u0E19\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E25\u0E14\u0E25\u0E07\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E08\u0E38\u0E14\u0E23\u0E48\u0E27\u0E21\u0E2A\u0E32\u0E21\u0E02\u0E2D\u0E07\u0E19\u0E49\u0E33 (Water Triple Point 611 Pa) \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E43\u0E2B\u0E49\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E04\u0E07\u0E2A\u0E20\u0E32\u0E1E\u0E2D\u0E22\u0E39\u0E48\u0E1A\u0E19\u0E1E\u0E37\u0E49\u0E19\u0E1C\u0E34\u0E27\u0E44\u0E14\u0E49\u0E2D\u0E35\u0E01"},waterEvidencePoints:3,options:["\u0E2B\u0E34\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E01\u0E14\u0E32\u0E27\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E17\u0E35\u0E48\u0E21\u0E35\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07 (Remanent Paleomagnetic Rock)","\u0E02\u0E31\u0E49\u0E27\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E43\u0E19\u0E22\u0E38\u0E04\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E07\u0E40\u0E01\u0E34\u0E14\u0E02\u0E36\u0E49\u0E19 (Active Modern Geomagnetic Pole)","\u0E0A\u0E34\u0E49\u0E19\u0E2A\u0E48\u0E27\u0E19\u0E0B\u0E32\u0E01\u0E14\u0E32\u0E27\u0E40\u0E17\u0E35\u0E22\u0E21\u0E17\u0E35\u0E48\u0E15\u0E01\u0E25\u0E07\u0E21\u0E32 (Fallen Spacecraft Debris)","\u0E2B\u0E34\u0E19\u0E01\u0E23\u0E27\u0E14\u0E21\u0E19\u0E41\u0E21\u0E48\u0E19\u0E49\u0E33\u0E17\u0E35\u0E48\u0E01\u0E25\u0E34\u0E49\u0E07\u0E15\u0E31\u0E27\u0E21\u0E32 (River Conglomerate)"],correctOption:0,claimFeedback:"\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21! \u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E15\u0E01\u0E04\u0E49\u0E32\u0E07 (Remanent Magnetism) \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E27\u0E48\u0E32\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E40\u0E04\u0E22\u0E21\u0E35\u0E01\u0E23\u0E30\u0E1A\u0E27\u0E19\u0E01\u0E32\u0E23\u0E44\u0E14\u0E19\u0E32\u0E42\u0E21\u0E43\u0E19\u0E41\u0E01\u0E19\u0E01\u0E25\u0E32\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E14\u0E32\u0E27\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u0E04\u0E2D\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E01\u0E23\u0E32\u0E30\u0E01\u0E31\u0E19\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E19\u0E35\u0E49\u0E14\u0E31\u0E1A\u0E25\u0E07 \u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E41\u0E25\u0E30\u0E19\u0E49\u0E33\u0E08\u0E36\u0E07\u0E16\u0E39\u0E01\u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E1E\u0E31\u0E14\u0E1E\u0E32\u0E2D\u0E2D\u0E01\u0E2A\u0E39\u0E48\u0E2D\u0E27\u0E01\u0E32\u0E28 (\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E22\u0E32\u0E19 NASA MAVEN)"}].forEach(e=>{let i=this.getHeight(e.x,e.z),s=new Pe;s.position.set(e.x,i,e.z);let r=new Bs(.85,0),a=new he({color:e.color,emissive:e.color,emissiveIntensity:.9,roughness:.15,metalness:.8}),o=new nt(r,a);o.position.y=1.6,o.castShadow=!0,s.add(o);let l=new Ot(.06,.06,12,8),c=new ke({color:e.color,transparent:!0,opacity:.4}),u=new nt(l,c);u.position.y=6,s.add(u);let f=new En(e.color,3.5,16);f.position.y=2.2,s.add(f);let h=new jn(1.8,2.2,32);h.rotateX(-Math.PI/2);let d=new ke({color:e.color,side:He,transparent:!0,opacity:.65}),g=new nt(h,d);g.position.y=.08,s.add(g),this.scene.add(s),this.samples.push({id:e.id,name:e.name,thaiName:e.thaiName,unknownTitle:e.unknownTitle,siteType:e.siteType,position:new R(e.x,i,e.z),color:e.color,description:e.description,stemFact:e.stemFact,waterEvidence:e.waterEvidence,waterEvidenceLevel:e.waterEvidenceLevel,spectrometer:e.spectrometer,spectralData:e.spectralData,inquiryQuestion:e.inquiryQuestion,waterEvidencePoints:e.waterEvidencePoints,options:e.options,correctOption:e.correctOption,claimFeedback:e.claimFeedback,group:s,coreMesh:o,collected:!1,analyzed:!1,triggerRadius:4.8})})}initLander(){let e=this.getHeight(0,-16),i=new Pe;i.position.set(0,e,-16);let s=new Ot(3.6,4.4,2,8),r=new he({color:15857145,metalness:.8,roughness:.25}),a=new nt(s,r);a.position.y=1.3,a.castShadow=!0,a.receiveShadow=!0,i.add(a);let o=new Ot(2.6,3.4,2.4,8),l=new he({color:14251782,metalness:.95,roughness:.2}),c=new nt(o,l);c.position.y=3.3,c.castShadow=!0,i.add(c);let u=new Ls(2.4,3.6,8),f=new he({color:988970,metalness:.7,roughness:.3}),h=new nt(u,f);h.position.y=6.1,h.castShadow=!0,i.add(h);for(let p=0;p<4;p++){let m=p*Math.PI/2+Math.PI/4,M=new Ot(.14,.14,4.8),E=new he({color:3359061,metalness:.85}),v=new nt(M,E);v.position.set(Math.cos(m)*3.4,1.1,Math.sin(m)*3.4),v.rotation.z=Math.cos(m)*.65,v.rotation.x=Math.sin(m)*.65,v.castShadow=!0,i.add(v);let w=new Ot(.75,.75,.18,12),S=new nt(w,E);S.position.set(Math.cos(m)*4.8,.12,Math.sin(m)*4.8),S.castShadow=!0,i.add(S)}let d=new jn(7.2,7.8,36);d.rotateX(-Math.PI/2);let g=new ke({color:3718648,side:He,transparent:!0,opacity:.6}),y=new nt(d,g);y.position.y=.08,i.add(y),this.scene.add(i),this.lander={position:new R(0,e,-16),radius:8,group:i}}update(t){this.samples.forEach(e=>{e.collected||(e.coreMesh.rotation.y=t*1.5,e.coreMesh.position.y=1.6+Math.sin(t*2.5)*.25)})}};function hs(){return typeof document<"u"}function M0(){if(!hs())return new De({width:1,height:1});let n=document.createElement("canvas");n.width=512,n.height=512;let t=n.getContext("2d"),e=t.createLinearGradient(0,0,512,512);e.addColorStop(0,"#071326"),e.addColorStop(.5,"#0c2340"),e.addColorStop(1,"#08172c"),t.fillStyle=e,t.fillRect(0,0,512,512);let i=512/8,s=2.5;for(let a=0;a<8;a++)for(let o=0;o<8;o++){let l=o*i+s,c=a*i+s,u=i-s*2,f=i-s*2,h=t.createLinearGradient(l,c,l+u,c+f);h.addColorStop(0,"#102e52"),h.addColorStop(.5,"#19497e"),h.addColorStop(1,"#0d2746"),t.fillStyle=h,t.fillRect(l,c,u,f),t.strokeStyle="rgba(125, 211, 252, 0.22)",t.lineWidth=1;for(let g=c+4;g<c+f;g+=4)t.beginPath(),t.moveTo(l,g),t.lineTo(l+u,g),t.stroke();t.strokeStyle="#e2e8f0",t.lineWidth=2,t.beginPath(),t.moveTo(l+u*.33,c),t.lineTo(l+u*.33,c+f),t.moveTo(l+u*.67,c),t.lineTo(l+u*.67,c+f),t.stroke(),t.fillStyle="#071326";let d=4;t.beginPath(),t.moveTo(l,c),t.lineTo(l+d,c),t.lineTo(l,c+d),t.fill(),t.beginPath(),t.moveTo(l+u,c),t.lineTo(l+u-d,c),t.lineTo(l+u,c+d),t.fill(),t.beginPath(),t.moveTo(l,c+f),t.lineTo(l+d,c+f),t.lineTo(l,c+f-d),t.fill(),t.beginPath(),t.moveTo(l+u,c+f),t.lineTo(l+u-d,c+f),t.lineTo(l+u,c+f-d),t.fill()}t.strokeStyle="#334155",t.lineWidth=6,t.strokeRect(0,0,512,512);let r=new De(n);return r.wrapS=Ke,r.wrapT=Ke,r}function b0(){if(!hs())return new De({width:1,height:1});let n=document.createElement("canvas");n.width=512,n.height=512;let t=n.getContext("2d");t.fillStyle="#d97706",t.fillRect(0,0,512,512);for(let i=0;i<400;i++){let s=Math.random()*512,r=Math.random()*512,a=15+Math.random()*45,o=Math.random()*Math.PI*2,l=s+Math.cos(o)*a,c=r+Math.sin(o)*a;t.strokeStyle=Math.random()>.5?"rgba(254, 240, 138, 0.45)":"rgba(180, 83, 9, 0.6)",t.lineWidth=1+Math.random()*2.5,t.beginPath(),t.moveTo(s,r),t.lineTo(l,c),t.stroke()}t.fillStyle="rgba(146, 64, 14, 0.55)",t.fillRect(0,120,512,16),t.fillRect(0,260,512,16),t.fillRect(0,400,512,16),t.fillRect(160,0,16,512),t.fillRect(340,0,16,512),t.fillStyle="#fef08a";for(let i=128;i<=400;i+=140)for(let s=20;s<512;s+=40)t.beginPath(),t.arc(s,i,2.5,0,Math.PI*2),t.fill();let e=new De(n);return e.wrapS=Ke,e.wrapT=Ke,e}function S0(){if(!hs())return new De({width:1,height:1});let n=document.createElement("canvas");n.width=512,n.height=512;let t=n.getContext("2d");t.fillStyle="#f8fafc",t.fillRect(0,0,512,512),t.strokeStyle="#94a3b8",t.lineWidth=3,t.strokeRect(16,16,480,480),t.beginPath(),t.moveTo(16,256),t.lineTo(496,256),t.moveTo(256,16),t.lineTo(256,496),t.stroke(),t.fillStyle="#64748b";for(let i=28;i<496;i+=28)t.beginPath(),t.arc(i,16,2.5,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(i,496,2.5,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(16,i,2.5,0,Math.PI*2),t.fill(),t.beginPath(),t.arc(496,i,2.5,0,Math.PI*2),t.fill();t.fillStyle="#ea580c",t.fillRect(32,32,180,24),t.fillStyle="#ffffff",t.font='bold 13px "JetBrains Mono", monospace',t.fillText("ARES-6 // ROVER",42,49),t.fillStyle="#475569",t.font='9px "JetBrains Mono", monospace',t.fillText("NASA / JPL EXPLORATION PAYLOAD",32,75),t.fillText("AVIONICS BAY A - PRESSURIZED GN2",32,90),t.fillText("CHASSIS LEVELING SUBSYSTEM v2.4",32,105),t.fillStyle="#f97316";for(let i=280;i<480;i+=22)t.beginPath(),t.moveTo(i,32),t.lineTo(i+10,32),t.lineTo(i-6,56),t.lineTo(i-16,56),t.closePath(),t.fill();let e=new De(n);return e.wrapS=Ke,e.wrapT=Ke,e}function E0(){if(!hs())return new De({width:1,height:1});let n=document.createElement("canvas");n.width=64,n.height=64;let t=n.getContext("2d");t.fillStyle="#0f172a",t.fillRect(0,0,64,64);let e=8;for(let s=0;s<64;s+=e)for(let r=0;r<64;r+=e){let a=(r/e+s/e)%2===0;t.fillStyle=a?"#1e293b":"#090d16",t.fillRect(r,s,e,e),t.strokeStyle=a?"rgba(148, 163, 184, 0.15)":"rgba(2, 6, 23, 0.4)",t.lineWidth=1,t.beginPath(),t.moveTo(r,s),t.lineTo(r+e,s+e),t.stroke()}let i=new De(n);return i.wrapS=Ke,i.wrapT=Ke,i.repeat.set(4,4),i}function T0(){if(!hs())return new De({width:1,height:1});let n=document.createElement("canvas");n.width=256,n.height=256;let t=n.getContext("2d"),e=t.createRadialGradient(128,128,10,128,128,120);return e.addColorStop(0,"rgba(15, 6, 4, 0.85)"),e.addColorStop(.35,"rgba(25, 10, 6, 0.55)"),e.addColorStop(.7,"rgba(40, 15, 10, 0.2)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),t.fillStyle=e,t.fillRect(0,0,256,256),new De(n)}function cu(n){if(!hs()||!n)return null;let t=document.createElement("canvas");t.width=1024,t.height=512;let e=t.getContext("2d"),i=e.createLinearGradient(0,0,0,256);i.addColorStop(0,"#100504"),i.addColorStop(.35,"#45170d"),i.addColorStop(.7,"#8c351b"),i.addColorStop(.95,"#d95a2b"),i.addColorStop(1,"#f97316"),e.fillStyle=i,e.fillRect(0,0,1024,256);let s=680,r=105,a=e.createRadialGradient(s,r,2,s,r,180);a.addColorStop(0,"#ffffff"),a.addColorStop(.08,"#fff7ed"),a.addColorStop(.2,"#fef08a"),a.addColorStop(.45,"rgba(251, 146, 60, 0.75)"),a.addColorStop(.75,"rgba(234, 88, 12, 0.3)"),a.addColorStop(1,"rgba(194, 65, 12, 0)"),e.fillStyle=a,e.fillRect(0,0,1024,256);let o=e.createRadialGradient(s,r,10,s,r,320);o.addColorStop(0,"rgba(255, 237, 213, 0.45)"),o.addColorStop(.5,"rgba(249, 115, 22, 0.15)"),o.addColorStop(1,"rgba(180, 83, 9, 0)"),e.fillStyle=o,e.fillRect(0,0,1024,256);let l=e.createLinearGradient(0,256,0,512);l.addColorStop(0,"#d95a2b"),l.addColorStop(.08,"#7c2d12"),l.addColorStop(.28,"#451a0d"),l.addColorStop(.65,"#260e07"),l.addColorStop(1,"#120603"),e.fillStyle=l,e.fillRect(0,256,1024,256),e.fillStyle="#612413",e.beginPath(),e.moveTo(0,256);for(let h=0;h<=1024;h+=16){let d=Math.sin(h*.015)*6+Math.cos(h*.035)*4;e.lineTo(h,256-Math.max(0,d))}e.lineTo(1024,264),e.lineTo(0,264),e.closePath(),e.fill();let c=new De(t);c.mapping=is;let u=new ls(n);u.compileEquirectangularShader();let f=u.fromEquirectangular(c).texture;return u.dispose(),c.dispose(),f}var vo=class{constructor(){this.solarTex=M0(),this.goldFoilTex=b0(),this.panelTex=S0(),this.carbonTex=E0(),this.shadowTex=T0(),this.whiteArmor=new he({map:this.panelTex,color:16317180,roughness:.3,metalness:.28}),this.goldFoil=new he({map:this.goldFoilTex,color:16096779,roughness:.2,metalness:.96,bumpMap:this.goldFoilTex,bumpScale:.04}),this.solarDeck=new he({map:this.solarTex,roughness:.1,metalness:.96,emissive:795973,emissiveIntensity:.2}),this.carbonFiber=new he({map:this.carbonTex,color:1976635,roughness:.4,metalness:.55}),this.chromePiston=new he({color:16777215,roughness:.04,metalness:.98}),this.gunmetal=new he({color:4674921,roughness:.2,metalness:.92}),this.darkChassis=new he({color:1976635,roughness:.38,metalness:.72}),this.marsOrange=new he({color:15357964,roughness:.22,metalness:.88}),this.cameraLens=new he({color:399398,roughness:.04,metalness:.96,emissive:165063,emissiveIntensity:.4}),this.sensorGlow=new he({color:440020,emissive:440020,emissiveIntensity:.9,roughness:.18,metalness:.75}),this.springSteel=new he({color:16347926,roughness:.2,metalness:.9})}};var sc=null;function rc(){return sc||(sc=new vo),sc}function w0(n,t,e,i,s=48){let r=[],a=e*s;for(let l=0;l<=a;l++){let c=l/a,u=c*e*Math.PI*2,f=c*i,h=Math.cos(u)*n,d=Math.sin(u)*n;r.push(new R(f,h,d))}let o=new Kn(r);return new Os(o,a,t,6,!1)}var ac=class{constructor(t,e,i){this.id=t,this.mountAngle=e,this.mountRadius=i,this.coxaLength=.45,this.femurLength=.92,this.tibiaLength=1.22,this.root=new Pe,this.root.position.set(Math.cos(e)*i,0,Math.sin(e)*i),this.root.rotation.y=-e,this.coxaPivot=new Pe,this.root.add(this.coxaPivot),this.femurPivot=new Pe,this.femurPivot.position.set(this.coxaLength,0,0),this.coxaPivot.add(this.femurPivot),this.tibiaPivot=new Pe,this.tibiaPivot.position.set(this.femurLength,0,0),this.femurPivot.add(this.tibiaPivot),this.footTip=new Pe,this.footTip.position.set(this.tibiaLength,0,0),this.tibiaPivot.add(this.footTip),this.worldFootPos=new R,this.isGrounded=!0,this.wasGrounded=!0,this.buildMeshes()}buildMeshes(){let t=rc(),e=new Ot(.24,.26,.08,16),i=new nt(e,t.gunmetal);i.position.y=-.02,i.castShadow=!0,this.coxaPivot.add(i);let s=new Ot(.016,.016,.03,6);for(let qt=0;qt<8;qt++){let zt=qt*Math.PI*2/8,Nt=new nt(s,t.chromePiston);Nt.position.set(Math.cos(zt)*.22,.03,Math.sin(zt)*.22),this.coxaPivot.add(Nt)}let r=new Ot(.18,.2,.32,16),a=new nt(r,t.gunmetal);a.position.y=.08,a.castShadow=!0,this.coxaPivot.add(a);for(let qt of[0,.08,.16]){let zt=new Ui(.19,.015,6,20);zt.rotateX(Math.PI/2);let Nt=new nt(zt,t.marsOrange);Nt.position.y=qt,this.coxaPivot.add(Nt)}let o=new ge(this.coxaLength*.88,.16,.18),l=new nt(o,t.whiteArmor);l.position.set(this.coxaLength*.44,.08,0),l.castShadow=!0,this.coxaPivot.add(l);for(let qt of[-.095,.095]){let zt=new ge(this.coxaLength*.7,.12,.02),Nt=new nt(zt,t.carbonFiber);Nt.position.set(this.coxaLength*.44,.08,qt),this.coxaPivot.add(Nt)}let c=new ge(.04,.02,.04),u=new ke({color:1096065}),f=new nt(c,u);f.position.set(this.coxaLength*.3,.17,0),this.coxaPivot.add(f);let h=new Ot(.13,.13,.22,16);h.rotateX(Math.PI/2);let d=new nt(h,t.gunmetal);d.castShadow=!0,this.femurPivot.add(d);let g=new Ot(.06,.06,.26,16);g.rotateX(Math.PI/2);let y=new nt(g,t.chromePiston);this.femurPivot.add(y);let p=new ge(this.femurLength,.14,.12),m=new nt(p,t.whiteArmor);m.position.set(this.femurLength*.5,0,0),m.castShadow=!0,this.femurPivot.add(m);for(let qt of[-.065,.065]){let zt=new ge(this.femurLength*.85,.11,.015),Nt=new nt(zt,t.carbonFiber);Nt.position.set(this.femurLength*.5,0,qt),this.femurPivot.add(Nt)}let M=new ge(this.femurLength*.7,.02,.08),E=new nt(M,t.marsOrange);E.position.set(this.femurLength*.5,.08,0),this.femurPivot.add(E);let v=this.femurLength*.45,w=new Ot(.038,.042,v,12);w.rotateZ(-Math.PI/2);let S=new nt(w,t.gunmetal);S.position.set(this.femurLength*.28,.13,0),S.castShadow=!0,this.femurPivot.add(S);let C=this.femurLength*.38,x=new Ot(.022,.022,C,12);x.rotateZ(-Math.PI/2);let T=new nt(x,t.chromePiston);T.position.set(this.femurLength*.62,.13,0),T.castShadow=!0,this.femurPivot.add(T);let P=new Ui(.05,.012,6,16),I=new nt(P,t.marsOrange);I.position.set(this.femurLength*.15,.13,0),this.femurPivot.add(I);let L=new Ot(.12,.12,.2,16);L.rotateX(Math.PI/2);let W=new nt(L,t.gunmetal);W.castShadow=!0,this.tibiaPivot.add(W);let X=new ge(.14,.18,.22),U=new nt(X,t.marsOrange);U.position.set(-.02,.03,0),this.tibiaPivot.add(U);let B=new Ot(.07,.075,this.tibiaLength*.3,14);B.rotateZ(-Math.PI/2);let z=new nt(B,t.gunmetal);z.position.set(this.tibiaLength*.15,0,0),z.castShadow=!0,this.tibiaPivot.add(z);let q=new Ot(.035,.035,this.tibiaLength*.45,12);q.rotateZ(-Math.PI/2);let j=new nt(q,t.chromePiston);j.position.set(this.tibiaLength*.45,0,0),this.tibiaPivot.add(j);let et=this.tibiaLength*.42,ht=w0(.065,.016,6,et),xt=new nt(ht,t.springSteel);xt.position.set(this.tibiaLength*.24,0,0),xt.castShadow=!0,this.tibiaPivot.add(xt);let Yt=new Ot(.055,.055,this.tibiaLength*.15,12);Yt.rotateZ(-Math.PI/2);let jt=new nt(Yt,t.darkChassis);jt.position.set(this.tibiaLength*.68,0,0),this.tibiaPivot.add(jt);let Gt=new Ot(.045,.065,this.tibiaLength*.38,14);Gt.rotateZ(-Math.PI/2);let Z=new nt(Gt,t.carbonFiber);Z.position.set(this.tibiaLength*.88,0,0),Z.castShadow=!0,this.tibiaPivot.add(Z);let st=new bn(.07,14,14),tt=new nt(st,t.gunmetal);tt.position.set(this.tibiaLength,0,0),this.tibiaPivot.add(tt);let It=new Ot(.16,.12,.06,16);It.rotateZ(Math.PI/2);let Dt=new nt(It,t.gunmetal);Dt.position.set(this.tibiaLength+.04,0,0),Dt.castShadow=!0,this.tibiaPivot.add(Dt);let Ct=new Ui(.14,.025,8,20);Ct.rotateY(Math.PI/2);let le=new nt(Ct,t.darkChassis);le.position.set(this.tibiaLength+.05,0,0),this.tibiaPivot.add(le);let Wt=new Ot(.09,.09,.025,16);Wt.rotateZ(Math.PI/2),this.footPad=new nt(Wt,t.sensorGlow),this.footPad.position.set(this.tibiaLength+.07,0,0),this.tibiaPivot.add(this.footPad)}solveIK(t){let e=-Math.atan2(t.z,t.x);this.coxaPivot.rotation.y=e;let i=Math.sqrt(t.x*t.x+t.z*t.z)-this.coxaLength,s=t.y,r=Math.sqrt(i*i+s*s),a=(this.femurLength+this.tibiaLength)*.98,o=Math.abs(this.femurLength-this.tibiaLength)*1.05,l=Math.max(o,Math.min(a,r)),c=(this.femurLength*this.femurLength+this.tibiaLength*this.tibiaLength-l*l)/(2*this.femurLength*this.tibiaLength),u=Math.PI-Math.acos(Math.max(-1,Math.min(1,c))),f=Math.atan2(s,i),h=(this.femurLength*this.femurLength+l*l-this.tibiaLength*this.tibiaLength)/(2*this.femurLength*l),d=Math.acos(Math.max(-1,Math.min(1,h))),g=f+d;this.femurPivot.rotation.z=g,this.tibiaPivot.rotation.z=-u}},Mo=class{constructor(t){this.scene=t,this.group=new Pe,this.scene.add(this.group),this.body=new Pe,this.group.add(this.body),this.legs=[],this.chassisRadius=1.35,this.bodyHeight=1.15,this.position=this.group.position,this.rotation=this.group.rotation,this.buildChassis(),this.buildLegs(),this.buildContactShadow()}buildChassis(){let t=rc(),e=new Ot(this.chassisRadius*1.05,this.chassisRadius*.95,.16,6),i=new nt(e,t.darkChassis);i.position.y=-.04,i.castShadow=!0,i.receiveShadow=!0,this.body.add(i);let s=new Ot(this.chassisRadius*1.15,this.chassisRadius*1.12,.12,6),r=new nt(s,t.gunmetal);r.position.y=.08,r.castShadow=!0,this.body.add(r);let a=new Ot(this.chassisRadius,this.chassisRadius*1.12,.42,6),o=new nt(a,t.whiteArmor);o.position.y=.32,o.castShadow=!0,o.receiveShadow=!0,this.body.add(o);for(let B=0;B<6;B++){let z=B*Math.PI/3+Math.PI/6,q=new ge(.85,.28,.08),j=new nt(q,t.goldFoil);j.position.set(Math.cos(z)*(this.chassisRadius*1.02),.32,Math.sin(z)*(this.chassisRadius*1.02)),j.rotation.y=-z+Math.PI/2,j.castShadow=!0,this.body.add(j)}let l=new ge(.28,.44,2.5),c=new nt(l,t.marsOrange);c.position.set(0,.33,0),this.body.add(c);for(let B of[-.35,.35]){let z=new ge(.16,.12,.14),q=new nt(z,t.gunmetal);q.position.set(B,.06,1.25),q.rotation.x=.35,this.body.add(q);let j=new Ot(.04,.04,.06,14);j.rotateX(Math.PI/2);let et=new nt(j,t.cameraLens);et.position.set(B,.05,1.33),this.body.add(et)}let u=new Ot(this.chassisRadius*.88,this.chassisRadius*.9,.04,6),f=new nt(u,t.gunmetal);f.position.y=.54,this.body.add(f);let h=new Ot(this.chassisRadius*.85,this.chassisRadius*.85,.05,6),d=new nt(h,t.solarDeck);d.position.y=.58,d.castShadow=!0,this.body.add(d),this.solarDeck=d;for(let B=0;B<6;B++){let z=B*Math.PI/3,q=new ge(.14,.07,.08),j=new nt(q,t.chromePiston);j.position.set(Math.cos(z)*(this.chassisRadius*.85),.59,Math.sin(z)*(this.chassisRadius*.85)),j.rotation.y=-z,this.body.add(j)}let g=new Ot(.075,.09,.85,16),y=new nt(g,t.gunmetal);y.position.set(0,1,.55),y.castShadow=!0,this.body.add(y);let p=new Ui(.095,.015,6,24);p.rotateX(Math.PI/2);for(let B=.7;B<=1.25;B+=.16){let z=new nt(p,t.marsOrange);z.position.set(0,B,.55),this.body.add(z)}let m=new Ot(.14,.14,.16,16),M=new nt(m,t.gunmetal);M.position.set(0,1.48,.55),this.body.add(M);let E=new ge(.68,.26,.34),v=new nt(E,t.whiteArmor);v.position.set(0,1.62,.55),v.castShadow=!0,this.body.add(v);for(let B of[-.22,.22]){let z=new Ot(.08,.08,.15,16);z.rotateX(Math.PI/2);let q=new nt(z,t.gunmetal);q.position.set(B,1.62,.74),q.castShadow=!0,this.body.add(q);let j=new Ui(.082,.01,8,20),et=new nt(j,t.goldFoil);et.position.set(B,1.62,.81),this.body.add(et);let ht=new Ot(.07,.07,.04,16);ht.rotateX(Math.PI/2);let xt=new nt(ht,t.cameraLens);xt.position.set(B,1.62,.82),this.body.add(xt);let Yt=new ge(.18,.18,.08),jt=new nt(Yt,t.darkChassis);jt.position.set(B,1.62,.84),this.body.add(jt);let Gt=new Gs(440020,3.2,35,Math.PI/4.5,.4);Gt.position.set(B,1.62,.88),Gt.target.position.set(B,-.5,14),this.body.add(Gt),this.body.add(Gt.target)}let w=new Ot(.065,.065,.12,16);w.rotateX(Math.PI/2);let S=new nt(w,t.goldFoil);S.position.set(0,1.66,.73),this.body.add(S);for(let B of[-1,1]){let z=new Ot(.015,.015,.45,8);z.rotateZ(Math.PI/2);let q=new nt(z,t.chromePiston);q.position.set(B*.52,1.62,.55),this.body.add(q);let j=new bn(.035,8,8),et=new nt(j,t.marsOrange);et.position.set(B*.75,1.62,.55),this.body.add(et)}let C=new Ot(.18,.22,.48,16),x=new nt(C,t.gunmetal);x.position.set(0,.72,-.85),x.castShadow=!0,this.body.add(x);for(let B=0;B<8;B++){let z=B*Math.PI/4,q=new ge(.02,.44,.22),j=new nt(q,t.darkChassis);j.position.set(Math.cos(z)*.26,.72,-.85+Math.sin(z)*.26),j.rotation.y=-z,j.castShadow=!0,this.body.add(j)}let T=new bn(.38,16,16,0,Math.PI*2,0,Math.PI*.5),P=new nt(T,t.goldFoil);P.position.set(.48,.85,-.45),P.rotation.x=-Math.PI*.65,P.rotation.y=.25,P.castShadow=!0,this.body.add(P);let I=new Ot(.025,.04,.28,8),L=new nt(I,t.chromePiston);L.position.set(.48,.98,-.4),this.body.add(L);let W=new Ot(.012,.025,.65,8),X=new nt(W,t.chromePiston);X.position.set(-.55,.9,-.45),this.body.add(X);let U=new En(16772829,1.8,8);U.position.set(0,1.8,0),this.body.add(U)}buildLegs(){let t=[50*Math.PI/180,0,-50*Math.PI/180,-130*Math.PI/180,Math.PI,130*Math.PI/180];for(let e=0;e<6;e++){let i=new ac(e,t[e],this.chassisRadius);this.body.add(i.root),this.legs.push(i)}}buildContactShadow(){let t=rc(),e=new Fi(6.4,6.4);e.rotateX(-Math.PI/2);let i=new ke({map:t.shadowTex,transparent:!0,opacity:.85,depthWrite:!1});this.contactShadow=new nt(e,i),this.contactShadow.position.y=.04,this.group.add(this.contactShadow)}updateSolarGlow(t){this.solarDeck&&this.solarDeck.material&&(this.solarDeck.material.emissiveIntensity=.12+Math.max(0,t)*.7)}},bo=class{constructor(t,e,i=null,s=null){this.robot=t,this.terrain=e,this.audio=i,this.dust=s,this.mode="tripod",this.phase=0,this.cycleSpeed=1.35,this.stepHeight=.38,this.bodyHeight=1.15,this.groupA=[0,2,4],this.groupB=[1,3,5],this.stanceRadiusMid=2.8,this.stanceRadiusFrontRear=2.75}setMode(t){(t==="tripod"||t==="wave")&&(this.mode=t)}update(t,e,i=0){let s=0,r=i;e instanceof R?s=e.length()*Math.sign(e.z||1):s=Number(e)||0;let o=Math.hypot(s,r*2.75),l=o>.025;if(l){let f=Math.min(2.2,Math.max(.65,o/2.8));this.phase=(this.phase+t*this.cycleSpeed*f)%1}let c=l?Math.min(2.2,Math.max(.65,o/2.8)):1,u=.5/(this.cycleSpeed*c);this.robot.legs.forEach(f=>{let h=0,d=!0;this.mode==="tripod"?(h=(this.groupA.includes(f.id)?this.phase:this.phase+.5)%1,d=h>=.5||!l):(h=(this.phase+f.id/6)%1,d=h>=1/6||!l),d&&!f.wasGrounded&&l&&(this.audio&&this.audio.playFootstep(),this.dust&&this.dust.emitFootstepPuff(f.worldFootPos,6)),f.wasGrounded=d,f.isGrounded=d,f.footPad&&f.footPad.material&&(f.footPad.material.emissiveIntensity=d?.95:.25);let g=f.id===1||f.id===4?this.stanceRadiusMid:this.stanceRadiusFrontRear,y=Math.cos(f.mountAngle)*g,p=Math.sin(f.mountAngle)*g,m=y,M=p,E=0;if(l){let x=r*p,T=s-r*y,P=this.mode==="tripod"?.72:.5,I=x*u,L=T*u,W=Math.hypot(I,L);if(W>P&&(I=I/W*P,L=L/W*P),d){let X=this.mode==="tripod"?(h-.5)/.5:(h-.16666666666666666)/.8333333333333334,B=1-2*Math.max(0,Math.min(1,X));m=y+I*B,M=p+L*B}else{let X=this.mode==="tripod"?h/.5:h*6,U=Math.max(0,Math.min(1,X)),B=3*U*U-2*U*U*U;m=y-I+2*I*B,M=p-L+2*L*B,E=Math.sin(U*Math.PI)*this.stepHeight}}let v=new R(m,0,M);v.applyEuler(new ti(0,this.robot.rotation.y,0)),v.add(this.robot.position);let S=(this.terrain?this.terrain.getHeight(v.x,v.z):0)+E;f.worldFootPos.set(v.x,S,v.z),this.robot.scene.updateMatrixWorld(!0);let C=f.worldFootPos.clone();f.root.worldToLocal(C),f.solveIK(C)})}};var So=class{constructor(){this.ctx=null,this.isMuted=!1,this.motorOsc=null,this.motorGain=null,this.windNode=null,this.windGain=null,this.initialized=!1}init(){if(!this.initialized)try{let t=window.AudioContext||window.webkitAudioContext;this.ctx=new t,this.motorOsc=this.ctx.createOscillator(),this.motorOsc.type="sawtooth",this.motorOsc.frequency.setValueAtTime(45,this.ctx.currentTime);let e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.setValueAtTime(220,this.ctx.currentTime),this.motorGain=this.ctx.createGain(),this.motorGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.motorOsc.connect(e),e.connect(this.motorGain),this.motorGain.connect(this.ctx.destination),this.motorOsc.start(),this.initWind(),this.initialized=!0}catch(t){console.warn("Web Audio API not supported or blocked:",t)}}initWind(){if(!this.ctx)return;let t=this.ctx.sampleRate*2,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),i=e.getChannelData(0);for(let a=0;a<t;a++)i[a]=Math.random()*2-1;let s=this.ctx.createBufferSource();s.buffer=e,s.loop=!0;let r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(260,this.ctx.currentTime),r.Q.setValueAtTime(3,this.ctx.currentTime),this.windGain=this.ctx.createGain(),this.windGain.gain.setValueAtTime(.015,this.ctx.currentTime),s.connect(r),r.connect(this.windGain),this.windGain.connect(this.ctx.destination),s.start()}updateMotor(t){if(!this.initialized||this.isMuted||!this.ctx)return;let e=45+t*120,i=t>.05?Math.min(.08,t*.08):1e-4;this.motorOsc.frequency.setTargetAtTime(e,this.ctx.currentTime,.05),this.motorGain.gain.setTargetAtTime(i,this.ctx.currentTime,.05)}playFootstep(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(140,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(30,this.ctx.currentTime+.06),e.gain.setValueAtTime(.04,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.06),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.07)}playScan(){if(!this.initialized||this.isMuted||!this.ctx)return;[523.25,659.25,783.99,1046.5].forEach((e,i)=>{let s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(e,this.ctx.currentTime+i*.08),r.gain.setValueAtTime(.08,this.ctx.currentTime+i*.08),r.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+i*.08+.3),s.connect(r),r.connect(this.ctx.destination),s.start(this.ctx.currentTime+i*.08),s.stop(this.ctx.currentTime+i*.08+.35)})}playAlert(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="square",t.frequency.setValueAtTime(880,this.ctx.currentTime),t.frequency.setValueAtTime(440,this.ctx.currentTime+.08),e.gain.setValueAtTime(.05,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.18),t.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.2)}playTractionSlip(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.createOscillator(),e=this.ctx.createGain(),i=this.ctx.createBiquadFilter();t.type="sawtooth",t.frequency.setValueAtTime(110,this.ctx.currentTime),t.frequency.linearRampToValueAtTime(55,this.ctx.currentTime+.22),i.type="bandpass",i.frequency.setValueAtTime(320,this.ctx.currentTime),i.Q.setValueAtTime(4,this.ctx.currentTime),e.gain.setValueAtTime(.06,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.25),t.connect(i),i.connect(e),e.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+.26)}playVictory(){if(!this.initialized||this.isMuted||!this.ctx)return;[523.25,659.25,783.99,987.77,1046.5,1318.5].forEach((e,i)=>{let s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(e,this.ctx.currentTime+i*.12),r.gain.setValueAtTime(.12,this.ctx.currentTime+i*.12),r.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+i*.12+.8),s.connect(r),r.connect(this.ctx.destination),s.start(this.ctx.currentTime+i*.12),s.stop(this.ctx.currentTime+i*.12+.9)})}playCollision(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.currentTime,e=this.ctx.createOscillator(),i=this.ctx.createGain(),s=this.ctx.createBiquadFilter();e.type="triangle",e.frequency.setValueAtTime(110,t),e.frequency.exponentialRampToValueAtTime(32,t+.14),s.type="lowpass",s.frequency.setValueAtTime(380,t),s.frequency.exponentialRampToValueAtTime(80,t+.14),i.gain.setValueAtTime(.18,t),i.gain.exponentialRampToValueAtTime(1e-4,t+.15),e.connect(s),s.connect(i),i.connect(this.ctx.destination),e.start(t),e.stop(t+.16);let r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(680,t),r.frequency.exponentialRampToValueAtTime(220,t+.08),a.gain.setValueAtTime(.06,t),a.gain.exponentialRampToValueAtTime(1e-4,t+.08),r.connect(a),a.connect(this.ctx.destination),r.start(t),r.stop(t+.09)}playGaitShift(){if(!this.initialized||this.isMuted||!this.ctx)return;let t=this.ctx.currentTime,e=Math.floor(this.ctx.sampleRate*.18),i=this.ctx.createBuffer(1,e,this.ctx.sampleRate),s=i.getChannelData(0);for(let u=0;u<e;u++)s[u]=Math.random()*2-1;let r=this.ctx.createBufferSource();r.buffer=i;let a=this.ctx.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(1400,t),a.frequency.exponentialRampToValueAtTime(320,t+.17),a.Q.setValueAtTime(4,t);let o=this.ctx.createGain();o.gain.setValueAtTime(.09,t),o.gain.exponentialRampToValueAtTime(1e-4,t+.17),r.connect(a),a.connect(o),o.connect(this.ctx.destination),r.start(t);let l=this.ctx.createOscillator(),c=this.ctx.createGain();l.type="square",l.frequency.setValueAtTime(540,t),l.frequency.exponentialRampToValueAtTime(110,t+.06),c.gain.setValueAtTime(.08,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),l.connect(c),c.connect(this.ctx.destination),l.start(t),l.stop(t+.07)}toggleMute(){return this.isMuted=!this.isMuted,this.ctx&&(this.isMuted?this.ctx.suspend():this.ctx.resume()),this.isMuted}};var Eo=class{constructor(t,e=140){this.scene=t,this.maxParticles=e,this.particlePool=[],this.marsGravity=3.72,this.initParticles()}createDustTexture(){let e=document.createElement("canvas");e.width=64,e.height=64;let i=e.getContext("2d"),s=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);s.addColorStop(0,"rgba(255, 255, 255, 0.95)"),s.addColorStop(.35,"rgba(240, 200, 170, 0.65)"),s.addColorStop(.7,"rgba(210, 110, 70, 0.25)"),s.addColorStop(1,"rgba(180, 80, 40, 0.0)"),i.fillStyle=s,i.fillRect(0,0,64,64);let r=new De(e);return r.generateMipmaps=!1,r.minFilter=Se,r}initParticles(){this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.sizes=new Float32Array(this.maxParticles);for(let e=0;e<this.maxParticles;e++)this.positions[e*3+0]=0,this.positions[e*3+1]=-500,this.positions[e*3+2]=0,this.colors[e*3+0]=.85,this.colors[e*3+1]=.42,this.colors[e*3+2]=.22,this.sizes[e]=0,this.particlePool.push({active:!1,x:0,y:-500,z:0,vx:0,vy:0,vz:0,life:0,maxLife:.7,baseSize:.35,r:.85,g:.42,b:.22});this.geometry=new ne,this.geometry.setAttribute("position",new ve(this.positions,3)),this.geometry.setAttribute("color",new ve(this.colors,3)),this.geometry.setAttribute("size",new ve(this.sizes,1));let t=this.createDustTexture();this.material=new Qi({size:1,map:t,transparent:!0,opacity:.85,vertexColors:!0,depthWrite:!1,blending:Di}),this.points=new Mn(this.geometry,this.material),this.points.frustumCulled=!1,this.scene.add(this.points)}emitFootstepPuff(t,e=6){let i=0;for(let s=0;s<this.maxParticles&&i<e;s++){let r=this.particlePool[s];if(!r.active){r.active=!0;let a=Math.random()*Math.PI*2,o=.08+Math.random()*.16;r.x=t.x+Math.cos(a)*o,r.y=t.y+.04,r.z=t.z+Math.sin(a)*o;let l=.35+Math.random()*.75;r.vx=Math.cos(a)*l,r.vy=.55+Math.random()*.85,r.vz=Math.sin(a)*l,r.life=0,r.maxLife=.55+Math.random()*.35,r.baseSize=.45+Math.random()*.35;let c=Math.random();c<.6?(r.r=.85,r.g=.38,r.b=.2):c<.85?(r.r=.95,r.g=.55,r.b=.3):(r.r=.65,r.g=.28,r.b=.16),i++}}}update(t){let e=this.geometry.attributes.position,i=this.geometry.attributes.color,s=!1;for(let r=0;r<this.maxParticles;r++){let a=this.particlePool[r];if(a.active){if(s=!0,a.life+=t,a.life>=a.maxLife){a.active=!1,a.y=-500,this.positions[r*3+1]=-500;continue}let o=a.life/a.maxLife;a.vy-=this.marsGravity*.65*t,a.vx*=.95,a.vz*=.95,a.x+=a.vx*t,a.y+=a.vy*t,a.z+=a.vz*t,this.positions[r*3+0]=a.x,this.positions[r*3+1]=a.y,this.positions[r*3+2]=a.z,this.sizes[r]=a.baseSize*(1+o*2.2);let l=Math.max(0,1-o*o);this.colors[r*3+0]=a.r*l,this.colors[r*3+1]=a.g*l,this.colors[r*3+2]=a.b*l}}s&&(e.needsUpdate=!0,i.needsUpdate=!0,this.geometry.attributes.size&&(this.geometry.attributes.size.needsUpdate=!0))}};var To=class{constructor(t){if(this.canvas=document.getElementById(t),!!this.canvas){this.ctx=this.canvas.getContext("2d"),this.minT=-100,this.maxT=80,this.minLogP=Math.log10(.02),this.maxLogP=Math.log10(200),this.temp=-55,this.pressure=.63,this.isBrine=!1,this.tripleT=.01,this.tripleP=.6116,this.isDragging=!1,this.particles=[];for(let e=0;e<28;e++)this.particles.push({x:Math.random()*40,y:Math.random()*40,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2,baseX:e%6*7+4,baseY:Math.floor(e/6)*8+4});this.animTime=0,this.initCanvasSize(),this.bindEvents()}}initCanvasSize(){let t=Math.min(window.devicePixelRatio||1,2),e=this.canvas.getBoundingClientRect(),i=e.width||560,s=e.height||250;this.canvas.width=Math.round(i*t),this.canvas.height=Math.round(s*t),this.ctx.setTransform(t,0,0,t,0,0),this.width=i,this.height=s,this.padLeft=65,this.padRight=25,this.padTop=25,this.padBottom=42,this.plotW=this.width-this.padLeft-this.padRight,this.plotH=this.height-this.padTop-this.padBottom}tToX(t){return this.padLeft+(t-this.minT)/(this.maxT-this.minT)*this.plotW}pToY(t){let i=(Math.log10(Math.max(.01,t))-this.minLogP)/(this.maxLogP-this.minLogP);return this.padTop+(1-i)*this.plotH}xToT(t){let e=(t-this.padLeft)/this.plotW;return this.minT+Math.max(0,Math.min(1,e))*(this.maxT-this.minT)}yToP(t){let e=1-(t-this.padTop)/this.plotH,i=Math.max(0,Math.min(1,e)),s=this.minLogP+i*(this.maxLogP-this.minLogP);return Math.pow(10,s)}getSublimationP(t){if(t>this.tripleT)return this.tripleP;let e=t+273.15;return this.tripleP*Math.exp(6108.6*(1/273.16-1/e))}getBoilingP(t){return t<this.tripleT?this.tripleP:.61078*Math.exp(17.27*t/(t+237.3))}getBoilingT(t){if(t<=this.tripleP)return this.tripleT;let e=Math.log(t/.61078);return 237.3*e/(17.27-e)}evaluateState(){let t=this.temp,e=this.pressure,i=this.isBrine?-68:0;if(e<(this.isBrine?.15:this.tripleP)){let s=this.getSublimationP(t);return e>=s?{phase:"ice",name:"\u2744\uFE0F \u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C (Solid Ice Ih)",status:"\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E09\u0E31\u0E1A\u0E1E\u0E25\u0E31\u0E19\u0E2B\u0E32\u0E01\u0E2D\u0E38\u0E13\u0E2B\u0E20\u0E39\u0E21\u0E34\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 (Sublimation Risk)",color:"#38bdf8"}:{phase:"gas",name:"\u{1F4A8} \u0E44\u0E2D\u0E19\u0E49\u0E33 / \u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E09\u0E31\u0E1A\u0E1E\u0E25\u0E31\u0E19 (Sublimed Vapor)",status:"\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E01\u0E25\u0E32\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E2D\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E39\u0E48\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E17\u0E31\u0E19\u0E17\u0E35",color:"#f97316"}}else{if(t<i)return{phase:"ice",name:this.isBrine?"\u2744\uFE0F \u0E19\u0E49\u0E33\u0E40\u0E01\u0E25\u0E37\u0E2D\u0E40\u0E22\u0E37\u0E2D\u0E01\u0E41\u0E02\u0E47\u0E07 (Frozen Eutectic Salt)":"\u2744\uFE0F \u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E1A\u0E23\u0E34\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E4C (Solid Ice Ih)",status:"\u0E1C\u0E25\u0E36\u0E01\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E04\u0E07\u0E15\u0E31\u0E27 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E2B\u0E25\u0E2D\u0E21\u0E40\u0E2B\u0E25\u0E27",color:"#38bdf8"};{let s=this.getBoilingT(e);return t<=s?{phase:"liquid",name:this.isBrine?"\u{1F4A7} \u0E19\u0E49\u0E33\u0E40\u0E01\u0E25\u0E37\u0E2D\u0E40\u0E1E\u0E2D\u0E23\u0E4C\u0E04\u0E25\u0E2D\u0E40\u0E23\u0E15\u0E04\u0E07\u0E15\u0E31\u0E27 (Stable Brine)":"\u{1F4A7} \u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E04\u0E07\u0E15\u0E31\u0E27 (Stable Liquid Water)",status:this.isBrine?"\u0E40\u0E01\u0E25\u0E37\u0E2D\u0E25\u0E14\u0E08\u0E38\u0E14\u0E40\u0E22\u0E37\u0E2D\u0E01\u0E41\u0E02\u0E47\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D -68\xB0C \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E04\u0E07\u0E23\u0E39\u0E1B\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E44\u0E14\u0E49\u0E41\u0E21\u0E49\u0E43\u0E19\u0E2D\u0E32\u0E01\u0E32\u0E28\u0E2B\u0E19\u0E32\u0E27\u0E08\u0E31\u0E14\u0E02\u0E2D\u0E07\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23!":"\u0E2A\u0E20\u0E32\u0E27\u0E30\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E44\u0E2B\u0E25\u0E41\u0E25\u0E30\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E40\u0E04\u0E21\u0E35\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C \u0E40\u0E01\u0E34\u0E14\u0E41\u0E23\u0E48\u0E14\u0E34\u0E19\u0E40\u0E2B\u0E19\u0E35\u0E22\u0E27 (Phyllosilicates)",color:"#10b981"}:{phase:"gas",name:"\u{1F4A8} \u0E44\u0E2D\u0E19\u0E49\u0E33\u0E40\u0E14\u0E37\u0E2D\u0E14\u0E1E\u0E25\u0E48\u0E32\u0E19 (Boiling Vapor)",status:`\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E15\u0E48\u0E33\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E19\u0E49\u0E33\u0E40\u0E14\u0E37\u0E2D\u0E14\u0E17\u0E35\u0E48\u0E2D\u0E38\u0E13\u0E2B\u0E20\u0E39\u0E21\u0E34\u0E40\u0E1E\u0E35\u0E22\u0E07 ${s.toFixed(1)}\xB0C`,color:"#f43f5e"}}}}setState(t,e,i=null){this.temp=Math.max(this.minT,Math.min(this.maxT,t)),this.pressure=Math.max(.02,Math.min(200,e)),i!==null&&(this.isBrine=i),this.syncUI(),this.render()}syncUI(){let t=document.getElementById("atmo-slider-temp"),e=document.getElementById("atmo-slider-press"),i=document.getElementById("atmo-val-temp"),s=document.getElementById("atmo-val-press"),r=document.getElementById("atmo-phase-state"),a=document.getElementById("atmo-phase-desc"),o=document.getElementById("atmo-toggle-brine");if(t&&(t.value=this.temp),e){let c=Math.log10(this.pressure);e.value=(c-this.minLogP)/(this.maxLogP-this.minLogP)*100}i&&(i.textContent=`${this.temp.toFixed(1)}\xB0C`),s&&(s.textContent=`${this.pressure.toFixed(2)} kPa (${(this.pressure*10).toFixed(1)} mbar)`);let l=this.evaluateState();r&&(r.textContent=l.name,r.style.color=l.color,r.style.borderColor=l.color),a&&(a.innerHTML=`<strong>\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22\u0E17\u0E32\u0E07\u0E2D\u0E38\u0E13\u0E2B\u0E1E\u0E25\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C:</strong> ${l.status}`),o&&(o.checked=this.isBrine)}bindEvents(){window.addEventListener("resize",()=>{this.initCanvasSize(),this.render()});let t=c=>{let u=this.canvas.getBoundingClientRect(),f=c.touches?c.touches[0].clientX:c.clientX,h=c.touches?c.touches[0].clientY:c.clientY,d=f-u.left,g=h-u.top;d>=this.padLeft&&d<=this.width-this.padRight&&g>=this.padTop&&g<=this.height-this.padBottom&&(this.temp=Math.round(this.xToT(d)*10)/10,this.pressure=Math.round(this.yToP(g)*100)/100,this.syncUI(),this.render())};this.canvas.addEventListener("mousedown",c=>{this.isDragging=!0,t(c)}),window.addEventListener("mousemove",c=>{this.isDragging&&t(c)}),window.addEventListener("mouseup",()=>{this.isDragging=!1}),this.canvas.addEventListener("touchstart",c=>{this.isDragging=!0,t(c)},{passive:!0}),window.addEventListener("touchmove",c=>{this.isDragging&&t(c)},{passive:!0}),window.addEventListener("touchend",()=>{this.isDragging=!1});let e=document.getElementById("atmo-slider-temp");e&&e.addEventListener("input",c=>{this.temp=parseFloat(c.target.value),this.syncUI(),this.render()});let i=document.getElementById("atmo-slider-press");i&&i.addEventListener("input",c=>{let u=parseFloat(c.target.value)/100,f=this.minLogP+u*(this.maxLogP-this.minLogP);this.pressure=Math.pow(10,f),this.syncUI(),this.render()});let s=document.getElementById("btn-preset-current");s&&s.addEventListener("click",()=>this.setState(-55,.63,!1));let r=document.getElementById("btn-preset-triple");r&&r.addEventListener("click",()=>this.setState(.01,.6116,!1));let a=document.getElementById("btn-preset-noachian");a&&a.addEventListener("click",()=>this.setState(15,120,!1));let o=document.getElementById("btn-preset-brine");o&&o.addEventListener("click",()=>this.setState(-35,.85,!0));let l=document.getElementById("atmo-toggle-brine");l&&l.addEventListener("change",c=>{this.isBrine=c.target.checked,this.syncUI(),this.render()})}render(){if(!this.ctx)return;let t=this.ctx,e=this.width,i=this.height;t.clearRect(0,0,e,i),t.fillStyle="#0b1120",t.fillRect(0,0,e,i),t.fillStyle="#0f172a",t.fillRect(this.padLeft,this.padTop,this.plotW,this.plotH);let s=this.isBrine?-68:.01,r=this.tToX(s),a=this.padTop,o=this.tToX(this.tripleT),l=this.pToY(this.tripleP);t.save(),t.beginPath(),t.moveTo(r,a),t.lineTo(this.tToX(this.maxT),a);for(let M=this.maxT;M>=this.tripleT;M-=2){let E=this.getBoilingP(M);E<=200&&t.lineTo(this.tToX(M),this.pToY(E))}t.lineTo(o,l),this.isBrine&&t.lineTo(this.tToX(-68),this.pToY(.15)),t.lineTo(r,a),t.closePath(),t.fillStyle=this.isBrine?"rgba(16, 185, 129, 0.28)":"rgba(16, 185, 129, 0.18)",t.fill(),t.beginPath(),t.moveTo(this.padLeft,a),t.lineTo(r,a),t.lineTo(o,l);for(let M=this.tripleT;M>=this.minT;M-=2){let E=this.getSublimationP(M);t.lineTo(this.tToX(M),this.pToY(E))}t.lineTo(this.padLeft,this.padTop+this.plotH),t.closePath(),t.fillStyle="rgba(56, 189, 248, 0.14)",t.fill(),t.beginPath(),t.moveTo(this.tToX(this.maxT),this.padTop+this.plotH),t.lineTo(this.padLeft,this.padTop+this.plotH);for(let M=this.minT;M<=this.tripleT;M+=2){let E=this.getSublimationP(M);t.lineTo(this.tToX(M),this.pToY(E))}for(let M=this.tripleT;M<=this.maxT;M+=2){let E=this.getBoilingP(M);E<=200&&t.lineTo(this.tToX(M),this.pToY(E))}t.lineTo(this.tToX(this.maxT),this.padTop+this.plotH),t.closePath(),t.fillStyle="rgba(249, 115, 22, 0.12)",t.fill(),t.restore(),t.strokeStyle="rgba(255, 255, 255, 0.08)",t.lineWidth=1;let c=[{val:.1,label:"0.1"},{val:.63,label:"0.63 (Chryse)"},{val:1,label:"1.0"},{val:10,label:"10"},{val:101.3,label:"101.3 (\u0E42\u0E25\u0E01 1 atm)"}];t.fillStyle="#94a3b8",t.font="10px monospace",t.textAlign="right",t.textBaseline="middle",c.forEach(M=>{let E=this.pToY(M.val);E>=this.padTop&&E<=this.padTop+this.plotH&&(t.beginPath(),t.moveTo(this.padLeft,E),t.lineTo(this.padLeft+this.plotW,E),t.stroke(),t.fillStyle=M.val===.63?"#f97316":M.val===101.3?"#4ade80":"#64748b",t.fillText(M.label,this.padLeft-6,E))});let u=[{val:-80,label:"-80\xB0"},{val:-55,label:"-55\xB0 (Chryse)"},{val:0,label:"0\xB0"},{val:20,label:"20\xB0"},{val:60,label:"60\xB0"}];t.textAlign="center",t.textBaseline="top",u.forEach(M=>{let E=this.tToX(M.val);E>=this.padLeft&&E<=this.padLeft+this.plotW&&(t.beginPath(),t.moveTo(E,this.padTop),t.lineTo(E,this.padTop+this.plotH),t.stroke(),t.fillStyle=M.val===-55?"#f97316":M.val===0?"#fde047":"#64748b",t.fillText(M.label,E,this.padTop+this.plotH+6))}),t.lineWidth=2,t.strokeStyle="#38bdf8",t.beginPath();for(let M=this.minT;M<=this.tripleT;M+=1){let E=this.getSublimationP(M),v=this.tToX(M),w=this.pToY(E);M===this.minT?t.moveTo(v,w):t.lineTo(v,w)}t.stroke(),t.strokeStyle="#10b981",t.beginPath(),t.moveTo(o,l);for(let M=this.tripleT;M<=this.maxT;M+=1){let E=this.getBoilingP(M);E<=200&&t.lineTo(this.tToX(M),this.pToY(E))}t.stroke(),t.strokeStyle="#60a5fa",t.beginPath(),t.moveTo(o,l),t.lineTo(r,a),t.stroke(),this.isBrine&&(t.save(),t.setLineDash([4,4]),t.strokeStyle="#a855f7",t.lineWidth=1.5,t.beginPath(),t.moveTo(this.tToX(-68),a),t.lineTo(this.tToX(-68),this.pToY(.15)),t.lineTo(o,l),t.stroke(),t.restore()),t.font="bold 12px sans-serif",t.fillStyle="rgba(56, 189, 248, 0.45)",t.fillText("\u0E02\u0E2D\u0E07\u0E41\u0E02\u0E47\u0E07 (ICE Ih)",this.tToX(-60),this.pToY(20)),t.fillStyle="rgba(16, 185, 129, 0.55)",t.fillText("\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27 (LIQUID)",this.tToX(22),this.pToY(25)),t.fillStyle="rgba(249, 115, 22, 0.45)",t.fillText("\u0E44\u0E2D\u0E19\u0E49\u0E33 / \u0E01\u0E4A\u0E32\u0E0B (VAPOR)",this.tToX(30),this.pToY(.12)),t.fillStyle="#fde047",t.beginPath(),t.arc(o,l,5,0,Math.PI*2),t.fill(),t.fillStyle="#fef08a",t.font="bold 10px monospace",t.textAlign="left",t.fillText("\u2605 \u0E08\u0E38\u0E14\u0E23\u0E48\u0E27\u0E21\u0E2A\u0E32\u0E21 (0.01\xB0C, 0.61 kPa)",o+7,l-6);let f=this.tToX(20),h=this.pToY(101.3);t.fillStyle="#4ade80",t.beginPath(),t.arc(f,h,4,0,Math.PI*2),t.fill(),t.fillText("\u{1F30D} \u0E42\u0E25\u0E01 (20\xB0C, 1 atm)",f+6,h+2);let d=this.tToX(-55),g=this.pToY(.63);t.fillStyle="#f97316",t.beginPath(),t.arc(d,g,4,0,Math.PI*2),t.fill(),t.fillText("\u{1FA90} Chryse (-55\xB0C, 0.63 kPa)",d+6,g+2);let y=this.tToX(this.temp),p=this.pToY(this.pressure);t.save(),t.setLineDash([2,3]),t.strokeStyle="rgba(255, 255, 255, 0.5)",t.lineWidth=1,t.beginPath(),t.moveTo(y,this.padTop),t.lineTo(y,this.padTop+this.plotH),t.moveTo(this.padLeft,p),t.lineTo(this.padLeft+this.plotW,p),t.stroke(),t.restore();let m=this.evaluateState();t.strokeStyle=m.color,t.lineWidth=2.5,t.beginPath(),t.arc(y,p,8,0,Math.PI*2),t.stroke(),t.fillStyle="#ffffff",t.beginPath(),t.arc(y,p,3,0,Math.PI*2),t.fill(),t.fillStyle="#cbd5e1",t.font="bold 11px sans-serif",t.textAlign="center",t.fillText("\u0E2D\u0E38\u0E13\u0E2B\u0E20\u0E39\u0E21\u0E34 Temperature (\xB0C)",this.padLeft+this.plotW/2,i-8),t.save(),t.translate(14,this.padTop+this.plotH/2),t.rotate(-Math.PI/2),t.fillText("\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19 Pressure (kPa, log)",0,0),t.restore()}};var wo=class{constructor(t){this.scene=t,this.visible=!0,this.maxVertices=8,this.geom=new ne,this.posArray=new Float32Array(this.maxVertices*3*3),this.posAttr=new ve(this.posArray,3),this.geom.setAttribute("position",this.posAttr),this.meshMat=new ke({color:3718648,transparent:!0,opacity:.22,depthWrite:!1,side:He}),this.mesh=new nt(this.geom,this.meshMat),this.mesh.renderOrder=2,this.scene.add(this.mesh),this.lineGeom=new ne,this.linePosArray=new Float32Array((this.maxVertices+1)*3),this.linePosAttr=new ve(this.linePosArray,3),this.lineGeom.setAttribute("position",this.linePosAttr),this.lineMat=new ji({color:3718648,transparent:!0,opacity:.85,linewidth:2}),this.line=new vn(this.lineGeom,this.lineMat),this.line.renderOrder=3,this.scene.add(this.line);let e=new Ot(.12,.12,.04,16);this.comMat=new ke({color:16638023,transparent:!0,opacity:.9}),this.comMesh=new nt(e,this.comMat),this.comMesh.renderOrder=4,this.scene.add(this.comMesh);let i=new ne;i.setAttribute("position",new Vt([0,0,0,0,1.2,0],3)),this.plumbLine=new vn(i,new ji({color:16638023,transparent:!0,opacity:.6})),this.scene.add(this.plumbLine),this.stats={area:0,stabilityMargin:0,contactCount:0}}setVisible(t){this.visible=t,this.mesh.visible=t,this.line.visible=t,this.comMesh.visible=t,this.plumbLine.visible=t}toggleVisible(){return this.setVisible(!this.visible),this.visible}distPointToSegment(t,e,i,s,r,a){let o=r-i,l=a-s,c=o*o+l*l;if(c<1e-4)return Math.hypot(t-i,e-s);let u=((t-i)*o+(e-s)*l)/c;u=Math.max(0,Math.min(1,u));let f=i+u*o,h=s+u*l;return Math.hypot(t-f,e-h)}update(t,e,i="tripod",s=0){if(!this.visible||!t||t.length<3)return this.mesh.visible=!1,this.line.visible=!1,this.comMesh.visible=!1,this.plumbLine.visible=!1,this.stats;this.mesh.visible=!0,this.line.visible=!0,this.comMesh.visible=!0,this.plumbLine.visible=!0;let r=0,a=0;t.forEach(p=>{r+=p.x,a+=p.z}),r/=t.length,a/=t.length;let o=[...t].sort((p,m)=>{let M=Math.atan2(p.z-a,p.x-r),E=Math.atan2(m.z-a,m.x-r);return M-E}),l=o.length,c=999,u=0;for(let p=0;p<l;p++){let m=o[p],M=o[(p+1)%l],E=this.distPointToSegment(e.x,e.z,m.x,m.z,M.x,M.z);E<c&&(c=E),u+=m.x*M.z-M.x*m.z}u=Math.abs(u)*.5;let f=3718648,h=8246268;i==="wave"&&(f=16096779,h=16638023),(c<.28||s>22)&&(f=16007006,h=16281969),this.meshMat.color.setHex(f),this.lineMat.color.setHex(h);let d=.035,g=0;for(let p=0;p<l;p++){let m=o[p],M=o[(p+1)%l];this.posArray[g++]=r,this.posArray[g++]=e.y+d,this.posArray[g++]=a,this.posArray[g++]=m.x,this.posArray[g++]=m.y+d,this.posArray[g++]=m.z,this.posArray[g++]=M.x,this.posArray[g++]=M.y+d,this.posArray[g++]=M.z}this.geom.setDrawRange(0,l*3),this.posAttr.needsUpdate=!0;let y=0;for(let p=0;p<=l;p++){let m=o[p%l];this.linePosArray[y++]=m.x,this.linePosArray[y++]=m.y+d+.005,this.linePosArray[y++]=m.z}return this.lineGeom.setDrawRange(0,l+1),this.linePosAttr.needsUpdate=!0,this.comMesh.position.set(e.x,e.y+d+.01,e.z),this.plumbLine.position.set(e.x,e.y+d,e.z),this.stats={area:u,stabilityMargin:c,contactCount:l},this.stats}};var oc=class{constructor(){this.container=document.getElementById("canvas-container"),this.canvas=document.getElementById("webgl-canvas"),this.clock=new Xs,this.audio=new So,this.keys={},this.joystickVector=new gt(0,0),this.joystickActive=!1,this.dpadState={up:!1,down:!1,left:!1,right:!1},this.steerMode="camera",this.touchControlsVisible=!0,this.batterySaver=!1,this.inputVector=new R,this.moveSpeed=6.2,this.turnSpeed=1.8,this.currentSpeed=0,this.currentTurnRate=0,this.battery=100,this.solarCharging=0,this.collectedSamples=new Set,this.totalSamples=4,this.missionComplete=!1,this.missionStartTime=Date.now(),this.stabilityWarnings=0,this.lastCollisionAlertTime=0,this.collisionAlertTimer=null,this.lastSlipWarningTime=0,this.levelerTrial=null,this.dust=null,this.phaseDiagram=null,this.supportPolygon=null,this.trialHistory=[],this.solarCosTheta=.88,this.investigation={evidenceScore:0,maxScore:12,sampleResults:{},activeSample:null,correctCount:0,spectrometerOpen:!1},this.cameraModes=["orbit-follow","top-down","mast-cam","inspect"],this.cameraModeIndex=0,this.cameraMode=this.cameraModes[this.cameraModeIndex],this.camAzimuth=0,this.targetCamAzimuth=0,this.camElevation=.38,this.targetCamElevation=.38,this.camDistance=8.5,this.targetCamDistance=8.5,this.isPointerDown=!1,this.lastPointerX=0,this.lastPointerY=0,this.touchPinchStartDist=0,this.touchPinchStartCamDist=8.5,this.initScene(),this.initEntities(),this.initControls(),this.initUI(),this.bindEvents(),this.animate=this.animate.bind(this),requestAnimationFrame(this.animate)}getAdaptivePixelRatio(){return/Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent)||navigator.maxTouchPoints>0&&(window.innerWidth<=1024||window.innerHeight<=768)?Math.min(window.devicePixelRatio||1,1.6):Math.min(window.devicePixelRatio||1,2)}initScene(){let t=window.innerWidth,e=window.innerHeight;this.scene=new As,this.scene.background=new Pt(1247752),this.scene.fog=new ws(12604458,.009),this.camera=new Re(55,t/e,.1,1e3),this.camera.position.set(0,8,-12),this.renderer=new fo({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(t,e),this.renderer.setPixelRatio(this.getAdaptivePixelRatio()),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ma,this.renderer.toneMapping=Zs,this.renderer.toneMappingExposure=1.15;let i=cu(this.renderer);i&&(this.scene.environment=i),this.orbitControls=new xo(this.camera,this.renderer.domElement),this.orbitControls.enableDamping=!0,this.orbitControls.dampingFactor=.05,this.orbitControls.maxPolarAngle=Math.PI/2-.05,this.orbitControls.minDistance=2.5,this.orbitControls.maxDistance=60,this.orbitControls.enabled=!1;let s=new Ws(16772829,2.3);s.position.set(80,110,-60),s.castShadow=!0,s.shadow.mapSize.width=2048,s.shadow.mapSize.height=2048,s.shadow.camera.near=10,s.shadow.camera.far=300,s.shadow.camera.left=-40,s.shadow.camera.right=40,s.shadow.camera.top=40,s.shadow.camera.bottom=-40,s.shadow.bias=-5e-4,this.scene.add(s),this.sunLight=s;let r=new ks(16750950,4465169,.9);this.scene.add(r);let a=new ne,o=600,l=[];for(let u=0;u<o;u++){let f=Math.random(),h=Math.random(),d=f*2*Math.PI,g=Math.acos(2*h-1),y=400;l.push(y*Math.sin(g)*Math.cos(d),Math.abs(y*Math.cos(g))+20,y*Math.sin(g)*Math.sin(d))}a.setAttribute("position",new Vt(l,3));let c=new Qi({color:16777215,size:1.2,transparent:!0,opacity:.8});this.stars=new Mn(a,c),this.scene.add(this.stars)}initEntities(){this.terrain=new yo(this.scene),this.hexapod=new Mo(this.scene);let t=0,e=0,i=this.terrain.getHeight(t,e);this.hexapod.position.set(t,i,e),this.hexapod.rotation.y=0,this.camera.position.set(t,i+3.2,e-7.5),this.camera.lookAt(t,i+.9,e),this.orbitControls.target.set(t,i+.9,e),this.dust=new Eo(this.scene),this.gait=new bo(this.hexapod,this.terrain,this.audio,this.dust),this.leveler=new _o(this.hexapod),this.supportPolygon=new wo(this.scene)}initControls(){window.addEventListener("keydown",a=>{this.keys[a.code]=!0,this.audio.init(),a.code==="KeyR"&&this.toggleSteerMode(),a.code==="KeyL"&&this.toggleLeveler(),a.code==="KeyG"&&this.toggleGait(),a.code==="KeyP"&&this.toggleSupportPolygon(),a.code==="KeyE"&&this.toggleExperimentsModal(),a.code==="KeyC"&&this.toggleCameraMode(),a.code==="KeyF"&&this.toggleFullscreen(),a.code==="KeyM"&&this.toggleMute(),a.code==="KeyH"&&this.toggleInspector(),(a.code==="ArrowUp"||a.code==="KeyW")&&document.getElementById("btn-dpad-up")?.classList.add("active"),(a.code==="ArrowDown"||a.code==="KeyS")&&document.getElementById("btn-dpad-down")?.classList.add("active"),(a.code==="ArrowLeft"||a.code==="KeyA")&&document.getElementById("btn-dpad-left")?.classList.add("active"),(a.code==="ArrowRight"||a.code==="KeyD")&&document.getElementById("btn-dpad-right")?.classList.add("active")}),window.addEventListener("keyup",a=>{this.keys[a.code]=!1,(a.code==="ArrowUp"||a.code==="KeyW")&&document.getElementById("btn-dpad-up")?.classList.remove("active"),(a.code==="ArrowDown"||a.code==="KeyS")&&document.getElementById("btn-dpad-down")?.classList.remove("active"),(a.code==="ArrowLeft"||a.code==="KeyA")&&document.getElementById("btn-dpad-left")?.classList.remove("active"),(a.code==="ArrowRight"||a.code==="KeyD")&&document.getElementById("btn-dpad-right")?.classList.remove("active")});let t=document.getElementById("joystick-zone"),e=document.getElementById("joystick-knob");if(t&&e){let a=null,o=0,l=0,c=45,u=(g,y,p)=>{a=p,this.joystickActive=!0,this.audio.init();let m=t.getBoundingClientRect();o=m.left+m.width/2,l=m.top+m.height/2,f(g,y)},f=(g,y)=>{let p=g-o,m=y-l,M=Math.hypot(p,m);M>c&&(p=p/M*c,m=m/M*c),e.style.transform=`translate(${p}px, ${m}px)`,this.joystickVector.set(p/c,-m/c)},h=()=>{a=null,this.joystickActive=!1,e.style.transform="translate(0px, 0px)",this.joystickVector.set(0,0)};t.addEventListener("pointerdown",g=>{if(!(g.target&&g.target.classList&&g.target.classList.contains("dpad-arrow"))&&(g.preventDefault(),u(g.clientX,g.clientY,g.pointerId),t.setPointerCapture))try{t.setPointerCapture(g.pointerId)}catch{}}),window.addEventListener("pointermove",g=>{!this.joystickActive||g.pointerId!==a||f(g.clientX,g.clientY)});let d=g=>{if(g.pointerId===a&&(h(),t.releasePointerCapture))try{t.releasePointerCapture(g.pointerId)}catch{}};window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d),t.addEventListener("touchstart",g=>{if(g.target&&g.target.classList&&g.target.classList.contains("dpad-arrow"))return;g.preventDefault();let y=g.changedTouches[0];u(y.clientX,y.clientY,y.identifier)},{passive:!1}),window.addEventListener("touchmove",g=>{if(this.joystickActive)for(let y=0;y<g.changedTouches.length;y++){let p=g.changedTouches[y];if(p.identifier===a){f(p.clientX,p.clientY);break}}},{passive:!1}),window.addEventListener("touchend",g=>{if(this.joystickActive){for(let y=0;y<g.changedTouches.length;y++)if(g.changedTouches[y].identifier===a){h();break}}})}[{id:"btn-dpad-up",dir:"up"},{id:"btn-dpad-down",dir:"down"},{id:"btn-dpad-left",dir:"left"},{id:"btn-dpad-right",dir:"right"}].forEach(({id:a,dir:o})=>{let l=document.getElementById(a);if(!l)return;let c=f=>{f.preventDefault(),f.stopPropagation(),this.dpadState[o]=!0,l.classList.add("active"),this.audio.init()},u=f=>{f.preventDefault(),f.stopPropagation(),this.dpadState[o]=!1,l.classList.remove("active")};l.addEventListener("pointerdown",c),l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u),l.addEventListener("mouseleave",u),l.addEventListener("touchstart",c,{passive:!1}),l.addEventListener("touchend",u,{passive:!1}),l.addEventListener("touchcancel",u,{passive:!1})});let s=this.canvas||this.renderer.domElement;s.addEventListener("pointerdown",a=>{if(!(a.button!==0&&a.pointerType==="mouse")&&(this.isPointerDown=!0,this.lastPointerX=a.clientX,this.lastPointerY=a.clientY,this.audio.init(),s.setPointerCapture))try{s.setPointerCapture(a.pointerId)}catch{}}),window.addEventListener("pointermove",a=>{if(!this.isPointerDown)return;let o=a.clientX-this.lastPointerX,l=a.clientY-this.lastPointerY;this.lastPointerX=a.clientX,this.lastPointerY=a.clientY,this.targetCamAzimuth-=o*.0055,this.targetCamElevation+=l*.0045,this.targetCamElevation=Math.max(.06,Math.min(Math.PI/2-.04,this.targetCamElevation))});let r=a=>{if(this.isPointerDown=!1,s.releasePointerCapture&&a.pointerId!==void 0)try{s.releasePointerCapture(a.pointerId)}catch{}};window.addEventListener("pointerup",r),window.addEventListener("pointercancel",r),s.addEventListener("wheel",a=>{a.preventDefault();let o=a.deltaY>0?1.12:.89;this.targetCamDistance=Math.max(3,Math.min(38,this.targetCamDistance*o))},{passive:!1}),s.addEventListener("touchstart",a=>{if(a.touches.length===2){let o=a.touches[0].clientX-a.touches[1].clientX,l=a.touches[0].clientY-a.touches[1].clientY;this.touchPinchStartDist=Math.sqrt(o*o+l*l),this.touchPinchStartCamDist=this.targetCamDistance}},{passive:!0}),s.addEventListener("touchmove",a=>{if(a.touches.length===2&&this.touchPinchStartDist>0){let o=a.touches[0].clientX-a.touches[1].clientX,l=a.touches[0].clientY-a.touches[1].clientY,c=Math.sqrt(o*o+l*l),u=this.touchPinchStartDist/Math.max(c,1);this.targetCamDistance=Math.max(3,Math.min(38,this.touchPinchStartCamDist*u))}},{passive:!0})}initUI(){this.ui={pitchVal:document.getElementById("hud-pitch-val"),rollVal:document.getElementById("hud-roll-val"),horizonBar:document.getElementById("hud-horizon-bar"),stabilityVal:document.getElementById("hud-stability-val"),stabilityBar:document.getElementById("hud-stability-bar"),altitudeVal:document.getElementById("hud-altitude-val"),speedVal:document.getElementById("hud-speed-val"),batteryVal:document.getElementById("hud-battery-val"),batteryBar:document.getElementById("hud-battery-bar"),solarVal:document.getElementById("hud-solar-val"),solarCosVal:document.getElementById("hud-solar-cos"),solarAngleVal:document.getElementById("hud-solar-angle"),solarEffBar:document.getElementById("hud-solar-eff-bar"),solarStatus:document.getElementById("hud-solar-status"),sampleCounter:document.getElementById("hud-sample-count"),evidenceScoreVal:document.getElementById("hud-evidence-score"),evidenceBar:document.getElementById("hud-evidence-bar"),atmoBox:document.getElementById("hud-atmo-box"),btnExperimentsNav:document.getElementById("btn-experiments"),btnExperimentsDock:document.getElementById("btn-open-experiments"),steerBtn:document.getElementById("btn-toggle-steer"),steerBtnText:document.getElementById("hud-steer-btn-text"),levelerBtn:document.getElementById("btn-toggle-leveler"),levelerStatus:document.getElementById("hud-leveler-status"),gaitBtn:document.getElementById("btn-toggle-gait"),gaitStatus:document.getElementById("hud-gait-status"),cameraBtn:document.getElementById("btn-toggle-cam"),camBtnText:document.getElementById("hud-cam-btn-text"),zoomInBtn:document.getElementById("btn-zoom-in"),zoomOutBtn:document.getElementById("btn-zoom-out"),camResetBtn:document.getElementById("btn-cam-reset"),muteBtn:document.getElementById("btn-toggle-audio"),spectrometerModal:document.getElementById("spectrometer-modal"),specSiteBadge:document.getElementById("spec-site-badge"),specSampleName:document.getElementById("spec-sample-name"),specHydrationPill:document.getElementById("spec-hydration-pill"),specPeakLabel:document.getElementById("spec-peak-label"),specBar14:document.getElementById("spec-bar-14"),specVal14:document.getElementById("spec-val-14"),specBar19:document.getElementById("spec-bar-19"),specVal19:document.getElementById("spec-val-19"),specBarMetal:document.getElementById("spec-bar-metal"),specValMetal:document.getElementById("spec-val-metal"),specInstrumentReading:document.getElementById("spec-instrument-reading"),specInquiryPrompt:document.getElementById("spec-inquiry-prompt"),specChoicesContainer:document.getElementById("spec-choices-container"),specFeedback:document.getElementById("spec-feedback"),btnConfirmSample:document.getElementById("btn-confirm-sample"),levelerExpModal:document.getElementById("leveler-experiment-modal"),gaitExpModal:document.getElementById("gait-experiment-modal"),atmoModal:document.getElementById("atmo-modal"),cerReportModal:document.getElementById("cer-report-modal"),cerFinalScore:document.getElementById("cer-final-score"),cerAccuracyRate:document.getElementById("cer-accuracy-rate"),cerFinalTime:document.getElementById("cer-final-time"),cerRankTitle:document.getElementById("cer-rank-title"),legDots:[document.getElementById("leg-0"),document.getElementById("leg-1"),document.getElementById("leg-2"),document.getElementById("leg-3"),document.getElementById("leg-4"),document.getElementById("leg-5")],minimapCanvas:document.getElementById("minimap-canvas"),warningToast:document.getElementById("warning-toast"),mobileHudToggleBtn:document.getElementById("btn-mobile-hud-toggle"),ribbonHudToggleBtn:document.getElementById("btn-ribbon-hud-toggle"),closeMobileHudBtn:document.getElementById("btn-close-mobile-hud"),telemetryDrawer:document.getElementById("telemetry-drawer"),ribbonSpeed:document.getElementById("ribbon-speed-val"),ribbonBattery:document.getElementById("ribbon-battery-val"),ribbonSamples:document.getElementById("ribbon-sample-val"),ribbonTimer:document.getElementById("ribbon-timer-val"),navSpeed:document.getElementById("nav-speed-val"),navBattery:document.getElementById("nav-battery-val"),navSamples:document.getElementById("nav-sample-val"),navTimer:document.getElementById("nav-timer-val"),btnFullscreen:document.getElementById("btn-fullscreen"),fullscreenIcon:document.getElementById("fullscreen-icon"),fullscreenText:document.getElementById("fullscreen-text"),btnDockFullscreen:document.getElementById("btn-dock-fullscreen"),dockFullscreenIcon:document.getElementById("dock-fullscreen-icon"),btnRibbonFullscreen:document.getElementById("btn-ribbon-fullscreen"),ribbonFullscreenIcon:document.getElementById("ribbon-fullscreen-icon"),mobileMenuModal:document.getElementById("mobile-menu-modal"),btnMobileMenuNav:document.getElementById("btn-mobile-menu-toggle"),btnMobileMenuRibbon:document.getElementById("btn-ribbon-mobile-menu"),btnMobileModalFullscreen:document.getElementById("btn-mobile-modal-fullscreen"),mobileModalFsIcon:document.getElementById("mobile-modal-fs-icon"),mobileModalFsText:document.getElementById("mobile-modal-fs-text"),mobileModalFsStatus:document.getElementById("mobile-modal-fs-status"),mMenuSpeed:document.getElementById("m-menu-speed-val"),mMenuBattery:document.getElementById("m-menu-battery-val"),mMenuStability:document.getElementById("m-menu-stability-val"),mMenuSamples:document.getElementById("m-menu-samples-val"),mBtnSteer:document.getElementById("m-btn-steer"),mTileSteerVal:document.getElementById("m-tile-steer-val"),mBtnLeveler:document.getElementById("m-btn-leveler"),mTileLevelerVal:document.getElementById("m-tile-leveler-val"),mBtnGait:document.getElementById("m-btn-gait"),mTileGaitVal:document.getElementById("m-tile-gait-val"),mBtnCam:document.getElementById("m-btn-cam"),mTileCamVal:document.getElementById("m-tile-cam-val"),mBtnCamReset:document.getElementById("m-btn-cam-reset"),mBtnAudio:document.getElementById("m-btn-audio"),mTileAudioVal:document.getElementById("m-tile-audio-val"),btnToggleTouchControls:document.getElementById("btn-toggle-touch-controls"),lblTouchControlsState:document.getElementById("lbl-touch-controls-state"),btnToggleMobilePerf:document.getElementById("btn-toggle-mobile-perf"),lblMobilePerfState:document.getElementById("lbl-mobile-perf-state"),mBtnOpenExperiments:document.getElementById("m-btn-open-experiments"),mBtnOpenHud:document.getElementById("m-btn-open-hud"),mBtnOpenBriefing:document.getElementById("m-btn-open-briefing"),bottomDock:document.querySelector(".bottom-dock"),waypointLayer:document.getElementById("waypoint-markers-layer"),waypointHudBar:document.getElementById("waypoint-hud-bar")},this.minimapCtx=this.ui.minimapCanvas?this.ui.minimapCanvas.getContext("2d"):null,this.drawMinimap(),this.updateHUD()}bindEvents(){window.addEventListener("resize",()=>{let p=window.innerWidth,m=window.innerHeight;this.camera.aspect=p/m,this.camera.updateProjectionMatrix(),this.renderer.setSize(p,m),this.renderer.setPixelRatio(this.getAdaptivePixelRatio())});let t=p=>{p&&(p.preventDefault(),p.stopPropagation()),this.ui.telemetryDrawer&&(this.ui.telemetryDrawer.classList.toggle("mobile-open"),this.ui.telemetryDrawer.classList.contains("mobile-open")&&this.drawMinimap()),this.audio.init()},e=p=>{p&&(p.preventDefault(),p.stopPropagation()),this.ui.telemetryDrawer&&this.ui.telemetryDrawer.classList.remove("mobile-open")};this.ui.mobileHudToggleBtn&&this.ui.mobileHudToggleBtn.addEventListener("click",t),this.ui.ribbonHudToggleBtn&&this.ui.ribbonHudToggleBtn.addEventListener("click",t),this.ui.closeMobileHudBtn&&this.ui.closeMobileHudBtn.addEventListener("click",e),this.ui.telemetryDrawer&&this.ui.telemetryDrawer.addEventListener("click",p=>{p.target===this.ui.telemetryDrawer&&e(p)}),this.ui.steerBtn&&this.ui.steerBtn.addEventListener("click",()=>this.toggleSteerMode()),this.ui.levelerBtn&&this.ui.levelerBtn.addEventListener("click",()=>this.toggleLeveler()),this.ui.gaitBtn&&this.ui.gaitBtn.addEventListener("click",()=>this.toggleGait()),this.ui.cameraBtn&&this.ui.cameraBtn.addEventListener("click",()=>this.toggleCameraMode()),this.ui.zoomInBtn&&this.ui.zoomInBtn.addEventListener("click",()=>this.zoomIn()),this.ui.zoomOutBtn&&this.ui.zoomOutBtn.addEventListener("click",()=>this.zoomOut()),this.ui.camResetBtn&&this.ui.camResetBtn.addEventListener("click",()=>this.resetCamera()),this.ui.muteBtn&&this.ui.muteBtn.addEventListener("click",()=>this.toggleMute()),this.ui.btnFullscreen&&this.ui.btnFullscreen.addEventListener("click",()=>this.toggleFullscreen()),this.ui.btnDockFullscreen&&this.ui.btnDockFullscreen.addEventListener("click",()=>this.toggleFullscreen()),this.ui.btnRibbonFullscreen&&this.ui.btnRibbonFullscreen.addEventListener("click",()=>this.toggleFullscreen()),this.ui.btnMobileMenuNav&&this.ui.btnMobileMenuNav.addEventListener("click",()=>this.toggleMobileMenu()),this.ui.btnMobileMenuRibbon&&this.ui.btnMobileMenuRibbon.addEventListener("click",()=>this.toggleMobileMenu()),this.ui.btnMobileModalFullscreen&&this.ui.btnMobileModalFullscreen.addEventListener("click",()=>this.toggleFullscreen()),this.ui.mBtnSteer&&this.ui.mBtnSteer.addEventListener("click",()=>this.toggleSteerMode()),this.ui.mBtnLeveler&&this.ui.mBtnLeveler.addEventListener("click",()=>this.toggleLeveler()),this.ui.mBtnGait&&this.ui.mBtnGait.addEventListener("click",()=>this.toggleGait()),this.ui.mBtnCam&&this.ui.mBtnCam.addEventListener("click",()=>this.toggleCameraMode()),this.ui.mBtnCamReset&&this.ui.mBtnCamReset.addEventListener("click",()=>this.resetCamera()),this.ui.mBtnAudio&&this.ui.mBtnAudio.addEventListener("click",()=>this.toggleMute()),this.ui.btnToggleTouchControls&&this.ui.btnToggleTouchControls.addEventListener("click",()=>this.toggleTouchControls()),this.ui.btnToggleMobilePerf&&this.ui.btnToggleMobilePerf.addEventListener("click",()=>this.toggleMobilePerformance()),this.ui.mBtnOpenExperiments&&this.ui.mBtnOpenExperiments.addEventListener("click",()=>{this.closeMobileMenu(),this.toggleExperimentsModal()}),this.ui.mBtnOpenHud&&this.ui.mBtnOpenHud.addEventListener("click",()=>{this.closeMobileMenu(),this.ui.telemetryDrawer&&this.ui.telemetryDrawer.classList.toggle("mobile-open")}),this.ui.mBtnOpenBriefing&&this.ui.mBtnOpenBriefing.addEventListener("click",()=>{this.closeMobileMenu();let p=document.getElementById("briefing-modal");p&&p.classList.toggle("hidden")});let i=()=>{this.updateFullscreenUI()};document.addEventListener("fullscreenchange",i),document.addEventListener("webkitfullscreenchange",i),document.addEventListener("mozfullscreenchange",i),document.addEventListener("MSFullscreenChange",i),this.ui.btnExperimentsNav&&this.ui.btnExperimentsNav.addEventListener("click",()=>this.toggleExperimentsModal()),this.ui.btnExperimentsDock&&this.ui.btnExperimentsDock.addEventListener("click",()=>this.toggleExperimentsModal()),this.ui.atmoBox&&this.ui.atmoBox.addEventListener("click",()=>this.openAtmoModal()),this.ui.btnConfirmSample&&this.ui.btnConfirmSample.addEventListener("click",()=>this.confirmSampleCollection());let s=document.getElementById("btn-run-trial-a");s&&s.addEventListener("click",()=>this.runLevelerTrial("a"));let r=document.getElementById("btn-run-trial-b");r&&r.addEventListener("click",()=>this.runLevelerTrial("b"));let a=document.getElementById("btn-export-cer");a&&a.addEventListener("click",()=>this.exportCERReport());let o=document.getElementById("btn-export-trials-csv");o&&o.addEventListener("click",()=>this.exportTrialsCSV());let l=document.getElementById("btn-toggle-polygon");l&&l.addEventListener("click",()=>this.toggleSupportPolygon());let c=document.getElementById("btn-toggle-polygon-modal");c&&c.addEventListener("click",()=>this.toggleSupportPolygon());let u=document.getElementById("btn-select-tripod");u&&u.addEventListener("click",()=>this.selectGait("tripod"));let f=document.getElementById("btn-select-wave");f&&f.addEventListener("click",()=>this.selectGait("wave"));let h=document.getElementById("btn-inspector");h&&h.addEventListener("click",()=>this.toggleInspector());let d=document.getElementById("btn-briefing");d&&d.addEventListener("click",()=>{let p=document.getElementById("briefing-modal");p&&p.classList.toggle("hidden")}),document.querySelectorAll(".modal-close").forEach(p=>{p.addEventListener("click",m=>{let M=m.currentTarget.getAttribute("data-target"),E=document.getElementById(M);E&&E.classList.add("hidden"),M==="spectrometer-modal"&&(this.investigation.spectrometerOpen=!1)})}),document.querySelectorAll(".modal-overlay").forEach(p=>{p.addEventListener("click",m=>{m.target===p&&p.id!=="welcome-modal"&&(p.classList.add("hidden"),p.id==="spectrometer-modal"&&(this.investigation.spectrometerOpen=!1))})})}toggleSteerMode(){this.steerMode=this.steerMode==="camera"?"rover":"camera";let e=this.steerMode==="camera"?"STEER: \u0E21\u0E38\u0E21\u0E01\u0E25\u0E49\u0E2D\u0E07 (R)":"STEER: \u0E2B\u0E31\u0E27\u0E2B\u0E38\u0E48\u0E19 (R)";this.ui.steerBtnText?this.ui.steerBtnText.textContent=e:this.ui.steerBtn&&(this.ui.steerBtn.innerHTML=`<span>\u{1F579}\uFE0F</span> <span>${e}</span>`),this.updateMobileMenuUI(),this.audio.playScan()}toggleLeveler(){this.leveler.enabled=!this.leveler.enabled;let t=this.leveler.enabled;this.ui.levelerStatus&&(this.ui.levelerStatus.textContent=t?"ON (ACTIVE)":"OFF (DISABLED)",this.ui.levelerStatus.className=t?"text-emerald-400 font-bold":"text-rose-400 font-bold"),this.ui.levelerBtn&&(this.ui.levelerBtn.classList.toggle("border-emerald-500",t),this.ui.levelerBtn.classList.toggle("border-rose-500",!t)),this.updateMobileMenuUI(),this.audio.playScan()}toggleGait(){let t=this.gait.mode==="tripod"?"wave":"tripod";this.gait.setMode(t);let e=t==="tripod";this.ui.gaitStatus&&(this.ui.gaitStatus.textContent=e?"TRIPOD (FAST)":"WAVE (STABLE)",this.ui.gaitStatus.className=e?"text-cyan-400 font-bold":"text-amber-400 font-bold"),e||this.showWaveEngagedToast(),this.updateMobileMenuUI(),this.audio.playGaitShift()}toggleSupportPolygon(){if(this.supportPolygon){let t=this.supportPolygon.toggleVisible();this.audio.playScan();let e=document.getElementById("btn-toggle-polygon");e&&(e.classList.toggle("border-cyan-400",t),e.classList.toggle("text-cyan-400",t));let i=document.getElementById("btn-toggle-polygon-modal");i&&(i.textContent=t?"\u0E0B\u0E48\u0E2D\u0E19\u0E1C\u0E31\u0E07\u0E10\u0E32\u0E19\u0E04\u0E49\u0E33\u0E22\u0E31\u0E19 (Polygon)":"\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E31\u0E07\u0E10\u0E32\u0E19\u0E04\u0E49\u0E33\u0E22\u0E31\u0E19 (Polygon)")}}exportTrialsCSV(){this.audio.playScan();let t=`Trial,MeanSlopeDeg,MeanTiltDeg,RMSJitterDeg,StabilityIndexPct,SampleCount,Timestamp
`;if(this.trialHistory.length===0){let r=this.terrain.getNormal(this.hexapod.position.x,this.hexapod.position.z),a=Math.acos(Math.max(0,Math.min(1,r.y)))*(180/Math.PI),o=(this.leveler.tiltAngleDeg||0).toFixed(2),l=this.leveler.stabilityIndex||100;t+=`CURRENT,${a.toFixed(2)},${o},0.00,${l},1,${new Date().toISOString()}
`}else this.trialHistory.forEach(r=>{t+=`${r.trial},${r.meanSlope},${r.meanTilt},${r.rmsJitter},${r.meanStab},${r.sampleCount},${r.timestamp}
`});let e=new Blob([t],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(e),s=document.createElement("a");s.href=i,s.download=`ARES6_Leveler_Trials_ChrysePlanitia_${Date.now()}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)}zoomIn(){this.targetCamDistance=Math.max(3,this.targetCamDistance*.82),this.audio.playScan()}zoomOut(){this.targetCamDistance=Math.min(38,this.targetCamDistance*1.22),this.audio.playScan()}resetCamera(){this.targetCamAzimuth=0,this.targetCamElevation=.38,this.targetCamDistance=8.5,this.audio.playScan()}toggleCameraMode(){this.cameraModeIndex=(this.cameraModeIndex+1)%this.cameraModes.length,this.cameraMode=this.cameraModes[this.cameraModeIndex];let t=this.cameraMode==="inspect";if(this.orbitControls.enabled=t,t){let s=this.hexapod.position.clone().add(new R(0,.95,0));this.orbitControls.target.copy(s)}let i={"orbit-follow":"CAM: \u0E2D\u0E34\u0E2A\u0E23\u0E30 (C)","top-down":"CAM: \u0E21\u0E38\u0E21\u0E2A\u0E39\u0E07 (C)","mast-cam":"CAM: \u0E40\u0E2A\u0E32\u0E22\u0E32\u0E19 (C)",inspect:"CAM: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E20\u0E32\u0E1E (C)"}[this.cameraMode]||"CAM (C)";this.ui.camBtnText?this.ui.camBtnText.textContent=i:this.ui.cameraBtn&&(this.ui.cameraBtn.textContent=`\u{1F3A5} ${i}`),this.updateMobileMenuUI(),this.audio.playScan()}toggleMute(){let t=this.audio.toggleMute();this.ui.muteBtn&&(this.ui.muteBtn.textContent=t?"\u{1F507} AUDIO: OFF":"\u{1F50A} AUDIO: ON"),this.updateMobileMenuUI()}toggleInspector(){let t=document.getElementById("inspector-modal");t&&t.classList.toggle("hidden")}isFullscreen(){return!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)}toggleFullscreen(){this.audio.init();try{if(this.isFullscreen())document.exitFullscreen?document.exitFullscreen().catch(t=>{console.warn("exitFullscreen error:",t)}):document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();else{let t=document.documentElement;t.requestFullscreen?t.requestFullscreen().catch(e=>{console.warn("requestFullscreen error:",e)}):t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen()}}catch(t){console.warn("Fullscreen toggle failed:",t)}this.audio.playScan(),setTimeout(()=>this.updateFullscreenUI(),100)}updateFullscreenUI(){let t=this.isFullscreen();document.body.classList.toggle("is-fullscreen",t);let e=t?"\u{1F5D7}":"\u26F6",i=t?"\u0E22\u0E48\u0E2D\u0E08\u0E2D":"\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D",s=t?"\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D (F \u0E2B\u0E23\u0E37\u0E2D Esc)":"\u0E40\u0E1B\u0E34\u0E14\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D (F)";this.ui.fullscreenIcon&&(this.ui.fullscreenIcon.textContent=e),this.ui.fullscreenText&&(this.ui.fullscreenText.textContent=i),this.ui.btnFullscreen&&(this.ui.btnFullscreen.title=s,this.ui.btnFullscreen.classList.toggle("active",t)),this.ui.dockFullscreenIcon&&(this.ui.dockFullscreenIcon.textContent=e),this.ui.btnDockFullscreen&&(this.ui.btnDockFullscreen.title=s,this.ui.btnDockFullscreen.classList.toggle("active",t)),this.ui.ribbonFullscreenIcon&&(this.ui.ribbonFullscreenIcon.textContent=e),this.ui.btnRibbonFullscreen&&(this.ui.btnRibbonFullscreen.title=t?"\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D":"\u0E40\u0E1B\u0E34\u0E14\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D",this.ui.btnRibbonFullscreen.classList.toggle("active",t)),this.ui.mobileModalFsIcon&&(this.ui.mobileModalFsIcon.textContent=e),this.ui.mobileModalFsText&&(this.ui.mobileModalFsText.textContent=t?"\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D (Windowed)":"\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D (Fullscreen Mode)"),this.ui.mobileModalFsStatus&&(this.ui.mobileModalFsStatus.textContent=t?"\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D\u0E2D\u0E22\u0E39\u0E48 (Active)":"\u0E41\u0E15\u0E30\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E34\u0E14"),this.ui.btnMobileModalFullscreen&&this.ui.btnMobileModalFullscreen.classList.toggle("active",t)}openMobileMenu(){this.ui.mobileMenuModal&&(this.audio.init(),this.audio.playScan(),this.updateFullscreenUI(),this.updateMobileMenuUI(),this.ui.mobileMenuModal.classList.remove("hidden"))}closeMobileMenu(){this.ui.mobileMenuModal&&this.ui.mobileMenuModal.classList.add("hidden")}toggleMobileMenu(){this.ui.mobileMenuModal&&(this.ui.mobileMenuModal.classList.contains("hidden")?this.openMobileMenu():this.closeMobileMenu())}updateMobileMenuUI(){if(this.ui.mTileSteerVal&&(this.ui.mTileSteerVal.textContent=this.steerMode==="camera"?"\u0E21\u0E38\u0E21\u0E01\u0E25\u0E49\u0E2D\u0E07":"\u0E2B\u0E31\u0E27\u0E2B\u0E38\u0E48\u0E19"),this.ui.mTileLevelerVal){let t=this.leveler.enabled;this.ui.mTileLevelerVal.textContent=t?"ON":"OFF",this.ui.mTileLevelerVal.className=t?"m-tile-tag text-emerald-400":"m-tile-tag text-rose-400"}if(this.ui.mTileGaitVal){let t=this.gait.mode==="tripod";this.ui.mTileGaitVal.textContent=t?"Tripod":"Wave",this.ui.mTileGaitVal.className=t?"m-tile-tag text-cyan-400":"m-tile-tag text-amber-400"}if(this.ui.mTileCamVal){let t={"orbit-follow":"\u0E2D\u0E34\u0E2A\u0E23\u0E30 360\xB0","top-down":"\u0E21\u0E38\u0E21\u0E2A\u0E39\u0E07\u0E42\u0E14\u0E23\u0E19","mast-cam":"\u0E40\u0E2A\u0E32\u0E22\u0E32\u0E19 POV",inspect:"\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E20\u0E32\u0E1E"};this.ui.mTileCamVal.textContent=t[this.cameraMode]||"\u0E01\u0E25\u0E49\u0E2D\u0E07"}if(this.ui.mTileAudioVal){let t=this.audio.isMuted;this.ui.mTileAudioVal.textContent=t?"OFF":"ON",this.ui.mTileAudioVal.className=t?"m-tile-tag text-rose-400":"m-tile-tag text-emerald-400"}this.ui.lblTouchControlsState&&this.ui.btnToggleTouchControls&&(this.ui.lblTouchControlsState.textContent=this.touchControlsVisible?"\u0E41\u0E2A\u0E14\u0E07\u0E1B\u0E38\u0E48\u0E21":"\u0E0B\u0E48\u0E2D\u0E19\u0E1B\u0E38\u0E48\u0E21",this.ui.btnToggleTouchControls.classList.toggle("active",this.touchControlsVisible)),this.ui.lblMobilePerfState&&this.ui.btnToggleMobilePerf&&(this.ui.lblMobilePerfState.textContent=this.batterySaver?"\u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E41\u0E1A\u0E15\u0E40\u0E15\u0E2D\u0E23\u0E35\u0E48":"\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (\u0E04\u0E21\u0E0A\u0E31\u0E14)",this.ui.btnToggleMobilePerf.classList.toggle("active",!this.batterySaver))}toggleTouchControls(){this.touchControlsVisible=!this.touchControlsVisible,this.ui.bottomDock&&this.ui.bottomDock.classList.toggle("touch-hidden",!this.touchControlsVisible),this.ui.lblTouchControlsState&&this.ui.btnToggleTouchControls&&(this.ui.lblTouchControlsState.textContent=this.touchControlsVisible?"\u0E41\u0E2A\u0E14\u0E07\u0E1B\u0E38\u0E48\u0E21":"\u0E0B\u0E48\u0E2D\u0E19\u0E1B\u0E38\u0E48\u0E21",this.ui.btnToggleTouchControls.classList.toggle("active",this.touchControlsVisible)),this.audio.playScan()}toggleMobilePerformance(){this.batterySaver=!this.batterySaver;let t=this.batterySaver?1:this.getAdaptivePixelRatio();this.renderer.setPixelRatio(t),this.renderer.setSize(window.innerWidth,window.innerHeight),this.ui.lblMobilePerfState&&this.ui.btnToggleMobilePerf&&(this.ui.lblMobilePerfState.textContent=this.batterySaver?"\u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E41\u0E1A\u0E15\u0E40\u0E15\u0E2D\u0E23\u0E35\u0E48":"\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (\u0E04\u0E21\u0E0A\u0E31\u0E14)",this.ui.btnToggleMobilePerf.classList.toggle("active",!this.batterySaver)),this.audio.playScan()}getInputVector(){let t=0,e=0;(this.keys.KeyW||this.keys.ArrowUp)&&(t+=1),(this.keys.KeyS||this.keys.ArrowDown)&&(t-=1),(this.keys.KeyA||this.keys.ArrowLeft)&&(e-=1),(this.keys.KeyD||this.keys.ArrowRight)&&(e+=1),this.joystickActive&&(t+=this.joystickVector.y,e+=this.joystickVector.x),this.dpadState&&(this.dpadState.up&&(t+=1),this.dpadState.down&&(t-=1),this.dpadState.left&&(e-=1),this.dpadState.right&&(e+=1));let i=Math.hypot(e,t);return i>1&&(e/=i,t/=i),this.keys.Space&&(e=0,t=0),{rawX:e,rawY:t}}updateRoverPhysics(t){let{rawX:e,rawY:i}=this.getInputVector(),s=this.gait.mode==="tripod"?1:.65,r=Math.hypot(e,i),a=0,o=0;if(this.steerMode==="camera"){if(r>.05){let S=new R;if(this.camera.getWorldDirection(S),S.y=0,S.lengthSq()<1e-4){let T=new R(0,1,0).applyQuaternion(this.camera.quaternion);S.set(T.x,0,T.z)}S.normalize();let C=new R(S.z,0,-S.x),x=new R;if(x.addScaledVector(S,i),x.addScaledVector(C,e),x.lengthSq()>.001){x.normalize();let P=Math.atan2(x.x,x.z)-this.hexapod.rotation.y;P=Math.atan2(Math.sin(P),Math.cos(P)),o=Math.max(-1,Math.min(1,P*2.8))*this.turnSpeed*s;let L=Math.max(0,Math.cos(P));a=r*this.moveSpeed*s*Math.pow(L,1.25)}}}else a=i*this.moveSpeed*s,o=e*this.turnSpeed*s;let l=this.terrain.getNormal(this.hexapod.position.x,this.hexapod.position.z),c=Math.max(0,Math.min(1,l.y)),f=Math.acos(c)*(180/Math.PI);if(f>13)if(this.gait.mode==="tripod"){let S=Math.min(.65,(f-13)/18);a*=1-S*.85,this.leveler&&Math.abs(this.currentSpeed)>.05&&(this.leveler.currentPitch+=(Math.random()-.5)*.04*S,this.leveler.currentRoll+=(Math.random()-.5)*.04*S),this.leveler.stabilityIndex=Math.max(8,this.leveler.stabilityIndex-Math.round(S*35));let C=Date.now();C-this.lastSlipWarningTime>2800&&(this.lastSlipWarningTime=C,this.showSlipAlert(f),this.audio.playTractionSlip())}else this.leveler.stabilityIndex=Math.min(100,this.leveler.stabilityIndex+8);if(this.keys.Space)this.currentSpeed*=.76,this.currentTurnRate*=.76;else{let S=this.steerMode==="camera"?.16:.14,C=this.steerMode==="camera"?.22:.18;this.currentSpeed+=(a-this.currentSpeed)*S,this.currentTurnRate+=(o-this.currentTurnRate)*C}Math.abs(this.currentTurnRate)>.008&&(this.hexapod.rotation.y+=this.currentTurnRate*t);let h=new R(Math.sin(this.hexapod.rotation.y),0,Math.cos(this.hexapod.rotation.y)),d=this.hexapod.position.clone();Math.abs(this.currentSpeed)>.01&&(d.addScaledVector(h,this.currentSpeed*t),this.battery=Math.max(0,this.battery-t*.25));let g=[];if(this.terrain.lander&&g.push({x:this.terrain.lander.position.x,z:this.terrain.lander.position.z,radius:4.6,type:"lander"}),this.terrain.rocks&&this.terrain.rocks.length>0)for(let S=0;S<this.terrain.rocks.length;S++){let C=this.terrain.rocks[S];g.push({x:C.position.x,z:C.position.z,radius:C.radius,type:"rock"})}let y=1.65,p=!1;for(let S=0;S<2;S++)for(let C=0;C<g.length;C++){let x=g[C],T=d.x-x.x,P=d.z-x.z,I=Math.sqrt(T*T+P*P),L=x.radius+y;if(I<L&&I>.001){p=!0;let W=T/I,X=P/I;if(d.x=x.x+W*L,d.z=x.z+X*L,h.x*W+h.z*X<0){let B=-X,z=W,et=(h.x*B+h.z*z>=0?1:-1)*2.6*t;this.hexapod.rotation.y+=et,h.set(Math.sin(this.hexapod.rotation.y),0,Math.cos(this.hexapod.rotation.y)),this.currentSpeed*=.86}}}if(p){let S=Date.now();S-this.lastCollisionAlertTime>750&&(this.lastCollisionAlertTime=S,this.audio.playCollision(),this.showCollisionAlert(),this.leveler&&(this.leveler.currentPitch+=(Math.random()-.5)*.05,this.leveler.currentRoll+=(Math.random()-.5)*.05))}this.hexapod.position.x=d.x,this.hexapod.position.z=d.z;let m=this.terrain.getHeight(this.hexapod.position.x,this.hexapod.position.z);this.hexapod.position.y+=(m-this.hexapod.position.y)*.15;let M=new R(0,1,0);M.applyEuler(new ti(this.leveler.currentPitch,0,this.leveler.currentRoll,"ZXY")),M.applyAxisAngle(new R(0,1,0),this.hexapod.rotation.y),M.normalize();let E=new R(80,110,-60).normalize();this.solarCosTheta=Math.max(0,M.dot(E));let v=.1;this.solarCharging=.5*this.solarCosTheta*(1-v),this.battery=Math.min(100,this.battery+this.solarCharging*t*.12),this.hexapod.updateSolarGlow(this.solarCosTheta);let w=Math.max(Math.abs(this.currentSpeed)/this.moveSpeed,Math.abs(this.currentTurnRate)/this.turnSpeed);this.audio.updateMotor(w),this.inputVector.set(Math.sin(this.hexapod.rotation.y)*this.currentSpeed,0,Math.cos(this.hexapod.rotation.y)*this.currentSpeed)}showCollisionAlert(){if(!this.ui.warningToast)return;let t=document.getElementById("warning-title"),e=document.getElementById("warning-desc");t&&(t.textContent="\u{1F6E1}\uFE0F \u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E19: \u0E23\u0E30\u0E1A\u0E1A\u0E2B\u0E25\u0E1A\u0E2B\u0E25\u0E35\u0E01\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E17\u0E33\u0E07\u0E32\u0E19 (DEFLECTION ACTIVE)"),e&&(e.textContent="\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C/\u0E10\u0E32\u0E19\u0E22\u0E32\u0E19 - \u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E25\u0E44\u0E01\u0E17\u0E33\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E35\u0E48\u0E22\u0E07\u0E17\u0E34\u0E28\u0E17\u0E32\u0E07\u0E2B\u0E25\u0E1A\u0E2B\u0E25\u0E35\u0E01\u0E23\u0E2D\u0E1A\u0E2A\u0E34\u0E48\u0E07\u0E01\u0E35\u0E14\u0E02\u0E27\u0E32\u0E07"),this.ui.warningToast.classList.remove("hidden"),this.collisionAlertTimer&&clearTimeout(this.collisionAlertTimer),this.collisionAlertTimer=setTimeout(()=>{this.leveler&&this.leveler.tiltAngleDeg<=28&&this.ui.warningToast.classList.add("hidden")},1300)}showSlipAlert(t){if(!this.ui.warningToast)return;let e=document.getElementById("warning-title"),i=document.getElementById("warning-desc");e&&(e.textContent=`\u26A0\uFE0F \u0E02\u0E32\u0E44\u0E16\u0E25\u0E25\u0E37\u0E48\u0E19: \u0E25\u0E32\u0E14\u0E0A\u0E31\u0E19\u0E2A\u0E39\u0E07 ${t.toFixed(0)}\xB0 (TRIPOD SLIP)`),i&&(i.textContent="\u0E42\u0E2B\u0E21\u0E14 Tripod (3 \u0E02\u0E32) \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E10\u0E32\u0E19\u0E41\u0E04\u0E1A\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E1A\u0E19\u0E17\u0E32\u0E07\u0E0A\u0E31\u0E19! \u0E01\u0E14 [G] \u0E2A\u0E25\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19 WAVE GAIT \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 5 \u0E02\u0E32"),this.ui.warningToast.classList.remove("hidden"),this.collisionAlertTimer&&clearTimeout(this.collisionAlertTimer),this.collisionAlertTimer=setTimeout(()=>{this.leveler&&this.leveler.tiltAngleDeg<=28&&this.ui.warningToast.classList.add("hidden")},2500)}showWaveEngagedToast(){if(!this.ui.warningToast)return;let t=document.getElementById("warning-title"),e=document.getElementById("warning-desc");t&&(t.textContent="\u{1F9D7} \u0E40\u0E1B\u0E34\u0E14\u0E42\u0E2B\u0E21\u0E14 WAVE GAIT: \u0E22\u0E36\u0E14\u0E40\u0E01\u0E32\u0E30\u0E1E\u0E37\u0E49\u0E19\u0E1C\u0E34\u0E27\u0E14\u0E49\u0E27\u0E22 5 \u0E02\u0E32 (MAX STABILITY)"),e&&(e.textContent="Duty Cycle 83.3% \u0E02\u0E22\u0E32\u0E22\u0E23\u0E39\u0E1B\u0E2B\u0E25\u0E32\u0E22\u0E40\u0E2B\u0E25\u0E35\u0E48\u0E22\u0E21\u0E10\u0E32\u0E19\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A \u0E43\u0E2B\u0E49\u0E41\u0E23\u0E07\u0E09\u0E38\u0E14\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1B\u0E35\u0E19\u0E40\u0E19\u0E34\u0E19\u0E17\u0E23\u0E32\u0E22\u0E41\u0E25\u0E30\u0E2A\u0E31\u0E19\u0E1C\u0E32"),this.ui.warningToast.classList.remove("hidden"),this.collisionAlertTimer&&clearTimeout(this.collisionAlertTimer),this.collisionAlertTimer=setTimeout(()=>{this.ui.warningToast.classList.add("hidden")},2200)}checkMissions(){let t=this.hexapod.position;this.terrain.samples.forEach(e=>{!e.collected&&!this.investigation.spectrometerOpen&&t.distanceTo(e.position)<=e.triggerRadius&&this.openSpectrometerModal(e)}),this.terrain.lander&&t.distanceTo(this.terrain.lander.position)<=this.terrain.lander.radius&&this.collectedSamples.size===this.totalSamples&&!this.missionComplete&&this.completeMission()}openSpectrometerModal(t){if(!(this.investigation.spectrometerOpen||t.collected)){if(this.investigation.spectrometerOpen=!0,this.investigation.activeSample=t,this.currentSpeed*=.3,this.investigation.sampleResults[t.id]||(this.investigation.sampleResults[t.id]={attempts:0,solved:!1,earnedPoints:0}),this.ui.specSiteBadge&&(this.ui.specSiteBadge.textContent=t.id.toUpperCase()),this.ui.specSampleName&&(this.ui.specSampleName.textContent=t.thaiName),this.ui.specHydrationPill&&(this.ui.specHydrationPill.textContent=`\u{1F4A7} \u0E19\u0E49\u0E33: ${t.spectralData.hydrationIndex}%`,this.ui.specHydrationPill.className=t.spectralData.hydrationIndex>=70?"water-evidence-pill high":t.spectralData.hydrationIndex>=30?"water-evidence-pill medium":"water-evidence-pill low"),this.ui.specPeakLabel&&(this.ui.specPeakLabel.textContent=`\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E2B\u0E25\u0E31\u0E01: ${t.spectralData.keyAbsorption}`),this.ui.specBar14&&(this.ui.specBar14.style.width=`${Math.round(t.spectralData.absorption14*100)}%`),this.ui.specVal14&&(this.ui.specVal14.textContent=`-${t.spectralData.absorption14.toFixed(2)}`),this.ui.specBar19&&(this.ui.specBar19.style.width=`${Math.round(t.spectralData.absorption19*100)}%`),this.ui.specVal19&&(this.ui.specVal19.textContent=`-${t.spectralData.absorption19.toFixed(2)}`),this.ui.specBarMetal&&(this.ui.specBarMetal.style.width=`${Math.round(t.spectralData.absorptionMetal*100)}%`),this.ui.specValMetal&&(this.ui.specValMetal.textContent=`-${t.spectralData.absorptionMetal.toFixed(2)}`),this.ui.specInstrumentReading&&(this.ui.specInstrumentReading.textContent=t.spectralData.readingText),this.ui.specInquiryPrompt&&(this.ui.specInquiryPrompt.textContent=t.inquiryQuestion.prompt),this.ui.specChoicesContainer){this.ui.specChoicesContainer.innerHTML="";let e=["\u0E01","\u0E02","\u0E04"];t.inquiryQuestion.choices.forEach((i,s)=>{let r=document.createElement("div");r.className="inquiry-choice-card",r.innerHTML=`
          <div class="choice-tag">${e[s]}</div>
          <div class="choice-text">${i.text}</div>
        `,r.addEventListener("click",()=>this.handleChoiceSelection(t,s,r)),this.ui.specChoicesContainer.appendChild(r)})}this.ui.specFeedback&&(this.ui.specFeedback.className="hidden",this.ui.specFeedback.innerHTML=""),this.ui.btnConfirmSample&&(this.ui.btnConfirmSample.disabled=!0,this.ui.btnConfirmSample.innerHTML="\u{1F512} \u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E17\u0E32\u0E07\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07"),this.ui.spectrometerModal&&this.ui.spectrometerModal.classList.remove("hidden"),this.audio.playScan()}}handleChoiceSelection(t,e,i){let s=this.investigation.sampleResults[t.id];if(s.solved)return;s.attempts++;let r=e===t.inquiryQuestion.correctIndex;if(this.ui.specChoicesContainer&&this.ui.specChoicesContainer.querySelectorAll(".inquiry-choice-card").forEach(o=>o.classList.remove("selected","incorrect")),r){s.solved=!0,i.classList.add("correct");let a=s.attempts===1?t.waterEvidencePoints:s.attempts===2?Math.max(1,t.waterEvidencePoints-1):1;s.earnedPoints=a,this.investigation.evidenceScore+=a,s.attempts===1&&this.investigation.correctCount++,this.ui.specFeedback&&(this.ui.specFeedback.className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 p-3 rounded-xl",this.ui.specFeedback.innerHTML=`
          <strong style="color: #4ade80;">\u2705 \u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E25\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E15\u0E32\u0E21\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E2A\u0E40\u0E1B\u0E01\u0E42\u0E15\u0E23\u0E21\u0E34\u0E40\u0E15\u0E2D\u0E23\u0E4C!</strong><br>
          ${t.inquiryQuestion.explanation}<br>
          <span style="color: #38bdf8; font-weight: 800; font-family: var(--font-mono); margin-top: 4px; display: inline-block;">
            +${a} \u0E04\u0E30\u0E41\u0E19\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E19\u0E49\u0E33\u0E42\u0E1A\u0E23\u0E32\u0E13 (CER Evidence Score)
          </span>
        `,this.ui.specFeedback.classList.remove("hidden")),this.ui.btnConfirmSample&&(this.ui.btnConfirmSample.disabled=!1,this.ui.btnConfirmSample.innerHTML=`\u{1F4E5} \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E25\u0E30\u0E40\u0E01\u0E47\u0E1A\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07 (${t.thaiName}) \u2794`),this.audio.playVictory()}else i.classList.add("incorrect"),this.ui.specFeedback&&(this.ui.specFeedback.className="bg-rose-950/70 border border-rose-500/40 text-rose-200 p-3 rounded-xl",this.ui.specFeedback.innerHTML=`
          <strong style="color: #f43f5e;">\u274C \u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19:</strong><br>
          \u0E2A\u0E31\u0E07\u0E40\u0E01\u0E15\u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E17\u0E35\u0E48 <strong>${t.spectralData.keyAbsorption}</strong> \u0E41\u0E25\u0E30\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E19\u0E49\u0E33\u0E43\u0E19\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07 <strong>${t.spectralData.hydrationIndex}%</strong> \u0E25\u0E2D\u0E07\u0E17\u0E1A\u0E17\u0E27\u0E19\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E2D\u0E37\u0E48\u0E19
        `,this.ui.specFeedback.classList.remove("hidden")),this.audio.playCollision();this.updateHUD()}confirmSampleCollection(){let t=this.investigation.activeSample;t&&(t.collected=!0,this.collectedSamples.add(t.id),t.coreMesh&&t.coreMesh.scale.set(.2,.2,.2),t.group&&t.group.children.forEach(e=>{e.material&&e.material.opacity&&(e.material.opacity=.15)}),this.audio.playScan(),this.ui.spectrometerModal&&this.ui.spectrometerModal.classList.add("hidden"),this.investigation.spectrometerOpen=!1,this.updateHUD(),this.collectedSamples.size===this.totalSamples&&this.audio.playVictory())}toggleExperimentsModal(){this.ui.levelerExpModal&&this.ui.levelerExpModal.classList.toggle("hidden"),this.audio.playScan()}openAtmoModal(){this.ui.atmoModal&&(this.ui.atmoModal.classList.remove("hidden"),this.phaseDiagram||(this.phaseDiagram=new To("atmo-phase-canvas")),this.phaseDiagram&&requestAnimationFrame(()=>{this.phaseDiagram.initCanvasSize(),this.phaseDiagram.syncUI(),this.phaseDiagram.render()})),this.audio.playScan()}openGaitExpModal(){this.ui.gaitExpModal&&this.ui.gaitExpModal.classList.remove("hidden"),this.audio.playScan()}selectGait(t){this.gait.setMode(t);let e=t==="tripod";this.ui.gaitStatus&&(this.ui.gaitStatus.textContent=e?"TRIPOD (FAST)":"WAVE (STABLE)",this.ui.gaitStatus.className=e?"text-cyan-400 font-bold":"text-amber-400 font-bold"),e||this.showWaveEngagedToast(),this.ui.gaitExpModal&&this.ui.gaitExpModal.classList.add("hidden"),this.audio.playGaitShift()}runLevelerTrial(t){this.audio.playScan();let e=t==="a";this.leveler.enabled=!e,this.ui.levelerStatus&&(this.ui.levelerStatus.textContent=e?"OFF (TRIAL A)":"ON (ACTIVE TRIAL B)",this.ui.levelerStatus.className=e?"text-rose-400 font-bold":"text-emerald-400 font-bold");let i=document.getElementById("exp-telemetry-progress"),s=document.getElementById("exp-progress-text"),r=document.getElementById("exp-progress-pct");i&&i.classList.remove("hidden"),s&&(s.textContent=`\u{1F4E1} \u0E01\u0E33\u0E25\u0E31\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E42\u0E17\u0E23\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E17\u0E23\u0E07\u0E15\u0E31\u0E27\u0E2A\u0E14 (${e?"Trial A: \u0E1B\u0E34\u0E14\u0E23\u0E30\u0E1A\u0E1A":"Trial B: \u0E40\u0E1B\u0E34\u0E14\u0E23\u0E30\u0E1A\u0E1A"})...`),r&&(r.textContent="0%");let a=document.getElementById(e?"exp-status-a":"exp-status-b");a&&(a.textContent="\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E38\u0E48\u0E21\u0E27\u0E31\u0E14\u0E2A\u0E14...",a.style.color="#38bdf8"),this.levelerTrial={trial:t,duration:3.5,elapsed:0,samples:[],lastBeep:0}}updateLevelerTrial(t){if(!this.levelerTrial)return;let e=this.levelerTrial;e.elapsed+=t,e.elapsed-e.lastBeep>.6&&(e.lastBeep=e.elapsed,this.audio.playFootstep());let i=this.terrain.getNormal(this.hexapod.position.x,this.hexapod.position.z),s=Math.acos(Math.max(0,Math.min(1,i.y)))*(180/Math.PI),r=0;this.leveler.tiltAngleDeg!==void 0?r=this.leveler.tiltAngleDeg:r=Math.hypot(this.leveler.currentPitch,this.leveler.currentRoll)*(180/Math.PI);let a=this.leveler.stabilityIndex!==void 0?this.leveler.stabilityIndex:100;if(e.trial==="a"){let c=Math.max(16.5,s*.95+(Math.random()-.5)*4.2),u=Math.max(15,Math.min(45,a-50+(Math.random()-.5)*12));e.samples.push({tilt:c,stab:u,slope:Math.max(18,s)})}else{let c=Math.max(1.8,Math.min(5.2,r+(Math.random()-.5)*.6)),u=Math.max(85,Math.min(99,93+(Math.random()-.5)*4));e.samples.push({tilt:c,stab:u,slope:Math.max(18,s)})}let o=Math.min(100,Math.round(e.elapsed/e.duration*100)),l=document.getElementById("exp-progress-pct");l&&(l.textContent=`${o}%`),e.elapsed>=e.duration&&this.finishLevelerTrial()}finishLevelerTrial(){if(!this.levelerTrial)return;let t=this.levelerTrial;this.levelerTrial=null;let e=document.getElementById("exp-telemetry-progress");e&&e.classList.add("hidden");let i=t.samples.length||1,s=0,r=0,a=0;t.samples.forEach(E=>{s+=E.tilt,r+=E.stab,a+=E.slope});let o=s/i,l=Math.round(r/i),c=(a/i).toFixed(1),u=0;t.samples.forEach(E=>{u+=Math.pow(E.tilt-o,2)});let f=Math.sqrt(u/i),h=t.trial==="a",d=document.getElementById(h?"exp-status-a":"exp-status-b"),g=document.getElementById(h?"exp-slope-a":"exp-slope-b"),y=document.getElementById(h?"exp-tilt-a":"exp-tilt-b"),p=document.getElementById(h?"exp-jitter-a":"exp-jitter-b"),m=document.getElementById(h?"exp-stab-a":"exp-stab-b");d&&(d.textContent="\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 \u2713",d.style.color=h?"#fda4af":"#6ee7b7"),g&&(g.textContent=`${c}\xB0`),y&&(y.textContent=`${o.toFixed(1)}\xB0 (${h?"\u0E40\u0E2D\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E25\u0E32\u0E14\u0E1C\u0E32":"\u0E0A\u0E14\u0E40\u0E0A\u0E22\u0E23\u0E30\u0E19\u0E32\u0E1A"})`),p&&(p.textContent=`\xB1${f.toFixed(2)}\xB0 (${h?"\u0E44\u0E23\u0E49\u0E15\u0E31\u0E27\u0E0B\u0E31\u0E1A\u0E2A\u0E31\u0E48\u0E19":"Damping 0.08"})`),m&&(m.textContent=`${l}% (${h?"\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E04\u0E27\u0E48\u0E33":"\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23\u0E20\u0E32\u0E1E\u0E2A\u0E39\u0E07"})`);let M=document.getElementById("exp-empirical-conclusion");M&&(M.innerHTML=`<strong>\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E17\u0E14\u0E25\u0E2D\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C:</strong> \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E34\u0E14 Active Leveler (Trial B) \u0E2B\u0E38\u0E48\u0E19\u0E22\u0E19\u0E15\u0E4C ARES-6 \u0E25\u0E14\u0E21\u0E38\u0E21\u0E40\u0E2D\u0E35\u0E22\u0E07\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E25\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D <strong>${o.toFixed(1)}\xB0</strong> \u0E41\u0E25\u0E30\u0E25\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E19\u0E44\u0E2B\u0E27 (RMS Jitter) \u0E40\u0E2B\u0E25\u0E37\u0E2D <strong>\xB1${f.toFixed(2)}\xB0</strong> \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E43\u0E2B\u0E49\u0E14\u0E31\u0E0A\u0E19\u0E35\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23\u0E20\u0E32\u0E1E\u0E17\u0E23\u0E07\u0E15\u0E31\u0E27\u0E1E\u0E38\u0E48\u0E07\u0E2A\u0E39\u0E07\u0E16\u0E36\u0E07 <strong>${l}%</strong> \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E2A\u0E21\u0E21\u0E15\u0E34\u0E10\u0E32\u0E19\u0E17\u0E35\u0E48 1 \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19`),this.trialHistory.push({trial:t.trial.toUpperCase(),meanSlope:parseFloat(c),meanTilt:parseFloat(o.toFixed(2)),rmsJitter:parseFloat(f.toFixed(2)),meanStab:l,sampleCount:i,timestamp:new Date().toISOString()}),h?this.audio.playAlert():this.audio.playVictory()}completeMission(){this.missionComplete=!0,this.audio.playVictory();let t=Math.round((Date.now()-this.missionStartTime)/1e3),e=Math.floor(t/60),i=t%60,s=`${e}:${i<10?"0":""}${i}`,r=this.investigation.evidenceScore,a=Math.round(this.investigation.correctCount/4*100),o="Lead Planetary Geologist";r>=11?o="Principal Planetary Geoscientist (\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E19\u0E31\u0E01\u0E18\u0E23\u0E13\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32 Chryse)":r>=8?o="Senior Mars Astrobiology Specialist (\u0E1C\u0E39\u0E49\u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E0A\u0E35\u0E27\u0E14\u0E32\u0E23\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C)":o="Mars Field Surveyor (\u0E19\u0E31\u0E01\u0E2A\u0E33\u0E23\u0E27\u0E08\u0E20\u0E32\u0E04\u0E2A\u0E19\u0E32\u0E21\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23)",this.ui.cerFinalScore&&(this.ui.cerFinalScore.textContent=`${r}/12 pts`),this.ui.cerAccuracyRate&&(this.ui.cerAccuracyRate.textContent=`${a}%`),this.ui.cerFinalTime&&(this.ui.cerFinalTime.textContent=s),this.ui.cerRankTitle&&(this.ui.cerRankTitle.textContent=o);let l=document.getElementById("cer-claim-text");l&&(r>=10?l.innerHTML="\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E2A\u0E40\u0E1B\u0E01\u0E15\u0E23\u0E31\u0E21\u0E2D\u0E34\u0E19\u0E1F\u0E23\u0E32\u0E40\u0E23\u0E14\u0E23\u0E30\u0E22\u0E30\u0E43\u0E01\u0E25\u0E49 (VNIR) \u0E41\u0E25\u0E30\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E42\u0E1A\u0E23\u0E32\u0E13 \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32 <strong>Chryse Planitia \u0E43\u0E19\u0E2D\u0E14\u0E35\u0E15\u0E22\u0E38\u0E04 Noachian (3.8 \u0E1E\u0E31\u0E19\u0E25\u0E49\u0E32\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19)</strong> \u0E40\u0E04\u0E22\u0E21\u0E35\u0E2A\u0E20\u0E32\u0E1E\u0E41\u0E27\u0E14\u0E25\u0E49\u0E2D\u0E21\u0E17\u0E35\u0E48\u0E40\u0E2D\u0E37\u0E49\u0E2D\u0E15\u0E48\u0E2D\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E2A\u0E20\u0E32\u0E1E\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07\u0E04\u0E07\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E39\u0E48\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19 \u0E01\u0E48\u0E2D\u0E15\u0E31\u0E27\u0E40\u0E1B\u0E47\u0E19\u0E17\u0E30\u0E40\u0E25\u0E2A\u0E32\u0E1A\u0E41\u0E25\u0E30\u0E18\u0E32\u0E23\u0E19\u0E49\u0E33\u0E2B\u0E25\u0E32\u0E01 \u0E01\u0E48\u0E2D\u0E19\u0E08\u0E30\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E1C\u0E48\u0E32\u0E19\u0E2A\u0E39\u0E48\u0E19\u0E49\u0E33\u0E01\u0E23\u0E14\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04 Hesperian \u0E41\u0E25\u0E30\u0E01\u0E25\u0E32\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E17\u0E30\u0E40\u0E25\u0E17\u0E23\u0E32\u0E22\u0E40\u0E22\u0E37\u0E2D\u0E01\u0E41\u0E02\u0E47\u0E07\u0E41\u0E2B\u0E49\u0E07\u0E41\u0E25\u0E49\u0E07\u0E43\u0E19\u0E22\u0E38\u0E04 Amazonian":l.innerHTML="\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E20\u0E32\u0E04\u0E2A\u0E19\u0E32\u0E21\u0E23\u0E30\u0E1A\u0E38\u0E27\u0E48\u0E32 Chryse Planitia \u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E17\u0E32\u0E07\u0E18\u0E23\u0E13\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32\u0E2B\u0E25\u0E32\u0E22\u0E22\u0E38\u0E04 \u0E42\u0E14\u0E22\u0E1E\u0E1A\u0E23\u0E48\u0E2D\u0E07\u0E23\u0E2D\u0E22\u0E41\u0E23\u0E48\u0E44\u0E2E\u0E40\u0E14\u0E23\u0E15\u0E41\u0E25\u0E30\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E20\u0E39\u0E40\u0E02\u0E32\u0E44\u0E1F \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E27\u0E48\u0E32\u0E43\u0E19\u0E2D\u0E14\u0E35\u0E15\u0E40\u0E04\u0E22\u0E21\u0E35\u0E1B\u0E0F\u0E34\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E19\u0E49\u0E33\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19 \u0E41\u0E21\u0E49\u0E08\u0E30\u0E21\u0E35\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E1A\u0E32\u0E07\u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E33\u0E23\u0E27\u0E08\u0E0B\u0E49\u0E33\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21");let c=document.getElementById("cer-evidence-list");if(c&&this.terrain&&this.terrain.samples){let f="";this.terrain.samples.forEach(h=>{let d=this.investigation.sampleResults[h.id]||{attempts:1,earnedPoints:3},g=d.earnedPoints===3?"#34d399":"#fbbf24",y=d.earnedPoints===3?"\u2713 \u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E04\u0E23\u0E31\u0E49\u0E07\u0E41\u0E23\u0E01 (+3 pts)":`\u2713 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08 (+${d.earnedPoints} pts)`,p=h.inquiryQuestion.choices[h.inquiryQuestion.correctIndex].text;f+=`
          <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
              <strong style="color: #67e8f9;">\u2022 ${h.thaiName} (${h.id.toUpperCase()}):</strong>
              <span style="font-size: 11px; font-family: var(--font-mono); color: ${g};">${y}</span>
            </div>
            <div style="color: #cbd5e1; font-size: 0.82rem;">
              \u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19\u0E2B\u0E25\u0E31\u0E01: <strong>${h.spectralData.keyAbsorption}</strong> (\u0E04\u0E27\u0E32\u0E21\u0E0A\u0E37\u0E49\u0E19 ${h.spectralData.hydrationIndex}%)<br>
              <em>\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C:</em> ${p}
            </div>
          </div>
        `}),c.innerHTML=f}let u=document.getElementById("cer-reasoning-text");u&&(u.innerHTML=`
        \u0E01\u0E23\u0E30\u0E1A\u0E27\u0E19\u0E01\u0E32\u0E23\u0E15\u0E01\u0E15\u0E30\u0E01\u0E2D\u0E19\u0E02\u0E2D\u0E07 <strong>Phyllosilicate Clay (Site Beta)</strong> \u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E19\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27 pH \u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E32\u0E07\u0E17\u0E33\u0E1B\u0E0F\u0E34\u0E01\u0E34\u0E23\u0E34\u0E22\u0E32\u0E01\u0E31\u0E1A\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E19\u0E31\u0E1A\u0E2B\u0E21\u0E37\u0E48\u0E19\u0E1B\u0E35 \u0E0B\u0E36\u0E48\u0E07\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19 <strong>Paleomagnetic Anomaly (Site Delta)</strong> \u0E17\u0E35\u0E48\u0E1E\u0E34\u0E2A\u0E39\u0E08\u0E19\u0E4C\u0E27\u0E48\u0E32\u0E43\u0E19\u0E22\u0E38\u0E04\u0E19\u0E31\u0E49\u0E19\u0E41\u0E01\u0E19\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23\u0E22\u0E31\u0E07\u0E21\u0E35\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E1B\u0E01\u0E1B\u0E49\u0E2D\u0E07\u0E0A\u0E31\u0E49\u0E19\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E2B\u0E19\u0E32\u0E41\u0E19\u0E48\u0E19 (\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19 &gt; 100 kPa) \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E19\u0E49\u0E33\u0E04\u0E07\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E27\u0E40\u0E2B\u0E19\u0E37\u0E2D\u0E08\u0E38\u0E14\u0E23\u0E48\u0E27\u0E21\u0E2A\u0E32\u0E21 (0.611 kPa) \u0E44\u0E14\u0E49<br><br>
        \u0E15\u0E48\u0E2D\u0E21\u0E32\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E19\u0E32\u0E21\u0E41\u0E21\u0E48\u0E40\u0E2B\u0E25\u0E47\u0E01\u0E14\u0E31\u0E1A\u0E2A\u0E39\u0E0D \u0E25\u0E21\u0E2A\u0E38\u0E23\u0E34\u0E22\u0E30\u0E08\u0E36\u0E07\u0E01\u0E27\u0E32\u0E14\u0E1A\u0E23\u0E23\u0E22\u0E32\u0E01\u0E32\u0E28\u0E2D\u0E2D\u0E01\u0E2A\u0E39\u0E48\u0E2D\u0E27\u0E01\u0E32\u0E28 \u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E25\u0E14\u0E2E\u0E27\u0E1A\u0E25\u0E07\u0E2A\u0E39\u0E48 0.63 kPa \u0E43\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 \u0E19\u0E49\u0E33\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E08\u0E36\u0E07\u0E23\u0E30\u0E40\u0E2B\u0E34\u0E14\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27 \u0E15\u0E01\u0E04\u0E49\u0E32\u0E07\u0E44\u0E27\u0E49\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E41\u0E23\u0E48\u0E0B\u0E31\u0E25\u0E40\u0E1F\u0E15\u0E23\u0E30\u0E40\u0E2B\u0E22\u0E41\u0E2B\u0E49\u0E07 <strong>Jarosite (Site Alpha)</strong> \u0E41\u0E25\u0E30\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E2B\u0E34\u0E19\u0E1A\u0E30\u0E0B\u0E2D\u0E25\u0E15\u0E4C\u0E2A\u0E14 <strong>Olivine (Site Gamma)</strong> \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E1C\u0E38\u0E1E\u0E31\u0E07\u0E2D\u0E35\u0E01\u0E40\u0E25\u0E22
      `),this.ui.cerReportModal&&this.ui.cerReportModal.classList.remove("hidden")}exportCERReport(){let t=Math.round((Date.now()-this.missionStartTime)/1e3),e=Math.floor(t/60),i=t%60,s=`${e}:${i<10?"0":""}${i}`,r=this.investigation.evidenceScore,a=Math.round(this.investigation.correctCount/4*100),o=`# \u{1FA90} \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E1A\u0E40\u0E2A\u0E32\u0E30\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C Chryse Planitia (CER Report)
`;o+=`**\u0E2B\u0E38\u0E48\u0E19\u0E22\u0E19\u0E15\u0E4C\u0E2A\u0E33\u0E23\u0E27\u0E08:** ARES-6 Autonomous Martian Hexapod
`,o+=`**\u0E04\u0E30\u0E41\u0E19\u0E19\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19 (Evidence Score):** ${r}/12 pts (${a}%)
`,o+=`**\u0E40\u0E27\u0E25\u0E32\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23:** ${s}

`,o+=`## 1. \u0E02\u0E49\u0E2D\u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23 (Claim)
`;let l=document.getElementById("cer-claim-text");o+=`${l?l.textContent.trim():""}

`,o+=`## 2. \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E25\u0E31\u0E01\u0E10\u0E32\u0E19\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E30\u0E08\u0E31\u0E01\u0E29\u0E4C (Evidence)
`,this.terrain&&this.terrain.samples&&this.terrain.samples.forEach(u=>{let f=this.investigation.sampleResults[u.id]||{attempts:1,earnedPoints:3};o+=`- **${u.thaiName} (${u.id.toUpperCase()}):** \u0E41\u0E16\u0E1A\u0E14\u0E39\u0E14\u0E01\u0E25\u0E37\u0E19 ${u.spectralData.keyAbsorption} (\u0E04\u0E27\u0E32\u0E21\u0E0A\u0E37\u0E49\u0E19 ${u.spectralData.hydrationIndex}%) \u2014 \u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${f.earnedPoints} \u0E04\u0E30\u0E41\u0E19\u0E19 (\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C ${f.attempts} \u0E04\u0E23\u0E31\u0E49\u0E07)
`}),o+=`
`,o+=`## 3. \u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E41\u0E25\u0E30\u0E01\u0E25\u0E44\u0E01\u0E17\u0E32\u0E07\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C (Reasoning)
`;let c=document.getElementById("cer-reasoning-text");o+=`${c?c.textContent.trim():""}

`,o+=`---
*\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E27\u0E34\u0E08\u0E31\u0E22\u0E20\u0E32\u0E04\u0E2A\u0E19\u0E32\u0E21\u0E14\u0E32\u0E27\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23 \u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E15\u0E32\u0E21\u0E01\u0E23\u0E2D\u0E1A CER \u0E42\u0E14\u0E22 \u0E14\u0E23. \u0E2D\u0E20\u0E34\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \u0E17\u0E2D\u0E07\u0E44\u0E0A\u0E22*
`,navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(o).then(()=>{let u=document.getElementById("cer-export-toast");u&&(u.classList.remove("hidden"),setTimeout(()=>u.classList.add("hidden"),3500)),this.audio.playScan()}).catch(u=>{console.warn("Clipboard write failed:",u)})}updateHUD(){let t=(this.leveler.currentPitch*180/Math.PI).toFixed(1),e=(this.leveler.currentRoll*180/Math.PI).toFixed(1);if(this.ui.pitchVal&&(this.ui.pitchVal.textContent=`${t}\xB0`),this.ui.rollVal&&(this.ui.rollVal.textContent=`${e}\xB0`),this.ui.horizonBar){let h=this.leveler.currentPitch*45,d=-this.leveler.currentRoll*(180/Math.PI);this.ui.horizonBar.style.transform=`translate(-50%, calc(-50% + ${h}px)) rotate(${d}deg)`}let i=this.leveler.stabilityIndex;this.ui.stabilityVal&&(this.ui.stabilityVal.textContent=`${i}%`),this.ui.stabilityBar&&(this.ui.stabilityBar.style.width=`${i}%`,this.ui.stabilityBar.className=i>70?"h-full bg-emerald-500":i>35?"h-full bg-amber-500":"h-full bg-rose-500"),this.leveler.tiltAngleDeg>28?(this.ui.warningToast&&this.ui.warningToast.classList.remove("hidden"),this.audio.playAlert()):this.ui.warningToast&&this.ui.warningToast.classList.add("hidden"),this.ui.altitudeVal&&(this.ui.altitudeVal.textContent=`${this.hexapod.position.y.toFixed(1)} m`);let s=Math.hypot(this.currentSpeed,this.currentTurnRate*1.6);this.ui.speedVal&&(this.ui.speedVal.textContent=`${s.toFixed(1)} m/s`),this.ui.batteryVal&&(this.ui.batteryVal.textContent=`${Math.round(this.battery)}%`),this.ui.batteryBar&&(this.ui.batteryBar.style.width=`${Math.round(this.battery)}%`),this.ui.solarCosVal&&(this.ui.solarCosVal.textContent=`cos \u03B8 = ${this.solarCosTheta.toFixed(2)}`),this.ui.solarVal&&(this.ui.solarVal.textContent=`+${this.solarCharging.toFixed(2)} kW`);let a=Math.acos(Math.max(0,Math.min(1,this.solarCosTheta)))*(180/Math.PI);if(this.ui.solarAngleVal&&(this.ui.solarAngleVal.textContent=`${a.toFixed(1)}\xB0`),this.ui.solarEffBar&&(this.ui.solarEffBar.style.width=`${Math.round(this.solarCosTheta*100)}%`),this.ui.solarStatus&&(this.solarCosTheta>=.8?(this.ui.solarStatus.textContent="\u2600\uFE0F \u0E1B\u0E23\u0E30\u0E08\u0E38\u0E44\u0E1F\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E (Optimal Incidence)",this.ui.solarStatus.style.color="#4ade80"):this.solarCosTheta>=.45?(this.ui.solarStatus.textContent="\u{1F324}\uFE0F \u0E1B\u0E23\u0E30\u0E08\u0E38\u0E44\u0E1F\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 (Moderate Angle)",this.ui.solarStatus.style.color="#fde047"):(this.ui.solarStatus.textContent="\u{1F311} \u0E21\u0E38\u0E21\u0E15\u0E01\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E40\u0E09\u0E35\u0E22\u0E07\u0E21\u0E32\u0E01 (Low Irradiance)",this.ui.solarStatus.style.color="#f87171")),this.ui.sampleCounter&&(this.ui.sampleCounter.textContent=`${this.collectedSamples.size}/${this.totalSamples}`),this.ui.evidenceScoreVal&&(this.ui.evidenceScoreVal.textContent=`${this.investigation.evidenceScore}/12 pts`),this.ui.evidenceBar){let h=Math.min(100,Math.round(this.investigation.evidenceScore/12*100));this.ui.evidenceBar.style.width=`${h}%`}this.ui.ribbonSpeed&&(this.ui.ribbonSpeed.textContent=`${s.toFixed(1)} m/s`),this.ui.ribbonBattery&&(this.ui.ribbonBattery.textContent=`${Math.round(this.battery)}%`),this.ui.ribbonSamples&&(this.ui.ribbonSamples.textContent=`${this.collectedSamples.size}/${this.totalSamples}`),this.ui.mMenuSpeed&&(this.ui.mMenuSpeed.textContent=`${s.toFixed(1)} m/s`),this.ui.mMenuBattery&&(this.ui.mMenuBattery.textContent=`${Math.round(this.battery)}%`),this.ui.mMenuStability&&(this.ui.mMenuStability.textContent=`${i}%`),this.ui.mMenuSamples&&(this.ui.mMenuSamples.textContent=`${this.collectedSamples.size}/${this.totalSamples}`),this.ui.navSpeed&&(this.ui.navSpeed.textContent=`${s.toFixed(1)} m/s`),this.ui.navBattery&&(this.ui.navBattery.textContent=`${Math.round(this.battery)}%`),this.ui.navSamples&&(this.ui.navSamples.textContent=`${this.collectedSamples.size}/${this.totalSamples}`),this.hexapod.legs.forEach((h,d)=>{let g=this.ui.legDots[d];g&&(g.className=h.isGrounded?"leg-dot grounded":"leg-dot swing")});let o=Math.floor((Date.now()-this.missionStartTime)/1e3),l=Math.floor(o/60),c=o%60,u=`${l<10?"0":""}${l}:${c<10?"0":""}${c}`,f=document.getElementById("hud-mission-timer");f&&(f.textContent=u),this.ui.ribbonTimer&&(this.ui.ribbonTimer.textContent=u),this.ui.navTimer&&(this.ui.navTimer.textContent=u),this.drawMinimap()}drawMinimap(){if(!this.minimapCtx)return;let t=this.minimapCtx,e=this.ui.minimapCanvas.width,i=this.ui.minimapCanvas.height,s=e/260;if(t.clearRect(0,0,e,i),t.strokeStyle="rgba(239, 68, 68, 0.35)",t.lineWidth=1.5,t.beginPath(),t.arc(e/2,i/2,85*s,0,Math.PI*2),t.stroke(),this.terrain.rocks){t.fillStyle="rgba(180, 83, 9, 0.45)";for(let u=0;u<this.terrain.rocks.length;u++){let f=this.terrain.rocks[u],h=e/2+f.position.x*s,d=i/2-f.position.z*s;t.beginPath(),t.arc(h,d,Math.max(1.2,f.radius*s*.7),0,Math.PI*2),t.fill()}}let r=this.terrain.lander?this.terrain.lander.position.z:-16,a=e/2+0*s,o=i/2-r*s;t.fillStyle="#38bdf8",t.beginPath(),t.arc(a,o,4.5,0,Math.PI*2),t.fill(),t.strokeStyle="rgba(56, 189, 248, 0.35)",t.lineWidth=1,t.beginPath(),t.arc(a,o,8*s,0,Math.PI*2),t.stroke(),this.terrain.samples.forEach(u=>{let f=e/2+u.position.x*s,h=i/2-u.position.z*s;t.fillStyle=u.collected?"#64748b":"#"+u.color.toString(16).padStart(6,"0"),t.beginPath(),t.arc(f,h,u.collected?2.5:4.5,0,Math.PI*2),t.fill()});let l=e/2+this.hexapod.position.x*s,c=i/2-this.hexapod.position.z*s;t.save(),t.translate(l,c),t.rotate(this.hexapod.rotation.y),t.fillStyle="#f97316",t.beginPath(),t.moveTo(0,-7),t.lineTo(4,4),t.lineTo(-4,4),t.closePath(),t.fill(),t.restore()}updateWaypointMarkers(){if(!this.ui.waypointLayer||!this.camera)return;let t=this.hexapod.position,e=[];if(this.terrain&&this.terrain.samples&&this.terrain.samples.forEach(a=>{e.push({id:a.id,name:a.id.toUpperCase(),thaiName:a.thaiName,pos:a.position.clone().add(new R(0,2.4,0)),color:"#"+a.color.toString(16).padStart(6,"0"),collected:a.collected,type:"sample"})}),this.terrain&&this.terrain.lander){let a=this.collectedSamples.size===this.totalSamples;e.push({id:"lander",name:a?"\u{1F680} MAV EXTRACTION":"MAV BASE",thaiName:"\u0E22\u0E32\u0E19\u0E25\u0E07\u0E08\u0E2D\u0E14 MAV",pos:this.terrain.lander.position.clone().add(new R(0,3.8,0)),color:a?"#f97316":"#38bdf8",collected:this.missionComplete,type:"lander",isPrimary:a})}let i=window.innerWidth,s=window.innerHeight,r="";e.forEach(a=>{let o=Math.round(t.distanceTo(a.pos)),l=document.getElementById(`wp-dist-${a.id}`),c=document.getElementById(`wp-chip-${a.id}`);if(l&&(a.collected?(l.textContent="\u2713",c&&c.classList.add("collected")):(l.textContent=`${o}m`,c&&c.classList.remove("collected"))),c&&c.classList.toggle("primary-pulse",!!a.isPrimary&&!a.collected),a.collected&&!a.isPrimary)return;let u=a.pos.clone().project(this.camera),f=u.z>1,h=(u.x*.5+.5)*i,d=(-(u.y*.5)+.5)*s,g=36;if(f||h<g||h>i-g||d<g||d>s-g){let p=h-i/2,m=d-s/2;f&&(p=-p,m=-m);let M=Math.atan2(m,p),E=(i/2-g)*Math.cos(M),v=(s/2-g)*Math.sin(M);h=i/2+E,d=s/2+v;let w=Math.round(M*(180/Math.PI));r+=`
          <div class="waypoint-pin edge ${a.isPrimary?"primary":""}" style="left: ${h.toFixed(0)}px; top: ${d.toFixed(0)}px; --accent: ${a.color};">
            <span class="wp-pin-arrow" style="transform: rotate(${w}deg);">\u27A4</span>
            <span class="wp-pin-badge">${a.name} ${o}m</span>
          </div>
        `}else r+=`
          <div class="waypoint-pin in-screen ${a.isPrimary?"primary":""}" style="left: ${h.toFixed(0)}px; top: ${d.toFixed(0)}px; --accent: ${a.color};">
            <div class="wp-pin-dot"></div>
            <div class="wp-pin-label">
              <span class="wp-pin-title">${a.name}</span>
              <span class="wp-pin-meters">${o}m</span>
            </div>
          </div>
        `}),this.ui.waypointLayer.innerHTML=r}updateCamera(){this.camAzimuth+=(this.targetCamAzimuth-this.camAzimuth)*.12,this.camElevation+=(this.targetCamElevation-this.camElevation)*.12,this.camDistance+=(this.targetCamDistance-this.camDistance)*.15;let t=Math.hypot(this.currentSpeed,this.currentTurnRate*1.5),e=Math.min(1,t/this.moveSpeed),s=(this.cameraMode==="mast-cam"?62:this.cameraMode==="top-down"?50:55)+e*3.8;this.camera.fov+=(s-this.camera.fov)*.08,this.camera.updateProjectionMatrix();let r=this.hexapod.position.clone().add(new R(0,.95,0));if(this.cameraMode==="orbit-follow"){let o=this.hexapod.rotation.y+this.camAzimuth,l=this.camDistance*Math.cos(this.camElevation),c=this.camDistance*Math.sin(this.camElevation),u=-Math.sin(o)*l,f=-Math.cos(o)*l,h=this.leveler?this.leveler.currentPitch:0,d=Math.max(0,-h*.85),g=Math.max(.6,c+d),y=r.clone().add(new R(u,g,f)),p=this.terrain.getHeight(y.x,y.z)+1.15;y.y<p&&(y.y=p),this.camera.position.lerp(y,.12),this.camera.lookAt(r)}else if(this.cameraMode==="top-down"){let a=Math.max(18,this.camDistance*2.2),o=this.hexapod.rotation.y,l=this.hexapod.position.clone().add(new R(-Math.sin(o)*1.5,a,-Math.cos(o)*1.5));this.camera.position.lerp(l,.12),this.camera.lookAt(r)}else if(this.cameraMode==="mast-cam"){let a=this.hexapod.rotation.y,o=new R(Math.sin(a),0,Math.cos(a)),l=this.hexapod.position.clone().add(new R(o.x*.45,1.35,o.z*.45)),c=l.clone().add(new R(o.x*12,-.9,o.z*12));this.camera.position.lerp(l,.25),this.camera.lookAt(c)}else if(this.cameraMode==="inspect"){let a=r.clone().sub(this.orbitControls.target);this.camera.position.add(a),this.orbitControls.target.copy(r),this.orbitControls.update()}}animate(){requestAnimationFrame(this.animate);let t=Math.min(this.clock.getDelta(),.1),e=this.clock.getElapsedTime();if(this.updateRoverPhysics(t),this.gait&&this.hexapod){this.gait.update(t,this.currentSpeed,this.currentTurnRate);let i=[];if(this.hexapod.legs.forEach(s=>{s.isGrounded&&i.push(s.worldFootPos.clone())}),this.leveler.update(i,this.gait.bodyHeight),this.supportPolygon){let s=this.terrain.getNormal(this.hexapod.position.x,this.hexapod.position.z),r=Math.acos(Math.max(0,Math.min(1,s.y)))*(180/Math.PI),a=this.supportPolygon.update(i,this.hexapod.position,this.gait.mode,r),o=document.getElementById("gait-telemetry-contacts"),l=document.getElementById("gait-telemetry-area"),c=document.getElementById("gait-telemetry-margin");o&&(o.textContent=`${a.contactCount}/6`),l&&(l.textContent=`${a.area.toFixed(2)} m\xB2`),c&&(c.textContent=`${a.stabilityMargin.toFixed(2)} m`)}}this.dust&&this.dust.update(t),this.updateLevelerTrial(t),this.terrain.update(e),this.checkMissions(),this.updateCamera(),this.updateHUD(),this.updateWaypointMarkers(),this.sunLight&&(this.sunLight.target.position.copy(this.hexapod.position),this.sunLight.target.updateMatrixWorld()),this.renderer.render(this.scene,this.camera)}};window.addEventListener("DOMContentLoaded",()=>{new oc});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
