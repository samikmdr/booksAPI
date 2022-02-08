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
 *          - Borrow
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
 *                                              example: 1002
 *                                          isbn:
 *                                              type: string
 *                                              example: 440241898
 *                                          isbn13:
 *                                              type: string
 *                                              example: 9780440241900.0
 *                                          authors:
 *                                              type: string
 *                                              example: Sophie Kinsella
 *                                          original_title:
 *                                              type: string
 *                                              example: Shopaholic Ties the Knot
 *                                          title:
 *                                              type: string
 *                                              example: Shopaholic Ties the Knot (Shopaholic, #3)
 *                                          year_of_publication:
 *                                              type: string
 *                                              example: 2002.0
 *                                          image_url:
 *                                              type: string
 *                                              example: https://images.gr-assets.com/books/1371383294m/9419.jpg
 *                                          BookShelves:
 *                                              type: array
 *                                              items: 
 *                                                  type: object
 *                                                  properties:
 *                                                      id:
 *                                                          type: integer
 *                                                          example: 2
 *                                                      user_id:
 *                                                          type: integer
 *                                                          example: 1
 *                                                      book_id:
 *                                                          type: integer
 *                                                          example: 1002
 *                                                      available:
 *                                                          type: boolean
 *                                                          example: true
 *                                                      lend_flag:
 *                                                          type: boolean
 *                                                          example: false
 *                                                      User:
 *                                                          $ref: '#/components/schemas/User'
 *                                                      LendDetails:
 *                                                          $ref: '#/components/schemas/LendDetails'
 *                                          requested:
 *                                              type: boolean
 *                                              example: true
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
 *          - Borrow
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
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      shelf_id:
 *                                          type: integer
 *                                          example: 2
 *                                      borrower_id:
 *                                          type: integer
 *                                          example: 2
 *                                      lend_status:
 *                                          type: string
 *                                          example: 1
 *                                      pending_lend_confirmation:
 *                                          type: boolean
 *                                          example: false
 *                                      pending_return_confirmation:
 *                                          type: boolean
 *                                          example: false
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
 *          - Borrow
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

/**
 * Book lend confirmation requests
 * @swagger
 * /borrow/lend-confirm-requests:
 *  get:
 *      description: Borrower gets the list of lend confirmation request sent by the lender that he has to accept or reject to confirm that he has borrowed the book from the lender
 *      summary: Book lend confirmation requests
 *      tags:
 *          - Borrow
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
 *                                          pending_lend_confirmation:
 *                                              type: boolean
 *                                              example: true
 *                                          pending_return_confirmation:
 *                                              type: boolean
 *                                              example: false
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
 *                                                      example: false
 *                                                  User:
 *                                                      $ref: '#/components/schemas/User'
 *                                                  Book:
 *                                                      $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/lend-confirm-requests', (req, res)=>{
    lendController.viewLendConfirmationRequests(req, res)
})


/**
 * Accept or reject book lend confirmation request
 * @swagger
 * /borrow/lend-confirm-requests/{lendDetailsId}:
 *  post:
 *      description: Accept or reject book lend confirmation request i.e. borrower confirms that he has received the lender's book 
 *      summary: Accept or reject book lend confirmation request
 *      tags:
 *          - Borrow
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
 *      parameters:
 *        - in: path
 *          name: lendDetailsId
 *          type: integer
 *          example: 1
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          accept_request:
 *                              type: boolean
 *                              example: true
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
 *                                  type: string
 *                                  example: Book received and confirmed.
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.post('/lend-confirm-requests/:id', (req, res)=>{
    lendController.respondLendConfirmationRequuest(req, res)
})

/**
 * Send "book returned" confirmation request to lender
 * @swagger
 * /borrow/return-confirm/{lendDetailsId}:
 *  patch:
 *      description: Send "book returned" confirmation to lender. The borrower sends a request to the lender to confirm the return.
 *      summary: Send "book returned" confirmation request to lender
 *      tags:
 *          - Borrow
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
 *      parameters:
 *        - in: path
 *          name: lendDetailsId
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
 *                                  type: string
 *                                  example: Book return confirmation request was sent to lender
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.patch('/return-confirm/:id', (req, res)=>{
    lendController.sendReturnConfirmationRequest(req,res)
})

module.exports = router;