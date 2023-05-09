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
      required: true,
    },

    Tasks1: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },

    Tasks2: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },

    Time: {
      type: String,
      required: true,
    },

    Duration: {
      type: Number,
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
