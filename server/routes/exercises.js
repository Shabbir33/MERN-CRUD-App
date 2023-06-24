const router = require("express").Router();
const {getExercises, getExercise, addExercise, updateExercise, deleteExercise} = require("../controller/exercises");

router.route("/").get(getExercises).post(addExercise);

router.route("/:id").get(getExercise).patch(updateExercise).delete(deleteExercise);

module.exports = router;