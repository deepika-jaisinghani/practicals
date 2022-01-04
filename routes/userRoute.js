const PostValidation = {
    body: {
        type: 'object',
        additionalProperties: false,
        properties: {
            Name: {type: 'string', pattern: '[A-Za-z]'},
            Age: {type: 'number'},
            Email: {type: 'string', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'},
        },
        required: [
            'Name',
            'Age',
            'Email',
        ],
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    User_id: {type: 'number'},
                    Name: {type: 'string'},
                    Age: {type: 'number'},
                    Email: {type: 'string'},
                }
            }

        },
        500: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        }

    }
}

const UpdatePostSchema = {
    body: {
        type: 'object',
        required: ['Name', 'Age', 'Email'],
        properties: {
            Name: {type: 'string', pattern: '[A-Za-z]'},
            Age: {type: 'number'},
            Email: {type: 'string', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'},
        },
    },
    response: {
        200: {type: 'string'}, // a simple message will be sent
    },
    500: {
        type: 'object',
        properties: {
            statusCode: {type: 'number'},
            message: {type: "string"}
        }
    }
}


const GetById = {
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
                    User_id: {type: 'number'},
                    Name: {type: 'string'},
                    Age: {type: 'number'},
                    Email: {type: 'string'},
                }
            }

        },
        500: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        }
    }
}


const GetAllData = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    User_id: {type: 'number'},
                    Name: {type: 'string'},
                    Age: {type: 'number'},
                    Email: {type: 'string'},

                }
            }

        },
        500: {
            type: 'object',
            properties: {
                statusCode: {type: 'number'},
                message: {type: "string"}
            }
        }

    }
}

const DeleteById = {
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
        }

    }
}

module.exports = (fastify) => {
    const {
        getAllUserData,
        getUserById,
        deleteUserById,
        postUserData,
        updateUserData
    } = require("../controller/userController");

    fastify.get("/api/users", {schema: GetAllData}, getAllUserData);
    fastify.get("/api/users/:id", {schema: GetById}, getUserById);
    fastify.post("/api/users", {schema: PostValidation}, postUserData);
    // console.log({schema: PostValidation, PostSchema})
    fastify.put("/api/users/:id", {schema: UpdatePostSchema}, updateUserData);
    fastify.delete("/api/users/:id", {schema: DeleteById}, deleteUserById);
}