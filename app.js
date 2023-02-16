const express = require('express');
const mongoose = require('mongoose');
const characterRoutes = require('./routes/character');
const userRoutes = require('./routes/user');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

const app = express();

mongoose.connect('mongodb+srv://user:Azerty1@cluster0.0iiiszt.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/character',characterRoutes);
app.use('/api/auth', userRoutes);

// Document Swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


module.exports = app;