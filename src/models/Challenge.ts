// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

/**
 * Generic JSON object type for flexible data structures.
 */
export type JSONObject = { [key: string]: any };

/**
 * Represents an authentication challenge in the Twilio Verify Push system.
 *
 * A challenge is an authentication request sent to a user's device that requires
 * approval or denial. Challenges are typically received as push notifications.
 */
export interface Challenge {
  /** The unique identifier (SID) of the challenge. Format: YCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
  sid: string;

  /** Visible details about the challenge, including message and custom fields */
  challengeDetails: ChallengeDetails;

  /** Hidden details that are signed but not displayed to the end user */
  hiddenDetails: JSONObject;

  /** The unique identifier (SID) of the factor associated with this challenge */
  factorSid: string;

  /** Current status of the challenge (pending, approved, denied, or expired) */
  status: ChallengeStatus;

  /** The date and time when the challenge was created */
  createdAt: Date;

  /** The date and time when the challenge was last updated */
  updatedAt: Date;

  /** The date and time when the challenge expires and can no longer be approved */
  expirationDate: Date;
}

/**
 * Enum representing the possible states of a challenge.
 */
export enum ChallengeStatus {
  /** The challenge is waiting for user action (approval or denial) */
  Pending = 'pending',
  /** The user has approved the challenge */
  Approved = 'approved',
  /** The user has denied the challenge */
  Denied = 'denied',
  /** The challenge has expired without user action */
  Expired = 'expired',
}

/**
 * Details about a challenge that are displayed to the user.
 *
 * These details help users understand what they're being asked to authenticate
 * and provide context for the authentication request.
 */
export interface ChallengeDetails {
  /** The main message describing the authentication request (e.g., "Login attempt from New York") */
  message: string;

  /** Additional contextual information displayed as label-value pairs */
  fields: Detail[];

  /** Optional timestamp associated with the challenge (e.g., when the login attempt occurred) */
  date?: Date;
}

/**
 * A single detail field providing contextual information about a challenge.
 *
 * @example
 * ```typescript
 * {
 *   label: "Location",
 *   value: "New York, USA"
 * }
 * ```
 */
export interface Detail {
  /** The label describing what the value represents (e.g., "Location", "IP Address", "Device") */
  label: string;

  /** The actual value to display (e.g., "192.168.1.1", "Chrome on MacOS") */
  value: string;
}
