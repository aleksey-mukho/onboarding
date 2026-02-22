import React, { useCallback, useEffect } from 'react';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, Text, TextInput } from 'react-native';
import * as Haptics from 'expo-haptics';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const InteractiveTextInput = React.memo(
  ({
    inputRef,
    text,
    setText,
    isValid,
    currentStep,
    setCurrentStep,
    dataType,
  }: {
    inputRef: React.RefObject<TextInput | null>;
    text: string;
    setText: (text: string) => void;
    isValid: boolean;
    currentStep: number | null;
    setCurrentStep: (step: number) => void;
    dataType: 'travelType' | 'airportType';
  }) => {
    useEffect(() => {
      if (isValid)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, [isValid]);

    const isActiveStyle =
      (currentStep === 0 && dataType === 'travelType') ||
      (currentStep === 1 && dataType === 'airportType');
    const animatedStyleTitle = useAnimatedStyle(() => ({
      fontSize: withTiming(isActiveStyle ? 28 : 16),
      paddingRight: withTiming(isActiveStyle ? 0 : 8),
    }));
    const animatedInputContainerStyle = useAnimatedStyle(() => ({
      height: withTiming(isActiveStyle ? 33 : 20),
    }));
    const animatedInputTextStyle = useAnimatedStyle(() => ({
      fontSize: withTiming(isActiveStyle ? 24 : 16),
    }));

    const onFocus = useCallback(() => {
      if (currentStep === 1 && dataType === 'travelType') {
        setCurrentStep(0);
      } else if (currentStep === 0 && dataType === 'airportType') {
        setCurrentStep(1);
      }
    }, [currentStep, setCurrentStep, dataType]);

    const paceholderText = dataType === 'travelType' ? 'Travel type' : 'Place';

    return (
      <Animated.View
        entering={FadeInRight.duration(800)}
        exiting={FadeOutLeft.duration(800)}
      >
        {!isValid && dataType === 'travelType' && (
          <Text style={styles.description}>
            To personalise your recommendations, tell me a little about how you
            travel:
          </Text>
        )}
        <Animated.View
          style={[
            styles.mainContent,
            isActiveStyle ? styles.column : styles.row,
          ]}
        >
          <Animated.Text style={[styles.title, animatedStyleTitle]}>
            {dataType === 'travelType' ? 'I travel for' : 'My home airport is'}
          </Animated.Text>
          <Animated.View
            style={[styles.inputContainer, animatedInputContainerStyle]}
          >
            <Animated.Text
              style={[styles.hiddenMeasureText, animatedInputTextStyle]}
              numberOfLines={1}
            >
              {text || paceholderText}
            </Animated.Text>
            <AnimatedTextInput
              ref={inputRef}
              placeholderTextColor="#00000040"
              style={[styles.input, animatedInputTextStyle]}
              placeholder={dataType === 'travelType' ? 'Travel type' : 'Place'}
              value={text}
              onChangeText={setText}
              onPressIn={onFocus}
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
);
InteractiveTextInput.displayName = 'OnboardingReasonsForTravelText';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  description: {
    fontSize: 20,
    color: '#7a7a7a',
    fontWeight: '600',
    paddingVertical: 16,
  },
  mainContent: {
    paddingVertical: 16,
    flexDirection: 'row',
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.5,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  hiddenMeasureText: {
    fontSize: 24,
    fontWeight: '600',
    opacity: 0,
    paddingHorizontal: 8,
  },
  input: {
    ...StyleSheet.absoluteFillObject,
    fontSize: 24,
    fontWeight: '600',
    backgroundColor: '#e9d5ff',
    color: '#000',
    borderRadius: 40,
    // padding: 8,
    paddingHorizontal: 8,
  },
});
