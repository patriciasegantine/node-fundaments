import http from 'node:http'

const hostname = '127.0.0.1'
const port = 5000

const users = []

const server = http.createServer(async (req, res) => {
  const {method, url} = req

  const buffers = []

  for await (const chuck of req) {
    buffers.push(chuck)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
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
