export default function createBaseController () {
  return `const Controller = require('egg').Controller

const queryRules = {
  page: { type: 'number', convertType: 'number', required: true },
  pageSize: { type: 'number', convertType: 'number', required: true }
}

class BaseController extends Controller {
  success(body) {
    if (!body) {
      this.ctx.status = 201
    } else {
      this.ctx.status = 200
      this.ctx.body = body
    }
  }

  paginationSuccess(body) {
    const { page, pageSize } = this.ctx.request.query
    this.ctx.status = 200
    this.ctx.body = Object.assign(body, { page: Number(page), pageCount: Math.ceil(body.count / pageSize) })
  }

  error400({ message = '', errors = [] } = {}) {
    this.ctx.status = 400
    this.ctx.body = { message, errors }
  }

  error422({ message = '', errors = [] } = {}) {
    this.ctx.status = 422
    this.ctx.body = { message, errors }
  }

  handleResponse(response) {
    if (!response.success) {
      this.error400(response)
      return
    }

    this.success(response.data)
  }

  getPaginationParams() {
    const query = this.ctx.query
    this.ctx.validate(queryRules, query)
    const { page, pageSize } = query

    return {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }
  }
}

module.exports = BaseController
  `
}