import Boom from 'boom'

/**
 * call a middleware
 * @method tryCatch
 * @param  {Function} fn
 * @return {Promise}
 */
const tryCatch = fn => {
  try {
    return Promise.resolve(fn())
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * @method sendError
 * @param  {ResponseRestify}  res response instance
 * @param  {Error}            e
 */
const sendError = (res, e) => {
  const output = Boom.boomify(e).output
  console.log(`ERROR:`, e)
  res.send(output.statusCode, output)
}

/**
 * @method wrapMiddleware
 * @param  {Function}       middleware route middleware
 * @return {Function}
 */
const wrapMiddleware = middleware => {
  return (req, res) => {
    const handler = () => middleware(req, res)
    tryCatch(handler)
      .then(result => {
        if (req.route.method === 'DELETE') {
          res.contentType = 'json'
          res.send(200, [result])
        } else {
          res.json(result)
        }
      })
      .catch(e => sendError(res, e))
  }
}

export default wrapMiddleware
