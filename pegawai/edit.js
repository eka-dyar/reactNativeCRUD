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

import ListView from 'deprecated-react-native-listview'

export default class PegawaEdit extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputID: '',
      inputNama: '',
      inputGaji: ''
    };
  }

  static navOptions = {
    title: 'Edit Pegawai'
  };

  componentDidMount(){
      //membaca informasi dari pegawaiRead
      this.setState({
          inputID:this.props.navigation.state.params.ID,
          inputNama:this.props.navigation.state.params.NAMA,
          inputGaji:this.props.navigation.state.params.GAJI,
      });
  }

  //fungsi utk ubah data pegawai

  updatePegawai = () => {
      fetch('http://17.17.17.104/my-react-crud/UpdateDataPegawai.php',{
          method:'POST',
          headers:{
              Accept:'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              pegawai_id:this.state.inputID,
              pegawai_nama:this.state.inputNama,
              pegawai_gaji:this.state.inputGaji,
          })
      })
      .then(response=>response.json())
      .then(responseJson => {
          Alert.alert(responseJson);
      })
      .catch(error=> {
          console.error(error);
      });
      //diredirect ke halaman read
      this.props.navigation.navigate('PegawaiRead')
  };

  //fungsi utk delete pegawai
  deletePegawai = () => {
      fetch('http://17.17.17.104/my-react-crud/HapusDataPegawai.php',{
          method:'POST',
          headers:{
              Accept:'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              pegawai_id:this.state.inputID,
          })
      })
      .then(response=>response.json())
      .then(responseJson => {
          Alert.alert(responseJson);
      })
      .catch(error=> {
          console.error(error);
      });
      //diredirect ke halaman read
      this.props.navigation.navigate('PegawaiRead')
  };
  render(){
      return(
          <View>
            <Text style={{fontSize: 20, alignText:'center' , marginBottom: 10,}}>
            {' '}
            Edit Data Pegawai
            </Text>

            <Text style={{fontSize: 12, alignText:'left' , marginBottom: 10,}}>
            ID 
            </Text>
            <TextInput editable={false}
            value={this.state.inputID}
            />

            <Text style={{fontSize: 12, alignText:'left' , marginBottom: 10,}}>
            Nama 
            </Text>
            <TextInput placeholder='Nama Pegawai'
            value={this.state.inputNama}
            onChangeText={TextInputValue => this.setState({inputNama:TextInputValue})}/>
          

          <Text style={{fontSize: 12, alignText:'left' , marginBottom: 10,}}>
            Gaji 
            </Text>
            <TextInput placeholder='Gaji Pegawai'
            value={this.state.inputGaji}
            onChangeText={TextInputValue => this.setState({inputGaji:TextInputValue})}/>

            <TouchableOpacity onPress={this.updatePegawai}>
            <Text>ubah data</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.deletePegawai}>
            <Text>hapus data</Text>
            </TouchableOpacity>
          </View>

      );
  }
}
