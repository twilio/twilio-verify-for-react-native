import type { StackScreenProps } from '@react-navigation/stack';
import type { Factor } from 'react-native-twilio-verify';

export type RootStackParamList = {
  Factors: { message: string } | undefined;
  CreateFactor: undefined;
  Factor: { factor: Factor };
};

export type ViewProps<
  RouteName extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, RouteName>;
