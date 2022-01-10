const models = require("../models");
const userAddresses = models.userAddresses;
const sequelize = require("sequelize");

exports.postAddressDataAction = (request, reply) => {
    // Create a User
    const address = {
        address: request.body.address,
        city: request.body.city,
        pincode: request.body.pincode,
    }
    userAddresses.create(address)
        .then(data => {
            reply
                .send(data);
        })
        .catch(err => {
            reply
                .code(500)
                .send({message: err.message || "Some error occurred while creating the User Address."});
        });
}

// Retrieve all Users from the database.
exports.getAddressDataAction = (request, reply) => {
    // const id = request.query.id;
    const id = userAddresses.findAll({
        raw: true,
    }).then(data => {
        reply
            .send(data);
    })
        .catch(err => {
            reply
                .code(500)
                .send({message: err.message || "Some error occurred while retrieving users address."});
        });
    console.log("deepika",id)
};

// Find a single User with an id
exports.getAddressByIdAction = (request, reply) => {
    const id = request.params.id;
    userAddresses.findByPk(id)
        .then(data => {
            if (data) {
                reply
                    .send(data);
            } else {
                reply
                    .code(404)
                    .send({message: `Cannot find Users address with id=${id}.`
                    });
            }
        })
        .catch(err => {
            reply
                .code(500)
                .send({message: "Error retrieving Users address with id=" + id});
        });
};

// Update a User by the id in the request
exports.updateAddressDataAction = (request, reply) => {
    const id = request.params.id;

    userAddresses.update(request.body, {
        where: {id: id}
    })
        .then(id => {
            if (id == 1) {
                reply
                    .send({message: "User Address was updated successfully."});
            } else {
                reply
                    .send({message: `Cannot update User Address with id=${id}. Maybe User was not found or req.body is empty!`});
            }
        })
        .catch(err => {
            reply
                .code(500)
                .send({message: "Error updating User Address with id=" + id});
        });
};
// Delete all Users from the database.
exports.deleteAddressByIddAction = (request, reply) => {
    const id = request.params.id;

    userAddresses.destroy({
        where: {id:id},
        truncate: false
    })
        .then(id => {
            reply
                .send({message: `${id} Users Address were deleted successfully!`});
        })
        .catch(err => {
            reply
                .code(500)
                .send({message: err.message || "Some error occurred while removing all users address."});
        });
};




