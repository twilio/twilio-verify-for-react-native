import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';

import type { Factor } from '@twilio/twilio-verify-for-react-native';

type FactorComponentProps = {
  factor: Factor;
  styles: {
    view: ViewStyle;
    text: TextStyle;
  };
};

const FactorComponent = ({ factor, styles }: FactorComponentProps) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text} selectable={true}>Sid: {factor.sid}</Text>
      <Text style={styles.text}>Identity: {factor.identity}</Text>
      <Text style={styles.text}>Name: {factor.friendlyName}</Text>
      <Text style={styles.text}>Status {factor.status}</Text>
    </View>
  );
};

export default FactorComponent;
