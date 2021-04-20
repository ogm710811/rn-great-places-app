import React from 'react';
import PlacesNavigation from "./navigation/PlacesNavigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';
import placesReducer from './store/reducers/places-reducer';
import { init } from './helpers/db';

init()
  .then( () => {
    console.log( 'Initialized database successful' );
  } ).catch( err => {
  console.log( 'Initialized database failed' );
  console.log( err );
} );

const rootReducer = combineReducers( {
  places: placesReducer
} );

const store = createStore( rootReducer, applyMiddleware( ReduxThunk ) );

export default () => {
  return (
    <Provider store={ store }>
      <PlacesNavigation/>
    </Provider>
  )
}
