import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class GoogleMap extends Component {
  render() {
    const mapStyles = {
      width: '70%',
      height: '65%'
    };

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat:18.967760, // Default latitude
          lng:72.831120// Default longitude
        }}
      >
        <Marker position={{ lat:18.967760, lng: 72.831120}} />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCN45VTnXCiZTVKDC7CG2ySoqPiefz9jLo'
  })(GoogleMap);
  

