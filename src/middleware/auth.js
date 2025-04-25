function authUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.username) {
        // res.status(200).send('Authorized')
       next();
    } else {
        req.session.flash = { type: 'danger', text: 'Not authorized, try to login!' }
        res.redirect('/login')
        // res.status(401).json({ message: 'Not authorized' })
     
    }
}

export default authUser 