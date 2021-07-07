// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: react-native-twilio-verify
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE

import type { ChallengeStatus } from './Challenge';
import { FactorType } from './FactorType';
import type { UpdateChallengePayload } from './UpdateChallengePayload';

export class UpdatePushChallengePayload implements UpdateChallengePayload {
  factorType: FactorType;
  constructor(
    public factorSid: string,
    public challengeSid: string,
    public status: ChallengeStatus
  ) {
    this.factorType = FactorType.Push;
  }
}
