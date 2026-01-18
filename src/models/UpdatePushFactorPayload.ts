// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import { FactorType } from './FactorType';
import type { UpdateFactorPayload } from './UpdateFactorPayload';

/**
 * Payload for updating an existing push factor.
 *
 * Use this to update factor properties, such as the push notification token
 * when the device token changes (e.g., after app reinstall or token refresh).
 *
 * @example
 * ```typescript
 * // Update push token
 * const payload = new UpdatePushFactorPayload(
 *   'YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
 *   'new-fcm-or-apns-push-token'
 * );
 * await TwilioVerify.updateFactor(payload);
 * ```
 */
export class UpdatePushFactorPayload implements UpdateFactorPayload {
  factorType: FactorType;

  /**
   * Creates a new UpdatePushFactorPayload instance.
   *
   * @param sid - The unique identifier (SID) of the factor to update. Format: YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   * @param pushToken - Optional. The new device push notification token (FCM for Android, APNs for iOS).
   *                    Omit if only updating other factor properties.
   */
  constructor(
    public sid: string,
    public pushToken?: string
  ) {
    this.factorType = FactorType.Push;
  }
}
