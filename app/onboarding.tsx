import React from 'react';
import { Onboarding } from '@/screens/onboarding/onboarding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function OnboardingScreen() {
  return (
    <GestureHandlerRootView>
      <Onboarding />
    </GestureHandlerRootView>
  );
}
