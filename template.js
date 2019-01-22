const log = require('loglevel');
const devMode = process.env.NODE_ENV !== 'production'
const fs = require("fs");
const request = require("request");

function prepareUrl() {
    return `http://selfservice-api${devMode ? '.alpha' : ''}.redmart.com/v1.0.0/support/icms/all`;
}

function prepareInlineLibs() {
    const infix = devMode ? '.debug' : '';

    const commonUrls = [
        '//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-sham.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-shim.min.js',
        '//cdnjs.cloudflare.com/ajax/libs/es6-shim/0.34.2/es6-sham.min.js',
        '//wzrd.in/standalone/es7-shim@latest',
        '//cdnjs.cloudflare.com/ajax/libs/json2/20160511/json2.min.js'
    ];

    const aliUrls = [
        `//g.alicdn.com/mtb/lib-mtop/2.3.14/mtop${infix}.js`,
        `//g.alicdn.com/mtb/lib-promise/3.1.1/polyfillB${infix}.js`
    ];

    const lazUrls = [
        `//laz-g-cdn.alicdn.com/mtb/??3rd/0.0.10/require.js`,
        `//laz-g-cdn.alicdn.com/mtb/??lib-promise/3.0.1/polyfillB${infix}.js`,
        `//laz-g-cdn.alicdn.com/mtb/??lib-env/1.9.9/env${infix}.js`,
        `//laz-g-cdn.alicdn.com/mtb/??lib-mtop/2.4.5/mtop${infix}.js`,
        `//laz-g-cdn.alicdn.com/mtb/??lib-mtop/1.6.3/middleware${infix}.js`,
        `//laz-g-cdn.alicdn.com/mtb/??lib-windvane/2.1.8/windvane${infix}.js`
    ];

    return lazUrls.map(j => `<script src="${j}"></script>`).reduce((s1, s2) => s1 + s2);
}

function fetchComponent() {
    //const file = fs.createWriteStream("data.txt");
    const url = prepareUrl();
    log.info('Calling', url);

    return new Promise(function (resolve, reject) {
        // Do async job
        request(url, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
}

fetchComponent().then(result => {
    const desktopTemplate = prepareTemplate(result.desktop.head, result.desktop.header, result.desktop.footer);
    fs.writeFileSync('desktop.html', desktopTemplate);
    log.info('[TEMPLATE] Desktop template ready');

    const mobileTemplate = prepareTemplate(result.mobile.head, result.mobile.header, result.mobile.footer);
    fs.writeFileSync('mobile.html', mobileTemplate);
    log.info('[TEMPLATE] MOBILE template ready');
});

function prepareTemplate(head, header, footer) {
    return `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        ${prepareInlineLibs()}
        ${head}
    </head>
    <body>
        ${header}
        <div id="rm-cs-app"></div>    
        ${footer}
    </body>
</html>`;
}