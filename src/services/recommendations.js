const {spawn} = require('child_process')
const {BookShelf, Book, Sequelize} = require('../models')

module.exports = {
    async getRecommendation(req, res) {
        try{
            console.log('recommendationnnnnnn')
            // const {book} = req.body;
            const isbn = req.params.isbn;
            const book = await Book.findOne({where: {isbn: isbn}})
            if(!book)
                return res.status(400).json({msg:"Book not found"})
            if(book.nepali_book == true){
                let bookIdArr = [];
                const rec = spawn(process.env.PATH_TO_PYTHON_EXE_IN_VENV, [process.env.PATH_TO_NEPALI_RECOMMENDER_PYTHON_FILE, `${book.isbn}`])
                
                rec.stdout.on('data', function(data) {
                    console.log('stdout: ' + data);
            
                    data=data.toString();
                    const bookIsbn = data.substring(data.indexOf('[')+1, data.indexOf(']')).split(", ").map(d => d.substring(1,d.length-1))
                    bookIdArr = bookIdArr.concat(bookIsbn)
                });

                rec.stderr.on('data', function(data) {
                    console.log('stderr: ' + data);
                });
            
                rec.on('close', async function(code) {
                    // const outputRecommendation = scriptOutput.split('\r\n')
                    console.log(typeof(bookIdArr[0]))
                    const bookRec = await Book.findAll({where: {isbn: bookIdArr}})
                    return res.status(200).json({success: true, message: bookRec})
                });
            }
            else{
                let scriptOutput = ""
                let bookIdArr = [];
                const rec = spawn(process.env.PATH_TO_PYTHON_EXE_IN_VENV, [process.env.PATH_TO_ALS_RECOMMENDER_PYTHON_FILE, book.book_id])

                rec.stdout.on('data', function(data) {
                    console.log('stdout: ' + data);

                    data=data.toString();
                    scriptOutput+=data;
                    const bookIds = data.substring(data.indexOf('[')+1, data.indexOf(']')).split(", ")
                    bookIdArr = bookIdArr.concat(bookIds)
                });
                rec.stderr.on('data', function(data) {
                    console.log('stderr: ' + data);
                });

                rec.on('close', async function(code) {
                    const booksIdArrInt = bookIdArr.filter(ba => ba.length>0).map(ba => Number(ba))
                    const bookRec = await Book.findAll({where: {book_id: booksIdArrInt}})
                    .catch(err => console.log('error', err))
                    return res.status(200).json({success: true, message: bookRec})
                })}
            }
        catch(err){
            return res.status(400).json({msg:"error occured"})
        }
    }
}