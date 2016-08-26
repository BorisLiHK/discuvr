// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'com.discuvr.discuvr',
    name: 'discuvr',
    description: 'A location aware social discovery network',
    author: 'Discuvr Team',
    version: '0.0.1',
    buildNumber: '101'
});

// Set up resources such as icons and launch screens.
// App.icons({
//     'iphone': 'icons/icon-60.png',
//     'iphone_2x': 'icons/icon-60@2x.png',
//     // ... more screen sizes and platforms ...
// });
// App.launchScreens({
//     'iphone': 'splash/Default~iphone.png',
//     'iphone_2x': 'splash/Default@2x~iphone.png',
//     // ... more screen sizes and platforms ...
// });
//
// // Set PhoneGap/Cordova preferences
// App.setPreference('BackgroundColor', '0xff0000ff');
// App.setPreference('HideKeyboardFormAccessoryBar', true);
// App.setPreference('Orientation', 'default');
// App.setPreference('Orientation', 'all', 'ios');
//
// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('cordova-plugin-mapbox', {
    ACCESS_TOKEN: 'pk.eyJ1IjoiYWxleGQiLCJhIjoiY2lycmd5anZpMGk1cGZrbTYzMHU3OGJ5YiJ9.5cKvcoZRsDYxzFsCjJLG4Q'
});
