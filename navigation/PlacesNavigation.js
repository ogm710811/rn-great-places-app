import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlaceListScreen from "../screens/PlaceListScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { createAppContainer } from "react-navigation";

const { createStackNavigator } = require( "react-navigation-stack" );

const PlacesNavigation = createStackNavigator({
  Places: PlaceListScreen,
  PlaceDetail: PlaceDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary
  }
})

export default createAppContainer(PlacesNavigation)
