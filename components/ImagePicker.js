import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ImagePickerOptions, ImagePickerResult } from "expo-image-picker/src/ImagePicker.types";

const ImagePicker = ( { onPickedImage } ) => {
  const [ pickedImage, setPickedImage ] = useState( null );
  const cameraOptions: ImagePickerOptions = {
    allowsEditing: true,
    aspect: [ 16, 9 ],
    quality: 0.5
  };

  const imagePickerHandler = async () => {
    const { status } = await Permissions.askAsync( Permissions.CAMERA );
    if ( status === 'granted' ) {
      const image: ImagePickerResult = await ImgPicker.launchCameraAsync(
        cameraOptions
      );
      setPickedImage( image.uri );
      onPickedImage( image.uri );
    } else {
      Alert.alert(
        'Insufficient permission!',
        'You need to grant camera permissions to use this app.',
        [{text: 'Okay'}]
      )
      throw new Error( 'Camera permission not granted' );
    }
  };

  return (
    <View style={ styles.viewContainer }>
      <View style={ styles.imagePreview }>
        {
          !pickedImage
            ? <Text>No image picked yet.</Text>
            : <Image
              style={ styles.image }
              source={ { uri: pickedImage } }
            />
        }
      </View>
      <Button
        title='Take Image'
        color={ Colors.primary }
        onPress={ imagePickerHandler }
      />
    </View>
  );
};

const styles = StyleSheet.create( {
  viewContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
} );

export default ImagePicker;
