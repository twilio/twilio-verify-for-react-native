// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorType } from './FactorType';

/**
 * Base interface for factor creation payloads.
 *
 * This interface defines the common properties required to create any type of factor.
 * Specific implementations (like PushFactorPayload) extend this with additional
 * factor-type-specific properties.
 */
export interface FactorPayload {
  /** A human-readable name for the factor (e.g., "John's iPhone") */
  friendlyName: string;

  /** The unique identifier (SID) of the Verify service. Format: VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  serviceSid: string;

  /** A unique identifier for the user. Should be an anonymized value (e.g., UUID) to avoid PII */
  identity: string;

  /** The type of factor being created (e.g., FactorType.Push) */
  factorType: FactorType;
}
