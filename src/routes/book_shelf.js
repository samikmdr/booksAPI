const router = require('express').Router();
const  bookShelfController = require('../controllers/bookShelfController')

router.post('/', (req, res)=>{
    bookShelfController.addBook(req, res)
})

router.get('/user/:id', (req, res)=>{
    bookShelfController.getBookShelf(req, res)
})

module.exports = router;