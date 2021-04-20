import Place from "../../models/place";
import { ADD_PLACE, LOAD_PLACES } from "../actions/places-actions";

const initialState = {
  places: []
};

export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.imageUri,
        action.payload.address,
        action.payload.coords.lat,
        action.payload.coords.lng
      )
      return {
        places: state.places.concat( newPlace )
      };
    case LOAD_PLACES:
      return {
        places: action.payload
          .map(
            pl => new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
          )
      }

  }
  return state;
}
