const {GetAllUserData, DeleteUserById} = require("../controller/userController");
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
        GetAllUserData,
        GetUserById,
        DeleteUserById,
        PostUserData,
        UpdateUserData
    } = require("../controller/userController");

    fastify.get("/api/users", {schema: GetAllData}, GetAllUserData);
    fastify.get("/api/users/:id", {schema: GetById}, GetUserById);
    fastify.post("/api/users", {schema: PostValidation}, PostUserData);
    fastify.put("/api/users/:id", {schema: UpdatePostSchema}, UpdateUserData);
    fastify.delete("/api/users/:id", {schema: DeleteById}, DeleteUserById);
}