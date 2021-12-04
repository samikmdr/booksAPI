const router = require('express').Router();
const authController = require('../controllers/authController')


/**
 * User Login
 * @swagger
 * /auth/login:
 *  post:
 *      description: User Login.
 *      summary: User Login.
 *      tags:
 *          - Auth
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_name:
 *                              type: string
 *                              example: ram
 *                          password:
 *                              type: string
 *                              example: ram123
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  example: login successful
 *                              token:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYzNzAzNDU0OCwiZXhwIjoxNjM3MTIwOTQ4fQ.naaylahy83KQC4iVqG9TYwYBxD24ewLJlK0bhrVNA1s
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 *      
 */
router.post('/login', (req, res)=>{
    authController.login(req, res)
})


/**
 * User Register
 * @swagger
 * /auth/register:
 *  post:
 *      description: User Register.
 *      summary: User Register/Sign-up.
 *      tags:
 *          - Auth
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fname:
 *                              type: string
 *                              example: ram
 *                          lname:
 *                              type: string
 *                              example: ram
 *                          user_name:
 *                              type: string
 *                              example: ram
 *                          password:
 *                              type: string
 *                              example: ram123
 *                          email:
 *                              type: string
 *                              example: ram
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 *      
 */
router.post('/register', (req, res)=>{
    authController.register(req, res)
})

router.post('/add-role/:id', (req, res)=>{
    authController.addRole(req, res)
})

/**
 * Forgot Password
 * @swagger
 * /auth/forgot-password:
 *  post:
 *      description: get password reset token
 *      summary: Forgot Password
 *      tags:
 *          - Auth
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: ram@abc.com
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status: 
 *                                  type: string
 *                                  example: ok
 *                              token:
 *                                  type: string
 *                                  example: aGKqyrPVu7wFnLYY/q86VomqaCx626fGBnRaZx7kK0Q+r9/G0ev477V7obHHT7xf+gNZG9AS7EXTqo5IvclaYw=
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 *  
 * 
 */
router.post('/forgot-password', (req, res)=>{
    authController.forgotPassword(req, res)
})

/**
 * Reset Password
 * @swagger
 * /auth/reset-password:
 *  put:
 *      description: Reset Password
 *      summary: Reset Password
 *      tags:
 *          - Auth
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: ram@abc.com
 *                          new_password:
 *                              type: string
 *                              example: newpassword
 *                          retype_password:
 *                              type: string
 *                              example: newpassword
 *                          token:
 *                              type: string
 *                              example: KjL62p2MFwYPyRSUXsgoGeXNve+7J+4AkMOFv0uMqoviEUWbDnfvH15cOax+96J+g7Z5y1U8QbTzOiQWDgr2nw=
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
 *                              msg:
 *                                  type: array
 *                                  example: [1]
 *          401:
 *              description: Not authenticated
 *          403:
 *              description: Access token does not have the required permission
 *  
 * 
 */
router.put('/reset-password', (req, res)=>{
    authController.resetPassword(req, res)
})
module.exports = router;