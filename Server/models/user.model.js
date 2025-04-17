import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String },
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, minlength: 10, maxlength: 10 },
  password: { type: String, required: true, minlength: 8, select: false },
});

const fileSchema = new mongoose.Schema({
  name: String,
  data: String,
  contentType: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generate JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const User = mongoose.model('User', userSchema);
const File = mongoose.model('File', fileSchema)
export default User;
export {File}
