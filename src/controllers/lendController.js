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

const viewAcceptedRequests = (req, res)=>{
    lendService.viewAcceptedRequests(req, res)
}

const sendLendConfirmationRequest = (req, res)=>{
    lendService.sendLendConfirmationRequest(req, res)
}

const viewLendConfirmationRequests = (req, res)=>{
    lendService.viewLendConfirmationRequests(req, res)
}

const respondLendConfirmationRequuest = (req, res)=>{
    lendService.respondLendConfirmationRequuest(req, res)
}

const sendReturnConfirmationRequest = (req, res)=>{
    lendService.sendReturnConfirmationRequest(req, res)
}

const viewReturnConfirmationRequests = (req, res)=>{
    lendService.viewReturnConfirmationRequests(req, res)
}

const respondReturnConfirmationRequest = (req, res)=>{
    lendService.respondReturnConfirmationRequest(req, res)
}

module.exports ={
    borrowRequest,
    findBorrowedBooks,
    findLentBooks,
    searchAvailableBook,
    getLendRequests,
    respond,
    viewAcceptedRequests,
    sendLendConfirmationRequest,
    viewLendConfirmationRequests,
    respondLendConfirmationRequuest,
    sendReturnConfirmationRequest,
    viewReturnConfirmationRequests,
    respondReturnConfirmationRequest
}