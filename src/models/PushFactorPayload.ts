// Copyright Twilio, Inc. 2020. All Rights Reserved.
// Node module: twilio-verify,
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-cross-platform/blob/main/LICENSE

import type { FactorPayload } from "./FactorPayload";
import { FactorType } from "./FactorType";

export class PushFactorPayload implements FactorPayload {
  factorType: FactorType;
  constructor(
    public friendlyName: string,
    public serviceSid: string,
    public identity: string,
    public pushToken: string,
    public accessToken: string
  ) {
    this.factorType = FactorType.Push;
  }
}
