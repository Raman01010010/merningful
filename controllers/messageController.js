
const messages = require('../models/messageSchema')

const message= async (req, res) => {
    console.log(req.body);
    const { content, from, to, time } = req.body
    console.log(content)
    try {

        const message = new messages({
            content, from, to, time

        })
        await message.save();
        response.status(201).json(message)
        console.log(message)

    } catch (error) {
        res.status(404).send(error)
    }
}
const fetchMessage=async (req, res) => {
    console.log(req.body);
    const { content, from, to, time } = req.body
    console.log(from)
    try {
        /*
        {
    "type" : { "$in": ["WebUser", "User"] },
    "city" : { "$in": ["Pune", "Mumbai"] }
}
        */
        const preMessage = await messages.find({ from: { "$in": [from, to] }, to: { "$in": [from, to] } })
        console.log(preMessage)
        res.status(404).send(preMessage)
    } catch (error) {
        res.status(404).send(error)
    }
}
module.exports={message,fetchMessage}