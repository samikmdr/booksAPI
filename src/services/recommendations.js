const {spawn} = require('child_process')
const {BookShelf, Book, Sequelize} = require('../models')

module.exports = {
    async getRecommendation(req, res) {
        try{
            console.log('recommendationnnnnnn')
            // const {book} = req.body;
            const isbn = req.params.isbn;
            const book = await Book.findOne({where: {isbn: isbn}})
            console.log(book);
            let scriptOutput = ""
            const rec = spawn(process.env.PATH_TO_PYTHON_EXE_IN_VENV, [process.env.PATH_TO_RECOMMENDER_PYTHON_FILE, `${book.isbn}`])
            
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
                const bookRec = await Book.findAll({where: {isbn: outputRecommendation}})
                res.status(200).json({success: true, message: bookRec})
            });
        }
        catch(err){
            res.status(400).json({msg:"error occured"})
        }
    }
}