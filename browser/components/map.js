/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
 
const containerStyle = {
  height: '800px'
};
 
const center = {
  lat: -3.745,
  lng: -38.523
};
 
function Map() {
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <section
      css={css`
        width: calc(100% - 411px);
        position: fixed;
        right: 0;
      `}
    >
      <LoadScript
        googleMapsApiKey="AIzaSyBNr4997B-Rxb-fjbIIJ_XPM-azp7mo-M8"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
      </LoadScript>
    </section>
  )
}
 
export default React.memo(Map)