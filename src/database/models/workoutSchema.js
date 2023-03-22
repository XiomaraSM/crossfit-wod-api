const {Schema, model} =require ('mongoose') //destructuring 
const workoutSchema = new Schema({
      name: String,
      mode: String,
      equipment: Array,
      exercises: Array,
      trainerTips: Array
    })

    module.exports = model('workout', workoutSchema)
   