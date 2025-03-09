import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot be more than 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      ]
    },
    img: {
      type: String,
      default: null
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"]
    },
    age: {
      type: Number,
      min: [13, "You must be at least 13 years old"],
      max: [120, "Please enter a valid age"]
    }
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

// Add index on email for faster lookups and unique constraint
UserSchema.index({ email: 1 }, { unique: true });

// Pre-save middleware to trim strings
UserSchema.pre('save', function(next) {
  if (this.name) this.name = this.name.trim();
  if (this.email) this.email = this.email.trim().toLowerCase();
  next();
});

// Add error handling for duplicate key error
UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email already exists'));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

// Ensure indexes are created
User.createIndexes().catch(err => {
  console.error('Error creating indexes:', err);
});

export default User;
