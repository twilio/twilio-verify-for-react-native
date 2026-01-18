// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { ChallengeStatus } from './Challenge';
import { FactorType } from './FactorType';
import type { UpdateChallengePayload } from './UpdateChallengePayload';

/**
 * Payload for updating a push challenge status.
 *
 * Use this to respond to authentication challenges by approving or denying them.
 * Challenges are typically received as push notifications and require user action.
 *
 * @example
 * ```typescript
 * // Approve a challenge
 * const payload = new UpdatePushChallengePayload(
 *   'YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
 *   'YCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
 *   ChallengeStatus.Approved
 * );
 * await TwilioVerify.updateChallenge(payload);
 *
 * // Deny a challenge
 * const denyPayload = new UpdatePushChallengePayload(
 *   factorSid,
 *   challengeSid,
 *   ChallengeStatus.Denied
 * );
 * await TwilioVerify.updateChallenge(denyPayload);
 * ```
 */
export class UpdatePushChallengePayload implements UpdateChallengePayload {
  factorType: FactorType;

  /**
   * Creates a new UpdatePushChallengePayload instance.
   *
   * @param factorSid - The unique identifier (SID) of the factor associated with this challenge. Format: YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   * @param challengeSid - The unique identifier (SID) of the challenge to update. Format: YCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   * @param status - The new status for the challenge (e.g., ChallengeStatus.Approved or ChallengeStatus.Denied).
   */
  constructor(
    public factorSid: string,
    public challengeSid: string,
    public status: ChallengeStatus
  ) {
    this.factorType = FactorType.Push;
  }
}
