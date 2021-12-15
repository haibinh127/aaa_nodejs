const BookmarkModel = require('../models/bookmark.model');

const create_bookmark = async (req, res) => {

    const newBookmark = new BookmarkModel();
    newBookmark.user_id = req.body.user_id;
    newBookmark.question_id = req.body.question_id;

    const questionBookmarked = await BookmarkModel.findOne({
        user_id: req.body.user_id,
        question_id: req.body.question_id
    })
    if (questionBookmarked) return res.status(404).send("You already bookmark this question");

    try {
        const bookmark = await newBookmark.save();
        res.send(bookmark);
    } catch (error) {
        res.status(400).send(error);
    }
}

const get_bookmarked_question = async (req, res) => {
    await BookmarkModel.find({ user_id: req.params.id })
        .populate({
            path: 'question_id',
            populate: {
                path: 'user_id'
            }
        })
        .exec((err, question) => {
            if (err) {
                res.send(err);
            } else {
                res.send(question);
            }
        })
}

const delete_bookmarked_question = async (req, res) => {

    const bookmarkQuestion = await BookmarkModel.findOne({ _id: req.body.id });
    if (bookmarkQuestion.user_id != req.body.user_id)
        return res.status(404).send("You still not bm this question");

    await BookmarkModel.findOneAndRemove({ _id: req.body.id })
        .exec((err, deletebookmark) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Delete bookmark successful !");
            }
        })

}


module.exports = {
    create_bookmark,
    get_bookmarked_question,
    delete_bookmarked_question
}