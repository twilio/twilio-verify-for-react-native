// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorType } from './FactorType';

/**
 * Base interface for factor verification payloads.
 *
 * This interface defines the common properties required to verify any type of factor.
 * After creating a factor, it must be verified to confirm device ownership and
 * complete the registration process. Specific implementations (like VerifyPushFactorPayload)
 * extend this interface.
 */
export interface VerifyFactorPayload {
  /** The unique identifier (SID) of the factor to verify. Format: YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  sid: string;

  /** The type of factor (e.g., FactorType.Push) */
  factorType: FactorType;
}
