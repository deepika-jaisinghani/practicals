//Import the fastify framework
const fastify = require("fastify")({logger : {
        level: 'error',
        file: 'logs/error.log'
    }
});


fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: {title: 'FASTIFY-API'},
    },
})

const api = require("./routes/userRoute")
api(fastify)

//start the server
fastify.listen(5000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
        fastify.log.error(err);
    }
    console.log(`Server listening on ${address}`)
});