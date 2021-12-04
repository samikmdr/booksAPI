const router = require('express').Router();
const recommendationController = require('../controllers/recommendationController')

/**
 * Get book recommendations
 * @swagger
 * /book-recommendations:
 *  post:
 *      description: Get book recommendations
 *      summary: Get book recommendations
 *      tags:
 *          - Books
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          book:
 *                              type: string
 *                              example: Wreck the Halls
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              recommendations:
 *                                  type: array
 *                                  example: ["Repair to Her Grave (Home Repair Is Homicide)", "Wreck the Halls (Home Repair Is Homicide Mystery)", "Wreck the Halls", "The Scold's Bridle", "After Glow"]
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.post('/', (req, res)=>{
    recommendationController.getRecommendation(req, res)
})

module.exports = router;