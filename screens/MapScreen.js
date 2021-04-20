import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = ( { navigation } ) => {
  const currentLocation = navigation.getParam( 'currentLocation' );
  const readonly = navigation.getParam( 'readonly' );
  const [ selectedLocation, setSelectedLocation ] = useState( currentLocation );
  let markerCoordinates;
  const mapRegion = {
    latitude: currentLocation ? currentLocation.lat : 30.2664,
    longitude: currentLocation ? currentLocation.lng : -81.7939,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = ( event ) => {
    if ( readonly ) {
      return;
    }
    setSelectedLocation( {
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    } )
  };

  if ( selectedLocation ) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  const savePickedLocationHandler = useCallback( () => {
    if ( !selectedLocation ) {
      // could display an alert here
      return;
    }
    navigation.navigate(
      'NewPlace',
      { savePickedLocation: selectedLocation }
    );
  }, [ selectedLocation ] );

  useEffect( () => {
    navigation.setParams(
      { savePickedLocation: savePickedLocationHandler }
    )
  }, [ savePickedLocationHandler ] )

  return (
    <MapView
      style={ styles.mapStyle }
      region={ mapRegion }
      onPress={ selectLocationHandler }
    >
      {
        markerCoordinates
        && <Marker
          title='Picked Location'
          coordinate={ markerCoordinates }
        ></Marker>
      }
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const safePickedLocationFn = navData.navigation.getParam( 'savePickedLocation' );
  const readonly = navData.navigation.getParam( 'readonly' );
  if ( readonly ) {
    return {};
  }

  return {
    headerRight: () =>
      <TouchableOpacity
        style={ styles.headerRightStyle }
        onPress={ safePickedLocationFn }
      >
        <Text
          style={ styles.headerRightTextStyle }
        >
          Save
        </Text>
      </TouchableOpacity>
  }
}
;

const styles = StyleSheet.create(
  {
    mapStyle: {
      flex: 1
    },
    headerRightStyle: {
      marginHorizontal: 20
    },
    headerRightTextStyle: {
      fontSize: 16,
      color: Platform.OS === 'android'
        ? '#fff'
        : Colors.primary
    }
  }
);

export default MapScreen;
