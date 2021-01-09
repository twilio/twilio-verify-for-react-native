// Copyright Twilio, Inc. 2020. All Rights Reserved.
// Node module: twilio-verify,
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE

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
