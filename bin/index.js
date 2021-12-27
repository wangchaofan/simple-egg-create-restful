#!/usr/bin/env node
import commander from 'commander'
import create from '../actions/create.js'

const { program } = commander

program.version('0.0.1')

program
  .command('create <name>')
  .description('新建restful接口api')
  .action(create)

program.parse(process.argv)