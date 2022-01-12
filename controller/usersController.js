const models = require("../models");
const Users = models.Users;
const userAddresses = models.userAddresses;
const sequelize = require("sequelize");

var jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const config = require("../config/auth.config");

exports.login = (request, reply) => {
    Users.findOne({
        where: {
            username: request.body.username
        }
    })
        .then(user => {
            if (!user) {
                return reply
                    .code(404)
                    .send({message: "User Not found."});
            }
            var passwordIsValid = bcrypt.compareSync(
                request.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return reply
                    .status(401)
                    .send({accessToken: null, message: "Invalid Password!"});
            }

            var token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            reply
                .code(200)
                .send({
                    accessToken: token
                });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.postUserDataAction = (request, reply) => {
    // Create a User
    const salt = bcrypt.genSalt(10)
    const password = request.body.password
    bcrypt.hash(password, 10)
        .then(hashedpassword => {
            const user = new Users({
                name: request.body.name,
                age: request.body.age,
                email: request.body.email,
                username: request.body.username,
                password: hashedpassword
            })
            user.save(user)
                .then(data => {
                    reply
                        .send(data)
                }).catch(err => {
                console.log(err);
            })
            // Users.create(user)
            //     .then(data => {
            //         reply
            //             .send(data);
            //     })
            //     .catch(err => {
            //         reply
            //             .code(500)
            //             .send({message: err.message || "Some error occurred while creating the User."});
            //     });
            // const user = {
            //     name: request.body.name,
            //     age: request.body.age,
            //     email: request.body.email,
            //     username: request.body.username,
            //     password: bcrypt.hashSync(password, salt)
            // }
            // Users.create(user)
            //     .then(data => {
            //         reply
            //             .send(data);
            //     })
            //     .catch(err => {
            //         reply
            //             .code(500)
            //             .send({message: err.message || "Some error occurred while creating the User."});
            //     });
        })
}
// Retrieve all Users from the database.
    exports.getAllUserDataAction = async (request, reply) => {
        const name = request.query.name;
        const {page, size, title} = request.query;
        // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
        // const { limit, offset } = getPagination(page, size);
        const users = await Users.findAll({
            include: {
                model: userAddresses
            },
            raw: false,
            limit: 10,
            offset: 1,
            where: {},
        }).then(data => {
            console.log(data)
            reply
                .send(data);

        })
            .catch(err => {
                reply
                    .code(500)
                    .send({message: err.message || "Some error occurred while retrieving users."});
            });
        console.log("users", users)
    };

// Find a single User with an id
    exports.getUserByIdAction = async (request, reply) => {
        const id = request.params.id;
        // const address = await userAddresses.findOne({ where: {id:id},  attributes:['id', 'address','city','pincode']});
        // console.log("result",address)
        Users.findByPk(id, {
            include: {
                model: userAddresses,
            },

        })
            .then(data => {
                if (data) {
                    console.log("helios", data)
                    reply
                        .send(data);
                } else {
                    reply
                        .code(404)
                        .send({
                            message: `Cannot find Users with id=${id}.`
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
            where: {id: id},
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