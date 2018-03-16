import dotenv from 'dotenv'
import server from './server'
import printRoute from './utils/print-routes'

dotenv.config()

server.listen(process.env.SERVER_PORT || 3000, () => {
  console.log('%s listening at %s', server.name, server.url)
  console.log(printRoute(server.router.mounts).toString())
})
