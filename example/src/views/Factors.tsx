import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import TwilioVerify, { Factor } from 'react-native-twilio-verify';
import { Colors } from '../constants';
import type { RootStackParamList } from '../types';
import FactorListItem from '../components/FactorListItem';

type FactorsViewProps = StackScreenProps<RootStackParamList, 'Factors'>;

const Factors = ({ navigation }: FactorsViewProps) => {
  const [factors, setFactors] = useState<Factor[]>([]);

  useEffect(() => {
    (async function getFactors() {
      setFactors(await TwilioVerify.getAllFactors());
    })();
  }, []);

  const onCreateFactorButtonPress = () => {
    navigation.navigate('CreateFactor');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={factors}
        renderItem={FactorListItem}
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
