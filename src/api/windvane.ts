import * as log from 'loglevel';
import { currentEnvironment, Environments } from '../config/environment';
import { get, has } from 'lodash';
// @ts-ignore
const windvane = window.WindVane;

export const enum Host {
    IOS_WEBVIEW = "iOS-Webview",
    ANDROID_WEBVIEW = "Android-Webview",
    WEB = "Web"
}

function getHostEnvironment(): Promise<Host> {
    return windvane.call('Base', 'isWindVaneSDK', {}).then((response: any) => {
        if (response.os === 'ios') {
            return Host.IOS_WEBVIEW;
        } else {
            return Host.ANDROID_WEBVIEW
        }
    }).catch((err: any) => Host.WEB);
}

export function isInWebView(): Promise<boolean> {
    return getHostEnvironment().then(host => host !== Host.WEB);
}

export function showToast(message: string, duration: number = 5) {
    isInWebView().then(yes => {
        yes && windvane.call('WVUIToast', 'toast', { message, duration });
    })
}

export function openBrowser(url: string) {
    isInWebView().then(yes => {
        yes && windvane.call('Base', 'openBrowser', { url });
    })
}

export function initiateLogin(onSuccess?: () => void, onFailure?: () => void) {
    isInWebView().then(yes => {
        yes && windvane.call('LAWVUserInfo', 'login', {}).then((response: any) => {
            if (response.success === "true") {
                log.info('User login successful')
                onSuccess && onSuccess();
            } else {
                log.info('User login failed');
                onFailure && onFailure();
            }
        });
    });
}

export function isWindVandAvailable(): boolean {
    // @ts-ignore
    return window.lib.windvane.isAvailable;
}

export function takePhoto(callback: (url: string) => void) {
    isInWebView().then(yes => {
        if (!yes) {
            return;
        } 

        const param = {
            type: '1',
            v: '2.0',
            mode: 'both',
            //needBase64: true,
            bizCode: 'lazada-im-sg'
        };

        windvane.call('WVCamera', 'takePhoto', param).then((response: any) => {
            log.info('User has selected an image', response);

            windvane.call('Base', 'copyToClipboard', { text: JSON.stringify(response, null, '\t') });
            alert('User selected image: ' + JSON.stringify(response).substring(0, 100) + '...');

            callback(response.resourceURL);
            // if (has(response, 'base64Data')) {
            //     if (response.base64Data.indexOf('/9j/') === 0) {
            //         callback(`data:image/jpg;base64,${response.base64Data}`);
            //     } else {
            //         callback(`data:image/png;base64,${response.base64Data}`);
            //     }
            // } else {
            //     callback(response.url);
            // }

        }).catch((err: any) => {
            
            windvane.call('Base', 'copyToClipboard', { text: JSON.stringify(err) });
            //alert('Failure while selecting the image: ' + JSON.stringify(err, null, '\t'));

            log.warn('User has cancelled image selection', err);
            callback(null);
        });
    })
}