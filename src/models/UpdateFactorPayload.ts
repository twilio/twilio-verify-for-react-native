// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorType } from './FactorType';

/**
 * Base interface for factor update payloads.
 *
 * This interface defines the common properties required to update any type of factor.
 * Specific implementations (like UpdatePushFactorPayload) extend this with additional
 * factor-type-specific properties such as push tokens.
 */
export interface UpdateFactorPayload {
  /** The unique identifier (SID) of the factor to update. Format: YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  sid: string;

  /** The type of factor (e.g., FactorType.Push) */
  factorType: FactorType;
}
