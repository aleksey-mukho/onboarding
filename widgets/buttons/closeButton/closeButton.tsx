import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Cross from './cross.png';

export const CloseButton = React.memo(
  ({ onPress }: { onPress: () => void }) => {
    return (
      <Pressable onPress={onPress} style={styles.iconWrapper} hitSlop={12}>
        <Image source={Cross} style={styles.icon} />
      </Pressable>
    );
  }
);
CloseButton.displayName = 'CloseButton';

const styles = StyleSheet.create({
  icon: {
    width: 18,
    resizeMode: 'contain',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
