import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [concentration, setConcentration] = useState(null);

  const apiUrl = "http://127.0.0.1:8000/app/get-concentration";

  const apiCall = async (imageInfo) => {
    try {
      setLoading(true);
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
      <View style={{ height: 400, width: '100%' }}>
        <Image style={{ height: 400, width: '100%' }} source={{ uri: selectedImage }} />
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
      {loading ? (
        <Text>Loading...</Text>
      ) : concentration ? (
        <>
          <Text>Concentration: {concentration.Concentation}</Text>
          <Text>Status: {concentration.Status}</Text>
          <View style={{ marginTop: 10 }}>
            <Text>C Strip:</Text>
            <Text>X: {concentration['C Strip'].x}</Text>
            <Text>Y: {concentration['C Strip'].y}</Text>
            <Text>Width: {concentration['C Strip'].width}</Text>
            <Text>Height: {concentration['C Strip'].height}</Text>
            <Text>Confidence: {concentration['C Strip'].confidence}</Text>
            <Text>Class: {concentration['C Strip'].class}</Text>
            <Text>Class ID: {concentration['C Strip'].class_id}</Text>
            <Text>Detection ID: {concentration['C Strip'].detection_id}</Text>
            <Text>Image Path: {concentration['C Strip'].image_path}</Text>
            <Text>Prediction Type: {concentration['C Strip'].prediction_type}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text>T Strip:</Text>
            <Text>X: {concentration['T Strip'].x}</Text>
            <Text>Y: {concentration['T Strip'].y}</Text>
            <Text>Width: {concentration['T Strip'].width}</Text>
            <Text>Height: {concentration['T Strip'].height}</Text>
            <Text>Confidence: {concentration['T Strip'].confidence}</Text>
            <Text>Class: {concentration['T Strip'].class}</Text>
            <Text>Class ID: {concentration['T Strip'].class_id}</Text>
            <Text>Detection ID: {concentration['T Strip'].detection_id}</Text>
            <Text>Image Path: {concentration['T Strip'].image_path}</Text>
            <Text>Prediction Type: {concentration['T Strip'].prediction_type}</Text>
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
}
