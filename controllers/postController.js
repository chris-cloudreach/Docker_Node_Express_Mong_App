const Post = require("../models/postModel");


exports.getAllPosts = async (req, res, next) => {
    try{
        const posts = await Post.find()
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data:{
                posts,
            },
    })
    }
    catch(e){
        res.status(400).json({
            status: 'fail',
    });
    }  
}

exports.getOnePost = async (req, res, next) => {
    try{
        const  _id  =  req.params.id 
        console.log("_id of post: ", _id);
        const post = await Post.findById(_id);

        res.status(200).json({
            status: "success",
            data:{
                post,
            },
    });
    }
    catch(e){
        res.status(400).json({
            status: 'fail',
    });
    }  
}

exports.creatPost = async (req, res, next) => {
    try{
        const posts = await Post.create(req.body)
        res.status(200).json({
            status: 'success',
            data:{
                posts,
            },
    })
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            status: 'fail',
    });
    }  
}

exports.updatePost = async (req, res, next) => {
    try{
        
        console.log("Running update post");
        console.log("id of post: ", req.params.id);
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: "success",
            data: {
                post,
            },
    })
    }
    catch(e){
        res.status(400).json({
            status: "fail",
    });
    }  
}

exports.deletePost = async (req, res, next) => {
    try{
        console.log("Running delete post");
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
    })
    }
    catch(e){
        res.status(400).json({
            status: "fail",
    });
    }  
}


