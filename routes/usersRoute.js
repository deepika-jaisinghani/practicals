const users = require("../controller/usersController");

const postValidation = {
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            name: {type: 'string', pattern: '[A-Za-z]'},
            age: {type: 'number'},
            email: {type: 'string', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'},
        },
        required: [
            'name',
            'age',
            'email',
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

// Create a new Users
    fastify.post("/users", {schema: postValidation}, users.postUserDataAction);

// Retrieve all Users
    fastify.get("/users",{schema: getAllData}, users.getAllUserDataAction);

// Retrieve a single Users with id
    fastify.get("/users/:id", {schema: getById}, users.getUserByIdAction);

// Update a Users with id
    fastify.put("/users/:id",{schema: updatePostSchema},users.updateUserDataAction);

// Delete a Users with id
    fastify.delete("/users/:id",{schema: deleteById},users.deleteUserByIdAction);

}
