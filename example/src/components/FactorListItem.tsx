import { StyleSheet, Text, View, Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { Factor } from '@twilio/twilio-verify-for-react-native';
import {
  Colors,
  Shadows,
  Spacing,
  BorderRadius,
  Typography,
} from '../constants';
import FactorComponent from './Factor';

type FactorListItemProps = {
  item: Factor;
  onPress: (factor: Factor) => void;
  onDelete: (factor: Factor) => void;
  pendingChallenges?: number;
};

const FactorListItem = ({
  item,
  onPress,
  onDelete,
  pendingChallenges = 0,
}: FactorListItemProps) => {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(pressed.value ? 0.98 : 1, {
          damping: 15,
          stiffness: 150,
        }),
      },
    ],
  }));

  const renderRightAction = () => {
    return (
      <View style={styles.deleteAction}>
        <Pressable style={styles.deleteButton} onPress={() => onDelete(item)}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <Pressable
          onPress={() => onPress(item)}
          onPressIn={() => (pressed.value = true)}
          onPressOut={() => (pressed.value = false)}
          style={styles.container}
        >
          <View style={styles.cardContent}>
            <FactorComponent factor={item} styles={factorComponentStyles} />
            <View style={styles.rightSection}>
              {pendingChallenges > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{pendingChallenges}</Text>
                </View>
              )}
              <View style={styles.chevron}>
                <Text style={styles.chevronText}>›</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  container: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.full,
    minWidth: 24,
    minHeight: 24,
    paddingHorizontal: Spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  chevron: {
    marginLeft: Spacing.sm,
  },
  chevronText: {
    fontSize: 32,
    color: Colors.text.tertiary,
    fontWeight: Typography.fontWeight.regular,
  },
  deleteAction: {
    backgroundColor: Colors.error.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
    marginVertical: Spacing.sm,
    marginRight: Spacing.md,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    height: '100%',
    paddingHorizontal: Spacing.md,
  },
  deleteText: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
});

const factorComponentStyles = StyleSheet.create({
  view: {
    flex: 1,
  },
  text: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
});

export default FactorListItem;
