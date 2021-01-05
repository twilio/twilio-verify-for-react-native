import React from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';

import type { Factor } from 'react-native-twilio-verify';
import FactorComponent from './Factor';

const FactorListItem: ListRenderItem<Factor> = ({ item }) => {
  return <FactorComponent factor={item} styles={styles} />;
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
