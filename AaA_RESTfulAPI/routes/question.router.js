const express = require('express');

const router = express.Router();

const questionController = require('../controllers/question.controller');

// tạo 1 câu hỏi
router.post('/create', questionController.create_question);

// lấy ra thông tin của một câu hỏi
router.get('/:id', questionController.get_question);

// lấy ra tất cả câu hỏi
router.get('/', questionController.get_all_question);

// cập nhật câu hỏi
router.put('/:id', questionController.update_question);

// xóa 1 câu hỏi
router.put('/delete/:id', questionController.delete_question);

module.exports = router;