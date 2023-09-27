import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App () {

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('');

  useEffect(()=>{
    (async ()=>{
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura);
      }catch(error){}
    })();
},[])

  setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao',anotacao);
    }catch(error){}
    alert('Sua anotação foi salva!');
    console.log(anotacao);
  }

  function atualizarTexto(){
    setarEstado('leitura');
    setData();
  }

  if(estado == 'leitura')
  {
    return(
    <View style={{marginTop:27, flex: 1}}>
      <View style={styles.header}><Text style={{textAlign:'center', color:'white', fontSize: 18}}>Aplicativo de Anotação</Text></View>
      {
        (anotacao == '')?
        <View style={{padding:20}}><Text style={{opacity:0.3}}>Nenhum texto encontrado.</Text></View>
        :
        <View style={{padding:20}}><Text style={styles.anotacao}>{anotacao}</Text></View>
      }
      <TouchableOpacity onPress={()=> setarEstado('edicao')} style={styles.btnAnotacao}>
        {
          (anotacao == '')?
          <Text style={styles.btnTexto}>+</Text>
          :
          <Text style={{fontSize:16,color:'white',textAlign:'center',marginTop:13}}>Editar</Text>
        }
      </TouchableOpacity>
    </View>
    )
  }
  else if (estado == 'edicao')
  {
    return(
    <View style={{marginTop:27, flex: 1}}>
      <View style={styles.header}><Text style={{textAlign:'center', color:'white', fontSize: 18}}>Aplicativo de Anotação</Text></View>
      <TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} style={{padding:10,height:600,textAlignVertical:'top'}} multiline={true} numberOfLines={5} value={anotacao}></TextInput>
      <TouchableOpacity onPress={()=> atualizarTexto()} style={styles.btnSalvar}><Text style={{textAlign:'center',color:'white'}}>Salvar</Text></TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width:'100%',
    padding: 10,
    backgroundColor: '#069'
  },
  anotacao:{
    fontSize:15
  },
  btnAnotacao:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25
  },
  btnTexto: {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 3,
    fontSize: 30
  },
  btnSalvar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#069'
  }
});