// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { FactorPayload } from './models/FactorPayload';
import type { VerifyFactorPayload } from './models/VerifyFactorPayload';
import type { UpdateFactorPayload } from './models/UpdateFactorPayload';
import type { Challenge } from './models/Challenge';
import type { Factor } from './models/Factor';
import type { UpdateChallengePayload } from './models/UpdateChallengePayload';
import type { ChallengeListPayload } from './models/ChallengeListPayload';
import type { ChallengeList } from './models/ChallengeList';
import type { FactorListPayload } from './models/FactorListPayload';

export enum KeychainQueryMode {
  Strict = 'strict',
  Legacy = 'legacy',
}

/** Settings that only apply on iOS. */
export type IOSConfigureOptions = {
  /** Keychain query mode used to access stored factors. Defaults to `Legacy`. */
  keychainQueryMode?: KeychainQueryMode;
  /**
   * When `false`, factors and key pairs persist in the Keychain after the app
   * is uninstalled and reinstalled. Defaults to `true` (factors are cleared on reinstall).
   */
  clearStorageOnReinstall?: boolean;
};

export type ConfigureOptions = {
  /** iOS-only settings. Ignored on Android. */
  ios?: IOSConfigureOptions;
  /**
   * iOS only.
   * @deprecated Use `ios.keychainQueryMode`. Still honored for backward compatibility;
   * `ios.keychainQueryMode` takes precedence when both are set.
   */
  keychainQueryMode?: KeychainQueryMode;
};

export type TwilioVerifyType = {
  configure(options: ConfigureOptions): Promise<void>;
  createFactor(factorPayload: FactorPayload): Promise<Factor>;
  verifyFactor(verifyFactorPayload: VerifyFactorPayload): Promise<Factor>;
  updateFactor(updateFactorPayload: UpdateFactorPayload): Promise<Factor>;
  getAllFactors(): Promise<Array<Factor>>;
  /**
   * Returns the factor stored on the device with the given SID.
   * Rejects with code `FACTOR_NOT_FOUND` if this device doesn't have it.
   */
  getFactor(sid: string): Promise<Factor>;
  /** Returns the factors stored on the device, filtered and ordered by the payload. */
  getFactors(factorListPayload: FactorListPayload): Promise<Array<Factor>>;
  deleteFactor(sid: string): Promise<void>;
  getChallenge(challengeSid: string, factorSid: string): Promise<Challenge>;
  getAllChallenges(
    challengeListPayload: ChallengeListPayload
  ): Promise<ChallengeList>;
  updateChallenge(
    updateChallengePayload: UpdateChallengePayload
  ): Promise<void>;
  clearLocalStorage(): Promise<void>;
  isAvailable(): Promise<Boolean>;
};
