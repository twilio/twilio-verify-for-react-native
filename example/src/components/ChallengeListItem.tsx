import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { Challenge } from 'react-native-twilio-verify';
import ChallengeComponent from './Challenge';

type ChallengeListItemProps = {
  item: Challenge;
  onPress: (challenge: Challenge) => void;
};

const ChallengeListItem = ({ item, onPress }: ChallengeListItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <ChallengeComponent challenge={item} styles={styles} />
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

export default ChallengeListItem;
