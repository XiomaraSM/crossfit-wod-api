const mongoose = require("mongoose")

const workoutSchema = mongoose.Schema({
  name: String,
  mode: String,
  equipment: Array,
  exercises: Array,
  trainerTips: Array
    })

    module.exports = mongoose.model('workout', workoutSchema)
   