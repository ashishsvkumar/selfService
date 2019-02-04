const log = require('loglevel');
const devMode = process.env.NODE_ENV !== 'production'
const fs = require("fs");
const request = require("request");

function prepareUrl() {
    return `http://selfservice-api${devMode ? '.alpha' : ''}.redmart.com/v1.0.0/support/icms/all`;
}

function prepareInlineLibs() {
    const infix = devMode ? '.debug' : '';

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
        <link rel="shortcut icon" href="//laz-img-cdn.alicdn.com/tfs/TB1f5qJef6H8KJjy0FjXXaXepXa-16-16.ico">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        ${prepareInlineLibs()}
        <script>__rm__env__="${process.env.NODE_ENV}"</script>
        ${head}
    </head>
    <body>
        ${header}
        <div id="rm-cs-app"></div>    
        ${footer}
    </body>
</html>`;
}