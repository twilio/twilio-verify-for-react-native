import {
  ActivityIndicator,
  StyleSheet,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  type Challenge,
  type ChallengeStatus,
} from '@twilio/twilio-verify-for-react-native';
import {
  Colors,
  Shadows,
  Spacing,
  BorderRadius,
  Typography,
} from '../constants';
import ChallengeComponent from './Challenge';

type ChallengeRequestProps = {
  challenge: Challenge;
  componentStyles?: {
    view?: ViewStyle;
    text?: TextStyle;
  };
  isSubmitting: boolean;
  onUpdate: (status: ChallengeStatus) => Promise<void>;
};

const ChallengeRequest = ({
  challenge,
  componentStyles,
  isSubmitting,
  onUpdate,
}: ChallengeRequestProps) => {
  const approvePressed = useSharedValue(false);
  const denyPressed = useSharedValue(false);

  const approveAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(approvePressed.value ? 0.95 : 1, {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
  }));

  const denyAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(denyPressed.value ? 0.95 : 1, {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.challengeCard}>
        <Text style={styles.title}>Challenge Details</Text>
        <ChallengeComponent
          challenge={challenge}
          styles={componentStyles}
          isDetailView={true}
        />
      </View>
      {challenge.status === ('pending' as ChallengeStatus) && (
        <View style={styles.buttonsContainer}>
          <Animated.View style={[styles.buttonWrapper, approveAnimatedStyle]}>
            <TouchableOpacity
              style={[styles.button, styles.approveButton]}
              onPress={() => onUpdate('approved' as ChallengeStatus)}
              onPressIn={() => (approvePressed.value = true)}
              onPressOut={() => (approvePressed.value = false)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={Colors.text.inverse} />
              ) : (
                <Text style={styles.buttonText}>Approve</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.buttonWrapper, denyAnimatedStyle]}>
            <TouchableOpacity
              style={[styles.button, styles.denyButton]}
              onPress={() => onUpdate('denied' as ChallengeStatus)}
              onPressIn={() => (denyPressed.value = true)}
              onPressOut={() => (denyPressed.value = false)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={Colors.text.inverse} />
              ) : (
                <Text style={styles.buttonText}>Deny</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  challengeCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    ...Shadows.small,
  },
  approveButton: {
    backgroundColor: Colors.success.main,
  },
  denyButton: {
    backgroundColor: Colors.error.main,
  },
  buttonText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
});

export default ChallengeRequest;
