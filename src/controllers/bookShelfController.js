const bookShelfService = require('../services/book_shelf')

const addBook = (req, res)=>{
    bookShelfService.addBook(req, res)
}
const getBookShelf = (req, res)=>{
    bookShelfService.getBookShelf(req, res)
}



module.exports ={
    addBook,
    getBookShelf
}