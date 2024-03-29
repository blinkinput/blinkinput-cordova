# BlinkInput SDK wrapper for Cordova

This repository contains example wrapper for BlinkInput native SDKs ([iOS](https://github.com/BlinkInput/blinkinput-ios) and [Android](https://github.com/BlinkInput/blinkinput-android)). Not all features of native SDKs are available in Cordova wrapper. However, the wrapper is open source, so you can easily add features that you need. For 100% of features and maximum control, consider using native SDKs.

## Cordova version
BlinkInput Cordova requires Cordova **v7.0.0 or later** and cordova-android plugin **v8.0.0 or later**.

## Ionic version

Latest version has been tested using Ionic **3.19.0** version.

## Adding blinkinput-cordova to your application

You can add blinkinput-cordova by cloning the repository and following instructions below or by running

```shell
cordova plugin add blinkinput-cordova
```

> The shown instructions are for **Cordova**, the instructions for **Ionic** are practically the same, except for some slight command line argument differences.

In the repository you will find scripts to create sample applications.

## Clone or Download repository
Downloading a repository just downloads the files from the most recent commit of the default branch but without all the dependencies which are in submodules. We recommend that you clone directory. With a clone option you will get a copy of the history and it’s functional git repository.

To clone repository:

+ **Copy URL from the `Clone or download` button: https://github.com/BlinkInput/blinkinput-cordova.git**
+ **Open terminal on Mac/Linux or [GitBash](https://git-for-windows.github.io/) on Windows.**
+ **cd into directory where you want the cloned directory to be made.**
+ **Type `git clone ` , than past URL**
+ **Press enter**

## How to get started

### Cordova

Sample Cordova app is generated with a script

```shell
./initCordovaDemoApp.sh
```

To run iOS demo application open Xcode project `BlinkInputDemo.xcodeproj`

To run Android demo application type

```shell
cordova run android
```

### Ionic

Sample Ionic app is generated with a script

```shell
./initIonicDemoApp.sh
```

When Ionic asks the following question **Would you like to integrate your new app with Cordova to target native iOS and Android?** answer with **y**.

To run iOS demo application open Xcode project `BlinkInputDemo.xcodeproj`

To run Android demo application type

```shell
ionic run android
```

### Licensing

- A valid license key is required to initialize scanning. You can request a **free trial license key**, after you register, at [Microblink Developer Hub](https://account.microblink.com/signin)

- Get information about pricing and licensing of [BlinkInput](https://microblink.com/blinkinput)
  
## Installation

First generate a empty project if needed:

```shell
cordova create <path> <package> <name>
```

> The shown instructions are for **Cordova**, the instructions for **Ionic** are practically the same, except for some slight command line argument differences.

Initialize the iOS framework:

```shell
cd BlinkInput
./initIOSFramework.sh
cd ..
```

Add the **BlinkInput** plugin to your project:

```shell
cd <path_to_your_project>
cordova plugin add <blinkInput_plugin_path> # or blinkinput-cordova if you don't have blinkinput-cordova locally
```

**Ionic specific:**

Copy the BlinkInput plugin's JavaScript files to your project:
```shell
cp  -f -r <blinkInput_plugin_path>/www/js ./www/
```

### Android

Add Android platform support to the project:

    cordova platform add android@8
    
### iOS

> If you want to add iOS as a platform for your application, you will need to install **unzip** and **wget**.

Add iOS plaform support to the project:

    cordova platform add ios

## Sample

Here's a complete example of how to create and build a project for **Android** and **iOS** using **cordova**:

```shell
# pull the plugin and sample application from Github
git clone https://github.com/BlinkInput/blinkinput-cordova.git

# create a empty application
cordova create testcordova

cd testcordova

# add the blinkInput plugin
cordova plugin add ../blinkinput-cordova/BlinkInput # or just 'blinkinput-cordova' if you don't have blinkinput-cordova locally

# add android support to the project
cordova platform add android@8

# build the project, the binary will appear in the bin/ folder
cordova build android

# add ios support to the project
cordova platform add ios

# build the project
cordova build ios
```

In **cordova** CLI instead of `platform add` just request a build for the platform using `build android` or `build ios`. You will have to do the manual steps described above to be able to do a successfull build.

You can also use provided `initDemoApp.sh` script that will generate a demo app that uses the plugin:

```shell
./initCordovaDemoApp.sh
```

To run the script, you'll need BASH environment on Windows (Linux and MacOS use BASH by default).


## Usage

To use the plugin you call it in your Javascript code like the [demo application](www/js/index.js).

Documentation for all features and JS API is available in [blinkInputScanner.js JS API file](BlinkInput/www/blinkInputScanner.js).


## Changing scanner settings

To change scanner settings you need to modify Cordova plugin classes for iOS and Android. Plugin classes are located in `./BlinkInput/src`. All necessary settings documentation is located in those source files. 

For platform specific implementation details refer to the [BlinkInput-iOS](https://github.com/BlinkInput/blinkinput-ios) and [BlinkInput-android](https://github.com/BlinkInput/blinkinput-android) documentation.
