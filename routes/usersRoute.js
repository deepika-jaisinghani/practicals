const users = require("../controller/usersController");
const {authJwt} = require("../middleware");
const postValidation = {
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            name: {type: 'string', pattern: '[A-Za-z]'},
            age: {type: 'number'},
            email: {type: 'string', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'},
            username: {type: 'string'},
            password: {type: 'string'}
        },
        required: [
            'name',
            'age',
            'email',
            'username',
            'password'
        ],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                name: {type: 'string'},
                age: {type: 'number'},
                email: {type: 'string'},
                username: {type: 'string'},
                password: {type: 'string'}
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
        required: ['name', 'age', 'email'],
        properties: {
            name: {type: 'string', pattern: '[A-Za-z]'},
            age: {type: 'number'},
            email: {type: 'string', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'},
            username: {type: 'string'},
            password: {type: 'string'}
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
                name: {type: 'string'},
                age: {type: 'number'},
                email: {type: 'string'},
                createdAt: {type: 'string'},
                updatedAt: {type: 'string'},
                userAddresses: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: {type: 'number'},
                            address: {type: 'string'},
                            city: {type: 'string'},
                            pincode: {type: 'number'},
                            createdAt: {type: 'string'},
                            updatedAt: {type: 'string'}
                        }
                    }
                }
            },
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

const getAllData = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {type: 'number'},
                    name: {type: 'string'},
                    age: {type: 'number'},
                    email: {type: 'string'},
                    createdAt: {type: 'string'},
                    updatedAt: {type: 'string'},
                    userAddresses: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: {type: 'number'},
                                address: {type: 'string'},
                                city: {type: 'string'},
                                pincode: {type: 'number'},
                                createdAt: {type: 'string'},
                                updatedAt: {type: 'string'}
                            }
                        }
                    }
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

module.exports = (fastify) => {
    fastify.post("/login", users.login);

    fastify.register((fastify1, options, next) => {

// Create a new Users
        fastify1.post("/", {schema: postValidation}, users.postUserDataAction);

// Retrieve all Users
        fastify1.get("/", {schema: getAllData}, users.getAllUserDataAction);

// Retrieve a single Users with id
        fastify1.get("/users/:id", {schema: getById}, users.getUserByIdAction);

// Update a Users with id
        fastify1.put("/users/:id", {schema: updatePostSchema}, users.updateUserDataAction);

// Delete a Users with id
        fastify1.delete("/users/:id", {schema: deleteById}, users.deleteUserByIdAction);

        next();
    }, {prefix: 'users'})
}
