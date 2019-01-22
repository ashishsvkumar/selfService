;(function(win, lib) {
    var Promise = win.Promise;
    var doc = win.document;
    var ua = win.navigator.userAgent;
    var isWin = (/Windows\sPhone\s(?:OS\s)?[\d\.]+/i).test(ua) || (/Windows\sNT\s[\d\.]+/i).test(ua);
    var isWinWV = isWin && win['WindVane_Win_Private'] && win['WindVane_Win_Private'].call;
    var isIOS = (/iPhone|iPad|iPod/i).test(ua);
    var isAndroid = (/Android/i).test(ua);
    var wvVersion = ua.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var WindVane = lib.windvane = win.WindVane || (win.WindVane = {
        version:'3.0.4'
    });
    var sidBase = Math.floor(Math.random() * (1 << 16)), inc = 1, iframePool = [], iframeLimit = 3;

    var LOCAL_PROTOCOL = 'hybrid';
    var WV_PROTOCOL = 'wv_hybrid';
    var IFRAME_PREFIX = 'iframe_';
    var PARAM_PREFIX = 'param_';
    var CALL_GC_TIME = 60 * 1000 * 10;
    var PARAM_GC_TIME = 60 * 1000;

    function compareVersion(v1, v2) {
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');

        for(var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i],10),  n2 = parseInt(v2[i],10);

            if(window.isNaN(n1)) {
                n1 = 0;
            }
            if(window.isNaN(n2)) {
                n2 = 0;
            }
            if( n1 < n2 ) {
                return -1;
            }
            else if( n1 > n2) {
                return 1;
            }
        }
        return 0;
    }

    if (wvVersion) {
        wvVersion = (wvVersion[1] || '0.0.0').replace(/\_/g, '.');
    } else {
        wvVersion = '0.0.0';
    }

    /**
     * @namespace  lib
     */

    /**
     * @namespace windvane
     * @memberOf lib
     */

    var WV_Core = {
        isAvailable: compareVersion(wvVersion, '0') === 1,
        isNewBridgeAvailable: compareVersion(wvVersion, isAndroid ? '8.3.0':'8.2.0') === 1,

        /**
         * @method  call2
         * @memberOf lib.windvane
         * @param  {String} name        要调用的 JSBridge 名称，格式为 类名.方法名
         * @param  {Object} params      要传递给客户端的参数
         * @param  {Function} [success] 执行成功后的回调
         * @param  {Function} [failure] 执行失败后的回调
         * @param  {Number} [timeout]   执行超时，超时后自动以 {ret:['HY_TIMEOUT']}
         * @return {Promise}            如果当前运行环境支持Promise，则返回一个Promise实例。
         */
        call2: function(name, params, success, failure, timeout) {
            var idx = name.indexOf('.');
            return WV_Core.call(name.substr(0, idx), name.substr(idx + 1), params, success, failure, timeout);
        },

        /**
         * @method  call
         * @memberOf lib.windvane
         * @param  {String} obj       要调用的客户端类名
         * @param  {String} method    要调用的客户端方法名
         * @param  {Object} params    要传递给客户端的参数
         * @param  {Function} [success] 执行成功后的回调
         * @param  {Function} [failure] 执行失败后的回调
         * @param  {Number} [timeout]   执行超时，超时后自动以 {ret:['HY_TIMEOUT']}
         * @return {Promise}          如果当前运行环境支持Promise，则返回一个Promise实例。
         */
        call: function(obj, method, params, success, failure, timeout) {
            var sid, promise;

            if (typeof arguments[arguments.length - 1] === 'number') {
                timeout = arguments[arguments.length - 1];
            }

            if (typeof success !== 'function') {
                success = null;
            }

            if (typeof failure !== 'function') {
                failure = null;
            }

            if (Promise && !success && !failure) {
                promise = new Promise(function(resolve, reject) {
                    success = resolve;
                    failure = reject;
                });
            }

            if (WV_Core.isNewBridgeAvailable && win.__windvane__ && win.__windvane__.call) {
                win.__windvane__.call(obj + '.' + method, params, success, failure, timeout);
                return promise;
            }

            sid = WV_Private.getSid();
            var callInfo = {
                success: success,
                failure: failure,
            };
            if (timeout > 0) {
                callInfo.timeout = setTimeout(function() {
                    WV_Core.onFailure(sid, {ret:'HY_TIMEOUT'});
                }, timeout);
            }

            WV_Private.registerCall(sid, callInfo);
            WV_Private.registerGC(sid, timeout);
            if (!WV_Core.isAvailable) {
                WV_Core.onFailure(sid, {ret:'HY_NOT_IN_WINDVANE'});
            }
            else {
                WV_Private.callMethod(obj, method, params, sid);
            }

            return promise;
        },

        fireEvent: function(eventname, eventdata, sid) {
            // 当native需要通知js的时候（通信），用触发事件的方式进行
            var ev = doc.createEvent('HTMLEvents');
            ev.initEvent(eventname, false, true);
            ev.param = WV_Private.parseData(eventdata);

            doc.dispatchEvent(ev);
        },

        getParam: function(sid) {
            return WV_Private.getParam(sid);
        },

        setData: function(sid, chunk) {},

        find: function (reqId, keepAlive) {
            if (!keepAlive) {
                WV_Private.unregisterCall(reqId, false);
            }
        },
        onSuccess: function(sid, data, keepAlive) {
            // native代码处理成功后，调用该方法来通知js
            WV_Private.onComplete(sid, data, 'success', keepAlive);
        },

        onFailure: function(sid, data) {
            // native代码处理失败后，调用该方法来通知js
            WV_Private.onComplete(sid, data, 'failure');
        }
    };
    if (WV_Core.isNewBridgeAvailable && win.__windvane__ && win.__windvane__.callSync) {
        WV_Core.callSync = function (name, params) {
            if (isIOS) {
                return win.__windvane__.callSync(name, params);
            } else if (isAndroid) {
                var callParams = {
                    name: name
                };
                if (params) {
                    callParams.params = JSON.stringify(params);
                }
                var result = win.__windvane__.callSync(callParams);
                if (result) {
                    try {
                        return JSON.parse(result);
                    } catch(e) {}
                }
            }
        }
    }

    var WV_Private = {
        params: {},
        calls: {},

        getSid: function() {
            // iOS 10.3 后端口号不能超过 65536。
            return ((sidBase + inc++) % 65536) + '';
        },

        buildParam: function(obj) {
            if (obj && typeof obj === 'object') {
                return JSON.stringify(obj);
            } else {
                return obj || '';
            }
        },

        getParam: function(sid) {
            // 因为ios下iframe协议，对于url长度有限制，所以增加一个参数的map。
            return this.params[PARAM_PREFIX + sid] || '';
        },

        setParam: function(sid, params) {
            this.params[PARAM_PREFIX + sid] = params;
        },

        parseData: function(str) {
            var rst;
            if (str && typeof str === 'string') {
                try {
                    rst = JSON.parse(str);
                } catch(e) {
                    rst = {ret:'HY_RESULT_PARSE_ERROR', originValue:str};
                }
            } else {
                rst = str || {};
            }

            return rst;
        },

        registerCall: function(sid, callInfo) {
            this.calls[sid] = callInfo;
        },

        unregisterCall: function(sid, keepAlive) {
            var callInfo = this.calls[sid] || {};

            var timeout = callInfo.timeout;
            if (timeout) {
                clearTimeout(timeout);
            }

            if (!keepAlive) {
                delete this.calls[sid];
            }

            return callInfo;
        },

        useIframe: function(sid, url) {
            var iframeid = IFRAME_PREFIX + sid;
            var iframe = iframePool.pop();

            if (!iframe) {
                iframe = doc.createElement('iframe');
                iframe.setAttribute('frameborder', '0');
                iframe.style.cssText = 'width:0;height:0;border:0;display:none;';
            }

            iframe.setAttribute('id', iframeid);
            iframe.setAttribute('src', url);

            if (!iframe.parentNode) {
                setTimeout(function() {
                    doc.body.appendChild(iframe);
                },5);
            }
        },

        retrieveIframe : function(sid) {
            var iframeid = IFRAME_PREFIX + sid;
            var iframe = doc.querySelector('#' + iframeid);

            if (iframe) {
                if (iframePool.length >= iframeLimit) {
                    try {
                        doc.body.removeChild(iframe);
                    } catch (e) {
                        // 有时 iframe 的 parent 并不是 body，或者状态不正确，会导致抛异常
                    }
                } else {
                    // 避免同一个 iframe 重复插入两次 iframePoll
                    if (iframePool.indexOf(iframe) < 0) {
                        iframePool.push(iframe);
                    }
                }
            }
        },

        callMethod: function(obj, method, params, sid) {
            // hybrid://objectName:sid/methodName?params
            var _params = WV_Private.buildParam(params);

            if (isWin) {
                if (isWinWV) {
                    win['WindVane_Win_Private'].call(obj, method, sid, _params);
                } else {
                    this.onComplete(sid, {ret: 'HY_NO_HANDLER_ON_WP'}, 'failure');
                }
            } else {
                if (isIOS) {
                    // iOS下用iframe调用
                    // 保存数据，可以通过 getPram 直接取到。
                    // iOS 为了兼容旧版本上 iframe URL 长度限制的问题。
                    this.setParam(sid, _params);
                    var uri = LOCAL_PROTOCOL + '://' + obj + ':' + sid + '/' + method + '?' + encodeURIComponent(_params);
                    this.useIframe(sid, uri);
                } else if (isAndroid) {
                    // Android下用window.prompt调用调用
                    // Android 为了兼容 Chrome 69 以上 prompt 长度限制的问题。
                    this.setParam(sid, params);
                    var uri = LOCAL_PROTOCOL + '://' + obj + ':' + sid + '/' + method + '?' + _params;
                    var value = WV_PROTOCOL + ':';
                    window.prompt(uri, value);
                } else {
                    this.onComplete(sid, {ret: 'HY_NOT_SUPPORT_DEVICE'}, 'failure');
                }
            }
        },

        registerGC: function(sid, timeout) {
            // 垃圾回收
            var that = this;
            var callGCTime = Math.max(timeout || 0, CALL_GC_TIME);
            var paramGCTime = Math.max(timeout || 0, PARAM_GC_TIME);

            setTimeout(function(){
                that.unregisterCall(sid);
            }, callGCTime);

            if (isIOS) {
                // ios下处理params的回收
                setTimeout(function(){
                    if (that.params[PARAM_PREFIX + sid]) {
                        delete that.params[PARAM_PREFIX + sid];
                    }
                }, paramGCTime);
            }
        },

        onComplete: function(sid, data, type, keepAlive) {
            var call = this.unregisterCall(sid, keepAlive);
            var success = call.success;
            var failure = call.failure;

            data = this.parseData(data);

            var ret = data.ret;
            if (typeof ret === 'string') {
                data = data.value || data;
                if (!data.ret) {
                    data.ret = [ret];
                }
            }

            if (type === 'success') {
                success && success(data);
            } else if (type === 'failure') {
                failure && failure(data);
            }

            if (isIOS) {    //iOS下回收iframe
                this.retrieveIframe(sid);
                if (this.params[PARAM_PREFIX + sid]) {
                    delete this.params[PARAM_PREFIX + sid];
                }
            }
        }
    };

    for (var key in WV_Core) {
        if (!hasOwnProperty.call(WindVane, key)) {
            WindVane[key] = WV_Core[key];
        }
    }
})(window, window['lib'] || (window['lib'] = {}))
