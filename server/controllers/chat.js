const Conversation = require("../models/Conversation");
const Message = require("../models/Message.js");

class ChatController {
    //api/chat/saveMessage
    saveMessage(req, res, next) {
        const newMessage = new Message(req.body);
        newMessage.save()
        .then((messages, err) => {
            res.status(200).json(messages);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    //api/chat/getMessage?sender=ngocnd&receiver=minhpv
    getMessage(req, res) {
        Message.find({
            sender: req.query.sender,
            receiver: req.query.receiver,
        })
        .then((messages, err) => {
            res.status(200).json(messages);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }

    //api/chat/getListMessage?sender=ngocnd
    getListMessage(req, res) {
        Message.find({
            sender: req.query.sender,
        })
        .then((messages, err) => {
            res.status(200).json(messages);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }
}

module.exports = new ChatController()