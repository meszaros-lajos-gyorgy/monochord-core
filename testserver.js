const http = require('http')
const nodeStatic = require('node-static')
const fs = require('fs')

const fileServer = new nodeStatic.Server('./examples')

const app = http.createServer((req, res) => {
  req
    .on('end', () => {
      switch (req.url) {
        case '../../dist/monochord-core.js':
        case '/dist/monochord-core.js':
          fs.readFile('./dist/monochord-core.js', 'utf8', (err, data) => {
            if (err) {
              res.write(404, {'Content-Type': 'text/plain'})
              res.write('Not found')
            } else {
              res.writeHead(200, {'Content-Type': 'text/javascript'})
              res.write(data)
            }
            res.end()
          })
          break
        default:
          if(req.url === '/'){
            fs.readFile('./examples/index.html', 'utf8', (err, data) => {
              res.writeHead(200, {'Content-Type': 'text/html'})
              res.write(data.replace('<!-- script:live-reload -->', '<script src="' + process.env.BROWSER_REFRESH_URL + '"></script>'))
              res.end()
            })
          }else{
            const matches = req.url.match(/^\/(\w+)(?:\/(?:index\.html)?)?$/)
            if (matches !== null) {
              fs.readFile('./examples/' + matches[1] + '/index.html', 'utf8', (err, data) => {
                if (err) {
                  res.write(404, {'Content-Type': 'text/plain'})
                  res.write('Not found')
                } else {
                  res.writeHead(200, {'Content-Type': 'text/html'})
                  res.write(data.replace('<!-- script:live-reload -->', '<script src="' + process.env.BROWSER_REFRESH_URL + '"></script>'))
                }
                res.end()
              })
            } else {
              fileServer.serve(req, res)
            }
          }
      }
    })
    .resume()
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server started on port ' + app.address().port)

  if (process.send) {
    process.send('online')
  }
})
