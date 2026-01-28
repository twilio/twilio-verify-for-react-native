import { Pressable, StyleSheet, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { Challenge } from '@twilio/twilio-verify-for-react-native';
import {
  Colors,
  Shadows,
  Spacing,
  BorderRadius,
  Typography,
} from '../constants';
import ChallengeComponent from './Challenge';

type ChallengeListItemProps = {
  item: Challenge;
  onPress: (challenge: Challenge) => void;
};

const ChallengeListItem = ({ item, onPress }: ChallengeListItemProps) => {
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

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable
        onPress={() => onPress(item)}
        onPressIn={() => (pressed.value = true)}
        onPressOut={() => (pressed.value = false)}
        style={styles.container}
      >
        <View style={styles.cardContent}>
          <ChallengeComponent
            challenge={item}
            styles={challengeComponentStyles}
          />
          <View style={styles.chevron}>
            <Text style={styles.chevronText}>›</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
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
  chevron: {
    marginLeft: Spacing.sm,
  },
  chevronText: {
    fontSize: 32,
    color: Colors.text.tertiary,
    fontWeight: Typography.fontWeight.regular,
  },
});

const challengeComponentStyles = StyleSheet.create({
  view: {
    flex: 1,
  },
  text: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
});

export default ChallengeListItem;
