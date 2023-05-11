const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    habit: [{ ref: "Habit", type: Schema.Types.ObjectId }],
    email: {
      type: String,
      required: true,

      lowercase: true,
      trim: true,
    },
    userImage : {
      type: String,
    },
   
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
