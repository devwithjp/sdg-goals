import * as React from 'react';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Map, {Marker,Popup, Layer, Source} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import data from '../../data/indian-states2.geojson';
import { useSelector, useDispatch } from 'react-redux';

import {statesLayer, highlightLayer} from './mapstyle';


import 'maplibre-gl/dist/maplibre-gl.css';
import { setStateName } from '../../store/sdgSlice';
import { getColor, getValue } from '../../utils/common';

export default function Root() {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const {goal, year, stateName} = useSelector(state => state.sdgOpt);
  const [hoverState, setHoverState] = useState('','');
  const [sdgVal, setSdgVal] = useState();
  const state= stateName || new URLSearchParams(window.location.search).get("state");

  useEffect(() =>{
    if(year && goal && state){
      const val = getValue(year, goal, state);
      setSdgVal(val);
    }},
  [goal, year, state])
  
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
    // const state = e?.features[0]?.properties?.NAME_1;
    // const lngLat = e?.lngLat;
    // const {lat,lng} = lngLat;
    // console.log(hoverState)
    // setState({state , lat, lng})
    if(hoverState?.state){
      const state = hoverState.state.replace(/\s+/g, '-').toLowerCase();
      window.history?.pushState( {},'',`/?state=${state}`);
      dispatch(setStateName(state));
    }
  }

  const onHoverHandler = (e) => {
    const stateHov = e?.features[0]?.properties?.NAME_1;
    const lngLat = e?.lngLat;
    const {lat,lng} = lngLat;
    const value = JSON.parse(e?.features[0]?.properties?.sdgData)?.[year]?.[goal];
    setHoverState({stateHov , lat, lng, value});
  }

  const {value, stateHov} = hoverState;
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
      interactiveLayerIds={['states']}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Source type="geojson" data={data}>
        <Layer  {...statesLayer(year,goal)} />
      </Source>
      {stateHov && <Popup
            longitude={hoverState?.lng}
            latitude={hoverState?.lat}
            offset={[0, -10]}
            closeButton={false}
            style={{padding:'20px'}}
            closeOnClick={false}
          >
            {stateHov}
            {value && <div id='hoveredVal' style={{backgroundColor:getColor(value)}}>{value}</div>}
      </Popup>}
    </Map>
  );
}