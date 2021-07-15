// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

import type { StackScreenProps } from '@react-navigation/stack';
import type { Factor } from 'twilio-verify-for-react-native';

export type RootStackParamList = {
  Factors: { message: string } | undefined;
  CreateFactor: undefined;
  Factor: { factor: Factor };
  Challenge: { factor: Factor; challengeSid: string };
};

export type ViewProps<
  RouteName extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, RouteName>;
