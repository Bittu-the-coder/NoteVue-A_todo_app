const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
    maxlength: [100, 'Task title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  dueDate: Date,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  completed: {
    type: Boolean,
    default: false
  },
  list: {
    type: mongoose.Schema.ObjectId,
    ref: 'List'
  },
  tags: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update list task count when task is saved
taskSchema.post('save', async function (doc) {
  const List = mongoose.model('List');
  if (doc.list) {
    await List.updateTaskCount(doc.list);
  }
});

// Update list task count when task is removed
taskSchema.post('remove', async function (doc) {
  const List = mongoose.model('List');
  if (doc.list) {
    await List.updateTaskCount(doc.list);
  }
});

module.exports = mongoose.model('Task', taskSchema);