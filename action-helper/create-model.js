import { upperHead } from "../util/function.js"

export default function createModel (name) {
  const modelName = upperHead(name)
  return `module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize

  const ${modelName} = app.model.define('${name}', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true }
  }, {
    underscored: true,
    timestamps: true,
    paranoid: true
  })

  return ${modelName}
}
`
}