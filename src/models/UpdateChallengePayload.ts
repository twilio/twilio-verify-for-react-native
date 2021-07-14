// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorType } from './FactorType';

export interface UpdateChallengePayload {
  factorSid: string;
  challengeSid: string;
  factorType: FactorType;
}
