const LikeModel = require('../models/like.model');

const like_question = async (req, res) => {

    const newLike = new LikeModel();
    newLike.user_id = req.body.user_id;
    newLike.question_id = req.body.question_id;

    const questionLiked = await LikeModel.findOne({
        user_id: req.body.user_id,
        question_id: req.body.question_id
    })

    if (questionLiked) return res.status(404).send("You cannot like a question twice !");

    try {
        const like = await newLike.save();
        res.send(like);
    } catch (error) {
        res.status(400).send(error);
    }
}

const like_answer = async (req, res) => {

    const newLike = new LikeModel();
    newLike.user_id = req.body.user_id;
    newLike.answer_id = req.body.answer_id;

    const answerLiked = await LikeModel.findOne({
        user_id: req.body.user_id,
        answer_id: req.body.answer_id
    })

    if (answerLiked) return res.status(404).send("You cannot like a answer twice !");

    try {
        const like = await newLike.save();
        res.send(like);
    } catch (error) {
        res.status(400).send(error);
    }
}

const count_liked_answer = async (req, res) => {
    await LikeModel.countDocuments({ answer_id: req.body.answer_id })
        .exec((err, count) => {
            if (err) {
                res.send(err);
            } else {
                res.send(count + ' likes');
            }
        })

}

const count_liked_question = async (req, res) => {
    await LikeModel.countDocuments({ question_id: req.params.id })
        .exec((err, count) => {
            if (err) {
                res.send(err);
            } else {
                res.send(count + ' likes');
            }
        })

}

const unlike_question = async (req, res) => {

    const like = await LikeModel.findOne({ _id: req.body.id });
    if (like.user_id != req.body.user_id)
        return res.status(404).send("You still not like this question");

    await LikeModel.findOneAndRemove({ _id: req.body.id })
        .exec((err, unlike) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Unlike question successful !");
            }
        })

}

const unlike_answer = async (req, res) => {

    const like = await LikeModel.findOne({ _id: req.body.id });
    if (like.user_id != req.body.user_id)
        return res.status(404).send("You still not like this answer");

    await LikeModel.findOneAndRemove({ _id: req.body.id })
        .exec((err, unlike) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Unlike answer successful !");
            }
        })

}

const get_alllike_of_user = async (req, res) => {
    const allLike = await LikeModel.find({ user_id: req.params.id });
    res.send(allLike);
}

module.exports = {
    like_question,
    like_answer,
    count_liked_answer,
    count_liked_question,
    unlike_question,
    unlike_answer,
    get_alllike_of_user
}