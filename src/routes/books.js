const router = require('express').Router();
const booksController = require('../controllers/booksController')


/**
 * Find Books
 * @swagger
 * /books:
 *  get:
 *      description: Find all books.
 *      summary: Find all books.
 *      tags:
 *          - Books
 *      produces:
 *          - application/json
 *      parameters:
 *        - in: query
 *          name: page
 *          type: integer
 *          example: 1
 *        - in: query
 *          name: limit
 *          type: integer
 *          example: 20
 *        - in: query
 *          name: search
 *          type: integer
 *          example: The Subtle Knife
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
 *                                      rows:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/Book'
 *                                      count:
 *                                          type: integer
 *                                          example: 8000
 *                                      page:
 *                                          type: integer
 *                                          example: 12
 *                                      totalPage:
 *                                          type: integer
 *                                          example: 407
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 *      
 */
router.get('/', (req, res)=>{
    booksController.getBooks(req, res)
})


/**
 * Find Books by id
 * @swagger
 * /books/{bookId}:
 *  get:
 *      description: Find books by id
 *      summary: Find books by id
 *      tags:
 *          - Books
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
 *      parameters:
 *        - in: path
 *          name: bookId
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
 *                                  $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 *      
 */
router.get('/:id', (req, res)=>{
    booksController.getBookById(req, res)
})


/**
 * Find Books by isbn
 * @swagger
 * /books/isbn/{isbn}:
 *  get:
 *      description: Find books by isbn
 *      summary: Find books by isbn
 *      tags:
 *          - Books
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
 *      parameters:
 *        - in: path
 *          name: isbn
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
 *                                  $ref: '#/components/schemas/Book'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 *      
 */
router.get('/isbn/:isbn', (req, res)=>{
    booksController.getBookByIsbn(req, res)
})

/**
 * Find Books by author
 * @swagger
 * /books/author/{author}:
 *  get:
 *      description: Find books by author
 *      summary: Find books by author
 *      tags:
 *          - Books
 *      produces:
 *          - application/json
 *      security: [{
 *          jwt: []
 *      }]
 *      parameters:
 *        - in: path
 *          name: author
 *          type: integer
 *          example: Stanley
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
router.get('/author/:name', (req, res)=>{
    booksController.getBookByAuthor(req, res)
})


module.exports = router;