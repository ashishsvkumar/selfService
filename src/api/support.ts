import axios from 'axios';
import fetch from 'cross-fetch';
import { supportBase } from '../config/endpoints';
const CancelToken = axios.CancelToken;
import * as log from 'loglevel';
import { Ticket } from '../store/ticket/types';

function getUploadUrl(): Promise<String> {
    return fetch(`${supportBase}/ticket/attachment`).then((response: any) => {
        if (response.status === 200) {
            const url = response.text();
            log.info('Fetched upload url', url)
            return url
        }
        return null;
    }).catch(err => null);
}

export function uploadFile(name: string, file: File,
    onProgress: (name: string, done: number, total: number) => void,
    cancel: (name: string, callback: Function) => void
): Promise<string> {
    return getUploadUrl().then((url: string) => {
        if (url === null) {
            log.error('Could not upload file. No url to upload to.');
            return null;
        }

        const config: any = {
            // headers: {
            //     'Content-Type': 'file/image',
            //     'Content-Disposition': 'inline'
            // },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel(name, c);
            }),
            onUploadProgress: (event: any) => onProgress(name, event.loaded, event.total)
        };

        var data = new FormData();
        data.append('file', file);

        return axios.put(url, data, config).then(response => {
            if (response.status === 200) {
                log.info('File uploaded', response.statusText);
                return url.split('?')[0];
            } else {
                log.error('File uploade failed', response);
                return null;
            }
        }).catch(err => {
            log.error('Error while uploading the file', err);
            return 'NA';
        })
    });
}

export function ticketCreate(ticket: Ticket) {
    return fetch(
        `${supportBase}/ticket`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ticket: ticket})
        }
    )
}