import * as React from 'react';

import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import TwilioVerify, { PushFactorPayload, VerifyPushFactorPayload } from 'react-native-twilio-verify';

export default function App() {

  const [factorInfo, setFactorInfo] = React.useState<string>('');
  const [isFetching, setIsFetching] = React.useState<boolean>(false)
  const [identity, setIdentity] = React.useState<string>('')
  const [accessTokenUrl, setAccessTokenUrl] = React.useState<string>('')

  React.useEffect(() => {

  }, []);

  const onCreateFactorButtonPress = async () => {
    try {
      setFactorInfo('')
      setIsFetching(true)
      const response = await fetch(accessTokenUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identity: identity
        })
      })
      const json = await response.json()
      let factor = await TwilioVerify.createFactor(new PushFactorPayload(`${identity}'s factor`, json.serviceSid, json.identity, "000000000000000000000000000000000000", json.token))
      factor = await TwilioVerify.verifyFactor(new VerifyPushFactorPayload(factor.sid))
      setFactorInfo(JSON.stringify(factor))
    } catch (error) {
      alert(error)
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={identity}
        onChangeText={(value) => setIdentity(value)}
        placeholder='Identity' />
      <TextInput
        style={styles.input}
        value={accessTokenUrl}
        onChangeText={(value) => setAccessTokenUrl(value)}
        placeholder='Access token URL' />
      <TouchableOpacity style={styles.button} onPress={onCreateFactorButtonPress}>
        {!isFetching ?
          (<Text style={styles.buttonText}>CREATE FACTOR</Text>)
          :
          (<ActivityIndicator size='small' />)}
      </TouchableOpacity>
      <Text>{factorInfo && `Factor: ${factorInfo}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
    paddingLeft: 5
  },
  button: {
    width: '100%',
    backgroundColor: '#0070BB',
    paddingVertical: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
  },
  buttonText: {
    color: 'white'
  }
});
