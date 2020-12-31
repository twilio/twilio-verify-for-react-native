// Copyright Twilio, Inc. 2020. All Rights Reserved.
// Node module: twilio-verify,
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE

import type { FactorType } from "./FactorType";

export interface Factor {
  status: FactorStatus;
  sid: string;
  friendlyName: string;
  accountSid: string;
  serviceSid: string;
  identity: string;
  type: FactorType;
  createdAt: Date;
}

export enum FactorStatus {
  Verified = 'verified',
  Unverified = 'unverified',
}
