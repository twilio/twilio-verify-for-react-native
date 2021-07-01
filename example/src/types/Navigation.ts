// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2021. All Rights Reserved.
// Node module: react-native-twilio-verify
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/react-native-twilio-verify/blob/main/LICENSE

import type { StackScreenProps } from '@react-navigation/stack';
import type { Factor } from 'react-native-twilio-verify';

export type RootStackParamList = {
  Factors: { message: string } | undefined;
  CreateFactor: undefined;
  Factor: { factor: Factor };
  Challenge: { factor: Factor; challengeSid: string };
};

export type ViewProps<
  RouteName extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, RouteName>;
