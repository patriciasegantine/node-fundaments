import http from 'node:http'
import { Transform } from 'node:stream'

// req > ReadableStream
// res > WritableStream

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)
    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (req, res) => {

  const buffers = []

  // Used when I want wait for all data before starting manipulate it.
  // sample: json file

  for await (const chunk of req)  {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
})

server.listen(3334, () => console.log('it\'s working!'))
