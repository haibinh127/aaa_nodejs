const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    question_content: {
        type: String,
        required: true
    },
    hashtags: [String],
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)

module.exports = mongoose.model('question', QuestionSchema);