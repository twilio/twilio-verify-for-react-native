import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Factors: { message: string } | undefined;
  CreateFactor: undefined;
};

export type ViewProps<
  RouteName extends keyof RootStackParamList
> = StackScreenProps<RootStackParamList, RouteName>;
