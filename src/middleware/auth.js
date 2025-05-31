import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function authUser(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    res.cookie('flash', 'Not authenticated, Try logging in!', { maxAge: 5000 })
    return res.status(401).redirect('/login')
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)
    req.user = user 
    next()
  } catch (err) {
    console.error('Token verification failed:', err)
    res.cookie('flash', 'Not authenticated, Try logging in!', { maxAge: 5000 })
    return res.status(403).redirect('/login')
  }
}
  export default authUser;
  