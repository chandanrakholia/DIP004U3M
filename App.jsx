import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { FaImages } from "react-icons/fa";
import { CgEnter } from 'react-icons/cg';
export default function App() {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [concentration, setConcentration] = useState(null);
  const [ip, setIp] = useState("127.0.0.1:8000")
  // const apiUrl = "http://127.0.0.1:8000/app/get-concentration";
  let apiUrl = `http://${ip}/app/get-concentration`;

  const apiCall = async (imageInfo) => {
    try {
      setLoading(true);
      console.log(apiUrl);
      const formData = new FormData();
      formData.append('image', {
        uri: imageInfo.uri,
        name: imageInfo.fileName, // Assuming the image has a filename property
        type: imageInfo.type, // Assuming the image has a type property
      });

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);

      // Set concentration only if the response data is valid
      if (response.data) {
        setConcentration(response.data);
      } else {
        console.error('Invalid response data:', response.data);
        Alert.alert('Error', 'Invalid response data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching concentration. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after the API call finishes
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.error) {
        console.error('ImagePicker error:', response.error);
        Alert.alert('Error', 'An error occurred while selecting image.');
      } else {
        setSelectedImage(response.assets[0].uri);
        apiCall(response.assets[0]);
      }
    });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: '40%', width: '100%' }}>
        {selectedImage ? (
          <>
            <View
              style={{
                width: '60%',
                height: '90%',
                marginLeft: '20%',
                backgroundColor: 'skyblue',
                marginTop: 25,
              }}
            >
              <Image style={{ height: '100%', width: '100%' }} source={{ uri: selectedImage }} />
            </View>
          </>
        ) : (
          <>
            <View style={{ paddingTop: 25, flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 25 }}>No image selected</Text>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={pickImage}
        style={{
          marginTop: 20,
          height: 50,
          width: '60%',
          backgroundColor: 'skyblue',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        }}
      >
        <Text style={{ fontSize: 20 }}>Gallery</Text>
      </TouchableOpacity>
      <TextInput
        style={{ height: 45, fontSize: 20, marginTop: 25, textAlign: 'center', color: "white"}}
        placeholder="Type IP address"
        onChangeText={newip => { setIp(newip); console.log(newip) }}
        defaultValue={ip}
      />
      {loading ? (
        <Text style={{textAlign:"center"}}>Loading...</Text>
      ) : concentration ? (
        <>
          {concentration.Status != "Error" ? (
            <>
              <Text>
                Status: {concentration.Status}
              </Text>
              {console.log(typeof concentration.Concentation)}
              <Text style={{textAlign: "center", fontSize: 30, color: "green"}}>Concentration: {concentration.Concentation.toFixed(2)}</Text>
            </>
          )
            :
            <>
              <Text style={{textAlign: "center", fontSize: 30, color: "red"}}>Status: {concentration.Status}</Text>
            </>
          }
        </>
      ) : null}
    </SafeAreaView>
  );
}
