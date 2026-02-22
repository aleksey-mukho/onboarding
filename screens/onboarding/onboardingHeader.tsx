import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CloseButton } from '@/widgets/buttons/closeButton/closeButton';
import { Button } from '@/widgets/buttons/button';
import { useGoBack } from '@/features/navigation/useGoBack';

export const OnboardingHeader = React.memo(() => {
  // const router = useRouter();

  const goBack = useGoBack();

  return (
    <View style={styles.wrapper}>
      <CloseButton onPress={goBack} />
      <Button onPress={() => {}} text="Skip" />
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
