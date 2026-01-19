// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

/**
 * Enum representing the types of authentication factors supported by Twilio Verify.
 *
 * @example
 * ```typescript
 * import { FactorType } from '@twilio/twilio-verify-for-react-native';
 *
 * const payload = new PushFactorPayload(
 *   friendlyName,
 *   serviceSid,
 *   identity,
 *   accessToken,
 *   pushToken
 * );
 * console.log(payload.factorType); // FactorType.Push
 * ```
 */
export enum FactorType {
  /**
   * Push notification-based authentication factor.
   *
   * Enables authentication through push notifications sent to the user's device,
   * allowing them to approve or deny authentication requests from within the app.
   */
  Push = 'push',
}
