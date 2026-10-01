// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorStatus } from './Factor';

/**
 * Payload for retrieving the factors stored on the device, with optional filtering
 * by identity and status, and ordering by creation date.
 *
 * @example
 * ```typescript
 * // Newest verified factor for a user
 * const [latest] = await TwilioVerify.getFactors(
 *   new FactorListPayload('user-identity', FactorStatus.Verified)
 * );
 *
 * // All factors, oldest first
 * const factors = await TwilioVerify.getFactors(
 *   new FactorListPayload(undefined, undefined, FactorListOrder.Asc)
 * );
 * ```
 */
export class FactorListPayload {
  /**
   * Creates a new FactorListPayload instance.
   *
   * @param identity - Optional. Only return factors for this identity. Omit to return factors for any identity.
   * @param status - Optional. Filter factors by status (e.g., FactorStatus.Verified).
   *                 Omit to return factors with any status.
   * @param order - The sort order by creation date. Defaults to FactorListOrder.Desc (newest first).
   */
  constructor(
    public identity?: string,
    public status?: FactorStatus,
    public order: FactorListOrder = FactorListOrder.Desc
  ) {}
}

/**
 * Enum representing the sort order for factor lists, by creation date.
 */
export enum FactorListOrder {
  /** Ascending order - oldest factors first */
  Asc = 'asc',
  /** Descending order - newest factors first */
  Desc = 'desc',
}
