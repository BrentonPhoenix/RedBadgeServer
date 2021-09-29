const router = require('express').Router();
const validateJWT = require('../middleware/validate-jwt')
const {TopicModel} = require('../models')


//--------------CREATETOPIC--------------------
router.post('/create', validateJWT, async(req,res)=>{
    const {TopicTitle, url,Keywords,Active,communityLocked} = req.body
    const topic = {
        TopicTitle, 
        url,
        Keywords,
        Active,
        userUserID: req.user.userID,
        communityLocked

    }
    try{
        const newTopic = await TopicModel.create(topic)
        res.status(200).json(newTopic)
    } catch(err){
        res.status(500).json({error: `${err}`})
    }
})




//------------------GETALLTOPICS----------------

router.get('/',validateJWT, async(req,res)=>{
    try{
        const topics = await TopicModel.findAll()
        res.status(200).json(topics)
    } catch(err){

    }
})
//------------------GETALLTOPICS whereCommunityLocked ===false----------------

router.get('/public', async(req,res)=>{
    try{
        const topics = await TopicModel.findAll({where: {
            communityLocked: false
        }})
        res.status(200).json(topics)
    } catch(err){

    }
})

//----------------GETALL-OWN-TOPICS----------------

router.get('/mine', validateJWT, async(req, res)=>{
    try{
        const myTopics = await TopicModel.findAll({
            where: {
                userUserID: req.user.userID
            }
        })
        res.status(200).json(myTopics)
    }
    catch{

    }
})


//-------------------GET-ONE-TOPIC----------------------------

router.get('/:topicID', validateJWT, async(req, res)=>{
    const topicID = req.params.topicID
    try{
        const myTopic = await TopicModel.findAll({
            where: {
                TopicID: topicID
            }
        })
        res.status(200).json(myTopic)
    }
    catch(err){
        console.log(err)
    }
})




//----------------------UPDATETOPIC--------------------

router.put('/update/:topicID', validateJWT, async(req,res)=>{
    const{TopicTitle, url,Keywords,Active,communityLocked} = req.body
    const topicID = req.params.topicID
    const userID = req.user.userID
    const query={
        where: {
            TopicID: topicID,
            userUserID: userID
        }
    }
    const updatedTopic = {
        TopicTitle: TopicTitle
        , url: url
        ,Keywords: Keywords
        ,Active: Active
        ,communityLocked: communityLocked
    
        
    }
    try{
        const update = await TopicModel.update(updatedTopic, query)
        res.status(200).json(update)
    } catch(err){
        res.status(500).json({error: `${err}`})
    }
})


router.delete('/delete/:topicID', validateJWT, async(req,res)=>{
  
   const topicID = req.params.topicID
   const userID = req.user.userID
   
   try{
    const query ={
        where: {
            TopicID: topicID,
            userUserID: userID
        }
    }
    await TopicModel.destroy(query)
    res.status(200).json({
        message: "Topic deleted."
    })
   }
   catch(err){
    res.status(500).json({
        error: `${err}`
    })
   }
})

module.exports = router