import React, { useEffect, useState } from 'react';
import { Dropdown } from '@/widgets/dropdown/dropdown';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { HomeAirportDropdownModalContent } from '@/screens/onboarding/onboardingQuestions/homeAirportDropdown/homeAirportDropdownModalContent';
import { AIRPORTS } from '@/screens/onboarding/onboardingQuestions/airports';
import { ModalCustom } from '@/widgets/modal/modal';

export const HomeAirportDropdown = React.memo(
  ({
    airportName,
    setAirportName,
    isModalOpen,
    setIsModalOpen,
    isValidAirportName,
  }: {
    airportName: string;
    setAirportName: (name: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    isValidAirportName: boolean;
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
        <Dropdown
          value={isValidAirportName ? airportName : 'Select or Start Typing'}
          placeholder="Airport"
          setIsModalOpen={setIsModalOpen}
          isValidValue={isValidAirportName}
        >
          <ModalCustom
            isVisible={isModalOpen}
            setIsVisible={setIsModalOpen}
            title="The airport where you normally depart from"
          >
            <HomeAirportDropdownModalContent
              isModalOpen={isModalOpen}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setIsModalOpen={setIsModalOpen}
              initialAirportName={airportName}
              setAirportName={setAirportName}
            />
          </ModalCustom>
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
