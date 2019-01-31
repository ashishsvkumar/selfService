import { isWindVandAvailable } from "../api/windvane";

const mobileKeyWords = ['iphone', 'ipad', 'android', 'mobile'];

export function switchMode() {
    const isInMobileSite = location.pathname.indexOf('/m') === location.pathname.length - 2 || location.pathname.indexOf('/m/') >= 0;  
    
    if (isInMobileSite && !isMobileAgent()) {
        // @ts-ignore
        window.location = location.href.replace('/m', '');
    } else if (!isInMobileSite && isMobileAgent()) {
        // @ts-ignore
        window.location = location.href.replace('/support', '/support/m');
    }
}

function isMobileAgent() {
    if (isWindVandAvailable()) {
        return true;
    }
    if (window.navigator && window.navigator.userAgent) {
        const agent = window.navigator.userAgent.toLowerCase();
        return mobileKeyWords.some(word => agent.indexOf(word) >= 0);
    }

    return false;
}