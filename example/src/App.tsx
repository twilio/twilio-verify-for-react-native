import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import TwilioVerify from 'react-native-twilio-verify';

import { Colors } from './constants';
import type { RootStackParamList } from './types';
import CreateFactor from './views/CreateFactor';
import Factors from './views/Factors';
import Factor from './views/Factor';
import Challenge from './views/Challenge';
import NotificationService from './NotificationService';

const Stack = createStackNavigator<RootStackParamList>();
const screenOptions: StackNavigationOptions = {
  headerTitle: 'TwilioVerify',
  headerStyle: {
    backgroundColor: Colors.blue.default,
  },
  headerTintColor: Colors.white.default,
  headerBackTitleVisible: false,
};
const navigationRef = React.createRef<NavigationContainerRef>();

const showChallenge = async (payload: Record<string, any>) => {
  const challengeSid = payload.challenge_sid;
  const factorSid = payload.factor_sid;
  const type = payload.type;
  if (type === 'verify_push_challenge' && factorSid && challengeSid) {
    const factor = await (await TwilioVerify.getAllFactors()).find(factor => factor.sid === factorSid)
    if (factor) {
      navigationRef.current?.navigate('Challenge', { factor, challengeSid: challengeSid });
    }
  }
}

const onRegister = (deviceToken) => {
  global.deviceToken = deviceToken.token
}


const onNotification = (notification) => {
  if (notification.userInteraction || notification.foreground) {
    showChallenge(notification.data)
  } else {
    notificationService.localNotification(notification.data)
  }
}

const notificationService = new NotificationService(onRegister, onNotification);

export default function App() {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Factors" screenOptions={screenOptions}>
        <Stack.Screen name="Factors" component={Factors} />
        <Stack.Screen name="CreateFactor" component={CreateFactor} />
        <Stack.Screen name="Factor" component={Factor} />
        <Stack.Screen name="Challenge" component={Challenge} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
