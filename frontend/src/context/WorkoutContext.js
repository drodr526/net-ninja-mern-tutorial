import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

//this is like useState, except you use a switch (or other logic) to manage it instead of constantly using setState
export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case "SET_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts] //add new workout, and spread all previous workouts
            }
        default: 
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, { workouts: null }) //use workoutsReducer function, set workouts to null

    return (
        //pass state and dispatch function as an object
        <WorkoutsContext.Provider value={{...state, dispatch}}>  
            { children }
        </WorkoutsContext.Provider>
    )
}

export default WorkoutsContext