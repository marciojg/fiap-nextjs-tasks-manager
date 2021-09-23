import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  name:                { type: String, required: [true, '* Campo obrigatório!'] },
  userId:              { type: String, required: [true, '* Campo obrigatório!'] },
  finishPrevisionDate: { type: Date,   required: [true, '* Campo obrigatório!']},
  finishDate:          { type: Date },
})

export const TaskModel = mongoose.models.tasks || mongoose.model('tasks', TaskSchema);
