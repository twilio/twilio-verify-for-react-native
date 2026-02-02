/**
 * Twilio Verify React Native - Example App
 *
 * This app demonstrates how to implement push-based two-factor authentication
 * using the Twilio Verify SDK for React Native.
 *
 * Navigation Structure:
 * - Factors: List of all verification factors on this device
 * - Factor: Details of a single factor + its challenges
 * - Challenge: Approve/Deny a specific authentication challenge
 * - CreateFactor: Form to create a new verification factor
 *
 * Push Notification Flow:
 * 1. User creates a factor (registers device)
 * 2. Backend sends authentication challenge via Twilio API
 * 3. Device receives push notification
 * 4. User opens notification → navigates to Challenge screen
 * 5. User approves/denies → response sent back to Twilio
 * 6. Backend receives webhook with result
 *
 * @format
 */

import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Colors } from './constants/Colors';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import Factors from './views/Factors';
import { type RootStackParamList } from './types';
import NotificationService from './push/NotificationService';
import { type ReceivedNotification } from 'react-native-push-notification';
import { Alert } from 'react-native';
import TwilioVerify, {
  type Factor,
} from '@twilio/twilio-verify-for-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FactorView from './views/Factor';
import ChallengeView from './views/Challenge';
import CreateFactor from './views/CreateFactor';

declare global {
  var deviceToken: string;
}

const screenOptions: NativeStackNavigationOptions = {
  headerTitle: 'Twilio Verify',
  headerStyle: {
    backgroundColor: Colors.primary.main,
  },
  headerTintColor: Colors.text.inverse,
  headerBackButtonDisplayMode: 'minimal',
  headerTitleStyle: {
    fontWeight: '600',
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Handles incoming push notification with a challenge
 *
 * When Twilio sends a push challenge, the notification payload contains:
 * - challenge_sid: The challenge's unique identifier
 * - factor_sid: The factor's unique identifier
 * - type: 'verify_push_challenge'
 *
 * This function:
 * 1. Extracts the challenge and factor SIDs from the notification
 * 2. Finds the matching factor in local storage
 * 3. Navigates to the Challenge screen to show the approval UI
 */
const showChallenge = async (payload: Record<string, any>) => {
  const challengeSid = payload.challenge_sid;
  const factorSid = payload.factor_sid;
  const type = payload.type;
  if (type === 'verify_push_challenge' && factorSid && challengeSid) {
    try {
      const factors = await TwilioVerify.getAllFactors();
      const factor: Factor | undefined = factors.find(
        (f: Factor) => f.sid === factorSid
      );
      if (factor) {
        navigationRef.current?.navigate('Challenge', {
          factor,
          challengeSid: challengeSid,
        });
      }
    } catch (error) {
      console.error('Failed to get factors:', error);
      Alert.alert('Error', 'Failed to load factor information');
    }
  }
};

const onRegister = (deviceToken: { os: string; token: string }) => {
  globalThis.deviceToken = deviceToken.token;
};

const onNotification = (
  notification: Omit<ReceivedNotification, 'userInfo'>
) => {
  if (notification.userInteraction || notification.foreground) {
    showChallenge(notification.data);
  } else {
    notificationService.localNotification(notification.data);
  }
};

const notificationService = new NotificationService(onRegister, onNotification);

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Factors"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="Factors"
            options={{ title: 'Factors' }}
            component={Factors}
          />
          <Stack.Screen
            name="Factor"
            options={{ title: 'Factor' }}
            component={FactorView}
          />
          <Stack.Screen
            name="Challenge"
            options={{ title: 'Challenge' }}
            component={ChallengeView}
          />
          <Stack.Screen
            name="CreateFactor"
            options={{ title: 'Create Factor' }}
            component={CreateFactor}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
