import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { Colors } from './constants';
import type { RootStackParamList } from './types';
import CreateFactor from './views/CreateFactor';
import Factors from './views/Factors';
import Factor from './views/Factor';
import Challenge from './views/Challenge';

const Stack = createStackNavigator<RootStackParamList>();
const screenOptions: StackNavigationOptions = {
  headerTitle: 'TwilioVerify',
  headerStyle: {
    backgroundColor: Colors.blue.default,
  },
  headerTintColor: Colors.white.default,
  headerBackTitleVisible: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Factors" screenOptions={screenOptions}>
        <Stack.Screen name="Factors" component={Factors} />
        <Stack.Screen name="CreateFactor" component={CreateFactor} />
        <Stack.Screen name="Factor" component={Factor} />
        <Stack.Screen name="Challenge" component={Challenge} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
