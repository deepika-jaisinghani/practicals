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
                user_id: {type: 'number'},
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
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    user_id: {type: 'number'},
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


const getAllData = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    user_id: {type: 'number'},
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
    const {
        getAllUserDataAction,
        getUserByIdAction,
        deleteUserByIdAction,
        postUserDataAction,
        updateUserDataAction
    } = require("../controller/userController");

    fastify.get("/api/users", {schema: getAllData}, getAllUserDataAction);
    fastify.get("/api/users/:id", {schema: getById}, getUserByIdAction);
    fastify.post("/api/users", {schema: postValidation}, postUserDataAction);
    fastify.put("/api/users/:id", {schema: updatePostSchema}, updateUserDataAction);
    fastify.delete("/api/users/:id", {schema: deleteById}, deleteUserByIdAction);
}