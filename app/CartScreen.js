import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect for navigation focus

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to load cart items from AsyncStorage
  const loadCartItems = async () => {
    try {
      const items = await AsyncStorage.getItem('cartItems');
      if (items !== null) {
        setCartItems(JSON.parse(items));
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  // Use useFocusEffect to load cart items when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadCartItems();
    }, [])
  );

  // Function to remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems); // Update local state

      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Update AsyncStorage
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Function to render each item in the cart
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} resizeMode='cover' />
      <View style={styles.details}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <Pressable onPress={() => removeFromCart(item.id)}>
        <Image source={require('../assets/remove.png')} style={styles.removeIcon} />
      </Pressable>
    </View>
  );

  return (
    
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.text4}>Your cart is empty</Text>}
      />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },

  details: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  text4:{
    fontSize:20,
    fontWeight: '700'
  }
});

export default CartScreen;
