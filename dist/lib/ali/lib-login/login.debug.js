;(function(win, lib, undef){
var Promise = win.Promise;
var doc = win.document;
var ua = win.navigator.userAgent;
var hostname = location.hostname;
var search = win.location.search;
var isAliApp = lib.env.aliapp;
var isPoplayer = lib.env.aliapp && lib.env.aliapp.poplayer;
var loginPrefix = 'liblogin'

var SUPPORT_HOST = [
    'taobao.net',
    'taobao.com'
];
var HOST_REGEXP = new RegExp('([^.]*?)\\.?((?:' + SUPPORT_HOST.join(')|(?:').replace(/\./g, '\\.') + '))', 'i');
var matchedHost = hostname.match(HOST_REGEXP) || [];
var MAIN_DOMAIN = (function(){
    var host = matchedHost[2] || 'taobao.com';
    if (host.match(/\.?taobao\.net$/)) {
        return 'taobao.net';
    } else {
        return 'taobao.com';
    }
})();
var SUB_DOMAIN = (function(){    
    var host = MAIN_DOMAIN;
    var type = matchedHost[1] || 'm';
    if (host === 'taobao.net') {
        type = 'waptest';
    }
    if (type != 'm' && type != 'wapa' && type != 'waptest') {
        type = 'm'
    }
    return type;
})();
var PREFIX = 'login';

/**
 * @namespace lib
 */
/**
 * @namespace login
 * @memberof lib
 */
lib.login = lib.login || {};

/**
 * @member config
 * @memberof lib.login
 * @property {String} loginName - 登录页面的地址
 * @property {String} logoutName - 注销页面的地址
 * @property {String} subDomain - 二级域名
 */
var config = {
    loginName: 'login.htm',
    logoutName: 'logout.htm',
    subDomain: SUB_DOMAIN
};
lib.login.config = config;

function readCookie(name) {
    var matched = new RegExp('(?:^|;\\s*)' + name + '\\=([^;]+)(?:;\\s*|$)').exec(doc.cookie);
    if (matched) {
        return matched[1];
    } else {
        return undef;
    }
}

function preventMove(e) {
    e.preventDefault();
    return false;
}

function FrameWidget(text, url) {
    var that = this;
    var dpr = win.dpr || 1;
    var widget = document.createElement('div');
    var rect = document.documentElement.getBoundingClientRect();
    var width = Math.max(rect.width, window.innerWidth) / dpr;
    var height = Math.max(rect.height, window.innerHeight) / dpr;
    

    widget.style.cssText = [
        '-webkit-transform:scale(' + dpr + ') translateZ(0)',
        '-ms-transform:scale(' + dpr + ') translateZ(0)',
        'transform:scale(' + dpr + ') translateZ(0)',
        '-webkit-transform-origin:0 0',
        '-ms-transform-origin:0 0',
        'transform-origin:0 0',
        'width:' + width + 'px',
        'height:' + height + 'px',
        'z-index:999999',
        'position:absolute',
        'left:0',
        'top:0px',
        'background:#FFF',
        'display:none'
    ].join(';');

    var title = document.createElement('div');
    title.style.cssText = [
        'width:100%',
        'height:' + 52 + 'px',
        'background:#EEE',
        'line-height:' + 52 + 'px',
        'text-align:left',
        'box-sizing:border-box',
        'padding-left:' + 20 + 'px',
        'position:absolute',
        'left:0',
        'top:0',
        'font-size:' + 16 + 'px',
        'font-weight:bold',
        'color:#333'
    ].join(';');
    title.innerText = text;

    var close = document.createElement('a');
    close.style.cssText = [
        'display:block',
        'position:absolute',
        'right:0',
        'top:0',
        'height:' + 52 + 'px',
        'line-height:' + 52 + 'px',
        'padding:0 ' + 20 + 'px',
        'color:#999'
    ].join(';');
    close.innerText = '关闭';

    var content = document.createElement('iframe');
    content.style.cssText = [
        'width:100%',
        'height:' + window.innerHeight / dpr + 'px',
        'border:0',
        'overflow:hidden'
    ].join(';');

    title.appendChild(close);
    widget.appendChild(title);
    widget.appendChild(content);
    doc.body.appendChild(widget);

    content.src = url;

    close.addEventListener('click', function() {
        that.hide();

        var ev = doc.createEvent('HTMLEvents');
        ev.initEvent('close', false, false);
        widget.dispatchEvent(ev);
    }, false);

    this.addEventListener = function() {
        widget.addEventListener.apply(widget, arguments);
    }

    this.removeEventListener = function() {
        widget.removeEventListener.apply(widget, arguments);
    }

    this.show = function() {
        document.addEventListener('touchmove', preventMove, false);
        widget.style.display = 'block';
        window.scrollTo(0, 0);
    }

    this.hide = function() {
        document.removeEventListener('touchmove', preventMove);
        window.scrollTo(0, -rect.top);
        doc.body.removeChild(widget);
    }
}

/**
 * 检查是否登录
 * @function
 * @return {Boolean} 是否登录
 * @memberof lib.login 
 */
function isLogin(callback) {
    if (callback && typeof callback === 'function' && lib.mtop) {
        lib.mtop.request({
            api: 'mtop.user.getUserSimple',
            v: '1.0',
            data : {},
            ecode: 1,
            sessionOption: 'AutoLoginOnly',
            jsonpIncPrefix: loginPrefix
        }, function(json) {
            if (json.retType === lib.mtop.RESPONSE_TYPE.SUCCESS) {
                callback(true, json);
            } else if (json.retType === lib.mtop.RESPONSE_TYPE.SESSION_EXPIRED) {
                callback(false, json);
            } else {
                callback(undef, json);
            }
        });
    } else {
        var nick = this.getUserNick();
        return !!nick
    }
}
lib.login.isLogin = isLogin;

/**
 * 是否登录的回调
 * @callback loginCallback
 * @param {Boolean} status - 是否登录的状态
 * @param {Object} profile - 当前登录用户的信息
 */

/**
 * 异步检查是否登录
 * @function
 * @param {loginCallback} [callback] - 回调函数
 * @return {Promise} Promise实例
 * @memberof lib.login 
 */
function isLoginAsync(callback) {
    var deferred;

    if (Promise) {
        deferred = {};
        deferred.promise = new Promise(function(resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
    }

    this.isLogin(function(status, profile) {
        callback && callback(status, profile);
        if (status === true) {
            deferred && deferred.resolve(profile);
        } else {
            deferred && deferred.reject(profile);
        }
    });

    if (deferred) {
        return deferred.promise;
    }
}
lib.login.isLoginAsync = isLoginAsync;

/**
 * 获得用户昵称
 * @function
 * @return {String} 用户昵称 
 * @memberof lib.login 
 */
function getUserNick(callback) {
    if (callback && typeof callback === 'function') {
        this.isLogin(function(is, json) {
            if (is === true && json && json.data && json.data.nick) {
                callback(json.data.nick);
            } else if (is === false){
                callback('');
            } else {
                callback(undef);
            }
        });
    } else {
        var nick = '';
        var wapnick = readCookie('_w_tb_nick');  // 原先wap登录的cookie
        var tbnick = readCookie('_nk_') || readCookie('snk'); // pc登录的cookie
        var subnick = readCookie('sn');  // 子帐号登录的cookie
        if (wapnick && wapnick.length > 0 && wapnick != 'null') {
            nick = decodeURIComponent(wapnick); // 中文会encode，需要decode
        } else if (tbnick && tbnick.length > 0 && tbnick != 'null'){
            nick = unescape(unescape(tbnick).replace(/\\u/g, '%u'));
        } else if (subnick && subnick.length > 0 && subnick != 'null') {
            nick = decodeURIComponent(subnick);
        }
        nick = nick.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
        return nick;
    }
}
lib.login.getUserNick = getUserNick;

/**
 * 异步获得用户昵称
 * @function
 * @param {Function} [callback] - 回调函数
 * @return {Promise} Promise实例
 * @memberof lib.login 
 */
function getUserNickAsync(callback) {
    var deferred;

    if (Promise) {
        deferred = {};
        deferred.promise = new Promise(function(resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
    }

    this.getUserNick(function(nick) {
        callback && callback(nick);
        if (!!nick) {
            deferred && deferred.resolve(nick);    
        } else {
            deferred && deferred.reject();
        }
        
    });

    if (deferred) {
        return deferred.promise;
    }
}
lib.login.getUserNickAsync = getUserNickAsync;


/**
 * 获得登录/注销地址
 * @function
 * @param {String} type - login或logout类型
 * @param {Object} param - 需要透传的参数
 * @return {String} 生成的地址
 * @memberof lib.login 
 */
function generateUrl(type, params) {
    var url = '//' + 
            PREFIX  + '.' + 
            config.subDomain + '.' +
            MAIN_DOMAIN +
            '/' + config[(type || 'login') + 'Name'];

    if (params) {
        var qs = [];
        for (var key in params) {
            qs.push(key + '=' + encodeURIComponent(params[key]));
        }
        url += '?' + qs.join('&');
    }
    var configParams = lib.login.config.loginUrlParams;
    if (configParams) {
        var configQs = []
        for (var configKey in configParams) {
            configQs.push(configKey + '=' + encodeURIComponent(configParams[configKey]));
        }
        if (/\?/.test(url)) {
            url += '&' + configQs.join('&');
        } else {
            url += '?' + qs.join('&');
        }
    }
    return url;
}
lib.login.generateUrl = generateUrl;


function redirect(url, isReplace) {
    if (isReplace) {
        location.replace(url);
    } else if (isPoplayer && lib.env.os.isAndroid) {
        lib.windvane.call('WVPopLayer', 'navToUrl', {
            url: url
        });
    } else {
        location.href = url;
    }
}

function widget(type, options, callback) {
    var redirectUrl = location.protocol + '//h5.' + config.subDomain + 
            '.taobao.com/' + (config.subDomain === 'waptest'?'src':'other') + '/' + type + 'end.html?origin=' + 
            encodeURIComponent(location.protocol + '//' + location.hostname);

    var url = generateUrl(type, {
        ttid: 'h5@iframe',
        redirectURL: redirectUrl,
    });

    var widget = new FrameWidget(options.title || '您需要登录才能继续访问', url);

    function closeHandler(e) {
        widget.removeEventListener('close', closeHandler);
        win.removeEventListener('message', messageHandler);
        callback('CANCEL');
    }

    function messageHandler(e) {
        var data = e.data || {};
        if (data && data.type === 'child' && data.content.indexOf('SUCCESS') > -1) {
            widget.removeEventListener('close', closeHandler);
            win.removeEventListener('message', messageHandler);
            widget.hide();
            callback('SUCCESS');
        } else {
            callback('FAILURE');
        }
    }

    widget.addEventListener('close', closeHandler, false);

    win.addEventListener('message', messageHandler, false);

    widget.show();
}

function native(type, options, callback) {
    var url = generateUrl(type, {
        wvLoginCallback: 'wvLoginCallback'
    });

    win['wvLoginCallback'] = function(ret) {
        delete win['wvLoginCallback'];

        if (ret.indexOf(':SUCCESS') > -1) {
            callback('SUCCESS');
        } else if (ret.indexOf(':CANCEL') > -1) {
            callback('CANCEL');
        } else {
            callback('FAILURE');
        }
    }

    redirect(url);
}

function go(type, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    } else if (typeof options === 'string') {
        options = {redirectUrl: options};
    }

    options = options || {};

    if (callback && (isAliApp && options.forceNative)) { // 在手淘里App或设置了强制用native
        native(type, options, callback);
    } else if (callback && !isAliApp && type === 'login') { // 有回调且不在阿里系客户端里，且发起的是异步登录，则用iframe弹窗
        widget(type, options, callback);
    } else { // 其余情况都直接跳转
        var url = generateUrl(type, {
            redirectURL: options.redirectUrl || location.href
        });
        redirect(url, options.replace);
    }
}

function goAsync(type, options, callback) {
    var deferred;

    if (Promise) {
        deferred = {};
        deferred.promise = new Promise(function(resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
    }

    go(type, options, function(status) {
        callback && callback(status);
        if (status === 'SUCCESS') {
            deferred && deferred.resolve(status);
        } else {
            deferred && deferred.reject(status);
        }
    });

    if (deferred) {
        return deferred.promise;
    }
}

/**
 * 跳转登录页面
 * @function
 * @param {String} [url=当前页面地址] - 登录成功后跳转的页面
 * @param 
 * @memberof lib.login 
 */
function goLogin(url) {
    go('login', url);
}
lib.login.goLogin = goLogin;

/**
 * 异步登录
 * @function
 * @param {Function} [callback] - 回调函数
 * @param {Boolean} [forceNative=true] - 强制使用windvane的登录方式（默认为true）
 * @return {Promise} Promise实例
 * @memberof lib.login 
 */
function goLoginAsync(callback, forceNative) {
    if (typeof callback === 'boolean') {
        forceNative = callback;
        callback = null;
    }

    if (forceNative === undefined) {
        forceNative = true;
    }

    return goAsync('login', {
        forceNative: forceNative
    }, callback);
}
lib.login.goLoginAsync = goLoginAsync;

/**
 * 跳转注销页面
 * @function
 * @param {String} [url=当前页面地址] - 注销成功后跳转的页面
 * @memberof lib.login 
 */
function goLogout(url) {
    go('logout', url);
}
lib.login.goLogout = goLogout;

/**
 * 异步注销
 * @function
 * @param {Function} [callbacak] - 回调函数
 * @param {Boolean} [forceNative=false] - 强制使用windvane的登录方式
 * @return {Promise} Promise实例
 * @memberof lib.login 
 */
function goLogoutAsync(callback, forceNative) {
    if (typeof callback === 'boolean') {
        forceNative = callback;
        callback = null;
    }

    return goAsync('logout', {
        forceNative: forceNative
    }, callback);
}
lib.login.goLogoutAsync = goLogoutAsync;
})(window, window['lib'] || (window['lib'] = {}));