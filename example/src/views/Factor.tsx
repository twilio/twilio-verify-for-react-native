import React, { Fragment, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import TwilioVerify, {
  Challenge,
  ChallengeListPayload,
} from 'react-native-twilio-verify';
import type { ViewProps } from '../types';
import FactorComponent from '../components/Factor';
import ChallengeListItem from '../components/ChallengeListItem';

const Factor = ({ route, navigation }: ViewProps<'Factor'>) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { factor } = route.params;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async function getChallenges() {
        const challengeList = await TwilioVerify.getAllChallenges(
          new ChallengeListPayload(factor.sid, 20)
        );
        setChallenges(challengeList.challenges.sort(sortChallenges));
      })();
    }
  }, [isFocused, factor]);

  const onChallengeItemPress = (challenge: Challenge) => {
    navigation.navigate('Challenge', { factor, challengeSid: challenge.sid });
  };

  const sortChallenges = (a: Challenge, b: Challenge) =>
    a.createdAt < b.createdAt ? 1 : -1;

  return (
    <View style={styles.container}>
      <FactorComponent factor={factor} styles={factorStyles} />
      <Fragment>
          <Text style={styles.challengesTitle}>Challenges</Text>
      {challenges.length > 0 && (
          <FlatList
            data={challenges}
            renderItem={({ item }) => (
              <ChallengeListItem item={item} onPress={onChallengeItemPress} />
            )}
            keyExtractor={(item) => item.sid}
          />
      )}
      </Fragment>
    </View>
  );
};

const factorStyles = StyleSheet.create({
  view: {
    marginVertical: 5,
    marginHorizontal: 8,
  },
  text: {
    fontSize: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  challengesTitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Factor;
