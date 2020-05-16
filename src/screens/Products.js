import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';

export default function Products () {

    const [data, setData] = useState('')
    let freshToken = '';
    
    const pullData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        
        var raw = {token:"f80ca69e-3a48-51a8-823c-3c3b3e9ab9c3"};
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
          redirect: 'follow'
        };
        
        fetch("http://audit.mazmaz.net/Api/WebApi.asmx/SyncServerData", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      };

    return (
        <View>
            <Button onPress={pullData}>
            <Text>Pull data</Text>
            </Button>
            <Text>Products list</Text>
        </View>
    )
}



const styles = StyleSheet.create({})
