import React, { useState } from "react";
import axios from "axios";

const CreateUser = (props) => {
    const [usernameText, setUsernameText] = useState("");

    function handleChange(event){
        const newValue = event.target.value;
        setUsernameText(newValue);
    }

    function onSubmit(event){
        event.preventDefault();

        const user = {
            username: usernameText
        }

        axios.post("http://localhost:5000/user", user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        console.log(user);

        setUsernameText("");
    }


    return (
        <div>
            <form onSubmit={onSubmit} method="POST">
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" 
                    required 
                    className="form-control" 
                    value={usernameText} 
                    onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary"></input>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;