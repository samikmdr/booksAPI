const router = require('express').Router();
const recommendationController = require('../controllers/recommendationController')

/**
 * Get book recommendations by isbn
 * @swagger
 * /book-recommendations/{isbn}:
 *  get:
 *      description: Get book recommendations by isbn
 *      summary: Get book recommendations by isbn
 *      tags:
 *          - Book Recommendation
 *      produces:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: isbn
 *          type: integer
 *          example: 739326228
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: string
 *                                  example: true
 *                              message:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/:isbn', (req, res)=>{
    recommendationController.getRecommendation(req, res)
})

module.exports = router;