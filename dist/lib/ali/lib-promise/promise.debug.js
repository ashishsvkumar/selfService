/**
 * Function object with two arguments resolve and reject. The first argument fulfills the promise, the second argument rejects it. We can call these functions, once our operation is completed.
 * @callback PromiseExecuter
 * @param {Function} resolve fulfills the promise
 * @param {Function} reject rejects the promise
 */

    
/**
 * call when a promise resolved
 * @callback onFullfilled
 * @param {*} value a resolved value
 */

/**
 * call when a promise rejected
 * @callback onRejected
 * @param {*} reason a rejected reason
 */

/**
 * The Promise object is used for deferred and asynchronous computations.
 * @class  Promise
 * @param {PromiseExecuter} executor Function object with two arguments resolve and reject.
 */

/**
 * Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler.
 * @method then
 * @memberOf Promise
 * @instance
 * @param {onFullfilled} onFullfilled
 * @param {onRejected} [onRejected]
 * @return {Promise} a new Promise object
 */

/**
 * Appends a rejection handler callback to the promise, and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled.
 * @method catch
 * @memberOf Promise
 * @instance
 * @param {Function} onRejected
* @return {Promise} a new Promise object
 */

/**
 * Returns a promise that resolves when all of the promises in the iterable argument have resolved.
 * @method all
 * @memberOf Promise
 * @param {Function} iterable
* @return {Promise} a new Promise object
 */

/**
 * Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.
 * @method race
 * @memberOf Promise
 * @param {Function} iterable
 * @return {Promise} a new Promise object
 */

/**
 * Returns a Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value.
 * @method resolve
 * @memberOf Promise
 * @param {*} value
 * @return {Promise} a new Promise object
 */

/**
 * Returns a Promise object that is rejected with the given reason.
 * @method reject
 * @memberOf Promise
 * @param {*} reason
 * @return {Promise} a new Promise object
 */

