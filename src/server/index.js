// import prefix from '../http/prefix'
import restify from 'restify'
import cors from './cors'
import path from 'path'
import validator from 'restify-joi-validator'
import registerRoutesByPath from '../utils/register-routes-by-path'
// import jwtMiddleware from './jwtMiddleware'
import sequelizeModelsMiddleware from './sequelizeModelsMiddleware'

// const exclusionsAuth = [`${prefix}/login`, '/ping', '/api/cidadeuf']

const server = restify.createServer({
  name: 'WS CartorioWEB',
  version: '1.0.0'
})
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.bodyParser())

server.use(validator())
server.use(sequelizeModelsMiddleware())
// server.use(jwtMiddleware({ exclusionsAuth }))

console.log('PATH ROUTES: ', path.join(__dirname, '../', './http'))
registerRoutesByPath(server, path.join(__dirname, '../', './http'))

export default server
