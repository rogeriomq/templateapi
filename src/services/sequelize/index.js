import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import SequelizeAutoImport from 'sequelize-auto-import'
import associations from './associations'

dotenv.config()

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  pool: {
    max: 30,
    min: 0,
    idle: 20000,
    acquire: 20000
  },
  // sync: { force: true },
  operatorsAliases: false
})
const models = associations(SequelizeAutoImport(sequelize, './models'))

export default models
