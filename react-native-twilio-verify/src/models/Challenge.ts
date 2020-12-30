// Copyright Twilio, Inc. 2020. All Rights Reserved.
// Node module: twilio-verify,
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-cross-platform/blob/main/LICENSE

export type JSONObject = { [key: string]: any };

export interface Challenge {
  sid: string;
  challengeDetails: ChallengeDetails;
  hiddenDetails: JSONObject;
  factorSid: string;
  status: ChallengeStatus;
  createdAt: Date;
  updatedAt: Date;
  expirationDate: Date;
}

export enum ChallengeStatus {
  Pending = 'pending',
  Approved = 'approved',
  Denied = 'denied',
  Expired = 'expired',
}

export interface ChallengeDetails {
  message: string;
  fields: Detail[];
  date?: Date;
}

export interface Detail {
  label: string;
  value: string;
}
