const models = require("../models");
const Users = models.Users;
const sequelize = require("sequelize");
exports.postUserDataAction = (request, reply) => {
    // Create a User
    const user = {
        name: request.body.name,
        age: request.body.age,
        email: request.body.email,
    }
    Users.create(user)
        .then(data => {
            reply
                .send(data);
        })
        .catch(err => {
            reply
                .code(500)
                .send({message: err.message || "Some error occurred while creating the User."});
        });
}

// Retrieve all Users from the database.
exports.getAllUserDataAction = (request, reply) => {
    const name = request.query.name;
    Users.findAll({
        raw: true
    }).then(data => {
        reply
            .send(data);

    })
        .catch(err => {
            reply
                .code(500)
                .send({message: err.message || "Some error occurred while retrieving users."});
        });
};

// Find a single User with an id
exports.getUserByIdAction = (request, reply) => {
    const id = request.params.id;
    Users.findByPk(id)
        .then(data => {
            if (data) {
                reply
                    .send(data);
            } else {
                reply
                    .code(404)
                    .send({message: `Cannot find Users with id=${id}.`
                });
            }
        })
        .catch(err => {
            reply
                .code(500)
                .send({message: "Error retrieving Users with id=" + id});
        });
};

// Update a User by the id in the request
exports.updateUserDataAction = (request, reply) => {
    const id = request.params.id;

    Users.update(request.body, {
        where: {id: id}
    })
        .then(id => {
            if (id == 1) {
                reply
                    .send({message: "User was updated successfully."});
            } else {
                reply
                    .send({message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`});
            }
        })
        .catch(err => {
            reply
                .code(500)
                .send({message: "Error updating User with id=" + id});
        });
};
// Delete all Users from the database.
exports.deleteUserByIdAction = (request, reply) => {
    const id = request.params.id;

    Users.destroy({
        where: {id:id},
        truncate: false
    })
        .then(id => {
            reply
                .send({message: `${id} Users were deleted successfully!`});
        })
        .catch(err => {
            reply
                .code(500)
                .send({message: err.message || "Some error occurred while removing all users."});
        });
};




