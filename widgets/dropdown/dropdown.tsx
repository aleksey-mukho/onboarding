import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CaretDown from './caretDown.png';

export const Dropdown = React.memo(
  ({
    value,
    placeholder,
    children,
    setIsModalOpen,
    isValidValue,
  }: {
    value: string | undefined;
    placeholder: string;
    children: React.ReactNode;
    setIsModalOpen: (isOpen: boolean) => void;
    isValidValue: boolean;
  }) => {
    return (
      <>
        <Pressable
          onPress={() => setIsModalOpen(true)}
          style={styles.container}
        >
          <View style={styles.content}>
            <Text style={styles.placeholder}>{placeholder}</Text>
            <Text style={[isValidValue ? styles.text : styles.defaultText]}>
              {value}
            </Text>
          </View>
          <Image source={CaretDown} style={styles.caret} />
        </Pressable>
        {children}
      </>
    );
  }
);
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
  defaultText: { flex: 1, color: '#00000050', fontSize: 14 },
  text: { flex: 1, color: '#000000', fontSize: 14 },
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
});
