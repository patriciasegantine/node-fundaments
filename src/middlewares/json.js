export const json = async (req, res) => {
  const buffers = []

  // Input data > converts the request body to JSON.
  for await (const chuck of req) {
    buffers.push(chuck)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  // Output of data > returns the data in JSON.
  res.setHeader('Content-type', 'application/json')

}
