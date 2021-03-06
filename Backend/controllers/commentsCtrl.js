const db        = require("../models");  // modèles sequelize
const Comment   = db.comments;              
const User      = db.users;

//creer un commentaire et l'enregistrer
exports.createComment = (req, res, next) => {
   
    const comment = new Comment(
        {
            UserId:     req.body.UserId,
            MessageId:  req.body.MessageId,
            comment:    req.body.comment
        }
    )
    comment.save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch(error => res.status(400).json({ error }))

};


//trouver un commentaire
exports.findOneComment = (req, res, next) => {
    Comment.findAll({ 
        where: { 
            MessageId: req.params.Messageid 
        },
        include: {
            model: User,
            required: true,
            attributes: ["userName"]
        }
    })
    .then(comment => { res.status(200).json(comment) })
    .catch(error => res.status(404).json({ error }))
};
//trouver tous les commentaires
exports.findAllComments = (req, res, next) => {
    Comment.findAll()
    .then(comments => { res.status(200).json(comments) })
    .catch(error => res.status(400).json({ error }))
};

// supprimer un commentaire

exports.deleteComment = (req, res, next) => {
    
  Comment.destroy({ where: { id: req.query.commentId }})
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
        .catch(error => res.status(400).json({ error }))
};