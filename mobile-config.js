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
App.icons({
	//Android
	'android_ldpi':'resources/icons/icon-36x36.png',
	'android_mdpi':'resources/icons/icon-48x48.png',
	'android_hdpi':'resources/icons/icon-72x72.png',
	'android_xhdpi':'resources/icons/icon-96x96.png'
});
App.launchScreens({
	//Android
	'android_ldpi_portrait':'resources/splash/splash-200x300.png',
	'android_mdpi_portrait':'resources/splash/splash-320x480.png',
	'android_hdpi_portrait':'resources/splash/splash-480x800.png',
	'android_xhdpi_portrait':'resources/splash/splash-720x1280.png'
});
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
