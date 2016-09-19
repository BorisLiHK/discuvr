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
  //ios
  'iphone':'resources/icons/icon.png',
  'iphone_2x':'resources/icons/icon@2x.png',
  'iphone_3x':'resources/icons/icon@3x.png',
  'ipad':'resources/icons/icon-ipad.png',
  'ipad_2x':'resources/icons/icon-ipad@2x.png',
  'ipad_pro':'resources/icons/icon-ipad@3x.png',
  // Android
  'android_ldpi': 'resources/icons/icon-ldpi.png',
  'android_mdpi': 'resources/icons/icon-mdpi.png',
  'android_hdpi': 'resources/icons/icon-hdpi.png',
  'android_xhdpi': 'resources/icons/icon-xhdpi.png'
});
App.launchScreens({
  //ios
  'iphone':'resourecs/splash/splash.png',
  'iphone_2x':'resources/splash/splash@2x.png',
  'iphone5':'resources/splash/splash5@2x.png',
  'iphone6':'resources/splash/splash6@2x.png',
  'iphone6p_portrait':'resources/splash/splash@3x.png',
  'ipad_portrait':'resources/splash/splash-ipad.png',
  'ipad_portrait_2x':'resources/splash/splash-ipad@2x.png',
  // Android
  'android_ldpi_portrait': 'resources/splash/splash-ldpi.png',
  'android_mdpi_portrait': 'resources/splash/splash-mdpi.png',
  'android_hdpi_portrait': 'resources/splash/splash-hdpi.png',
  'android_xhdpi_portrait': 'resources/splash/splash-xhdpi.png'
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
