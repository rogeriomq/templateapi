export default
{
  method: 'get',
  path: '/ping',
  name: 'Ping - Teste WS',
  useWrap: false,
  version: '1.0.0',
  handler: (req, res, next) => {
    console.log('/ping')
    res.send({ response: 'pong' })
    next()
  }
}
