import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';

export default class InsertUpdateRemove extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nome : 'carregando',
      nomeInput: '',
      idadeInput:''
    };

     let config = {
        apiKey: "AIzaSyCLCcFk_bOThVDK-E7McDXXXXq8g98Kwro",
        authDomain: "projeto-teste-f4bf1.firebaseapp.com",
        databaseURL: "https://projeto-teste-f4bf1.firebaseio.com",
        projectId: "projeto-teste-f4bf1",
        storageBucket: "projeto-teste-f4bf1.appspot.com",
        messagingSenderId: "389228372439"
      };
    firebase.initializeApp(config);
    // firebase.database().ref("usuarios/1/nome").on('value', (snapshot)=>{
    //   this.state.nome = snapshot.val();
    //   this.setState(this.state);
    // })
    firebase.database().ref("usuarios/1/nome").once('value').then((snapshot)=>{
      this.state.nome = snapshot.val();
      this.setState(this.state);
    })

    this.inserirUsuario = this.inserirUsuario.bind(this);

    //inserir um dado qualquer direto no Nò
    // firebase.database().ref('contagem').set('90');
    // //alterando direto através do json
    // firebase.database().ref('usuarios').child('1').set({
    //   nome:'Evelyn Mendes',
    //   idade:25
    // });

    // //alterando direto 
    // firebase.database().ref('usuarios').child('2').child('idade').set(26);


    //Deletar quando o dado não tem tabela
    // firebase.database().ref('contagem').remove();
    // // detelar a tabela toda
    // firebase.database().ref('usuarios').child('1').remove();
    // //ou direto
    // firebase.database().ref('usuarios/1').remove();
  }

  inserirUsuario(){

    if(this.state.nomeInput.length > 0){
        // selecionando o Nó usuário na database
      let usuarios = firebase.database().ref('usuarios');

      //gerando uma chave unica e salvando
      let chave = usuarios.push().key;

        //selecionou a chave que gerou
      usuarios.child(chave).set({
          //adiciona os campos
        nome:this.state.nomeInput,
        idade:this.state.idadeInput
      });
      alert('Usuário inserido!');
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Pegar nome no firebase direto:</Text>
        <Text>{this.state.nome}</Text>

        <Text>Pegar nome no firebase dentro de no ref("usuarios/1/nome")</Text>

        <Text>Inserindo um usuário</Text>
        <Text>Nome:</Text>
        <TextInput style={styles.input} placeholder="Insert your name" 
          onChangeText={(nomeInput)=>this.setState({nomeInput})} />
        <Text>Idade</Text>
        <TextInput style={styles.input} placeholder="Insert your age" 
          onChangeText={(idadeInput)=> this.setState({idadeInput})} />

        <Button title='Inserir Usuário' onPress={this.inserirUsuario} />

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    margin:10,
    width:'80%',
    height:40,
    borderWidth: 1,
  }
});
