# react-native-twilio-verify

Twilio Verify Push SDK helps you verify users by adding a low-friction, secure, cost-effective, 'push verification' factor into your own mobile application. This project provides an SDK to implement Verify Push for your react native app.

## Installation

```sh
npm install react-native-twilio-verify
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
import RNTwilioVerify from "react-native-twilio-verify";

let factor = await TwilioVerify.createFactor(new PushFactorPayload(factorName, verifyServiceSid, identity, pushToken, accessToken))
```

### Verify factor
```js
await TwilioVerify.verifyFactor(new VerifyPushFactorPayload(factor.sid))
```

### Get factors
```js
let factors = await TwilioVerify.getAllFactors()
```

### Delete factor
```js
await TwilioVerify.deleteFactor(factorSid)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
