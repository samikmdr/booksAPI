require('dotenv/config');
const express = require('express');
const {sequelize} = require('./models');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors')

const app = express();
const port = '8084';

app.use(cors({
    origin: true,
    credentials: true,
    'X-RateLimit-Limit': true,
    'X-RateLimit-Remaining': true,
    'Retry-After': true
}));

const swaggerDocs = swaggerJsDoc({
    swagger: "2.0",
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: "Sata-Sat (Book Lending Application) API",
            version: '1.0',
            description: 'Api documentation for the books2lend API'
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerFormat: 'JWT',
                }
            }
        },
        tags: [],
        security: [{
            jwt: []
        }],
        schemes: [
            'http'
        ],
        servers: [
            {
                "url": `http://localhost:${port}/`
            }
        ]
    },
    apis: ["src/routes/*.js", "src/models/*.js"],
});
// swagger options
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none } ',
    customSiteTitle: 'Sata-Sat (Book Lending Application) API Documentation'
}

//Swagger API doc endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOptions));
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
});


require('../middlewares/passport/passport')(passport);
app.use(passport.initialize());

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

//router
app.use('/', require('./routes'))

app.listen(port, async()=>{
    console.log(`app started at port http://localhost:${port}`);
    await sequelize.authenticate();
    console.log('database connected!')
})