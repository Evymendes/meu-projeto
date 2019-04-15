import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';


class kelvin extends Component {

  render() {
    return (
        <View style={styles.container}>
        <Text> asdfg </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    backgroundColor: '#619F42'   
  },
  field: {
    flex: 1, 
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '30%',
    resizeMode: 'contain'
  }, 
});
 
export default EndUserscreen;