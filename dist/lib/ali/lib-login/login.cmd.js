!function(a,b,c){function d(a){var b=new RegExp("(?:^|;\\s*)"+a+"\\=([^;]+)(?:;\\s*|$)").exec(v.cookie);return b?b[1]:c}function e(a){return a.preventDefault(),!1}function f(b,c){var d=this,f=a.dpr||1,g=document.createElement("div"),h=document.documentElement.getBoundingClientRect(),i=Math.max(h.width,window.innerWidth)/f,j=Math.max(h.height,window.innerHeight)/f;g.style.cssText=["-webkit-transform:scale("+f+") translateZ(0)","-ms-transform:scale("+f+") translateZ(0)","transform:scale("+f+") translateZ(0)","-webkit-transform-origin:0 0","-ms-transform-origin:0 0","transform-origin:0 0","width:"+i+"px","height:"+j+"px","z-index:999999","position:absolute","left:0","top:0px","background:#FFF","display:none"].join(";");var k=document.createElement("div");k.style.cssText=["width:100%","height:52px","background:#EEE","line-height:52px","text-align:left","box-sizing:border-box","padding-left:20px","position:absolute","left:0","top:0","font-size:16px","font-weight:bold","color:#333"].join(";"),k.innerText=b;var l=document.createElement("a");l.style.cssText=["display:block","position:absolute","right:0","top:0","height:52px","line-height:52px","padding:0 20px","color:#999"].join(";"),l.innerText="关闭";var m=document.createElement("iframe");m.style.cssText=["width:100%","height:"+window.innerHeight/f+"px","border:0","overflow:hidden"].join(";"),k.appendChild(l),g.appendChild(k),g.appendChild(m),v.body.appendChild(g),m.src=c,l.addEventListener("click",function(){d.hide();var a=v.createEvent("HTMLEvents");a.initEvent("close",!1,!1),g.dispatchEvent(a)},!1),this.addEventListener=function(){g.addEventListener.apply(g,arguments)},this.removeEventListener=function(){g.removeEventListener.apply(g,arguments)},this.show=function(){document.addEventListener("touchmove",e,!1),g.style.display="block",window.scrollTo(0,0)},this.hide=function(){document.removeEventListener("touchmove",e),window.scrollTo(0,-h.top),v.body.removeChild(g)}}function g(a){if(!a||"function"!=typeof a||!b.mtop){var d=this.getUserNick();return!!d}b.mtop.request({api:"mtop.user.getUserSimple",v:"1.0",data:{},ecode:1,sessionOption:"AutoLoginOnly",jsonpIncPrefix:z},function(d){d.retType===b.mtop.RESPONSE_TYPE.SUCCESS?a(!0,d):d.retType===b.mtop.RESPONSE_TYPE.SESSION_EXPIRED?a(!1,d):a(c,d)})}function h(a){var b;return u&&(b={},b.promise=new u(function(a,c){b.resolve=a,b.reject=c})),this.isLogin(function(c,d){a&&a(c,d),c===!0?b&&b.resolve(d):b&&b.reject(d)}),b?b.promise:void 0}function i(a){if(!a||"function"!=typeof a){var b="",e=d("_w_tb_nick"),f=d("_nk_")||d("snk"),g=d("sn");return e&&e.length>0&&"null"!=e?b=decodeURIComponent(e):f&&f.length>0&&"null"!=f?b=unescape(unescape(f).replace(/\\u/g,"%u")):g&&g.length>0&&"null"!=g&&(b=decodeURIComponent(g)),b=b.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")}this.isLogin(function(b,d){a(b===!0&&d&&d.data&&d.data.nick?d.data.nick:b===!1?"":c)})}function j(a){var b;return u&&(b={},b.promise=new u(function(a,c){b.resolve=a,b.reject=c})),this.getUserNick(function(c){a&&a(c),c?b&&b.resolve(c):b&&b.reject()}),b?b.promise:void 0}function k(a,c){var d="//"+F+"."+G.subDomain+"."+D+"/"+G[(a||"login")+"Name"];if(c){var e=[];for(var f in c)e.push(f+"="+encodeURIComponent(c[f]));d+="?"+e.join("&")}var g=b.login.config.loginUrlParams;if(g){var h=[];for(var i in g)h.push(i+"="+encodeURIComponent(g[i]));d+=/\?/.test(d)?"&"+h.join("&"):"?"+e.join("&")}return d}function l(a,c){c?location.replace(a):y&&b.env.os.isAndroid?b.windvane.call("WVPopLayer","navToUrl",{url:a}):location.href=a}function m(b,c,d){function e(){j.removeEventListener("close",e),a.removeEventListener("message",g),d("CANCEL")}function g(b){var c=b.data||{};c&&"child"===c.type&&c.content.indexOf("SUCCESS")>-1?(j.removeEventListener("close",e),a.removeEventListener("message",g),j.hide(),d("SUCCESS")):d("FAILURE")}var h=location.protocol+"//h5."+G.subDomain+".taobao.com/"+("waptest"===G.subDomain?"src":"other")+"/"+b+"end.html?origin="+encodeURIComponent(location.protocol+"//"+location.hostname),i=k(b,{ttid:"h5@iframe",redirectURL:h}),j=new f(c.title||"您需要登录才能继续访问",i);j.addEventListener("close",e,!1),a.addEventListener("message",g,!1),j.show()}function n(b,c,d){var e=k(b,{wvLoginCallback:"wvLoginCallback"});a.wvLoginCallback=function(b){delete a.wvLoginCallback,d(b.indexOf(":SUCCESS")>-1?"SUCCESS":b.indexOf(":CANCEL")>-1?"CANCEL":"FAILURE")},l(e)}function o(a,b,c){if("function"==typeof b?(c=b,b=null):"string"==typeof b&&(b={redirectUrl:b}),b=b||{},c&&x&&b.forceNative)n(a,b,c);else if(c&&!x&&"login"===a)m(a,b,c);else{var d=k(a,{redirectURL:b.redirectUrl||location.href});l(d,b.replace)}}function p(a,b,c){var d;return u&&(d={},d.promise=new u(function(a,b){d.resolve=a,d.reject=b})),o(a,b,function(a){c&&c(a),"SUCCESS"===a?d&&d.resolve(a):d&&d.reject(a)}),d?d.promise:void 0}function q(a){o("login",a)}function r(a,b){return"boolean"==typeof a&&(b=a,a=null),void 0===b&&(b=!0),p("login",{forceNative:b},a)}function s(a){o("logout",a)}function t(a,b){return"boolean"==typeof a&&(b=a,a=null),p("logout",{forceNative:b},a)}var u=a.Promise,v=a.document,w=(a.navigator.userAgent,location.hostname),x=(a.location.search,b.env.aliapp),y=b.env.aliapp&&b.env.aliapp.poplayer,z="liblogin",A=["taobao.net","taobao.com"],B=new RegExp("([^.]*?)\\.?((?:"+A.join(")|(?:").replace(/\./g,"\\.")+"))","i"),C=w.match(B)||[],D=function(){var a=C[2]||"taobao.com";return a.match(/\.?taobao\.net$/)?"taobao.net":"taobao.com"}(),E=function(){var a=D,b=C[1]||"m";return"taobao.net"===a&&(b="waptest"),"m"!=b&&"wapa"!=b&&"waptest"!=b&&(b="m"),b}(),F="login";b.login=b.login||{};var G={loginName:"login.htm",logoutName:"logout.htm",subDomain:E};b.login.config=G,b.login.isLogin=g,b.login.isLoginAsync=h,b.login.getUserNick=i,b.login.getUserNickAsync=j,b.login.generateUrl=k,b.login.goLogin=q,b.login.goLoginAsync=r,b.login.goLogout=s,b.login.goLogoutAsync=t}(window,window.lib||(window.lib={}));
if (window.KISSY) {KISSY.add('mtb/@ali/lib-login/1.7.3/login.cmd',function() {return window.@ali/lib.login;},{requries:[]});} else if ('undefined' !== typeof define) {define('mtb/@ali/lib-login/1.7.3/login.cmd', [], function(require){return window.@ali/lib.login;});}