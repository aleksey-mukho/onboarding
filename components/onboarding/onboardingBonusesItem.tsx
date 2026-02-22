import React from 'react';
import Flash from './assets/flash.png';
import { View, Image, StyleSheet, Text } from 'react-native';

export const OnboardingBonusesItem = React.memo(
  ({ text }: { text: string }) => {
    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Image source={Flash} style={styles.icon} />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
);

OnboardingBonusesItem.displayName = 'OnboardingBonusesItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#00000010',
  },
  icon: { width: 20, resizeMode: 'contain' },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00000010',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    paddingLeft: 24,
  },
});
