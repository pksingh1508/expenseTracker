import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import AddExpenseForm from '../Forms/AddExpenseForm';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 2;
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5;

export type BottomModalRef = {
    scrollTo: (destination: number) => void;
};

const BottomModal = forwardRef((_, ref) => {
    // const translateY = useSharedValue(0);
    const translateY = useSharedValue(SCREEN_HEIGHT); // Starts fully hidden off the screen
    const context = useSharedValue({ y: 0 });

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((e) => {
            translateY.value = e.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
        })
        .onEnd(() => {
            if (translateY.value > -MIN_TRANSLATE_Y) {
                translateY.value = withSpring(SCREEN_HEIGHT);
            } else {
                translateY.value = withSpring(-MAX_TRANSLATE_Y);
            }
        });

    const reanimatedBottomStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const scrollTo = (destination: number) => {
        'worklet';
        translateY.value = withSpring(destination, { damping: 50 });
    };

    // Expose the scrollTo function through the ref
    useImperativeHandle(ref, () => ({
        scrollTo,
    }));

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
                <View style={styles.line} />
                <AddExpenseForm />
            </Animated.View>
        </GestureDetector>
    );
});

export default BottomModal;

const styles = StyleSheet.create({
    bottomsheet_container: {
        width: '100%',
        height: SCREEN_HEIGHT,
        backgroundColor: Colors.secondary300,
        position: 'absolute',
        top: SCREEN_HEIGHT / 1.8,
        zIndex: 12000,
        borderRadius: 25,
        paddingHorizontal: 10,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
    },
});
