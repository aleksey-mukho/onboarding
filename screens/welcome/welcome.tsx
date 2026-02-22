import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedControl from './assets/segmented_control.png';
import Profile from './assets/profile.png';
import Promo from './assets/promo.png';

import { WelcomeBonusesItem } from '@/screens/welcome/welcomeBonusesItem';
import { Link } from 'expo-router';

export const Welcome = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Image source={SegmentedControl} style={styles.segmentedControl} />
          <View style={[styles.roundButton, styles.topRightButton]}>
            <Image source={Profile} style={styles.userIcon} />
          </View>
        </View>
        <Text style={styles.title}>
          Book your next trip in seconds and save up to 60% on travel
        </Text>
        <View style={styles.promoWrapper}>
          <Image source={Promo} style={styles.promoImg} />
        </View>
        <Text style={styles.subTitle}>
          Simply chat with our Mal AI to book your next trip and get up to 15%
          cashback on your first two bookings internationally.
        </Text>
        <WelcomeBonusesItem text={'Pay over 4 installments'} />
        <WelcomeBonusesItem text={'Best price guranteed'} />
        <WelcomeBonusesItem text={'Pay over 4 installments'} />
      </View>
      <View style={styles.footer}>
        <Link href={'/onboarding'} style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Get Started</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    backgroundColor: '#C3D2E7',
  },
  segmentedControl: { width: 201, resizeMode: 'contain' },
  userIcon: { width: 24, resizeMode: 'contain' },
  footerButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  footerButton: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoWrapper: { overflow: 'hidden', borderRadius: 24 },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
    paddingBottom: 16,
  },
  subTitle: {
    paddingTop: 8,
    paddingBottom: 16,
    fontSize: 16,
    color: '#7A7A7A',
    fontWeight: '400',
  },
  promoImg: {
    width: Dimensions.get('window').width - 32,
    // height: 300,
    // resizeMode: 'contain'
  },
  headerWrapper: {
    height: 136,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#C3D2E7',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00000005',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#C3D2E7',
    paddingHorizontal: 16,
  },
  topRightButton: {
    position: 'absolute',
    right: 0,
    top: 16,
  },
});
