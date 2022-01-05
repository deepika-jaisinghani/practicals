const {ExeQuery} = require('../db')
const fastify = require("fastify");

const AllUserDataGet = async (request, reply, error) => {
    try {
        // throw new Error("Internal Server Error");
        let UserData = await ExeQuery("select * from user_data", []);
        reply
            .code(200)
            .send(UserData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const UserByIdGet = async (request, reply) => {
    let id = request.params.id;
    try {
        // throw new Error("Internal Server Error")
        let UserData = await ExeQuery("Select * from user_data where user_id=?", [id]);
        reply
            .code(200)
            .send(UserData);
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const UserByIdDelete = async (request, reply) => {
    let id = request.params.id;
    try {
        // throw new Error("Internal Server Error")
        let UserData = await ExeQuery("Delete from user_data where user_id=?", [id]);
        reply
            .code(200)
            .send({message: "USER DELETED"}, UserData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const UserDataAdd = async (request, reply) => {
    try {
        // throw new Error("Internal Server Error")
        const {Name, Age, Email} = request.body;
        let UserData = await ExeQuery("Insert into user_data(Name,Age,Email)values (?,?,?)", [Name, Age, Email]);
        console.log("Hello", UserData)
        // fastify.log.error("error hello")
        return reply
            .code(200)
            .send(UserData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const UserDataEdit = async (request, reply) => {
    let id = request.params.id
    console.log("deepika", id)
    console.log("body", request.body)
    try {
        // throw new Error("Internal Server Error")
        const {Name, Age, Email} = request.body;
        let UserData = await ExeQuery(`update user_data
                                       set Name=?,
                                           Age=?,
                                           Email=?
                                       where user_id = ?`, [Name, Age, Email, id]);
        reply
            .code(200)
            .send(UserData);
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

module.exports = {
    AllUserDataGet,
    UserByIdGet,
    UserByIdDelete,
    UserDataAdd,
    UserDataEdit
}