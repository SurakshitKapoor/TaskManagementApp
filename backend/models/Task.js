
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type:String,
        trim:true,
        maxLength: 100
    },
    createdAt: {
        type:Date,
        default:Date.now()
    },
    updatedAt: {
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Task', taskSchema);