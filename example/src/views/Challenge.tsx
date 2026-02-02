import { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

import TwilioVerify, {
  Challenge,
  ChallengeStatus,
  type UpdatePushChallengePayload,
} from '@twilio/twilio-verify-for-react-native';
import type { ViewProps } from '../types';
import {
  Colors,
  Shadows,
  Spacing,
  BorderRadius,
  Typography,
} from '../constants';
import FactorComponent from '../components/Factor';
import ChallengeRequest from '../components/ChallengeRequest';

const ChallengeView = ({ route, navigation }: ViewProps<'Challenge'>) => {
  const [challenge, setChallenge] = useState<Challenge>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { challengeSid, factor } = route.params;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      (async function getChallenge() {
        try {
          const challengeData = await TwilioVerify.getChallenge(
            challengeSid,
            factor.sid
          );
          setChallenge(challengeData);
        } catch (error) {
          console.error('Failed to get challenge:', error);
          Alert.alert('Error', 'Failed to load challenge details');
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isFocused, challengeSid, factor]);

  /**
   * Updates a challenge status (Approve or Deny)
   *
   * TwilioVerify.updateChallenge() sends the user's response to Twilio Verify.
   *
   * Process:
   * 1. User taps Approve or Deny button
   * 2. SDK sends the response to Twilio
   * 3. Twilio validates the response and updates the challenge
   * 4. Your backend receives a webhook notification with the result
   *
   * Parameters:
   * - factorSid: The factor's unique identifier
   * - challengeSid: The challenge's unique identifier
   * - status: 'approved' or 'denied'
   * - factorType: Type of factor (Push)
   *
   * Important: After updating, always fetch the latest challenge state
   * to reflect any changes (e.g., status, updatedAt timestamp)
   */
  const updateChallenge = async (status: ChallengeStatus) => {
    try {
      setIsSubmitting(true);
      const updateChallengePayload: UpdatePushChallengePayload = {
        factorSid: factor.sid,
        challengeSid: challengeSid,
        status: status,
        factorType: factor.type,
      };
      await TwilioVerify.updateChallenge(updateChallengePayload);

      Alert.alert('Success', `Challenge has been ${status}`, [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Failed to update challenge:', error);
      Alert.alert('Error', JSON.stringify(error));
    } finally {
      try {
        // Refresh challenge to get updated status
        const updatedChallenge = await TwilioVerify.getChallenge(
          challengeSid,
          factor.sid
        );
        setChallenge(updatedChallenge);
      } catch (error) {
        console.error('Failed to refresh challenge after update:', error);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary.main} />
            <Text style={styles.loadingText}>Loading challenge...</Text>
          </View>
        ) : (
          <Fragment>
            <Animated.View
              entering={FadeInDown.duration(400)}
              style={styles.factorCard}
            >
              <Text style={styles.sectionTitle}>Factor Information</Text>
              <FactorComponent factor={factor} styles={factorStyles} />
            </Animated.View>
            {challenge && (
              <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                <ChallengeRequest
                  challenge={challenge}
                  componentStyles={challengeComponentStyles}
                  isSubmitting={isSubmitting}
                  onUpdate={updateChallenge}
                />
              </Animated.View>
            )}
          </Fragment>
        )}
      </ScrollView>
    </View>
  );
};

const factorStyles = StyleSheet.create({
  view: {
    paddingVertical: Spacing.sm,
  },
  text: {
    fontSize: Typography.fontSize.md,
  },
});

const challengeComponentStyles = StyleSheet.create({
  view: {
    paddingVertical: Spacing.sm,
  },
  text: {
    fontSize: Typography.fontSize.md,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.xxl,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
  },
  factorCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
});

export default ChallengeView;
