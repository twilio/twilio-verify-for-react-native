// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: react-native-twilio-verify
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE

import { FactorType } from './FactorType';
import type { UpdateFactorPayload } from './UpdateFactorPayload';

export class UpdatePushFactorPayload implements UpdateFactorPayload {
  factorType: FactorType;
  constructor(public sid: string, public pushToken: string) {
    this.factorType = FactorType.Push;
  }
}
