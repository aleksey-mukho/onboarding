import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AIRPORTS } from '@/screens/onboarding/onboardingQuestions/airports';
import * as Haptics from 'expo-haptics';

import Search from './search.png';
import Close from './close.png';

export const HomeAirportDropdownModalContent = React.memo(
  ({
    isModalOpen,
    setIsModalOpen,
    selectedId,
    setSelectedId,
    initialAirportName,
    setAirportName,
  }: {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    selectedId: string | null;
    setSelectedId: (id: string) => void;
    initialAirportName: string;
    setAirportName: (name: string) => void;
  }) => {
    const [airport, setAirport] = useState(initialAirportName);

    const handleSelectAirport = (airport: (typeof AIRPORTS)[0]) => {
      setSelectedId(airport.id);
      setAirport(airport.name);
      setIsModalOpen(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const filterAirports = useMemo(
      () =>
        !airport
          ? AIRPORTS
          : AIRPORTS.filter((a) =>
              a.name.toLowerCase().includes(airport.toLowerCase())
            ),
      [airport]
    );

    const onChangeText = useCallback(
      (text: string) => {
        setAirport(text);

        if (!isModalOpen) {
          setIsModalOpen(true);
        }
      },
      [isModalOpen]
    );

    const onPressAirport = useCallback(
      (airport: (typeof AIRPORTS)[0]) => () => {
        handleSelectAirport(airport);
        setAirportName(airport.name);
      },
      []
    );

    return (
      <>
        <View style={styles.inputContainer}>
          <Image source={Search} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={airport}
            onChangeText={onChangeText}
            placeholder="Type airport or city name"
            placeholderTextColor="#00000040"
            autoFocus
          />
          {airport && (
            <Pressable onPress={() => setAirport('')} hitSlop={12}>
              <Image source={Close} style={styles.closeIcon} />
            </Pressable>
          )}
        </View>
        <ScrollView>
          {filterAirports.map((airport) => (
            <Pressable
              key={airport.id}
              style={styles.airportRow}
              onPress={onPressAirport(airport)}
            >
              <Text style={styles.airportRowText}>{airport.name}</Text>
              <View
                style={[
                  styles.radio,
                  selectedId === airport.id && styles.radioActive,
                ]}
              >
                {selectedId === airport.id && (
                  <View style={styles.radioActiveBody} />
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </>
    );
  }
);
HomeAirportDropdownModalContent.displayName = 'HomeAirportDropdownModalContent';

const styles = StyleSheet.create({
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 12,
  },
  searchInput: {
    paddingLeft: 8,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'relative',
    height: 40,
    backgroundColor: '#00000005',
    borderRadius: 16,
    paddingLeft: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  airportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  airportRowText: { fontSize: 16, fontWeight: '500' },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  radioActive: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#1a1a1a',
  },
  radioActiveBody: {
    width: 12,
    height: 12,
    borderRadius: 7,
    backgroundColor: '#1a1a1a',
  },
});
