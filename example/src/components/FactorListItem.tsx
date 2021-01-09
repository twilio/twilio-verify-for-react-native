import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { Factor } from 'react-native-twilio-verify';
import { Colors } from '../constants';
import FactorComponent from './Factor';

type FactorListItemProps = {
  item: Factor;
  onPress: (factor: Factor) => void;
};

const FactorListItem = ({ item, onPress }: FactorListItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <FactorComponent factor={item} styles={factorComponentStyles} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.black.default,
    borderBottomWidth: 0.5,
  },
});

const factorComponentStyles = StyleSheet.create({
  view: {
    marginVertical: 5,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 20,
  },
});

export default FactorListItem;
