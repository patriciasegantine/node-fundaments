// process.stdin
// .pipe(process.stdout)

// components operate behind the scenes.

import {Writable, Transform} from 'node:stream'


// Must have data reading and write
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

// Only write data
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {

    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))

  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
