import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { View, ActivityIndicator } from 'react-native'


export default function Loader(props) {
    if (props.visible) {

        return <View style={{ position: 'absolute', width: '100%', height: '110%', zIndex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            {/* <ActivityIndicator size='large' color='green' style={{ flex: 1 }}></ActivityIndicator> */}
            <AnimatedLoader
                visible={true}
                overlayColor="transparent"
                source={require("../assets/loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            />
        </View>
    } else {
        return <View></View>
    }
}



const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    }
});