import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import TwilioVerify, { Factor } from 'react-native-twilio-verify';
import { Colors } from '../constants';
import type { ViewProps } from '../types';
import FactorListItem from '../components/FactorListItem';

const Factors = ({ route, navigation }: ViewProps<'Factors'>) => {
  const [factors, setFactors] = useState<Factor[]>([]);
  const message = route.params?.message;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (message) {
      Alert.alert('message', message);
    }
  }, [message]);

  useEffect(() => {
    if (isFocused) {
      (async function getFactors() {
        setFactors(await TwilioVerify.getAllFactors());
      })();
    }
  }, [isFocused]);

  const onCreateFactorButtonPress = () => {
    navigation.navigate('CreateFactor');
  };

  const onFactorItemPress = (factor: Factor) => {
    navigation.navigate('Factor', { factor });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={factors}
        renderItem={({ item }) => (
          <FactorListItem item={item} onPress={onFactorItemPress} />
        )}
        keyExtractor={(item) => item.sid}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onCreateFactorButtonPress}
      >
        <Text style={styles.buttonText}>CREATE FACTOR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 30,
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

export default Factors;
