import http from 'node:http'

const server = http.createServer((req, res) => {
  return res.end('Hello word!')
})

server.listen(5000)