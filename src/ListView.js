import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert, Image } from 'react-native';
import Loader from './Loader'
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ListView extends Component {
    static navigationOptions = {
        title: 'Delicious Recipes',
        backgroundColor : 'red',
        headerShown: true
    }

    constructor() {
        super()
        this.state = {
            visible: false,
            recipeList: [],
            isFetching: false,
        }
    }

    componentDidMount() {
        this.getRecepeList()

    }


    render() {
        return ( 
            <View style={styles.redContainer}>
                {/* <SafeAreaView>             */}
            <FlatList
              data={ this.state.recipeList }
              renderItem={({item}) => 
            // <TouchableOpacity activeOpacity={0.9} onPress={this.GetListItem.bind(this, item.name)}>
            <View style={styles.container} >
              <Image 
               source={{ uri: item.photo == null ? '/Users/zalakpatel/Documents/Projects/React Native Sample/Demo/assets/image_placeholder.png' : item.photo }}
               style={styles.imageStyle}  
        />
        <View  style = {styles.textContainer}>
        <Text style={styles.cellTitle} > {item.name} </Text>
        <Text style={styles.createdTitle} >created by : {item.firstName} {item.lastName} </Text>
       </View>
        </View>
       }
        keyExtractor={(item, index) => index}
        style = {styles.recipeList}
        />
        {/* </SafeAreaView> */}
       </View> 
       );
     }



    getRecepeList = () => {
        console.log("API")
        //    this.setState({ visible: true })
        const { navigate } = this.props.navigation;
        fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'
                }
            }).then((response) => {
                this.setState({ visible: false })
                return response.json()
            }).then((responseJson) => {
                this.setState({ visible: false })
                if (responseJson.error == null) {
                    this.setState({ recipeList: responseJson, visible: false })
                    console.log(recipeList)
                    // Alert.alert('Success', 'Login successfully')
                } else {
                    Alert.alert('Error', responseJson.error)
                }
            }).catch((error) => {
                this.setState({ visible: false })
                Alert.alert('Error', error)
            })


    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'rgba(159, 189, 166,1)',
            marginBottom : 10,
            elevation: 3,
            shadowRadius: 5,
            shadowOpacity: 0.5
            
            // backgroundColor: 'red',
            // left : 50
        },
        textContainer:{
            flex: 1,
            flexDirection: 'column',
        },
        redContainer: {
            flex: 1,
            // backgroundColor: 'darkgreen',
            justifyContent: 'center',
            alignContent: 'center'
        },

        recipeList: {
            height: '100%',
            // backgroundColor: 'green',
            width: '100%',
        },

        topTitle: {
            fontSize: 20, fontWeight: 'bold', color: 'white', fontFamily: 'GillSans-BoldItalic', alignContent : 'center',justifyContent:'center', alignSelf: 'center', top: 15
        },
        cellTitle:{
            fontSize: 20, color: 'black', fontFamily: 'GillSans-BoldItalic', alignSelf: 'center',  left : 20, top : 20
        },
        createdTitle:{
            fontSize: 20, color: 'black', fontFamily: 'GillSans-Italic', alignContent : 'center',justifyContent:'center', alignSelf: 'center',  left : 20, top: 20
        },

        mainView: {
            // backgroundColor:'black',
            height: 130,
            width: '100%',
            alignSelf: 'center',
            marginVertical: 20,
        },

        recipeContent: {
            backgroundColor: 'white',
            width: '70%',
            height: '100%',
            alignSelf: 'center',
            borderRadius: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            shadowOffset: { height: 10, width: 10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5
            // alignContent:'space-between'
        },

        imageView: {
            shadowOffset: { height: 10, width: 10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5
        },

        imageStyle: {
            height: 85,
            width: 85,
            left: 10,
            borderRadius: 20,

            // position:'absolute'

        },

        buttonStyle: {
            right: -20,
            height: 40,
            width: 40,
            borderRadius: 20,
            shadowOffset: { height: 10, width: -10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
        },

        recipeName: {
            fontSize: 20,
            fontWeight: "bold"
        }
    }

)
