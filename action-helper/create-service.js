import { upperHead } from "../util/function.js"

export default function createModel (name) {
  const modelName = upperHead(name)
  const serviceName = `${modelName}Servicce`

  return `
    const Service = require('egg').Service

    class ${serviceName} extends Service {
      async queryAll({ limit = 10, offset = 0, conditions = {} }) {
        const Op = this.ctx.app.Sequelize.Op
        const cond = {}

        if (conditions.name) {
          cond.name = {
            [Op.substring]: conditions.name
          }
        }

        return await this.ctx.model.${modelName}.findAndCountAll({
          where: cond,
          limit,
          offset,
          order: [['createdAt', 'desc']]
        })
      }

      async queryOne(where) {
        return await this.ctx.model.${modelName}.findOne({ where })
      }

      async findById(id) {
        return await this.ctx.model.${modelName}.findByPk(id)
      }

      async create(model) {
        await this.ctx.model.${modelName}.create(model)
      }

      async update(id, model) {
        await this.ctx.model.${modelName}.update(model, { where: { id } })
      }

      async destroy(id) {
        return await this.ctx.model.${modelName}.destroy({ where: { id } })
      }
    }

    module.exports = ${serviceName}
  `
}