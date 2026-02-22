import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CaretDown from './caretDown.png';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Search, X } from 'lucide-react-native';
import { AIRPORTS } from '@/screens/onboarding/onboardingQuestions/airports';
import * as Haptics from 'expo-haptics';

export const Dropdown = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAirport = (airport: (typeof AIRPORTS)[0]) => {
    // setSelectedId(airport.id);
    // setTextInput(airport.name);
    // setIsAirportModalOpen(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <>
      <Pressable onPress={() => setIsModalOpen(true)} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.placeholder}>Airport</Text>
          <Text style={styles.text}>Select or Start Typing</Text>
        </View>
        <Image source={CaretDown} style={styles.caret} />
      </Pressable>
      {isModalOpen && (
        <Animated.View entering={FadeInDown.duration(400)} style={styles.modal}>
          <View style={styles.modalHeader}>
            <View style={styles.searchContainer}>
              <Search size={20} color="#999" />
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Type airport or city name"
                autoFocus
              />
            </View>
            <Pressable
              onPress={() => setIsModalOpen(false)}
              style={styles.closeModal}
            >
              <X size={24} color="#000" />
            </Pressable>
          </View>
          <ScrollView>
            {AIRPORTS.map((airport) => (
              <Pressable
                key={airport.id}
                style={styles.airportRow}
                onPress={() => handleSelectAirport(airport)}
              >
                <Text style={styles.airportRowText}>{airport.name}</Text>
                <View
                  style={[
                    styles.radio,
                    // selectedId === airport.id && styles.radioActive,
                  ]}
                />
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </>
  );
});
Dropdown.displayName = 'Dropdown';

const styles = StyleSheet.create({
  placeholder: {
    color: '#7a7a7a',
    fontSize: 10,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafaff',
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 51,
    paddingTop: 8,
  },
  text: { flex: 1, color: '#00000050', fontSize: 14 },
  caret: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    zIndex: 10,
    padding: 20,
    paddingTop: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 45,
  },
  modalSearchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  closeModal: { padding: 5 },
  airportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  airportRowText: { fontSize: 16, fontWeight: '500' },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#DDD',
  },
  radioActive: { backgroundColor: '#000', borderColor: '#000' },
});
