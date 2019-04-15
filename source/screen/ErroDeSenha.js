import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button} from 'react-native';
import firebase from 'firebase';

export default class ErroDeSenha extends Component {
    constructor(props){
    super(props);
    this.state = {
      email:'',
      senha:''
    };

    this.cadastrar = this.cadastrar.bind(this);

     let config = {
        apiKey: "AIzaSyCLCcFk_bOThVDK-E7McDXXXXq8g98Kwro",
        authDomain: "projeto-teste-f4bf1.firebaseapp.com",
        databaseURL: "https://projeto-teste-f4bf1.firebaseio.com",
        projectId: "projeto-teste-f4bf1",
        storageBucket: "projeto-teste-f4bf1.appspot.com",
        messagingSenderId: "389228372439"
      };
    firebase.initializeApp(config);
    
}

  cadastrar() {
    //acessar o authentication
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.senha
    ).catch((error)=>{
      //erro do código(error.code)  erro da msg(error.message)
      //alert(error.code + error.message)
      if(error.code == 'auth/weak-password') {
        alert("Sua senha deve ter pelo menos 6 caracteres!");
      } else if (error.code == 'auth/email-already-in-use'){
        alert("Esse email já esta sendo utilizado");
      }
    });
   // alert("Cadastrado com sucesso!")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Salvar email senha no firebase direto:</Text>
        <Text>Email:</Text>
        <TextInput onChangeText={(email)=>this.setState({email})} placeholder="insert here" style={styles.input} />
        <Text>Password:</Text>
        <TextInput secureTextEntry={true} onChangeText={(senha) => this.setState({senha})} placeholder="insert here" style={styles.input} />
        <Button title="cadastrar" onPress={this.cadastrar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    alignItems: 'center',
  },
  input:{
    margin:10,
    width:'80%',
    height:40,
    borderWidth: 1,
  }
});