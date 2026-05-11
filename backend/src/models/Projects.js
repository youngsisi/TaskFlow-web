const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    value: {
        type: Number,
        required: true
    },

    deadline: {
        type: Date,
        required: false
    },

    status: {
        type: String,
        required: true,
        enum: ['actif', 'en pause', 'archivé'],
        default: 'actif'
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true });

projectSchema.pre('deleteOne', { document: true, query: false }, async function () {
    await Task.deleteMany({ project: this._id });
  }
);

module.exports = mongoose.model('Project', projectSchema);