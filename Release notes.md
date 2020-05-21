# Release notes

## 4.3.0

-  Initial plugin release  with [iOS SDK](https://github.com/BlinkInput/blinkinput-ios)  v4.3.0 and [Android SDK](https://github.com/BlinkInput/blinkinput-android) v4.3.0
-  This plugin has all `Parser` objects from [BlinkInput iOS SDK](https://github.com/BlinkInput/blinkinput-ios) and [BlinkInput Android SDK](https://github.com/BlinkInput/blinkinput-android)
- Use `Parsers` with `FieldByFieldElement` and `FieldByFieldCollection`
- We exported `FieldByField` overlay which is responsible for view hierarchy for Form OCR scannning
	- Initalize it with `FieldByFieldCollection`
- We exported `DocumentCapture` functionality
- Please try out our Sample project
	- Use `initCordovaDemoApp.sh` for Cordova or `initIonicDemoApp.sh` for Ionic project