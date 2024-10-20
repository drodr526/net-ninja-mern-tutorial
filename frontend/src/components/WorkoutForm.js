import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    //these are all things that are going to be updated on the page, so you have to use a useState hook
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //put user input in an object 
        const workout = { title, load, reps };

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout), //turn object into a JSON format and send to backend
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            //set all states to blank after creating the new workout in backend
            setTitle("");
            setLoad("");
            setReps("");
            setError(null)
            console.log("new workout added: ", json)
            /*the backend returns a json with the workout we just created, 
            so just pass the json to the context to add it to the UI instantly*/
            dispatch({ type: "CREATE_WORKOUT", payload: json })
        }
    }

    return (
        <form action="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;