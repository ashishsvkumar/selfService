// @ts-ignore
const ga = window && window.ga;

export function trackPageView(url: string = location.pathname) {
    ga("set", "page", url);
    ga("send", "pageview", url);
}
