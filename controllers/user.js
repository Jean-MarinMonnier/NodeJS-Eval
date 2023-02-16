const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require('axios');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // création de l'user à partir du modèle User
            const user = new User({
                email: req.body.email,
                password: hash,
                isAdmin : req.body.isAdmin ?? false
            });
            // sauvegarde du user en bdd et envoi du status 201 + du message "Utiliseur créé !
            user.save()
                .then(() => {
                    res.status(201).json({ message: "Utilisateur créé !" })
                } )
                .catch(error => res.status(400).json({ error } ));
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    // Récupérer l'user avec l'email
    User.findOne({ email: req.body.email })
        .then(user => {
            // si l'user est vide
            if(!user){
                return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
            }

            // l'user est pas vide
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        const messageErreur = `${new Date().toISOString()} : tentative de connexion invalide\n`;
                        fs.appendFile('logs.txt', messageErreur, (err) => {
                            if (err) throw err;
                            console.log('Erreur de connexion ajoutée aux logs');
                        });
                        return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
                    }
                    // si l'user est authentifié
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id, adminToken: user.isAdmin },
                            'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn',
                            { expiresIn: '1y' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}

exports.loginWithBlizzard = (req, res, next) => {
    axios.post('https://backend-tp-final-nodejs.agence-pixi.fr/wow/compte/check', {
            "username": req.body.username,
            "password": req.body.password
    })
    .then((response) => res.status(200).json(response.data))
    .catch((error) => res.status(400).json({error}));
}