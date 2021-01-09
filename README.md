# React native module for Twilio Verify

[![License](https://img.shields.io/badge/License-Apache%202-blue.svg?logo=law)](https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE)

Twilio Verify Push SDK helps you verify users by adding a low-friction, secure, cost-effective, 'push verification' factor into your own mobile application. This project provides an SDK to implement Verify Push for your react native app.

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

## Usage

### Create factor

```js
import RNTwilioVerify from 'react-native-twilio-verify';

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

Go to `ios` and install the pods

```sh
pod install
```

Go to `example` and install the packages

```sh
yarn install
```

Go to `example/ios` and install the pods

```sh
pod install
```

Run Android app

```sh
yarn example android
```

Run iOS app

```sh
yarn example ios
```

## Running the Sample backend

- Clone this repo: https://github.com/twilio/verify-push-sample-backend
- Configure a [Push Credential](https://www.twilio.com/docs/verify/quickstarts/push-android#create-a-push-credential) for the sample app, using the same [Firebase project](#FirebaseConfiguration) you configured
- Configure a [Verify Service](https://www.twilio.com/docs/verify/quickstarts/push-android#create-a-verify-service-and-add-the-push-credential), using the Push Credential for the sample app
- Run the steps in the [README file](https://github.com/twilio/verify-push-sample-backend/blob/master/README.md)

## Errors

| Types                | Code  | Description                               |
| -------------------- | ----- | ----------------------------------------- |
| Network              | 68001 | Exception while calling the API           |
| Mapping              | 68002 | Exception while mapping an entity         |
| Storage              | 68003 | Exception while storing/loading an entity |
| Input                | 68004 | Exception while loading input             |
| Key Storage          | 68005 | Exception while storing/loading key pairs |
| Initialization       | 68006 | Exception while initializing an object    |
| Authentication Token | 68007 | Exception while generating token          |
