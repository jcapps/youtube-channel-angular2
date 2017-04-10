import { Observable } from 'rxjs/Observable';
const toastr = require('toastr');

const CLIENT_ID = process.env.CLIENT_ID;
const KEY = process.env.YOUTUBE_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

const googleClientApiUrl = 'https://apis.google.com/js/api.js';
const subscribeScope = 'https://www.googleapis.com/auth/youtube';
const subscribeDiscoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

const gapiHelper = () => {
    const subscribeParams = {
        'part': 'id, snippet',
        'snippet': {
            'resourceId': {
                'kind': 'youtube#channel',
                'channelId': CHANNEL_ID
            }
        }
    };

    return Observable.create(observer => {
        let GoogleAuth;
        let gapiScript = document.createElement('script');
        gapiScript.id = 'gapiScript';
        gapiScript.src = googleClientApiUrl;
        gapiScript.onload = () => {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    'apiKey': KEY,
                    'clientId': CLIENT_ID,
                    'scope': subscribeScope,
                    'discoveryDocs': subscribeDiscoveryDocs
                }).then(() => {
                    GoogleAuth = gapi.auth2.getAuthInstance();
                    GoogleAuth.signIn().then(() => {
                        if (GoogleAuth.isSignedIn.get()) {
                            let request = gapi.client.youtube.subscriptions.insert(subscribeParams);
                            request.execute(res => {
                                toastr.options = { positionClass: 'toastr-center' };
                                if (res.result) {
                                    toastr.success('Subscribed!');
                                } else {
                                    toastr.error(res.error.message);
                                }
                            });
                        } else {
                            toastr.error('Unable to sign in.');
                        }
                        let scriptToRemove = document.getElementById('gapiScript');
                        scriptToRemove.parentNode.removeChild(scriptToRemove);
                        observer.complete();
                    });
                });
            });
        };
        document.getElementsByTagName('head')[0].appendChild(gapiScript);
    });
}

export default gapiHelper;
