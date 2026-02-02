import { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  View,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import TwilioVerify, {
  FactorType,
  type PushFactorPayload,
  type VerifyPushFactorPayload,
} from '@twilio/twilio-verify-for-react-native';
import {
  Colors,
  Shadows,
  Spacing,
  BorderRadius,
  Typography,
} from '../constants';
import type { ViewProps } from '../types';
import NetworkIndicator from '../components/NetworkIndicator';

export default function CreateFactor({
  navigation,
}: ViewProps<'CreateFactor'>) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [identity, setIdentity] = useState<string>('');
  const [accessTokenUrl, setAccessTokenUrl] = useState<string>('');
  const [enablePush, setEnablePush] = useState<boolean>(true);
  const [factorSid, setFactorSid] = useState<string>('');
  const buttonPressed = useSharedValue(false);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(buttonPressed.value ? 0.96 : 1, {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
  }));

  const isFormValid =
    identity.trim().length > 0 && accessTokenUrl.trim().length > 0;

  const generateRandomIdentity = () => {
    const randomText = Math.random().toString(36).substring(2, 10);
    const newIdentity = `user_${randomText}`;
    setIdentity(newIdentity);
  };

  /**
   * Creates a new Twilio Verify Push Factor
   *
   * Process:
   * 1. Fetch an access token from your backend server
   * 2. Validate the response (access token and serviceSid)
   * 3. Create the factor using TwilioVerify.createFactor()
   * 4. Verify the factor using TwilioVerify.verifyFactor()
   *
   * Important: Your backend must return:
   * - token (or accessToken): JWT token from Twilio Verify API
   * - serviceSid: Your Twilio Verify Service SID (starts with 'VA')
   * - identity: The user's unique identifier
   */
  const onCreateFactorButtonPress = async () => {
    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    try {
      setIsFetching(true);

      // Step 1: Request an access token from your backend server
      // Your server should call Twilio's Verify API to generate this token
      console.log('Fetching access token from:', accessTokenUrl);
      console.log('With identity:', identity);

      let response;
      try {
        response = await fetch(accessTokenUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identity: identity,
          }),
        });
      } catch (fetchError: any) {
        console.error('Fetch error:', fetchError);

        // Handle network errors
        if (fetchError.message?.includes('Network request failed')) {
          throw new Error(
            'Cannot connect to server.\n\n' +
              'Possible causes:\n' +
              '• Server is not responding\n' +
              '• Network connectivity issue\n' +
              '• Invalid URL format\n' +
              '• Firewall or security blocking the request\n\n' +
              `URL: ${accessTokenUrl}\n\n` +
              'For local servers:\n' +
              '• Android: use http://10.0.2.2:PORT\n' +
              '• iOS: use http://localhost:PORT\n\n' +
              'For remote servers:\n' +
              '• Check the URL is correct\n' +
              '• Verify the server is running'
          );
        }
        throw fetchError;
      }

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(
          `Server returned error ${response.status}\n\n` +
            `Response: ${errorText.substring(0, 200)}`
        );
      }

      const json = await response.json();

      // Step 2: Validate the response from your server
      // Support both 'token' and 'accessToken' field names
      const accessToken = json.accessToken || json.token;
      if (!accessToken) {
        throw new Error('Access token not found in response');
      }

      // Verify serviceSid exists and has correct format
      if (!json.serviceSid) {
        throw new Error('Service SID not found in response');
      }

      // Twilio Verify Service SIDs always start with 'VA'
      if (!json.serviceSid.startsWith('VA')) {
        throw new Error(
          `Invalid serviceSid format: ${json.serviceSid}. It should start with 'VA'`
        );
      }

      // Step 3: Create the Push Factor
      // This registers the device with Twilio Verify
      const pushFactorPayload: PushFactorPayload = {
        friendlyName: identity, // Display name for the factor
        serviceSid: json.serviceSid, // Your Twilio Verify Service SID
        identity: json.identity, // User's unique identifier
        accessToken: accessToken, // JWT token from your server
        factorType: FactorType.Push, // Type of factor (Push, SMS, etc.)
      };
      let factor = await TwilioVerify.createFactor(pushFactorPayload);
      console.log('Factor created successfully:', factor);

      // Step 4: Verify the Factor
      // This completes the factor creation process and marks it as verified
      const verifyPayload: VerifyPushFactorPayload = {
        sid: factor.sid, // The factor's unique identifier
        factorType: FactorType.Push,
      };
      factor = await TwilioVerify.verifyFactor(verifyPayload);

      // Show success UI
      setFactorSid(factor.sid);

      // Navigate to factors list after showing success message
      setTimeout(() => {
        navigation.navigate('Factors', {
          message: `${factor.friendlyName} was created successfully!`,
        });
      }, 2000);
    } catch (error: any) {
      console.error('Failed to create factor:', error);

      let errorMessage = 'Failed to create factor';
      if (error.message) {
        errorMessage += `:\n${error.message}`;
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <NetworkIndicator />

        <Animated.View
          entering={FadeInDown.duration(400)}
          style={styles.formCard}
        >
          <Text style={styles.title}>Create New Factor</Text>
          <Text style={styles.subtitle}>
            Enter your identity and access token URL to create a new
            verification factor
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Identity *</Text>
            <View style={styles.inputWithButtonContainer}>
              <TextInput
                style={[
                  styles.inputWithButton,
                  identity.length > 0 && styles.inputFilled,
                ]}
                value={identity}
                onChangeText={(value) => setIdentity(value)}
                placeholder="Enter your identity"
                placeholderTextColor={Colors.text.tertiary}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isFetching}
              />
              <TouchableOpacity
                style={styles.randomButton}
                onPress={generateRandomIdentity}
                disabled={isFetching}
              >
                <Text style={styles.randomButtonText}>🎲</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Access Token URL *</Text>
            <TextInput
              style={[
                styles.input,
                accessTokenUrl.length > 0 && styles.inputFilled,
              ]}
              value={accessTokenUrl}
              onChangeText={(value) => setAccessTokenUrl(value)}
              placeholder="https://your-server.com/token"
              placeholderTextColor={Colors.text.tertiary}
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isFetching}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={isFetching}
              value={enablePush}
              onValueChange={(newValue) => setEnablePush(newValue)}
              tintColors={{
                true: Colors.primary.main,
                false: Colors.border.dark,
              }}
            />
            <Text style={styles.checkboxText}>Enable push notifications</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(200).duration(400)}
          style={[styles.buttonWrapper, buttonAnimatedStyle]}
        >
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={onCreateFactorButtonPress}
            onPressIn={() => (buttonPressed.value = true)}
            onPressOut={() => (buttonPressed.value = false)}
            disabled={isFetching || !isFormValid}
          >
            {isFetching ? (
              <ActivityIndicator size="small" color={Colors.text.inverse} />
            ) : (
              <Text style={styles.buttonText}>Create Factor</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        {factorSid && (
          <Animated.View
            entering={FadeInDown.delay(300).duration(400)}
            style={styles.successBox}
          >
            <Text style={styles.successTitle}>✓ Factor Created</Text>
            <Text style={styles.successSubtitle}>
              Your verification factor has been created successfully
            </Text>
            <View style={styles.successSidContainer}>
              <Text style={styles.successSidLabel}>Factor SID:</Text>
              <Text style={styles.successSid} selectable>
                {factorSid}
              </Text>
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  formCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 2,
    borderRadius: BorderRadius.md,
    borderColor: Colors.border.light,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  inputWithButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  inputWithButton: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderWidth: 2,
    borderRadius: BorderRadius.md,
    borderColor: Colors.border.light,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  inputFilled: {
    borderColor: Colors.primary.light,
    backgroundColor: Colors.background.primary,
  },
  randomButton: {
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.md,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  randomButtonText: {
    fontSize: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  checkboxText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  buttonWrapper: {
    marginTop: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary.main,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    ...Shadows.small,
  },
  buttonDisabled: {
    backgroundColor: Colors.text.disabled,
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
  successBox: {
    backgroundColor: Colors.success.lighter,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.success.main,
    ...Shadows.small,
  },
  successTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success.dark,
    marginBottom: Spacing.xs,
  },
  successSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
  successSidContainer: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  successSidLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
  },
  successSid: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    fontFamily: 'monospace',
  },
});
