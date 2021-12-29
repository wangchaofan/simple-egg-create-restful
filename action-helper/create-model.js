import { upperHead } from "../util/function.js"

export default function createModel (name) {
  const modelName = upperHead(name)
  return `module.exports = app => {
  const { STRING, UUIDV4, UUID } = app.Sequelize

  const ${modelName} = app.model.define('${name}', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    name: { type: STRING },
  }, {
    underscored: true,
    timestamps: true,
    paranoid: true
  })

  return ${modelName}
}
`
}