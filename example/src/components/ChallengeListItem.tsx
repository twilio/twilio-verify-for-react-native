import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { Challenge } from '@twilio/twilio-verify-for-react-native';
import { Colors } from '../constants';
import ChallengeComponent from './Challenge';

type ChallengeListItemProps = {
  item: Challenge;
  onPress: (challenge: Challenge) => void;
};

const ChallengeListItem = ({ item, onPress }: ChallengeListItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <ChallengeComponent challenge={item} styles={challengeComponentStyles} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.black.default,
    borderBottomWidth: 0.5,
  },
});

const challengeComponentStyles = StyleSheet.create({
  view: {
    marginVertical: 5,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 20,
  },
});

export default ChallengeListItem;
