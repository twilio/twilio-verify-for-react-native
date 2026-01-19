// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorPayload } from './FactorPayload';
import { FactorType } from './FactorType';

/**
 * Payload for creating a push factor.
 *
 * This class encapsulates all the required information to create a new push factor
 * in the Twilio Verify Push service.
 *
 * @example
 * ```typescript
 * const payload = new PushFactorPayload(
 *   'John\'s Device',
 *   'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
 *   'user-unique-identity',
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   'fcm-or-apns-push-token'
 * );
 * ```
 */
export class PushFactorPayload implements FactorPayload {
  factorType: FactorType;

  /**
   * Creates a new PushFactorPayload instance.
   *
   * @param friendlyName - A human-readable name for the factor (e.g., "John's iPhone").
   * @param serviceSid - The unique identifier (SID) of the Verify service. Format: VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   * @param identity - A unique identifier for the user. Should be an anonymized value (e.g., UUID) to avoid PII.
   * @param accessToken - A valid JWT access token obtained from your backend service.
   * @param pushToken - Optional. The device push notification token (FCM for Android, APNs for iOS).
   *                    Can be omitted if push notifications are not required or will be added later.
   */
  constructor(
    public friendlyName: string,
    public serviceSid: string,
    public identity: string,
    public accessToken: string,
    public pushToken?: string
  ) {
    this.factorType = FactorType.Push;
  }
}
