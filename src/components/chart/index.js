import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getValue } from "../../utils/common";

export default function Chart() {
  const [showGraph, setShowGraph] = useState(false);
  const [value, setValue] = useState();

  const {goal, year, stateName} = useSelector(state => state.sdgOpt);
  const state= stateName || new URLSearchParams(window.location.search).get("state"); //if user uses link instead of map for a state or refreshes
  useEffect(() =>{
    if(year && goal && state){
    const val = getValue(year, goal, state)
    console.log("chart",value);
    val ? setShowGraph(true) : setShowGraph(false);
    setValue(val);
    }},
  [goal, year, state, value])
  

  return <div className="chart">Chart Here (Bar Chart preferred) {value}</div>;
}
