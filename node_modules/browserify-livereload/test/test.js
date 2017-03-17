const fs = require('fs')
const path = require('path')
const test = require('tape')
const io = require('socket.io-client')
const browserify = require('browserify')
const livereload = require('../lib')
const entry = path.join(__dirname, 'src', 'main.js')
const output = path.join(__dirname, 'src', 'bundle.js')

const b = browserify({
  entries: [entry]
})

function bundle () {
  b.bundle()
    .pipe(fs.createWriteStream(output))
}

test('outfile option', (t) => {
  t.throws(() => b.plugin(livereload), /outfile option must be specified/, 'outfile needs to be specified when using plugin as API')
  t.end()
})

test('socketio events', (t) => {
  b.plugin(livereload, {
    outfile: output
  })

  const socket = io('http://localhost:3001')

  socket.on('bundle', () => {
    console.log('test')
    t.pass('bundle event was called')
    t.end()
    process.exit(0)
  })

  bundle()
})

