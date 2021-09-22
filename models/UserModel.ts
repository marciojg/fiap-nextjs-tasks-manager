import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name:     { type: String, required: [true, '* Campo obrigatório!'] },
  email:    { type: String, required: [true, '* Campo obrigatório!'] },
  password: { type: String, required: [true, '* Campo obrigatório!'] },
})

export const UserModel = mongoose.models.users || mongoose.model('users', UserSchema);
