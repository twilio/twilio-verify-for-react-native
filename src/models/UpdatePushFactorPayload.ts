// Copyright Twilio, Inc. 2020. All Rights Reserved.
// Node module: twilio-verify,
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE

import { FactorType } from "./FactorType";
import type { UpdateFactorPayload } from "./UpdateFactorPayload";

export class UpdatePushFactorPayload implements UpdateFactorPayload {
  factorType: FactorType;
  constructor(public sid: string, public pushToken: string) {
    this.factorType = FactorType.Push;
  }
}
