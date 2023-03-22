const db = require("../database/db");
const workoutModel = require("../database/models/workoutSchema");

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await workoutModel.find({});
    res.status(200).send({ status: "OK", data: workouts });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

const getOneWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await workoutModel.findById(id);

    if (!workout) {
      res.status(404).send({
        status: "FAILED",
        data: { error: `Workout with id ${id} not found` },
      });
      return;
    }

    res.status(200).send({ status: "OK", data: workout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewWorkout = async (req, res) => {
  try {
    const { name, mode, equipment, exercises, trainerTips } = req.body;

    // Validar si todos los campos requeridos se proporcionaron en la solicitud
    if (!name || !mode || !equipment || !exercises || !trainerTips) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Crear una nueva instancia de Workout
    const newWorkout = new workoutModel({
      name,
      mode,
      equipment,
      exercises,
      trainerTips,
    });

    // Guardar el nuevo workout en la base de datos
    const savedWorkout = await newWorkout.save();

    // Devolver una respuesta con el nuevo workout creado
    res.status(201).json({ success: true, workout: savedWorkout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOneWorkout = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedWorkout = await workoutModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedWorkout) {
      return res.status(404).send({
        status: "FAILED",
        data: {
          error: `Workout with id ${id} not found`,
        },
      });
    }

    res.status(200).send({
      status: "OK",
      data: updatedWorkout,
    });
  } catch (error) {
    res.status(500).send({
      status: "FAILED",
      data: {
        error: error.message || "Error updating the workout",
      },
    });
  }
};

const deleteOneWorkout = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const deletedWorkout = await workoutModel.findByIdAndDelete(workoutId);

    if (!deletedWorkout) {
      res
        .status(404)
        .send({ status: "FAILED", data: { error: "Workout not found" } });
      return;
    }

    res.status(200).send({ status: "OK", data: deletedWorkout });
  } catch (error) {
    res.status(500).send({ status: "FAILED", data: { error: error.message } });
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
