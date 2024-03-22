// creat web server

// 2. npm install body-parser
// 3. npm install mongoose
// 4. nodemon server.js
// 5. npm install express-session
// 6. npm install cookie-parser

// import modules
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// connect to mongodb
mongoose.connect('mongodb://localhost/comments', {useNewUrlParser: true});

// define schema
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  email: String,
  comment: String
});
const Comment = mongoose.model('Comment', commentSchema);

// set view engine
app.set('view engine', 'pug');

// set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true
}));

// set routes
app.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) return console.error(err);
    res.render('comments', {comments: comments});
  });
});

app.get('/comments/new', (req, res) => {
  res.render('new');
});

app.post('/comments', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) return console.error(err);
    console.log(comment.comment + ' added');
    res.redirect('/comments');
  });
});

app.get('/comments/:id/edit', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return console.error(err);
    res.render('edit', {comment: comment});
  });
});

app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
    if (err) return console.error(err);
    console.log(comment.comment + ' updated');
    res.redirect('/comments');
  });
});

app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) return console.error(err);
    console.log(comment);
    console.log(comment.comment + ' deleted');
    res.redirect('/comments');
  }
);
}
);
