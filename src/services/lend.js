const {BookShelf,LendDetails, User, Book, Sequelize} = require('../models')
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
    async searchAvailableBook(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        console.log('user', user_id)
        // const books = await BookShelf.findAll({
        //     where: {
        //         available: true,
        //         user_id: {
        //             [Sequelize.Op.not]: user_id
        //         }
        //     },
        //     include: [{
        //         model: Book,
        //         attributes: {exclude: ['createdAt', 'updatedAt']}
        //     },
        //     {
        //         model: User,
        //         attributes: {exclude: ['password','createdAt', 'updatedAt']}
        //     }],
        //     attributes: {exclude: ['createdAt', 'updatedAt']}
        // });
        const books = await Book.findAll({
            include: [{
                model: BookShelf,
                where: {
                    available: true,
                    user_id: {
                        [Sequelize.Op.not]: user_id
                    }
                },
                attributes: {exclude: ['createdAt', 'updatedAt']},
                include: [{
                    model: User,
                    attributes: {exclude: ['password','createdAt', 'updatedAt']}
                },{
                    model: LendDetails,
                    where: {
                        borrower_id: user_id
                    },
                    required: false,
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }]
            }],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })

        for(let b of books){
            let requestedFlag = false;
            for(let bs of b.BookShelves){
                for(let ld of bs.LendDetails){
                    if(ld.borrower_id == user_id && ld.lend_status=='0')
                        requestedFlag = true;
                }
            }
            b.dataValues.requested = requestedFlag;
        }
        return res.status(200).json({success: true, message:books})
    },
    async borrowRequest(req, res){
        const {shelf_id} = req.body;
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const borrower_id = decoded.userId;
        const shelf = await BookShelf.findByPk(shelf_id);
        if(!shelf)
            return res.status(400).json({success: false, message:"book not found"});
        if(shelf.lend_flag || !shelf.available)
            return res.status(400).json({success: false, message:"book not available for lending"});
        const oldLendDetails = await LendDetails.findOne({where: {shelf_id: shelf_id, lend_status: ['1', '2']}})
        if(oldLendDetails)
            return res.status(400).json({success: false, message: "book not available for lending"})
        const rejectedRequest = await LendDetails.findOne({where: {
            borrower_id,
            shelf_id,
            lend_status: '-1'
        }})
        if(rejectedRequest)
            return res.status(400).json({success: false, message: "Book request was previously rejected."})
        LendDetails.create({shelf_id, borrower_id, lend_status: '0'})
        .then(lend =>{ 
            // shelf.update({lend_flag: true})
            res.status(200).json({success: true, message: lend})
        })
    },

    async getLendRequests(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const shelf = await BookShelf.findAll({
            where: {user_id},
            include:[{
                model: LendDetails,
                where: {
                    lend_status: '0'
                },
                include: [{
                    model: User,
                    attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']},
                required: true
            },{
                model: Book,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        return res.status(200).json({success: true, message:shelf})
    },

    async findBorrowedBooks(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const lend = await LendDetails.findAll(
            {
                where: {
                    borrower_id: user_id,
                    lend_status:'2'
                },
                include: [{
                    model: BookShelf,
                    include: [{
                        model: User,
                        attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                    },{
                        model: Book,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }],
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })
        return res.status(200).json({success: true, message: lend})
    },

    async findLentBooks(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const shelf = await BookShelf.findAll({
            where: {user_id},
            include:[{
                model: LendDetails,
                where: {
                    lend_status: '2'
                },
                include: [{
                    model: User,
                    attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']},
                required: true
            },{
                model: Book,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        return res.status(200).json({success: true, message: shelf})
    },

    async respond(req, res){
       try{ 
            const lend_id = req.params.id;
            const lend = await LendDetails.findByPk(lend_id);
            const ol = await LendDetails.findAll({where: {
                id: {
                    [Sequelize.Op.not]: lend.id
                },
                shelf_id: lend.shelf_id,
                lend_status: ['1', '2']
            }})
            if(ol.length>0)
                return res.status(400).json({success: false, message:"This book is already lent to someone else."});
            if(!lend)
                return res.status(400).json({success: false, message:"Lend request not found"});
            const {accept_request} = req.body;
            if(accept_request){
                lend.update({lend_status:'1'})
                .then(async result =>{
                    await BookShelf.update({available: false},{where: {id: lend.shelf_id}})
                    return res.status(200).json({success: true, message: 'Lend Request Accepted'})
                })
            }
            else{
                lend.update({lend_status:'-1'})
                .then(async result =>{
                    await BookShelf.update({available: true, lend_flag: false},{where: {id: lend.shelf_id}})
                    return res.status(200).json({success: true, message: 'Lend Request Rejected'})
                })
                .catch(err => res.status(400).json({success: false, message:err.message}))
            }
        }
        catch(err){
            return res.status(500).json({success: false, message:err.message});
        }
    },
    async viewAcceptedRequests(req, res){
        try{
            const token = extractToken(req);
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user_id = decoded.userId;
            const shelf = await BookShelf.findAll({
                where: {user_id},
                include:[{
                    model: LendDetails,
                    where: {
                        lend_status: '1'
                    },
                    include: [{
                        model: User,
                        attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                    }],
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    required: true
                },{
                    model: Book,
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })
            return res.status(200).json({success: true, message:shelf})
        }
        catch(err){
            return res.status(500).json({success: false, message:err.message});
        }
    },

    async sendLendConfirmationRequest(req, res){
        try{
            const lend_id = req.params.id;
            const lend = await LendDetails.findByPk(lend_id);
            if(!lend)
                return res.status(400).json({success: false, message: "Lend request not found"})
            if(lend.lend_status == '1'){
                const updatedLend = lend.pending_lend_confirmation? lend :  await lend.update({pending_lend_confirmation: true})
                if(updatedLend){
                    return res.status(200).json({success: true, message: 'Lend confirmation request sent.'});
                }
            }
            else{
                return res.status(400).json({success: false, message: "Lend request is not in accepted state."})
            }
        }
        catch(err){
            return res.status(500).json({success: false, message:err.message});
        }
    },

    async viewLendConfirmationRequests(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        const lend = await LendDetails.findAll(
            {
                where: {
                    borrower_id: user_id,
                    lend_status:'1',
                    pending_lend_confirmation: true
                },
                include: [{
                    model: BookShelf,
                    include: [{
                        model: User,
                        attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                    },{
                        model: Book,
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }],
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })
        return res.status(200).json({success: true, message: lend})
    },

    async respondLendConfirmationRequuest(req,res){
       try{ 
            const lend_id = req.params.id;
            const lend = await LendDetails.findByPk(lend_id);
            if(!lend)
                return res.status(400).json({success: false, message:"Lend request not found"});
            const {accept_request} = req.body;
            if(accept_request){
                lend.update({lend_status:'2', pending_lend_confirmation: false})
                .then(async result =>{
                    await BookShelf.update({available: false, lend_flag: true},{where: {id: lend.shelf_id}})
                    return res.status(200).json({success: true, message: 'Book received and confirmed'})
                })
            }
            else{
                lend.update({pending_lend_confirmation: false})
                .then(async result =>{
                    return res.status(200).json({success: true, message: 'Book Lend Request Rejected'})
                })
                .catch(err => res.status(400).json({success: false, message:err.message}))
            }
        }
        catch(err){
            return res.status(500).json({success: false, message:err.message});
        }
    },

    async sendReturnConfirmationRequest(req, res){
        try{
            const lend_id = req.params.id;
            const lend = await LendDetails.findByPk(lend_id);
            if(!lend)
                return res.status(400).json({success: false, message: "Lend request not found"})
            if(lend.lend_status == '2'){
                const updatedLend = lend.pending_return_confirmation ? lend :  await lend.update({pending_return_confirmation: true})
                if(updatedLend)
                    return res.status(200).json({success: true, message: 'Book return confirmation request sent to lender.'});
            }
            else{
                return res.status(400).json({success: false, message: "Lend request is not in lent state."})
            }
        }
        catch(err){
            return res.status(500).json({success: false, message:err.message});
        }
    },

    async viewReturnConfirmationRequests(req, res){
        try{
            const token = extractToken(req);
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user_id = decoded.userId;
            const shelf = await BookShelf.findAll({
                where: {user_id},
                include:[{
                    model: LendDetails,
                    where: {
                        lend_status: '2',
                        pending_return_confirmation: true
                    },
                    include: [{
                        model: User,
                        attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                    }],
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    required: true
                },{
                    model: Book,
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })
            return res.status(200).json({success: true, message:shelf})
        }
        catch(err){
            return res.status(500).json({success: false, message:err.message});
        }
    },

    async respondReturnConfirmationRequest(req ,res){
       try{ 
            const lend_id = req.params.id;
            const lend = await LendDetails.findByPk(lend_id);
            if(!lend)
                return res.status(400).json({success: false, message:"Lend request not found"});
            const {accept_request} = req.body;
            if(accept_request){
                lend.update({lend_status:'3', pending_return_confirmation: false})
                .then(async result =>{
                    await BookShelf.update({available: true, lend_flag:false},{where: {id: lend.shelf_id}})
                    return res.status(200).json({success: true, message: 'Book return confirmed'})
                })
            }
            else{
                lend.update({pending_return_confirmation: false})
                .then(async result =>{
                    return res.status(200).json({success: true, message: 'Lend Request Rejected'})
                })
                .catch(err => res.status(400).json({success: false, message:err.message}))
            }
        }
        catch(err){
            return res.status(500).json({success: false, message:err.message});
        }
    }

}