import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image, StatusBar, Pressable, Touchable, TouchableOpacity, Alert } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  const alert = () => {
    Alert.alert(
      'Information',
      'This is a simple app created in React Native cli framework.\nThe purpose of this app is to fetch simple JSON data from Rest api.\nCreated by: Diwas Kerung.'
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffff'}}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='white'
        />
            <Text style={{fontWeight: 'bold', fontSize: 18, paddingLeft: 10, paddingTop: 10}}>Welcome</Text>
            <Pressable onPress={alert}><Text style={{fontWeight: 'bold', fontSize: 32, paddingLeft: 10}}>Crypto Today</Text></Pressable>
      {isLoading ? <ActivityIndicator/> : (
        
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                  <Image style={{height: 50, width: 50, marginRight: 10}}
                  source={{uri: item.image}}/>
                  <View style={{alignContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.name}</Text>
                    <Text style={{textTransform: 'uppercase'}}>{item.symbol}</Text>
                  </View>
              </View>
              <Text style={{alignContent: 'center',
               paddingRight: 10,justifyContent: 'center',
               color: 'black', fontWeight: 'bold'}}>$ {item.current_price}</Text>
            </View>
            
          )}
        />
      )}
    </View>
  );
};

