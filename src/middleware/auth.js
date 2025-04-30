function authUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.username) {
       next();
    } else {
        req.session.flash = { type: 'danger', text: 'Not authorized, try to login!' }
        res.redirect('/login')
    }
}

export default authUser 