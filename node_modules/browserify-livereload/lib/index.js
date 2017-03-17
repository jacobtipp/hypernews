const fs = require('fs')
const http = require('http')
const path = require('path')
const prepend = require('prepend-file')
const concat = require('concat-stream')
const replace = require('replacestream')
const conv = require('convert-source-map')
const offsetLines = require('offset-sourcemap-lines')

module.exports = function (b, options) {
  if (!b.argv && !options.outfile) {
    throw new Error('outfile option must be specified if using the API directly')
  }

  const outfile = options.outfile || b.argv.outfile
  const PORT = options.port || '3001'
  const HOST = options.host || 'localhost'
  const server = http.createServer()
  const io = require('socket.io')(server)
  const debug = b._options.debug


  b.on('bundle', (stream) => {
    stream.on('end', reload)

    function reload () {
      fs.createReadStream(path.join(__dirname, 'socket-client.js'))
        .pipe(replace(/PORT/g, PORT))
        .pipe(replace(/HOST/g, HOST))
        .pipe(concat(read))

      function read (data) {
        if (debug) {
          fs.createReadStream(outfile)
            .pipe(concat(offset))
        } else {
          prependScript(outfile, data)
        }

        function offset (old) {
          const originalComment = old.toString()
          const originalMap = conv.fromSource(originalComment).toObject()
          const offset = 15 // the # of lines in the socket-client.js script
          const offsettedMap = offsetLines(originalMap, offset)
          const body = conv.removeComments(originalComment)
          const newSourceMap = conv.fromObject(offsettedMap).toComment()
          const newBundle = body + '\n' + newSourceMap

          fs.writeFile(outfile, newBundle, (err) => {
            if (err) {
              throw err
            }

            prependScript(outfile, data)
          })

        }

        function prependScript (file, data) {
          prepend(file, data, function (err) {
            if (err) {
              throw err
            }

            io.emit('bundle')
          })
        }
      }
    }
  })

  server.listen(PORT, HOST)
}
