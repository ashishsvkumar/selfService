import * as log from 'loglevel';
import {currentEnvironment, Environments} from '../config/environment';

interface SnapEngageStructure {
    startChat: () => void
}

let snapEngageInstance: SnapEngageStructure = null;

function getSnapEngageScriptSource(): string {
    if (currentEnvironment === Environments.production) {
        return '//storage.googleapis.com/code.snapengage.com/js/e8b139d3-0051-4b76-81a4-dc61a4639da4.js';
    } else {
        return '//storage.googleapis.com/code.snapengage.com/js/8b59b679-9d15-4cb4-aabe-cc9f568d063a.js'
    }
}

export function setupSnapEngage() {
    log.info('Loading SnapEngage chat');

    try {
        document.getElementById('webim-container').style.display = 'none';
    }
    catch(err) {
        // Do nothing
    }

    const script = document.createElement('script'); 
    script.type = 'text/javascript'; 
    script.async = true;
    script.src = getSnapEngageScriptSource();

    script.onload = function() {
        log.info('Loaded SnapEngage chat');
        // @ts-ignore
        snapEngageInstance = window.SnapEngage;
    }

    document.head.appendChild(script);
}

export function snapEngage(): Promise<SnapEngageStructure> {
    // @ts-ignore
    return new Promise<SnapEngageStructure>((resolve: Function, reject: Function) => {
        if (snapEngageInstance !== null) {
            resolve(snapEngageInstance);
        } else {
            reject('SnapEngage not ready yet');
        }
    });
}

export function startChat() {
    return snapEngage().then(se => se.startChat());
}
