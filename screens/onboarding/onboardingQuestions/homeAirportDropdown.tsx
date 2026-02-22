import React from 'react';
import { Dropdown } from '@/widgets/dropdown/dropdown';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

export const HomeAirportDropdown = React.memo(() => {
  return (
    <Animated.View
      entering={FadeInRight.delay(200).duration(800)}
      exiting={FadeOutLeft.duration(800)}
      style={styles.container}
    >
      <Dropdown />
    </Animated.View>
  );
});
HomeAirportDropdown.displayName = 'HomeAirportDropdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
});
