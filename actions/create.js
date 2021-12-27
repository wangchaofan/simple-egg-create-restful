import chalk from 'chalk'
import path from 'path'
import fs from 'fs/promises'
import ora from 'ora'
import createModel from '../action-helper/create-model.js'
import createService from '../action-helper/create-service.js'
import createController from '../action-helper/create-controller.js'

const log = console.log
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color
const success = chalk.bold.greenBright; // Orange color
const __dirname = path.resolve();

export default async function create (apiName) {
  log(chalk.bold.cyan('Create ' + apiName + ' restful files'))
  const spinner = ora(`creating`).start();

  const modelTemp = createModel(apiName)
  await fs.writeFile(path.resolve(__dirname, `app/model/${apiName}.js`), modelTemp)
  spinner.succeed(success('create model file success'))

  const serviceTemp = createService(apiName)
  await fs.writeFile(path.resolve(__dirname, `app/service/${apiName}.js`), serviceTemp)
  spinner.succeed(success('create service file success'))

  const controllerTemp = createController(apiName)
  await fs.writeFile(path.resolve(__dirname, `app/controller/${apiName}.js`), controllerTemp)
  spinner.succeed(success('create controller file success'))

  log(warning('You can write next line to the router file：'))
  log(`router.resources('${apiName}', prefix + '/${apiName}', controller.${apiName})`)

  spinner.stop()
}