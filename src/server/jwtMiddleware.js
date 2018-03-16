import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const jwtMiddleWare = (deps) => {
  return (req, res, next) => {
    // Checks routes that do not need authentication.
    console.log('exclusionAuth:', deps.exclusionsAuth)
    console.log('reqJWT: ', req.href())
    if (!(deps.exclusionsAuth.indexOf(req.href()) >= 0)) {
      const token = req.headers['authorization']
      if (!token) {
        res.send(403, { error: 'Token não fornecido' })
        return false
      }
      try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        delete decoded.pass
        req.decoded = decoded
        console.log(req.decoded)
      } catch (error) {
        res.send(403, { error: 'Falha ao autenticar o token' })
        return false
      }
    }
    next()
  }
}

export default jwtMiddleWare
