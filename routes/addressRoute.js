const userAddresses = require("../controller/users_addressesController");
const postValidation = {
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            address: {type: 'string'},
            city: {type: 'string'},
            pincode: {type: 'number'},
        },
        required: [
            'address',
            'city',
            'pincode',
        ],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                address: {type: 'string'},
                city: {type: 'string'},
                pincode: {type: 'number'},
            }

        },
        500: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        },
        422: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        }
    }
}

const updatePostSchema = {
    params: {
        type: 'object',
        properties: {
            id: {type: 'number'}
        }
    },
    body: {
        type: 'object',
        required: ['address', 'city', 'pincode'],
        properties: {
            address: {type: 'string'},
            city: {type: 'string'},
            pincode: {type: 'number'},
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: {type: 'string'}
            }
        },

        500: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        },
        422: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        }
    }
}
const getById = {
    params: {
        type: 'object',
        properties: {
            id: {type: 'number'}
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                address: {type: 'string'},
                city: {type: 'string'},
                pincode: {type: 'number'},
            }
        }

    },
    500: {
        type: 'object',
        properties: {
            statusCode: {type: 'number'},
            message: {type: "string"}
        }
    },
    422: {
        type: 'object',
        properties: {
            statusCode: {type: 'number'},
            message: {type: "string"}
        }
    }
}


const getAllData = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {type: 'number'},
                    address: {type: 'string'},
                    city: {type: 'string'},
                    pincode: {type: 'number'},

                }
            }

        },
        500: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        },
        422: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        }

    }
}

const deleteById = {
    params: {
        type: 'object',
        properties: {
            id: {type: 'number'}
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: {type: 'string'}
            }
        },
        500: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        },
        422: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        }

    }
}

module.exports = (fastify) => {

// Create a new Users
    fastify.post("/address", {schema: postValidation}, userAddresses.postAddressDataAction);

// Retrieve all Users
    fastify.get("/address", {schema: getAllData}, userAddresses.getAddressDataAction);

// Retrieve a single Users with id
    fastify.get("/address/:id", {schema: getById}, userAddresses.getAddressByIdAction);

// Update a Users with id
    fastify.put("/address/:id", {schema: updatePostSchema}, userAddresses.updateAddressDataAction);

// Delete a Users with id
    fastify.delete("/address/:id", {schema: deleteById}, userAddresses.deleteAddressByIddAction);

}
