const bookService = require('../services/books')

const getBooks = (req, res)=>{
    bookService.getBooks(req, res)
}

const getBookById = (req, res)=>{
    bookService.getBookById(req, res)
}

const getBookByIsbn = (req, res)=>{
    bookService.getBookByIsbn(req, res)
}

const getBookByAuthor = (req, res)=>{
    bookService.getBookByAuthor(req, res)
}


module.exports ={
    getBooks,
    getBookById,
    getBookByIsbn,
    getBookByAuthor
}