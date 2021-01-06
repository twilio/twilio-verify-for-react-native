import React from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { Factor } from 'react-native-twilio-verify';
import FactorComponent from './Factor';

const FactorListItem: ListRenderItem<Factor> = ({ item }) => {
  return (
    <TouchableOpacity>
      <FactorComponent factor={item} styles={styles} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    marginVertical: 5,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 20,
  },
});

export default FactorListItem;
