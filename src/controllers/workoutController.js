const express = require ("express"); 
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
  try {
    const workout = await workoutModel.findOne(req.params.id);
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).send("error encontrando workout")
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

const updateOneWorkout = async (req, res) =>{
  try{
    const workout = await workoutModel.findOneAndUpdate(
      {workoutId: req.params.id}, req.body, {new:true}
    );
    res.json(workout);
  }catch(err){
    console.log(err);
    res.status(500).send("error al actualizar workout")
  }
};

const deleteOneWorkout = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const deletedWorkout = await workoutModel.findByIdAndDelete(workoutId);

    if (!deletedWorkout) {
      res
        .status(404)
        .send({ status: "FAILED", data: { error: "Workout not found" } });
      return;
    }

    res.status(200).send({ status: "OK", data: "Workout deleted" });
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
