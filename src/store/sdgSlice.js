
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  goal: 'SDG Index Score',
  year: '2018',
  stateName:''
}

export const sdgSlice = createSlice({
  name: 'sdgOpt',
  initialState,
  reducers: {
    setGoal: (state,action)=> {
        state.goal = action.payload;


    },
    setYear: (state, action) =>{
        state.year = action.payload;

    },
    setStateName: (state, action) =>{
        state.stateName = action.payload;
    }

  },
})

export const { setGoal, setYear, setStateName } = sdgSlice.actions
export default sdgSlice.reducer