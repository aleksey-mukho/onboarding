import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

export const Button = React.memo(
  ({ onPress, text }: { onPress: () => void; text: string }) => {
    return (
      <Pressable onPress={onPress} style={styles.button} hitSlop={12}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);
Button.displayName = 'Button';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  button: {
    paddingHorizontal: 24,
    height: 32,
    justifyContent: 'center',
    borderRadius: 16,
    borderColor: '#000',
    borderWidth: 1,
  },
});
