import { Pressable, StyleSheet } from 'react-native';

import type { Challenge } from '@twilio/twilio-verify-for-react-native';
import { Colors } from '../constants';
import ChallengeComponent from './Challenge';

type ChallengeListItemProps = {
  item: Challenge;
  onPress: (challenge: Challenge) => void;
};

const ChallengeListItem = ({ item, onPress }: ChallengeListItemProps) => {
  return (
    <Pressable onPress={() => onPress(item)} style={styles.container}>
      <ChallengeComponent challenge={item} styles={challengeComponentStyles} />
    </Pressable>
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
