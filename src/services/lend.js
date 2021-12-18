const {BookShelf,LendDetails, User, Book, Sequelize} = require('../models')


module.exports ={
    async lendBook(req, res){
        const {shelf_id, borrower_id} = req.body;
        const user = await User.findByPk(borrower_id);
        const shelf = await BookShelf.findByPk(shelf_id);
        if(!user)
            return res.status(400).json({success: false, message:"user not found"});
        if(!shelf)
            return res.status(400).json({success: false, message:"book not found"});
        if(shelf.lend_flag)
            return res.status(400).json({success: false, message:"book not available for lending"});
        LendDetails.create({shelf_id, borrower_id, lend_status: '0'})
        .then(lend =>{ 
            shelf.update({lend_flag: true})
            res.status(200).json({success: true, message: lend})
        })
    },

    async findBorrowedBooks(req, res){
        const {user_id} = req.body;
        const lend = await LendDetails.findAll({where: {borrower_id: user_id, lend_status:'0'}})
        return res.status(200).json({sucess: true, message: lend})
    },

    async findLentBooks(req, res){
        const {user_id} = req.body;
        const shelf = await BookShelf.findAll({
            where: {user_id, lend_flag:true},
            include: [{
                model: Books 
            }]
        })
        return res.status(200).json({sucess: true, message: shelf})
    }
}