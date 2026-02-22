import React, { useCallback, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingHeader } from '@/screens/onboarding/onboardingHeader';
import { ReasonsForTravelChips } from '@/screens/onboarding/onboardingQuestions/reasonsForTravelChips';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { NextButton } from '@/widgets/buttons/nextButton/nextButton';
import { TRAVEL_OPTIONS } from '@/screens/onboarding/onboardingQuestions/travelOptions';
import { InteractiveTextInput } from '@/screens/onboarding/onboardingQuestions/interactiveTextInput';
import { HomeAirportDropdown } from '@/screens/onboarding/onboardingQuestions/homeAirportDropdown/homeAirportDropdown';
import { AIRPORTS } from '@/screens/onboarding/onboardingQuestions/airports';
import { useRouter } from 'expo-router';

export const Onboarding = React.memo(() => {
  const travelInputRef = useRef<TextInput>(null);
  const airportInputRef = useRef<TextInput>(null);

  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  // On second step we can change active step to show travel step as active
  const [localStep, setLocalStep] = useState(0);
  const [travelType, setTravelType] = useState('');
  const [airportName, setAirportName] = useState('');
  const [isAirportsModalOpen, setIsAirportsModalOpen] = useState(false);

  const isValidTravelType = TRAVEL_OPTIONS.some(
    (opt) => opt.id === travelType.toLowerCase()
  );
  const isValidAirportName = AIRPORTS.some(
    (opt) => opt.name.toLowerCase() === airportName.toLowerCase()
  );

  const isActiveNextButton =
    currentStep === 0 ? isValidTravelType : isValidAirportName;

  const onNextButtonPress = useCallback(() => {
    if (currentStep === 0) {
      setCurrentStep(1);
      setLocalStep(1);
    } else {
      router.push('/dashboard');
    }
  }, [currentStep, router]);

  const onChangeAirportName = useCallback(() => {
    if (!isAirportsModalOpen) {
      setIsAirportsModalOpen(true);
    }
  }, [isAirportsModalOpen]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <OnboardingHeader />
        <InteractiveTextInput
          currentStep={localStep}
          setCurrentStep={setLocalStep}
          inputRef={travelInputRef}
          text={travelType}
          setText={setTravelType}
          isValid={isValidTravelType}
          dataType="travelType"
        />
        {currentStep === 1 && (
          <InteractiveTextInput
            currentStep={localStep}
            setCurrentStep={setLocalStep}
            inputRef={airportInputRef}
            text={airportName}
            setText={setAirportName}
            isValid={isValidTravelType}
            dataType="airportType"
            onChangeTextCustom={onChangeAirportName}
          />
        )}
        <View style={styles.fillSpace} />
        <Animated.View
          entering={FadeInRight.duration(800)}
          exiting={FadeOutLeft.duration(800)}
        >
          <Text style={styles.footerText}>
            {localStep === 0
              ? 'Your typical reason for travel'
              : 'The airport where you normally depart from'}
          </Text>
        </Animated.View>
        <View style={styles.footer}>
          {localStep === 0 ? (
            <ReasonsForTravelChips
              inputRef={travelInputRef}
              travelType={travelType}
              setTravelType={setTravelType}
            />
          ) : (
            <HomeAirportDropdown
              airportName={airportName}
              isValidAirportName={isValidAirportName}
              isModalOpen={isAirportsModalOpen}
              setIsModalOpen={setIsAirportsModalOpen}
              setAirportName={setAirportName}
            />
          )}
          <NextButton
            isActive={isActiveNextButton}
            onPress={onNextButtonPress}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

Onboarding.displayName = 'OnboardingScreen';

const styles = StyleSheet.create({
  footerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7a7a7a',
  },
  fillSpace: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  container: { flex: 1 },
  footer: {
    height: 105,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
