const lendService = require('../services/lend')

const borrowRequest = (req, res)=>{
    lendService.borrowRequest(req, res)
}

const findBorrowedBooks = (req, res)=>{
    lendService.findBorrowedBooks(req, res)
}

const findLentBooks = (req, res)=>{
    lendService.findLentBooks(req, res)
}

const searchAvailableBook = (req, res)=>{
    lendService.searchAvailableBook(req, res)
}

const getLendRequests = (req, res)=>{
    lendService.getLendRequests(req, res)
}

const respond = (req, res)=>{
    lendService.respond(req, res)
}


module.exports ={
    borrowRequest,
    findBorrowedBooks,
    findLentBooks,
    searchAvailableBook,
    getLendRequests,
    respond
}