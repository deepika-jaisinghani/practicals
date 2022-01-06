const users = require("../controller/usersController");

module.exports = (fastify) => {

// Create a new Users
    fastify.post("/route/create", users.postUserDataAction);

// Retrieve all Users
    fastify.get("/list", users.getAllUserDataAction);

// Retrieve a single Users with id
    fastify.get("/:id", users.getUserByIdAction);

// Update a Users with id
    fastify.put("/edit/:id", users.updateUserDataAction);

// Delete a Users with id
    fastify.delete("/delete/:id", users.deleteUserByIdAction);

}
