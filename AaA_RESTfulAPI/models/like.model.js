const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'like',
        required: false
    },
    answer_id: {
        type: Schema.Types.ObjectId,
        ref: 'answer',
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('like', LikeSchema);

