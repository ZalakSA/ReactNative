import React from 'react';
import Login from './src/Login';
import ListView from './src/ListView';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'


const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent : "center",
    alignItems: "center"
  }
});

const navigate = createStackNavigator(
  {
    Login:Login,
    ListView:ListView,

  },
  {
    initialRouteName: 'Login'
  }
);

export default createAppContainer(navigate);
