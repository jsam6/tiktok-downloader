#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')

const user = require('../commands/user')
const url = require('../commands/url')

program
.command('url <url>')
.description('URL of tiktok videos to download.')
.action( (link) => url.download(link) )

program
.command('user <username>')
.description('Download videos of specific tiktokers based of username')
.action( (username) => user.download(username) )

program.parse(process.argv)
