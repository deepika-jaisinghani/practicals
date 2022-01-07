const users = require("../controller/usersController");

module.exports = (fastify) => {

// Create a new Users
    fastify.post("/users", users.postUserDataAction);

// Retrieve all Users
    fastify.get("/users", users.getAllUserDataAction);

// Retrieve a single Users with id
    fastify.get("/users/:id", users.getUserByIdAction);

// Update a Users with id
    fastify.put("/users/:id", users.updateUserDataAction);

// Delete a Users with id
    fastify.delete("/users/:id", users.deleteUserByIdAction);

}
