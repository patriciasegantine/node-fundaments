import http from 'node:http'
import { json } from './middlewares/json.js'

const hostname = '127.0.0.1'
const port = 5000

const users = []

const server = http.createServer(async (req, res) => {
  const {method, url} = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    res
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {

    const {name, email} = req.body

    users.push({
      name,
      email
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
