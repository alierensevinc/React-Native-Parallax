import { Stack } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Constants from '../constants/Constants';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;
const IMG_LINK = 'https://images.unsplash.com/photo-1543094585-3629d00f6f3a?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Page = () => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOfset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOfset.value,
                [0, IMG_HEIGHT / 1.5],
                [0, 1]
            )
        }
    })

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOfset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    )
                },
                {
                    scale: interpolate(
                        scrollOfset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    )
                }
            ]
        }
    });

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerLeft: () => <Text>Back</Text>,
                    headerBackground: () => <Animated.View style={[styles.header, headerAnimatedStyle]} />
                }}
            />
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.Image
                    source={{ uri: IMG_LINK }}
                    style={[styles.image, imageAnimatedStyle]}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Parallax Scroll</Text>
                    <Text>{Constants.TEXT}</Text>
                </View>
            </Animated.ScrollView>
        </View>
    )
}

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: '#FFF',
        height: 100
    },
    image: {
        width: width,
        height: IMG_HEIGHT
    },
    textContainer: {
        backgroundColor: '#FFF',
        padding: 16
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 16
    }
})