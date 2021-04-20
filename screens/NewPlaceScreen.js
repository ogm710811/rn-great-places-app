import React, { useCallback, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/actions/places-actions';
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = ( { navigation } ) => {
  const [ titleValue, setTitleValue ] = useState( '' );
  const [ selectedImage, setSelectedImage ] = useState( null );
  const [ selectedLocation, setSelectedLocation ] = useState( null );

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue( text );
  };

  const onSelectedImageHandler = ( pickedImage ) => {
    console.log( 'onSelectedImageHandler ::', pickedImage )
    setSelectedImage( pickedImage );
  }

  const onSelectedLocationHandler = useCallback( ( pickedLocation ) => {
    console.log( 'onSelectedLocationHandler ::', pickedLocation )
    setSelectedLocation( pickedLocation );
  }, [] );

  const savePlaceHandler = () => {
    dispatch( placesActions.addPlace( titleValue, selectedImage, selectedLocation ) );
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={ styles.form }>
        <Text style={ styles.label }>Title</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={ titleChangeHandler }
          value={ titleValue }
        />
        <ImagePicker
          onPickedImage={ onSelectedImageHandler }
        />
        <LocationPicker
          onPickedLocation={ onSelectedLocationHandler }
          navigation={ navigation }
        />
        <Button
          title="Save Place"
          color={ Colors.primary }
          onPress={ savePlaceHandler }
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create( {
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
} );

export default NewPlaceScreen;
