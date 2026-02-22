import React, { useCallback, useEffect, useState } from 'react';
import { Chip } from '@/widgets/chip/chip';
import { StyleSheet, TextInput, View } from 'react-native';
import { TRAVEL_OPTIONS } from '@/screens/onboarding/onboardingQuestions/travelOptions';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

export const ReasonsForTravelChips = React.memo(
  ({
    inputRef,
    travelType,
    setTravelType,
  }: {
    inputRef: React.RefObject<TextInput | null>;
    travelType: string;
    setTravelType: (text: string) => void;
  }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelectTravel = useCallback(
      (id: string) => () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        const label = TRAVEL_OPTIONS.find((o) => o.id === id)?.label || '';
        setSelectedId(id);
        setTravelType(label);

        setTimeout(() => inputRef.current?.focus(), 100);
      },
      []
    );

    useEffect(() => {
      setSelectedId(null);
    }, [travelType]);

    const getIsSelected = useCallback(
      (id: string) => selectedId === id || travelType.toLowerCase() === id,
      [travelType, selectedId]
    );

    return (
      <Animated.View
        entering={FadeInRight.duration(800)}
        exiting={FadeOutLeft.duration(800)}
      >
        <View style={styles.chipsContainer}>
          {TRAVEL_OPTIONS.map((option) => (
            <Chip
              key={option.id}
              option={option}
              isSelected={getIsSelected(option.id)}
              onPress={handleSelectTravel(option.id)}
            />
          ))}
        </View>
      </Animated.View>
    );
  }
);
ReasonsForTravelChips.displayName = 'OnboardingReasonsForTravelChips';

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
});
