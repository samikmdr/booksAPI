const router = require('express').Router();
const  lendController = require('../controllers/lendController')

/**
 * Find books available for borrowing
 * @swagger
 * /borrow/available-books:
 *  get:
 *      description: Find books available for borrowing
 *      summary: Find books available for borrowing
 *      tags:
 *          - Borrow/Lend
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
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
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: integer
 *                                              example: 2
 *                                          user_id:
 *                                              type: integer
 *                                              example: 1
 *                                          book_id:
 *                                              type: integer
 *                                              example: 1002
 *                                          available:
 *                                              type: boolean
 *                                              example: true
 *                                          lend_flag:
 *                                              type: boolean
 *                                              example: false
 *                                          Book:
 *                                              $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/available-books', (req, res)=>{
    lendController.searchAvailableBook(req, res)
})

/**
 * Borrow request for books
 * @swagger
 * /borrow/request:
 *  post:
 *      description: Borrow request for books
 *      summary: Borrow request for books
 *      tags:
 *          - Borrow/Lend
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
 *                          shelf_id:
 *                              type: integer
 *                              example: 1
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
 *                                  $ref: '#/components/schemas/LendDetails'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.post('/request', (req, res)=>{
    lendController.borrowRequest(req, res)
})

/**
 * Find list of borrowed books
 * @swagger
 * /borrow/borrowed:
 *  get:
 *      description: Find list of borrowed books
 *      summary: Find list of borrowed books
 *      tags:
 *          - Borrow/Lend
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
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
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: integer
 *                                              example: 1
 *                                          shelf_id:
 *                                              type: integer
 *                                              example: 2
 *                                          borrower_id:
 *                                              type: integer
 *                                              example: 2
 *                                          lend_status:
 *                                              type: string
 *                                              example: 1
 *                                          BookShelf:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                      example: 1
 *                                                  user_id:
 *                                                      type: integer
 *                                                      example: 1
 *                                                  book_id:
 *                                                      type: integer
 *                                                      example: 1001
 *                                                  available:
 *                                                      type: boolean
 *                                                      example: false
 *                                                  lend_flag:
 *                                                      type: boolean
 *                                                      example: true
 *                                                  User:
 *                                                      $ref: '#/components/schemas/User'
 *                                                  Book:
 *                                                      $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/borrowed', (req, res)=>{
    lendController.findBorrowedBooks(req, res)
})



module.exports = router;