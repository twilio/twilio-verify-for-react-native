// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorType } from './FactorType';

/**
 * Represents a registered authentication factor in the Twilio Verify Push system.
 *
 * A factor is a method of authentication tied to a specific device. After creation,
 * a factor must be verified before it can be used to receive and respond to challenges.
 */
export interface Factor {
  /** Current verification status of the factor */
  status: FactorStatus;

  /** The unique identifier (SID) of the factor. Format: YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  sid: string;

  /** A human-readable name for the factor (e.g., "John's iPhone", "Work Device") */
  friendlyName: string;

  /** The unique identifier of the Twilio account. Format: ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  accountSid: string;

  /** The unique identifier of the Verify service. Format: VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  serviceSid: string;

  /** The unique identifier for the user. Should be an anonymized value (e.g., UUID) */
  identity: string;

  /** The type of factor (currently only push factors are supported) */
  type: FactorType;

  /** The date and time when the factor was created */
  createdAt: Date;
}

/**
 * Enum representing the verification status of a factor.
 */
export enum FactorStatus {
  /** The factor has been verified and can receive challenges */
  Verified = 'verified',
  /** The factor has been created but not yet verified */
  Unverified = 'unverified',
}
