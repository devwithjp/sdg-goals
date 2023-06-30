import React from "react";
import { GOALS_LIST } from "../../config";
import { useDispatch } from "react-redux";
import { setGoal } from "../../store/sdgSlice";

export default function Goal() {
  const dispatch = useDispatch()

  const goalSelectionHandler = (e) => {
    dispatch(setGoal(e.target.value.split(':')[0]));
  }
  return (
    <div className="goal">
      <select onChange={goalSelectionHandler}>
        <option>Select Goal</option>
        {GOALS_LIST.map((goal) => (
          <option>{goal}</option>
        ))}
      </select>
    </div>
  );
}
