// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { Challenge } from './Challenge';

export interface Metadata {
  page: number;
  pageSize: number;
  previousPageToken?: string;
  nextPageToken?: string;
}

export interface ChallengeList {
  challenges: Challenge[];
  metadata: Metadata;
}
