const express = require('express');

const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

const userRouter = require('./routes/user.router');
const questionRouter = require('./routes/question.router');
const answerRouter = require('./routes/answer.router');
const likeRouter = require('./routes/like.router');
const bookmarkRouter = require('./routes/bookmark.router')

// const db = 'mongodb://localhost/AskAndAnswer';

const db = "mongodb+srv://haibinh127:binhtu127@cluster0.p2yft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Ask-and-answer is connected")
    );
} catch (e) {
    console.log("could not connect");git 
}

// port = 1207;

// mongoose.connect(db);

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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.listen(process.env.PORT || 1207, () => {
    console.log('App listening');
});