const users = require('../models/userSchema')

const feed1 = require("../models/feedSchema")

const post=async (req, res) => {
    console.log(req.body);
    const { head, body, hashtag, time, user, likes, comments } = req.body
    console.log(head)
    try {

        const feed = new feed1({
            head, body, time, user, likes, comments, hashtag

        })
        await feed.save();
        response.status(201).json(feed)
        console.log(feed)

    } catch (error) {
        res.status(404).send(error)
    }
}
const fetchPosts=async (req, res) => {
    try {
        const feed = await feed1.find({})
        res.status(200).json(feed)
        console.log(feed)
        console.log("Ramaan")

    } catch (error) {
        //error.status(404).json({message:error.message})
        console.log("error")

    }

}
const search=async (req, res) => {
    console.log(req.body);

    const { name, email, given_name, picture, token, family_name } = req.body




    try {
        const preuser = await users.find({ name: { $regex: `${name}`, $options: "$i" } })
        console.log(preuser)
        if (preuser) {
            res.status(404).send(preuser)
        }
        else {
            res.status(404).send("No user Found")
        }
    } catch (error) {
        res.status(404).send(error)
    }

}
const comment=async (req, res) => {
    console.log(req.body);
    const { head, body, hashtag, time, user, likes, comments } = req.body
    console.log(likes)
    try {

        const feed = new feed1({
            head, body, time, user, likes, comments, hashtag

        })
        await feed.save();
        response.status(201).json(feed)
        console.log(feed)

    } catch (error) {
        res.status(404).send(error)
    }
}
const updateComment= async (req, res) => {
    console.log(req.body);
    const { id, user, time, comments } = req.body
    console.log(id)
    try {


        const upd = await feed1.findByIdAndUpdate(id, { $push: { comments: { content: comments, time: time, user: user } } }, { new: true });
        //const upd=await comment1.findByIdAndUpdate('640def63faa537f85aac2e28',{ $inc: {likes: 1 }},{new:true});
        response.status(201).json(comment)
        console.log(upd)

    } catch (error) {
        res.status(404).send(error)
    }
}
const updateLikes= async (req, res) => {
    console.log(req.body);
    const { id, user } = req.body
    console.log(id)
    try {
        const feed = await feed1.find({ _id: id, likes: user })
        //  console.log(feed)
        if (feed.length === 0) {
            const upd = await feed1.findByIdAndUpdate(id, { $push: { likes: user } }, { new: true });
            //const upd=await comment1.findByIdAndUpdate('640def63faa537f85aac2e28',{ $inc: {likes: 1 }},{new:true});
            response.status(201).json(feed)
            //console.log(upd)}

        } else {
            const upd = await feed1.findByIdAndUpdate(id, { $pull: { likes: user } }, { new: true });
            console.log("You have already liked")
            response.status(404).send("You have already liked")

        }
    } catch (error) {
        res.status(404).send(error)
    }
}
const likeStatus=async (req, res) => {
    console.log(req.body);
    const { id, user } = req.body
    console.log(id)
    try {
        const feed = await feed1.find({ _id: id, likes: user })
        //  console.log(feed)
        if (feed.length === 0) {
            //const upd=await feed1.findByIdAndUpdate(id,{$push:{likes:user}},{new:true});
            //const upd=await comment1.findByIdAndUpdate('640def63faa537f85aac2e28',{ $inc: {likes: 1 }},{new:true});
            response.status(201).json("0")
            //console.log(upd)}

        } else {
            // const upd=await feed1.findByIdAndUpdate(id,{$pull:{likes:user}},{new:true});
            // console.log("You have already liked")
            response.status(404).send("1")

        }
    } catch (error) {
        res.status(404).send(error)
    }
}
const fetchComments=async (req, res) => {
    try {
        const feed = await feed1.find({})
        res.status(200).json(feed)
        console.log(feed)
        console.log("Raman")

    } catch (error) {
        //error.status(404).json({message:error.message})
        console.log("error")

    }

}
const searchPost=async (req, res) => {
    console.log(req.body);

    const { head } = req.body




    try {
        const preuser = await feed1.find({ $or: [{ hashtag: { $regex: `${head}`, $options: "$i" } }, { head: { $regex: `${head}`, $options: "$i" } }, { user: { $regex: `${head}`, $options: "$i" } }] })
        console.log(preuser)
        if (preuser) {
            res.status(404).send(preuser)
        }
        else {
            res.status(404).send("No user Found")
        }
    } catch (error) {
        res.status(404).send(error)
    }

}
const seePost=async (req, res) => {
    console.log(req.body);

    const { _id } = req.body
    console.log(_id)




    try {
        const preuser = await feed1.findOne({ _id: _id })
        console.log(preuser)
        if (preuser) {
            res.status(201).send(preuser)
            console.log(preuser)
            console.log("ha")
        }
        else {
            res.status(404).send("No user Found")
            console.log("Not found")
        }
    } catch (error) {
        res.status(404).send(error)
        console.log("Error")
    }

}
const fetchProfilePosts=async (req, res) => {
    console.log(req.body)
    const { user } = req.body
    try {
        const feed = await feed1.find({ user: user })
        res.status(200).json(feed)
        //console.log(feed)
        console.log("Ramban")

    } catch (error) {
        //error.status(404).json({message:error.message})
        console.log("error")

    }

}
module.exports={post,fetchPosts,search,comment,updateComment,updateLikes,likeStatus,fetchComments,searchPost

,seePost,fetchProfilePosts}