;(function(win, lib) {

var Promise = win.Promise;

if (!Promise) {
    throw new Error('ES6Promise is not working in this browser');
}

/**
 * Some features.
 * @class lib.promise~PromiseFeatures
 */
function PromiseFeatures() {
    var that = this;

    this.ES6Promise = Promise;

    /**
     * @typedef Deferrer
     * @property {Function} resolve fulfills the promise
     * @property {Function} reject rejects the promise
     * @property {Promise} promise a promise object
     */

    /**
     * @method defer
     * @memberOf PromiseFeatures
     * @instance
     * @return {Deferrer} a deferred object with resolve and reject
     */
    this.defer = function() {
        var deferred = {};
        var promise = new Promise(function(resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        deferred.promise = promise;
        return deferred;
    }

    /**
     * wrap a PromiseExectuer Object to a onFullfilled/onRejcted object
     * @method  wrap
     * @memberOf PromiseFeatures
     * @instance
     * @param  {PromiseExectuer} any
     * @return {(onFullfilled|onRejected)}
     */
    this.wrap = function (any) {
        var that = this;

        return function () {
            if (typeof any === 'function') {
                var deferred = that.defer();
                var promise = deferred.promise;
                var args = [deferred.resolve, deferred.reject]
                    .concat(Array.prototype.slice.call(arguments));

                var result = any.apply(this, args);
                if (that.isPromise(result)) {
                    return result;
                } else {
                    return deferred.promise;
                } 
            } else {
                return any;
            }
        }
    }

    /**
     * mix then/catch in the context
     * @method mixin
     * @memberOf PromiseFeatures
     * @instance
     * @param  {Promise} promise Promise实例
     * @param  {Object} context 上下文对象
     * @return {Object} 上下文对象
     */
    this.mixin = function (promise, context) {
        ['then', 'catch'].forEach(function(method) {
            context[method] = function() {
                return promise[method].apply(promise, arguments);
            }
        });
        return context;
    }

    /**
     * if is a thenable object
     * @method isThenable
     * @memberOf PromiseFeatures
     * @instance
     * @param  {Object} any
     * @return {Boolean} true or false
     */
    this.isThenable = function (any) {
        return !!any && !!any.then && (typeof any.then === 'function');
    }

    /**
     * if is a Promise object
     * @method isPromise
     * @memberOf PromiseFeatures
     * @instance
     * @param  {Object} any
     * @return {Boolean} true or false
     */
    this.isPromise = function (any) {
        return !!(any instanceof Promise);
    }

    /**
     * @typedef PromiseRecorder
     * @property {String} PromiseState pending/fulfilled/rejected
     * @property {*} PromiseResult fullfilled value or rejected reason
     */

    /**
     * record a Promise object's state and result.
     * @method record
     * @memberOf PromiseFeatures
     * @instance
     * @param  {Promise} promise a Promise object
     * @return {PromiseRecorder} a recorder
     */
    this.record = function(promise) {
        var recorder = Object.create(promise);

        if (Object.defineProperties) {
            var state = 'pending';
            var result;

            Object.defineProperties(recorder, {
                PromiseState: {
                    get: function() {
                        return state;
                    },
                    enmurable: false
                },

                PromiseResult: {
                    get: function() {
                        return result;
                    },
                    enmurable: false
                }
            });

            promise.then(function(ret) {
                state = 'fullfilled';
                result = ret;
            }, function(reason) {
                state = 'rejected';
                result = reason;
            });
        } else {
            recorder.PromiseState = 'pending';
            recorder.PromiseResult = undefined;

            promise.then(function(ret) {
                recorder.PromiseState = 'fullfilled';
                recorder.PromiseResult = ret;
            }, function(reason) {
                recorder.PromiseState = 'rejected';
                recorder.PromiseResult = reason;
            });
        }

        return recorder;
    }
}

/**
 * Some Utilities. Quick And Dirty.
 * @class  lib.promise~PromiseUtilities
 */
function PromiseUtilities() {
    var that = this;

    /**
     * a DOMContentLoaded Event promise
     * @method domReady
     * @memberOf PromiseUtilities
     * @instance
     * @return {Promise} a Promise object
     */
    var domReadyPrmoise = new Promise(function(resolve, reject) {
        if(document.readyState === 'complete') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', resolve);
        }
    });
    this.domReady = function() {
        return domReadyPrmoise;
    }
    
    /**
     * a load Event promise
     * @method pageLoad
     * @memberOf PromiseUtilities
     * @instance
     * @return {Promise} a Promise object
     */
    var pageLoadPromise = new Promise(function(resolve, reject) {
        window.addEventListener('load', resolve);
    });
    this.pageLoad = function() {
        return pageLoadPromise;
    }
    
    /**
     * a delay promise
     * @method delay
     * @memberOf PromiseUtilities
     * @param {Number} duration the delayed time(ms)
     * @instance
     * @return {Promise} a Promise object
     */
    this.delay = function (duration){
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, duration);
        });
    }

    /**
     * a Event promise
     * @method waitForEvent
     * @memberOf PromiseUtilities
     * @param {HTMLElement} element a dom elment
     * @param {String} eventName a event type/name
     * @param {Boolean} useCapture a event capture
     * @instance
     * @return {Promise} a Promise object
     */
    this.waitForEvent = function (element, eventName, useCapture){
        return new Promise(function(resolve, reject) {
            function handler(e) {
                element.removeEventListener(eventName, handler);
                resolve(e);
            }
            element.addEventListener(eventName, handler, useCapture);
        });
    }

    /**
     * a parallel promise
     * @method parallel
     * @memberOf PromiseUtilities
     * @param {Promise[]} promises a list of promises
     * @instance
     * @return {Promise} a Promise object
     */
    this.parallel = function (promises) {
        return Promise.all(promises.map(function(any){
            if (lib.promise.features.isThenable(any)) {
                return Promise.resolve(any);
            } else if (typeof any === 'function') {
                return any();
            } else {
                return any;
            }
        }));
    }

    /**
     * a serial promise
     * @method serial
     * @memberOf PromiseUtilities
     * @param {Promise[]} promises a list of promises
     * @instance
     * @return {Promise} a Promise object
     */
    this.serial = function (promises) {
        var promise = Promise.resolve();

        promises.forEach(function(any) {
            if (lib.promise.features.isThenable(any)) {
                promise = promise.then(function() {
                    return Promise.resolve(any);
                });
            } else if (typeof any === 'function') {
                promise = promise.then(any);
            } else {
                promise = promise.then(function() {
                    return any;
                });
            }
        });

        return promise;
    }
}

/**
 * @namespace lib
 */

/**
 * @namespace promise
 * @memberOf lib
 * @type {lib.promise~PromiseFeatures}
 * @property {Promise} ES6Promise Promise对象
 * @property {lib.promise~PromiseFeatures} features - 一些特性
 * @property {lib.promise~PromiseUtilities} utilities - 一些工具方法
 */
var features = new PromiseFeatures();
var utilities = new PromiseUtilities();
// 为了兼容老版本，所以lib.promise对象仍然是PrmoiseFeatures的实例
lib.promise = Object.create(features);
lib.promise.features = features;
lib.promise.utilities = utilities;
})(window, window['lib'] || (window['lib'] = {}));