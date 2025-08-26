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

import TwilioVerify, { Factor } from '@twilio/twilio-verify-for-react-native';
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
        try {
          const allFactors = await TwilioVerify.getAllFactors();
          setFactors(allFactors.sort(sortFactors));
        } catch (error) {
          console.error('Failed to get factors:', error);
          Alert.alert('Error', 'Failed to load factors');
        }
      })();
    }
  }, [isFocused]);

  const sortFactors = (a: Factor, b: Factor) =>
    a.createdAt < b.createdAt ? 1 : -1;

  const onCreateFactorButtonPress = () => {
    navigation.navigate('CreateFactor');
  };

  const onFactorItemPress = (factor: Factor) => {
    navigation.navigate('Factor', { factor });
  };

  const onFactorDeletePress = async (factor: Factor) => {
    try {
      await TwilioVerify.deleteFactor(factor.sid);
      try {
        const allFactors = await TwilioVerify.getAllFactors();
        setFactors(allFactors.sort(sortFactors));
      } catch (error) {
        console.error('Failed to get factors after deletion:', error);
        Alert.alert('Error', 'Factor deleted but failed to refresh list');
      }
    } catch (error) {
      console.error('Failed to delete factor:', error);
      Alert.alert('Error', 'Failed to delete factor');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={factors}
        renderItem={({ item }) => (
          <FactorListItem item={item} onPress={onFactorItemPress} onDelete={onFactorDeletePress} />
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
