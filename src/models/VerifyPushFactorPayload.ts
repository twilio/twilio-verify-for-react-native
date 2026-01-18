// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import { FactorType } from './FactorType';
import type { VerifyFactorPayload } from './VerifyFactorPayload';

/**
 * Payload for verifying a push factor.
 *
 * After creating a factor, it must be verified to confirm the device ownership
 * and complete the factor registration process.
 *
 * @example
 * ```typescript
 * const payload = new VerifyPushFactorPayload(
 *   'YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
 * );
 * await TwilioVerify.verifyFactor(payload);
 * ```
 */
export class VerifyPushFactorPayload implements VerifyFactorPayload {
  factorType: FactorType;

  /**
   * Creates a new VerifyPushFactorPayload instance.
   *
   * @param sid - The unique identifier (SID) of the factor to verify. Format: YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   */
  constructor(public sid: string) {
    this.factorType = FactorType.Push;
  }
}
