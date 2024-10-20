import { useEffect, useState } from "react";

import WorkoutDetails from "../components/WorkoutDetails";

const Home = () =>{
    const [workouts, setWorkouts] = useState();

    useEffect(()=>{
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts")
            const json = await response.json()

            if(response.ok){ //if response.ok is true set workouts to what was retrieved
                setWorkouts(json);
                console.log(json);
            }
        }

        fetchWorkouts();
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
        </div>
    )
}

export default Home;