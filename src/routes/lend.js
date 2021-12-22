const router = require('express').Router();
const  lendController = require('../controllers/lendController')

/**
 * Find list of lent books
 * @swagger
 * /lend:
 *  get:
 *      description: Find list of lent books
 *      summary: Find list of lent books
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
 *                                          user_id:
 *                                              type: integer
 *                                              example: 1
 *                                          book_id:
 *                                              type: integer
 *                                              example: 1001
 *                                          available:
 *                                              type: boolean
 *                                              example: false
 *                                          lend_flag:
 *                                              type: boolean
 *                                              example: true
 *                                          LendDetails:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      id:
 *                                                          type: integer
 *                                                          example: 1
 *                                                      shelf_id:
 *                                                          type: integer
 *                                                          example: 2
 *                                                      borrower_id:
 *                                                          type: integer
 *                                                          example: 2
 *                                                      lend_status:
 *                                                          type: string
 *                                                          example: 1
 *                                                      User:
 *                                                          $ref: '#/components/schemas/User'
 *                                          Book:
 *                                              $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/', (req, res)=>{
    lendController.findLentBooks(req, res)
})


/**
 * Find list of book lend requests
 * @swagger
 * /lend/requests:
 *  get:
 *      description: Find list of book lend requests
 *      summary: Find list of book lend requests
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
 *                                          user_id:
 *                                              type: integer
 *                                              example: 1
 *                                          book_id:
 *                                              type: integer
 *                                              example: 1001
 *                                          available:
 *                                              type: boolean
 *                                              example: false
 *                                          lend_flag:
 *                                              type: boolean
 *                                              example: true
 *                                          LendDetails:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      id:
 *                                                          type: integer
 *                                                          example: 1
 *                                                      shelf_id:
 *                                                          type: integer
 *                                                          example: 2
 *                                                      borrower_id:
 *                                                          type: integer
 *                                                          example: 2
 *                                                      lend_status:
 *                                                          type: string
 *                                                          example: 1
 *                                                      User:
 *                                                          $ref: '#/components/schemas/User'
 *                                          Book:
 *                                              $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/requests', (req, res)=>{
    lendController.getLendRequests(req, res)
})

/**
 * Borrow request for books
 * @swagger
 * /lend/respond/{lendDetailsId}:
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
 *                                  example: Lend Request Accepted
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.post('/respond/:id', (req, res)=>{
    lendController.respond(req, res)
})


module.exports = router;