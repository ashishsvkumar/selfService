(function(win, lib) {
    var Promise = win.Promise;
    var ready = (Promise || {
        resolve: function() {
            return undefined;
        }
    }).resolve();
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        };
    }
    function defer() {
        var deferred = {};
        var promise = new Promise(function(resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        deferred.promise = promise;
        return deferred;
    }
    function defaults(params, defaultParams) {
        for (var key in defaultParams) {
            if (params[key] === undefined) {
                params[key] = defaultParams[key];
            }
        }
        return params;
    }
    function appendScript(script) {
        var el = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0] || document.firstElementChild || document;
        el.appendChild(script);
    }
    function stringifyQS(qs) {
        var str = [];
        for (var key in qs) {
            if (!!qs[key]) {
                str.push(key + "=" + encodeURIComponent(qs[key]));
            }
        }
        return str.join("&");
    }
    function getMainDomain(hostName) {
        try {
            if (hostName.toLowerCase().indexOf("lazada") > -1 && hostName.substring(hostName.lastIndexOf(".")) !== ".com") {
                if ((hostName.split(".") || []).length <= 3) {
                    return hostName;
                } else {
                    return hostName.split(".").slice(1).join(".");
                }
            } else {
                return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
            }
        } catch (e) {
            return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
        }
    }
    function md5(string) {
        function rotateLeft(lValue, iShiftBits) {
            return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
        }
        function addUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = lX & 2147483648;
            lY8 = lY & 2147483648;
            lX4 = lX & 1073741824;
            lY4 = lY & 1073741824;
            lResult = (lX & 1073741823) + (lY & 1073741823);
            if (lX4 & lY4) {
                return lResult ^ 2147483648 ^ lX8 ^ lY8;
            }
            if (lX4 | lY4) {
                if (lResult & 1073741824) {
                    return lResult ^ 3221225472 ^ lX8 ^ lY8;
                } else {
                    return lResult ^ 1073741824 ^ lX8 ^ lY8;
                }
            } else {
                return lResult ^ lX8 ^ lY8;
            }
        }
        function f(x, y, z) {
            return x & y | ~x & z;
        }
        function g(x, y, z) {
            return x & z | y & ~z;
        }
        function h(x, y, z) {
            return x ^ y ^ z;
        }
        function i(x, y, z) {
            return y ^ (x | ~z);
        }
        function FF(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        function GG(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        function HH(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        function II(a, b, c, d, x, s, ac) {
            a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);
        }
        function convertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = new Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - lByteCount % 4) / 4;
                lBytePosition = lByteCount % 4 * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
                lByteCount++;
            }
            lWordCount = (lByteCount - lByteCount % 4) / 4;
            lBytePosition = lByteCount % 4 * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }
        function wordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = lValue >>> lCount * 8 & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        }
        function utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if (c > 127 && c < 2048) {
                    utftext += String.fromCharCode(c >> 6 | 192);
                    utftext += String.fromCharCode(c & 63 | 128);
                } else {
                    utftext += String.fromCharCode(c >> 12 | 224);
                    utftext += String.fromCharCode(c >> 6 & 63 | 128);
                    utftext += String.fromCharCode(c & 63 | 128);
                }
            }
            return utftext;
        }
        var x = [], k, AA, BB, CC, DD, a, b, c, d, S11 = 7, S12 = 12, S13 = 17, S14 = 22, S21 = 5, S22 = 9, S23 = 14, S24 = 20, S31 = 4, S32 = 11, S33 = 16, S34 = 23, S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        string = utf8Encode(string);
        x = convertToWordArray(string);
        a = 1732584193;
        b = 4023233417;
        c = 2562383102;
        d = 271733878;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
            d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
            c = FF(c, d, a, b, x[k + 2], S13, 606105819);
            b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
            a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
            d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
            c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
            b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
            a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
            d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
            c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
            b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
            a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
            d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
            c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
            b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
            a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
            d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
            c = GG(c, d, a, b, x[k + 11], S23, 643717713);
            b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
            a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
            d = GG(d, a, b, c, x[k + 10], S22, 38016083);
            c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
            b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
            a = GG(a, b, c, d, x[k + 9], S21, 568446438);
            d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
            c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
            b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
            a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
            d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
            c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
            b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
            a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
            d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
            c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
            b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
            a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
            d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
            c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
            b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
            a = HH(a, b, c, d, x[k + 13], S31, 681279174);
            d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
            c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
            b = HH(b, c, d, a, x[k + 6], S34, 76029189);
            a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
            d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
            c = HH(c, d, a, b, x[k + 15], S33, 530742520);
            b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
            a = II(a, b, c, d, x[k + 0], S41, 4096336452);
            d = II(d, a, b, c, x[k + 7], S42, 1126891415);
            c = II(c, d, a, b, x[k + 14], S43, 2878612391);
            b = II(b, c, d, a, x[k + 5], S44, 4237533241);
            a = II(a, b, c, d, x[k + 12], S41, 1700485571);
            d = II(d, a, b, c, x[k + 3], S42, 2399980690);
            c = II(c, d, a, b, x[k + 10], S43, 4293915773);
            b = II(b, c, d, a, x[k + 1], S44, 2240044497);
            a = II(a, b, c, d, x[k + 8], S41, 1873313359);
            d = II(d, a, b, c, x[k + 15], S42, 4264355552);
            c = II(c, d, a, b, x[k + 6], S43, 2734768916);
            b = II(b, c, d, a, x[k + 13], S44, 1309151649);
            a = II(a, b, c, d, x[k + 4], S41, 4149444226);
            d = II(d, a, b, c, x[k + 11], S42, 3174756917);
            c = II(c, d, a, b, x[k + 2], S43, 718787259);
            b = II(b, c, d, a, x[k + 9], S44, 3951481745);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }
        var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
        return temp.toLowerCase();
    }
    function isObject(obj) {
        return {}.toString.call(obj) == "[object Object]";
    }
    function setCookie(name, value, options) {
        var opts = options || {};
        document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent).replace("(", "%28").replace(")", "%29") + "=" + value.replace(/[^+#$&\/:<-\[\]-}]/g, encodeURIComponent) + (opts.domain ? ";domain=" + opts.domain : "") + (opts.path ? ";path=" + opts.path : "") + (opts.secure ? ";secure" : "") + (opts.httponly ? ";HttpOnly" : "");
    }
    function readCookie(name) {
        var matched = new RegExp("(?:^|;\\s*)" + name + "\\=([^;]+)(?:;\\s*|$)").exec(document.cookie);
        if (matched) {
            return matched[1];
        }
    }
    function delCookie(name, mainDomain, subDomain) {
        var now = new Date();
        now.setTime(now.getTime() - 86400 * 1e3);
        var path = "/";
        document.cookie = name + "=;path=" + path + ";domain=." + mainDomain + ";expires=" + now.toGMTString();
        document.cookie = name + "=;path=" + path + ";domain=." + subDomain + "." + mainDomain + ";expires=" + now.toGMTString();
    }
    var globalConfig = {
        useJsonpResultType: false,
        safariGoLogin: true,
        useAlipayJSBridge: false
    };
    var middlewares = [];
    var RESPONSE_TYPE = {
        ERROR: -1,
        SUCCESS: 0,
        TOKEN_EXPIRED: 1,
        SESSION_EXPIRED: 2
    };
    function parseDomainEnv() {
        var hostname = win.location.hostname;
        if (!hostname) {
            var parentHost = win.parent.location.hostname;
            if (parentHost && ~parentHost.indexOf("zebra.alibaba-inc.com")) {
                hostname = parentHost;
            }
        }
        var hosts = [ "taobao.net", "taobao.com", "tmall.com", "tmall.hk", "alibaba-inc.com" ];
        var regexp = new RegExp("([^.]*?)\\.?((?:" + hosts.join(")|(?:").replace(/\./g, "\\.") + "))", "i");
        var matched = hostname.match(regexp) || [];
        var mainDomain = matched[2] || "taobao.com";
        var subDomain = matched[1] || "m";
        if (mainDomain === "taobao.net" && (subDomain === "x" || subDomain === "waptest" || subDomain === "daily")) {
            subDomain = "waptest";
        } else if (mainDomain === "taobao.net" && subDomain === "demo") {
            subDomain = "demo";
        } else if (mainDomain === "alibaba-inc.com" && subDomain === "zebra") {
            subDomain = "zebra";
        } else if (subDomain !== "waptest" && subDomain !== "wapa" && subDomain !== "m") {
            subDomain = "m";
        }
        var prefix = "h5api";
        if (mainDomain === "taobao.net" && subDomain === "waptest") {
            prefix = "acs";
        }
        globalConfig.mainDomain = mainDomain;
        globalConfig.subDomain = subDomain;
        globalConfig.prefix = prefix;
    }
    parseDomainEnv();
    function parseNativeEnv() {
        var ua = win.navigator.userAgent;
        var WindVaneVersion = ua.match(/WindVane[\/\s]([\d\.\_]+)/);
        if (WindVaneVersion) {
            globalConfig.WindVaneVersion = WindVaneVersion[1];
        }
        var AliApp = ua.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i);
        if (AliApp) {
            globalConfig.AliAppName = AliApp[1];
            globalConfig.AliAppVersion = AliApp[2];
        }
    }
    parseNativeEnv();
    var isAlipay = globalConfig.AliAppName === "AP" && parseFloat(globalConfig.AliAppVersion) >= 10.1;
    if (isAlipay && parseFloat(globalConfig.AliAppVersion) === 10.1 && parseInt(globalConfig.AliAppVersion.substr(5)) < 2) {
        isAlipay = false;
    }
    var mtopInc = 0;
    var mtopVersion = "2.5.0";
    function Mtop(params) {
        this.id = "" + new Date().getTime() + ++mtopInc;
        this.params = defaults(params || {}, {
            v: "*",
            data: {},
            type: "get",
            dataType: "jsonp"
        });
        this.params.type = this.params.type.toLowerCase();
        if (typeof this.params.data === "object") {
            this.params.data = JSON.stringify(this.params.data);
        }
        this.middlewares = middlewares.slice(0);
    }
    Mtop.prototype.use = function(middleware) {
        if (!middleware) {
            throw new Error("middleware is undefined");
        }
        this.middlewares.push(middleware);
        return this;
    };
    Mtop.prototype.__processRequestMethod = function(next) {
        var params = this.params;
        var options = this.options;
        if (params.type === "get" && params.dataType === "jsonp") {
            options.getJSONP = true;
        } else if (params.type === "get" && params.dataType === "originaljsonp") {
            options.getOriginalJSONP = true;
        } else if (params.type === "get" && params.dataType === "json") {
            options.getJSON = true;
        } else if (params.type === "post") {
            options.postJSON = true;
        }
        next();
    };
    Mtop.prototype.__processRequestType = function(next) {
        var that = this;
        var params = this.params;
        var options = this.options;
        if (globalConfig.H5Request === true) {
            options.H5Request = true;
        }
        if (globalConfig.WindVaneRequest === true) {
            options.WindVaneRequest = true;
        }
        if (options.H5Request === false && options.WindVaneRequest === true) {
            if (!isAlipay && (!lib.windvane || parseFloat(options.WindVaneVersion) < 5.4)) {
                throw new Error("WINDVANE_NOT_FOUND::缺少WindVane环境");
            }
            if (isAlipay && !win.AlipayJSBridge) {
                throw new Error("ALIPAY_NOT_READY::支付宝通道未准备好，支付宝请见 https://lark.alipay.com/mtbsdkdocs/mtopjssdkdocs/pucq6z");
            }
        } else if (options.H5Request === true) {
            options.WindVaneRequest = false;
        } else if (typeof options.WindVaneRequest === "undefined" && typeof options.H5Request === "undefined") {
            if (lib.windvane && parseFloat(options.WindVaneVersion) >= 5.4) {
                options.WindVaneRequest = true;
                if (window.self !== window.top) {
                    options.H5Request = true;
                }
            } else {
                options.H5Request = true;
            }
            if (isAlipay) {
                options.WindVaneRequest = options.H5Request = undefined;
                if (!win.AlipayJSBridge) {
                    options.H5Request = true;
                } else if (!isObject(params.data)) {
                    try {
                        if (isObject(JSON.parse(params.data))) {
                            options.WindVaneRequest = true;
                        } else {
                            options.H5Request = true;
                        }
                    } catch (e) {
                        options.H5Request = true;
                    }
                } else {
                    options.WindVaneRequest = true;
                }
            }
        }
        var ua = win.navigator.userAgent.toLowerCase();
        if (ua.indexOf("youku") > -1 && options.mainDomain.indexOf("youku.com") < 0) {
            options.WindVaneRequest = false;
            options.H5Request = true;
        }
        if (options.mainDomain.indexOf("youku.com") > -1 && ua.indexOf("youku") < 0) {
            options.WindVaneRequest = false;
            options.H5Request = true;
        }
        if (!next) {
            return;
        }
        return next().then(function() {
            var ret = options.retJson.ret;
            if (ret instanceof Array) {
                ret = ret.join(",");
            }
            if (options.WindVaneRequest === true && (isAlipay && options.retJson.error) || (!ret || ret.indexOf("PARAM_PARSE_ERROR") > -1 || ret.indexOf("HY_FAILED") > -1 || ret.indexOf("HY_NO_HANDLER") > -1 || ret.indexOf("HY_CLOSED") > -1 || ret.indexOf("HY_EXCEPTION") > -1 || ret.indexOf("HY_NO_PERMISSION") > -1)) {
                if (isAlipay && (isNaN(options.retJson.error) && options.retJson.error.indexOf("FAIL_SYS_ACCESS_DENIED") === -1)) {
                    if (typeof options.retJson.api === "undefined" && typeof options.retJson.v === "undefined") {
                        options.retJson.api = params.api;
                        options.retJson.v = params.v;
                        options.retJson.ret = [ options.retJson.error + "::" + options.retJson.errorMessage ];
                        options.retJson.data = {};
                    }
                } else {
                    if (isAlipay && isObject(params.data)) {
                        params.data = JSON.stringify(params.data);
                    }
                    globalConfig.H5Request = true;
                    return that.__sequence([ that.__processRequestType, that.__processToken, that.__processRequestUrl, that.middlewares, that.__processRequest ]);
                }
            }
        });
    };
    var TOKEN_CDR = "_m_h5_c";
    var TOKEN_KEY = "_m_h5_tk";
    var TOKEN_ENC_KEY = "_m_h5_tk_enc";
    Mtop.prototype.__getTokenFromAlipay = function() {
        var deferred = defer();
        var options = this.options;
        var ua = win.navigator.userAgent;
        var isOnline = !!location.protocol.match(/^https?\:$/);
        if (options.useAlipayJSBridge === true && !isOnline && isAlipay && win.AlipayJSBridge && win.AlipayJSBridge.call) {
            win.AlipayJSBridge.call("getMtopToken", function(json) {
                if (json && json.token) {
                    options.token = json.token;
                }
                deferred.resolve();
            }, function() {
                deferred.resolve();
            });
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    };
    Mtop.prototype.__getTokenFromCookie = function() {
        var options = this.options;
        if (options.CDR && readCookie(TOKEN_CDR)) {
            options.token = readCookie(TOKEN_CDR).split(";")[0];
        } else {
            options.token = options.token || readCookie(TOKEN_KEY);
        }
        if (options.token) {
            options.token = options.token.split("_")[0];
        }
        return Promise.resolve();
    };
    Mtop.prototype.__waitWKWebViewCookie = function(next) {
        var options = this.options;
        if (options.waitWKWebViewCookieFn && options.H5Request && win.webkit && win.webkit.messageHandlers) {
            options.waitWKWebViewCookieFn(next);
        } else {
            next();
        }
    };
    Mtop.prototype.__processToken = function(next) {
        var that = this;
        var options = this.options;
        var params = this.params;
        if (options.token) {
            delete options.token;
        }
        if (options.WindVaneRequest === true) {
            next();
        } else {
            return ready.then(function() {
                return that.__getTokenFromAlipay();
            }).then(function() {
                return that.__getTokenFromCookie();
            }).then(next).then(function() {
                var retJson = options.retJson;
                var ret = retJson.ret;
                if (ret instanceof Array) {
                    ret = ret.join(",");
                }
                if (ret.indexOf("TOKEN_EMPTY") > -1 || (options.CDR === true || options.syncCookieMode === true) && ret.indexOf("ILLEGAL_ACCESS") > -1 || ret.indexOf("TOKEN_EXOIRED") > -1) {
                    options.maxRetryTimes = options.maxRetryTimes || 5;
                    options.failTimes = options.failTimes || 0;
                    if (options.H5Request && ++options.failTimes < options.maxRetryTimes) {
                        var __retrySequence = [ that.__waitWKWebViewCookie, that.__processToken, that.__processRequestUrl, that.middlewares, that.__processRequest ];
                        if (options.syncCookieMode === true && that.constructor.__cookieProcessorId !== that.id) {
                            if (!that.constructor.__cookieProcessor) {
                                that.constructor.__cookieProcessor = that.__requestProcessor;
                                that.constructor.__cookieProcessorId = that.id;
                            } else {
                                var cookiePoint = function(next) {
                                    var cookieProcessorHandler = function() {
                                        that.constructor.__cookieProcessor = null;
                                        that.constructor.__cookieProcessorId = null;
                                        next();
                                    };
                                    if (that.constructor.__cookieProcessor) {
                                        that.constructor.__cookieProcessor.then(cookieProcessorHandler)["catch"](cookieProcessorHandler);
                                    } else {
                                        next();
                                    }
                                };
                                __retrySequence = [ cookiePoint, that.__waitWKWebViewCookie, that.__processToken, that.__processRequestUrl, that.middlewares, that.__processRequest ];
                            }
                        }
                        return that.__sequence(__retrySequence);
                    } else {
                        if (options.maxRetryTimes > 0) {
                            delCookie(TOKEN_CDR, options.pageDomain, "*");
                            delCookie(TOKEN_KEY, options.mainDomain, options.subDomain);
                            delCookie(TOKEN_ENC_KEY, options.mainDomain, options.subDomain);
                        }
                        retJson.retType = RESPONSE_TYPE.TOKEN_EXPIRED;
                    }
                }
            });
        }
    };
    Mtop.prototype.__processRequestUrl = function(next) {
        var params = this.params;
        var options = this.options;
        if (options.hostSetting && options.hostSetting[win.location.hostname]) {
            var setting = options.hostSetting[win.location.hostname];
            setting.prefix && (options.prefix = setting.prefix);
            setting.subDomain && (options.subDomain = setting.subDomain);
            setting.mainDomain && (options.mainDomain = setting.mainDomain);
        }
        if (options.H5Request === true) {
            var path = "//" + (options.prefix ? options.prefix + "." : "") + (options.subDomain ? options.subDomain + "." : "") + options.mainDomain + "/h5/" + params.api.toLowerCase() + "/" + params.v.toLowerCase() + "/";
            var appKey = params.appKey || (options.subDomain === "waptest" ? "4272" : "12574478");
            var timestamp = new Date().getTime();
            var sign = md5(options.token + "&" + timestamp + "&" + appKey + "&" + params.data);
            var querystring = {
                jsv: mtopVersion,
                appKey: appKey,
                t: timestamp,
                sign: sign
            };
            var postdata = {
                data: params.data,
                ua: params.ua
            };
            Object.keys(params).forEach(function(n) {
                if (typeof querystring[n] === "undefined" && typeof postdata[n] === "undefined" && n !== "headers" && n !== "ext_headers" && n !== "ext_querys") {
                    querystring[n] = params[n];
                }
            });
            if (params.ext_querys) {
                Object.keys(params.ext_querys).forEach(function(n) {
                    querystring[n] = params.ext_querys[n];
                });
            }
            if (options.getJSONP) {
                querystring.type = "jsonp";
            } else if (options.getOriginalJSONP) {
                querystring.type = "originaljsonp";
            } else if (options.getJSON || options.postJSON) {
                querystring.type = "originaljson";
            }
            if (typeof params.valueType !== "undefined") {
                if (params.valueType === "original") {
                    if (options.getJSONP || options.getOriginalJSONP) {
                        querystring.type = "originaljsonp";
                    } else if (options.getJSON || options.postJSON) {
                        querystring.type = "originaljson";
                    }
                } else if (params.valueType === "string") {
                    if (options.getJSONP || options.getOriginalJSONP) {
                        querystring.type = "jsonp";
                    } else if (options.getJSON || options.postJSON) {
                        querystring.type = "json";
                    }
                }
            }
            if (options.useJsonpResultType === true && querystring.type === "originaljson") {
                delete querystring.type;
            }
            if (options.dangerouslySetProtocol) {
                path = options.dangerouslySetProtocol + ":" + path;
            }
            options.querystring = querystring;
            options.postdata = postdata;
            options.path = path;
        }
        next();
    };
    Mtop.prototype.__processUnitPrefix = function(next) {
        next();
    };
    var jsonpInc = 0;
    Mtop.prototype.__requestJSONP = function(throwError) {
        var deferred = defer();
        var params = this.params;
        var options = this.options;
        function cleanup(type) {
            if (timeoutid) {
                clearTimeout(timeoutid);
            }
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            if (type === "TIMEOUT") {
                window[callbackName] = function() {
                    window[callbackName] = undefined;
                    try {
                        delete window[callbackName];
                    } catch (e) {}
                };
            } else {
                window[callbackName] = undefined;
                try {
                    delete window[callbackName];
                } catch (e) {}
            }
        }
        var timeout = params.timeout || 2e4;
        var callbackName = "mtopjsonp" + (params["jsonpIncPrefix"] || "") + ++jsonpInc;
        var timeoutid = setTimeout(function() {
            throwError(options.timeoutErrMsg || "TIMEOUT::接口超时");
            cleanup("TIMEOUT");
        }, timeout);
        options.querystring.callback = callbackName;
        var script = document.createElement("script");
        script.src = options.path + "?" + stringifyQS(options.querystring) + "&" + stringifyQS(options.postdata);
        script.async = true;
        script.onerror = function() {
            cleanup("ABORT");
            throwError(options.abortErrMsg || "ABORT::接口异常退出");
        };
        window[callbackName] = function() {
            options.results = Array.prototype.slice.call(arguments);
            cleanup();
            deferred.resolve();
        };
        appendScript(script);
        return deferred.promise;
    };
    Mtop.prototype.__requestJSON = function(throwError) {
        var deferred = defer();
        var params = this.params;
        var options = this.options;
        var xhr = new win.XMLHttpRequest();
        function cleanup(type) {
            if (timeoutid) {
                clearTimeout(timeoutid);
            }
            if (type === "TIMEOUT") {
                xhr.abort();
            }
        }
        var timeout = params.timeout || 2e4;
        var timeoutid = setTimeout(function() {
            throwError(options.timeoutErrMsg || "TIMEOUT::接口超时");
            cleanup("TIMEOUT");
        }, timeout);
        if (options.CDR && readCookie(TOKEN_CDR)) {
            options.querystring.c = decodeURIComponent(readCookie(TOKEN_CDR));
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                var result;
                var headers;
                if (status >= 200 && status < 300 || status == 304) {
                    cleanup();
                    result = xhr.responseText;
                    headers = xhr.getAllResponseHeaders() || "";
                    try {
                        result = /^\s*$/.test(result) ? {} : JSON.parse(result);
                        result.responseHeaders = headers;
                        options.results = [ result ];
                        deferred.resolve();
                    } catch (e) {
                        throwError("PARSE_JSON_ERROR::解析JSON失败");
                    }
                } else {
                    cleanup("ABORT");
                    throwError(options.abortErrMsg || "ABORT::接口异常退出");
                }
            }
        };
        var curl = options.path + "?" + stringifyQS(options.querystring);
        var type;
        var senddata;
        if (options.getJSON) {
            type = "GET";
            curl += "&" + stringifyQS(options.postdata);
        } else if (options.postJSON) {
            type = "POST";
            senddata = stringifyQS(options.postdata);
        }
        xhr.open(type, curl, true);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var ext_headers = params.ext_headers || params.headers;
        if (ext_headers) {
            for (var key in ext_headers) {
                xhr.setRequestHeader(key, ext_headers[key]);
            }
        }
        xhr.send(senddata);
        return deferred.promise;
    };
    Mtop.prototype.__requestWindVane = function(throwError) {
        var deferred = defer();
        var params = this.params;
        var options = this.options;
        var data = params.data;
        var api = params.api;
        var v = params.v;
        var post = !!options.postJSON ? 1 : 0;
        var type = !!options.getJSON || !!options.postJSON || !!options.getOriginalJSONP ? "originaljson" : "";
        if (typeof params.valueType !== "undefined") {
            if (params.valueType === "original") {
                type = "originaljson";
            } else if (params.valueType === "string") {
                type = "";
            }
        }
        if (options.useJsonpResultType === true) {
            type = "";
        }
        var isHttps = location.protocol === "https" ? 1 : 0;
        var isSec = params.isSec || 0;
        var sessionOption = params.sessionOption || "AutoLoginOnly";
        var ecode = params.ecode || 0;
        var timeout;
        var timer;
        var ext_headers = params.ext_headers || {};
        var ext_querys = params.ext_querys || {};
        ext_headers.referer = location.href;
        if (typeof params.timer !== "undefined") {
            timer = parseInt(params.timer);
        } else if (typeof params.timeout !== "undefined") {
            timer = parseInt(params.timeout);
        } else {
            timer = 2e4;
        }
        timeout = timer * 2;
        function handler(result) {
            options.results = [ result ];
            deferred.resolve();
        }
        if (params.needLogin === true && typeof params.sessionOption === "undefined") {
            sessionOption = "AutoLoginAndManualLogin";
        }
        if (typeof params.secType !== "undefined" && typeof params.isSec === "undefined") {
            isSec = params.secType;
        }
        var sendObj = {
            api: api,
            v: v,
            post: String(post),
            type: type,
            isHttps: String(isHttps),
            ecode: String(ecode),
            isSec: String(isSec),
            param: JSON.parse(data),
            timer: timer,
            sessionOption: sessionOption,
            ext_headers: ext_headers,
            ext_querys: ext_querys
        };
        if (params.ttid && options.dangerouslySetWVTtid === true) {
            sendObj.ttid = params.ttid;
        }
        if (Object.assign && params.dangerouslySetWindvaneParams) {
            Object.assign(sendObj, params.dangerouslySetWindvaneParams);
        }
        lib.windvane.call("MtopWVPlugin", "send", sendObj, handler, handler, timeout);
        return deferred.promise;
    };
    Mtop.prototype.__requestAlipay = function(throwError) {
        var deferred = defer();
        var params = this.params;
        var options = this.options;
        var reqParams = {
            apiName: params.api,
            apiVersion: params.v,
            needEcodeSign: String(params.ecode) === "1",
            usePost: !!options.postJSON
        };
        if (!isObject(params.data)) {
            params.data = JSON.parse(params.data);
        }
        reqParams.data = params.data;
        if (params.ttid && options.dangerouslySetWVTtid === true) {
            reqParams.ttid = params.ttid;
        }
        if (!!options.getJSON || !!options.postJSON || !!options.getOriginalJSONP) {
            reqParams.type = "originaljson";
        }
        if (typeof params.valueType !== "undefined") {
            if (params.valueType === "original") {
                reqParams.type = "originaljson";
            } else if (params.valueType === "string") {
                delete reqParams.type;
            }
        }
        if (options.useJsonpResultType === true) {
            delete reqParams.type;
        }
        function handler(result) {
            options.results = [ result ];
            deferred.resolve();
        }
        if (Object.assign && params.dangerouslySetAlipayParams) {
            Object.assign(reqParams, params.dangerouslySetAlipayParams);
        }
        win.AlipayJSBridge.call("mtop", reqParams, handler);
        return deferred.promise;
    };
    Mtop.prototype.__processRequest = function(next, throwError) {
        var that = this;
        return ready.then(function() {
            var options = that.options;
            if (!!options.H5Request && (!!options.getJSONP || !!options.getOriginalJSONP)) {
                return that.__requestJSONP(throwError);
            } else if (!!options.H5Request && (!!options.getJSON || !!options.postJSON)) {
                return that.__requestJSON(throwError);
            } else if (!!options.WindVaneRequest) {
                if (isAlipay) {
                    return that.__requestAlipay(throwError);
                } else {
                    return that.__requestWindVane(throwError);
                }
            } else {
                throw new Error("UNEXCEPT_REQUEST::错误的请求类型");
            }
        }).then(next).then(function() {
            var options = that.options;
            var params = that.params;
            var retJson = options.results[0];
            var ret = retJson && retJson.ret || [];
            retJson.ret = ret;
            if (ret instanceof Array) {
                ret = ret.join(",");
            }
            var newToken = retJson["c"];
            if (options.CDR && newToken) {
                setCookie(TOKEN_CDR, newToken, {
                    domain: options.pageDomain,
                    path: "/"
                });
            }
            if (ret.indexOf("SUCCESS") > -1) {
                retJson.retType = RESPONSE_TYPE.SUCCESS;
            } else {
                retJson.retType = RESPONSE_TYPE.ERROR;
            }
            options.retJson = retJson;
        });
    };
    Mtop.prototype.__sequence = function(fnArray) {
        var that = this;
        var preProcessor = [];
        var postProcessor = [];
        function add(fn) {
            if (fn instanceof Array) {
                fn.forEach(add);
            } else {
                var pre = defer();
                var post = defer();
                var next;
                preProcessor.push(function() {
                    pre = defer();
                    next = fn.call(that, function(result) {
                        pre.resolve(result);
                        return post.promise;
                    }, function(errMsg) {
                        pre.reject(errMsg);
                        return post.promise;
                    });
                    if (next) {
                        next = next["catch"](function(e) {
                            pre.reject(e);
                        });
                    }
                    return pre.promise;
                });
                postProcessor.push(function(result) {
                    post.resolve(result);
                    return next;
                });
            }
        }
        fnArray.forEach(add);
        var promise = ready;
        var processor;
        while (!!(processor = preProcessor.shift())) {
            promise = promise.then(processor);
        }
        while (!!(processor = postProcessor.pop())) {
            promise = promise.then(processor);
        }
        return promise;
    };
    var startPoint = function(next) {
        next();
    };
    var endPoint = function(next) {
        next();
    };
    Mtop.prototype.request = function(options) {
        var that = this;
        this.options = defaults(options || {}, globalConfig);
        if (!Promise) {
            var error = "当前浏览器不支持Promise，请在windows对象上挂载Promise对象";
            lib.mtop = {
                ERROR: error
            };
            throw new Error(error);
            return false;
        }
        var promise = Promise.resolve([ startPoint, endPoint ]).then(function(ret) {
            var __processStart = ret[0];
            var __processEnd = ret[1];
            return that.__sequence([ __processStart, that.__processRequestMethod, that.__processRequestType, that.__processToken, that.__processRequestUrl, that.middlewares, that.__processRequest, __processEnd ]);
        }).then(function() {
            var retJson = that.options.retJson;
            if (retJson.retType !== RESPONSE_TYPE.SUCCESS) {
                return Promise.reject(retJson);
            } else {
                if (that.options.successCallback) {
                    that.options.successCallback(retJson);
                } else {
                    return Promise.resolve(retJson);
                }
            }
        })["catch"](function(reason) {
            var retJson;
            if (reason instanceof Error) {
                console.error(reason.stack);
                retJson = {
                    ret: [ reason.message ],
                    stack: [ reason.stack ],
                    retJson: RESPONSE_TYPE.ERROR
                };
            } else if (typeof reason === "string") {
                retJson = {
                    ret: [ reason ],
                    retJson: RESPONSE_TYPE.ERROR
                };
            } else if (reason !== undefined) {
                retJson = reason;
            } else {
                retJson = that.options.retJson;
            }
            if (lib.mtop.errorListener) {
                lib.mtop.errorListener({
                    api: that.params.api,
                    v: that.params.v,
                    retJson: retJson
                });
            }
            if (that.options.failureCallback) {
                that.options.failureCallback(retJson);
            } else {
                return Promise.reject(retJson);
            }
        });
        this.__processRequestType();
        if (that.options.H5Request) {
            that.constructor.__firstProcessor || (that.constructor.__firstProcessor = promise);
            startPoint = function startPoint(next) {
                that.constructor.__firstProcessor.then(next)["catch"](next);
            };
        }
        if (this.params.type === "get" && this.params.dataType === "json" || this.params.type === "post") {
            options.pageDomain = options.pageDomain || getMainDomain(win.location.hostname);
            if (options.mainDomain !== options.pageDomain) {
                options.maxRetryTimes = 4;
                options.CDR = true;
            }
        }
        this.__requestProcessor = promise;
        return promise;
    };
    lib.mtop = function(params) {
        return new Mtop(params);
    };
    lib.mtop.request = function(params, successCallback, failureCallback) {
        var options = {
            H5Request: params.H5Request,
            WindVaneRequest: params.WindVaneRequest,
            LoginRequest: params.LoginRequest,
            AntiCreep: params.AntiCreep,
            AntiFlood: params.AntiFlood,
            successCallback: successCallback,
            failureCallback: failureCallback || successCallback
        };
        return new Mtop(params).request(options);
    };
    lib.mtop.H5Request = function(params, successCallback, failureCallback) {
        var options = {
            H5Request: true,
            successCallback: successCallback,
            failureCallback: failureCallback || successCallback
        };
        return new Mtop(params).request(options);
    };
    lib.mtop.middlewares = middlewares;
    lib.mtop.config = globalConfig;
    lib.mtop.RESPONSE_TYPE = RESPONSE_TYPE;
    lib.mtop.CLASS = Mtop;
})(window, window.lib || (window.lib = {}));

