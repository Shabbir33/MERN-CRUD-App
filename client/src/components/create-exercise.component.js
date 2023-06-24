import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const CreateExercise = () => {

    const [exercise, setExercise] = useState({
        username: "", 
        description: "",
        duration: 0,
        date: new Date(),
        users:[]
    })

    useEffect(() => {
        axios.get("http://localhost:5000/user/")
            .then(response => {
                if(response.data.length > 0){
                    setExercise((prevValue) => {
                        return ({
                        ...prevValue,
                            users: response.data.map(user => user.username),
                            // username: response.data[0].username
                        })
                    })
                }
            })
    })


    function handleChange(event){
        const {name, value} = event.target;
        setExercise((prevValue) => {
            return ({
                ...prevValue,
                [name]: value
            });
        });
    }

    function onSubmit(event){
        event.preventDefault();

        console.log(exercise);

        setExercise({
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users:["test user1", "test user2"]
        });

        axios.post("http://localhost:5000/exercise", exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        // window.location = "/";
    }

    return (
        <div>
            <h3>Create Exercise Log</h3>
            <form onSubmit={onSubmit} method="POST">
                <div className="form-group">
                    <label>Username: </label>
                    <select name="username"
                        required
                        value={exercise.username}
                        onChange={handleChange}>
                            {
                                exercise.users.map((user) => {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>
                                })
                            }
                    </select>
                    {/* <input 
                    name="username"
                    type="text" 
                    required 
                    className="form-control" 
                    value={exercise.username} 
                    onChange={handleChange} 
                    /> */}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input name="description"
                        type="text" 
                        required
                        className="form-control"
                        value={exercise.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration</label>
                    <input name="duration"
                        type="text" 
                        required
                        className="form-control"
                        value={exercise.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <div>
                        <DatePicker
                            name="date"
                            selected={exercise.date}
                            value={exercise.date}
                            onChange={(value) => {
                                setExercise((prevValue) => {
                                    return({
                                        ...prevValue,
                                        date: value
                                    })
                                })
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary"></input>
                </div>
            </form>
        </div>
    );
}

export default CreateExercise;