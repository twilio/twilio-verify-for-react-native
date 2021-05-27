# React native module for Twilio Verify

[![License](https://img.shields.io/badge/License-Apache%202-blue.svg?logo=law)](https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE)

## About
Twilio Verify Push SDK helps you verify users by adding a low-friction, secure, cost-effective, "push verification" factor into your own mobile application. This fully managed API service allows you to seamlessly verify users in-app via a secure channel, without the risks, hassles or costs of One-Time Passcodes (OTPs).
This project provides an SDK to implement Verify Push for your react native app.

## Installation

```sh
npm install https://github.com/twilio/react-native-twilio-verify
```

Install the packages

```sh
yarn install
```

Go to node_modules/react-native-twilio-verify/ios and install the pods

```sh
pod install
```

Go to your iOS project and install the pods

```sh
pod install
```

### Register your iOS App with APNs

If you want to receive challenges as push notifications, you should register Your App with APNs. More info [here](https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns)

### Add firebase configuration for your Android App

If you want to receive challenges as push notifications, you should add a firebase configuration to your project
* Add a project in Firebase to use cloud messaging for an application ID
* Add the google-services.json file to your project

More info [here](https://firebase.google.com/docs/android/setup#console), follow steps 1 to 3

## Usage

### Create factor

```js
import TwilioVerify, { PushFactorPayload } from 'react-native-twilio-verify';

let factor = await TwilioVerify.createFactor(
  new PushFactorPayload(
    factorName,
    verifyServiceSid,
    identity,
    pushToken,
    accessToken
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

Install the packages

```sh
yarn install
```

### iOS

* Go to `ios` and install the pods

```sh
pod install
```

* Change the Bundle Identifier to something unique so Apple’s push notification server can direct pushes to this app
* [Enable push notifications](https://help.apple.com/xcode/mac/current/#/devdfd3d04a1)
* Get the Access token generation URL from your backend [(Running the Sample backend)](#SampleBackend). You will use it for creating a factor

* Go to `example` and install the packages

```sh
yarn install
```

* Go to `example/ios` and install the pods

```sh
pod install
```

* Run iOS app

```sh
yarn example ios
```

### Android

* Follow the steps from [Firebase configuration](https://firebase.google.com/docs/android/setup#console), follow steps 1 to 3
* Get the Access Token generation URL from your backend [(Running the Sample backend)](#SampleBackend). You will use it for creating a factor
* Go to `example` and install the packages

```sh
yarn install
```

* Run Android app

```sh
yarn example android
```

## Running the Sample backend

- Clone this repo: https://github.com/twilio/verify-push-sample-backend
- Configure a Push Credential for the sample app, using the same Firebase project you configured for [Android](https://www.twilio.com/docs/verify/quickstarts/push-android#create-a-push-credential), and using the same APNs configuration for [iOS](https://www.twilio.com/docs/verify/quickstarts/push-ios#create-a-push-credential)
- Configure a Verify Service, using the Push Credential for the sample app ([Android](https://www.twilio.com/docs/verify/quickstarts/push-android#create-a-verify-service-and-add-the-push-credential) & [iOS](https://www.twilio.com/docs/verify/quickstarts/push-ios#create-a-verify-service-and-add-the-push-credential))
- Run the steps in the [README file](https://github.com/twilio/verify-push-sample-backend/blob/master/README.md)

## Using the sample app

### Adding a factor
* Press Create factor in the factor list
* Enter the identity to use. This value should be an UUID that identifies the user to prevent PII information use
* Enter the Access token URL (Access token generation URL, including the path, e.g. https://yourapp.ngrok.io/accessTokens)
* Press Create factor
* Copy the factor Sid

### Sending a challenge
* Go to Create Push Challenge page (/challenge path in your sample backend)
* Enter the `identity` you used in factor creation
* Enter the `Factor Sid` you added
* Enter a `message`. You will see the message in the push notification and in the challenge view
* Enter details to the challenge. You will see them in the challenge view. You can add more details using the `Add more Details` button
* Press `Create challenge` button
* You will receive a push notification showing the challenge message in your device. 
* The app will show the challenge info below the factor information, in a `Challenge` section
* Approve or deny the challenge
* After the challenge is updated, you will see the challenge status in the backend's `Create Push Challenge` view

## Errors

[Android](https://github.com/twilio/twilio-verify-android#errors)

[iOS](https://github.com/twilio/twilio-verify-ios#errors)
