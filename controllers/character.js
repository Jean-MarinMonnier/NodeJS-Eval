const Character = require('../models/Character');

const classList = ["guerrier", "paladin", "chasseur", "voleur", "prêtre", "chaman", "mage", "démoniste", "moine", "druide", "chasseur de démons", "chevalier de la mort", "évocateur"];
exports.getOneCharacter = (req, res, next) => {
    Character.findOne({pseudo: req.params.pseudo, class: req.params.class})
        .then(character => res.status(200).json(character))
        .catch(error => res.status(400).json({ error }))
}

exports.getAllCharacters = (req, res, next) => {
    Character.find({userId: req.auth.userId})
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json({ error } ))
}

exports.createCharacter = (req, res, next) => {
    const characterObject = req.body.character; 
    delete characterObject._id;
    delete characterObject._userId;
    if(!req.auth.isAdmin){
        if(!classList.includes(characterObject.class))
            return res.status(400).json({message : "Classe invalide"})
        Character.findOne({pseudo: characterObject.pseudo, class: characterObject.class}, (err, characterFromDb) => {
            if(characterFromDb)
                return res.status(400).json({message: "Un personage avec les mêmes attributs éxiste déjà"});

            const character = new Character({
                ...characterObject,
                userId: req.auth.userId,
            })
        
            character.save()
                .then(() => res.status(201).json({ message: "Personnage crée" }))
                .catch(error => res.status(400).json({ error } ));
        })
    }
    else
        return res.status(401).json({message : "Non autorisé pour un administrateur"});
}

exports.updateCharacter = (req, res, next) => {
    const characterObject = req.body.character
    delete characterObject._userId;

    Character.findOne({pseudo: req.params.pseudo, class: req.params.class})
        .then((character) => {
            if(character.userId !== req.auth.userId && !req.auth.isAdmin){
                res.status(401).json({message : 'Ce n\'est pas votre personnage ! '})
            }else{
                Character.updateOne({_id: character._id }, {...characterObject } )
                    .then(() => {
                        res.status(200).json({ message: "Personnage modifié !" })
                    })
                    .catch(error => res.status(400).json({ error } ))
            }
        })
        .catch(error => res.status(400).json({ error } ));
}

exports.deleteCharacter = (req, res, next) => {
    // Je récupère mon objet en base
    Character.findOne({_id: req.params.id})
        .then((character, err) => {
            if(err) console.log(err);
            if(req.auth.isAdmin || req.auth.userId === character.userId){
                Character.deleteOne( {_id: req.params.id })
                    .then(() => res.status(200).json({ message: "Personnage supprimé !" }))
                    .catch(error => res.status(400).json({ error } ))}
            else
                return res.status(401).json({message : "Vous n'avez pas les autorisations requises pour cette action."})
        })
        .catch(error => res.status(400).json({ error } ));
}

