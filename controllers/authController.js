const User = require("../models/userModel");

const bcrypt = require("bcryptjs");


exports.signUp = async (req, res) => {
    const {username, password} = req.body;
    try{
        const hashpassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            username,
            password: hashpassword
        });
        req.session.user = newUser
        res.status(201).json({
            status: 'success',
            
            data:{
                user: newUser,
            },
    });
    }
    catch(e){
        res.status(400).json({
            status: 'fail',
    });
    }  
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    // const username = req.body.username
    // const password = req.body.password
    try{
        const user = await User.findOne({username});
        if (!user){   
            return res.status(404).json({
            status: 'fail',
            message: 'user not found or login details incorrect'})
        } 

        // bcrypt.compare(password, user.password, (err, data) => {
        //     //if error than throw error
        //     if (err) throw err

        //     //if both match than you can do anything
        //     if (data) {
        //         return res.status(200).json({ msg: "Login success" })
        //     } else {
        //         return res.status(401).json({ msg: "Invalid credencial" })
        //     }

        // })
        
        const isCorrect = await bcrypt.compare(password, user.password) 
        if (isCorrect){
            req.session.user = user
            res.status(200).json({
                status: 'success',
               })
        } else{
            res.status(400).json({
                status: 'fail',
                message: 'password/username is incorrect'})

        }
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            status: 'failoooooo----',
    });
    }  
}


// exports.login = async (req, res) => {
//     //const {username, password} = req.body;
//     const username = req.body.username
//     const password = req.body.password
//     try{
//         const user = await findOne({username});
//         if (!user){   
//             return res.status(404).json({
//             status: 'fail',
//             message: 'user not found or login details incorrect'})
//         }
        
//         const isCorrect = await bcrypt.compare(password, user.password) 
        
//  //compare usersupplied password to that in db

//         if (isCorrect){
//             res.status(200).json({
//                 status: 'success',
//                })
//         } else{
//             res.status(400).json({
//                 status: 'fail',
//                 message: 'password/username is incorrect'})

//         }
//     }
//     catch(e){
//         res.status(400).json({
//             status: 'failoooooo----',
//     });
//     }  
// }