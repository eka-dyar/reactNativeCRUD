import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native'

export default class PegawaiMain extends Component {
  static navigationOptions = {
    title: ' Data Pegawai '
  }

  constructor (props) {
    super(props)
    this.state = {
      Nama: '',
      Gaji: ''
    }
  }

  // membuat function insert data
  insertPegawai = () => {
    fetch('http://17.17.17.104/my-react-crud/InsertDataPegawai.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pegawai_nama: this.state.Nama,
        pegawai_gaji: this.state.Gaji
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson)
      })
      .catch(error => {
        console.error(error)
      })
  }

  // membuat function lihat data
  lihatPegawai = () => {
    this.props.navigation.navigate('PegawaiRead')
  }

  render () {
    return (
      <View>
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 8 }}>
          {' '}
          input data pegawai baru{' '}
        </Text>

        <TextInput
          placeholder='isikan nama pegawai'
          onChangeText={TextInputValue =>
            this.setState({ Nama: TextInputValue })
          }
          underlineColorAndroid='transparent'
        />

        <TextInput
          placeholder='isikan gaji pegawai'
          onChangeText={TextInputValue =>
            this.setState({ Gaji: TextInputValue })
          }
          underlineColorAndroid='transparent'
        />

        <TouchableOpacity activeOpacity={0.4} onPress={this.insertPegawai}>
          <Text> Simpan Data Pegawai </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.4} onPress={this.lihatPegawai}>
          <Text> Lihat Data Pegawai </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
