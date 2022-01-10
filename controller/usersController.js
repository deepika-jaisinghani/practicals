const models = require("../models");
const Users = models.Users;
const userAddresses = models.userAddresses;
const sequelize = require("sequelize");
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
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
exports.getAllUserDataAction = async (request, reply) => {
    const name = request.query.name;
    const { page, size, title } = request.query;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // const { limit, offset } = getPagination(page, size);
    Users.findAll({
        // include: userAddresses,
        raw: true,
        limit: 10,
        offset: 1,
        where: {},
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
exports.getUserByIdAction = async (request, reply) => {
    const id = request.params.id;
    // const address = await userAddresses.findOne({ where: {id:id},  attributes:['id', 'address','city','pincode']});
    // console.log("result",address)
    Users.findByPk(id, {
        include: {
            model: userAddresses,
            required: true
        }
    })
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




