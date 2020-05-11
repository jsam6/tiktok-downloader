#!/usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')

const url = require('../commands/url')

program
.version(pkg.version)
.option('--url <url>', 'URL of tiktok videos to download.', '')
.action( (link) => url.download(link) )
.parse(process.argv)
