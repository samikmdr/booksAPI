const recommendationService = require('../services/recommendations')

const getRecommendation = (req, res)=>{
    recommendationService.getRecommendation(req, res)
}



module.exports ={
    getRecommendation
}