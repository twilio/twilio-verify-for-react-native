import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { Factor } from 'twilio-verify-for-react-native';
import { Colors } from '../constants';
import FactorComponent from './Factor';
import Swipeout from 'react-native-swipeout';

type FactorListItemProps = {
  item: Factor;
  onPress: (factor: Factor) => void;
  onDelete: (factor: Factor) => void;
};

const FactorListItem = ({ item, onPress, onDelete }: FactorListItemProps) => {
  const swipeBtns = [{
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { onDelete(item) },
    autoClose: true
  }];
  return (
    <Swipeout right={swipeBtns}
        backgroundColor= 'transparent'>
      <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
        <FactorComponent factor={item} styles={factorComponentStyles} />
      </TouchableOpacity>
    </Swipeout>
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
