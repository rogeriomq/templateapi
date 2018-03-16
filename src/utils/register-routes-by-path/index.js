import loadRoutesByPath from './load-routes-by-path'
import registerRoute from './register-route'

/**
 * @method registerRoutesByPath
 * @param  {RestifyServer}      server  restify instance
 * @param  {String}             dirName
 */
const registerRoutesByPath = (server, dirName) => {
  const routes = loadRoutesByPath(dirName)
  routes.forEach(route => registerRoute(server, route))
}

export default registerRoutesByPath
