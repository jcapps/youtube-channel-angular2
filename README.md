# youtube-channel-angular2
Site showcasing my YouTube channel using Node.js, Webpack2, Express.js, Angular2, and Typescript. Tests are written with Jasmine.

## Running the application
Download or clone the project and run ```npm install``` in the project directory to install the ```node_modules```.

One file is missing from this github repository which you will need to add. This file contains the Channel ID of my YouTube channel, a Google API key which leverages the YouTube Data API v3, and the corresponding Client ID of the registered application.

The file should be named ```youtubeInfo.js``` and should be placed in ```~/tools/private/``` directory. The contents of the file will look as follows:
```
module.exports = {
    CLIENT_ID: 'xxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    API_KEY: 'XXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXX',
    CHANNEL_ID: 'UCSijnYFYz5vMIntY_rdkWwQ'
};
```

Once the ```node_modules``` have been installed and the ```youtubeInfo.js``` file has been created, run ```npm start``` to launch the application.