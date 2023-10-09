# React native module for Twilio Verify

[![License](https://img.shields.io/badge/License-Apache%202-blue.svg?logo=law)](https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE)

## About
Twilio Verify Push SDK helps you verify users by adding a low-friction, secure, cost-effective, "push verification" factor into your own mobile application. This fully managed API service allows you to seamlessly verify users in-app via a secure channel, without the risks, hassles or costs of One-Time Passcodes (OTPs).
This project provides a library to implement Verify Push for your react native app.

## Dependencies

React native 0.66.5

## Installation

* Add the library to your project:
```sh
yarn add https://github.com/twilio/twilio-verify-for-react-native.git
```

* Install the pods for your project
```sh
npx pod-install
```

## Enable push notifications

### Register your iOS App with APNs

If you want to receive challenges as push notifications, you should register Your App with APNs. 

More info [here](https://www.twilio.com/docs/verify/quickstarts/push-ios#set-up-apns-for-your-ios-app)

### Add firebase configuration for your Android App

If you want to receive challenges as push notifications, you should add a firebase configuration to your project
* Add a project in Firebase to use cloud messaging for an application ID
* Add the google-services.json file to your project

More info [here](https://www.twilio.com/docs/verify/quickstarts/push-android#set-up-fcm-for-your-android-app)

### Add a push notification library

After setting up push notifications for Android & iOS, you should add a react native library to receive notifications from APN for iOS and FCM for Android. 

The example app is using [react-native-push-notification](https://github.com/zo0r/react-native-push-notification), you can find the full example source [here](https://github.com/twilio/twilio-verify-for-react-native/tree/main/example/src/push)

## Usage

### Create factor

```js
import TwilioVerify, { PushFactorPayload } from '@twilio/twilio-verify-for-react-native';

let factor = await TwilioVerify.createFactor(
  new PushFactorPayload(
    factorName,
    verifyServiceSid,
    identity,
    accessToken,
    pushToken
  )
);
```

### Verify factor

```js
await TwilioVerify.verifyFactor(new VerifyPushFactorPayload(factor.sid));
```

### Get challenge

```js
let challenge = await TwilioVerify.getChallenge(challengeSid, factorSid);
```

### Update challenge

```js
await TwilioVerify.updateChallenge(
  new UpdatePushChallengePayload(factorSid, challengeSid, newStatus)
);
```

### Get factors

```js
let factors = await TwilioVerify.getAllFactors();
```

### Get challenges

```js
let challenges = await TwilioVerify.getAllChallenges(
  new ChallengeListPayload(factorSid, 10, ChallengeStatus.Pending, ChallengeListOrder.Desc)
);
```

### Delete factor

```js
await TwilioVerify.deleteFactor(factorSid);
```

### Clear local storage

You can clear local storage calling the `TwilioVerify.clearLocalStorage` method:

```js
await TwilioVerify.clearLocalStorage();
```

Note: Calling this method will not delete factors in **Verify Push API**, so you need to delete them from your backend to prevent invalid/deleted factors when getting factors for an identity.

## Running the Sample app

Install the packages in the `twilio-verify-for-react-native` project

```sh
yarn install
```

Install the packages in the `example` app

```sh
cd example
yarn install
```

### iOS

* Go to `example` and install the pods

```sh
cd example
npx pod-install
```

* Change the Bundle Identifier to something unique so Apple’s push notification server can direct pushes to this app
* [Enable push notifications](https://help.apple.com/xcode/mac/current/#/devdfd3d04a1)
* Get the `Access token generation URL` from your backend [(Running the sample backend)](#SampleBackend). You will use it for creating a factor

* Run iOS app in `twilio-verify-for-react-native` root folder

```sh
yarn example ios
```

> **_NOTE:_**  There could be incompatibility issues with the react native version and your environment, so running the project from Xcode could share more details about the error and how to fix it

### Android

* Follow the steps from [Firebase configuration](https://firebase.google.com/docs/android/setup#console), follow steps 1 to 3
  * For step 3.1, the google-services.json file should be copied to example/android/app
  * Google services plugin is included in the sample app, so you don't need step 3.2
* Get the `Access Token generation URL` from your backend [(Running the Sample backend)](#SampleBackend). You will use it for creating a factor

* Run Android app in `twilio-verify-for-react-native` root folder

```sh
yarn example android
```

<a name='SampleBackend'></a>

## Running the Sample backend

- Configure a Push Credential for the sample app, using the same Firebase project you configured for [Android](https://www.twilio.com/docs/verify/quickstarts/push-android#create-a-push-credential), and using the same APNs configuration for [iOS](https://www.twilio.com/docs/verify/quickstarts/push-ios#create-a-push-credential)
- Configure a Verify Service, using the Push Credential for the sample app ([Android](https://www.twilio.com/docs/verify/quickstarts/push-android#create-a-verify-service-and-add-the-push-credential) & [iOS](https://www.twilio.com/docs/verify/quickstarts/push-ios#create-a-verify-service-and-add-the-push-credential))
- Go to: https://www.twilio.com/code-exchange/verify-push-backend
- Use the `Quick Deploy to Twilio` option
  - You should log in to your Twilio account
  - Enter the Verify Service Sid you created above, you can find it [here](https://www.twilio.com/console/verify/services)
  - Deploy the application
  - Press `Go to live application`
  - You will see your backend's start page, copy the url and replace `index.html` with `access-token`.(e.g. https://verify-push-backend-xxxxx.twil.io/access-token). This will be your `Access Token generation URL`

## Using the sample app

### Adding a factor
* Press Create factor in the factor list
* Enter the identity to use. This value should be an UUID that identifies the user to prevent PII information use
* Enter the Access token URL (Access token generation URL, including the path, e.g. https://verify-push-backend-xxxxx.twil.io/access-token)
* Press Create factor
* Copy the factor Sid

### Sending a challenge
* Go to `Create a push challenge` section in your sample backend (https://verify-push-backend-xxxxx.twil.io/index.html)
* Enter the `Identity` you used in factor creation
* Enter the `Factor Sid` you added
* Enter a `message`. You will see the message in the push notification and in the challenge view
* Enter details to the challenge. You will see them in the challenge view. You can add more details using the `Add more Details` button
* Press `Create challenge` button
* You will receive a push notification showing the challenge message in your device. 
* The app will show the challenge info below the factor information, in a `Challenge` section
* Approve or deny the challenge
* After the challenge is updated, you will see the challenge status in the backend's `Create a push challenge` section, as `Login request approved!` or `Login request denied!`, below the `Create challenge` button

## Errors

[Android](https://github.com/twilio/twilio-verify-android#errors)

[iOS](https://github.com/twilio/twilio-verify-ios#errors)
