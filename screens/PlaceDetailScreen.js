import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapPreview from "../components/MapPreview";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const PlaceDetailScreen = ( { navigation } ) => {
  const placeId = navigation.getParam( 'placeId' );
  const selectedPlace = useSelector( state =>
    state.places.places.find( place => place.id === placeId
    ) );
  const selectedLocation = {
    lat: selectedPlace.lat,
    lng: selectedPlace.lng
  };
  const displayMapHandler = () => {
    console.log( 'map clicked' )
    navigation.navigate( 'Map', {
      readonly: true,
      currentLocation: selectedLocation
    } );
  };

  return (
    <ScrollView
      contentContainerStyle={ { alignItems: 'center' } }
    >
      < Image
        style={ styles.imageStyle }
        source={ { uri: selectedPlace.imageUri } }
      />
      <View style={ styles.viewContainerStyle }>
        <View style={ styles.viewContainerAddressStyle }>
          <Text style={ styles.addressStyle }>{ selectedPlace.address }</Text>
        </View>
        <MapPreview
          style={ styles.mapPreviewStyle }
          location={ selectedLocation }
          onPressMapPreview={ displayMapHandler }
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam( 'placeTitle' )
  }
};

const styles = StyleSheet.create( {
  imageStyle: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  viewContainerStyle: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  viewContainerAddressStyle: {
    padding: 20
  },
  addressStyle: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreviewStyle: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
} );

export default PlaceDetailScreen;
