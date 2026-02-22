import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { CloseButton } from '@/widgets/buttons/closeButton/closeButton';
import { Button } from '@/widgets/buttons/button';
import { useGoBack } from '@/features/navigation/useGoBack';
import { useRouter } from 'expo-router';

export const OnboardingHeader = React.memo(() => {
  const router = useRouter();

  const goBack = useGoBack();
  const handleSkip = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <View style={styles.wrapper}>
      <CloseButton onPress={goBack} />
      <Button onPress={handleSkip} text="Skip" />
    </View>
  );
});
OnboardingHeader.displayName = 'OnboardingHeader';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
