import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { Colors, Spacing, BorderRadius, Typography } from '../constants';

import NetInfo from '@react-native-community/netinfo';

const NetworkIndicator = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const dotAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(withSequence(withSpring(1), withSpring(0.5)), -1, true),
  }));

  if (isConnected === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: isConnected
              ? Colors.success.main
              : Colors.error.main,
          },
          isConnected && dotAnimatedStyle,
        ]}
      />
      <Text style={styles.text}>
        {isConnected ? 'Network Connected' : 'No Network Connection'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.sm,
  },
  text: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
  },
});

export default NetworkIndicator;
