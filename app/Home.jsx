import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const productsData = [
  { id: 1, name: 'Office Wear', price: 10, image: require('../assets/dress1.png') },
  { id: 2, name: 'Black', price: 20, image: require('../assets/dress2.png') },
  { id: 3, name: 'Church Wear', price: 30, image: require('../assets/dress3.png') },
  { id: 4, name: 'Lamerei', price: 10, image: require('../assets/dress4.png') },
  { id: 5, name: '21WN', price: 20, image: require('../assets/dress5.png') },
  { id: 6, name: 'Lopo', price: 30, image: require('../assets/dress6.png') },
  { id: 7, name: 'Lame', price: 10, image: require('../assets/dress7.png') },
];

const Home = () => {
  const navigation = useNavigation(); // Hook to access navigation object

  const addToCart = async (product) => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems') || '[]';
      const newCartItems = JSON.parse(cartItems);
      newCartItems.push(product);
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} resizeMode='cover' />
      <View style={styles.button}>
        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
        <Pressable onPress={() => addToCart(item)}>
          <Image source={require('../assets/add_circle.png')} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.header}>
        <View><Image source={require('../assets/Menu.png')} /></View>
        <View><Image source={require('../assets/Logo.png')} /></View>
        <View style={styles.smallBox}>
          <Image source={require('../assets/Search.png')} style={styles.search} />
          <Pressable onPress={() => navigation.navigate('CartScreen')}>
            <Image source={require('../assets/shoppingBag.png')} />
          </Pressable>
        </View>
      </View>
      <View style={styles.header2}>
        <Text style={styles.text1}>OUR STORY</Text>
        <View style={styles.img}>
          <View style={styles.elipse1}>
            <Image source={require('../assets/Listview.png')} style={styles.list} />
          </View>
          <View style={styles.elipse}>
            <Image source={require('../assets/Filter.png')} style={styles.list} />
          </View>
        </View>
      </View>
      <View style={styles.Body}>
        <FlatList
          numColumns={2}
          data={productsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flat}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  smallBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    marginRight: 18,
  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  img: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text1: {
    fontSize: 24,
    fontWeight: '400',
  },
  list: {
    marginLeft: 7,
    marginTop: 6,
  },
  elipse1: {
    height: 35,
    width: 35,
    backgroundColor: '#D3D3D3',
    borderRadius: 19,
    marginRight: 9,
    marginTop:-5
  },
  elipse: {
    height: 35,
    width: 35,
    backgroundColor: '#D3D3D3',
    borderRadius: 19,
    marginTop:-5
  },
  item: {
    margin: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop:15
    
  },
  Body: {
    marginTop: 15
    
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
  },
  productPrice: {
    color: 'red',
  },
  flat:{
    height:600
  }
});

export default Home;
