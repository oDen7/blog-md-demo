// Require the framework and instantiate it
const fs = require("fs");

const fastify = require('fastify')({
  logger: true
})

fastify.register(require('@fastify/cors'), {
  // put your options here
  origin: '*',
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return {
    hello: 'world'
  }
})

fastify.post('/fileReader', async (request, reply) => {
  let res = JSON.parse(request.body);
  const path = "./pic/pic" + Date.now() + '.png';
  const base64 = res.data.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = new Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
  fs.writeFile(path, dataBuffer, function (err) { //用fs写入文件
    if (err) {
      console.log(err);
    } else {
      console.log('写入成功！');
    }
  })
  // return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({
      port: 8000
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()