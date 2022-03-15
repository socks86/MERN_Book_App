const express = require('express');
const router = express.Router();

const Book = require('../../models/Book');

//@route GET api/books/test
//@description this will test the books route
//@access public
router.get('/test', (req, res) => res.send('book route test'));

//@route GET api/books
//@description acquire all books
//@access public
router.get('/', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No books were found' }));
});

//@route GET api/books/:id
//@description acquire a single book by id value
//@access public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No book found with this id' }));
});

//@route GET api/books
//@description add book
//@access public
router.post('/', (req, res) => {
  Book.create(req.body)
    .then(book => res.json({ msg: 'Book was added succesfully!'}))
    .catch(err => res.status(404).json({ error: 'Unable to locate book' }));
});

//@route GET api/books/:id
//@description updates book database
//@access public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Successfully updated'}))
    .catch(err => res.status(404).json({ error: 'Unable to update database' }));
});

//@route GET api/books/:id
//@description delete book by id
//@access public
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ msg: 'Book was successfully deleted '}))
    .catch(err => res.status(404).json({ err: 'Unable to delete book from database'}));
});

module.exports = router;