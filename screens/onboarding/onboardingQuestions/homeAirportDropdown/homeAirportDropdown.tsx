import React, { useEffect, useState } from 'react';
import { Dropdown } from '@/widgets/dropdown/dropdown';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { HomeAirportDropdownModalContent } from '@/screens/onboarding/onboardingQuestions/homeAirportDropdown/homeAirportDropdownModalContent';
import { AIRPORTS } from '@/screens/onboarding/onboardingQuestions/airports';

export const HomeAirportDropdown = React.memo(
  ({
    airportName,
    setAirportName,
    isModalOpen,
    setIsModalOpen,
  }: {
    airportName: string;
    setAirportName: (name: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
  }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
      const selectedAirport = AIRPORTS.find((a) => a.id === selectedId);

      if (selectedAirport) {
        setAirportName(selectedAirport.name);
      }
    }, [selectedId]);

    return (
      <Animated.View
        entering={FadeInRight.delay(200).duration(800)}
        exiting={FadeOutLeft.duration(800)}
        style={styles.container}
      >
        <Dropdown isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <HomeAirportDropdownModalContent
            isModalOpen={isModalOpen}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setIsModalOpen={setIsModalOpen}
            initialAirportName={airportName}
          />
        </Dropdown>
      </Animated.View>
    );
  }
);
HomeAirportDropdown.displayName = 'HomeAirportDropdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
});
