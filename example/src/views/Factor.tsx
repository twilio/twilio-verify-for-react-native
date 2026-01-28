import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

import TwilioVerify, {
  Challenge,
  ChallengeListOrder,
} from '@twilio/twilio-verify-for-react-native';
import type { ViewProps } from '../types';
import FactorComponent from '../components/Factor';
import ChallengeListItem from '../components/ChallengeListItem';
import {
  Colors,
  Shadows,
  Spacing,
  BorderRadius,
  Typography,
} from '../constants';

const Factor = ({ route, navigation }: ViewProps<'Factor'>) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { factor } = route.params;

  const isFocused = useIsFocused();

  /**
   * Loads all challenges for a specific factor
   *
   * TwilioVerify.getAllChallenges() retrieves push authentication challenges
   * that have been sent to this factor.
   *
   * Parameters:
   * - factorSid: The factor's unique identifier
   * - pageSize: Number of challenges to fetch (max 20)
   * - pageToken: For pagination (undefined for first page)
   * - order: 'asc' or 'desc' (newest first)
   *
   * Each challenge contains:
   * - sid: Unique identifier
   * - status: pending/approved/denied/expired
   * - createdAt: When the challenge was created
   * - expirationDate: When the challenge expires
   * - challengeDetails: Additional context (message, fields)
   */
  const loadChallenges = useCallback(async () => {
    try {
      const challengeList = await TwilioVerify.getAllChallenges({
        factorSid: factor.sid,
        pageSize: 20,
        pageToken: undefined,
        order: 'desc' as ChallengeListOrder,
      });
      setChallenges(challengeList.challenges);
    } catch (error) {
      console.error('Failed to get challenges:', error);
      Alert.alert('Error', 'Failed to load challenges');
    } finally {
      setIsLoading(false);
    }
  }, [factor.sid]);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      loadChallenges();
    }
  }, [isFocused, loadChallenges]);

  const onChallengeItemPress = (challenge: Challenge) => {
    navigation.navigate('Challenge', { factor, challengeSid: challenge.sid });
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadChallenges();
    setIsRefreshing(false);
  };

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.duration(400)} style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Challenges Yet</Text>
      <Text style={styles.emptyStateText}>
        Challenges will appear here when authentication requests are made for
        this factor
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={styles.factorCard}
      >
        <FactorComponent factor={factor} styles={factorStyles} showDetails />
      </Animated.View>

      <Fragment>
        <Text style={styles.challengesTitle}>Recent Challenges</Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary.main} />
          </View>
        ) : (
          <FlatList
            data={challenges}
            renderItem={({ item }) => (
              <ChallengeListItem item={item} onPress={onChallengeItemPress} />
            )}
            keyExtractor={(item) => item.sid}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={
              challenges.length === 0 ? styles.emptyListContent : undefined
            }
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        )}
      </Fragment>
    </View>
  );
};

const factorStyles = StyleSheet.create({
  view: {
    paddingVertical: Spacing.md,
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
  factorCard: {
    backgroundColor: Colors.background.primary,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
  },
  challengesTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.xxl,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  emptyStateTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Factor;
