import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  name:                { type: String, required: [true, '* Campo obrigatório!'] },
  userID:              { type: String, required: [true, '* Campo obrigatório!'] },
  finishPrevisionDate: { type: Date, required: [true, '* Campo obrigatório!']},
  finishDate:          { type: Date, required: [true, '* Campo obrigatório!']},
})

export const TaskModel = mongoose.models.tasks || mongoose.model('tasks', TaskSchema);
