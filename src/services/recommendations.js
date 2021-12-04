const {spawn} = require('child_process')

module.exports = {
    getRecommendation(req, res) {
        try{
            const {book} = req.body;
            let scriptOutput = ""
            const rec = spawn(process.env.PATH_TO_PYTHON_EXE_IN_VENV, [process.env.PATH_TO_RECOMMENDER_PYTHON_FILE, `${book}`])
            
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
        
            rec.on('close', function(code) {
                console.log(scriptOutput)
                const outputRecommendation = scriptOutput.split('\r\n')
                res.status(200).json({recommendations: outputRecommendation})
            });
        }
        catch(err){
            res.status(400).json({msg:"error occured"})
        }
    }
}