import * as log from 'loglevel';

function getGA() {
    // @ts-ignore
    const ga = window && window.ga;

    return ga;
}

export function trackPageView(url: string = location.pathname) {
    try {
        const ga = getGA();

        ga("set", "page", url);
        ga("send", "pageview", url);
    }
    catch (err) {
        log.error('Error for GA view', err);
    }
}

export function trackEvent(category: string, action: string, value: string) {
    try {
        const ga = getGA();
        const label = location.pathname;

        ga("send", "event", category, action, label, value, { nonInteraction: false });
    }
    catch (err) {
        log.error('Error for GA event', err);
    }
}
