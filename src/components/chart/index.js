import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStatesValue, getValue } from "../../utils/common";
import BarGraph from './bar-graph'

export default function Chart() {
  const [statesValue, setStatesValue] = useState();

  const {goal, year, stateName} = useSelector(state => state.sdgOpt);
  const state= stateName || new URLSearchParams(window.location.search).get("state"); //if user uses link instead of map for a state or refreshes
  
  
  useEffect(() =>{
    if(year && goal && state){
      const value = getStatesValue(year, goal)
      setStatesValue(value);
    }},
  [goal, year, state])
  

  return( 
    <div className="chart">
      {statesValue && <BarGraph value={statesValue}/>}
    </div>
  );
}
