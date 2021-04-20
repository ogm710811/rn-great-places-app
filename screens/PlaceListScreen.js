import React, { useEffect } from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as placesActions from '../store/actions/places-actions';

import CustomHeaderButton from '../components/CustomHeaderButton';
import { useDispatch, useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = ( { navigation } ) => {
  const places = useSelector( state => state.places.places );
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( placesActions.loadPlaces() )
  }, [ dispatch ] );

  return (
    <FlatList
      data={ places }
      keyExtractor={ item => item.id }
      renderItem={ itemData =>
        < PlaceItem
          image={ itemData.item.imageUri }
          title={ itemData.item.title }
          address={ itemData.item.address }
          onSelect={ () => navigation.navigate( 'PlaceDetail', {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id
          } ) }
        />
      }
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
        <Item
          title="Add Place"
          iconName={ Platform.OS === 'android' ? 'md-add' : 'ios-add' }
          onPress={ () => {
            navData.navigation.navigate( 'NewPlace' );
          } }
        />
      </HeaderButtons>
  };
};

const styles = StyleSheet.create( {} );

export default PlacesListScreen;
