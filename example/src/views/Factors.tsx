import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import TwilioVerify, {
  Factor,
  ChallengeListOrder,
} from '@twilio/twilio-verify-for-react-native';
import type { ViewProps } from '../types';
import FactorListItem from '../components/FactorListItem';
import NetworkIndicator from '../components/NetworkIndicator';
import {
  Colors,
  Shadows,
  Spacing,
  BorderRadius,
  Typography,
} from '../constants';

const Factors = ({ route, navigation }: ViewProps<'Factors'>) => {
  const [factors, setFactors] = useState<Factor[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingChallenges, setPendingChallenges] = useState<
    Record<string, number>
  >({});
  const message = route.params?.message;
  const buttonPressed = useSharedValue(false);

  const isFocused = useIsFocused();

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(buttonPressed.value ? 0.96 : 1, {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
  }));

  useEffect(() => {
    if (message) {
      Alert.alert('Success', message);
    }
  }, [message]);

  const sortFactors = (a: Factor, b: Factor) =>
    a.createdAt < b.createdAt ? 1 : -1;

  /**
   * Loads pending challenges count for a specific factor
   */
  const loadPendingChallengesCount = useCallback(async (factorSid: string) => {
    try {
      const challengeList = await TwilioVerify.getAllChallenges({
        factorSid: factorSid,
        pageSize: 20,
        pageToken: undefined,
        order: 'desc' as ChallengeListOrder,
      });
      const pendingCount = challengeList.challenges.filter(
        (challenge) => challenge.status === 'pending'
      ).length;
      return pendingCount;
    } catch (error) {
      console.error('Failed to get challenges for factor:', factorSid, error);
      return 0;
    }
  }, []);

  /**
   * Loads all verification factors from local storage
   *
   * TwilioVerify.getAllFactors() returns an array of all factors
   * that have been created and stored locally on this device.
   *
   * Each factor contains:
   * - sid: Unique identifier
   * - identity: User identifier
   * - friendlyName: Display name
   * - status: verified/unverified
   * - createdAt: Creation timestamp
   */
  const loadFactors = useCallback(async () => {
    try {
      const allFactors = await TwilioVerify.getAllFactors();
      setFactors(allFactors.sort(sortFactors));

      // Load pending challenges count for each factor
      const challengeCounts: Record<string, number> = {};
      await Promise.all(
        allFactors.map(async (factor) => {
          const count = await loadPendingChallengesCount(factor.sid);
          challengeCounts[factor.sid] = count;
        })
      );
      setPendingChallenges(challengeCounts);
    } catch (error) {
      console.error('Failed to get factors:', error);
      const twilioVerifyAvailable = await TwilioVerify.isAvailable();
      Alert.alert(
        'Error',
        `Failed to load factors. Twilio verify available: ${twilioVerifyAvailable}`
      );
    }
  }, [loadPendingChallengesCount]);

  useEffect(() => {
    if (isFocused) {
      loadFactors();
    }
  }, [isFocused, loadFactors]);

  const onCreateFactorButtonPress = () => {
    navigation.navigate('CreateFactor');
  };

  const onFactorItemPress = (factor: Factor) => {
    navigation.navigate('Factor', { factor });
  };

  /**
   * Deletes a verification factor
   *
   * TwilioVerify.deleteFactor(sid) removes the factor from:
   * - Local device storage
   * - Twilio Verify service (if online)
   *
   * After deletion, the device will no longer receive push challenges
   * for this factor.
   */
  const onFactorDeletePress = async (factor: Factor) => {
    Alert.alert(
      'Delete Factor',
      'Are you sure you want to delete this factor?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await TwilioVerify.deleteFactor(factor.sid);
              await loadFactors();
            } catch (error) {
              console.error('Failed to delete factor:', error);
              Alert.alert('Error', 'Failed to delete factor');
            }
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadFactors();
    setIsRefreshing(false);
  };

  const checkAvailability = async () => {
    try {
      const isAvailable = await TwilioVerify.isAvailable();
      Alert.alert(
        'Availability Check',
        isAvailable
          ? 'TwilioVerify is available ✓'
          : 'TwilioVerify is not available ✗'
      );
    } catch (error) {
      Alert.alert('Error', `Failed to check availability: ${error}`);
      console.error(error);
    }
  };

  const clearLocalStorage = async () => {
    Alert.alert(
      'Clear Local Storage',
      'Are you sure you want to clear all local storage? This will remove all factors.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await TwilioVerify.clearLocalStorage();
              setFactors([]);
              setPendingChallenges({});
              Alert.alert('Success', 'Local storage cleared successfully');
            } catch (error) {
              Alert.alert('Error', `Failed to clear local storage: ${error}`);
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <Animated.View
      entering={FadeInDown.duration(400)}
      style={styles.emptyState}
    >
      <Text style={styles.emptyStateTitle}>No Factors Yet</Text>
      <Text style={styles.emptyStateText}>
        Create your first factor to get started with Twilio Verify
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <NetworkIndicator />
        <Animated.View
          entering={FadeInDown.delay(200).duration(400)}
          style={styles.developerSection}
        >
          <Text style={styles.developerTitle}>Developer Tools</Text>
          <View style={styles.developerButtons}>
            <TouchableOpacity
              style={[styles.developerButton, styles.developerButtonPrimary]}
              onPress={checkAvailability}
            >
              <Text style={styles.developerButtonText}>Check Availability</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.developerButton, styles.developerButtonDanger]}
              onPress={clearLocalStorage}
            >
              <Text style={styles.developerButtonText}>
                Clear Local Storage
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      <FlatList
        data={factors}
        renderItem={({ item }) => (
          <FactorListItem
            item={item}
            onPress={onFactorItemPress}
            onDelete={onFactorDeletePress}
            pendingChallenges={pendingChallenges[item.sid] || 0}
          />
        )}
        keyExtractor={(item) => item.sid}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          factors.length === 0 ? styles.emptyListContent : styles.listContent
        }
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      <Animated.View style={[styles.buttonWrapper, buttonAnimatedStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={onCreateFactorButtonPress}
          onPressIn={() => (buttonPressed.value = true)}
          onPressOut={() => (buttonPressed.value = false)}
        >
          <Text style={styles.buttonText}>Create New Factor</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  listContent: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  emptyListContent: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyStateTitle: {
    fontSize: Typography.fontSize.xxl,
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
  buttonWrapper: {
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
    ...Shadows.medium,
  },
  button: {
    backgroundColor: Colors.primary.main,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    ...Shadows.small,
  },
  buttonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
  developerSection: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  developerTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  developerButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  developerButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  developerButtonPrimary: {
    backgroundColor: `${Colors.accent.blue}15`,
    borderWidth: 1,
    borderColor: Colors.accent.blue,
  },
  developerButtonDanger: {
    backgroundColor: `${Colors.accent.purple}15`,
    borderWidth: 1,
    borderColor: Colors.accent.purple,
  },
  developerButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
});

export default Factors;
