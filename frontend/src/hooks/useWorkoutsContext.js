import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react"

//grabs context wrapping entire app and lets you use it
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context){
        throw Error("useWorkoutsContext must be used inside a WorkoutsContextProvider");
    }

    return context
}