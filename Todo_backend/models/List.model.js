const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a list name'],
    trim: true,
    maxlength: [50, 'List name cannot be more than 50 characters']
  },
  color: {
    type: String,
    default: '#8B5CF6'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  taskCount: {
    type: Number,
    default: 0
  }
});

// Update task count when tasks are added/removed
listSchema.statics.updateTaskCount = async function (listId) {
  const Task = mongoose.model('Task');
  const count = await Task.countDocuments({ list: listId });

  await this.findByIdAndUpdate(listId, { taskCount: count });
};

module.exports = mongoose.model('List', listSchema);