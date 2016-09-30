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

// Set up public such as icons and launch screens.
App.icons({
  //ios
  'iphone_2x':'public/icons/icon@2x.png',
  'iphone_3x':'public/icons/icon@3x.png',
  'ipad':'public/icons/icon-ipad.png',
  'ipad_2x':'public/icons/icon-ipad@2x.png',
  'ipad_pro':'public/icons/icon-ipad@3x.png',
  // Android
  'android_ldpi': 'public/icons/icon-ldpi.png',
  'android_mdpi': 'public/icons/icon-mdpi.png',
  'android_hdpi': 'public/icons/icon-hdpi.png',
  'android_xhdpi': 'public/icons/icon-xhdpi.png'
});
App.launchScreens({
  //ios
  'iphone_2x':'public/splash/splash@2x.png',
  'iphone5':'public/splash/splash5@2x.png',
  'iphone6':'public/splash/splash6@2x.png',
  'iphone6p_portrait':'public/splash/splash@3x.png',
  'ipad_portrait':'public/splash/splash-ipad.png',
  'ipad_portrait_2x':'public/splash/splash-ipad@2x.png',
  // Android
  'android_ldpi_portrait': 'public/splash/splash-ldpi.png',
  'android_mdpi_portrait': 'public/splash/splash-mdpi.png',
  'android_hdpi_portrait': 'public/splash/splash-hdpi.png',
  'android_xhdpi_portrait': 'public/splash/splash-xhdpi.png'
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
