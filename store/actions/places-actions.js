import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from "../../helpers/db";
import ENV from "../../env";


export const ADD_PLACE = 'Add Place';
export const LOAD_PLACES = 'Load Places';


export const addPlace = ( title, imageUri, location ) => async ( dispatch ) => {
  console.log( 'addPlace ::', title, imageUri, location )
  // getting address from google maps geocoding api
  // const response = await fetch( `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${ ENV.googleApiKey }` )
  // if ( !response.ok ) {
  //   throw new Error( 'Something went wrong!' );
  // }
  //
  // const resData = await response.json;
  // if ( resData.results ) {
  //   throw new Error( 'Something went wrong!' );
  // }
  // const address = resData.results[0].formatted_address;
  const address = '279 Bedford Ave, Brooklyn, NY 11211, USA';

  // setting directory path for image
  const fileName = imageUri.split( '/' ).pop();
  const dirPath = FileSystem.documentDirectory + fileName;
  // move the file to the directory
  try {
    await FileSystem.moveAsync( {
      from: imageUri,
      to: dirPath
    } )
    const dbResult = await insertPlace( title, dirPath, address, location.lat, location.lng );
    console.log( 'dbResult :: insertPlace ::', dbResult )
    dispatch( {
      type: ADD_PLACE, payload: {
        id: dbResult.insertId,
        title: title,
        imageUri: dirPath,
        address: address,
        coords: {
          lat: location.lat,
          lng: location.lng
        }
      }
    } );
  } catch ( e ) {
    throw e;
  }
};

export const loadPlaces = () => async ( dispatch ) => {
  try {
    const dbResult = await fetchPlaces();
    console.log( 'dbResult :: fetchPlaces ::', dbResult )
    dispatch( { type: LOAD_PLACES, payload: dbResult.rows._array } );
  } catch ( e ) {
    throw e;
  }

};

