// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorPayload } from './models/FactorPayload';
import type { VerifyFactorPayload } from './models/VerifyFactorPayload';
import type { UpdateFactorPayload } from './models/UpdateFactorPayload';
import type { Challenge } from './models/Challenge';
import type { Factor } from './models/Factor';
import type { UpdateChallengePayload } from './models/UpdateChallengePayload';
import type { ChallengeListPayload } from './models/ChallengeListPayload';
import type { ChallengeList } from './models/ChallengeList';

export type TwilioVerifyType = {
  createFactor(factorPayload: FactorPayload): Promise<Factor>;
  verifyFactor(verifyFactorPayload: VerifyFactorPayload): Promise<Factor>;
  updateFactor(updateFactorPayload: UpdateFactorPayload): Promise<Factor>;
  getAllFactors(): Promise<Array<Factor>>;
  deleteFactor(sid: string): Promise<void>;
  getChallenge(challengeSid: string, factorSid: string): Promise<Challenge>;
  getAllChallenges(
    challengeListPayload: ChallengeListPayload
  ): Promise<ChallengeList>;
  updateChallenge(
    updateChallengePayload: UpdateChallengePayload
  ): Promise<void>;
  clearLocalStorage(): Promise<void>;
};
