/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// import file js lain yg dibutuhkan

import PegawaiMain from './pegawai/main'
import PegawaiRead from './pegawai/read'
import PegawaiEdit from './pegawai/edit'

const RootStack = createStackNavigator(
  {
    PegawaiMain: {
      screen: PegawaiMain,
      navigationOptions: {}
    },
    PegawaiRead: {
      screen: PegawaiRead,
      navigationOptions: {}
    },
    PegawaiEdit: {
      screen: PegawaiEdit,
      navigationOptions: {}
    }
  },
  {
    initialRouteName: 'PegawaiMain'
  }
)

const AppContainer = createAppContainer(RootStack)
export default AppContainer
// export default class App extends Component {
//   render(){
//     return <AppContainer/>
//   }
// }
