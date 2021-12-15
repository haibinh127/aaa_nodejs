const QuestionModel = require('../models/question.model');
const LikeModel = require('../models/like.model');

const create_question = async (req, res) => {

    const newQuestion = new QuestionModel();
    newQuestion.user_id = req.body.user_id;
    newQuestion.question_content = req.body.question_content;
    newQuestion.hashtags = req.body.hashtags;

    try {
        const question = await newQuestion.save();
        res.send(question);
    } catch (error) {
        res.status(400).send(error);
    }

}

const update_question = async (req, res) => {

    const question = await QuestionModel.findOne({ _id: req.params.id });

    if (question.user_id != req.body.user_id)
        return res.status(404).send("You cannot update this question");

    try {
        const updatedQuestion = await QuestionModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set:
                {
                    question_content: req.body.question_content
                }
            }
        )
        res.send("Update successful !");
    } catch (error) {
        res.send(error);
    }
}

const delete_question = async (req, res) => {

    const question = await QuestionModel.findOne({ _id: req.params.id });

    if (question.user_id != req.body.user_id)
        return res.status(404).send("You cannot delete this question");

    try {
        const deletedQuestion = await QuestionModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set:
                {
                    deleted: true
                }
            }
        )
        res.send("Delete successful !");
    } catch (error) {
        res.send(error);
    }
}

const get_question = async (req, res) => {
    await QuestionModel.findOne({ _id: req.params.id })
        .populate('user_id')
        .exec((err, question) => {
            if (err) {
                res.send(err);
            } else {
                res.send(question);
            }
        })
}

const get_all_question = async (req, res) => {

    await QuestionModel.find({ deleted: false })
    .sort({'createdAt': -1})
    .populate('user_id')
    .exec((err, question) => {
        if (err) {
            res.send(err);
        } else {
            res.send(question);
        }
    })

}

module.exports = {
    create_question,
    get_question,
    update_question,
    delete_question,
    get_all_question
}