(function(win, lib) {
    if (!lib || !lib.mtop || lib.mtop.ERROR) {
        throw new Error("Mtop 初始化失败！");
        return;
    }
    var Promise = win.Promise;
    var Mtop = lib.mtop.CLASS;
    var globalConfig = lib.mtop.config;
    var RESPONSE_TYPE = lib.mtop.RESPONSE_TYPE;
    function preventMove(e) {
        e.preventDefault();
        return false;
    }
    function readCookie(name) {
        var matched = new RegExp("(?:^|;\\s*)" + name + "\\=([^;]+)(?:;\\s*|$)").exec(document.cookie);
        if (matched) {
            return matched[1];
        }
    }
    function FrameWidget(text, url) {
        var that = this;
        var dpr = win.dpr || 1;
        var widget = document.createElement("div");
        var rect = document.documentElement.getBoundingClientRect();
        var width = Math.max(rect.width, window.innerWidth) / dpr;
        var height = Math.max(rect.height, window.innerHeight) / dpr;
        widget.style.cssText = [ "-webkit-transform:scale(" + dpr + ") translateZ(0)", "-ms-transform:scale(" + dpr + ") translateZ(0)", "transform:scale(" + dpr + ") translateZ(0)", "-webkit-transform-origin:0 0", "-ms-transform-origin:0 0", "transform-origin:0 0", "width:" + width + "px", "height:" + height + "px", "z-index:999999", "position:" + (width > 800 ? "fixed" : "absolute"), "left:0", "top:0px", "background:" + (width > 800 ? "rgba(0,0,0,.5)" : "#FFF"), "display:none" ].join(";");
        var title = document.createElement("div");
        title.style.cssText = [ "width:100%", "height:" + 52 + "px", "background:#EEE", "line-height:" + 52 + "px", "text-align:left", "box-sizing:border-box", "padding-left:" + 20 + "px", "position:absolute", "left:0", "top:0", "font-size:" + 16 + "px", "font-weight:bold", "color:#333" ].join(";");
        title.innerText = text;
        var close = document.createElement("a");
        close.style.cssText = [ "display:block", "position:absolute", "right:0", "top:0", "height:" + 52 + "px", "line-height:" + 52 + "px", "padding:0 " + 20 + "px", "color:#999" ].join(";");
        close.innerText = "关闭";
        var content = document.createElement("iframe");
        content.style.cssText = [ "width:100%", "height:100%", "border:0", "overflow:hidden" ].join(";");
        if (width > 800) {
            title.style.cssText = [ "width:" + 370 + "px", "height:" + 52 + "px", "background:#EEE", "line-height:" + 52 + "px", "text-align:left", "box-sizing:border-box", "padding-left:" + 20 + "px", "position:absolute", "left:" + (width / 2 - 370 / 2) + "px", "top:" + 40 + "px", "font-size:" + 16 + "px", "font-weight:bold", "color:#333" ].join(";");
            content.style.cssText = [ "position:absolute", "top:" + (40 + 52) + "px", "left:" + (width / 2 - 370 / 2) + "px", "width:" + 370 + "px", "height:" + 480 + "px", "border:0", "background:#FFF", "overflow:hidden" ].join(";");
        }
        title.appendChild(close);
        widget.appendChild(title);
        widget.appendChild(content);
        widget.className = "J_MIDDLEWARE_FRAME_WIDGET";
        document.body.appendChild(widget);
        content.src = url;
        close.addEventListener("click", function() {
            that.hide();
            var ev = document.createEvent("HTMLEvents");
            ev.initEvent("close", false, false);
            widget.dispatchEvent(ev);
        }, false);
        this.addEventListener = function() {
            widget.addEventListener.apply(widget, arguments);
        };
        this.removeEventListener = function() {
            widget.removeEventListener.apply(widget, arguments);
        };
        this.show = function() {
            document.addEventListener("touchmove", preventMove, false);
            widget.style.display = "block";
            window.scrollTo(0, 0);
        };
        this.hide = function() {
            document.removeEventListener("touchmove", preventMove);
            window.scrollTo(0, -rect.top);
            if (widget.parentNode) {
                widget.parentNode.removeChild(widget);
            }
        };
    }
    function processLoginRequest(next) {
        var that = this;
        var options = this.options;
        var params = this.params;
        return next().then(function() {
            var retJson = options.retJson;
            var ret = retJson.ret;
            var userAgent = navigator.userAgent.toLowerCase();
            var isSafari = userAgent.indexOf("safari") > -1 && userAgent.indexOf("chrome") < 0 && userAgent.indexOf("qqbrowser") < 0;
            if (ret instanceof Array) {
                ret = ret.join(",");
            }
            if (ret.indexOf("SESSION_EXPIRED") > -1 || ret.indexOf("SID_INVALID") > -1 || ret.indexOf("AUTH_REJECT") > -1 || ret.indexOf("NEED_LOGIN") > -1) {
                retJson.retType = RESPONSE_TYPE.SESSION_EXPIRED;
                if (!options.WindVaneRequest && (globalConfig.LoginRequest === true || options.LoginRequest === true || params.needLogin === true)) {
                    if (!lib.login) {
                        throw new Error("LOGIN_NOT_FOUND::缺少lib.login");
                    }
                    if (options.safariGoLogin === true && isSafari && options.pageDomain !== "taobao.com") {
                        lib.login.goLogin();
                    } else {
                        return lib.login.goLoginAsync().then(function(status) {
                            return that.__sequence([ that.__processToken, that.__processRequestUrl, that.__processUnitPrefix, that.middlewares, that.__processRequest ]);
                        })["catch"](function(status) {
                            if (status === "CANCEL") {
                                throw new Error("LOGIN_CANCEL::用户取消登录");
                            } else {
                                throw new Error("LOGIN_FAILURE::用户登录失败");
                            }
                        });
                    }
                }
            }
        });
    }
    lib.mtop.middlewares.push(processLoginRequest);
    lib.mtop.loginRequest = function(params, successCallback, failureCallback) {
        var options = {
            LoginRequest: true,
            H5Request: true,
            successCallback: successCallback,
            failureCallback: failureCallback || successCallback
        };
        return new Mtop(params).request(options);
    };
    function processAntiFlood(next) {
        var that = this;
        var options = this.options;
        var params = this.params;
        if (options.H5Request === true && (globalConfig.AntiFlood === true || options.AntiFlood === true)) {
            return next().then(function() {
                var retJson = options.retJson;
                var ret = retJson.ret;
                if (ret instanceof Array) {
                    ret = ret.join(",");
                }
                if (ret.indexOf("FAIL_SYS_USER_VALIDATE") > -1 && retJson.data.url) {
                    if (options.AntiFloodReferer) {
                        location.href = retJson.data.url.replace(/(http_referer=).+/, "$1" + options.AntiFloodReferer);
                    } else {
                        location.href = retJson.data.url;
                    }
                }
            });
        } else {
            next();
        }
    }
    lib.mtop.antiFloodRequest = function(params, successCallback, failureCallback) {
        var options = {
            AntiFlood: true,
            successCallback: successCallback,
            failureCallback: failureCallback || successCallback
        };
        return new Mtop(params).request(options);
    };
    lib.mtop.middlewares.push(processAntiFlood);
    function processAntiCreep(next) {
        var that = this;
        var options = this.options;
        var params = this.params;
        if ((params.forceAntiCreep === true || options.H5Request === true) && (globalConfig.AntiCreep === true || options.AntiCreep === true)) {
            return next().then(function() {
                var retJson = options.retJson;
                var ret = retJson.ret;
                if (ret instanceof Array) {
                    ret = ret.join(",");
                }
                if ((ret.indexOf("RGV587_ERROR::SM") > -1 || ret.indexOf("ASSIST_FLAG") > -1) && retJson.data.url) {
                    var TOKEN_SM = "_m_h5_smt";
                    var _SMToken = readCookie(TOKEN_SM);
                    var _SMTokenExpired = false;
                    if (options.saveAntiCreepToken === true && _SMToken) {
                        _SMToken = JSON.parse(_SMToken);
                        for (var key in _SMToken) {
                            if (params[key]) _SMTokenExpired = true;
                        }
                    }
                    if (options.saveAntiCreepToken === true && _SMToken && !_SMTokenExpired) {
                        for (var key in _SMToken) {
                            params[key] = _SMToken[key];
                        }
                        return that.__sequence([ that.__processToken, that.__processRequestUrl, that.__processUnitPrefix, that.middlewares, that.__processRequest ]);
                    } else {
                        return new Promise(function(resolve, reject) {
                            var url = retJson.data.url;
                            var widget = new FrameWidget("", url);
                            function closeHandler() {
                                widget.removeEventListener("close", closeHandler);
                                win.removeEventListener("message", messageHandler);
                                reject("USER_INPUT_CANCEL::用户取消输入");
                            }
                            function messageHandler(e) {
                                var data;
                                try {
                                    data = JSON.parse(e.data) || {};
                                } catch (err) {}
                                if (data && data.type === "child") {
                                    widget.removeEventListener("close", closeHandler);
                                    win.removeEventListener("message", messageHandler);
                                    widget.hide();
                                    var token;
                                    try {
                                        token = JSON.parse(decodeURIComponent(data.content));
                                        if (typeof token === "string") {
                                            token = JSON.parse(token);
                                        }
                                        for (var key in token) {
                                            params[key] = token[key];
                                        }
                                        if (options.saveAntiCreepToken === true) {
                                            document.cookie = TOKEN_SM + "=" + JSON.stringify(token) + ";";
                                            win.location.reload();
                                        } else {
                                            that.__sequence([ that.__processToken, that.__processRequestUrl, that.__processUnitPrefix, that.middlewares, that.__processRequest ]).then(resolve);
                                        }
                                    } catch (err) {
                                        reject("USER_INPUT_FAILURE::用户输入失败");
                                    }
                                }
                            }
                            widget.addEventListener("close", closeHandler, false);
                            win.addEventListener("message", messageHandler, false);
                            widget.show();
                        });
                    }
                }
            });
        } else {
            next();
        }
    }
    lib.mtop.antiCreepRequest = function(params, successCallback, failureCallback) {
        var options = {
            AntiCreep: true,
            successCallback: successCallback,
            failureCallback: failureCallback || successCallback
        };
        return new Mtop(params).request(options);
    };
    lib.mtop.middlewares.push(processAntiCreep);
})(window, window.lib || (window.lib = {}));