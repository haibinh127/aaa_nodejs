const express = require('express');

const router = express.Router();

const likeController = require('../controllers/like.controller');

//like 1 câu hỏi
router.post('/likequestion', likeController.like_question);

//like 1 câu trả lời
router.post('/likeanswer', likeController.like_answer);

// lấy số like của một câu trả lời
router.get('/countlikedanswer', likeController.count_liked_answer);

//lấy tất cả bài like của một user
router.get('/getalllike/:id', likeController.get_alllike_of_user);

//lấy số like của một câu hỏi
router.get('/:id', likeController.count_liked_question);


//unlike 1 câu hỏi
router.delete('/unlikequestion', likeController.unlike_question);

//unlike 1 câu hỏi
router.delete('/unlikeanswer', likeController.unlike_answer);

module.exports = router;
