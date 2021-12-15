const express = require('express');

const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

const userRouter = require('./routes/user.router');
const questionRouter = require('./routes/question.router');
const answerRouter = require('./routes/answer.router');
const likeRouter = require('./routes/like.router');
const bookmarkRouter = require('./routes/bookmark.router')

const db = 'mongodb://localhost/AskAndAnswer';

port = 1207;

mongoose.connect(db);

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('AaA Server Is Up');
});

app.use('/api/user', userRouter);
app.use('/api/question', questionRouter);
app.use('/api/answer', answerRouter);
app.use('/api/like', likeRouter);
app.use('/api/bookmark', bookmarkRouter);

app.listen(port, () => {
    console.log('App listening on port: ', port);
});