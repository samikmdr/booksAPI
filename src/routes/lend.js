const router = require('express').Router();
const  lendController = require('../controllers/lendController')

router.post('/', (req, res)=>{
    lendController.lendBook(req, res)
})

router.get('/borrowed', (req, res)=>{
    lendController.findBorrowedBooks(req, res)
})

router.get('/', (req, res)=>{
    lendController.findLentBooks(req, res)
})


module.exports = router;