const protect = (req, res, next) => {
    const {user} = req.session

    if (!user){
        return res.status(400).json({
            status: 'fail',
            message: "unauthorised. You must log in"});
    }
    next()  //send to the next middleware. Middleware is a function that runs befor controller is invoked
    
    req.user = user
    
};

module.exports = protect 