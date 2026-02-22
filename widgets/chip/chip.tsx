import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SegmentedControl from '@/screens/welcome/assets/segmented_control.png';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Chip = React.memo(({ option, isSelected, onPress }: any) => {
  const Icon = option.icon;
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: isSelected ? '#F0EBFF' : '#FFF',
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => (scale.value = withSpring(0.92))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={[styles.chip, animatedStyle]}
    >
      <View style={styles.iconWrapper}>
        <Image source={Icon} style={styles.icon} />
      </View>
      <Text style={styles.chipLabel}>{option.label}</Text>
    </AnimatedPressable>
  );
});

Chip.displayName = 'Chip';

const styles = StyleSheet.create({
  chip: {
    height: 73,
    minWidth: 72,
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00000010',
  },
  chipLabel: { fontSize: 12, fontWeight: '500', marginTop: 8 },
  icon: { width: 18, height: 18, resizeMode: 'contain' },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00000010',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
