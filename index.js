//Import the fastify framework
const fastify = require("fastify")({
    logger: {
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

fastify.register(require('fastify-jwt'), {
    secret: "secret"
})

const api = require("./routes/userRoute")
const route = require("./routes/usersRoute")
const routes = require("./routes/addressRoute")
routes(fastify)
route(fastify)
api(fastify)
const db = require("./models")
db.sequelize.sync().then((request) => {

//start the server
    fastify.listen(5000, function (err, address) {
        if (err) {
            console.error(err)
            process.exit(1)
            fastify.log.error(err);
        }
        console.log(`Server listening on ${address}`)
    });
});