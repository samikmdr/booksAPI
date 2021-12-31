const {BookShelf, User, Book, Sequelize} = require('../models')
const jwt = require('jsonwebtoken');

function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

module.exports ={
    async addBook(req, res){
        const token = extractToken(req);
        const {book_id} = req.body;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const user = await User.findByPk(user_id);
        const book = await Book.findByPk(book_id);
        if(!user)
            return res.status(400).json({success: false, message:"user not found"});
        if(!book)
            return res.status(400).json({success: false, message:"book not found"});
        const shelf = await BookShelf.create({user_id, book_id,available: true, lend_flag:false})
        return res.status(200).json({success: true, message: shelf})
    },
    async getBookShelf(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const shelf = await BookShelf.findAll({
            where: {user_id},
            include: [{
                model: User
            },{
                model: Book
            }]
        })
        const books = shelf.map(sh => sh.Book)
        return res.status(200).json({success: true, message: books})
    }
}