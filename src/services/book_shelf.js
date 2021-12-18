const {BookShelf, User, Book, Sequelize} = require('../models')


module.exports ={
    async addBook(req, res){
        const {user_id, book_id} = req.body;
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
        const user_id = req.params.id;
        const shelf = await BookShelf.findAll({
            where: {user_id},
            include: [{
                model: User
            },{
                model: Book
            }]
        })
        return res.status(200).json({success: true, message: shelf})
    }
}