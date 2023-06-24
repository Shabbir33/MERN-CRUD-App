import React, { useEffect, useState } from "react";
import axios from "axios"
import Exercise from "./Exercise";

const ExercisesList = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/exercise/")
            .then(response => {
                setExercises(response.data)
            })
            .catch(err => console.log(err));
    })

    const deleteExercise = (id) => {
        axios.delete("http://localhost:5000/exercise/" + id)
            .then(res => console.log(res.data));
        
        setExercises(exercises.filter(el => el._id !== id))
    }

    const exerciseList = () => {
        return exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id} />
        })
    }

    return (
        <div>
            <h3>Logged Exercise</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    );
}

export default ExercisesList;