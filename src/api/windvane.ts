import * as log from 'loglevel';
import { currentEnvironment, Environments } from '../config/environment';
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

        windvane.call('WVCamera', 'takePhoto', { type: '0' }).then((response: any) => {
            log.info('User has selected an image', response);
            callback(response.url);

            if (currentEnvironment !== Environments.production) {
                alert(JSON.stringify(response));
            }

        }).catch((err: any) => {
            log.warn('User has cancelled image selection', err);
            callback(null);
        });
    })
}