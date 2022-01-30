const {BookShelf, User,LendDetails, Book, Sequelize} = require('../models')
const jwt = require('jsonwebtoken');
const {spawn} = require('child_process')


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
        console.log(user_id)
        const shelf = await BookShelf.findAll({
            where: {user_id},
            include:[{
                model: LendDetails,
                include: [{
                    model: User,
                    attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
                }],
                attributes: {exclude: ['createdAt', 'updatedAt']}
            },{
                model: Book,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        for(let sh of shelf){
            let Requests = [];
            let Lent = [];
            for(let ld of sh.LendDetails)
                if(ld.lend_status=='0')
                    Requests.push(ld)
                else if(ld.lend_status=='1')
                    Lent.push(ld)
            delete sh.dataValues.LendDetails;
            sh.dataValues.Requests = Requests;
            sh.dataValues.Lent = Lent;
        }
        return res.status(200).json({success: true, message: shelf})
    },
    async generateRecommendations(req, res){
        const token = extractToken(req);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.userId;
        console.log(user_id)
        const shelf = await BookShelf.findAll({
            where: {user_id},
            include:[{
                model: Book,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        const isbnList = shelf.map(sh => sh.Book.isbn)
        var isbnArg = '';
        for(let il of isbnList){
            isbnArg = isbnArg.concat(il, '|')
        }
        console.log('asdfasdf', `"${isbnArg.slice(0, -1)}"`)

        let scriptOutput = ""
        const rec = spawn(process.env.PATH_TO_PYTHON_EXE_IN_VENV, [process.env.PATH_TO_RECOMMENDER_PYTHON_FILE, `${isbnArg.slice(0, -1)}`])
        
        rec.stdout.on('data', function(data) {
            console.log('stdout: ' + data);
    
            data=data.toString();
            scriptOutput+=data;
        });
        rec.stderr.on('data', function(data) {
            console.log('stderr: ' + data);
    
            // data=data.toString();
            // scriptOutput+=data;
        });
    
        rec.on('close', async function(code) {
            console.log(scriptOutput) 
            const outputRecommendation = scriptOutput.split('\r\n')
            outputRecommendation.pop();
            const bookRec = await Book.findAll({where: {isbn: outputRecommendation}})
            res.status(200).json({success: true, message: bookRec})
        });
    }
}