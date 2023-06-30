import React from "react";
import { YEARS } from "../../config";
import { setYear } from "../../store/sdgSlice";
import { useDispatch } from "react-redux";

export default function Year() {
  const dispatch = useDispatch();

  const yearSelectionHandler = (e) => {
    dispatch(setYear(e.target.value));
  }
  return (
    <div className="goal">
      <select onChange={yearSelectionHandler}>
        <option>Select Year</option>
        {YEARS.map((goal) => (
          <option>{goal}</option>
        ))}
      </select>
    </div>
  );
}
