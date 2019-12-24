import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '50%', 
    margin: "auto"
  };

class MapsView extends React.Component{

    state = {currentLat : 35.71, currentLng : 51.40}

    handleClick(event){
        this.setState({currentLat : event.latLng.lat(), currentLng : event.latLng.lng()})
    }

    render() {
        return (
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            chi={(e) => this.handleClick(e)}
            initialCenter={{
             lat: 35.71,
             lng: 51.40
            }}
          />
        );
      }
    }
    
    export default GoogleApiWrapper({
      apiKey: "AIzaSyDkPGbnx3YHvEb3Sj_AYDi6Me1nJZH82eQ"
    })(MapsView);