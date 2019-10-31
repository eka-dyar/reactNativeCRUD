import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  Platform,
  TouchableOpacity,
  Button,
  ActivityIndicator
} from 'react-native'

import ListView from 'deprecated-react-native-listview' // krn listview per okt 2019 deprecated, cara manggilnya tidak diimport dr react native scr langsung

export default class PegawaiRead extends Component {
  // lifecycle 1 : inisialisasi
  constructor (props) {
    super(props)
    this.state = {
      isLoad: true
    }
  }

  static navOptions = {
    title: 'List Pegawai'
  }

  // membuat fungsi utk request ke server memakai lifecycle component did mount
  // lifecycle 2 : mounting

  componentDidMount () {
    return fetch('http://17.17.17.104/my-react-crud/LihatSemuaPegawai.php')
      .then(response => response.json())
      .then(responseJson => {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.setState(
          {
            isLoad: false,
            dataSource: ds.cloneWithRows(responseJson)
          },
          function () {
            // set State yg baru
          }
        )
      })
      .catch(error => {
        console.error(error)
      })
  }

  // membuat fungsi utk memetakan response json
  // parameter disamakan dengan key dr data json
  getDataPeg = (pegawai_id, pegawai_nama, pegawai_gaji) => {
    this.props.navigation.navigate('PegawaiEdit', {
      ID: pegawai_id,
      NAMA: pegawai_nama,
      GAJI: pegawai_gaji
    })
  }

  ListViewSeparator = () => {
    return (
      <View style={{ height: 0.6, width: '100%', backgroundColor: 'blue' }} />
    )
  }

  render () {
    if (this.state.isLoad) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewSeparator}
          renderRow={rowData => (
            <Text onPress={this.getDataPeg.bind(
                this,
                rowData.pegawai_id,
                rowData.pegawai_nama,
                rowData.pegawai_gaji,
              )} style={{ paddingLeft: 10 }}>
              {rowData.pegawai_id + '.  ' + rowData.pegawai_nama}
            </Text>
          )}
        />
      </View>
    )
  }
}
