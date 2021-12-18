const {Book, Sequelize} = require('../models')


module.exports = {
    getBooks(req, res){
        let queryOptions = {
            limit: parseInt(req.query.limit || 15),
            offset: ((req.query.page || 1) - 1) * (req.query.limit || 15), 
            order: [
                ['id', 'ASC']
            ]
        }
        if(req.query.search){
            queryOptions.where = {
                title:  {
                    [Sequelize.Op.like]: '%' + req.query.search + '%'
                }
            }
        }
        Book.findAll(queryOptions)
        .then(books => res.status(200).json({success:'true', message: books}))
        .catch(error => res.status(400).json({err: error}))
    },
    getBookById(req, res){
        Book.findByPk(req.params.id)
        .then(book => res.status(200).json({success:'true', message: book}))
        .catch(error => res.status(400).json({err: error}))
    },
    getBookByIsbn(req, res){
        Book.findOne({where:{isbn: req.params.isbn}})
        .then(book => res.status(200).json({success:'true', message: book}))
        .catch(error => res.status(400).json({err: error.message}))
    },
    getBookByAuthor(req, res){
        let queryOptions={
            limit: parseInt(req.query.limit || 15),
            offset: ((req.query.page || 1) - 1) * (req.query.limit || 15), 
            order: [
                ['id', 'ASC']
            ]
        };
        if(req.params.name){
            queryOptions.where = {
                authors:  {
                    [Sequelize.Op.like]: '%' + req.params.name + '%'
                }
            }
        }
        Book.findAll(queryOptions)
        .then(book => res.status(200).json({success:'true', message: book}))
        .catch(error => res.status(400).json({err: error.message}))
    }

}