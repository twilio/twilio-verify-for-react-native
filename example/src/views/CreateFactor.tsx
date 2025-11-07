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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import TwilioVerify, {
  FactorType,
  type PushFactorPayload,
  type VerifyPushFactorPayload,
} from '@twilio/twilio-verify-for-react-native';
import { Colors } from '../constants';
import type { ViewProps } from '../types';

export default function CreateFactor({
  navigation,
}: ViewProps<'CreateFactor'>) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [identity, setIdentity] = useState<string>('');
  const [accessTokenUrl, setAccessTokenUrl] = useState<string>('');
  const [enablePush, setEnablePush] = useState<boolean>(true);

  const onCreateFactorButtonPress = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(accessTokenUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity: identity,
        }),
      });
      const json = await response.json();
      const pushFactorPayload: PushFactorPayload = {
        friendlyName: `${identity}'s factor`,
        serviceSid: json.serviceSid,
        identity: json.identity,
        accessToken: json.token,
        factorType: FactorType.Push,
      };
      let factor = await TwilioVerify.createFactor(pushFactorPayload);
      const verifyPayload: VerifyPushFactorPayload = {
        sid: factor.sid,
        factorType: FactorType.Push,
      };
      factor = await TwilioVerify.verifyFactor(verifyPayload);
      navigation.navigate('Factors', {
        message: `${factor.friendlyName} was created!`,
      });
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextInput
        style={styles.input}
        value={identity}
        onChangeText={(value) => setIdentity(value)}
        placeholder="Identity"
        placeholderTextColor="#202020"
      />
      <TextInput
        style={styles.input}
        value={accessTokenUrl}
        onChangeText={(value) => setAccessTokenUrl(value)}
        placeholder="Access token URL"
        placeholderTextColor="#202020"
        keyboardType="url"
        autoCorrect={false}
      />
      <View style={styles.check}>
        <CheckBox
          disabled={false}
          value={enablePush}
          onValueChange={(newValue) => setEnablePush(newValue)}
        />
        <Text style={styles.checkText}>Enable push notifications</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onCreateFactorButtonPress}
        disabled={isFetching}
      >
        {!isFetching ? (
          <Text style={styles.buttonText}>CREATE FACTOR</Text>
        ) : (
          <ActivityIndicator size="small" />
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    backgroundColor: Colors.white.default,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.black.default,
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    paddingLeft: 5,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.blue.default,
    paddingVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white.default,
  },
  check: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  checkText: {
    paddingLeft: 8,
  },
});
