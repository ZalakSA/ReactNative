import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import Loader from './Loader'
import ListView from './ListView';

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = { email: 'jm1@example.com', password: 'jay@123', visible: false }
        // this.state = { email: '', password: '', visible: false}
    }


    render() {

        return <View style={styles.container}>
            <Loader visible={this.state.visible} > </Loader>
            <ImageBackground source={require('../assets/Background-1.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>

                    <TextInput style={styles.inputBox}
                        placeholder="Email"
                        placeholderTextColor="#ffffff"
                        value={this.state.email}
                        selectionColor="#fff"
                        keyboardType="email-address"
                        onChangeText={(email) => this.setState({ email })}
                        onSubmitEditing={() => this.password.focus()}
                    />
                    <TextInput style={styles.inputBox}

                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#ffffff"
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}


                    />
                    <TouchableOpacity style={styles.button} onPress={this.loginButtonclicked}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>

        </View>


    }

    loginButtonclicked = () => {
        this.setState({ visible: true })
        fetch('http://35.160.197.175:3006/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password
            })
        }).then((response) => {
            this.setState({ visible: false })
            return response.json()
        }).then((responseJson) => {
            this.setState({ visible: false })
            if (responseJson.error == null) {
                console.log(responseJson)
                this.props.navigation.navigate("ListView");
                // this.props.navigation.navigate('ListView');
                
                // Alert.alert('Success', 'Login successfully')
            } else {
                Alert.alert('Error', responseJson.error)
            }
        })
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor : "lightgreen"
        // opacity : "0"
        // backgroundColor : "red",
        // paddingTop: 10,
        // paddingLeft:35
    },

    inputBox: {
        width: 300,
        height: 50,
        backgroundColor: "grey",
        opacity: 0.7,
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000000',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }

});