const router = require('express').Router();
const  bookShelfController = require('../controllers/bookShelfController')


/**
 * Add book to user's book-shelf
 * @swagger
 * /book-shelf:
 *  post:
 *      description: Add book to user's book-shelf
 *      summary: Add book to user's book-shelf
 *      tags:
 *          - Book-Shelf
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                              example: 1
 *                          book_id:
 *                              type: integer
 *                              example: 1001
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
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      user_id:
 *                                          type: integer
 *                                          example: 1
 *                                      book_id:
 *                                          type: integer
 *                                          example: 1001
 *                                      available:
 *                                          type: boolean
 *                                          example: false
 *                                      lend_flag:
 *                                          type: boolean
 *                                          example: true
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 *      
 */
router.post('/', (req, res)=>{
    bookShelfController.addBook(req, res)
})


/**
 * Get Book-shelf of user
 * @swagger
 * /book-shelf:
 *  get:
 *      description: Get Book-shelf of user
 *      summary: Get Book-shelf of user
 *      tags:
 *          - Book-Shelf
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: integer
 *          example: 1
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
 *      
 */
router.get('/', (req, res)=>{
    bookShelfController.getBookShelf(req, res)
})

module.exports = router;