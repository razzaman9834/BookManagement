const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { uuid } = require('uuidv4');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mongouser:mongouser@cluster.4ttlcze.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the Book model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String,
  bookId:String,
});
const Book = mongoose.model('Book', bookSchema);

// Create a new book
app.post('/api/books', (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    bookId: uuid().v4,
  });

  newBook.save()
    .then(book => {
      res.status(201).json(book);
    })
    .catch(err => {
      res.status(400).json({ error: "Failed to create a new book" });
    });
});

// Get a list of all books
app.get('/api/books', (req, res) => {
  Book.find()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to retrieve books" });
    });
});


// Delete a book
app.delete('/api/books/:bookId', (req, res) => {
    Book.findOneAndDelete({ _id: req.params.bookId })
      .then(book => {
        if (book) {
          res.status(200).json({ success:`Book with id : ${req.params.bookId} deleted successfully` });
        } else {
          res.status(404).json({ error: "Book not found" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Failed to delete the book" });
      });
  });
  
  

// Update a book's details
app.put('/api/books/:bookId', (req, res) => {
  Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true })
    .then(book => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to update the book" });
    });
});


// Get details of a specific book by ID
app.get('/api/books/:bookId', (req, res) => {
    Book.findById(req.params.bookId)
      .then(book => {
        if (book) {
          res.status(200).json(book);
        } else {
          res.status(404).json({ error: "Book not found" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Failed to retrieve the book" });
      });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
