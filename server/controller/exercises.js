const Exercise = require("../models/exercise");

const getExercises = (req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json("Error: " + err));        
}

const getExercise = (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error : ' + err));
}

const addExercise = (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);

    const exercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    exercise.save()
        .then(() => res.json("Exercise added!"))
        .catch(err => res.status(400).json("Error: " + err));        
}

const updateExercise = (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json("Exercise updated!"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

const deleteExercise = (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error : ' + err));
}

module.exports = {getExercises, getExercise, addExercise, updateExercise, deleteExercise};