const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'question'
    }
}, { timestamps: true })

module.exports = mongoose.model('bookmark', BookmarkSchema);