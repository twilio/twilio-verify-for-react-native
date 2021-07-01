// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: react-native-twilio-verify
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE

import { NativeModules } from 'react-native';
import type { TwilioVerifyType } from './TwilioVerifyType';

const { RNTwilioVerify } = NativeModules;

export default RNTwilioVerify as TwilioVerifyType;

export { Factor, FactorStatus } from './models/Factor';
export {
  Challenge,
  ChallengeStatus,
  ChallengeDetails,
  Detail,
} from './models/Challenge';
export { ChallengeList, Metadata } from './models/ChallengeList';
export { PushFactorPayload } from './models/PushFactorPayload';
export { VerifyPushFactorPayload } from './models/VerifyPushFactorPayload';
export { UpdatePushFactorPayload } from './models/UpdatePushFactorPayload';
export { ChallengeListPayload } from './models/ChallengeListPayload';
export { UpdatePushChallengePayload } from './models/UpdatePushChallengePayload';
