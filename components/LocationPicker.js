import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LocationOptions } from "expo-location/src/Location.types";
import MapPreview from "./MapPreview";

const LocationPicker = ( { navigation, onPickedLocation } ) => {
  const [ isFetching, setIsFetching ] = useState( false );
  const [ pickedLocation, setPickedLocation ] = useState( null );
  const locationOptions: LocationOptions = {};
  const mapSavePickedLocation = navigation.getParam( 'savePickedLocation' );

  useEffect( () => {
    if ( mapSavePickedLocation ) {
      setPickedLocation( mapSavePickedLocation );
      onPickedLocation( mapSavePickedLocation );
    }
  }, [ mapSavePickedLocation, onPickedLocation ] );

  const getPlaceLocationHandler = async () => {
    const { status } = await Permissions.askAsync( Permissions.LOCATION );
    if ( status === 'granted' ) {
      try {
        setIsFetching( true );
        const location = await Location.getCurrentPositionAsync( locationOptions );
        setPickedLocation( {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        } );
        onPickedLocation( {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        } );
      } catch ( e ) {
        Alert.alert(
          'Could not fetch location!',
          'Please, try again later or pick a location from the map.',
          [ { text: 'Okay' } ]
        )
        throw new Error( 'Location failed' );
      }
    } else {
      Alert.alert(
        'Insufficient permission!',
        'You need to grant location permissions to use this app.',
        [ { text: 'Okay' } ]
      )
      throw new Error( 'Location permission not granted' );
    }
    setIsFetching( false );
  }

  const pickPlaceOnMapHandler = () => {
    navigation.navigate( 'Map' );
  }

  return (
    <View style={ styles.containerStyle }>
      <MapPreview
        style={ styles.mapPreviewStyle }
        location={ pickedLocation }
        onPressMapPreview={ pickPlaceOnMapHandler }
      >
        {
          isFetching
            ? <ActivityIndicator
              size='large'
              color={ Colors.primary }
            />
            : <Text>No location yet!</Text>
        }
      </MapPreview>
      <View style={ styles.ctaStyle }>
        <Button
          title='Get Place Location'
          color={ Colors.primary }
          onPress={ getPlaceLocationHandler }
        />
        <Button
          title='Pick Place on Map'
          color={ Colors.primary }
          onPress={ pickPlaceOnMapHandler }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  containerStyle: {
    alignItems: 'center',
    marginBottom: 15
  },
  mapPreviewStyle: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  ctaStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
} );

export default LocationPicker;
