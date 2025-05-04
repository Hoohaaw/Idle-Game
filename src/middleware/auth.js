import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function authUser(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).redirect('/login')
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)
    req.user = user // This will be available in your routes
    next()
  } catch (err) {
    return res.status(403).redirect('/login')
  }
}
  export default authUser;
  