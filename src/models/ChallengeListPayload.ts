// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { ChallengeStatus } from './Challenge';

/**
 * Payload for retrieving a paginated list of challenges.
 *
 * Use this to fetch challenges associated with a factor, with optional filtering
 * by status and ordering.
 *
 * @example
 * ```typescript
 * // Get pending challenges
 * const payload = new ChallengeListPayload(
 *   'YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
 *   20,
 *   ChallengeStatus.Pending,
 *   ChallengeListOrder.Desc
 * );
 * const challenges = await TwilioVerify.getAllChallenges(payload);
 *
 * // Get all challenges (no status filter)
 * const allPayload = new ChallengeListPayload(
 *   factorSid,
 *   10
 * );
 * ```
 */
export class ChallengeListPayload {
  /**
   * Creates a new ChallengeListPayload instance.
   *
   * @param factorSid - The unique identifier (SID) of the factor whose challenges to retrieve. Format: YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   * @param pageSize - The maximum number of challenges to return per page (e.g., 10, 20, 50).
   * @param status - Optional. Filter challenges by status (e.g., ChallengeStatus.Pending, ChallengeStatus.Approved).
   *                 Omit to retrieve challenges with any status.
   * @param order - The sort order for the results. Defaults to ChallengeListOrder.Asc (oldest first).
   *                Use ChallengeListOrder.Desc for newest first.
   * @param pageToken - Optional. Token for retrieving the next page of results. Obtained from the previous response's metadata.
   */
  constructor(
    public factorSid: string,
    public pageSize: number,
    public status?: ChallengeStatus,
    public order: ChallengeListOrder = ChallengeListOrder.Asc,
    public pageToken?: string
  ) {}
}

/**
 * Enum representing the sort order for challenge lists.
 */
export enum ChallengeListOrder {
  /** Ascending order - oldest challenges first */
  Asc = 'asc',
  /** Descending order - newest challenges first */
  Desc = 'desc',
}
