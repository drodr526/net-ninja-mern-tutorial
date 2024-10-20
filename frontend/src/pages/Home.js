import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () =>{
    const {workouts, dispatch} = useWorkoutsContext() //lets you use context surrounding entire app

    useEffect(()=>{
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts")
            const json = await response.json()

            if(response.ok){ //if response.ok is true set workouts to what was retrieved
                dispatch({type: "SET_WORKOUTS", payload: json})
            }
        }

        fetchWorkouts();
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home;