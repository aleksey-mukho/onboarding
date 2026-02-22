import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import RightArrow from './right-arrow.png';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const NextButton = React.memo(
  ({ isActive, onPress }: { isActive: boolean; onPress: () => void }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      backgroundColor: withTiming(isActive ? '#000' : '#00000005'),
    }));

    return (
      <AnimatedPressable
        onPress={onPress}
        style={[styles.wrapper, animatedStyle]}
        hitSlop={12}
      >
        <Image source={RightArrow} style={styles.icon} />
      </AnimatedPressable>
    );
  }
);

NextButton.displayName = 'NextButton';

const styles = StyleSheet.create({
  activeBackground: {
    backgroundColor: '#000',
  },
  wrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00000005',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 38,
    resizeMode: 'contain',
  },
});
