import { upperHead } from "../util/function.js"

export default function createModel (name) {
  const controllerName = `${upperHead(name)}Controller`

  return `const BaseController = require('./base-controller')

class ${controllerName} extends BaseController {
  async index() {
    const { limit, offset } = this.getPaginationParams()
    const res = await this.ctx.service.${name}.queryAll({
      limit,
      offset,
      conditions: this.ctx.query
    })

    this.paginationSuccess(res)
  }

  async show() {
    const id = this.ctx.params.id
    const res = await this.ctx.service.${name}.findById(id)
    this.success(res)
  }

  async create() {
    const rules = {
      name: { type: 'string', required: true },
      hospital_id: { type: 'string', required: true }
    }

    this.ctx.validate(rules)
    await this.ctx.service.${name}.create(this.ctx.request.body)
    this.success()
  }

  async update() {
    const id = this.ctx.params.id
    const body = this.ctx.request.body
    await this.ctx.service.${name}.update(id, body)
    this.success()
  }

  async destroy() {
    const id = this.ctx.params.id
    await this.ctx.service.${name}.destroy(id)
    this.success()
  }
}

module.exports = ${controllerName}
  `
}