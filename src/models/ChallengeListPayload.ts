// Copyright Twilio, Inc. 2020. All Rights Reserved.
// Node module: twilio-verify,
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE

import type { ChallengeStatus } from "./Challenge";

export class ChallengeListPayload {
  constructor(
    public factorSid: string,
    public pageSize: number,
    public status?: ChallengeStatus,
    public pageToken?: string
  ) {}
}
