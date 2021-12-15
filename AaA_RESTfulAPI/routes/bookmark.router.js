const express = require('express');

const router = express.Router();

const bookmarkController = require('../controllers/bookmark.controller');

// tạo 1 bookmark cho 1 câu hỏi
router.post('/bookmarkquestion', bookmarkController.create_bookmark);

// lấy tất cả các câu hỏi đã được bookmark của một user
router.get('/:id', bookmarkController.get_bookmarked_question);

// xóa bookmark cho 1 câu hỏi
router.delete('/bookmarkedquestion', bookmarkController.delete_bookmarked_question);

module.exports = router;