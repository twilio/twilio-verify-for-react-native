// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorType } from './FactorType';

/**
 * Base interface for challenge update payloads.
 *
 * This interface defines the common properties required to update any type of challenge.
 * Specific implementations (like UpdatePushChallengePayload) extend this with additional
 * challenge-type-specific properties such as the status.
 */
export interface UpdateChallengePayload {
  /** The unique identifier (SID) of the factor associated with the challenge. Format: YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  factorSid: string;

  /** The unique identifier (SID) of the challenge to update. Format: YCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  challengeSid: string;

  /** The type of factor (e.g., FactorType.Push) */
  factorType: FactorType;
}
