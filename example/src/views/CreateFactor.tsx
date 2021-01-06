import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import TwilioVerify, {
  PushFactorPayload,
  VerifyPushFactorPayload,
} from 'react-native-twilio-verify';
import { Colors } from '../constants';
import type { ViewProps } from '../types';

export default function CreateFactor({
  navigation,
}: ViewProps<'CreateFactor'>) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [identity, setIdentity] = useState<string>('');
  const [accessTokenUrl, setAccessTokenUrl] = useState<string>('');

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
      let factor = await TwilioVerify.createFactor(
        new PushFactorPayload(
          `${identity}'s factor`,
          json.serviceSid,
          json.identity,
          '000000000000000000000000000000000000',
          json.token
        )
      );
      factor = await TwilioVerify.verifyFactor(
        new VerifyPushFactorPayload(factor.sid)
      );
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={identity}
        onChangeText={(value) => setIdentity(value)}
        placeholder="Identity"
      />
      <TextInput
        style={styles.input}
        value={accessTokenUrl}
        onChangeText={(value) => setAccessTokenUrl(value)}
        placeholder="Access token URL"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onCreateFactorButtonPress}
      >
        {!isFetching ? (
          <Text style={styles.buttonText}>CREATE FACTOR</Text>
        ) : (
          <ActivityIndicator size="small" />
        )}
      </TouchableOpacity>
    </View>
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
});
