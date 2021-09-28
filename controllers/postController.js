const router = require('express').Router();
const validateJWT = require('../middleware/validate-jwt')
const {PostModel} = require("../models")


//--------------CREATEpost-------------------
router.post('/create', validateJWT, async(req,res)=>{
    const {postTitle,postContent, postKeywords, url} = req.body
    const post = {
        postTitle,
        postContent,
        postKeywords,
        url,
        userUserID: req.user.userID
        ,topicTopicID: req.body.topicID
      
    }
    try{
        const newPost = await PostModel.create(post)
        res.status(200).json(newPost)
    } catch(err){
        res.status(500).json({error: `${err}`})
    }
})




//------------------GETallPOSTSinTOPIC----------------

router.get('/',validateJWT, async(req,res)=>{
    let  topicID = req.body.TopicID// eventual this.state var
    try{
        const topicPosts = await PostModel.findAll({
            where: {
                topicTopicID: topicID
            }
        })
        res.status(200).json(topicPosts)
    } catch(err){
        res.status(500).json(err)
    }
})

//----------------GETALL-OWN-POSTS----------------

router.get('/mine', validateJWT, async(req, res)=>{
    try{
        const myPosts = await PostModel.findAll({
            where: {
                userUserID: req.user.userID
            }
        })
        res.status(200).json(myPosts)
    }
    catch{

    }
})

//-----------------GETSINGLE-POST-------------------------

router.get('/:postID', validateJWT, async(req,res)=> {
    const postID = req.params.postID

    try{
        const singlePost = await PostModel.findOne({
            where:{
                postID: postID
            }
        })
        res.status(200).json(singlePost)
    }
    catch(err){
        res.status(500).json(err)
    }
} )

//----------------------UPDATETOPIC--------------------

router.put('/update/:postID', validateJWT, async(req,res)=>{
    const{postTitle, url,postContent, postKeywords,topicID} = req.body
    const postID = req.params.postID
    const userID = req.user.userID
    const query={
        where: {
            postID: postID,
            userUserID: userID
        }
    }
    const updatedPost = {
        postTitle:postTitle
        ,postKeywords: postKeywords
        , url: url
        ,postContent: postContent
        ,topicTopicID: req.body.topicID
    

    
        
    }
    try{
        const update = await PostModel.update(updatedPost, query)
        res.status(200).json(update)
    } catch(err){
        res.status(500).json({error: `${err}`})
    }
})


router.delete('/delete/:postID', validateJWT, async(req,res)=>{
   const id = req.user.userID
   const postID = req.params.postID
   
   try{
    const query = {
        where: {
            userUserID: id,
            postID: postID
        }
    }
    await PostModel.destroy(query)
    res.status(200).json({
        message: "Post deleted."
    })
   }
   catch(err){
    res.status(500).json({
        error: `${err}`
    })
   }
})

module.exports = router