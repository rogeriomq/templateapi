// import { pick } from 'lodash'
import wrapMiddleware from './wrap-middleware'

const toArray = value => Array.isArray(value) ? value : [value]

/**
 * @method applyWrap
 * @param  {Array<Function>}  handlers array of middlewares
 * @return {Array<Function>}  array of middlewares
 */
const applyWrap = handlers => {
  // console.log('APPLY_WRAP_handlersANTES: ', handlers.toString())
  const last = handlers.pop()
  handlers.push(wrapMiddleware(last))
  // console.log('APPLY_WRAP_handlersDEPOIS: ', handlers.toString())      
  return handlers
}

/**
 * @method getHandlers
 * @param  {Object}    route
 * @return {Array<Function>} array of middlewares
 */
const getHandlers = route => {
  const { useWrap } = route
  let handlers = toArray(route.handler)
  if (useWrap) {
    handlers = applyWrap(handlers)
  }
  return handlers
}

const getOptions = (route) => {
  const { path, name, version, validations } = route
  return { path, name, version, validations }
}

/**
 * @method registerRoute
 * @param  {RestifyServer}  server restofy instance
 * @param  {Object}         route  route object
 */
const registerRoute = (server, route) => {
  const { method } = route
  const handlers = getHandlers(route)
  // console.log('register router: ', getOptions(route))
  server[method](getOptions(route), handlers)
}

export default registerRoute
