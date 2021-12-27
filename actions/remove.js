import chalk from 'chalk'
import path from 'path'
import fs from 'fs/promises'
import ora from 'ora'

const log = console.log
const error = chalk.bold.red;
const warning = chalk.hex('#FFA500'); // Orange color
const success = chalk.bold.greenBright; // Orange color
const __dirname = path.resolve();

export default async function remove (apiName) {
  log(chalk.bold.cyan('Create ' + apiName + ' restful files'))
  const spinner = ora(`deleting`).start();

  try {
    await fs.rm(path.resolve(__dirname, `app/model/${apiName}.js`))
    spinner.succeed(success('delete model file success'))
  } catch (err) {
    log(error('model file is not exist'))
  }

  try {
    await fs.rm(path.resolve(__dirname, `app/service/${apiName}.js`))
    spinner.succeed(success('delete service file success'))
  } catch (err) {
    log(error('service file is not exist'))
  }

  try {
    await fs.rm(path.resolve(__dirname, `app/controller/${apiName}.js`))
    spinner.succeed(success('delete controller file success'))
  } catch (err) {
    log(error('controller file is not exist'))
  }

  spinner.stop()
}