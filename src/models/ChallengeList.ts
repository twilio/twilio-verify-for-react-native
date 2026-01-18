// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { Challenge } from './Challenge';

/**
 * Pagination metadata for challenge list responses.
 *
 * Use the page tokens to navigate through multiple pages of challenges.
 */
export interface Metadata {
  /** The current page number (0-indexed) */
  page: number;

  /** The number of items per page */
  pageSize: number;

  /** Token to retrieve the previous page of results. Undefined if on the first page. */
  previousPageToken?: string;

  /** Token to retrieve the next page of results. Undefined if on the last page. */
  nextPageToken?: string;
}

/**
 * A paginated list of challenges with metadata.
 *
 * Use this to navigate through large sets of challenges efficiently.
 *
 * @example
 * ```typescript
 * const result = await TwilioVerify.getAllChallenges(payload);
 * console.log(`Page ${result.metadata.page + 1}`);
 * console.log(`Found ${result.challenges.length} challenges`);
 *
 * // Get next page if available
 * if (result.metadata.nextPageToken) {
 *   const nextPayload = new ChallengeListPayload(
 *     factorSid,
 *     pageSize,
 *     status,
 *     order,
 *     result.metadata.nextPageToken
 *   );
 *   const nextPage = await TwilioVerify.getAllChallenges(nextPayload);
 * }
 * ```
 */
export interface ChallengeList {
  /** Array of challenges for the current page */
  challenges: Challenge[];

  /** Pagination information and navigation tokens */
  metadata: Metadata;
}
