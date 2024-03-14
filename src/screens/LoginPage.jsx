import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
// navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import {RootStackParamList} from '../App'


const App = ({ navigation }) => {
  const [name, setName] = useState("");

  const goToHomePage = () => {
    // Navigate to the Home Page
    // Replace 'HomePage' with the actual name of your Home Page component
    navigation.navigate('HomePage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.hcgText}>HCGMeter</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="Name"
          textAlign="center"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Age"
          textAlign="center"
          keyboardType='numeric'
        />
        <Button title="Enter"
          onPress={() => navigation.navigate("HomePage", 
          // {
          //   userName: name
          // }
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#51D1C6",
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hcgText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nameText: {
    fontSize: 18,
    color: '#fff',
  },
  bottomContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    textAlign: 'center', // Centering the text inside TextInput
    width: '100%', // Take full width
    borderWidth: 1,
    borderColor: '#ddd', // Adjust border color to a lighter shade
    color: "black",
    placeholderTextColor: "black",
    borderRadius: 20, // Adjust the border radius as needed
    fontSize: 20,
    // color:"#51D1C6",
  },
});

export default App;