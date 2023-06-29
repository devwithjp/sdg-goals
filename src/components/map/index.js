import * as React from 'react';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Map, {Marker,Popup, Layer, Source} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import data from '../../data/indian-states.geojson';
import {dataLayer} from './mapstyle.js';

import {statesLayer, highlightLayer} from './mapstyle';


import 'maplibre-gl/dist/maplibre-gl.css';

export default function Root() {
  const mapRef = useRef();
  

  const [state, setState] = useState(null);
  const [hoverState, setHoverState] = useState(null)
  // const onClick = useCallback(event => {
   
  // }, []);



  const settings = {
    scrollZoom: false,
    boxZoom: false,
    dragRotate: false,
    dragPan: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    touchPitch: false,

  }


  const onClickHandler = (e) => {
    const state = e?.features[0]?.properties?.NAME_1;
    const lngLat = e?.lngLat;
    const {lat,lng} = lngLat;
    // console.log(state,lat,lng)
    setState({state , lat, lng})
  }

  const onHoverHandler = (e) => {
    const state = e?.features[0]?.properties?.NAME_1;
    const lngLat = e?.lngLat;
    const {lat,lng} = lngLat;
    console.log(state,lat,lng)
    setHoverState({state , lat, lng})
  }

  return (
    <Map
      initialViewState={{
        latitude: 23,
        longitude: 82,
        zoom: 4
      }}
      ref={mapRef}
      mapLib={maplibregl}
      onMouseMove={onHoverHandler}
      {...settings}
      onClick={onClickHandler}
      style={{width: '100%', height: '100vh'}}
      interactiveLayerIds={['states','states-highlighted']}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Source type="geojson" data={data}>
        <Layer  {...statesLayer} />
      </Source>
      {hoverState?.state && <Popup
            longitude={hoverState?.lng}
            latitude={hoverState?.lat}
            offset={[0, -10]}
            closeButton={false}
            style={{padding:'20px'}}
          >
            {hoverState.state}
      </Popup>}
    </Map>
  );
}