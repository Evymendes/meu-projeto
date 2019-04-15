import React from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import firebase from 'firebase';

export default class FlatListt extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      lista:[]
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
    //recebendo dados do usuario. snapshot é um objeto. on :muda as coisas na hora
    firebase.database().ref('usuarios').on('value', (snapshot)=>{

      //limpar lista para depois preencher novamente
      let state = this.state; 
      state.lista = [];
    //vai executar a função em cada um dos usuários childItem:item de vez
    snapshot.forEach((childItem)=>{
      //pegar a lista, push: adiciona novo item no array
        state.lista.push({
          // pegar as coisas / o que vai asicionar
          key:childItem.key,
          //val(): tem todos os valores do nó  
          nome:childItem.val().nome,
          idade:childItem.val().idade
        });
      });
    //pegar lista atualizada
      this.setState(state);
  });
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Pegar nome no firebase direto:</Text>
        <FlatList 
          data={this.state.lista}
          renderItem={({item})=>
                <Text>{item.nome}</Text>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
