import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import ENV from '../env';

const MapPreview = ( { children, style, location, onPressMapPreview } ) => {
  let imagePreviewMapStaticAPI;

  if ( location ) {
    imagePreviewMapStaticAPI = `https://maps.googleapis.com/maps/api/staticmap?center=${
      location.lat
    },${
      location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      location.lat
    },${
      location.lng }&key=${ ENV.googleApiKey }`;
  }


  return (
    <TouchableOpacity
      style={ { ...styles.mapPreviewStyle, ...style } }
      onPress={ onPressMapPreview }
    >
      {
        location
          ? <Image
            style={ styles.mapImage }
            source={ { uri: imagePreviewMapStaticAPI } }
          />
          : children
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create( {
  mapPreviewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
} );

export default MapPreview;
