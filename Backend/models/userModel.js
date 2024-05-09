const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please tell us your Username"],
    },
    firstName: {
      type: String,
    //   required: [true, "please tell us your First Name"],
    },
    lastName: {
      type: String,
    //   required: [true, "please tell us your Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please tell us your Email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid Email address.."],
    },
    password: {
      type: String,
      required: [true, "Please provide a valid Password.."],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your Password.."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    images: [String],
    passwordChangedAt: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000.1
    );
    return JWTTimestamp < changedTimeStamp;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;