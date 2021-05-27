import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import TwilioVerify, {
  Challenge,
  ChallengeStatus,
  UpdatePushChallengePayload,
} from 'react-native-twilio-verify';
import type { ViewProps } from '../types';
import { Colors } from '../constants';
import FactorComponent from '../components/Factor';
import ChallengeRequest from '../components/ChallengeRequest';
import { ScrollView } from 'react-native-gesture-handler';

const ChallengeView = ({ route }: ViewProps<'Challenge'>) => {
  const [challenge, setChallenge] = useState<Challenge>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { challengeSid, factor } = route.params;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      (async function getChallenge() {
        setChallenge(await TwilioVerify.getChallenge(challengeSid, factor.sid));
        setIsLoading(false);
      })();
    }
  }, [isFocused, challengeSid, factor]);

  const updateChallenge = async (status: ChallengeStatus) => {
    try {
      setIsSubmitting(true);
      const updateChallengePayload = new UpdatePushChallengePayload(
        factor.sid,
        challengeSid,
        status
      );
      await TwilioVerify.updateChallenge(updateChallengePayload);

      Alert.alert('Message', `Challenge was ${status}`);
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    } finally {
      setChallenge(await TwilioVerify.getChallenge(challengeSid, factor.sid));
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.blue.default} />
        ) : (
          <Fragment>
            <FactorComponent factor={factor} styles={factorStyles} />
            {challenge && (
              <ChallengeRequest
                challenge={challenge}
                componentStyles={challengeComponentStyles}
                isSubmitting={isSubmitting}
                onUpdate={updateChallenge}
              />
            )}
          </Fragment>
        )}
      </View>
    </ScrollView>
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

const challengeComponentStyles = StyleSheet.create({
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

export default ChallengeView;
