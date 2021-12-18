const lendService = require('../services/lend')

const lendBook = (req, res)=>{
    lendService.lendBook(req, res)
}

const findBorrowedBooks = (req, res)=>{
    lendService.findBorrowedBooks(req, res)
}

const findLentBooks = (req, res)=>{
    lendService.findLentBooks(req, res)
}


module.exports ={
    lendBook,
    findBorrowedBooks,
    findLentBooks
}