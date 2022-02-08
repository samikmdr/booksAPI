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
 *          - Lend
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
 * Book lend requests
 * @swagger
 * /lend/requests:
 *  get:
 *      description: List of book lend requests (from other users)
 *      summary: List of book lend requests
 *      tags:
 *          - Lend
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
 *                                              example: true
 *                                          lend_flag:
 *                                              type: boolean
 *                                              example: false
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
 *                                                          example: 0
 *                                                      pending_lend_confirmation:
 *                                                          type: boolean
 *                                                          example: false
 *                                                      pending_return_confirmation:
 *                                                          type: boolean
 *                                                          example: false
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
 * Accept or reject book lend request
 * @swagger
 * /lend/respond/{lendDetailsId}:
 *  post:
 *      description: Accept or reject book lend request
 *      summary: Accept or reject book lend request
 *      tags:
 *          - Lend
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

/**
 * List of accepted book lend requests (requests accepted by you)
 * @swagger
 * /lend/requests/accepted:
 *  get:
 *      description: List of accepted book lend requests (requests accepted by you)
 *      summary: List of accepted book lend requests (requests accepted by you)
 *      tags:
 *          - Lend
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
 *                                              example: false
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
 *                                                      pending_lend_confirmation:
 *                                                          type: boolean
 *                                                          example: false
 *                                                      pending_return_confirmation:
 *                                                          type: boolean
 *                                                          example: false
 *                                                      User:
 *                                                          $ref: '#/components/schemas/User'
 *                                          Book:
 *                                              $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/requests/accepted', (req, res)=>{
    lendController.viewAcceptedRequests(req, res)
})

/**
 * Send "book lent" confirmation request to borrower
 * @swagger
 * /lend/request-lend-confirmation/{lendDetailsId}:
 *  patch:
 *      description: Send "book lent" confirmation to borrower. After accepting a book lend request, the lender has to send a book lend confirmation which is either accepted or rejected by the borrower
 *      summary: Send "book lent" confirmation request to borrower
 *      tags:
 *          - Lend
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
 *                                  example: Lend confirmation request was sent
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.patch('/request-lend-confirmation/:id', (req, res)=>{
    lendController.sendLendConfirmationRequest(req, res)
})

/**
 * List of accepted book lend requests (requests accepted by you)
 * @swagger
 * /lend/requests/accepted:
 *  get:
 *      description: List of accepted book lend requests (requests accepted by you)
 *      summary: List of accepted book lend requests (requests accepted by you)
 *      tags:
 *          - Lend
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
 *                                              example: false
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
 *                                                      pending_lend_confirmation:
 *                                                          type: boolean
 *                                                          example: false
 *                                                      pending_return_confirmation:
 *                                                          type: boolean
 *                                                          example: false
 *                                                      User:
 *                                                          $ref: '#/components/schemas/User'
 *                                          Book:
 *                                              $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/requests/accepted', (req, res)=>{
    lendController.viewAcceptedRequests(req, res)
})

/**
 * List of book return confirmation requests
 * @swagger
 * /lend/return-requests:
 *  get:
 *      description: List of book return confirmation requests
 *      summary: List of book return confirmation requests
 *      tags:
 *          - Lend
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
 *                                                          example: 2
 *                                                      pending_lend_confirmation:
 *                                                          type: boolean
 *                                                          example: false
 *                                                      pending_return_confirmation:
 *                                                          type: boolean
 *                                                          example: true
 *                                                      User:
 *                                                          $ref: '#/components/schemas/User'
 *                                          Book:
 *                                              $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.get('/return-requests', (req, res)=>{
    lendController.viewReturnConfirmationRequests(req, res)
})

/**
 * Accept or reject book return confirmation request
 * @swagger
 * /lend/return-requests/{lendDetailsId}:
 *  post:
 *      description: Accept or reject book return confirmation request
 *      summary: Accept or reject book return confirmation request
 *      tags:
 *          - Lend
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
 *                                  example: Book return confirmed
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 */
router.post('/return-requests/:id', (req, res)=>{
    lendController.respondReturnConfirmationRequest(req, res)
})

module.exports = router;