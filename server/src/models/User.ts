import mongoose from 'mongoose';

const string = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    resetCode: { type: string },
    resetCodeExpires: { type: Date },
  },
  { timestamps: true }
);


const User = mongoose.model('User', userSchema);

export default User;
