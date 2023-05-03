const { Schema, model} = require("mongoose");


const HabitSchema = new Schema(
    {
      Habit: {
        type: String,
        trim: true,
        required: true,
        
      },
      Tasks: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      Time: {
        type: String,
        required: true,
        
      },
      Duration: {
        type: Number,
        
      

      },
      Goal: {
        type: String,
        required: true,

      },
      
    },
    {
      timestamps: true
    }
  );
  

const Habit = model("Habit", HabitSchema);
module.exports = Habit;