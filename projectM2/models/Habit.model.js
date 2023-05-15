const { Schema, model } = require("mongoose");

const HabitSchema = new Schema(
  {
    Habit: {
      type: String,
      trim: true,
      required: true,
    },

    Tasks: {
      type: String,
      lowercase: true,
      trim: true,
    },

    Tasks1: {
      type: String,
      lowercase: true,
      trim: true,
    },

    Tasks2: {
      type: String,
      lowercase: true,
      trim: true,
    },

    Time: {
      type: String,
      required: true,
    },
    Count:{
      type: String,

    },

    Duration: {
      type: String,
      required: true,
    },
    Goal: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Habit = model("Habit", HabitSchema);
module.exports = Habit;
