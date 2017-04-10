import { Observable } from 'rxjs/Observable';
var toastr = require('toastr');

var CLIENT_ID = process.env.CLIENT_ID;
var KEY = process.env.YOUTUBE_KEY;
var CHANNEL_ID = process.env.CHANNEL_ID;

var googleClientApiUrl = 'https://apis.google.com/js/api.js';
var subscribeScope = 'https://www.googleapis.com/auth/youtube';
var subscribeDiscoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

var gapiHelper = function() {
    var subscribeParams = {
        'part': 'id, snippet',
        'snippet': {
            'resourceId': {
                'kind': 'youtube#channel',
                'channelId': CHANNEL_ID
            }
        }
    };

    return Observable.create(function(observer) {
        var GoogleAuth;
        var gapiScript = document.createElement('script');
        gapiScript.id = 'gapiScript';
        gapiScript.src = googleClientApiUrl;
        gapiScript.onload = function() {
            gapi.load('client:auth2', function() {
                gapi.client.init({
                    'apiKey': KEY,
                    'clientId': CLIENT_ID,
                    'scope': subscribeScope,
                    'discoveryDocs': subscribeDiscoveryDocs
                }).then(function() {
                    GoogleAuth = gapi.auth2.getAuthInstance();
                    GoogleAuth.signIn().then(function() {
                        if (GoogleAuth.isSignedIn.get()) {
                            var request = gapi.client.youtube.subscriptions.insert(subscribeParams);
                            request.execute(function(res) {
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
                        var scriptToRemove = document.getElementById('gapiScript');
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
