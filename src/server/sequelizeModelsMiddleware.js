import models from '../services/sequelize'
const sequelizeModelsMiddleware = () => {
  return (req, res, next) => {
    req.$models = models
    next()
  }
}

export default sequelizeModelsMiddleware
