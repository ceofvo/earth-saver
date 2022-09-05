import React from 'react';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_API_KEY } from "../app-config/accessData";
import { ThemeColor } from "../app-config/theme";

const PickUpLocation = ({onSelectedLocation}) => {

    function getUserLocation(det) {
        onSelectedLocation(det)
    }

  return (
    <GooglePlacesAutocomplete
      placeholder="e.g Kasumu Street, Lagos"
      fetchDetails={true}
      onPress={(data, details = null) => {
        getUserLocation(details.formatted_address)
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: "en",
      }}
      styles={{
        textInput: {
          height: 48,
          color: ThemeColor.textInput,
          fontSize: 14,
          textAlign: 'center',
          borderRadius: 35,
          backgroundColor: ThemeColor.lightBg,
        },
      }}
    />
  );
};

export default PickUpLocation;

