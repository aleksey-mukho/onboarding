import { BlurView } from 'expo-blur';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import Shadow from './shadow.png';
import Close from './close.png';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export function ModalCustom({
  isVisible,
  setIsVisible,
  children,
  title,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  children: React.ReactNode;
  title: string;
}) {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets.bottom);
  const [isVisibleLocal, setIsVisibleLocal] = useState(isVisible);

  const translateY = useSharedValue(windowHeight);
  const blurOpacity = useSharedValue(0);

  useEffect(() => {
    setIsVisibleLocal(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (isVisibleLocal) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      blurOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      translateY.value = withTiming(windowHeight, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
      blurOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [isVisibleLocal]);

  const onClose = useCallback(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 300);

    setIsVisibleLocal(false);
  }, [setIsVisible, setIsVisibleLocal]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const blurStyle = useAnimatedStyle(() => ({
    opacity: blurOpacity.value,
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
      if (translateY.value < 0) {
        translateY.value = 0;
      }
    })
    .onEnd((event) => {
      const shouldClose = event.velocityY > 800 || translateY.value > 100;
      if (shouldClose) {
        translateY.value = withSpring(
          windowHeight,
          {
            velocity: event.velocityY,
            overshootClamping: true,
            energyThreshold: 1,
          },
          (isFinished) => {
            if (isFinished) {
              scheduleOnRN(onClose);
            }
          }
        );
        blurOpacity.value = withTiming(0, {
          duration: 300,
          easing: Easing.in(Easing.ease),
        });
      } else {
        translateY.value = withSpring(0, {
          velocity: event.velocityY,
          overshootClamping: true,
        });
      }
    });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.blurContainer, blurStyle]}>
        <BlurView
          intensity={1}
          tint={'systemMaterialLight'}
          style={styles.blurContainer}
        />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <View>
          <Animated.View style={animatedStyle}>
            <Image source={Shadow} style={styles.shadow} />
          </Animated.View>
          <Animated.View style={[styles.modalContent, animatedStyle]}>
            <View style={styles.wrapper}>
              {title && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <Pressable onPress={onClose}>
                    <Image source={Close} style={styles.closeIcon} />
                  </Pressable>
                </View>
              )}
              <View style={styles.body}>{children}</View>
            </View>
          </Animated.View>
        </View>
      </GestureDetector>
    </Modal>
  );
}

const getStyles = (paddingBottom: number) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    closeIcon: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
    },
    shadow: {
      position: 'absolute',
      bottom: windowHeight - 260,
      left: 0,
      right: 0,
      width: windowWidth,
      height: 160,
      resizeMode: 'stretch',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: windowHeight - 150,
    },
    wrapper: {
      paddingTop: 15,
      paddingHorizontal: 25,
      paddingBottom: paddingBottom || 16,
      width: windowWidth,
    },
    title: {
      fontSize: 16,
      color: '#7a7a7a',
      paddingRight: 8,
    },
    body: {
      paddingVertical: 20,
    },
    blurContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });
