function authUser(req, res, next) {
    if (req.session && req.session.user && req.session.user.username) {
        console.log('User is authenticated:', req.session.user.username);
        console.log('Session:', req.session);
       next();
    } else {
        req.session.flash = { type: 'danger', text: 'Not authorized, try to login!' }
        res.redirect('/login')
    }
}

export default authUser 