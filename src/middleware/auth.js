function authUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.username) {
        next();
    } else {
        // res.redirect('/login'); 
        console.log('\nNot authorized\n')
        res.status(401).send('Not authorized')
   
            // or res.status(401).send('Not authorized')
    }
}

export default authUser 